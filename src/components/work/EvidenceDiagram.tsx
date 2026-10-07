import { FileText, ImageIcon, GitMerge, ArrowRight, Check } from "lucide-react";

export default function EvidenceDiagram() {
  return (
    <div className="evidence-diagram" aria-label="Text and visual evidence are retrieved independently and combined by rank fusion">
      <div className="evidence-inputs">
        <div className="evidence-lane"><span>Text retrieval</span><div className="evidence-tiles">{["Documents", "Passages", "Context"].map((label) => <div key={label}><FileText size={22} aria-hidden="true" /><small>{label}</small></div>)}</div></div>
        <div className="evidence-lane"><span>Visual retrieval</span><div className="evidence-tiles visual">{["Images", "Embeddings", "Visual index"].map((label) => <div key={label}><ImageIcon size={22} aria-hidden="true" /><small>{label}</small></div>)}</div></div>
      </div>
      <ArrowRight className="evidence-arrow" size={20} aria-hidden="true" />
      <div className="evidence-fusion"><GitMerge size={24} aria-hidden="true" /><span>Rank fusion</span><small>RRF</small></div>
      <ArrowRight className="evidence-arrow" size={20} aria-hidden="true" />
      <div className="evidence-output"><Check size={20} aria-hidden="true" /><span>Ranked evidence</span><i /><i /><i /></div>
    </div>
  );
}
