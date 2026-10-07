"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  },
  {
    id: "02",
    name: "AGENT ROUTER",
    meta: "intent / retrieval",
  },
  {
    id: "03",
    name: "TEXT RETRIEVAL",
    meta: "faiss / top-k",
  },
  {
    id: "04",
    name: "VISUAL RETRIEVAL",
    meta: "clip / faiss",
  },
  { id: "05", name: "RANK FUSION", meta: "rrf / rerank" },
  {
    id: "06",
    name: "LLM GENERATION",
    meta: "grounded context",
  },
  {
    id: "07",
    name: "CITATION CHECK",
    meta: "evidence validation",
  },
];

const retrievalResults = [
  {
    rank: "01",
    source: "architecture.md",
    type: "TEXT",
    description: "Independent text and visual retrieval architecture.",
  },
  {
    rank: "02",
    source: "retrieval-design.md",
    type: "TEXT",
    description: "Rank fusion strategy across heterogeneous retrievers.",
  },
  {
    rank: "03",
    source: "system-diagram.png",
    type: "IMAGE",
    description: "Multimodal system architecture reference.",
  },
  {
    rank: "04",
    source: "evaluation.md",
    type: "TEXT",
    description: "Retrieval evaluation and grounding methodology.",
  },
  {
    rank: "05",
    source: "inference-stack.png",
    type: "IMAGE",
    description: "Inference and serving infrastructure diagram.",
  },
];

export default function AILab() {
  const reducedMotion = useReducedMotion();
  const traceContainer = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<LabMode>("trace");
  const [topK, setTopK] = useState(3);
  const [traceRun, setTraceRun] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [backend, setBackend] = useState("vLLM");
  const [concurrency, setConcurrency] = useState("1");

  useEffect(() => {
    const selectDestination = () => {
      if (window.location.hash === "#inference-bench") setMode("inference");
    };
    const frame = window.requestAnimationFrame(selectDestination);
    window.addEventListener("hashchange", selectDestination);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", selectDestination);
    };
  }, []);

  useEffect(() => {
    if (mode !== "trace") return;
    const timer = window.setInterval(() => {
      setCompletedSteps((current) => {
        if (current >= traceSteps.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, [mode, traceRun]);

  useEffect(() => {
    const container = traceContainer.current;
    const current = container?.querySelector<HTMLElement>(".trace-step.running");
    if (container && current) {
      container.scrollTo({ left: Math.max(0, current.offsetLeft - container.offsetLeft - container.clientWidth / 2 + current.offsetWidth / 2), behavior: reducedMotion ? "instant" : "smooth" });
    }
  }, [completedSteps, mode, reducedMotion]);

  return (
    <section className="lab-section" id="lab">
      <div className="lab-container">
        <div className="lab-header">
          <div>
            <span className="section-index">INTERACTIVE EXPLORATIONS</span>
            <h2>Explore the <em>AI lab.</em></h2>
          </div>

          <p>
            Interactive demonstrations of orchestration and retrieval, plus an
            inference configuration explorer. Examples are illustrative; performance data awaits measured GPU runs.
          </p>
        </div>

        <div className="lab-shell" id="inference-bench">
          <div className="lab-tabs">
            <button
              className={mode === "trace" ? "active" : ""}
              onClick={() => setMode("trace")}
              aria-pressed={mode === "trace"}
            >
              <Activity size={14} aria-hidden="true" />
              Agent Trace
            </button>

            <button
              className={mode === "retrieval" ? "active" : ""}
              onClick={() => setMode("retrieval")}
              aria-pressed={mode === "retrieval"}
            >
              <Search size={14} aria-hidden="true" />
              Retrieval Explorer
            </button>

            <button
              className={mode === "inference" ? "active" : ""}
              onClick={() => setMode("inference")}
              aria-pressed={mode === "inference"}
            >
              <Gauge size={14} aria-hidden="true" />
              Inference Bench
            </button>

            <span className="lab-status">
              <i />
              ILLUSTRATIVE DEMO
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
                    <span>ILLUSTRATIVE / TRACE_001</span>
                    <h3>AGENT EXECUTION TRACE</h3>
                  </div>

                  <span className="trace-complete">
                    {completedSteps === traceSteps.length ? <CheckCircle2 size={13} aria-hidden="true" /> : <Activity size={13} aria-hidden="true" />}
                    {completedSteps === traceSteps.length ? "DEMO COMPLETE" : "DEMO RUNNING"}
                  </span>
                  <button className="lab-replay" type="button" onClick={() => {
                    setCompletedSteps(0);
                    setTraceRun((current) => current + 1);
                  }}>REPLAY TRACE</button>
                </div>

                <div className="trace-query">
                  <span>QUERY</span>
                  <p>
                    How does the multimodal retrieval system combine text and
                    image evidence?
                  </p>
                </div>

                <div className="trace-scroll" ref={traceContainer} tabIndex={0} role="region" aria-label="Execution trace; scroll to inspect stages">
                  <div className="trace-flow">
                    {traceSteps.map((step, index) => {
                      const state = index < completedSteps ? "complete" : index === completedSteps ? "running" : "waiting";
                      return (
                        <Fragment key={step.id}>
                          <div className={`trace-step ${state}`} aria-current={state === "running" ? "step" : undefined}>
                            <div className="trace-step-top">
                              <span>{step.id}</span>
                              <span>{state === "complete" ? "DONE" : state === "running" ? "RUNNING" : "WAITING"}</span>
                            </div>
                            <strong>{step.name}</strong>
                            <small>{step.meta}</small>
                          </div>
                          {index < traceSteps.length - 1 && (
                            <div className={`trace-connector ${index < completedSteps - 1 ? "complete" : index === completedSteps - 1 ? "running" : "pending"}`} aria-hidden="true">
                              <ArrowRight size={16} aria-hidden="true" />
                            </div>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence>
                  {completedSteps === traceSteps.length && (
                    <motion.div className="trace-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                      <span>ILLUSTRATIVE OUTPUT</span>
                      <p>Text and visual evidence are retrieved independently, ranked within their respective embedding spaces, and combined using rank fusion before grounded generation.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    <span>ILLUSTRATIVE RESULTS / EXPLORER</span>
                    <h3>RETRIEVAL EXPLORER</h3>
                  </div>

                  <div className="topk-control">
                    <span>TOP-K</span>

                    {[3, 4, 5].map((value) => (
                      <button
                        key={value}
                        className={topK === value ? "active" : ""}
                        onClick={() => setTopK(value)}
                        aria-pressed={topK === value}
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

                <div className="retrieval-results" aria-live="polite">
                  <AnimatePresence initial={false}>
                  {retrievalResults.slice(0, topK).map((result) => (
                    <motion.div layout={!reducedMotion} className="retrieval-result" key={result.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>
                      <span className="result-rank">{result.rank}</span>

                      <div>
                        <strong>{result.source}</strong>
                        <p>{result.description}</p>
                      </div>

                      <span className="result-type">{result.type}</span>

                      <span className="result-relevance">
                        EXAMPLE
                      </span>
                    </motion.div>
                  ))}
                  </AnimatePresence>
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
                    <select aria-label="Inference backend" value={backend} onChange={(event) => setBackend(event.target.value)}>
                      {["vLLM", "TRT-LLM", "TRITON"].map((value) => <option key={value}>{value}</option>)}
                    </select>
                  </div>

                  <div className="benchmark-config">
                    <span>QUANTIZATION</span>
                    <strong>BENCHMARK VARIABLE</strong>
                  </div>

                  <div className="benchmark-config">
                    <span>CONCURRENCY</span>
                    <select aria-label="Inference concurrency" value={concurrency} onChange={(event) => setConcurrency(event.target.value)}>
                      {["1", "10", "25", "50", "100"].map((value) => <option key={value}>{value}</option>)}
                    </select>
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
                  Selected configuration: {backend}, concurrency {concurrency}. No GPU run has been executed. Metrics remain unavailable until a reproducible measured run is connected.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
