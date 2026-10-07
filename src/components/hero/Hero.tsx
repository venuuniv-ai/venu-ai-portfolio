"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const focusAreas = [
  ["01", "RAG + AGENTS"],
  ["02", "MULTIMODAL AI"],
  ["03", "LLM INFERENCE"],
  ["04", "ML INFRASTRUCTURE"],
];

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span>AI / ML ENGINEER</span>
          <span className="hero-coordinate">39.10°N / SYSTEM 01</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          I ENGINEER
          <br />
          AI SYSTEMS THAT
          <br />
          <span>SURVIVE PRODUCTION.</span>
        </motion.h1>

        <motion.div
          className="hero-lower"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="hero-description">
            <p>
              Building production-grade systems across Generative AI, large
              language models, multimodal learning and ML infrastructure.
            </p>

            <div className="hero-buttons">
              <Link href="/work" className="primary-button">
                EXPLORE SYSTEMS
                <ArrowDownRight size={16} />
              </Link>

              <button className="secondary-button" type="button">
                ASK VENU
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="focus-panel">
            <div className="panel-heading">
              <span>CURRENT FOCUS</span>
              <span>2026</span>
            </div>

            {focusAreas.map(([number, label]) => (
              <div className="focus-row" key={number}>
                <span className="focus-number">{number}</span>
                <span>{label}</span>
                <ArrowUpRight size={14} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hero-footer">
        <span>GENERATIVE AI</span>
        <span>LLM SYSTEMS</span>
        <span>MULTIMODAL AI</span>
        <span>ML INFRASTRUCTURE</span>
      </div>
    </main>
  );
}
