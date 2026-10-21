export const projects = [
  {
    id: "nova",
    name: "NOVA — Local Personal AI Workspace",
    type: "Independent AI Engineering Project",
    status: "v1.0 Local MVP",
    overview:
      "NOVA is a local-first personal AI workspace with authenticated device continuity, owned context and memory, grounded retrieval, proactive preference drafts and a human-in-the-loop approval interface. Its public source is https://github.com/venuuniv-ai/NOVA. Deterministic fixtures are the default; bounded CPU-only BGE and Qwen acceptance was validated separately. It is a local MVP, not a hosted production service or a general AI quality claim.",
    features: [
      "Local authentication with owner and device authorization.",
      "Persistent task continuity across Desktop, Wearable and Mobile interfaces.",
      "Hybrid lexical and pgvector retrieval with versioned BGE embeddings.",
      "Grounded selection with independently checked values, original source UUIDs, exact quotes and final privacy revalidation.",
      "Durable proactive drafts stop at pending human approval; no automatic external actions.",
      "Repeatable launch, health-check, shutdown and recovery procedures with local resource gates.",
      "SELECTION_V1 engineering milestone: the model selects an exact value and evidence index; the application independently validates support, original UUID/full quote, conflicts and current privacy. Earlier production positive requests abstained. The new bounded positive and conditional insufficiency cases passed without changing model or resource ceilings; the historical cause remains unresolved.",
      "Real acceptance measured positive input/output tokens 154/19, model-call latency 6683.123 ms and HTTP wall time 12311.788 ms; insufficiency 130/18 tokens, 5498.805 ms model-call and 8991.005 ms HTTP. One sample per case, zero retries, CPU-only Apple M2 with 8 GiB RAM; not throughput or percentile benchmarks.",
      "Five-positive-question retrieval-v1 benchmark: lexical Recall@5/MRR/nDCG@5 0.4/0.4/0.4; fixture hashes 1.0/0.69/0.7475; learned BGE semantic and hybrid 1.0/0.9/0.9101. BGE still returned five irrelevant hits for the no-answer query. Tiny-set results are not general semantic superiority.",
      "Qualification: 762 backend tests passed with one explicit real-model opt-in skip; 60 browser cases passed across separate profiles. These deterministic checks are not learned-model quality scores.",
    ],
    architecture: [
      "Next.js and a Go gateway connect to FastAPI, PostgreSQL with pgvector, Redis and local Kafka.",
      "Transactional outbox and inbox records support durable delivery, deduplication and bounded worker recovery.",
      "Provider abstractions keep deterministic fixture operation separate from explicitly enabled local inference.",
      "BGE-small-en-v1.5 and Qwen2.5-1.5B run sequentially on CPU under fixed context, memory and timeout limits.",
      "Owned source bindings, conflict checks and atomic final privacy validation guard draft acceptance; model output cannot grant action authority.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "Go", "PostgreSQL", "pgvector", "Redis", "Kafka", "Docker Compose", "BGE", "Qwen", "Ollama"],
    engineeringDecisions: [
      {
        question: "Why does NOVA default to deterministic fixtures?",
        answer: "Fixtures keep local development and automated qualification repeatable without paid APIs or accidental model activation. The UI labels simulated behavior; real inference requires explicit enablement and resource checks.",
      },
      {
        question: "What are NOVA's grounding and release limits?",
        answer: "Grounding covers a narrow structured preference subset with exact-value and source verification, not general semantic entailment. The local release does not qualify real vision, model judging, sustained load or production deployment. Draft approval does not enable automatic external execution.",
      },
    ],
    searchableTopics: ["NOVA", "Local MVP", "Local AI", "Grounded RAG", "Proactive Drafts", "Human-in-the-loop", "Device Continuity", "BGE", "Qwen", "pgvector", "Kafka", "Privacy", "Source Validation"],
  },
  {
    id: "multimodal-agentic-rag",

    name: "Multimodal Agentic RAG & AI Inference Platform",

    type: "Independent AI Engineering Project",

    status: "In Development",

    overview:
      "A production-oriented multimodal retrieval and AI inference platform designed to explore agentic orchestration, independent text and visual retrieval, rank fusion, grounded generation, citation validation, evaluation, and scalable model serving.",

    architecture: [
      "User queries enter an agent router responsible for orchestrating retrieval and generation workflows.",
      "Text documents are processed into text embeddings and stored in a dedicated FAISS vector index.",
      "Images are represented using CLIP-compatible visual embeddings and stored in a separate FAISS index.",
      "Text and visual retrieval operate independently because similarity scores produced by different embedding spaces are not assumed to be directly comparable.",
      "Reciprocal Rank Fusion is used to combine independently ranked retrieval results.",
      "Retrieved evidence is passed to the language model for grounded response generation.",
      "Citation validation checks generated responses against retrieved source context.",
    ],

    components: {
      orchestration: ["LangGraph", "Agent Routing", "Tool Calling"],

      textRetrieval: [
        "Text Embeddings",
        "FAISS",
        "Semantic Search",
        "Top-K Retrieval",
      ],

      visualRetrieval: [
        "CLIP",
        "Image Embeddings",
        "FAISS",
        "Semantic Image Search",
      ],

      fusion: [
        "Reciprocal Rank Fusion",
        "Reranking",
        "Cross-Retriever Aggregation",
      ],

      generation: [
        "Large Language Models",
        "Grounded Generation",
        "Context Assembly",
      ],

      inference: [
        "vLLM",
        "ONNX",
        "CUDA",
        "TensorRT",
        "TensorRT-LLM",
        "Triton Inference Server",
      ],

      deployment: [
        "FastAPI",
        "Docker",
        "Kubernetes",
        "AWS",
        "GitHub Actions",
        "Prometheus",
      ],

      evaluation: [
        "Recall@K",
        "Faithfulness",
        "Retrieval Quality",
        "TTFT",
        "P50 Latency",
        "P95 Latency",
        "Tokens per Second",
        "Throughput",
        "Concurrency",
      ],
    },

    engineeringDecisions: [
      {
        question:
          "Why are text and visual embeddings stored in separate vector indexes?",

        answer:
          "Text and visual embeddings may be produced by different models and occupy different representation spaces. Their raw similarity scores should not automatically be treated as directly comparable, so retrieval is performed independently before combining ranked results.",
      },

      {
        question: "Why use Reciprocal Rank Fusion?",

        answer:
          "Reciprocal Rank Fusion combines rankings from heterogeneous retrievers without requiring their raw similarity scores to share the same numerical scale. This makes it suitable for combining independent text and visual retrieval results.",
      },

      {
        question: "What does CLIP provide in this architecture?",

        answer:
          "CLIP provides semantic text-to-image retrieval by mapping textual and visual concepts into a compatible representation space. It supports semantic image retrieval but is not presented as a replacement for detailed vision-language reasoning.",
      },

      {
        question: "How is inference performance evaluated?",

        answer:
          "The inference benchmark is designed to compare serving configurations using metrics such as time to first token, P50 and P95 latency, tokens per second, throughput, GPU memory utilization, concurrency, and error rate under reproducible workloads.",
      },
    ],

    searchableTopics: [
      "Multimodal RAG",
      "Agentic RAG",
      "Retrieval-Augmented Generation",
      "LangGraph",
      "FAISS",
      "CLIP",
      "Vector Search",
      "Semantic Search",
      "Reciprocal Rank Fusion",
      "RRF",
      "Reranking",
      "Grounded Generation",
      "Citation Validation",
      "vLLM",
      "ONNX",
      "CUDA",
      "TensorRT",
      "TensorRT-LLM",
      "Triton",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "AWS",
      "Prometheus",
      "LLM Evaluation",
      "Inference Optimization",
    ],
  },

  {
    id: "venu-os",

    name: "VENU.OS",

    type: "Interactive AI Engineering Portfolio",

    status: "Active Development",

    overview:
      "An interactive AI engineering portfolio designed as an explorable systems interface rather than a traditional static portfolio. It demonstrates AI engineering concepts through interactive architecture, system traces, retrieval exploration, inference benchmarking, and a portfolio-grounded AI assistant.",

    features: [
      "Interactive AI systems console",
      "Engineering experience graph",
      "Multimodal RAG architecture explorer",
      "Agent execution trace visualizer",
      "Retrieval explorer",
      "Inference benchmark interface",
      "Portfolio-grounded Ask Venu assistant",
      "Responsive engineering-focused interface",
    ],

    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "CSS",
      "Framer Motion",
      "FastAPI",
      "Python",
      "RAG",
      "Vector Retrieval",
      "LLM Integration",
    ],

    architecture: [
      "Next.js provides the interactive frontend and engineering interface.",
      "Structured portfolio knowledge provides grounding data for the Ask Venu assistant.",
      "A retrieval layer will identify relevant experience, projects, technologies, and engineering decisions.",
      "A FastAPI backend will expose portfolio retrieval and generation services.",
      "The final assistant will generate responses grounded in retrieved portfolio context rather than relying on unrestricted model knowledge.",
    ],

    searchableTopics: [
      "VENU.OS",
      "AI Portfolio",
      "Next.js",
      "TypeScript",
      "React",
      "FastAPI",
      "Portfolio RAG",
      "Ask Venu",
      "Interactive Architecture",
      "Agent Trace",
      "Retrieval Explorer",
      "Inference Benchmark",
      "Production AI",
    ],
  },
] as const;
