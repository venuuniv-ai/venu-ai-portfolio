"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, ImageIcon, GitMerge, ArrowRight, Check } from "lucide-react";

const stages = {
  Documents: "Documents supply the text evidence. Their content is split into passages before retrieval.",
  Passages: "Text passages are embedded and searched in a dedicated text vector index to find relevant evidence.",
  Context: "Retrieved passages provide source context for grounded answer generation and citation checks.",
  Images: "Images are retrieved using CLIP-compatible embeddings for semantic image search, rather than pixel-level visual reasoning.",
  Embeddings: "Visual embeddings are searched separately from text embeddings. Raw similarity scores from unrelated models are not directly compared.",
  "Visual index": "A dedicated visual FAISS index returns ranked image results independently of the text index.",
  "Rank fusion": "Reciprocal Rank Fusion (RRF) combines independent text and visual rankings without comparing their raw similarity scores.",
  "Ranked evidence": "The combined evidence is passed to grounded generation, with source references available for citation validation.",
};
type Stage = keyof typeof stages;

export default function EvidenceDiagram({ interactive = false }: { interactive?: boolean }) {
  const [selected, setSelected] = useState<Stage>("Rank fusion");
  const detailsId = useId();
  const reduced = useReducedMotion();
  const tile = (label: Stage, visual = false) => {
    const content = <>{visual ? <ImageIcon size={22} aria-hidden="true" /> : <FileText size={22} aria-hidden="true" />}<small>{label}</small></>;
    return interactive
      ? <button key={label} type="button" aria-label={`Explore ${label.toLowerCase()}`} aria-pressed={selected === label} aria-controls={detailsId} onClick={() => setSelected(label)}>{content}</button>
      : <div key={label}>{content}</div>;
  };
  const fusion = <><GitMerge size={24} aria-hidden="true" /><span>Rank fusion</span><small>RRF</small></>;
  const output = <><Check size={20} aria-hidden="true" /><span>Ranked evidence</span><i /><i /><i /></>;
  const diagram = (
    <div className="evidence-diagram" aria-label="Text and visual evidence are retrieved independently and combined by rank fusion">
      <div className="evidence-inputs">
        <div className="evidence-lane"><span>Text retrieval</span><div className="evidence-tiles">{(["Documents", "Passages", "Context"] as Stage[]).map((label) => tile(label))}</div></div>
        <div className="evidence-lane"><span>Visual retrieval</span><div className="evidence-tiles visual">{(["Images", "Embeddings", "Visual index"] as Stage[]).map((label) => tile(label, true))}</div></div>
      </div>
      <ArrowRight className="evidence-arrow" size={20} aria-hidden="true" />
      {interactive ? <button className="evidence-fusion" type="button" aria-pressed={selected === "Rank fusion"} aria-controls={detailsId} onClick={() => setSelected("Rank fusion")}>{fusion}</button> : <div className="evidence-fusion">{fusion}</div>}
      <ArrowRight className="evidence-arrow" size={20} aria-hidden="true" />
      {interactive ? <button className="evidence-output" type="button" aria-pressed={selected === "Ranked evidence"} aria-controls={detailsId} onClick={() => setSelected("Ranked evidence")}>{output}</button> : <div className="evidence-output">{output}</div>}
    </div>
  );
  if (!interactive) return diagram;
  return (
    <div className="evidence-explorer">
      <span className="evidence-instruction">Select a stage to explore the flow</span>
      {diagram}
      <div className="evidence-stage-detail" id={detailsId} aria-live="polite" aria-atomic="true">
        <motion.div key={selected} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.18 }}>
          <strong>{selected}</strong><p>{stages[selected]}</p>
        </motion.div>
      </div>
    </div>
  );
}
