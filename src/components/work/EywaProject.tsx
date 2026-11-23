"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Mic, BrainCircuit, ShieldCheck, AudioLines } from "lucide-react";

const stages = [
  { title: "Listen", detail: "Silero → whisper.cpp", Icon: Mic, explanation: "Browser audio passes through Silero voice activity detection and local whisper.cpp transcription. Phone mode simulates G.711 audio; it does not connect to a telephone network." },
  { title: "Understand", detail: "Local llama.cpp", Icon: BrainCircuit, explanation: "Local Qwen powers conversation and schema-constrained appointment extraction. Validated fields feed a bounded workflow; model output alone cannot authorize a booking." },
  { title: "Confirm", detail: "Read back → commit", Icon: ShieldCheck, explanation: "The fictional clinic workflow requires completed spoken read-back and explicit caller confirmation before an authorized, idempotent SQLite transaction. Success speech comes from the committed result." },
  { title: "Respond", detail: "Piper → browser audio", Icon: AudioLines, explanation: "Piper streams synthesized speech to the browser. Interruption cancels pending output, and playback acknowledgements keep only completed heard clauses in conversation history." },
];
const repository = "https://github.com/venuuniv-ai/EYWA-VoiceAI";

export default function EywaProject() {
  const [selected, setSelected] = useState(0);
  const detailsId = useId();
  return <article className="work-preview nova-project" id="eywa" aria-labelledby="eywa-title">
    <div className="nova-flow-explorer">
      <span className="evidence-instruction">Select a stage to explore the voice pipeline</span>
      <ol className="nova-flow" aria-label="EYWA local voice pipeline">
        {stages.map((stage, index) => <li key={stage.title}><button type="button" aria-pressed={selected === index} aria-controls={detailsId} onClick={() => setSelected(index)}>
          <span className="nova-step">0{index + 1}</span><stage.Icon size={24} aria-hidden="true" /><strong>{stage.title}</strong><small>{stage.detail}</small>
        </button></li>)}
      </ol>
      <div className="nova-flow-detail" id={detailsId} aria-live="polite" aria-atomic="true"><strong>{stages[selected].title}</strong><p>{stages[selected].explanation}</p></div>
    </div>
    <div className="work-preview-copy">
      <span className="section-index">EYWA · OFFLINE-FIRST VOICE AI</span>
      <h3 id="eywa-title">Local voice. Verified actions.</h3>
      <p>A voice platform for an 8 GB Apple M2, combining interruptible conversations with a fictional clinic booking workflow. Spoken read-back, explicit confirmation and transactional writes connect conversation to verified appointment actions. Runs offline after setup.</p>
      <div className="project-tags">{["30/30 synthetic task expectations", "1,054 ms voice-to-voice P50", "1,287 ms P95"].map(tag => <span key={tag}>{tag}</span>)}</div>
      <p className="nova-validation">Final synthetic suite: zero false confirmations across 19 success claims and zero duplicate booking writes. Mean known-script ASR WER: 19.62%. Timings measure speech-end to first audio receipt, not acoustic speaker latency.</p>
      <div className="project-tags">{["FastAPI + React", "whisper.cpp", "llama.cpp", "Piper", "SQLite"].map(tag => <span key={tag}>{tag}</span>)}</div>
      <a className="primary-button" href={repository} target="_blank" rel="noopener noreferrer">View EYWA on GitHub<ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="work-demo-link" href={`${repository}/blob/master/docs/demo.mp4`} target="_blank" rel="noopener noreferrer">Recorded booking demo · Synthetic caller<ArrowUpRight size={15} aria-hidden="true" /></a>
      <a className="work-demo-link" href={`${repository}/blob/master/benchmarks/phase3/summary.md`} target="_blank" rel="noopener noreferrer">Evaluation report & measurement limits<ArrowUpRight size={15} aria-hidden="true" /></a>
      <p className="nova-boundary">Local demo · One concurrent call · Fictional clinic, no real telephone integration. Results cover 30 synthetic scenarios, not arbitrary callers or production-scale performance.</p>
    </div>
  </article>;
}
