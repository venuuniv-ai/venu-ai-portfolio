export const projects = [
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
