"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const audit = "https://github.com/venuuniv-ai/NOVA/blob/main/docs/phase-9-final-audit.md";
const perspectives = ["The breakthrough", "Retrieval benchmark", "Real CPU acceptance"] as const;

export default function NovaBenchmarks() {
  const [active, setActive] = useState<(typeof perspectives)[number]>("The breakthrough");
  return (
    <section className="nova-benchmarks" aria-labelledby="nova-benchmarks-title">
      <div className="nova-benchmark-heading">
        <div><span className="section-index">NOVA / ENGINEERING EVIDENCE</span><h3 id="nova-benchmarks-title">A smaller model task.<br /><em>A stronger application contract.</em></h3></div>
        <p>The breakthrough was in system design: let the model select, then make the application prove support. Same Qwen artifact. Same resource limits.</p>
      </div>
      <dl className="nova-metrics">
        <div><dt>Real acceptance</dt><dd>2 cases passed</dd><small>Supported answer + conditional abstention</small></div>
        <div><dt>Backend qualification</dt><dd>762 passed</dd><small>Deterministic tests · 1 real-model opt-in skip</small></div>
        <div><dt>Local hardware</dt><dd>8 GiB · CPU only</dd><small>Apple M2 · BGE and Qwen sequentially resident</small></div>
      </dl>
      <div className="work-filters nova-benchmark-controls" role="group" aria-label="NOVA benchmark views">
        {perspectives.map(label => <button key={label} type="button" aria-pressed={active === label} aria-controls="nova-benchmark-panel" onClick={() => setActive(label)}>{label}</button>)}
      </div>
      <div id="nova-benchmark-panel" className="nova-benchmark-panel" aria-live="polite" aria-atomic="true">
        {active === "The breakthrough" && <>
          <div className="nova-contract-comparison">
            <article><span className="nova-result-label">BEFORE / VALID ABSTENTION, POSITIVE CASE FAILED</span><h4>Generate the citation.</h4><p>The legacy contract asked Qwen to return a full UUID and exact source quote. Relevant cuisine evidence ranked first, but the recorded production request returned an empty claim set.</p><dl><div><dt>Input / output tokens</dt><dd>214 / 11</dd></div><div><dt>Model result</dt><dd>abstain=true</dd></div></dl></article>
            <article><span className="nova-result-label">AFTER / SUPPORTED POSITIVE CASE PASSED</span><h4>Select the evidence.</h4><p>SELECTION_V1 asks for a value and index. The application independently verifies the value, source binding, original UUID/full quote, conflicts and current privacy before accepting it.</p><dl><div><dt>Input / output tokens</dt><dd>154 / 19</dd></div><div><dt>Model result</dt><dd>Italian pasta · index 0</dd></div></dl></article>
          </div>
          <div className="nova-contract-output"><span className="section-index">ACTUAL POSITIVE MODEL OUTPUT / SELECTION FIELDS</span><pre><code>{'{"abstain":false,"evidence_index":0,"answer":"Italian pasta"}'}</code></pre><p>Citation provenance is application-verified selection. The model did not generate the UUID or quote. No hardcoded answer, larger model, higher token ceiling or disabled abstention.</p></div>
          <p className="nova-evidence-note">This is a bounded engineering milestone. It does not establish the cause of historical abstention or general model reliability. The named-preference support subset remains narrow.</p>
          <a className="work-demo-link" href={`${audit}#october-19--authorized-selection_v1-real-acceptance`} target="_blank" rel="noopener noreferrer">Read the real acceptance audit <ArrowUpRight size={15} aria-hidden="true" /></a>
        </>}
        {active === "Retrieval benchmark" && <>
          <h4>Ranking improved on the labeled local set.</h4>
          <p>Unchanged retrieval-v1 labels: five positive questions and one no-answer query. Same K=5 and expected document IDs across strategies.</p>
          <div className="nova-table-scroll"><table><caption>Measured PostgreSQL retrieval ranking; fixture token hashes are not learned embeddings.</caption><thead><tr><th scope="col">Strategy</th><th scope="col">Recall@5</th><th scope="col">MRR</th><th scope="col">nDCG@5</th></tr></thead><tbody>
            <tr><th scope="row">Lexical</th><td>0.40</td><td>0.40</td><td>0.4000</td></tr>
            <tr><th scope="row">Fixture semantic / hybrid</th><td>1.00</td><td>0.69</td><td>0.7475</td></tr>
            <tr className="nova-table-highlight"><th scope="row">Real BGE semantic / hybrid</th><td>1.00</td><td>0.90</td><td>0.9101</td></tr>
          </tbody></table></div>
          <p className="nova-evidence-note">MRR: 0.69 → 0.90 versus fixture hashes. Tiny candidates and K=5 inflate recall. BGE still returned five irrelevant results for the no-answer query. These results do not establish general semantic superiority or calibrated answerability.</p>
          <a className="work-demo-link" href={`${audit}#labeled-retrieval-comparison`} target="_blank" rel="noopener noreferrer">Inspect the retrieval methodology <ArrowUpRight size={15} aria-hidden="true" /></a>
        </>}
        {active === "Real CPU acceptance" && <>
          <h4>Two actual application calls. Zero retries.</h4>
          <p>Authenticated LOCAL_REAL requests using BGE-small-en-v1.5 and Qwen2.5-1.5B. Context 512, output ceiling 96, two CPU threads, GPU layers zero and concurrency one.</p>
          <div className="nova-table-scroll"><table><caption>One sample per case; no percentile, TTFT or throughput claim.</caption><thead><tr><th scope="col">Measurement</th><th scope="col">Supported answer</th><th scope="col">Insufficiency</th></tr></thead><tbody>
            <tr><th scope="row">Result</th><td>Italian pasta · index 0</td><td>Abstain · null answer/index</td></tr>
            <tr><th scope="row">Input / output tokens</th><td>154 / 19</td><td>130 / 18</td></tr>
            <tr><th scope="row">Application model-call latency</th><td>6,683.123 ms</td><td>5,498.805 ms</td></tr>
            <tr><th scope="row">RAG HTTP wall time</th><td>12,311.788 ms</td><td>8,991.005 ms</td></tr>
            <tr><th scope="row">Qwen peak sampled RSS</th><td>1,230.42 MiB</td><td>1,419.86 MiB</td></tr>
            <tr><th scope="row">BGE peak sampled RSS</th><td>445.45 MiB</td><td>461.50 MiB</td></tr>
          </tbody></table></div>
          <p className="nova-evidence-note">HTTP time includes sequential runtime acquisition, retrieval and application work. RSS is sampled process-tree memory, not a hard quota. The insufficiency case used empty selected evidence under the declared support subset; it does not prove general unknown-answer detection.</p>
          <a className="work-demo-link" href={`${audit}#actual-measurements-and-sequential-residency`} target="_blank" rel="noopener noreferrer">Inspect timing and resource boundaries <ArrowUpRight size={15} aria-hidden="true" /></a>
        </>}
      </div>
      <footer className="nova-evidence-footer"><span>Real model results and deterministic regression counts are separate evidence.</span><a href="https://github.com/venuuniv-ai/NOVA/blob/main/docs/phase-11-test-evidence.md" target="_blank" rel="noopener noreferrer">Qualification: 60 browser cases across profiles <ArrowUpRight size={13} aria-hidden="true" /></a></footer>
    </section>
  );
}
