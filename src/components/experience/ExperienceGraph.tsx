"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const careerHistory = [
  {
    id: "01",
    period: "2021 — 2022",
    company: "ACCENTURE",
    role: "SOFTWARE ENGINEER",
    focus: "Software Engineering / Applied ML",
    description:
      "Built backend services, ML integrations and cloud-based applications across financial services and insurance use cases.",
    stack: ["PYTHON", "SCIKIT-LEARN", "FASTAPI", "AZURE", "MLOPS"],
  },
  {
    id: "02",
    period: "2022 — 2024",
    company: "QUALCOMM",
    role: "MACHINE LEARNING ENGINEER",
    focus: "Multimodal / Edge AI",
    description:
      "Developed multimodal perception and hardware-aware ML workflows across automotive and embedded AI environments.",
    stack: ["PYTORCH", "ONNX", "MULTIMODAL AI", "EDGE AI", "AWS"],
  },
  {
    id: "03",
    period: "2025 — PRESENT",
    company: "PERPLEXITY",
    role: "AI / ML ENGINEER",
    focus: "Generative AI / LLM Systems",
    description:
      "Engineering production AI systems across LLMs, retrieval, agentic workflows, inference, evaluation and AI-powered applications.",
    stack: ["LLMS", "RAG", "LANGGRAPH", "VLLM", "PYTORCH"],
  },

];

const experiences = [careerHistory[2], careerHistory[1], careerHistory[0]];

export default function ExperienceGraph() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const experience = experiences[active];
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="editorial-heading"><div><span className="section-index">EXPERIENCE</span><h2>Different contexts.<br /><em>A sharper perspective.</em></h2></div><p>From applied machine learning to multimodal and generative AI. Select a role to explore the work.</p></div>
        <div className="role-cards" role="group" aria-label="Explore professional experience">{experiences.map((item, index) => <button key={item.id} type="button" className={`role-card ${active === index ? "active" : ""}`} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="experience-detail"><span className="role-period">{item.period}</span><strong>{item.company.charAt(0) + item.company.slice(1).toLowerCase()}</strong><span>{item.focus}</span><span className="role-card-action">{active === index ? "Selected role" : "Explore this role"}<ArrowUpRight size={15} aria-hidden="true" /></span></button>)}</div>
        <div className="role-detail-shell" id="experience-detail" aria-live="polite"><motion.div key={experience.id} className="role-detail" initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}><div><span className="section-index">{experience.period}</span><h3>{experience.role}</h3><p>{experience.description}</p></div><div className="role-technologies"><span className="section-index">TOOLS & TECHNOLOGIES</span><div className="project-tags">{experience.stack.map((skill) => <span key={skill}>{skill}</span>)}</div></div></motion.div></div>
        <a className="experience-current" href="#work">VENU.OS · Current independent work <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
