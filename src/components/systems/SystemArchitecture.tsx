"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Images,
  GitMerge,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const nodes = [
  {
    id: "router",
    number: "01",
    title: "AGENT ROUTER",
    subtitle: "LangGraph orchestration",
    description:
      "Routes each request through retrieval and generation paths based on query intent and available context.",
    tech: ["LANGGRAPH", "PYTHON", "TOOL CALLING"],
    icon: Workflow,
  },
  {
    id: "text",
    number: "02A",
    title: "TEXT RETRIEVAL",
    subtitle: "Semantic document search",
    description:
      "Retrieves relevant passages from chunked text and document content using dense embeddings and a dedicated vector index.",
    tech: ["EMBEDDINGS", "FAISS", "TOP-K"],
    icon: FileSearch,
  },
  {
    id: "visual",
    number: "02B",
    title: "VISUAL RETRIEVAL",
    subtitle: "Semantic image search",
    description:
      "Uses CLIP-compatible embeddings to retrieve images based on semantic similarity while keeping visual vectors separate from text vectors.",
    tech: ["CLIP", "FAISS", "MULTIMODAL"],
    icon: Images,
  },
  {
    id: "fusion",
    number: "03",
    title: "RANK FUSION",
    subtitle: "Cross-retriever aggregation",
    description:
      "Combines independently ranked text and visual results using rank-based fusion instead of directly comparing incompatible embedding scores.",
    tech: ["RRF", "RERANKING", "TOP-K"],
    icon: GitMerge,
  },
  {
    id: "generation",
    number: "04",
    title: "GROUNDED LLM",
    subtitle: "Context-aware generation",
    description:
      "Generates answers from retrieved evidence while preserving source context for downstream validation and citation grounding.",
    tech: ["LLM", "VLLM", "GROUNDING"],
    icon: BrainCircuit,
  },
  {
    id: "validation",
    number: "05",
    title: "CITATION VALIDATION",
    subtitle: "Reliability layer",
    description:
      "Checks generated responses against retrieved evidence so answers remain attributable to the underlying source context.",
    tech: ["VALIDATION", "GUARDRAILS", "EVALUATION"],
    icon: ShieldCheck,
  },
];

export default function SystemArchitecture() {
  const [active, setActive] = useState("fusion");

  const selected = nodes.find((node) => node.id === active) ?? nodes[0];
  const SelectedIcon = selected.icon;

  return (
    <section className="systems-section" id="systems">
      <div className="systems-container">
        <div className="systems-header">
          <div>
            <span className="section-index">03 / SELECTED SYSTEMS</span>
            <h2>
              MULTIMODAL
              <br />
              AGENTIC RAG
            </h2>
          </div>

          <div className="systems-header-copy">
            <span>ARCHITECTURE / 01</span>
            <p>
              Production-oriented retrieval architecture combining independent
              text and visual search, agent orchestration, rank fusion, grounded
              generation and citation validation.
            </p>
          </div>
        </div>

        <div className="architecture-shell">
          <div className="architecture-status">
            <span>
              <i />
              SYSTEM ONLINE
            </span>
            <span>INTERACTIVE ARCHITECTURE</span>
          </div>

          <div className="query-entry">
            <span>INPUT / QUERY</span>
            <strong>
              &quot;Explain the system using the most relevant text and visual
              evidence.&quot;
            </strong>
            <ArrowRight size={17} />
          </div>

          <div className="architecture-flow">
            <button
              className={`architecture-node ${
                active === "router" ? "active" : ""
              }`}
              onClick={() => setActive("router")}
            >
              <span className="architecture-node-number">01</span>
              <Workflow size={20} />
              <strong>AGENT ROUTER</strong>
              <small>LANGGRAPH</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} />
            </div>

            <div className="retrieval-group">
              <span className="group-label">PARALLEL RETRIEVAL</span>

              <button
                className={`architecture-node ${
                  active === "text" ? "active" : ""
                }`}
                onClick={() => setActive("text")}
              >
                <span className="architecture-node-number">02A</span>
                <FileSearch size={20} />
                <strong>TEXT RETRIEVAL</strong>
                <small>EMBEDDINGS / FAISS</small>
              </button>

              <button
                className={`architecture-node ${
                  active === "visual" ? "active" : ""
                }`}
                onClick={() => setActive("visual")}
              >
                <span className="architecture-node-number">02B</span>
                <Images size={20} />
                <strong>VISUAL RETRIEVAL</strong>
                <small>CLIP / FAISS</small>
              </button>
            </div>

            <div className="flow-arrow">
              <ArrowRight size={16} />
            </div>

            <button
              className={`architecture-node ${
                active === "fusion" ? "active" : ""
              }`}
              onClick={() => setActive("fusion")}
            >
              <span className="architecture-node-number">03</span>
              <GitMerge size={20} />
              <strong>RANK FUSION</strong>
              <small>RRF / RERANK</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} />
            </div>

            <button
              className={`architecture-node ${
                active === "generation" ? "active" : ""
              }`}
              onClick={() => setActive("generation")}
            >
              <span className="architecture-node-number">04</span>
              <BrainCircuit size={20} />
              <strong>GROUNDED LLM</strong>
              <small>INFERENCE</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} />
            </div>

            <button
              className={`architecture-node ${
                active === "validation" ? "active" : ""
              }`}
              onClick={() => setActive("validation")}
            >
              <span className="architecture-node-number">05</span>
              <ShieldCheck size={20} />
              <strong>CITATION VALIDATION</strong>
              <small>RELIABILITY</small>
            </button>
          </div>

          <div className="architecture-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                className="architecture-detail-content"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="architecture-detail-index">
                  {selected.number} / ACTIVE MODULE
                </div>

                <div className="architecture-detail-icon">
                  <SelectedIcon size={24} />
                </div>

                <div>
                  <h3>{selected.title}</h3>
                  <span className="architecture-detail-subtitle">
                    {selected.subtitle}
                  </span>
                </div>

                <p>{selected.description}</p>

                <div className="architecture-tech">
                  {selected.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
