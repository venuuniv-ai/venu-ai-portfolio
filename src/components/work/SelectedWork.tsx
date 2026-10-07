"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import EvidenceDiagram from "./EvidenceDiagram";
import { navigateToSection } from "@/components/hero/Hero";

const views = [
  { label: "All work", title: "Multimodal Agentic RAG", copy: "A production-oriented platform exploring independent text and image retrieval, agent orchestration, grounded generation, and model serving.", tech: ["LangGraph", "FAISS", "CLIP"], href: "#systems", action: "Explore the architecture" },
  { label: "Retrieval & agents", title: "Evidence before answers", copy: "An agent router coordinates retrieval. Text and visual results are ranked independently and combined using Reciprocal Rank Fusion before grounded generation.", tech: ["LangGraph", "RRF", "Citation validation"], href: "#systems", action: "Explore retrieval" },
  { label: "Multimodal", title: "Two indexes. One evidence set.", copy: "CLIP-compatible image embeddings and text embeddings stay in separate vector indexes. Rank-based fusion combines results without comparing incompatible similarity scores.", tech: ["CLIP", "FAISS", "Separate indexes"], href: "#systems-visual", action: "Explore visual retrieval" },
  { label: "Inference", title: "Serving is part of the system", copy: "Explore backend and concurrency configurations for model serving. Performance metrics remain unavailable until reproducible GPU benchmarks are connected.", tech: ["vLLM", "Triton", "ONNX"], href: "#inference-bench", action: "Open Inference Bench" },
];

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const view = views[active];
  return (
    <section className="work-section" id="work">
      <div className="editorial-heading"><div><span className="section-index">SELECTED WORK</span><h2>Selected work, <em>explored.</em></h2></div><p>One project. Different engineering perspectives.<br />An independent project, currently in development.</p></div>
      <div className="work-filters" role="group" aria-label="Project perspectives">{views.map((item, index) => <button key={item.label} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>{item.label}</button>)}</div>
      <div className="work-preview"><EvidenceDiagram /><div className="work-preview-copy"><span className="section-index">MULTIMODAL AGENTIC RAG & AI INFERENCE PLATFORM</span><AnimatePresence mode="wait" initial={false}><motion.div key={view.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}><h3>{view.title}</h3><p>{view.copy}</p><div className="project-tags">{view.tech.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="primary-button" href={view.href} onClick={(event) => { event.preventDefault(); navigateToSection(view.href); }}>{view.action}<ArrowUpRight size={16} aria-hidden="true" /></a></motion.div></AnimatePresence><a className="work-demo-link" href="#lab">Architecture & interactive demos <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    </section>
  );
}
