"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Search,
  Gauge,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type LabMode = "trace" | "retrieval" | "inference";

const traceSteps = [
  {
    id: "01",
    name: "QUERY RECEIVED",
    meta: "input / normalized",
    status: "complete",
  },
  {
    id: "02",
    name: "AGENT ROUTER",
    meta: "intent / retrieval",
    status: "complete",
  },
  {
    id: "03",
    name: "TEXT RETRIEVAL",
    meta: "faiss / top-k",
    status: "complete",
  },
  {
    id: "04",
    name: "VISUAL RETRIEVAL",
    meta: "clip / faiss",
    status: "complete",
  },
  { id: "05", name: "RANK FUSION", meta: "rrf / rerank", status: "complete" },
  {
    id: "06",
    name: "LLM GENERATION",
    meta: "grounded context",
    status: "complete",
  },
  {
    id: "07",
    name: "CITATION CHECK",
    meta: "evidence validation",
    status: "complete",
  },
];

const retrievalResults = [
  {
    rank: "01",
    source: "architecture.md",
    type: "TEXT",
    relevance: "HIGH",
    description: "Independent text and visual retrieval architecture.",
  },
  {
    rank: "02",
    source: "retrieval-design.md",
    type: "TEXT",
    relevance: "HIGH",
    description: "Rank fusion strategy across heterogeneous retrievers.",
  },
  {
    rank: "03",
    source: "system-diagram.png",
    type: "IMAGE",
    relevance: "MEDIUM",
    description: "Multimodal system architecture reference.",
  },
  {
    rank: "04",
    source: "evaluation.md",
    type: "TEXT",
    relevance: "MEDIUM",
    description: "Retrieval evaluation and grounding methodology.",
  },
  {
    rank: "05",
    source: "inference-stack.png",
    type: "IMAGE",
    relevance: "MEDIUM",
    description: "Inference and serving infrastructure diagram.",
  },
];

export default function AILab() {
  const [mode, setMode] = useState<LabMode>("trace");
  const [topK, setTopK] = useState(3);

  return (
    <section className="lab-section" id="lab">
      <div className="lab-container">
        <div className="lab-header">
          <div>
            <span className="section-index">04 / AI LAB</span>
            <h2>
              INSPECT THE
              <br />
              SYSTEM.
            </h2>
          </div>

          <p>
            Interactive views into orchestration, retrieval and inference. Built
            to expose how the system behaves rather than only describe it.
          </p>
        </div>

        <div className="lab-shell">
          <div className="lab-tabs">
            <button
              className={mode === "trace" ? "active" : ""}
              onClick={() => setMode("trace")}
            >
              <Activity size={14} />
              AGENT TRACE
            </button>

            <button
              className={mode === "retrieval" ? "active" : ""}
              onClick={() => setMode("retrieval")}
            >
              <Search size={14} />
              RETRIEVAL EXPLORER
            </button>

            <button
              className={mode === "inference" ? "active" : ""}
              onClick={() => setMode("inference")}
            >
              <Gauge size={14} />
              INFERENCE BENCH
            </button>

            <span className="lab-status">
              <i />
              LAB ONLINE
            </span>
          </div>

          <AnimatePresence mode="wait">
            {mode === "trace" && (
              <motion.div
                key="trace"
                className="lab-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="lab-panel-header">
                  <div>
                    <span>EXECUTION / TRACE_001</span>
                    <h3>AGENT EXECUTION TRACE</h3>
                  </div>

                  <span className="trace-complete">
                    <CheckCircle2 size={13} />
                    COMPLETE
                  </span>
                </div>

                <div className="trace-query">
                  <span>QUERY</span>
                  <p>
                    How does the multimodal retrieval system combine text and
                    image evidence?
                  </p>
                </div>

                <div className="trace-flow">
                  {traceSteps.map((step, index) => (
                    <div className="trace-step" key={step.id}>
                      <div className="trace-step-top">
                        <span>{step.id}</span>
                        <CheckCircle2 size={13} />
                      </div>

                      <strong>{step.name}</strong>
                      <small>{step.meta}</small>

                      {index < traceSteps.length - 1 && (
                        <ArrowRight className="trace-arrow" size={14} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="trace-output">
                  <span>OUTPUT / GROUNDED RESPONSE</span>
                  <p>
                    Text and visual evidence are retrieved independently, ranked
                    within their respective embedding spaces, and combined using
                    rank fusion before grounded generation.
                  </p>
                </div>
              </motion.div>
            )}

            {mode === "retrieval" && (
              <motion.div
                key="retrieval"
                className="lab-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="lab-panel-header">
                  <div>
                    <span>VECTOR SEARCH / EXPLORER</span>
                    <h3>RETRIEVAL EXPLORER</h3>
                  </div>

                  <div className="topk-control">
                    <span>TOP-K</span>

                    {[3, 4, 5].map((value) => (
                      <button
                        key={value}
                        className={topK === value ? "active" : ""}
                        onClick={() => setTopK(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="retrieval-query">
                  <span>SEARCH QUERY</span>
                  <strong>
                    multimodal retrieval architecture and rank fusion
                  </strong>
                </div>

                <div className="retrieval-results">
                  {retrievalResults.slice(0, topK).map((result) => (
                    <div className="retrieval-result" key={result.rank}>
                      <span className="result-rank">{result.rank}</span>

                      <div>
                        <strong>{result.source}</strong>
                        <p>{result.description}</p>
                      </div>

                      <span className="result-type">{result.type}</span>

                      <span className="result-relevance">
                        {result.relevance}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {mode === "inference" && (
              <motion.div
                key="inference"
                className="lab-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="lab-panel-header">
                  <div>
                    <span>GPU SYSTEM / BENCHMARK</span>
                    <h3>INFERENCE BENCH</h3>
                  </div>

                  <span className="benchmark-pending">
                    BENCHMARK DATA / PENDING
                  </span>
                </div>

                <div className="benchmark-grid">
                  <div className="benchmark-config">
                    <span>MODEL</span>
                    <strong>CONFIGURE AFTER GPU RUN</strong>
                  </div>

                  <div className="benchmark-config">
                    <span>BACKEND</span>
                    <strong>vLLM / TRT-LLM / TRITON</strong>
                  </div>

                  <div className="benchmark-config">
                    <span>QUANTIZATION</span>
                    <strong>BENCHMARK VARIABLE</strong>
                  </div>

                  <div className="benchmark-config">
                    <span>CONCURRENCY</span>
                    <strong>1 / 10 / 25 / 50 / 100</strong>
                  </div>
                </div>

                <div className="metrics-grid">
                  {[
                    ["P50 TTFT", "—"],
                    ["P95 TTFT", "—"],
                    ["TOKENS / SEC", "—"],
                    ["REQUESTS / SEC", "—"],
                    ["GPU MEMORY", "—"],
                    ["ERROR RATE", "—"],
                  ].map(([label, value]) => (
                    <div className="metric-card" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                      <small>AWAITING MEASURED RUN</small>
                    </div>
                  ))}
                </div>

                <div className="benchmark-note">
                  No synthetic performance claims. Metrics will populate from
                  reproducible GPU benchmark runs.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
