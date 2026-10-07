"use client";

import { useEffect, useRef, useState } from "react";
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
      "Uses CLIP-compatible embeddings for semantic image retrieval in a separate visual index. CLIP supplies similarity representations, not pixel-level visual reasoning.",
    tech: ["CLIP", "FAISS", "MULTIMODAL"],
    icon: Images,
  },
  {
    id: "fusion",
    number: "03",
    title: "RANK FUSION",
    subtitle: "Cross-retriever aggregation",
    description:
      "Combines independently ranked text and visual results using Reciprocal Rank Fusion (RRF) instead of directly comparing raw similarity scores from unrelated embedding models.",
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

const nodeIO: Record<string, [string, string]> = {
    router: ["Query and available context", "Selected retrieval and generation paths"],
    text: ["Query embedded in the text model’s vector space", "Ranked passages from the text index"],
    visual: ["CLIP-compatible query embedding", "Ranked images from the visual index"],
    fusion: ["Independent text and image rankings", "Rank-fused evidence using RRF"],
    generation: ["Query and retrieved evidence", "Answer with source references"],
    validation: ["Answer and retrieved sources", "Validated citations or a reliability failure"],
  };

export default function SystemArchitecture() {
  const explorerRef = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useState("fusion");

  useEffect(() => {
    const selectDestination = () => {
      if (["#systems", "#systems-visual"].includes(window.location.hash) && explorerRef.current) explorerRef.current.open = true;
      if (window.location.hash === "#systems-visual") setActive("visual");
      if (window.location.hash === "#systems") setActive("router");
    };
    const frame = window.requestAnimationFrame(selectDestination);
    window.addEventListener("hashchange", selectDestination);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", selectDestination);
    };
  }, []);

  const selected = nodes.find((node) => node.id === active) ?? nodes[0];
  const SelectedIcon = selected.icon;


  return (
    <section className="systems-section" id="systems">
      <div className="systems-container">
        <div className="systems-header">
          <div>
            <span className="section-index">SYSTEM ARCHITECTURE</span>
            <h2>How the system <em>works.</em></h2>
          </div>

          <div className="systems-header-copy">
            <span>MULTIMODAL AGENTIC RAG</span>
            <p>
              Production-oriented retrieval architecture combining independent
              text and visual search, agent orchestration, rank fusion, grounded
              generation and citation validation.
            </p>
          </div>
        </div>

        <details className="system-explorer" ref={explorerRef}><summary>Explore the architecture <span>Six selectable stages · inputs, outputs & decisions</span></summary>
        <div className="architecture-shell">
          <div className="architecture-status">
            <span>
              <i />
              ARCHITECTURE DEMO
            </span>
            <span>INTERACTIVE ARCHITECTURE</span>
          </div>

          <div className="query-entry">
            <span>INPUT / QUERY</span>
            <strong>
              &quot;Explain the system using the most relevant text and visual
              evidence.&quot;
            </strong>
            <ArrowRight size={17} aria-hidden="true" />
          </div>

          <div className="architecture-flow" aria-label="Select a pipeline stage to explore its role">
            <button
              className={`architecture-node ${
                active === "router" ? "active" : ""
              }`}
              onClick={() => setActive("router")}
              aria-pressed={active === "router"}
            >
              <span className="architecture-node-number">01</span>
              <Workflow size={20} aria-hidden="true" />
              <strong>AGENT ROUTER</strong>
              <small>LANGGRAPH</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} aria-hidden="true" />
            </div>

            <div className="retrieval-group" id="systems-visual">
              <span className="group-label">PARALLEL RETRIEVAL</span>

              <button
                className={`architecture-node ${
                  active === "text" ? "active" : ""
                }`}
                onClick={() => setActive("text")}
              aria-pressed={active === "text"}
              >
                <span className="architecture-node-number">02A</span>
                <FileSearch size={20} aria-hidden="true" />
                <strong>TEXT RETRIEVAL</strong>
                <small>EMBEDDINGS / FAISS</small>
              </button>

              <button
                className={`architecture-node ${
                  active === "visual" ? "active" : ""
                }`}
                onClick={() => setActive("visual")}
              aria-pressed={active === "visual"}
              >
                <span className="architecture-node-number">02B</span>
                <Images size={20} aria-hidden="true" />
                <strong>VISUAL RETRIEVAL</strong>
                <small>CLIP / FAISS</small>
              </button>
            </div>

            <div className="flow-arrow">
              <ArrowRight size={16} aria-hidden="true" />
            </div>

            <button
              className={`architecture-node ${
                active === "fusion" ? "active" : ""
              }`}
              onClick={() => setActive("fusion")}
              aria-pressed={active === "fusion"}
            >
              <span className="architecture-node-number">03</span>
              <GitMerge size={20} aria-hidden="true" />
              <strong>RANK FUSION</strong>
              <small>RRF / RERANK</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} aria-hidden="true" />
            </div>

            <button
              className={`architecture-node ${
                active === "generation" ? "active" : ""
              }`}
              onClick={() => setActive("generation")}
              aria-pressed={active === "generation"}
            >
              <span className="architecture-node-number">04</span>
              <BrainCircuit size={20} aria-hidden="true" />
              <strong>GROUNDED LLM</strong>
              <small>INFERENCE</small>
            </button>

            <div className="flow-arrow">
              <ArrowRight size={16} aria-hidden="true" />
            </div>

            <button
              className={`architecture-node ${
                active === "validation" ? "active" : ""
              }`}
              onClick={() => setActive("validation")}
              aria-pressed={active === "validation"}
            >
              <span className="architecture-node-number">05</span>
              <ShieldCheck size={20} aria-hidden="true" />
              <strong>CITATION VALIDATION</strong>
              <small>RELIABILITY</small>
            </button>
          </div>

          <div className="architecture-detail" aria-live="polite">
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
                  <SelectedIcon size={24} aria-hidden="true" />
                </div>

                <div>
                  <h3>{selected.title}</h3>
                  <span className="architecture-detail-subtitle">
                    {selected.subtitle}
                  </span>
                </div>

                <div className="architecture-context">
                  <p>{selected.description}</p>
                  <dl className="architecture-io">
                    <dt>INPUT</dt><dd>{nodeIO[selected.id][0]}</dd>
                    <dt>OUTPUT</dt><dd>{nodeIO[selected.id][1]}</dd>
                  </dl>
                </div>

                <div className="architecture-tech">
                  {selected.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </details>
      </div>
    </section>
  );
}
