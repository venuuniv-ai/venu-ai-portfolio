import { pipeline } from "@huggingface/transformers";

import {
  portfolioKnowledge,
  type KnowledgeDocument,
} from "@/lib/portfolioKnowledge";

export type RankedSemanticDocument = KnowledgeDocument & {
  score: number;
  semanticScore: number;
  lexicalScore: number;
};

type EmbeddingOutput = {
  data: Float32Array | number[];
};

type FeatureExtractor = (
  text: string,
  options: {
    pooling: "mean";
    normalize: boolean;
  }
) => Promise<EmbeddingOutput>;

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

let extractorPromise: Promise<FeatureExtractor> | null = null;

let portfolioEmbeddingPromise: Promise<number[][]> | null = null;

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

async function getExtractor(): Promise<FeatureExtractor> {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ).then((extractor) => extractor as unknown as FeatureExtractor);
  }

  return extractorPromise;
}

async function createEmbedding(text: string): Promise<number[]> {
  const extractor = await getExtractor();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

function cosineSimilarity(first: number[], second: number[]) {
  if (first.length !== second.length || first.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let firstMagnitude = 0;
  let secondMagnitude = 0;

  for (let index = 0; index < first.length; index++) {
    dotProduct += first[index] * second[index];

    firstMagnitude += first[index] * first[index];

    secondMagnitude += second[index] * second[index];
  }

  if (firstMagnitude === 0 || secondMagnitude === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(firstMagnitude) * Math.sqrt(secondMagnitude));
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

function getIntentBoost(query: string, document: KnowledgeDocument) {
  const intent = detectIntent(query);

  const title = normalize(document.title);
  const content = normalize(document.content);

  const combined = `${title} ${content}`;

  let boost = 0;

  /*
   * Direct employer questions should strongly
   * prioritize actual experience chunks.
   */
  if (intent.company) {
    if (document.source === "EXPERIENCE" && combined.includes(intent.company)) {
      boost += 0.22;
    } else if (combined.includes(intent.company)) {
      boost += 0.08;
    }
  }

  /*
   * Professional-experience questions should
   * favor EXPERIENCE over generic profile,
   * skill, or project summaries.
   */
  if (intent.professional && document.source === "EXPERIENCE") {
    boost += 0.1;
  }

  /*
   * Multimodal experience should surface
   * Qualcomm professional evidence as well
   * as the independent multimodal project.
   */
  if (intent.multimodal) {
    if (document.source === "EXPERIENCE" && combined.includes("qualcomm")) {
      boost += 0.14;
    }

    if (
      combined.includes("multimodal") ||
      combined.includes("camera") ||
      combined.includes("radar") ||
      combined.includes("lidar") ||
      combined.includes("perception")
    ) {
      boost += 0.05;
    }
  }

  /*
   * LLM / GenAI experience should prioritize
   * Perplexity professional evidence.
   */
  if (intent.generativeAI) {
    if (document.source === "EXPERIENCE" && combined.includes("perplexity")) {
      boost += 0.14;
    }

    if (
      combined.includes("large language") ||
      combined.includes("generative ai") ||
      combined.includes("llm")
    ) {
      boost += 0.04;
    }
  }

  if (intent.infrastructure && document.source === "EXPERIENCE") {
    boost += 0.06;
  }

  if (
    intent.retrieval &&
    (combined.includes("rag") ||
      combined.includes("retrieval") ||
      combined.includes("faiss"))
  ) {
    boost += 0.04;
  }

  if (
    intent.agentic &&
    (combined.includes("langgraph") || combined.includes("agent"))
  ) {
    boost += 0.04;
  }

  if (intent.project && document.source === "PROJECT") {
    boost += 0.04;
  }

  if (intent.skills && document.source === "SKILLS") {
    boost += 0.05;
  }

  return boost;
}

function getPortfolioEmbeddingText(document: KnowledgeDocument) {
  return `${document.title}. ${document.content}`;
}

async function getPortfolioEmbeddings() {
  if (!portfolioEmbeddingPromise) {
    portfolioEmbeddingPromise = Promise.all(
      portfolioKnowledge.map((document) =>
        createEmbedding(getPortfolioEmbeddingText(document))
      )
    );
  }

  return portfolioEmbeddingPromise;
}

function diversifyResults(ranked: RankedSemanticDocument[], limit: number) {
  if (ranked.length <= limit) {
    return ranked;
  }

  const selected: RankedSemanticDocument[] = [];

  const selectedIds = new Set<string>();

  /*
   * Keep the strongest overall result.
   */
  const first = ranked[0];

  if (first) {
    selected.push(first);
    selectedIds.add(first.id);
  }

  /*
   * Add strong evidence from different source
   * categories so the LLM receives professional
   * experience + projects + skills when relevant.
   */
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

  /*
   * Fill remaining slots using overall score.
   */
  for (const document of ranked) {
    if (selected.length >= limit) {
      break;
    }

    if (!selectedIds.has(document.id)) {
      selected.push(document);
      selectedIds.add(document.id);
    }
  }

  /*
   * Preserve final relevance ordering.
   */
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

  const [queryEmbedding, portfolioEmbeddings] = await Promise.all([
    createEmbedding(expandedQuery),
    getPortfolioEmbeddings(),
  ]);

  const ranked = portfolioKnowledge.map((document, index) => {
    const semanticScore = cosineSimilarity(
      queryEmbedding,
      portfolioEmbeddings[index]
    );

    const lexicalScore = lexicalSimilarity(expandedQuery, document);

    const intentBoost = getIntentBoost(trimmedQuery, document);

    /*
     * Base relevance remains primarily
     * semantic. Lexical matching improves
     * technical precision, while a bounded
     * intent boost helps surface the correct
     * professional evidence.
     */
    const baseScore = semanticScore * 0.7 + lexicalScore * 0.3;

    const score = baseScore + intentBoost;

    return {
      ...document,
      score,
      semanticScore,
      lexicalScore,
    };
  });

  const sorted = ranked.sort((first, second) => second.score - first.score);

  return diversifyResults(sorted, limit);
}
