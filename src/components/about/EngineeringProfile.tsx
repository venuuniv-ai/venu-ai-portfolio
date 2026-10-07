"use client";

import { motion } from "framer-motion";

const stackGroups = [
  {
    number: "01",
    title: "GENAI / LLM",
    items: [
      "Large Language Models",
      "RAG",
      "Agentic AI",
      "LangGraph",
      "Prompt Engineering",
      "Fine-Tuning",
      "Model Evaluation",
      "AI Guardrails",
    ],
  },
  {
    number: "02",
    title: "ML / MULTIMODAL",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "DeepSpeed",
      "Computer Vision",
      "CLIP",
      "Multimodal Learning",
      "Active Learning",
    ],
  },
  {
    number: "03",
    title: "RETRIEVAL",
    items: [
      "FAISS",
      "Vector Search",
      "Semantic Search",
      "Text Embeddings",
      "Reranking",
      "Reciprocal Rank Fusion",
      "Top-K Retrieval",
      "Citation Validation",
    ],
  },
  {
    number: "04",
    title: "INFERENCE",
    items: [
      "vLLM",
      "ONNX",
      "CUDA",
      "TensorRT",
      "TensorRT-LLM",
      "Triton",
      "Quantization",
      "Model Serving",
    ],
  },
  {
    number: "05",
    title: "ML INFRASTRUCTURE",
    items: [
      "Docker",
      "Kubernetes",
      "MLflow",
      "DVC",
      "Airflow",
      "GitHub Actions",
      "Prometheus",
      "Observability",
    ],
  },
  {
    number: "06",
    title: "CLOUD / SYSTEMS",
    items: [
      "AWS",
      "EC2",
      "S3",
      "SageMaker",
      "Azure",
      "Databricks",
      "Delta Lake",
      "Distributed Systems",
    ],
  },
];

const principles = [
  {
    number: "01",
    title: "GROUND THE OUTPUT",
    description:
      "Retrieval, evidence attribution, evaluation, and validation belong inside the system — not after it.",
  },
  {
    number: "02",
    title: "MEASURE THE SYSTEM",
    description:
      "Latency, throughput, reliability, retrieval quality, and resource utilization should be observable and reproducible.",
  },
  {
    number: "03",
    title: "DESIGN FOR FAILURE",
    description:
      "Production AI needs fallbacks, guardrails, bounded behavior, monitoring, and explicit failure paths.",
  },
];

export default function EngineeringProfile() {
  return (
    <section className="engineering-profile" id="about">
      <div className="engineering-profile-inner">
        <motion.div
          className="engineering-profile-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="engineering-profile-kicker">
              TOOLS & ENGINEERING APPROACH
            </p>

            <h2 className="engineering-profile-title">Across the <em>AI system stack.</em></h2>
          </div>

          <div className="engineering-profile-summary">
            <p>
              AI/ML Engineer working across Generative AI, large language
              models, multimodal learning, retrieval systems, inference, and
              production ML infrastructure.
            </p>

            <div className="engineering-profile-signal">
              <span />
              TOOLS / MODELS / INFRA
            </div>
          </div>
        </motion.div>

        <div className="engineering-stack-grid" id="engineering-stack">
          {stackGroups.map((group, index) => (
            <motion.article
              className="engineering-stack-card"
              key={group.title}
              id={group.title === "ML INFRASTRUCTURE" ? "ml-infrastructure" : undefined}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.04,
              }}
            >
              <div className="engineering-stack-card-top">
                <span>{group.number}</span>

                <span>
                  {group.items.length.toString().padStart(2, "0")} TOOLS
                </span>
              </div>

              <h3>{group.title}</h3>

              <div className="engineering-stack-items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="engineering-about-grid">
          <motion.div
            className="engineering-about-copy"
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="engineering-about-label">
              ABOUT / ENGINEERING APPROACH
            </p>

            <h3>
              FROM MODEL BEHAVIOR
              <br />
              TO PRODUCTION BEHAVIOR.
            </h3>

            <p>
              My work sits at the boundary between model capability and
              production engineering: how information is retrieved, how models
              are orchestrated, how inference is served, how outputs are
              evaluated, and how the overall system behaves under real operating
              constraints.
            </p>

            <p>
              The focus is not simply getting a model to produce an answer. It
              is building AI systems whose retrieval, generation, deployment,
              observability, and failure modes can be understood and engineered.
            </p>
          </motion.div>

          <div className="engineering-principles">
            {principles.map((principle, index) => (
              <motion.article
                className="engineering-principle"
                key={principle.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
              >
                <span className="engineering-principle-number">
                  {principle.number}
                </span>

                <div>
                  <h4>{principle.title}</h4>

                  <p>{principle.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="engineering-profile-footer">
          <span>PYTHON / TYPESCRIPT / SQL</span>

          <span>MODELS → RETRIEVAL → SERVING</span>

          <span>PRODUCTION AI ENGINEERING</span>
        </div>
      </div>
    </section>
  );
}
