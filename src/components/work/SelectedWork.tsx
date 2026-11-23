"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import EvidenceDiagram from "./EvidenceDiagram";
import NovaFlow from "./NovaFlow";
import NovaBenchmarks from "./NovaBenchmarks";
import EywaProject from "./EywaProject";
import { navigateToSection } from "@/components/hero/Hero";

const views = [
  { label: "Overview", title: "Multimodal Agentic RAG", copy: "A retrieval platform that brings text and image evidence together before generating grounded answers. Evaluated on a frozen 203-case benchmark; results measure retrieval and literal completeness, not semantic accuracy or production-scale reliability.", tech: ["98.73% Recall@5", "96.82% literal answer completeness", "10/10 cross-document completeness"], href: "#systems", action: "Explore the architecture" },
  { label: "Retrieval & agents", title: "Evidence before answers", copy: "An agent router coordinates retrieval. Text and visual results are ranked independently and combined using Reciprocal Rank Fusion before grounded generation.", tech: ["LangGraph", "RRF", "Citation validation"], href: "#systems", action: "Explore retrieval" },
  { label: "Multimodal", title: "Two indexes. One evidence set.", copy: "CLIP-compatible image embeddings and text embeddings stay in separate vector indexes. Rank-based fusion combines results without comparing incompatible similarity scores.", tech: ["CLIP", "FAISS", "Separate indexes"], href: "#systems-visual", action: "Explore visual retrieval" },
  { label: "Inference", title: "Serving is part of the system", copy: "Local Ollama measurements on Apple M2: 646 ms P50 latency, 1.31 s P95 latency, 1.84 queries/sec, and 24/24 successful HTTP requests. Generation (~30 tokens/sec) and process RSS (~1.2 GB) are estimates; dedicated GPU VRAM was not measured. These are local results, not production-scale measurements.", tech: ["vLLM", "Triton", "ONNX"], href: "#inference-bench", action: "Open Inference Bench" },
];

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const view = views[active];
  return (
    <section className="work-section" id="work">
      <div className="editorial-heading"><div><span className="section-index">SELECTED WORK</span><h2>Selected work, <em>explored.</em></h2></div><p>Personal AI, local voice, and grounded retrieval.<br />Explore the systems and the evidence behind them.</p></div>
      <article className="work-preview nova-project" id="nova" aria-labelledby="nova-title">
        <NovaFlow interactive />
        <div className="work-preview-copy">
          <span className="section-index">NOVA · v1.0 LOCAL MVP</span>
          <h3 id="nova-title">Personal AI, with boundaries.</h3>
          <p>A local workspace connecting authenticated devices, persistent memory and grounded answers. Proactive preference drafts retain verified source citations and stop at human approval. CPU-only BGE and Qwen run sequentially under resource safeguards; fixtures remain the default.</p>
          <div className="project-tags">{["Next.js + FastAPI", "Go", "pgvector", "Kafka", "BGE + Qwen"].map(tag => <span key={tag}>{tag}</span>)}</div>
          <p className="nova-validation">762 backend tests passed · 60 browser cases across profiles. Finite real grounding acceptance passed separately; these checks do not establish general model quality.</p>
          <a className="primary-button" href="https://github.com/venuuniv-ai/NOVA" target="_blank" rel="noopener noreferrer">View NOVA on GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="work-demo-link" href="https://github.com/venuuniv-ai/NOVA/blob/main/docs/local-release-guide.md" target="_blank" rel="noopener noreferrer">Local launch guide <ArrowUpRight size={15} aria-hidden="true" /></a>
          <p className="nova-boundary">Local MVP · Fixture AI by default · No automatic external actions. Real vision and production deployment remain unqualified.</p>
        </div>
      </article>
      <details className="project-disclosure"><summary>NOVA · Benchmarks & interactive replay<span>Explore the evidence</span></summary><NovaBenchmarks /></details>
      <EywaProject />
      <div className="project-section-label">MULTIMODALAI · RETRIEVAL PLATFORM</div>
      <div className="work-filters" role="group" aria-label="Project perspectives">{views.map((item, index) => <button key={item.label} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>{item.label}</button>)}</div>
      <div className="work-preview"><EvidenceDiagram interactive /><div className="work-preview-copy"><AnimatePresence mode="wait" initial={false}><motion.div key={view.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}><h3>{view.title}</h3><p>{view.copy}</p><div className="project-tags">{view.tech.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="primary-button" href={view.href} onClick={(event) => { event.preventDefault(); navigateToSection(view.href); }}>{view.action}<ArrowUpRight size={16} aria-hidden="true" /></a></motion.div></AnimatePresence><details className="project-measurements"><summary>Benchmark details & limits</summary><p>Frozen benchmark: 203 cases. Recall@5: 83.44% → 98.73%. Measured literal answer completeness: 80.89% → 96.82%. Cross-document completeness: 0/10 → 10/10. Attack-canary emissions: 15/25 → 0/25 (extractive), 5/25 → 0/25 (Ollama). Unavailable-fact refusals: 35/35. Extractive HTTP requests: 512/512 successful. Finite test results, not semantic accuracy, complete attack resistance or production-scale guarantees.</p></details><a className="work-demo-link" href="#lab">Architecture & interactive demos <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    </section>
  );
}
