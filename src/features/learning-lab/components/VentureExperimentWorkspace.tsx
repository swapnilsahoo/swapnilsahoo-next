"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { VentureWorkspace } from "../venture-feedback";
import { recommendNextTask, ventureDays, ventureStages } from "../venture-experiment";
import { useLabHydrated } from "./useLabHydrated";

const storageKey = "learning-lab-venture-experiment-v1";
const stages = [
  {
    title: "Set your boundary",
    days: "Days 1–3",
    prompt:
      "My idea and customer:\nSkills and resources I already have:\nTime I can commit each day:\nMoney I can afford to lose (₹0 is valid):\nPeople I can reach, described by role rather than name:\nWhat I will not risk:\nMy next small action:",
  },
  {
    title: "Investigate the problem",
    days: "Days 4–6",
    prompt:
      "Customer group and problem assumption:\nQuestions about the last time the problem happened:\nEvidence log (use P1, P2; no names or contact details):\nDate | participant code | observed action or exact anonymised words | my interpretation\nWhat contradicted my assumption:\nWhat I still do not know:",
  },
  {
    title: "Run one small test",
    days: "Days 7–11",
    prompt:
      "Specific offer and customer:\nAction I will ask a customer to take:\nSuccess / change / stop thresholds, chosen before the test:\nTime and money limit:\nPermission and delivery arrangements:\nActual test dates and number approached:\nActual customer actions (not just compliments):\nActual cost, time and delivery effort:\nWhat went differently from my plan:",
  },
  {
    title: "Make a decision",
    days: "Days 12–14",
    prompt:
      "My decision: continue / change / stop\nEvidence supporting the decision:\nEvidence against the decision:\nObserved customer actions versus assumptions:\nCosts and delivery effort:\nWhat I learned from any founder feedback:\nWhat remains uncertain:\nMy next bounded step, or why I am stopping:",
  },
] as const;
type Draft = {
  idea: string;
  skills: string;
  relationships: string;
  minutesPerDay: string;
  affordableCommitment: string;
  customerAccess: "none" | "indirect" | "direct";
  work: string[];
};
const emptyDraft = (): Draft => ({
  idea: "",
  skills: "",
  relationships: "",
  minutesPerDay: "30",
  affordableCommitment: "0",
  customerAccess: "none",
  work: ["", "", "", ""],
});
type ApiResult = {
  ok?: boolean;
  error?: string;
  message?: string;
  fields?: Record<string, string>;
  accessCode?: string;
  workspace?: VentureWorkspace;
  remaining?: number;
  capacity?: number;
};

async function request(path: string, body: unknown, code = ""): Promise<ApiResult> {
  const response = await fetch(`/api/learning-lab/venture/${path}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(code ? { Authorization: `Bearer ${code}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  let result: ApiResult;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "The service returned an unreadable response. Nothing has been confirmed saved; your draft remains here."
    );
  }
  if (!response.ok || !result.ok)
    throw new Error(
      [
        result.error || "This request could not be completed.",
        ...Object.entries(result.fields || {}).map(([field, message]) => `${field}: ${message}`),
      ].join(" ")
    );
  return result;
}
function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function VentureExperimentWorkspace({
  available,
  contactEmail = "swapnil.s@greatlakes.edu.in",
}: {
  available: boolean;
  contactEmail?: string;
}) {
  const hydrated = useLabHydrated();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [stage, setStage] = useState(0);
  const [day, setDay] = useState(1);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [workspace, setWorkspace] = useState<VentureWorkspace | null>(null);
  const [baseRevisions, setBaseRevisions] = useState([0, 0, 0, 0]);
  const [places, setPlaces] = useState<number | null>(null);
  const startedAt = useRef(0);
  const errorNotice = useRef<HTMLParagraphElement>(null);
  const activeWork = draft.work[stage];
  const savedStage = workspace?.stages.find((item) => item.stage === stage + 1);
  const nextTask = recommendNextTask({
    ...draft,
    minutesPerDay: Number(draft.minutesPerDay),
    affordableCommitment: Number(draft.affordableCommitment),
    day,
  });
  const setField = (field: Exclude<keyof Draft, "work">, value: string) =>
    setDraft((old) => ({ ...old, [field]: value }));
  const setWork = (value: string) =>
    setDraft((old) => ({
      ...old,
      work: old.work.map((item, index) => (index === stage ? value : item)),
    }));

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (error) errorNotice.current?.focus();
  }, [error]);

  function local(action: "save" | "restore" | "clear") {
    setError("");
    try {
      if (action === "save") {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ draft, workspaceId: workspace?.id || null, revisions: baseRevisions })
        );
        setStatus(
          "Draft saved in this browser only. It has not been submitted for feedback. Shared-device users can read saved drafts."
        );
      }
      if (action === "restore") {
        const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || "null");
        if (!stored || typeof stored !== "object")
          throw new Error("No valid saved draft was found.");
        const saved = stored as {
          draft?: Draft;
          workspaceId?: string | null;
          revisions?: number[];
        };
        const candidate = saved.draft;
        if (
          !candidate ||
          !Array.isArray(saved.revisions) ||
          saved.revisions.length !== 4 ||
          !saved.revisions.every((value) => Number.isInteger(value) && value >= 0)
        )
          throw new Error(
            "This saved draft could not be restored. Your current work remains here."
          );
        if (workspace && saved.workspaceId !== workspace.id)
          throw new Error(
            "This browser draft is not paired with the open feedback workspace. Download your current work before leaving; restore the other draft without an open private workspace."
          );
        if (
          !["idea", "skills", "relationships", "minutesPerDay", "affordableCommitment"].every(
            (key) =>
              typeof candidate[key as keyof Draft] === "string" &&
              (candidate[key as keyof Draft] as string).length <= 2000
          ) ||
          !["none", "indirect", "direct"].includes(candidate.customerAccess) ||
          !Array.isArray(candidate.work) ||
          candidate.work.length !== 4 ||
          !candidate.work.every((value) => typeof value === "string" && value.length <= 6000)
        )
          throw new Error(
            "This saved draft could not be restored. Your current work remains here."
          );
        setDraft(candidate);
        setBaseRevisions(workspace ? saved.revisions : [0, 0, 0, 0]);
        setStatus("Draft restored from this browser. No private access code is stored with it.");
      }
      if (action === "clear") {
        localStorage.removeItem(storageKey);
        setStatus(
          "Saved browser draft removed. Your open work and any work submitted to the Lab remain unchanged."
        );
      }
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Browser storage is unavailable. Download your worksheet to keep a copy."
      );
    }
  }
  async function transact(action: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      await action();
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "The request failed. Your work remains here."
      );
    } finally {
      setBusy(false);
    }
  }
  function adopt(next: VentureWorkspace) {
    setWorkspace(next);
    setBaseRevisions(
      stages.map((_, index) => next.stages.find((item) => item.stage === index + 1)?.revision || 0)
    );
    setDraft({
      idea: next.idea,
      ...next.constraints,
      minutesPerDay: String(next.constraints.minutesPerDay),
      affordableCommitment: String(next.constraints.affordableCommitment),
      work: stages.map(
        (_, index) => next.stages.find((item) => item.stage === index + 1)?.work || ""
      ),
    });
  }
  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    await transact(async () => {
      if (!draft.minutesPerDay.trim() || !draft.affordableCommitment.trim())
        throw new Error(
          "Enter your available minutes and affordable money limit above. Enter 0 explicitly if that is your limit."
        );
      const result = await request("start", {
        ...Object.fromEntries(values),
        ...draft,
        work: undefined,
        minutesPerDay: Number(draft.minutesPerDay),
        affordableCommitment: Number(draft.affordableCommitment),
        adultConfirmed: values.has("adultConfirmed"),
        collegeStudentConfirmed: values.has("collegeStudentConfirmed"),
        privacyAccepted: values.has("privacyAccepted"),
        voluntaryConfirmed: values.has("voluntaryConfirmed"),
        startedAt: startedAt.current,
      });
      if (!result.accessCode || !result.workspace)
        throw new Error(
          "Registration was not confirmed. Keep your draft and contact the Lab before trying again."
        );
      setCode(result.accessCode);
      setNewCode(result.accessCode);
      setWorkspace(result.workspace);
      setBaseRevisions([0, 0, 0, 0]);
      setStatus(
        "Your feedback place is registered. Save your private access code now, then submit a stage below. Registration alone does not submit your worksheet or send an email."
      );
    });
  }
  async function read(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const entered = String(new FormData(event.currentTarget).get("accessCode") || "").trim();
    await transact(async () => {
      const result = await request("read", {}, entered);
      if (!result.workspace) throw new Error("Your workspace could not be loaded.");
      setCode(entered);
      setNewCode("");
      adopt(result.workspace);
      setStatus(
        "Your submitted stages and founder feedback are loaded. Loading replaced the open draft; save or download local edits before loading another workspace."
      );
    });
  }

  return (
    <section
      id="venture-workspace"
      aria-labelledby="venture-workspace-title"
      className="lab-section space-y-8"
    >
      <header>
        <p className="lab-eyebrow">Your working experiment</p>
        <h2 id="venture-workspace-title">One idea. One small test. A reasoned decision.</h2>
        <p>
          Start with what you can afford in time, money and effort. Work through the four stages at
          your pace over 14 days. A decision to stop can be a useful outcome.
        </p>
        <p className="lab-small">
          Your planner is free and works without an account. Drafts stay on this page until you
          explicitly save them in this browser, download them, or submit a stage for private
          feedback. Use participant codes such as P1; never include customer names, contact details,
          recordings or confidential records.
        </p>
        <noscript>
          <p className="lab-callout">
            The interactive planner needs JavaScript. The 14-day guide above remains readable; copy
            its tasks into your own notes or contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. This page has not saved or
            submitted any work.
          </p>
        </noscript>
      </header>
      <fieldset disabled={!hydrated || busy} className="lab-form-fieldset space-y-6">
        <legend className="sr-only">Your idea and affordable commitment</legend>
        <div className="lab-form-grid">
          <div className="lab-field">
            <label htmlFor="venture-idea">Your idea and intended customer</label>
            <textarea
              id="venture-idea"
              value={draft.idea}
              onChange={(event) => setField("idea", event.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="For example: affordable lunch pre-orders for adult hostel students."
            />
          </div>
          <div className="lab-field">
            <label htmlFor="venture-skills">Skills and resources already available</label>
            <textarea
              id="venture-skills"
              value={draft.skills}
              onChange={(event) => setField("skills", event.target.value)}
              maxLength={500}
              rows={3}
              placeholder="For example: basic cooking, a spreadsheet and a shared kitchen with permission."
            />
          </div>
          <div className="lab-field">
            <label htmlFor="venture-relationships">People you can reach, by role</label>
            <textarea
              id="venture-relationships"
              value={draft.relationships}
              onChange={(event) => setField("relationships", event.target.value)}
              maxLength={500}
              rows={2}
              placeholder="For example: adult hostel residents and a canteen operator; no names or numbers."
            />
          </div>
          <div className="lab-field">
            <label htmlFor="venture-access">Access to potential customers</label>
            <select
              id="venture-access"
              value={draft.customerAccess}
              onChange={(event) => setField("customerAccess", event.target.value)}
            >
              <option value="none">I do not have a route to them yet</option>
              <option value="indirect">I can ask for an introduction</option>
              <option value="direct">I can approach relevant adults directly</option>
            </select>
          </div>
          <div className="lab-field">
            <label htmlFor="venture-minutes">Minutes available each day</label>
            <input
              id="venture-minutes"
              type="number"
              min="0"
              max="480"
              step="1"
              inputMode="numeric"
              value={draft.minutesPerDay}
              onChange={(event) => setField("minutesPerDay", event.target.value)}
            />
          </div>
          <div className="lab-field">
            <label htmlFor="venture-budget">Maximum money you can afford to lose (₹)</label>
            <input
              id="venture-budget"
              type="number"
              min="0"
              max="10000"
              step="1"
              inputMode="numeric"
              value={draft.affordableCommitment}
              onChange={(event) => setField("affordableCommitment", event.target.value)}
            />
            <p className="lab-small">
              ₹0 is valid. This is a limit, not a spending target. Do not borrow to complete the
              exercise.
            </p>
          </div>
        </div>
        <div className="lab-callout space-y-4">
          <div className="lab-field">
            <label htmlFor="venture-day">Choose your working day</label>
            <select
              id="venture-day"
              value={day}
              onChange={(event) => {
                const value = Number(event.target.value);
                setDay(value);
                setStage(
                  ventureStages.findIndex((item) => item.id === ventureDays[value - 1].stage)
                );
              }}
            >
              {ventureDays.map((item) => (
                <option key={item.day} value={item.day}>
                  Day {item.day}: {item.title}
                </option>
              ))}
            </select>
          </div>
          <div aria-live="polite">
            <h3>{nextTask.title}</h3>
            <p>{nextTask.task}</p>
            <p>
              <strong>Produce:</strong> {nextTask.output}
            </p>
            <ul>
              {nextTask.adaptations.map((adaptation) => (
                <li key={adaptation}>{adaptation}</li>
              ))}
            </ul>
            <p className="lab-small">
              These are prepared suggestions, adjusted to the constraints you entered. They do not
              establish that a test is safe, feasible or completed. The planner caps suggested
              experiment spending at ₹1,000 or your lower chosen limit; you do not need to spend
              anything.
            </p>
          </div>
        </div>
        <div className="lab-actions" role="group" aria-label="Experiment stages">
          {stages.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={`lab-button ${stage === index ? "" : "lab-button-secondary"}`}
              aria-pressed={stage === index}
              onClick={() => {
                setStage(index);
                setDay([1, 4, 7, 12][index]);
              }}
            >
              {index + 1}. {item.title}
            </button>
          ))}
        </div>
        <div className="lab-form space-y-4">
          <p className="lab-eyebrow">
            {stages[stage].days} · Stage {stage + 1} of 4
          </p>
          <h3>{stages[stage].title}</h3>
          <div className="lab-field">
            <label htmlFor="venture-work">Your working notes for this stage</label>
            <textarea
              id="venture-work"
              value={activeWork}
              onChange={(event) => setWork(event.target.value)}
              maxLength={6000}
              rows={13}
              aria-describedby="venture-work-help"
            />
            <p id="venture-work-help" className="lab-small">
              Separate what actually happened from what you expect. An empty template, a planned
              interview or a positive comment does not establish a completed customer experiment.
              Maximum 6,000 characters.
            </p>
          </div>
          <button
            type="button"
            className="lab-text-link"
            onClick={() => {
              if (
                !activeWork.trim() ||
                window.confirm(
                  "Replace this stage’s current notes with the empty guide? Save or download your work first if you need it."
                )
              )
                setWork(stages[stage].prompt);
            }}
          >
            Use this stage’s writing guide
          </button>
          {workspace && (
            <div className="space-y-3">
              <p className="lab-small">
                {savedStage?.revision
                  ? `Last submitted revision: ${savedStage.revision}. Changes above remain a local draft until you submit again.`
                  : "This stage has not been submitted."}
              </p>
              {savedStage && baseRevisions[stage] !== savedStage.revision && (
                <p className="lab-status">
                  This draft started from revision {baseRevisions[stage]}, while another saved
                  version is revision {savedStage.revision}. Download your local work, then load
                  your private workspace to compare before submitting. A stale draft will be
                  refused.
                </p>
              )}
              <button
                type="button"
                className="lab-button"
                disabled={activeWork.trim().length < 20}
                onClick={() =>
                  transact(async () => {
                    const result = await request(
                      "save",
                      {
                        stage: stage + 1,
                        work: activeWork.trim(),
                        revision: baseRevisions[stage],
                      },
                      code
                    );
                    if (!result.workspace)
                      throw new Error(
                        "Submission was not confirmed. Keep your draft and reload your private workspace to check before trying again."
                      );
                    setWorkspace(result.workspace);
                    const revision = result.workspace.stages.find(
                      (item) => item.stage === stage + 1
                    )?.revision;
                    if (typeof revision === "number")
                      setBaseRevisions((old) =>
                        old.map((value, index) => (index === stage ? revision : value))
                      );
                    setStatus(
                      result.message ||
                        "Stage submitted for founder feedback. No review, completion or email is implied; return with your access code to check for a reply."
                    );
                  })
                }
              >
                Submit stage {stage + 1} for founder feedback
              </button>
              <p className="lab-small">
                Only this stage’s notes are submitted. Your original registration constraints stay
                unchanged; explain a revised boundary in your stage notes.
              </p>
              <div aria-label="Founder feedback" className="space-y-3">
                {savedStage?.reviews.length ? (
                  savedStage.reviews.map((review, index) => (
                    <article className="lab-callout" key={`${review.workRevision}-${index}`}>
                      <p className="lab-eyebrow">
                        Human feedback · submitted revision {review.workRevision}
                        {review.workRevision !== savedStage.revision ? " · earlier version" : ""}
                      </p>
                      <p className="whitespace-pre-wrap">{review.feedback}</p>
                      <details>
                        <summary className="cursor-pointer">Work assessed in this review</summary>
                        <p className="break-words whitespace-pre-wrap">{review.workSnapshot}</p>
                      </details>
                      <p className="lab-small">
                        Rubric, 0–2 each: boundary {review.rubric.boundary}; customer evidence{" "}
                        {review.rubric.customerEvidence}; test design {review.rubric.testDesign};
                        decision {review.rubric.decision}. Recorded mentoring time:{" "}
                        {review.mentoringMinutes} minutes. This is formative feedback, not a
                        certificate or a claim that the venture will succeed.
                      </p>
                    </article>
                  ))
                ) : (
                  <p className="lab-small">
                    No founder feedback has been recorded for this stage yet. You can keep working
                    and return to check; no automatic reply or fixed response time is promised.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="lab-actions">
          <button
            type="button"
            className="lab-button lab-button-secondary"
            onClick={() => local("save")}
          >
            Save browser draft
          </button>
          <button
            type="button"
            className="lab-button lab-button-secondary"
            onClick={() => local("restore")}
          >
            Restore browser draft
          </button>
          <button
            type="button"
            className="lab-button lab-button-secondary"
            onClick={() => {
              download(
                "my-14-day-venture-experiment.txt",
                [
                  "Swapnil Sahoo Learning Lab — my 14-day venture experiment",
                  "Self-reported working notes; no assessment or completion claim. Private access code excluded.",
                  `Idea: ${draft.idea}`,
                  `Skills: ${draft.skills}`,
                  `Customer access: ${draft.customerAccess}`,
                  `Relationships by role: ${draft.relationships}`,
                  `Minutes/day: ${draft.minutesPerDay}; affordable commitment: ₹${draft.affordableCommitment}`,
                  ...stages.map(
                    (item, index) =>
                      `\n${index + 1}. ${item.title}\n${draft.work[index] || "Not yet written"}`
                  ),
                ].join("\n")
              );
              setStatus(
                "Worksheet download prepared. Keep it private; it does not contain your feedback access code."
              );
            }}
          >
            Download my worksheet
          </button>
          <button type="button" className="lab-text-link" onClick={() => local("clear")}>
            Remove saved browser copy
          </button>
        </div>
      </fieldset>
      {status && (
        <p role="status" className="lab-status">
          {status}
        </p>
      )}
      {error && (
        <p ref={errorNotice} tabIndex={-1} role="alert" className="lab-status lab-status-error">
          {error}
        </p>
      )}
      {newCode && (
        <aside className="lab-callout space-y-4" aria-label="Save your private access code">
          <h3>Keep your private access code</h3>
          <p>
            Anyone with this code can read, submit or delete your feedback workspace. It is shown
            now and is not saved in this browser. Keep it privately; it cannot be emailed or
            recovered automatically. Access expires 90 days after registration.
          </p>
          <code className="block break-all select-all">{newCode}</code>
          <button
            type="button"
            className="lab-button"
            onClick={() => {
              download(
                "learning-lab-private-access.txt",
                `PRIVATE — do not share or publish\nSwapnil Sahoo Learning Lab venture feedback\nReturn to ${window.location.origin}/learning-lab/venture-experiment\nAccess code: ${newCode}\nThis code gives access to your work, feedback and withdrawal. Expires 90 days after registration.\n`
              );
              setStatus(
                "Private access file download prepared. Store it separately from any worksheet you share."
              );
            }}
          >
            Download private access file
          </button>
        </aside>
      )}
      {!available && (
        <aside className="lab-callout">
          <h3>Private feedback is temporarily unavailable</h3>
          <p>
            Your free planner, browser draft and download still work. You can contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>; this opens your email app and
            does not save a feedback request on the website.
          </p>
        </aside>
      )}
      {available && (
        <details className="lab-form">
          <summary className="cursor-pointer font-semibold">
            {workspace
              ? "Refresh or open a private feedback workspace"
              : "Already registered? Return to your feedback"}
          </summary>
          <form onSubmit={read} className="mt-4 space-y-4">
            <fieldset disabled={!hydrated || busy} className="lab-form-fieldset space-y-4">
              <legend className="sr-only">Return using your private access code</legend>
              <p className="lab-small">
                Save or download local edits first. Loading your submitted workspace replaces the
                open draft.
              </p>
              <div className="lab-field">
                <label htmlFor="venture-code">Private access code</label>
                <input
                  id="venture-code"
                  name="accessCode"
                  type="password"
                  autoComplete="off"
                  spellCheck={false}
                  required
                  minLength={20}
                  maxLength={200}
                />
              </div>
              <button className="lab-button" type="submit">
                Load my submitted work and feedback
              </button>
            </fieldset>
          </form>
        </details>
      )}
      {available && !workspace && (
        <details className="lab-form">
          <summary className="cursor-pointer font-semibold">
            Request one of 20 founder-feedback places — free
          </summary>
          <p className="lab-small mt-4">
            The open guide remains available to everyone. A feedback place is for an adult college
            student trying a first venture experiment. Participation is voluntary and has no effect
            on grades, references or access to resources. The Lab stores the details below to
            provide private feedback; no newsletter signup, public testimonial permission or
            automatic email is created.
          </p>
          <button
            type="button"
            className="lab-text-link"
            disabled={!hydrated || busy}
            onClick={() =>
              transact(async () => {
                const response = await fetch("/api/learning-lab/venture/availability", {
                  cache: "no-store",
                });
                const result: ApiResult = await response.json();
                if (!response.ok || !result.ok || typeof result.remaining !== "number")
                  throw new Error(
                    "Place availability could not be checked. The free planner remains available."
                  );
                setPlaces(result.remaining);
                setStatus(
                  `${result.remaining} of ${result.capacity || 20} feedback places currently available. Availability is confirmed only when registration succeeds.`
                );
              })
            }
          >
            Check current places
          </button>
          {places !== null && (
            <p className="lab-small">
              Last checked: {places} places available. A place is allocated only after successful
              registration.
            </p>
          )}
          <form onSubmit={register} className="space-y-4">
            <fieldset disabled={!hydrated || busy} className="lab-form-fieldset space-y-4">
              <legend className="sr-only">Register for private founder feedback</legend>
              <div className="lab-form-grid">
                {[
                  { name: "name", label: "Your name or alias", type: "text", max: 100 },
                  { name: "email", label: "Your email", type: "email", max: 254 },
                  { name: "college", label: "Your college", type: "text", max: 160 },
                ].map((field) => (
                  <div className="lab-field" key={field.name}>
                    <label htmlFor={`venture-${field.name}`}>{field.label} *</label>
                    <input
                      id={`venture-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required
                      minLength={2}
                      maxLength={field.max}
                      autoComplete={
                        field.name === "name" || field.name === "email"
                          ? field.name
                          : "organization"
                      }
                    />
                  </div>
                ))}
              </div>
              <p className="lab-small">
                Your idea and constraint fields above are included in registration. Fill them in
                first. Contact details help match a manual correction or deletion request;
                registration sends no email.
              </p>
              <div className="lab-honeypot" aria-hidden="true">
                <label htmlFor="venture-website">Leave this empty</label>
                <input id="venture-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              {[
                { name: "adultConfirmed", text: "I am aged 18 or over." },
                {
                  name: "collegeStudentConfirmed",
                  text: "I am a college student working on a first venture experiment.",
                },
                {
                  name: "voluntaryConfirmed",
                  text: "I am taking part freely. This is separate from any course grading or academic assessment.",
                },
              ].map((field) => (
                <label className="lab-form-check" key={field.name}>
                  <input type="checkbox" name={field.name} required />
                  <span>{field.text} *</span>
                </label>
              ))}
              <label className="lab-form-check">
                <input type="checkbox" name="privacyAccepted" required />
                <span>
                  I have read the <Link href="/learning-lab/policies/privacy">privacy notice</Link>{" "}
                  and acknowledge storage of my registration and submitted work for private
                  feedback. *
                </span>
              </label>
              <button type="submit" className="lab-button" aria-busy={busy}>
                {busy ? "Working…" : "Register for a free feedback place"}
              </button>
            </fieldset>
          </form>
        </details>
      )}
      {workspace && (
        <div className="lab-small space-y-3">
          <p>
            Your private feedback workspace is open. Refresh with your code to check for new
            replies. No customer experiment is counted as completed merely because you registered or
            submitted notes.
          </p>
          <button
            type="button"
            className="lab-text-link"
            disabled={busy}
            onClick={() =>
              transact(async () => {
                if (
                  !window.confirm(
                    "Withdraw and permanently delete your registration, submitted stages and founder feedback? Your browser draft and downloaded files will remain under your control."
                  )
                )
                  return;
                const result = await request("withdraw", {}, code);
                setWorkspace(null);
                setBaseRevisions([0, 0, 0, 0]);
                setCode("");
                setNewCode("");
                setStatus(
                  result.message ||
                    "Your registration and submitted feedback workspace were deleted. Your open draft, browser copy and downloaded files have not been deleted."
                );
              })
            }
          >
            Withdraw and delete my submitted workspace
          </button>
        </div>
      )}
      <p className="lab-small">
        For access problems, corrections or privacy requests, contact{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Do not send your private access code
        by email. The Lab does not guarantee sales, funding, a viable business or a certificate.
      </p>
    </section>
  );
}
