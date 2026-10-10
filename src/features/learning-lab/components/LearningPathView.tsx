"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { accessLabels, type CatalogueResource, type LearningPath } from "../catalogue";

export function LearningPathView({ path, resources, optional }: {
  path: LearningPath; resources: CatalogueResource[]; optional: CatalogueResource[];
}) {
  const id = useId();
  const [completed, setCompleted] = useState<string[]>([]);
  const [attempt, setAttempt] = useState("");
  const [status, setStatus] = useState("");
  const storageKey = `sahoo-lab-path-v1-${path.slug}`;
  const next = resources.find((resource) => !completed.includes(resource.id));

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ completed, attempt }));
      setStatus("Saved in this browser. Nothing was submitted to the Lab.");
    } catch { setStatus("This browser could not save the plan. Download a worksheet to keep your work."); }
  }
  function restore() {
    try {
      const value = localStorage.getItem(storageKey);
      if (!value) { setStatus("No saved plan was found in this browser."); return; }
      const data: unknown = JSON.parse(value);
      if (!data || typeof data !== "object" || !("completed" in data) || !("attempt" in data) ||
        !Array.isArray(data.completed) || typeof data.attempt !== "string" || data.attempt.length > 12000) {
        throw new Error("Invalid plan");
      }
      setCompleted([...new Set(data.completed.filter((item): item is string => typeof item === "string" && resources.some((resource) => resource.id === item)))]);
      setAttempt(data.attempt);
      setStatus("Restored your practice ticks and draft from this browser.");
    } catch { setStatus("The saved plan could not be read. Your current work has not changed."); }
  }
  function clear() {
    try { localStorage.removeItem(storageKey); }
    catch { setStatus("The browser would not clear stored work. Use its site-data controls."); return; }
    setCompleted([]); setAttempt(""); setStatus("Cleared this path's plan from this browser.");
  }
  function download() {
    const text = [
      `Swapnil Sahoo Learning Lab — ${path.title}`, "Open self-practice; not a grade or certificate.", "",
      ...resources.map((resource, index) => `${completed.includes(resource.id) ? "[x]" : "[ ]"} ${index + 1}. ${resource.title}\nhttps://www.swapnilsahoo.com${resource.href}`),
      "", path.challenge.title, path.challenge.brief, "", ...path.challenge.prompts,
      "", "My attempt:", attempt || "(Add your attempt)", "", "Self-review:", ...path.challenge.checks,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${path.slug}-practice-plan.txt`; anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Worksheet downloaded. This is your self-practice record, not an assessed result.");
  }

  return (
    <>
      <section className="lab-section lab-band" id="path-steps">
        <div className="lab-container">
          <div className="lab-path-plan">
            <div>
              <p className="lab-eyebrow">Your practice route</p>
              <h2>Start small. Build an attempt you can explain.</h2>
              <p className="lab-muted">{completed.length} of {resources.length} steps ticked by you. These ticks record practice, not mastery or assessed completion.</p>
            </div>
            <div className="lab-callout">
              <p className="lab-eyebrow">{next ? "Suggested next step" : "Now make your own attempt"}</p>
              {next ? <Link className="lab-text-link" href={next.href}>{next.title} →</Link> : <a className="lab-text-link" href="#path-challenge">Try the final challenge ↓</a>}
              <p className="lab-small">Open a resource, return here and tick it when you have practised. Saving is optional and limited to this browser.</p>
            </div>
          </div>
          <ol className="lab-path-steps">
            {resources.map((resource, index) => (
              <li className="lab-card lab-path-step" key={resource.id}>
                <span className="lab-path-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="lab-small">{resource.duration} · {resource.format}</p>
                  <h3><Link href={resource.href}>{resource.title}</Link></h3>
                  <p><strong>Your work:</strong> {resource.outcome}</p>
                  <p className="lab-small">{resource.accessNote}</p>
                  <div className="lab-path-step-actions">
                    <Link className="lab-text-link" href={resource.href}>Open step {index + 1} →</Link>
                    <label><input type="checkbox" checked={completed.includes(resource.id)} onChange={(event) => {
                      setCompleted((current) => event.target.checked ? [...new Set([...current, resource.id])] : current.filter((value) => value !== resource.id));
                      setStatus("Plan changed. Choose Save in this browser if you want to keep it.");
                    }} /> I practised this step</label>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="lab-section" id="path-challenge">
        <div className="lab-container">
          <p className="lab-eyebrow">The independent challenge</p>
          <h2>{path.challenge.title}</h2>
          <p className="lab-lead">{path.challenge.brief}</p>
          <div className="lab-path-plan">
            <div>
              <ol className="lab-list">{path.challenge.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol>
              <label className="lab-path-draft-label" htmlFor={`${id}-attempt`}>Your draft or practice log</label>
              <textarea id={`${id}-attempt`} rows={8} maxLength={12000} value={attempt} onChange={(event) => setAttempt(event.target.value)} placeholder="Separate what you know, what you assume and what you would test…" />
              <p className="lab-small">Use fictional examples and avoid personal or confidential information. This draft is not sent to an instructor or an AI service.</p>
            </div>
            <aside className="lab-callout">
              <h3>Review your reasoning</h3>
              <ul className="lab-list">{path.challenge.checks.map((check) => <li key={check}>{check}</li>)}</ul>
              <p className="lab-small">These are self-review prompts. A completed plan does not provide human assessment, academic credit or a certificate.</p>
            </aside>
          </div>
          <div className="lab-actions lab-path-storage">
            <button className="lab-button" type="button" onClick={download}>Download your worksheet</button>
            <button className="lab-button lab-button-secondary" type="button" onClick={save}>Save in this browser</button>
            <button className="lab-text-link" type="button" onClick={restore}>Restore saved work</button>
            <button className="lab-text-link" type="button" onClick={clear}>Clear this plan</button>
          </div>
          <p className="lab-small" role="status" aria-live="polite">{status}</p>
        </div>
      </section>
      {!!optional.length && (
        <section className="lab-section lab-band">
          <div className="lab-container">
            <p className="lab-eyebrow">Optional depth</p>
            <h2>Go further when the foundation is useful.</h2>
            <div className="lab-grid lab-grid-two">
              {optional.map((resource) => (
                <article className="lab-card" key={resource.id}>
                  <span className="lab-tag">{accessLabels[resource.access]}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.summary}</p>
                  <p className="lab-small">{resource.accessNote}</p>
                  <Link href={resource.href} className="lab-text-link">Explore the resource →</Link>
                </article>
              ))}
            </div>
            <div className="lab-actions"><Link href="/learning-lab/catalogue" className="lab-button lab-button-secondary">Explore another goal →</Link></div>
          </div>
        </section>
      )}
    </>
  );
}
