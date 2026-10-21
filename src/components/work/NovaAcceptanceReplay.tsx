"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import { preparePortfolioQuestion } from "@/lib/askNavigation";

const steps = ["Retrieve", "Generate", "Verify", "Result"];
const cases = {
  positive: {
    label: "Supported question", query: "Which cuisine does review_fixture prefer?",
    output: { abstain: false, evidence_index: 0, answer: "Italian pasta" },
    details: [
      "BGE ranked the cuisine memory first. The bounded structured support selector supplied its subject, predicate and value at index 0 to Qwen.",
      "Qwen returned Italian pasta and index 0 with abstain=false. Reported usage: 154 input / 19 output tokens. No retry was made.",
      "The application matched the model value to the supported source, verified its original UUID/full quote and completed source-binding, conflict and privacy validation.",
      "PASS: a supported positive claim was accepted. Application-derived citation: review_fixture preferred_cuisine: Italian pasta. No external action occurred.",
    ],
    run: "5d1174d0-4fc7-47d0-a627-9f46163e3427",
  },
  insufficient: {
    label: "Unsupported question", query: "What is review_fixture's spacecraft launch authorization code?",
    output: { abstain: true, evidence_index: null, answer: null },
    details: [
      "BGE returned unrelated memories. The declared preference support subset supplied empty selected evidence for this question; no relevance threshold was tuned.",
      "Qwen returned explicit abstention with a null answer and index. Reported usage: 130 input / 18 output tokens. No retry was made.",
      "Schema, source-binding and privacy checks passed. There was no selected citation, no fabricated source and no unsupported answer.",
      "PASS: explicit abstention on empty selected context. This finite case does not establish general unknown-answer detection or relevance calibration.",
    ],
    run: "52552730-cb09-475f-a81a-334fa5a9cd76",
  },
};

export default function NovaAcceptanceReplay() {
  const [scenario, setScenario] = useState<keyof typeof cases>("positive");
  const [step, setStep] = useState(0);
  const current = cases[scenario];
  return <div className="nova-replay">
    <div className="nova-replay-heading"><div><span className="section-index">RECORDED ACCEPTANCE REPLAY</span><h4>Follow the evidence to the result.</h4></div><span className="nova-replay-badge">Historical data · no live inference</span></div>
    <label className="nova-replay-select">Recorded case<select aria-label="Recorded NOVA acceptance case" value={scenario} onChange={event => { setScenario(event.target.value as keyof typeof cases); setStep(0); }}><option value="positive">Supported question</option><option value="insufficient">Unsupported question</option></select></label>
    <p className="nova-replay-query">{current.query}</p>
    <div className="nova-replay-steps" role="group" aria-label="Acceptance replay stages">{steps.map((label, index) => <button type="button" key={label} aria-pressed={step === index} aria-controls="nova-replay-detail" onClick={() => setStep(index)}><small>0{index + 1}</small>{label}</button>)}</div>
    <div id="nova-replay-detail" className="nova-replay-detail" aria-live="polite" aria-atomic="true"><strong>{steps[step]} / {current.label}</strong><p>{current.details[step]}</p>{step > 0 && <pre><code>{JSON.stringify(current.output, null, 2)}</code></pre>}{step >= 2 && scenario === "positive" && <p className="nova-replay-citation">Original source: <code>4d4b4842-c804-4e72-90c9-7162d6436c37</code></p>}<small>Historical run: {current.run}</small></div>
    <div className="nova-replay-actions"><button type="button" className="primary-button" disabled={step === steps.length - 1} onClick={() => setStep(index => Math.min(index + 1, steps.length - 1))}>Next step <ArrowRight size={15} aria-hidden="true" /></button><button type="button" className="secondary-button" onClick={() => setStep(0)}><RotateCcw size={14} aria-hidden="true" />Restart replay</button><button type="button" className="secondary-button" onClick={() => preparePortfolioQuestion("How does NOVA verify evidence and handle insufficient context?")}><MessageCircle size={15} aria-hidden="true" />Ask about this workflow</button></div>
  </div>;
}
