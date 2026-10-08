"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { LabActor } from "../server/auth";
import type { LabProgramme } from "../types";
import { programmes as defaultProgrammes } from "../programmes";
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

type Lead = {
  id: string;
  kind: string;
  name: string;
  email: string;
  programme_slug: string;
  organisation: string | null;
  message: string | null;
  marketing_consent: number;
  source: string | null;
  status: string;
  is_demo: number;
  created_at: number;
};
type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  is_demo: number;
  must_change_password: number;
};
type Cohort = {
  id: string;
  programme_slug: string;
  title: string;
  status: string;
  is_demo: number;
  created_at: number;
};
type Enrolment = {
  id: string;
  user_id: string;
  programme_slug: string;
  cohort_id: string | null;
  status: string;
  attendance_percent: number;
  name: string;
  email: string;
  is_demo: number;
};
type Submission = {
  id: string;
  revision: number;
  enrolment_id: string;
  body: string;
  score: number | null;
  rubric_scores: string | null;
  feedback: string | null;
  approved: number;
  submitted_at: number;
  reviewed_at: number | null;
  programme_slug: string;
  name: string;
  email: string;
  is_demo: number;
};
type ProgrammeRow = {
  slug: string;
  content: string;
  status: string;
  starts_at: string | null;
  fee_inr: number | null;
  capacity: number | null;
};
type Certificate = {
  id: string;
  enrolment_id: string;
  verification_id: string;
  issued_at: number;
  revoked_at: number | null;
  programme_slug: string;
  name: string;
  is_demo: number;
  publish_name: number;
};
type AdminData = {
  leads: Lead[];
  users: Member[];
  cohorts: Cohort[];
  enrolments: Enrolment[];
  submissions: Submission[];
  programmes: ProgrammeRow[];
  certificates: Certificate[];
  outcomes: {
    enquiries: number;
    enrolments: number;
    submissions: number;
    certificates: number;
    meanReviewedScore: number | null;
    note: string;
  };
};
type AdminPayload = LabResponse & { actor: LabActor; data: AdminData };
const sections = [
  "Overview",
  "Enquiries",
  "Accounts",
  "Cohorts",
  "Enrolments",
  "Reviews",
  "Content",
  "Certificates",
] as const;
type Section = (typeof sections)[number];

function programmeContent(row?: ProgrammeRow): LabProgramme | undefined {
  if (!row) return undefined;
  try {
    return JSON.parse(row.content) as LabProgramme;
  } catch {
    return undefined;
  }
}
function DemoFlag({ value }: { value: number }) {
  return value ? (
    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">
      Synthetic demo
    </span>
  ) : null;
}
function Field({ label, name, children }: { label: string; name: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
function ProgrammeSelect({
  name,
  items,
  defaultValue,
}: {
  name: string;
  items: LabProgramme[];
  defaultValue?: string;
}) {
  return (
    <select id={name} name={name} className={workspaceField} defaultValue={defaultValue}>
      {items.map((programme) => (
        <option key={programme.slug} value={programme.slug}>
          {programme.title}
        </option>
      ))}
    </select>
  );
}

function ActionForm({
  action,
  prepare,
  onSaved,
  children,
  button,
  disabled = false,
}: {
  action: string;
  prepare: (form: FormData) => unknown;
  onSaved: () => void;
  children: ReactNode;
  button: string;
  disabled?: boolean;
}) {
  const hydrated = useLabHydrated();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    setError(false);
    try {
      const result = await postLab(`admin/${action}`, prepare(form));
      setMessage(result.message || "The record has been saved.");
      onSaved();
    } catch (failure) {
      setError(true);
      setMessage(
        failure instanceof Error
          ? failure.message
          : "No change has been confirmed saved. Try again."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form method="post" onSubmit={submit} className="space-y-4">
      <fieldset disabled={busy || disabled || !hydrated} className="space-y-4">
        {children}
        <button className={workspaceButton}>{busy ? "Saving…" : button}</button>
      </fieldset>
      <WorkspaceStatus message={message} error={error} />
    </form>
  );
}

export function AdminWorkspace({
  actor,
  launchApproved = false,
}: {
  actor: LabActor;
  launchApproved?: boolean;
}) {
  if (actor.mustChangePassword) return <ChangePassword actor={actor} />;
  return <AdminRecords actor={actor} launchApproved={launchApproved} />;
}

function AdminRecords({ actor, launchApproved }: { actor: LabActor; launchApproved: boolean }) {
  const { data: payload, error, loading, reload } = useLabQuery<AdminPayload>("admin");
  const [section, setSection] = useState<Section>("Overview");
  const data = payload?.data;
  const programmes = data
    ? defaultProgrammes.map(
        (base) => programmeContent(data.programmes.find((row) => row.slug === base.slug)) || base
      )
    : defaultProgrammes;
  return (
    <div className="lab-workspace space-y-8">
      <WorkspaceActions actor={actor} />
      <p className="lab-small">
        Administration uses real records from the configured database. Synthetic accounts, cohorts
        and their outcomes are labelled and excluded from real outcome exports. No email or payment
        is sent by these controls.
      </p>
      <nav aria-label="Administration sections" className="flex flex-wrap gap-2">
        {sections.map((label) => (
          <button
            type="button"
            key={label}
            aria-pressed={section === label}
            onClick={() => setSection(label)}
            className={`${workspaceButton} ${section === label ? "" : "lab-button-secondary"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      {loading && <p role="status">Loading administration records…</p>}
      {error && (
        <div className="space-y-3">
          <WorkspaceStatus message={error} error />
          <button type="button" onClick={reload} className={workspaceButton}>
            Try loading again
          </button>
        </div>
      )}
      {data && (
        <section aria-label={section} className="space-y-7">
          {section === "Overview" && (
            <>
              <h2>Pilot records</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  ["Enquiries", data.outcomes.enquiries],
                  ["Enrolments", data.outcomes.enrolments],
                  ["Submissions", data.outcomes.submissions],
                  ["Valid certificates", data.outcomes.certificates],
                  [
                    "Mean reviewed score",
                    data.outcomes.meanReviewedScore === null
                      ? "No reviewed work"
                      : `${data.outcomes.meanReviewedScore}/100`,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="lab-callout">
                    <p className="lab-small">{label}</p>
                    <strong className="text-2xl">{value}</strong>
                  </div>
                ))}
              </div>
              <p className="lab-small">{data.outcomes.note}</p>
              <div className="lab-callout">
                <h3>What this dashboard does not measure yet</h3>
                <p className="lab-small">
                  Conversion, baseline-to-final learning improvement, satisfaction, support effort,
                  refunds, repeat purchase and institutional renewal require a defined collection
                  process. Operational counts and reviewed capstones do not establish causal
                  learning or employment outcomes.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["leads", "enrolments", "submissions"].map((kind) => (
                  <a
                    key={kind}
                    href={`/api/learning-lab/admin/export?kind=${kind}`}
                    className="lab-text-link"
                  >
                    Export real {kind} as CSV
                  </a>
                ))}
              </div>
              <p className="lab-small">
                Exports contain personal information. Download only for an authorised operational
                purpose and store them securely.
              </p>
            </>
          )}
          {section === "Enquiries" && (
            <>
              <h2>Learner and institutional enquiries</h2>
              {data.leads.length === 0 ? (
                <p className="lab-callout">No enquiries have been recorded.</p>
              ) : (
                data.leads.map((lead) => (
                  <article
                    key={lead.id}
                    className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3>{lead.name}</h3>
                        <p className="lab-small break-words">
                          {lead.email} · {lead.kind} · {lead.organisation || "Individual"}
                        </p>
                      </div>
                      <DemoFlag value={lead.is_demo} />
                    </div>
                    <p className="lab-small">
                      {programmes.find((programme) => programme.slug === lead.programme_slug)
                        ?.title || lead.programme_slug}{" "}
                      · {new Date(lead.created_at).toLocaleDateString("en-GB")}
                    </p>
                    {lead.message && (
                      <p className="my-4 text-sm whitespace-pre-wrap">{lead.message}</p>
                    )}
                    <p className="lab-small">
                      Optional marketing consent:{" "}
                      {lead.marketing_consent ? "Recorded" : "Not given"}. Source:{" "}
                      {lead.source || "Not recorded"}.
                    </p>
                    <ActionForm
                      action="lead"
                      prepare={(form) => ({ id: lead.id, status: String(form.get("status")) })}
                      onSaved={reload}
                      button="Save enquiry status"
                    >
                      <Field label="Operational status" name={`lead-${lead.id}`}>
                        <select
                          id={`lead-${lead.id}`}
                          name="status"
                          className={workspaceField}
                          defaultValue={lead.status}
                        >
                          {["new", "qualified", "contacted", "closed"].map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </Field>
                    </ActionForm>
                  </article>
                ))
              )}
            </>
          )}
          {section === "Accounts" && (
            <>
              <h2>Provision a learner account</h2>
              <p className="lab-small">
                Administrator accounts are created through the protected command-line process.
                Confirm identity and agreed pilot participation before provisioning. No email is
                sent; share the temporary password privately using your approved process.
              </p>
              <div className="border-ink-200 dark:border-ink-700 max-w-2xl rounded-2xl border p-5">
                <ActionForm
                  action="user"
                  prepare={(form) => ({
                    name: String(form.get("name")),
                    email: String(form.get("email")),
                    password: String(form.get("password")),
                    isDemo: form.get("isDemo") === "on",
                  })}
                  onSaved={reload}
                  button="Create learner account"
                >
                  <Field label="Learner name" name="account-name">
                    <input
                      id="account-name"
                      name="name"
                      required
                      minLength={2}
                      maxLength={100}
                      className={workspaceField}
                    />
                  </Field>
                  <Field label="Learner email" name="account-email">
                    <input
                      id="account-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="off"
                      className={workspaceField}
                    />
                  </Field>
                  <Field
                    label="Temporary password (at least 12 characters)"
                    name="account-password"
                  >
                    <input
                      id="account-password"
                      name="password"
                      type="password"
                      required
                      minLength={12}
                      maxLength={128}
                      autoComplete="new-password"
                      className={workspaceField}
                    />
                  </Field>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" name="isDemo" className="mt-1" />
                    <span>Synthetic demo account; exclude from real outcomes.</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" required className="mt-1" />
                    <span>
                      I have confirmed the recipient&rsquo;s identity and agreed pilot access, or
                      this is explicitly a synthetic demo account.
                    </span>
                  </label>
                </ActionForm>
              </div>
              <h3>Provisioned accounts</h3>
              {data.users.length === 0 ? (
                <p>No accounts found.</p>
              ) : (
                <div className="lab-table-wrap overflow-x-auto">
                  <table className="lab-table">
                    <caption className="sr-only">Provisioned Lab accounts</caption>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Access state</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.map((user) => (
                        <tr key={user.id}>
                          <th scope="row">
                            {user.name}
                            <br />
                            <DemoFlag value={user.is_demo} />
                          </th>
                          <td className="break-words">{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            {user.must_change_password
                              ? "Temporary password must change"
                              : "Password change recorded"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {section === "Cohorts" && (
            <>
              <h2>Create a pilot cohort</h2>
              <div className="border-ink-200 dark:border-ink-700 max-w-2xl rounded-2xl border p-5">
                <ActionForm
                  action="cohort"
                  prepare={(form) => ({
                    programmeSlug: String(form.get("cohort-programme")),
                    title: String(form.get("title")),
                    status: String(form.get("status")),
                    isDemo: form.get("isDemo") === "on",
                  })}
                  onSaved={reload}
                  button="Create cohort"
                >
                  <Field label="Programme" name="cohort-programme">
                    <ProgrammeSelect name="cohort-programme" items={programmes} />
                  </Field>
                  <Field label="Internal cohort title" name="cohort-title">
                    <input
                      id="cohort-title"
                      name="title"
                      required
                      minLength={3}
                      maxLength={150}
                      className={workspaceField}
                    />
                  </Field>
                  <Field label="Cohort status" name="cohort-status">
                    <select id="cohort-status" name="status" className={workspaceField}>
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </Field>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" name="isDemo" className="mt-1" />
                    <span>Synthetic demo cohort; keep separate from real participants.</span>
                  </label>
                </ActionForm>
              </div>
              <h3>Current cohorts</h3>
              {data.cohorts.length === 0 ? (
                <p className="lab-callout">No cohorts have been created.</p>
              ) : (
                data.cohorts.map((cohort) => (
                  <div key={cohort.id} className="lab-callout">
                    <h4 className="font-semibold">{cohort.title}</h4>
                    <p className="lab-small">
                      {cohort.programme_slug} · {cohort.status}
                    </p>
                    <DemoFlag value={cohort.is_demo} />
                  </div>
                ))
              )}
            </>
          )}
          {section === "Enrolments" && (
            <>
              <h2>Assign a programme</h2>
              <EnrolmentForm
                programmes={programmes}
                users={data.users}
                cohorts={data.cohorts}
                reload={reload}
              />
              <h3>Attendance and current enrolments</h3>
              <p className="lab-small">
                Use verified live-session records. Learner completion checkboxes do not establish
                attendance. Changing attendance revokes an existing certificate for reassessment.
              </p>
              {data.enrolments.length === 0 ? (
                <p className="lab-callout">No programmes have been assigned.</p>
              ) : (
                data.enrolments.map((enrolment) => (
                  <article
                    key={enrolment.id}
                    className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5"
                  >
                    <h4 className="font-semibold">
                      {enrolment.name} ·{" "}
                      {programmes.find((programme) => programme.slug === enrolment.programme_slug)
                        ?.title || enrolment.programme_slug}
                    </h4>
                    <p className="lab-small">
                      {enrolment.email} · {enrolment.status}
                    </p>
                    <DemoFlag value={enrolment.is_demo} />
                    <ActionForm
                      action="attendance"
                      prepare={(form) => ({
                        enrolmentId: enrolment.id,
                        attendancePercent: Number(form.get("attendance")),
                      })}
                      onSaved={reload}
                      button="Save verified attendance"
                    >
                      <Field
                        label="Attendance percentage (0–100)"
                        name={`attendance-${enrolment.id}`}
                      >
                        <input
                          id={`attendance-${enrolment.id}`}
                          name="attendance"
                          type="number"
                          min={0}
                          max={100}
                          step={1}
                          required
                          defaultValue={enrolment.attendance_percent}
                          className={workspaceField}
                        />
                      </Field>
                    </ActionForm>
                  </article>
                ))
              )}
            </>
          )}
          {section === "Reviews" && (
            <>
              <h2>Instructor capstone review</h2>
              <p className="lab-small">
                Assess each published criterion from 0 to 4: 0 = no usable evidence, 1 = weak, 2 =
                developing, 3 = sound, 4 = strong. The server applies criterion weights and records
                the instructor&rsquo;s decision. Editing a review revokes an earlier certificate for
                reassessment.
              </p>
              {data.submissions.length === 0 ? (
                <p className="lab-callout">No capstones have been submitted.</p>
              ) : (
                data.submissions.map((submission) => {
                  const programme = programmes.find(
                    (item) => item.slug === submission.programme_slug
                  );
                  return programme ? (
                    <ReviewCard
                      key={`${submission.id}-${submission.revision}-${submission.reviewed_at || 0}`}
                      submission={submission}
                      programme={programme}
                      reload={reload}
                    />
                  ) : (
                    <p key={submission.id}>Programme content unavailable for this submission.</p>
                  );
                })
              )}
            </>
          )}
          {section === "Content" && (
            <>
              <h2>Programme content and availability</h2>
              <p className="lab-small">
                This JSON editor is the single editing approach for pilot curriculum. The server
                validates the complete programme contract, rubric weights and certificate lesson
                count. Curriculum is locked after the first enrolment to preserve assessment
                evidence. Make a backup before editing; fees, dates and capacity have separate
                controls.
              </p>
              {programmes.map((programme) => (
                <ProgrammeEditor
                  key={programme.slug}
                  programme={programme}
                  row={data.programmes.find((record) => record.slug === programme.slug)}
                  locked={data.enrolments.some(
                    (enrolment) => enrolment.programme_slug === programme.slug
                  )}
                  launchApproved={launchApproved}
                  reload={reload}
                />
              ))}
            </>
          )}
          {section === "Certificates" && (
            <>
              <h2>Issue and verify completion</h2>
              <p className="lab-small">
                The server checks every lesson, recorded attendance and the instructor-approved
                capstone before issuing. Names are private by default; only the learner can opt in
                to public name display. Issuance does not imply accreditation.
              </p>
              <div className="border-ink-200 dark:border-ink-700 max-w-2xl rounded-2xl border p-5">
                <ActionForm
                  action="certificate"
                  prepare={(form) => ({ enrolmentId: String(form.get("enrolment")) })}
                  onSaved={reload}
                  button="Check eligibility and issue certificate"
                  disabled={data.enrolments.length === 0}
                >
                  <Field label="Learner programme record" name="issue-enrolment">
                    <select
                      id="issue-enrolment"
                      name="enrolment"
                      className={workspaceField}
                      required
                    >
                      <option value="">Choose an enrolment</option>
                      {data.enrolments.map((enrolment) => (
                        <option key={enrolment.id} value={enrolment.id}>
                          {enrolment.name} · {enrolment.programme_slug}
                          {enrolment.is_demo ? " · demo" : ""}
                        </option>
                      ))}
                    </select>
                  </Field>
                </ActionForm>
              </div>
              {data.certificates.length === 0 ? (
                <p className="lab-callout">No certificates have been issued.</p>
              ) : (
                data.certificates.map((certificate) => (
                  <article
                    key={certificate.id}
                    className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5"
                  >
                    <h3>
                      {certificate.name} · {certificate.programme_slug}
                    </h3>
                    <p className="lab-small">
                      {certificate.revoked_at ? "Revoked" : "Valid"} · issued{" "}
                      {new Date(certificate.issued_at).toLocaleDateString("en-GB")} · public name{" "}
                      {certificate.publish_name ? "opted in" : "hidden"}
                    </p>
                    <DemoFlag value={certificate.is_demo} />
                    <a
                      href={`/learning-lab/verify/${certificate.verification_id}`}
                      className="lab-text-link"
                    >
                      Open minimal public verification
                    </a>
                    {!certificate.revoked_at && (
                      <ActionForm
                        action="revoke"
                        prepare={() => ({ verificationId: certificate.verification_id })}
                        onSaved={reload}
                        button="Revoke this certificate"
                      >
                        <p className="lab-small">
                          Revocation marks the public record as revoked. Reissuing requires
                          eligibility to be checked again.
                        </p>
                      </ActionForm>
                    )}
                  </article>
                ))
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}

function EnrolmentForm({
  programmes,
  users,
  cohorts,
  reload,
}: {
  programmes: LabProgramme[];
  users: Member[];
  cohorts: Cohort[];
  reload: () => void;
}) {
  const learners = users.filter((user) => user.role === "learner");
  const [userId, setUserId] = useState(learners[0]?.id || "");
  const [slug, setSlug] = useState<string>(programmes[0]?.slug || "");
  const selected = learners.find((user) => user.id === userId);
  const matching = cohorts.filter(
    (cohort) =>
      cohort.programme_slug === slug && Boolean(cohort.is_demo) === Boolean(selected?.is_demo)
  );
  return (
    <div className="border-ink-200 dark:border-ink-700 max-w-2xl rounded-2xl border p-5">
      <ActionForm
        action="enrolment"
        prepare={(form) => ({
          userId,
          programmeSlug: slug,
          cohortId: String(form.get("cohort")) || null,
        })}
        onSaved={reload}
        button="Assign programme"
        disabled={learners.length === 0}
      >
        <Field label="Provisioned learner" name="assign-user">
          <select
            id="assign-user"
            name="user"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className={workspaceField}
          >
            {learners.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} · {user.email}
                {user.is_demo ? " · demo" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Programme" name="assign-programme">
          <select
            id="assign-programme"
            name="programme"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className={workspaceField}
          >
            {programmes.map((programme) => (
              <option key={programme.slug} value={programme.slug}>
                {programme.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Matching cohort (optional)" name="assign-cohort">
          <select
            key={`${userId}-${slug}`}
            id="assign-cohort"
            name="cohort"
            defaultValue=""
            className={workspaceField}
          >
            <option value="">Individual assignment; no cohort</option>
            {matching.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.title} · {cohort.status}
              </option>
            ))}
          </select>
        </Field>
        {learners.length === 0 && (
          <p className="lab-small">Provision a learner account before assigning a programme.</p>
        )}
      </ActionForm>
    </div>
  );
}

function ReviewCard({
  submission,
  programme,
  reload,
}: {
  submission: Submission;
  programme: LabProgramme;
  reload: () => void;
}) {
  let priorScores: number[] = [];
  try {
    const parsed: unknown = JSON.parse(submission.rubric_scores || "[]");
    if (Array.isArray(parsed) && parsed.every((score) => typeof score === "number"))
      priorScores = parsed;
  } catch {
    /* An unreviewed record starts at zero. */
  }
  const [scores, setScores] = useState(programme.rubric.map((_, index) => priorScores[index] || 0));
  const total = Math.round(
    programme.rubric.reduce(
      (sum, criterion, index) => sum + (criterion.weight * scores[index]) / 4,
      0
    )
  );
  return (
    <article className="border-ink-200 dark:border-ink-700 space-y-5 rounded-2xl border p-5">
      <header>
        <h3>
          {submission.name} · {programme.title}
        </h3>
        <p className="lab-small">
          {submission.email} · {new Date(submission.submitted_at).toLocaleDateString("en-GB")}
        </p>
        <DemoFlag value={submission.is_demo} />
      </header>
      <details className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
        <summary className="cursor-pointer font-semibold">Read the submitted capstone</summary>
        <pre className="mt-4 max-h-96 overflow-y-auto font-sans text-sm leading-relaxed break-words whitespace-pre-wrap">
          {submission.body}
        </pre>
      </details>
      <ActionForm
        action="review"
        prepare={(form) => ({
          submissionId: submission.id,
          expectedRevision: submission.revision,
          rubricScores: scores,
          feedback: String(form.get("feedback")),
          approved: form.get("approved") === "on",
        })}
        onSaved={reload}
        button="Save instructor review"
      >
        {programme.rubric.map((criterion, index) => (
          <Field
            key={criterion.criterion}
            label={`${criterion.criterion} · ${criterion.weight}%`}
            name={`review-${submission.id}-${submission.revision}-${index}`}
          >
            <p className="lab-small">{criterion.description}</p>
            <input
              id={`review-${submission.id}-${submission.revision}-${index}`}
              name={`score-${index}`}
              type="number"
              min={0}
              max={4}
              step={0.5}
              required
              value={scores[index]}
              onChange={(event) =>
                setScores((previous) =>
                  previous.map((value, slot) =>
                    slot === index ? Number(event.target.value) : value
                  )
                )
              }
              className={workspaceField}
            />
          </Field>
        ))}
        <p className="font-semibold" aria-live="polite">
          Weighted score preview: {total}/100
        </p>
        <Field label="Feedback (20–5,000 characters)" name={`feedback-${submission.id}`}>
          <textarea
            id={`feedback-${submission.id}`}
            name="feedback"
            rows={6}
            minLength={20}
            maxLength={5000}
            required
            defaultValue={submission.feedback || ""}
            className={workspaceField}
          />
        </Field>
        <label className="flex items-start gap-3 text-sm">
          <input
            name="approved"
            type="checkbox"
            defaultChecked={Boolean(submission.approved)}
            disabled={total < programme.certificate.minScore}
            className="mt-1"
          />
          <span>
            I approve this original capstone after reviewing the evidence against every criterion.
            Minimum score: {programme.certificate.minScore}/100. The server independently checks the
            score.
          </span>
        </label>
      </ActionForm>
    </article>
  );
}

function ProgrammeEditor({
  programme,
  row,
  locked,
  launchApproved,
  reload,
}: {
  programme: LabProgramme;
  row?: ProgrammeRow;
  locked: boolean;
  launchApproved: boolean;
  reload: () => void;
}) {
  const instanceId = useId();
  const [json, setJson] = useState(JSON.stringify(programme, null, 2));
  return (
    <article className="border-ink-200 dark:border-ink-700 space-y-5 rounded-2xl border p-5">
      <h3>{programme.title}</h3>
      <p className="lab-small">
        {programme.sessions.length} lessons · rubric{" "}
        {programme.rubric.reduce((sum, criterion) => sum + criterion.weight, 0)}% ·{" "}
        {locked ? "Curriculum locked: existing enrolments" : "Curriculum editable: no enrolments"}
      </p>
      <details>
        <summary className="cursor-pointer font-semibold">Edit complete programme JSON</summary>
        <div className="mt-4">
          <ActionForm
            action="programme"
            prepare={() => JSON.parse(json) as unknown}
            onSaved={reload}
            button="Validate and save curriculum"
            disabled={locked}
          >
            <Field label="Programme JSON" name={`content-${instanceId}`}>
              <textarea
                id={`content-${instanceId}`}
                value={json}
                onChange={(event) => setJson(event.target.value)}
                rows={18}
                maxLength={70000}
                spellCheck={false}
                className={`${workspaceField} font-mono text-xs`}
              />
            </Field>
            <p className="lab-small">
              Preserve the slug. Changing duration or format does not confirm a schedule. Download
              or copy the current JSON before replacing it.
            </p>
          </ActionForm>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer font-semibold">Availability, dates and fees</summary>
        <div className="mt-4">
          <p className="lab-small mb-4">
            {launchApproved
              ? "Founder launch approval is configured. Publish only programme details the founder has approved. Payments remain disabled."
              : "Founder launch approval is not configured. Only Register Interest with blank dates, fees and capacity can be saved. Payments remain disabled."}
          </p>
          <ActionForm
            action="availability"
            prepare={(form) => ({
              slug: programme.slug,
              status: String(form.get("status")),
              startsAt: form.get("startsAt")?.toString() || null,
              feeInr: !form.get("feeInr") ? null : Number(form.get("feeInr")),
              capacity: !form.get("capacity") ? null : Number(form.get("capacity")),
            })}
            onSaved={reload}
            button="Save availability"
          >
            <Field label="Registration status" name={`status-${instanceId}`}>
              <select
                id={`status-${instanceId}`}
                name="status"
                defaultValue={row?.status || "register-interest"}
                className={workspaceField}
              >
                <option value="register-interest">Register Interest</option>
                <option value="pilot-open" disabled={!launchApproved}>
                  Approved pilot availability
                </option>
                <option value="closed" disabled={!launchApproved}>
                  Closed
                </option>
              </select>
            </Field>
            <Field
              label="Approved start date (leave blank until approved)"
              name={`date-${instanceId}`}
            >
              <input
                id={`date-${instanceId}`}
                type="date"
                name="startsAt"
                disabled={!launchApproved}
                defaultValue={row?.starts_at || ""}
                className={workspaceField}
              />
            </Field>
            <Field
              label="Approved fee in INR (leave blank until approved)"
              name={`fee-${instanceId}`}
            >
              <input
                id={`fee-${instanceId}`}
                name="feeInr"
                type="number"
                min={0}
                max={1000000}
                step={1}
                disabled={!launchApproved}
                defaultValue={row?.fee_inr ?? ""}
                className={workspaceField}
              />
            </Field>
            <Field
              label="Approved capacity (leave blank until approved)"
              name={`capacity-${instanceId}`}
            >
              <input
                id={`capacity-${instanceId}`}
                name="capacity"
                type="number"
                min={1}
                max={500}
                step={1}
                disabled={!launchApproved}
                defaultValue={row?.capacity ?? ""}
                className={workspaceField}
              />
            </Field>
          </ActionForm>
        </div>
      </details>
    </article>
  );
}
