import { profile } from "@/data/knowledge/profile";
import { experience } from "@/data/knowledge/experience";
import { projects } from "@/data/knowledge/projects";
import { skills } from "@/data/knowledge/skills";

export type KnowledgeSourceType =
  | "PROFILE"
  | "EXPERIENCE"
  | "PROJECT"
  | "SKILLS";

export type KnowledgeDocument = {
  id: string;
  source: KnowledgeSourceType;
  title: string;
  content: string;
  keywords: string[];
};

const profileDocuments: KnowledgeDocument[] = [
  {
    id: "profile-summary",
    source: "PROFILE",
    title: `${profile.name} — ${profile.title}`,
    content: profile.summary,
    keywords: [
      profile.name,
      profile.title,
      ...profile.positioning,
      ...profile.engineeringFocus,
    ],
  },

  {
    id: "profile-focus",
    source: "PROFILE",
    title: "Venu — Engineering Focus",
    content: `Venu's current engineering focus includes ${profile.currentFocus.join(
      ", "
    )}.`,
    keywords: [...profile.currentFocus, ...profile.engineeringFocus],
  },

  {
    id: "profile-education",
    source: "PROFILE",
    title: "Venu — Education",
    content:
      `${profile.name} earned a ${profile.education.degree} ` +
      `from ${profile.education.institution}, graduating in ` +
      `${profile.education.graduation}.`,
    keywords: [
      "education",
      "university",
      "degree",
      profile.education.institution,
      profile.education.degree,
    ],
  },

  {
    id: "profile-trajectory",
    source: "PROFILE",
    title: "Venu — AI Engineering Trajectory",
    content: profile.careerTrajectory
      .map((item) => `${item.company}: ${item.focus} (${item.period})`)
      .join(". "),
    keywords: [
      "career",
      "trajectory",
      "background",
      "experience",
      ...profile.careerTrajectory.map((item) => item.company),
      ...profile.careerTrajectory.map((item) => item.focus),
    ],
  },
];

const experienceDocuments: KnowledgeDocument[] = experience.flatMap((item) => {
  const overview: KnowledgeDocument = {
    id: `experience-${item.id}-overview`,
    source: "EXPERIENCE",
    title: `${item.company} — ${item.title}`,
    content:
      `${item.company}. ${item.title}. ${item.period}. ` +
      `${item.domain}. ${item.overview}`,
    keywords: [
      item.company,
      item.title,
      item.period,
      item.domain,
      ...item.searchableTopics,
    ],
  };

  const responsibilities: KnowledgeDocument[] = item.responsibilities.map(
    (responsibility, index) => ({
      id: `experience-${item.id}-responsibility-${index + 1}`,
      source: "EXPERIENCE",
      title: `${item.company} — ${item.title}`,
      content: responsibility,
      keywords: [
        item.company,
        item.title,
        item.domain,
        ...item.technologies,
        ...item.searchableTopics,
      ],
    })
  );

  const technologies: KnowledgeDocument = {
    id: `experience-${item.id}-technologies`,
    source: "EXPERIENCE",
    title: `${item.company} — Technology Stack`,
    content:
      `Technologies associated with Venu's work at ` +
      `${item.company} include ${item.technologies.join(", ")}.`,
    keywords: [
      item.company,
      "technology",
      "technologies",
      "tools",
      "stack",
      ...item.technologies,
    ],
  };

  return [overview, ...responsibilities, technologies];
});

const projectDocuments: KnowledgeDocument[] = projects.flatMap((project) => {
  const documents: KnowledgeDocument[] = [
    {
      id: `project-${project.id}-overview`,
      source: "PROJECT",
      title: project.name,
      content: project.overview,
      keywords: [
        project.name,
        project.type,
        project.status,
        ...project.searchableTopics,
      ],
    },
  ];

  if ("architecture" in project) {
    project.architecture.forEach((architectureItem, index) => {
      documents.push({
        id: `project-${project.id}-architecture-${index + 1}`,
        source: "PROJECT",
        title: `${project.name} — Architecture`,
        content: architectureItem,
        keywords: [
          project.name,
          "architecture",
          "system design",
          ...project.searchableTopics,
        ],
      });
    });
  }

  if ("engineeringDecisions" in project) {
    project.engineeringDecisions.forEach((decision, index) => {
      documents.push({
        id: `project-${project.id}-decision-${index + 1}`,
        source: "PROJECT",
        title: decision.question,
        content: decision.answer,
        keywords: [
          project.name,
          decision.question,
          "engineering decision",
          ...project.searchableTopics,
        ],
      });
    });
  }

  if ("features" in project) {
    project.features.forEach((feature, index) => {
      documents.push({
        id: `project-${project.id}-feature-${index + 1}`,
        source: "PROJECT",
        title: `${project.name} — Feature`,
        content: feature,
        keywords: [project.name, "feature", ...project.searchableTopics],
      });
    });
  }

  if ("stack" in project) {
    documents.push({
      id: `project-${project.id}-stack`,
      source: "PROJECT",
      title: `${project.name} — Technology Stack`,
      content: `${project.name} uses ${project.stack.join(", ")}.`,
      keywords: [
        project.name,
        "technology",
        "stack",
        "tools",
        ...project.stack,
      ],
    });
  }

  return documents;
});

const skillDocuments: KnowledgeDocument[] = Object.entries(skills).map(
  ([category, values]) => ({
    id: `skills-${category}`,
    source: "SKILLS",
    title: `${category} skills`,
    content: `Venu's ${category} skills include ${values.join(", ")}.`,
    keywords: [category, "skills", "technologies", "tools", ...values],
  })
);

export const portfolioKnowledge: KnowledgeDocument[] = [
  ...profileDocuments,
  ...experienceDocuments,
  ...projectDocuments,
  ...skillDocuments,
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 1);
}

function scoreDocument(query: string, document: KnowledgeDocument) {
  const normalizedQuery = normalize(query);

  const queryTokens = [...new Set(tokenize(query))];

  const title = normalize(document.title);
  const content = normalize(document.content);

  const normalizedKeywords = document.keywords.map(normalize);

  const stopWords = new Set([
    "what",
    "where",
    "when",
    "which",
    "who",
    "why",
    "how",
    "did",
    "does",
    "has",
    "have",
    "had",
    "work",
    "worked",
    "used",
    "use",
    "venu",
    "about",
    "with",
    "from",
    "into",
    "the",
    "and",
    "for",
    "that",
    "this",
    "his",
    "her",
    "their",
    "was",
    "were",
    "are",
    "is",
  ]);

  const meaningfulTokens = queryTokens.filter((token) => !stopWords.has(token));

  let score = 0;

  for (const token of meaningfulTokens) {
    const titleWords = title.split(" ");

    if (titleWords.includes(token)) {
      score += 20;
    } else if (title.includes(token)) {
      score += 10;
    }

    if (normalizedKeywords.includes(token)) {
      score += 12;
    } else if (normalizedKeywords.some((keyword) => keyword.includes(token))) {
      score += 6;
    }

    if (content.includes(token)) {
      score += 4;
    }
  }

  for (const titleTerm of title.split(" ")) {
    if (titleTerm.length >= 4 && normalizedQuery.includes(titleTerm)) {
      score += 15;
    }
  }

  if (normalizedQuery.length >= 4 && content.includes(normalizedQuery)) {
    score += 10;
  }

  return score;
}

export function searchPortfolioKnowledge(query: string, limit = 4) {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return [];
  }

  return portfolioKnowledge
    .map((document) => ({
      ...document,
      score: scoreDocument(cleanedQuery, document),
    }))
    .filter((document) => document.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
