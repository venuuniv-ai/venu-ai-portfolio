"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";

const EMAIL = "thummetivenumadhavreddy@gmail.com";

const roles = [
  "AI/ML ENGINEER",
  "GENAI / LLM ENGINEER",
  "ML SYSTEMS ENGINEER",
  "AI INFRASTRUCTURE",
];

function LinkedInIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <p className="contact-kicker">07 / CONNECT</p>

          <div className="contact-availability">
            <span className="contact-dot" />
            OPEN TO AI ENGINEERING OPPORTUNITIES
          </div>

          <h2 className="contact-title">
            BUILDING
            <br />
            WHAT&apos;S
            <br />
            <span>NEXT.</span>
          </h2>

          <p className="contact-description">
            Interested in building reliable, scalable AI systems — from
            retrieval and agentic workflows to multimodal learning, inference
            optimization, and production infrastructure.
          </p>
        </motion.div>

        <div className="contact-role-list">
          {roles.map((role, index) => (
            <div className="contact-role" key={role}>
              <span>{String(index + 1).padStart(2, "0")}</span>

              <span>{role}</span>
            </div>
          ))}
        </div>

        <div className="contact-actions">
          <a
            className="contact-primary"
            href="/resume/VenuMadhav_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW RESUME
            <ArrowUpRight size={18} />
          </a>

          <a
            className="contact-secondary"
            href="/resume/VenuMadhav_Resume.pdf"
            download
          >
            DOWNLOAD PDF
            <Download size={17} />
          </a>

          <a className="contact-secondary" href={`mailto:${EMAIL}`}>
            EMAIL ME
            <Mail size={17} />
          </a>

          <button
            type="button"
            className="contact-secondary contact-copy-button"
            onClick={copyEmail}
            aria-label="Copy email address"
          >
            {copied ? "EMAIL COPIED" : "COPY EMAIL"}

            {copied ? <Check size={17} /> : <Copy size={17} />}
          </button>

          <a
            className="contact-secondary"
            href="https://www.linkedin.com/in/venu-madhav-t/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
            <LinkedInIcon />
          </a>
        </div>

        <footer className="contact-footer">
          <span>VENU.OS © {new Date().getFullYear()}</span>

          <span>AI SYSTEMS / MACHINE LEARNING / PRODUCTION ENGINEERING</span>

          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </div>
    </section>
  );
}
