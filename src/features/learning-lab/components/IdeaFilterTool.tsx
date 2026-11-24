"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  buildIdeaStatement,
  ideaAlerts,
  ideaFilterChecks,
  ideaFilterFields,
  ideaFilterStorageKey,
  ideaPaths,
  scoreIdeaFilter,
  testPlaybooks,
  toolkitHref,
  type IdeaFieldId,
  type IdeaFields,
} from "../founder-toolkit";
import { CopyBlock } from "./ToolkitCopy";
import { useLabHydrated } from "./useLabHydrated";
import "./toolkit.css";

type Saved = { fields: IdeaFields; checks: boolean[]; path: string };

export function IdeaFilterTool() {
  const hydrated = useLabHydrated();
  const base = useId();
  const [fields, setFields] = useState<IdeaFields>({});
  const [checks, setChecks] = useState<boolean[]>(ideaFilterChecks.map(() => false));
  const [path, setPath] = useState("");
  const [status, setStatus] = useState("");

  const statement = buildIdeaStatement(fields);
  const alerts = ideaAlerts(fields);
  const result = scoreIdeaFilter(checks);
  const chosenPath = ideaPaths.find((item) => item.id === path);
  const chosenPlaybook = chosenPath
    ? testPlaybooks.find((playbook) => playbook.id === chosenPath.playbook)
    : undefined;
  const started = Object.values(fields).some((value) => value?.trim());

  function storage(action: "save" | "restore" | "clear") {
    try {
      if (action === "save") {
        const saved: Saved = { fields, checks, path };
        localStorage.setItem(ideaFilterStorageKey, JSON.stringify(saved));
        setStatus(
          "Saved in this browser only. Anyone using this device can see it. The conversation kit can now fill in your customer for you."
        );
      } else if (action === "restore") {
        const raw: unknown = JSON.parse(localStorage.getItem(ideaFilterStorageKey) || "null");
        if (!raw || typeof raw !== "object") throw new Error("missing");
        const saved = raw as Partial<Saved>;
        const nextFields: IdeaFields = {};
        for (const field of ideaFilterFields) {
          const value = saved.fields?.[field.id];
          if (typeof value === "string") nextFields[field.id] = value.slice(0, field.max);
        }
        setFields(nextFields);
        setChecks(ideaFilterChecks.map((_, index) => saved.checks?.[index] === true));
        setPath(ideaPaths.some((item) => item.id === saved.path) ? String(saved.path) : "");
        setStatus("Your saved idea filter is back.");
      } else {
        localStorage.removeItem(ideaFilterStorageKey);
        setStatus("Removed from this browser.");
      }
    } catch {
      setStatus(
        action === "restore"
          ? "No saved idea filter was found in this browser. Your current answers are unchanged."
          : "This browser would not let the page save. Copy or download your statement instead."
      );
    }
  }

  const downloadText = [
    "Swapnil Sahoo Learning Lab — my one-page idea filter",
    "Self-practice only; not an assessed submission or certificate record.",
    "",
    "MY PROBLEM STATEMENT",
    statement,
    "",
    "QUICK CHECKS",
    ...ideaFilterChecks.map((check, index) => `[${checks[index] ? "x" : " "}] ${check}`),
    "",
    `Result: ${result.score} of ${result.total}. ${result.advice}`,
    result.riskiestGuess ? `Riskiest guess to check first: ${result.riskiestGuess}` : "",
    chosenPath ? `\nMy path: ${chosenPath.label}. ${chosenPath.tip}` : "",
  ].join("\n");

  return (
    <div className="space-y-6">
      <noscript>
        <p className="lab-callout">
          The interactive filter needs JavaScript. You can still copy the questions below onto
          paper: they work just as well.
        </p>
      </noscript>
      <fieldset disabled={!hydrated} className="lab-form-fieldset space-y-6">
        <legend className="sr-only">Your idea in seven short answers</legend>
        <div className="lab-form">
          <p className="lab-eyebrow">Part 1 · Seven blanks</p>
          <div className="lab-form-grid">
            {ideaFilterFields.map((field) => (
              <div className="lab-field" key={field.id}>
                <label htmlFor={`${base}-${field.id}`}>{field.label}</label>
                <input
                  id={`${base}-${field.id}`}
                  type="text"
                  value={fields[field.id] ?? ""}
                  maxLength={field.max}
                  placeholder={field.placeholder}
                  aria-describedby={`${base}-${field.id}-help`}
                  onChange={(event) =>
                    setFields((old) => ({ ...old, [field.id as IdeaFieldId]: event.target.value }))
                  }
                />
                <p id={`${base}-${field.id}-help`} className="lab-small">
                  {field.help}
                </p>
              </div>
            ))}
          </div>
          {alerts.length > 0 && (
            <div aria-live="polite">
              {alerts.map((alert) => (
                <p className="lab-watch" key={alert.id}>
                  <strong>{alert.title}.</strong> {alert.text}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="lab-form">
          <p className="lab-eyebrow">Part 2 · Six honest checks</p>
          <p className="lab-small">
            Tick only what is true today. Unticked is fine; it tells you what to fix.
          </p>
          <div className="space-y-2">
            {ideaFilterChecks.map((check, index) => (
              <label className="lab-form-check" key={check}>
                <input
                  type="checkbox"
                  checked={checks[index]}
                  onChange={(event) =>
                    setChecks((old) =>
                      old.map((value, i) => (i === index ? event.target.checked : value))
                    )
                  }
                />
                <span>{check}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="lab-form">
          <p className="lab-eyebrow">Part 3 · Choose your path</p>
          <div className="lab-field">
            <label htmlFor={`${base}-path`}>What kind of idea is it?</label>
            <select
              id={`${base}-path`}
              value={path}
              onChange={(event) => setPath(event.target.value)}
            >
              <option value="">Choose one</option>
              {ideaPaths.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          {chosenPath && chosenPlaybook && (
            <p aria-live="polite">
              <strong>Your best first test:</strong> {chosenPlaybook.title} ({chosenPlaybook.cost}).{" "}
              {chosenPath.tip}{" "}
              <Link
                className="lab-text-link"
                href={toolkitHref("test-playbooks", chosenPlaybook.id)}
              >
                See the steps →
              </Link>
            </p>
          )}
        </div>
      </fieldset>

      <section className="lab-callout space-y-4" aria-labelledby={`${base}-result`}>
        <p className="lab-eyebrow" id={`${base}-result`}>
          Your result · {result.score} of {result.total} checks
        </p>
        <p className="lab-idea-statement">{statement}</p>
        <p aria-live="polite">
          <strong>{result.advice}</strong>
        </p>
        {result.riskiestGuess && (
          <p>
            <strong>Riskiest guess to check first:</strong> {result.riskiestGuess}
          </p>
        )}
        {!started && (
          <p className="lab-small">
            Your statement fills in as you type. Blanks show in [brackets].
          </p>
        )}
      </section>

      <CopyBlock
        title="Copy or keep your statement"
        note="Paste it into your notes, the 14-day planner or a free AI prompt."
        text={downloadText}
        whatsapp
        downloadName="my-idea-filter.txt"
      />

      <div className="lab-actions" style={{ marginTop: "0.5rem" }}>
        <button
          type="button"
          className="lab-button lab-button-secondary"
          disabled={!hydrated}
          onClick={() => storage("save")}
        >
          Save on this device
        </button>
        <button
          type="button"
          className="lab-button lab-button-secondary"
          disabled={!hydrated}
          onClick={() => storage("restore")}
        >
          Restore saved filter
        </button>
        <button
          type="button"
          className="lab-text-link"
          disabled={!hydrated}
          onClick={() => storage("clear")}
        >
          Remove saved copy
        </button>
        <Link className="lab-button" href={toolkitHref("talk-to-customers")}>
          Next: talk to three people →
        </Link>
      </div>
      {status && (
        <p role="status" className="lab-status">
          {status}
        </p>
      )}
    </div>
  );
}
