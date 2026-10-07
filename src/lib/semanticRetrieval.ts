import {
  portfolioKnowledge,
  type KnowledgeDocument,
} from "@/lib/portfolioKnowledge";

export type RankedSemanticDocument = KnowledgeDocument & {
  score: number;
  semanticScore: number;
  lexicalScore: number;
};

type QueryIntent = {
  professional: boolean;
  project: boolean;
  skills: boolean;
  multimodal: boolean;
  generativeAI: boolean;
  infrastructure: boolean;
  retrieval: boolean;
  agentic: boolean;
  company?: string;
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "being",
  "by",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "them",
  "they",
  "this",
  "to",
  "used",
  "uses",
  "using",
  "venu",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "work",
  "worked",
]);

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function detectIntent(query: string): QueryIntent {
  const normalized = normalize(query);

  const companyNames = ["accenture", "qualcomm", "perplexity"];

  const company = companyNames.find((name) => normalized.includes(name));

  return {
    professional:
      /\b(experience|career|professional|job|role|roles|company|companies|employer|employment|worked|background|trajectory)\b/.test(
        normalized
      ),

    project:
      /\b(project|projects|built|build|architecture|system|systems|platform)\b/.test(
        normalized
      ),

    skills:
      /\b(skill|skills|technology|technologies|tools|stack|framework|frameworks)\b/.test(
        normalized
      ),

    multimodal:
      /\b(multimodal|modality|modalities|vision|visual|image|images|camera|radar|lidar|clip|perception|edge ai)\b/.test(
        normalized
      ),

    generativeAI:
      /\b(generative|genai|llm|llms|large language model|language models|fine-tuning|finetuning|prompt)\b/.test(
        normalized
      ),

    infrastructure:
      /\b(infrastructure|infra|inference|deployment|serving|distributed|production|mlops|cloud|observability|kubernetes|docker|triton|vllm|cuda|tensorrt)\b/.test(
        normalized
      ),

    retrieval:
      /\b(rag|retrieval|retrieve|search|vector|embedding|embeddings|faiss|grounded|grounding|reranking|rrf)\b/.test(
        normalized
      ),

    agentic:
      /\b(agent|agents|agentic|langgraph|orchestration|orchestrate|router|workflow)\b/.test(
        normalized
      ),

    company,
  };
}

function expandQuery(query: string) {
  const intent = detectIntent(query);

  const expansions: string[] = [query];

  if (intent.company) {
    expansions.push(
      `${intent.company} professional experience`,
      `${intent.company} responsibilities`,
      `${intent.company} engineering role`
    );
  }

  if (intent.multimodal) {
    expansions.push(
      "multimodal AI",
      "multimodal learning",
      "multimodal perception",
      "camera radar lidar",
      "visual retrieval",
      "CLIP",
      "edge AI",
      "Qualcomm machine learning"
    );
  }

  if (
    intent.multimodal &&
    /\b(combine|combines|combining|merge|fusion|fuse|together|integrate)\b/.test(
      normalize(query)
    )
  ) {
    expansions.push(
      "rank fusion",
      "Reciprocal Rank Fusion",
      "RRF",
      "heterogeneous retrievers",
      "independent text and visual retrieval"
    );
  }

  if (intent.generativeAI) {
    expansions.push(
      "Generative AI",
      "large language models",
      "LLM systems",
      "fine-tuning",
      "model evaluation",
      "Perplexity AI ML Engineer"
    );
  }

  if (intent.retrieval) {
    expansions.push(
      "Retrieval-Augmented Generation",
      "RAG",
      "vector retrieval",
      "semantic search",
      "FAISS",
      "text embeddings",
      "grounded generation",
      "citation validation"
    );
  }

  if (intent.agentic) {
    expansions.push(
      "agentic AI",
      "AI agents",
      "LangGraph",
      "agent router",
      "workflow orchestration"
    );
  }

  if (intent.infrastructure) {
    expansions.push(
      "ML infrastructure",
      "LLM inference",
      "distributed systems",
      "distributed training",
      "model deployment",
      "production ML",
      "cloud deployment",
      "observability",
      "model serving",
      "Docker Kubernetes"
    );
  }

  if (intent.professional) {
    expansions.push(
      "professional experience",
      "engineering responsibilities",
      "production engineering experience"
    );
  }

  return expansions.join(". ");
}

function lexicalSimilarity(query: string, document: KnowledgeDocument) {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return 0;
  }

  const titleTokens = new Set(tokenize(document.title));

  const contentTokens = new Set(tokenize(document.content));

  const keywordTokens = new Set(
    document.keywords.flatMap((keyword) => tokenize(keyword))
  );

  let score = 0;

  for (const token of queryTokens) {
    if (titleTokens.has(token)) {
      score += 3;
    }

    if (keywordTokens.has(token)) {
      score += 2;
    }

    if (contentTokens.has(token)) {
      score += 1;
    }
  }

  const maximumPossibleScore = queryTokens.length * 6;

  return Math.min(score / maximumPossibleScore, 1);
}

function phraseSimilarity(query: string, document: KnowledgeDocument) {
  const normalizedQuery = normalize(query);

  const combined = normalize(
    `${document.title} ${document.content} ${document.keywords.join(" ")}`
  );

  let score = 0;

  const importantPhrases = [
    "multimodal",
    "generative ai",
    "large language model",
    "llm",
    "rag",
    "retrieval",
    "agentic",
    "agent",
    "langgraph",
    "faiss",
    "inference",
    "infrastructure",
    "distributed",
    "deployment",
    "production",
    "qualcomm",
    "perplexity",
    "accenture",
    "camera",
    "radar",
    "lidar",
    "computer vision",
    "edge ai",
    "vllm",
    "triton",
    "docker",
    "kubernetes",
  ];

  for (const phrase of importantPhrases) {
    if (normalizedQuery.includes(phrase) && combined.includes(phrase)) {
      score += 0.08;
    }
  }

  return Math.min(score, 0.4);
}

function getIntentBoost(query: string, document: KnowledgeDocument) {
  const intent = detectIntent(query);

  const title = normalize(document.title);
  const content = normalize(document.content);

  const combined = `${title} ${content}`;

  let boost = 0;

  if (intent.company) {
    if (document.source === "EXPERIENCE" && combined.includes(intent.company)) {
      boost += 0.34;
    } else if (combined.includes(intent.company)) {
      boost += 0.1;
    }
  }

  if (intent.professional && document.source === "EXPERIENCE") {
    boost += 0.12;
  }

  if (intent.multimodal) {
    if (document.source === "EXPERIENCE" && combined.includes("qualcomm")) {
      boost += 0.2;
    }

    if (
      combined.includes("multimodal") ||
      combined.includes("camera") ||
      combined.includes("radar") ||
      combined.includes("lidar") ||
      combined.includes("perception")
    ) {
      boost += 0.08;
    }
  }

  if (intent.generativeAI) {
    if (document.source === "EXPERIENCE" && combined.includes("perplexity")) {
      boost += 0.2;
    }

    if (
      combined.includes("large language") ||
      combined.includes("generative ai") ||
      combined.includes("llm")
    ) {
      boost += 0.07;
    }
  }

  if (intent.infrastructure && document.source === "EXPERIENCE") {
    boost += 0.09;
  }

  if (
    intent.retrieval &&
    (combined.includes("rag") ||
      combined.includes("retrieval") ||
      combined.includes("faiss"))
  ) {
    boost += 0.08;
  }

  if (
    intent.agentic &&
    (combined.includes("langgraph") || combined.includes("agent"))
  ) {
    boost += 0.08;
  }

  if (intent.project && document.source === "PROJECT") {
    boost += 0.06;
  }

  if (intent.skills && document.source === "SKILLS") {
    boost += 0.07;
  }

  return boost;
}

function diversifyResults(ranked: RankedSemanticDocument[], limit: number) {
  if (ranked.length <= limit) {
    return ranked;
  }

  const selected: RankedSemanticDocument[] = [];

  const selectedIds = new Set<string>();

  const first = ranked[0];

  if (first) {
    selected.push(first);
    selectedIds.add(first.id);
  }

  const sourcePriority: KnowledgeDocument["source"][] = [
    "EXPERIENCE",
    "PROJECT",
    "SKILLS",
    "PROFILE",
  ];

  for (const source of sourcePriority) {
    if (selected.length >= limit) {
      break;
    }

    if (selected.some((document) => document.source === source)) {
      continue;
    }

    const candidate = ranked.find(
      (document) => document.source === source && !selectedIds.has(document.id)
    );

    if (candidate) {
      selected.push(candidate);
      selectedIds.add(candidate.id);
    }
  }

  for (const document of ranked) {
    if (selected.length >= limit) {
      break;
    }

    if (!selectedIds.has(document.id)) {
      selected.push(document);
      selectedIds.add(document.id);
    }
  }

  return selected.sort(
    (firstDocument, secondDocument) =>
      secondDocument.score - firstDocument.score
  );
}

export async function searchPortfolioSemantically(
  query: string,
  limit = 4
): Promise<RankedSemanticDocument[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const expandedQuery = expandQuery(trimmedQuery);

  const ranked = portfolioKnowledge.map((document) => {
    const lexicalScore = lexicalSimilarity(expandedQuery, document);

    const phraseScore = phraseSimilarity(trimmedQuery, document);

    const intentBoost = getIntentBoost(trimmedQuery, document);

    const score = lexicalScore * 0.65 + phraseScore + intentBoost;

    return {
      ...document,
      score,
      semanticScore: 0,
      lexicalScore,
    };
  });

  const sorted = ranked.sort((first, second) => second.score - first.score);

  return diversifyResults(sorted, limit);
}
