import type { KnowledgeDocument } from "@/lib/portfolioKnowledge";

export type RankedKnowledgeDocument = KnowledgeDocument & {
  score: number;
};

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function ensureEnding(text: string) {
  const cleaned = cleanText(text);

  if (!cleaned) return cleaned;

  if (/[.!?]$/.test(cleaned)) {
    return cleaned;
  }

  return `${cleaned}.`;
}

export function generateGroundedAnswer(
  query: string,
  results: RankedKnowledgeDocument[]
) {
  if (results.length === 0) {
    return (
      "I couldn't find enough supporting evidence in " +
      "Venu's portfolio knowledge base to answer that confidently."
    );
  }

  const primary = results[0];
  const evidence = ensureEnding(primary.content);

  /*
   * Engineering-decision chunks already contain a direct,
   * portfolio-grounded answer. Return the evidence itself
   * instead of surrounding it with unnecessary metadata.
   */
  if (primary.source === "PROJECT" && primary.id.includes("-decision-")) {
    return evidence;
  }

  if (primary.source === "EXPERIENCE") {
    return `${primary.title}: ${evidence}`;
  }

  if (primary.source === "PROJECT") {
    return `${primary.title}: ${evidence}`;
  }

  if (primary.source === "SKILLS") {
    return evidence;
  }

  return evidence;
}
