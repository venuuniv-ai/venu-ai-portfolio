import { Database, ShieldCheck, BrainCircuit, UserCheck } from "lucide-react";

const stages = [
  { title: "Owned memory", detail: "Context + retrieval", Icon: Database },
  { title: "Local generation", detail: "BGE → Qwen, sequential", Icon: BrainCircuit },
  { title: "Source validation", detail: "Citations + privacy", Icon: ShieldCheck },
  { title: "Human review", detail: "Draft only · no action", Icon: UserCheck },
];

export default function NovaFlow() {
  return (
    <ol className="nova-flow" aria-label="NOVA workflow architecture">
      {stages.map(({ title, detail, Icon }, index) => (
        <li key={title}>
          <span className="nova-step">0{index + 1}</span>
          <Icon size={24} aria-hidden="true" />
          <strong>{title}</strong>
          <small>{detail}</small>
        </li>
      ))}
    </ol>
  );
}
