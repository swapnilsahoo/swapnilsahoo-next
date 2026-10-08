"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { LabActor } from "../server/auth";
import type { LabProgramme } from "../types";
import { DemoLesson } from "./DemoLesson";
import { useLabHydrated } from "./useLabHydrated";
import {
  ChangePassword,
  postLab,
  useLabQuery,
  WorkspaceActions,
  WorkspaceStatus,
  workspaceButton,
  workspaceField,
  type LabResponse,
} from "./WorkspaceControls";

type LearnerRecord = {
  enrolment: {
    id: string;
    programme_slug: string;
    status: string;
    attendance_percent: number;
    cohort_title: string | null;
  };
  programme: LabProgramme;
  completedLessons: number[];
  submission: {
    id: string;
    body: string;
    attachment_name: string | null;
    score: number | null;
    feedback: string | null;
    approved: number;
    submitted_at: number;
    reviewed_at: number | null;
  } | null;
  certificate: {
    verification_id: string;
    issued_at: number;
    publish_name: number;
    revoked_at: number | null;
  } | null;
};
type LearnerPayload = LabResponse & { actor: LabActor; programmes: LearnerRecord[] };

export function LearnerWorkspace({ actor }: { actor: LabActor }) {
  if (actor.mustChangePassword) return <ChangePassword actor={actor} />;
  return <LearnerRecords actor={actor} />;
}

function LearnerRecords({ actor }: { actor: LabActor }) {
  const { data, error, loading, reload } = useLabQuery<LearnerPayload>("learner");
  return (
    <div className="lab-workspace space-y-8">
      <WorkspaceActions actor={actor} />
      {actor.isDemo && (
        <p className="lab-callout">
          This is a synthetic demo account. Its records are excluded from real pilot outcome
          reports.
        </p>
      )}
      {loading && <p role="status">Loading your assigned programmes…</p>}
      {error && (
        <div className="space-y-3">
          <WorkspaceStatus message={error} error />
          <button onClick={reload} className={workspaceButton}>
            Try loading again
          </button>
        </div>
      )}
      {!loading && !error && data?.programmes.length === 0 && (
        <div className="lab-callout">
          <h2>No programme assigned yet</h2>
          <p>
            An operator must assign an agreed pilot programme to your account. Registration of
            interest does not enrol you.
          </p>
          <Link href="/learning-lab/programmes" className="lab-text-link">
            Explore public demonstration lessons
          </Link>
        </div>
      )}
      {data?.programmes.map((record) => (
        <ProgrammeRecord key={record.enrolment.id} record={record} reload={reload} />
      ))}
    </div>
  );
}

function ProgrammeRecord({ record, reload }: { record: LearnerRecord; reload: () => void }) {
  const hydrated = useLabHydrated();
  const { programme, enrolment, submission, certificate } = record;
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [body, setBody] = useState(submission?.body || "");
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [publishName, setPublishName] = useState(Boolean(certificate?.publish_name));
  const active = enrolment.status === "active";
  const validCertificate = certificate && !certificate.revoked_at;
  const complete = record.completedLessons.length === programme.sessions.length;
  const prefix = `enrolment-${enrolment.id}`;

  async function mutate(path: string, payload: unknown, fallback: string) {
    setBusy(true);
    setMessage("");
    setError(false);
    try {
      const result = await postLab(path, payload);
      setMessage(result.message || fallback);
      reload();
    } catch (failure) {
      setError(true);
      setMessage(
        failure instanceof Error ? failure.message : "Nothing has been confirmed saved. Try again."
      );
    } finally {
      setBusy(false);
    }
  }

  async function importText(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (
        file.size > 20000 ||
        !/^[a-zA-Z0-9 _.-]+\.txt$/i.test(file.name) ||
        file.name.includes("..")
      )
        throw new Error(
          "Choose a plain .txt file up to 20 KB with a simple filename using letters, numbers, spaces, hyphens or underscores."
        );
      const text = await file.text();
      if (text.includes("\0") || text.includes("\uFFFD"))
        throw new Error("The file is not readable UTF-8 plain text. Paste your text instead.");
      setBody(text);
      setAttachmentName(file.name);
      setError(false);
      setMessage("Plain text imported into the editor. It has not been submitted.");
    } catch (failure) {
      setError(true);
      setMessage(
        failure instanceof Error
          ? failure.message
          : "This file could not be read. Paste your text instead."
      );
    }
    event.target.value = "";
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (body.trim().length < 100) {
      setError(true);
      setMessage("Write at least 100 characters before submitting your capstone.");
      return;
    }
    void mutate(
      "submissions",
      { enrolmentId: enrolment.id, body, attachmentName },
      "Your submission has been saved for instructor review."
    );
  }

  return (
    <article className="border-ink-200 dark:border-ink-700 space-y-8 rounded-3xl border p-5 sm:p-8">
      <header className="space-y-3">
        <p className="lab-eyebrow">
          {enrolment.cohort_title || "Assigned programme"} · {enrolment.status}
        </p>
        <h2>{programme.title}</h2>
        <p className="lab-muted">{programme.tagline}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="lab-callout">
            <strong>
              {record.completedLessons.length}/{programme.sessions.length} lessons
            </strong>
            <p className="lab-small">Self-reported exercise completion</p>
          </div>
          <div className="lab-callout">
            <strong>{enrolment.attendance_percent}% attendance</strong>
            <p className="lab-small">Recorded separately by the instructor</p>
          </div>
          <div className="lab-callout">
            <strong>
              {submission?.score === null || submission?.score === undefined
                ? "Awaiting assessment"
                : `${submission.score}/100`}
            </strong>
            <p className="lab-small">
              {submission?.approved ? "Instructor-approved capstone" : "Approval not yet recorded"}
            </p>
          </div>
        </div>
        {complete && (
          <p role="status">
            All lesson exercises are marked complete. Certificate eligibility also requires
            attendance and instructor-approved assessment.
          </p>
        )}
        <WorkspaceStatus message={message} error={error} />
      </header>

      <section aria-labelledby={`${prefix}-lessons`} className="space-y-4">
        <h3 id={`${prefix}-lessons`} className="text-xl font-semibold">
          Assigned lessons and exercises
        </h3>
        <p className="lab-small">
          Complete the described exercise and retain your working notes. Marking an exercise
          complete is your declaration; it does not record live attendance or an instructor grade.
        </p>
        {programme.sessions.map((lesson, index) => (
          <details
            key={lesson.title}
            className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5"
          >
            <summary className="focus-visible:outline-brand-600 cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
              {lesson.title}
              {record.completedLessons.includes(index) ? " · completed" : ""}
            </summary>
            <div className="mt-4 space-y-4">
              <p className="lab-muted">{lesson.description}</p>
              <p>
                <strong>Your exercise output:</strong> {lesson.output}
              </p>
              <p className="lab-small">
                Prepare the output in a document you control. Use only original, synthetic or
                authorised information. Your capstone is submitted separately below.
              </p>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={record.completedLessons.includes(index)}
                  disabled={busy || !active || Boolean(validCertificate) || !hydrated}
                  onChange={(event) =>
                    void mutate(
                      "progress",
                      {
                        enrolmentId: enrolment.id,
                        lessonIndex: index,
                        completed: event.target.checked,
                      },
                      "Lesson completion saved."
                    )
                  }
                  className="accent-brand-700 mt-1"
                />
                <span>I have completed this lesson exercise.</span>
              </label>
            </div>
          </details>
        ))}
      </section>

      <section aria-labelledby={`${prefix}-resources`} className="space-y-4">
        <h3 id={`${prefix}-resources`} className="text-xl font-semibold">
          Learning resources
        </h3>
        <ul className="space-y-3">
          {programme.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} className="lab-text-link">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="lab-small">
          Linked publisher resources may require separate access. The Lab does not redistribute
          proprietary material.
        </p>
        <details className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5">
          <summary className="focus-visible:outline-brand-600 cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
            Revisit the demonstration exercise
          </summary>
          <div className="mt-5">
            <DemoLesson programme={programme} />
          </div>
        </details>
      </section>

      <section aria-labelledby={`${prefix}-capstone`} className="space-y-5">
        <h3 id={`${prefix}-capstone`} className="text-xl font-semibold">
          Capstone submission
        </h3>
        <p className="lab-muted">{programme.capstone}</p>
        <details className="border-ink-200 dark:border-ink-700 rounded-xl border p-4">
          <summary className="cursor-pointer font-semibold">Assessment rubric</summary>
          <ul className="mt-4 space-y-4">
            {programme.rubric.map((criterion) => (
              <li key={criterion.criterion}>
                <strong>
                  {criterion.criterion} · {criterion.weight}%
                </strong>
                <p className="lab-small">{criterion.description}</p>
              </li>
            ))}
          </ul>
        </details>
        <form method="post" onSubmit={submit} className="space-y-4">
          <label htmlFor={`${prefix}-body`} className="block text-sm font-medium">
            Your capstone text (100–20,000 characters)
          </label>
          <textarea
            id={`${prefix}-body`}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setAttachmentName(undefined);
            }}
            required
            minLength={100}
            maxLength={20000}
            rows={12}
            disabled={!active || Boolean(validCertificate)}
            className={`${workspaceField} resize-y`}
            aria-describedby={`${prefix}-submission-help`}
          />
          <p id={`${prefix}-submission-help`} className="lab-small">
            Text only. Avoid confidential information and third-party personal data. A revision
            replaces the earlier submission and removes its review until the instructor assesses it
            again. Keep your own copy.
          </p>
          <label htmlFor={`${prefix}-file`} className="block text-sm font-medium">
            Or import a UTF-8 .txt file (up to 20 KB)
          </label>
          <input
            id={`${prefix}-file`}
            type="file"
            accept=".txt,text/plain"
            disabled={!active || Boolean(validCertificate)}
            onChange={importText}
            className="block max-w-full text-sm"
          />
          <p className="lab-small">
            {body.length.toLocaleString("en-GB")} / 20,000 characters
            {attachmentName ? ` · imported from ${attachmentName}` : ""}
          </p>
          <button
            disabled={busy || !active || Boolean(validCertificate) || !hydrated}
            className={workspaceButton}
          >
            {busy ? "Saving…" : submission ? "Submit revision for a new review" : "Submit capstone"}
          </button>
          {validCertificate && (
            <p className="lab-small">
              An issued certificate locks this submission. Ask the instructor to reassess it before
              replacing your work.
            </p>
          )}
        </form>
        {submission && (
          <div className="lab-callout space-y-3">
            <h4 className="font-semibold">Instructor feedback</h4>
            <p className="lab-small">
              Submitted {new Date(submission.submitted_at).toLocaleDateString("en-GB")} ·{" "}
              {submission.reviewed_at
                ? `Reviewed ${new Date(submission.reviewed_at).toLocaleDateString("en-GB")}`
                : "Awaiting instructor review"}
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {submission.feedback ||
                "No feedback has been recorded yet. Your submission is saved."}
            </p>
            {submission.score !== null && (
              <p>
                <strong>Score: {submission.score}/100</strong> ·{" "}
                {submission.approved ? "Approved" : "Revision or further review required"}
              </p>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby={`${prefix}-certificate`} className="space-y-4">
        <h3 id={`${prefix}-certificate`} className="text-xl font-semibold">
          Certificate of Completion
        </h3>
        <ul className="space-y-2 text-sm leading-relaxed">
          {programme.certificate.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
        {certificate ? (
          <div className="lab-callout space-y-4">
            <p>
              <strong>
                {certificate.revoked_at
                  ? "Certificate revoked; instructor reassessment required."
                  : "Certificate issued after instructor eligibility review."}
              </strong>
            </p>
            <Link
              href={`/learning-lab/verify/${certificate.verification_id}`}
              className="lab-text-link"
            >
              View public verification
            </Link>
            <label className="flex items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={publishName}
                onChange={(event) => setPublishName(event.target.checked)}
                className="accent-brand-700 mt-1"
              />
              <span>
                I choose to show my name on the public verification page. My email, attendance and
                submission remain private.
              </span>
            </label>
            <button
              type="button"
              disabled={busy || !hydrated}
              onClick={() =>
                void mutate(
                  "certificate-privacy",
                  { enrolmentId: enrolment.id, publishName },
                  "Public-name preference saved."
                )
              }
              className={`${workspaceButton} lab-button-secondary`}
            >
              Save certificate privacy preference
            </button>
          </div>
        ) : (
          <p className="lab-callout">
            No certificate has been issued. An instructor must confirm all requirements and approve
            the capstone; checking lesson boxes alone does not issue a certificate.
          </p>
        )}
      </section>
    </article>
  );
}
