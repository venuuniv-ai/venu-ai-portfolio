"use client";

import { useId, useState } from "react";
import { Database, ShieldCheck, BrainCircuit, UserCheck } from "lucide-react";

const stages = [
  { title: "Owned memory", detail: "Context + retrieval", Icon: Database, explanation: "Authentication binds each request to its owner and device. Hybrid retrieval searches eligible memories in the selected embedding namespace; access permission does not itself prove relevance." },
  { title: "Local generation", detail: "BGE → Qwen, sequential", Icon: BrainCircuit, explanation: "BGE retrieves first and is stopped before Qwen starts. SELECTION_V1 asks Qwen for an exact value and evidence index, or explicit abstention. This diagram does not activate a model." },
  { title: "Source validation", detail: "Citations + privacy", Icon: ShieldCheck, explanation: "The application checks the selected value against supported source data, attaches the original UUID/full quote and revalidates source bindings, conflicts and current privacy before committing acceptance." },
  { title: "Human review", detail: "Draft only · no action", Icon: UserCheck, explanation: "A proactive draft can reach PENDING_APPROVAL. The bounded workflow refuses approval/execution actions and cannot send an external message. Human review never comes from model output." },
];

export default function NovaFlow({ interactive = false }: { interactive?: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const content = (stage: (typeof stages)[number], index: number) => <>
    <span className="nova-step">0{index + 1}</span><stage.Icon size={24} aria-hidden="true" />
    <strong>{stage.title}</strong><small>{stage.detail}</small>
  </>;
  const diagram = <ol className="nova-flow" aria-label="NOVA workflow architecture">
    {stages.map((stage, index) => <li key={stage.title}>
      {interactive ? <button type="button" aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}>{content(stage, index)}</button> : content(stage, index)}
    </li>)}
  </ol>;
  if (!interactive) return diagram;
  return <div className="nova-flow-explorer"><span className="evidence-instruction">Select a stage to inspect its safeguards</span>{diagram}<div className="nova-flow-detail" id={id} aria-live="polite" aria-atomic="true"><strong>{stages[selected].title}</strong><p>{stages[selected].explanation}</p></div></div>;
}
