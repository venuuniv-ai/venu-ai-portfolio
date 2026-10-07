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

  const professionalQuestion = /\b(experience|career|trajectory|worked)\b|\bwhere\b.*\b(used|use|built|worked)\b/i.test(query);
  if (professionalQuestion) {
    const experience = results.filter((result) => result.source === "EXPERIENCE");
    if (experience.length > 0) {
      const project = results.find((result) => result.source === "PROJECT" && result.id.endsWith("-overview"));
      const evidence = experience.slice(0, 3);
      if (project && /\brag\b/i.test(query)) evidence.push(project);
      return evidence.map((result) => `${result.title}: ${ensureEnding(result.content)}`).join("\n\n");
    }
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
