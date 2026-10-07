"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const experiences = [
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
  {
    id: "04",
    period: "CURRENT SYSTEM",
    company: "VENU.OS",
    role: "AI SYSTEMS PORTFOLIO",
    focus: "Production AI Engineering",
    description:
      "An interactive engineering environment for exploring AI architectures, retrieval systems, agent traces and inference infrastructure.",
    stack: ["NEXT.JS", "FASTAPI", "RAG", "AGENTS", "ML INFRA"],
  },
];

export default function ExperienceGraph() {
  const [active, setActive] = useState(2);

  const experience = experiences[active];

  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="section-header">
          <div>
            <span className="section-index">02 / SYSTEM HISTORY</span>
            <h2>
              ENGINEERING
              <br />
              TRAJECTORY
            </h2>
          </div>

          <p>
            From software engineering to applied machine learning, multimodal AI
            and production LLM systems.
          </p>
        </div>

        <div className="experience-interface">
          <div className="experience-list">
            {experiences.map((item, index) => (
              <motion.button
                key={item.id}
                className={`experience-node ${
                  active === index ? "active" : ""
                }`}
                onClick={() => setActive(index)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <span className="node-id">{item.id}</span>

                <div>
                  <span className="node-period">{item.period}</span>
                  <strong>{item.company}</strong>
                  <span className="node-focus">{item.focus}</span>
                </div>

                <ArrowUpRight size={16} />
              </motion.button>
            ))}
          </div>

          <motion.div
            key={experience.id}
            className="experience-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="detail-top">
              <span>{experience.id} / ACTIVE NODE</span>
              <span>{experience.period}</span>
            </div>

            <h3>{experience.company}</h3>

            <div className="detail-role">{experience.role}</div>

            <p>{experience.description}</p>

            <div className="stack-label">SYSTEM STACK</div>

            <div className="stack-list">
              {experience.stack.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
