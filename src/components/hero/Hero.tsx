"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import EvidenceDiagram from "@/components/work/EvidenceDiagram";

const focusAreas = [
  { label: "Retrieval & agents", href: "#systems" },
  { label: "Multimodal AI", href: "#systems-visual" },
  { label: "Model inference", href: "#inference-bench" },
  { label: "ML infrastructure", href: "#ml-infrastructure" },
];

export function navigateToSection(href: string) {
  const destination = document.querySelector(href);
  if (!destination) return;
  if (window.location.hash !== href) window.history.pushState(null, "", href);
  window.dispatchEvent(new Event("hashchange"));
  window.requestAnimationFrame(() => destination.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
}

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-content">
        <motion.div className="hero-intro" initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.5 }}>
          <span className="section-index">AI / ML ENGINEER</span>
          <h1>Building <em>reliable</em><br />AI systems.</h1>
          <p className="hero-summary">From retrieval and agents to multimodal learning and model serving. Exploring what it takes to turn model capability into dependable systems.</p>
          <div className="hero-buttons"><a className="primary-button" href="#work">Explore my work <ArrowUpRight size={17} aria-hidden="true" /></a><a className="secondary-button" href="/resume/VenuMadhav_Resume.pdf" target="_blank" rel="noopener noreferrer">View resume <ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <nav className="hero-domains" aria-label="Explore engineering domains">{focusAreas.map(({ label, href }) => <a key={href} href={href} onClick={(event) => { event.preventDefault(); navigateToSection(href); }}>{label}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</nav>
        </motion.div>
        <motion.a href="#work" className="hero-featured" initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15 }}>
          <div className="featured-heading"><div><span className="section-index">FEATURED PROJECT · IN DEVELOPMENT</span><h2>Multimodal Agentic RAG</h2></div><ArrowUpRight size={20} aria-hidden="true" /></div>
          <EvidenceDiagram />
          <p>Independent retrieval. Shared evidence. Grounded answers.</p>
        </motion.a>
      </div>
      <a className="hero-scroll-cue" href="#work" onClick={(event) => { event.preventDefault(); navigateToSection("#work"); }}>Scroll to explore <ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  );
}
