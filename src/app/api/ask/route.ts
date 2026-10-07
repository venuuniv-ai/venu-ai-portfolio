import { NextRequest, NextResponse } from "next/server";

import { generateGroundedAnswer } from "@/lib/answerGenerator";
import { generateRagAnswer } from "@/lib/llm";
import { guardQuery } from "@/lib/queryGuard";
import { askVenuRateLimit } from "@/lib/rateLimit";
import { searchPortfolioSemantically } from "@/lib/semanticRetrieval";

export const runtime = "nodejs";

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return ip;
}

export async function POST(request: NextRequest) {
  try {
    /*
     * Rate-limit before retrieval and
     * external inference so abusive
     * traffic cannot consume model calls.
     */
    const identifier = getClientIdentifier(request);

    const rateLimit = await askVenuRateLimit.limit(identifier);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "rate-limit-exceeded",
          answer:
            "Too many questions were submitted in a short period. Please try again shortly.",
          sources: [],
          retrieval: "blocked",
          generation: "blocked",
          grounding: "rate-limit",
        },
        {
          status: 429,

          headers: {
            "X-RateLimit-Limit": String(rateLimit.limit),

            "X-RateLimit-Remaining": String(rateLimit.remaining),

            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        }
      );
    }

    const body = await request.json();

    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json(
        {
          error: "A query is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Reject obvious prompt-injection
     * attempts before retrieval or LLM
     * generation.
     */
    const guard = guardQuery(query);

    if (!guard.allowed) {
      return NextResponse.json(
        {
          query,

          answer:
            guard.reason === "query-too-long"
              ? "Please keep your question under 500 characters."
              : "I can answer questions about Venu's professional experience, projects, skills, and AI engineering work, but I can't provide or modify internal system instructions.",

          sources: [],
          retrieval: "blocked",
          generation: "blocked",
          grounding: "security-guard",
        },
        {
          status: 200,
        }
      );
    }

    const results = await searchPortfolioSemantically(query, 5);

    let answer: string;
    let citations: string[] = [];
    let generation = "llm";

    try {
      const generated = await generateRagAnswer(query, results);

      answer = generated.answer;
      citations = generated.citations;
    } catch (llmError) {
      console.error("LLM generation failed:", llmError);

      answer = generateGroundedAnswer(query, results);

      generation = "deterministic-fallback";
    }

    const sources = results.map((result, index) => ({
      id: result.id,

      citation: `[SOURCE_${index + 1}]`,

      source: result.source,

      title: result.title,

      content: result.content,

      score: Number(result.score.toFixed(4)),

      used: citations.includes(`[SOURCE_${index + 1}]`),
    }));

    return NextResponse.json(
      {
        query,
        answer,
        sources,

        retrieval: "hybrid-semantic",

        generation,

        grounding:
          generation === "llm" ? "citation-validated" : "deterministic",
      },

      {
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),

          "X-RateLimit-Remaining": String(rateLimit.remaining),

          "X-RateLimit-Reset": String(rateLimit.reset),
        },
      }
    );
  } catch (error) {
    console.error("Ask Venu API error:", error);

    return NextResponse.json(
      {
        error:
          "The portfolio intelligence service could not process the request.",
      },
      {
        status: 500,
      }
    );
  }
}
