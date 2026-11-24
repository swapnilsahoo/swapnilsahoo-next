"use client";

import { useId, useState } from "react";
import {
  badToBetterQuestions,
  buildConversationScript,
  checkQuestions,
  ideaFilterStorageKey,
} from "../founder-toolkit";
import { CopyBlock } from "./ToolkitCopy";
import { useLabHydrated } from "./useLabHydrated";
import "./toolkit.css";

export function ScriptBuilder() {
  const hydrated = useLabHydrated();
  const base = useId();
  const [who, setWho] = useState("");
  const [situation, setSituation] = useState("");
  const [status, setStatus] = useState("");

  function fillFromFilter() {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(ideaFilterStorageKey) || "null");
      const fields = (raw as { fields?: Record<string, unknown> } | null)?.fields;
      const savedWho = typeof fields?.who === "string" ? fields.who.slice(0, 160) : "";
      const problem = typeof fields?.problem === "string" ? fields.problem.slice(0, 160) : "";
      if (!savedWho && !problem) throw new Error("empty");
      if (savedWho) setWho(savedWho);
      if (problem) setSituation(`had to deal with ${problem}`.slice(0, 160));
      setStatus(
        "Filled from the idea filter you saved in this browser. Edit the wording so it reads naturally."
      );
    } catch {
      setStatus(
        "No saved idea filter found in this browser. Type your customer and situation instead."
      );
    }
  }

  return (
    <div className="space-y-6">
      <fieldset disabled={!hydrated} className="lab-form-fieldset lab-form space-y-4">
        <legend className="sr-only">Personalise your script</legend>
        <div className="lab-form-grid">
          <div className="lab-field">
            <label htmlFor={`${base}-who`}>Who are you talking to?</label>
            <input
              id={`${base}-who`}
              value={who}
              maxLength={160}
              placeholder="e.g. first-year hostel students"
              onChange={(event) => setWho(event.target.value)}
            />
          </div>
          <div className="lab-field">
            <label htmlFor={`${base}-situation`}>Finish the sentence: “The last time you…”</label>
            <input
              id={`${base}-situation`}
              value={situation}
              maxLength={160}
              placeholder="e.g. ran out of clean clothes before a class"
              aria-describedby={`${base}-situation-help`}
              onChange={(event) => setSituation(event.target.value)}
            />
            <p id={`${base}-situation-help`} className="lab-small">
              Describe a moment, not your solution.
            </p>
          </div>
        </div>
        <button type="button" className="lab-text-link" onClick={fillFromFilter}>
          Fill in from my saved idea filter
        </button>
        {status && (
          <p role="status" className="lab-small">
            {status}
          </p>
        )}
      </fieldset>
      <CopyBlock
        title="Your word-for-word script"
        note="Copy it to your phone and keep it open during the chat. Reading from it is completely fine."
        text={buildConversationScript(who, situation)}
        whatsapp
        downloadName="my-customer-conversation-script.txt"
      />
    </div>
  );
}

export function QuestionChecker() {
  const hydrated = useLabHydrated();
  const base = useId();
  const [text, setText] = useState("");
  const results = checkQuestions(text);
  const toFix = results.filter((result) => result.verdict === "fix").length;

  return (
    <div className="space-y-4">
      <fieldset disabled={!hydrated} className="lab-form-fieldset lab-form space-y-3">
        <legend className="sr-only">Check your interview questions</legend>
        <div className="lab-field">
          <label htmlFor={`${base}-questions`}>Paste your questions, one per line</label>
          <textarea
            id={`${base}-questions`}
            rows={6}
            maxLength={4000}
            value={text}
            placeholder={
              "Would you use a laundry pickup service?\nTell me about the last time you did your laundry."
            }
            aria-describedby={`${base}-questions-help`}
            onChange={(event) => setText(event.target.value)}
          />
          <p id={`${base}-questions-help`} className="lab-small">
            Checked instantly in your browser with simple rules. Nothing is sent anywhere. It
            catches common traps, not every problem; trust what real people tell you more than any
            checker.
          </p>
        </div>
        <div className="lab-copy-actions">
          <button
            type="button"
            className="lab-button lab-button-secondary"
            onClick={() => setText(badToBetterQuestions.map(({ bad }) => bad).join("\n"))}
          >
            Try some bad examples
          </button>
          {text && (
            <button type="button" className="lab-text-link" onClick={() => setText("")}>
              Clear
            </button>
          )}
        </div>
      </fieldset>
      <div aria-live="polite">
        {results.length > 0 && (
          <p>
            <strong>
              {toFix === 0
                ? `All ${results.length} question${results.length === 1 ? "" : "s"} look fine.`
                : `${toFix} of ${results.length} question${results.length === 1 ? "" : "s"} could be better.`}
            </strong>
          </p>
        )}
        <ul className="lab-checker-results">
          {results.map((result, index) => (
            <li key={`${index}-${result.question}`}>
              <p className="lab-checker-question">
                <span className={`lab-verdict lab-verdict-${result.verdict}`}>
                  {result.verdict === "good" ? "Good" : result.verdict === "fix" ? "Fix" : "OK"}
                </span>
                {result.question}
              </p>
              {result.verdict === "good" && (
                <p className="lab-small">Anchored in a real past moment. Keep it.</p>
              )}
              {result.verdict === "ok" && (
                <p className="lab-small">
                  No traps found. Stronger still if it asks about a specific recent moment.
                </p>
              )}
              {result.flags.length > 0 && (
                <ul className="lab-checker-flags">
                  {result.flags.map((flag) => (
                    <li key={flag.id}>
                      <strong>{flag.label}.</strong> {flag.why} <em>Try:</em> {flag.tryInstead}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
