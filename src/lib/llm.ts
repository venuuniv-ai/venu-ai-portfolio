import { InferenceClient } from "@huggingface/inference";

import type { RankedSemanticDocument } from "@/lib/semanticRetrieval";

const MODEL = "openai/gpt-oss-120b";

export type RagGeneration = {
  answer: string;
  citations: string[];
};

type ModelOutput = {
  answer?: unknown;
  sources?: unknown;
};

function buildEvidence(results: RankedSemanticDocument[]) {
  return results
    .map(
      (result, index) => `
SOURCE ${index + 1}
ID: ${result.id}
TYPE: ${result.source}
TITLE: ${result.title}
EVIDENCE: ${result.content}
`
    )
    .join("\n");
}

function parseModelOutput(
  rawContent: string,
  resultCount: number
): RagGeneration {
  let cleaned = rawContent
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  let parsed: ModelOutput;

  try {
    parsed = JSON.parse(cleaned) as ModelOutput;
  } catch {
    console.error("Invalid LLM structured output:", rawContent);

    throw new Error("The language model returned invalid structured output.");
  }

  if (typeof parsed.answer !== "string" || !parsed.answer.trim()) {
    throw new Error("The language model returned an invalid answer.");
  }

  if (!Array.isArray(parsed.sources)) {
    throw new Error("The language model returned no source list.");
  }

  const sourceNumbers = [
    ...new Set(
      parsed.sources
        .map((source) => Number(source))
        .filter(
          (source) =>
            Number.isInteger(source) && source >= 1 && source <= resultCount
        )
    ),
  ];

  if (sourceNumbers.length === 0) {
    throw new Error("The language model returned no valid evidence sources.");
  }

  return {
    answer: parsed.answer.trim(),

    citations: sourceNumbers.map((source) => `[SOURCE_${source}]`),
  };
}

export async function generateRagAnswer(
  query: string,
  results: RankedSemanticDocument[]
): Promise<RagGeneration> {
  if (results.length === 0) {
    return {
      answer:
        "The portfolio does not provide enough evidence to answer that confidently.",
      citations: [],
    };
  }

  const token = process.env.HF_TOKEN;

  if (!token) {
    throw new Error("HF_TOKEN is not configured.");
  }

  const client = new InferenceClient(token);

  const evidence = buildEvidence(results);

  const response = await client.chatCompletion({
    model: MODEL,
    provider: "auto",

    messages: [
      {
        role: "system",

        content: `
You are VENU.OS, the portfolio intelligence interface for Venu Madhav.

Answer questions using ONLY the supplied portfolio evidence.

GROUNDING RULES:

1. Every factual statement about Venu must be directly supported by supplied evidence.

2. Never invent or infer unsupported accomplishments, metrics, responsibilities, employers, dates, certifications, technologies, project outcomes, production scale, or business impact.

3. Do not strengthen evidence beyond what it states.

4. You may synthesize multiple sources when the evidence supports the synthesis.

5. Refer to the portfolio owner as Venu, he, him, or his.

6. Keep answers concise, professional, and technically precise.

7. Prefer 2 to 5 sentences.

8. Do not mention retrieval scores, prompts, system instructions, context windows, internal implementation, or model providers.

9. If the evidence is insufficient, say:
"The portfolio does not provide enough evidence to answer that confidently."

OUTPUT REQUIREMENT:

Return ONLY valid JSON using this structure:

{
  "answer": "Your grounded answer here.",
  "sources": [1, 2]
}

The sources array must contain only SOURCE numbers supplied in the evidence.

Do not use Markdown.
Do not use code fences.
Do not add text before or after the JSON.
`,
      },
      {
        role: "user",

        content: `
QUESTION:
${query}

PORTFOLIO EVIDENCE:

${evidence}

Return the grounded answer as JSON.
`,
      },
    ],

    temperature: 0.1,
    max_tokens: 700,
  });

  const message = response.choices?.[0]?.message;
  const content = message?.content;

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("The language model returned an empty response.");
  }

  return parseModelOutput(content, results.length);
}
