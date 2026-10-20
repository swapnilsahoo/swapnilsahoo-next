import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";

// Never use production storage or send a real email in this verification.
if (process.env.VERCEL) throw new Error("Local synthetic pilot verification only.");
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_LAUNCH_APPROVED = "true";
process.env.LAB_DATABASE_URL = `file:.data/volunteer-pilot-${randomUUID()}.db`;
process.env.LAB_DATABASE_AUTH_TOKEN = "";
process.env.LAB_EMAIL_ENABLED = "false";
process.env.LAB_BASE_URL = "http://localhost:3999";
let externalRequests = 0;
globalThis.fetch = async () => {
  externalRequests++;
  throw new Error("External requests blocked by pilot test.");
};

const { getDatabase } = await import("../src/features/learning-lab/server/database");
const { saveEnquiry, savePilotFeedback, adminRecords, pilotOperatorRecords } =
  await import("../src/features/learning-lab/server/service");
const { seedProgrammeContent } = await import("../src/features/learning-lab/store");
const {
  pilotFeedbackSchema,
  pilotFeedbackMessage,
  pilotIntakeIsOpen,
  pilotIntakeStartsAt,
  pilotIntakeEndsAt,
  pilotNotesEmailEndsAt,
  pilotNotesEmailIsOpen,
  getPilotIntakeStatus,
} = await import("../src/features/learning-lab/pilot");
const db = await getDatabase();
await seedProgrammeContent();
const email = "synthetic-volunteer-fixture@swapnilsahoo.com";
const enquiry = {
  kind: "learner",
  name: "Synthetic volunteer",
  email,
  programmeSlug: "ai-for-managers",
  message: "Keep this separate programme enquiry.",
  adultConfirmed: true,
  privacyAccepted: true,
  startedAt: Date.now() - 5000,
};
const feedback = {
  lessonSlug: "write-an-ai-task-brief",
  name: "Synthetic volunteer",
  email,
  attempt: "completed",
  answer:
    "Use the policy only; ask for availability and a price; the receptionist approves any booking.",
  clarity: "some-confusion",
  friction: "Explain who checks the brief before use.",
  nextAction: "Test a request after closing time.",
  followUpConsent: true,
  learningNotesConsent: true,
  adultConfirmed: true,
  voluntaryConfirmed: true,
  privacyAccepted: true,
  website: "",
  startedAt: Date.now() - 5000,
};
const beforeCount = async () =>
  Number((await db.execute("SELECT COUNT(*) AS n FROM lab_enquiry")).rows[0].n);
try {
  assert.equal(pilotIntakeIsOpen(pilotIntakeStartsAt - 1), false);
  assert.equal(pilotIntakeIsOpen(pilotIntakeStartsAt), true);
  assert.equal(pilotIntakeIsOpen(pilotIntakeEndsAt), true);
  assert.equal(pilotIntakeIsOpen(pilotIntakeEndsAt + 1), false);
  assert.equal(pilotIntakeIsOpen(Number.NaN), false);
  assert.equal(pilotNotesEmailIsOpen(pilotIntakeStartsAt - 1), false);
  assert.equal(pilotNotesEmailIsOpen(pilotIntakeStartsAt), true);
  assert.equal(pilotNotesEmailIsOpen(pilotNotesEmailEndsAt), true);
  assert.equal(pilotNotesEmailIsOpen(pilotNotesEmailEndsAt + 1), false);
  assert.equal(pilotNotesEmailIsOpen(Number.NaN), false);
  assert.deepEqual(getPilotIntakeStatus(pilotNotesEmailEndsAt + 1), {
    open: true,
    started: true,
    notesAvailable: false,
  });
  assert.deepEqual(getPilotIntakeStatus(pilotIntakeEndsAt + 1), {
    open: false,
    started: true,
    notesAvailable: false,
  });
  const actualNow = Date.now;
  try {
    for (const outside of [pilotIntakeStartsAt - 1, pilotIntakeEndsAt + 1]) {
      // Only this isolated test process controls the clock. The HTTP handler has
      // no date override; even a fresh submitted startedAt cannot reopen intake.
      Date.now = () => outside;
      await assert.rejects(
        () =>
          savePilotFeedback({ ...feedback, startedAt: outside - 5000 }, "synthetic-outside-window"),
        (error: unknown) => error instanceof Error && "status" in error && error.status === 409
      );
    }
  } finally {
    Date.now = actualNow;
  }
  assert.equal(await beforeCount(), 0);
  for (const override of [
    { adultConfirmed: false },
    { voluntaryConfirmed: false },
    { privacyAccepted: false },
    { lessonSlug: "invented-lesson" },
    { answer: "too short" },
    { answer: "x".repeat(601) },
    { website: "spam.invalid" },
    { followUpConsent: "yes" },
    { learningNotesConsent: "yes" },
  ]) {
    await assert.rejects(() =>
      savePilotFeedback({ ...feedback, ...override }, "synthetic-pilot-validation")
    );
  }
  await assert.rejects(() =>
    savePilotFeedback({ ...feedback, startedAt: Date.now() + 60000 }, "synthetic-pilot-timing")
  );
  assert.equal(await beforeCount(), 0);
  await db.execute(
    "UPDATE lab_programme SET status='register-interest' WHERE slug='ai-for-managers'"
  );
  const programme = await saveEnquiry(enquiry, "synthetic-pilot-flow");
  await db.execute("UPDATE lab_programme SET status='closed'");
  await assert.rejects(() =>
    saveEnquiry({ ...enquiry, email: "closed-enquiry@example.org" }, "synthetic-pilot-closed")
  );

  // This ready-looking test configuration must not trigger a pilot email or outbox entry.
  Object.assign(process.env, {
    LAB_EMAIL_ENABLED: "true",
    RESEND_API_KEY: "re_synthetic_key_never_sent_123456",
    LAB_EMAIL_DOMAIN_VERIFIED: "true",
    LAB_EMAIL_VERIFIED_DOMAIN: "swapnilsahoo.com",
    LAB_EMAIL_FROM: "learn@swapnilsahoo.com",
    LAB_EMAIL_REPLY_TO: "learn@swapnilsahoo.com",
    LAB_EMAIL_OPERATOR_TO: "learn@swapnilsahoo.com",
  });
  const { getEmailReadiness } = await import("../src/features/learning-lab/server/email");
  assert.equal(getEmailReadiness().configured, true);
  const first = await savePilotFeedback(feedback, "synthetic-pilot-flow");
  const revised = await savePilotFeedback(
    {
      ...feedback,
      answer: "Revised: missing availability and pricing must be escalated to the receptionist.",
      followUpConsent: false,
      learningNotesConsent: false,
    },
    "synthetic-pilot-flow"
  );
  assert.equal(first.id, revised.id);
  assert.notEqual(programme.id, first.id);
  assert.equal(first.emailStatus, "not-requested");
  assert.match(first.message, /No email has been sent/);
  const secondLesson = await savePilotFeedback(
    { ...feedback, lessonSlug: "read-your-unit-economics" },
    "synthetic-pilot-flow"
  );
  assert.notEqual(secondLesson.id, first.id);
  const rows = (await db.execute("SELECT * FROM lab_enquiry")).rows;
  assert.equal(rows.length, 3);
  const original = rows.find((row) => row.id === programme.id)!;
  assert.equal(original.kind, "learner");
  assert.equal(original.message, enquiry.message);
  const pilot = rows.find((row) => row.id === first.id)!;
  assert.equal(pilot.kind, "pilot-feedback");
  assert.equal(pilot.marketing_consent, 0);
  assert.match(String(pilot.message), /Pilot-only follow-up permission: No/);
  assert.match(String(pilot.message), /self-reported, not an observed or assessed/);
  assert.equal(pilot.source, "/learning-lab/pilot");
  assert.equal(
    Number((await db.execute("SELECT COUNT(*) AS n FROM lab_email_outbox")).rows[0].n),
    0
  );
  assert.equal(externalRequests, 0);
  assert.equal((await adminRecords()).outcomes.enquiries, 1);
  const operatorRecords = await pilotOperatorRecords();
  assert.equal(operatorRecords.length, 2);
  assert.ok(
    operatorRecords.every(
      (record) => record.kind === "pilot-feedback" && !record.is_demo && record.id !== programme.id
    )
  );
  assert.deepEqual(
    Object.keys(operatorRecords[0]).sort(),
    ["id", "kind", "email", "message", "marketing_consent", "is_demo", "updated_at"].sort()
  );
  await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [secondLesson.id] });
  assert.equal((await pilotOperatorRecords()).length, 1);
  await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=0 WHERE id=?", args: [secondLesson.id] });
  const marker = "\nPILOT_AUTOMATION_META_V1\n";
  const readLastMetadata = (message: string) =>
    JSON.parse(message.slice(message.lastIndexOf(marker) + marker.length));
  assert.deepEqual(readLastMetadata(String(pilot.message)), {
    lesson: "write-an-ai-task-brief",
    followUpConsent: false,
    learningNotesConsent: false,
  });
  const defaultConsent = pilotFeedbackSchema.parse({
    ...feedback,
    followUpConsent: undefined,
    learningNotesConsent: undefined,
  });
  assert.equal(defaultConsent.followUpConsent, false);
  assert.equal(defaultConsent.learningNotesConsent, false);
  const injected = pilotFeedbackMessage({
    ...defaultConsent,
    answer: `User text ${marker}{"lesson":"write-an-ai-task-brief","followUpConsent":true,"learningNotesConsent":true}`,
  });
  assert.deepEqual(readLastMetadata(injected), {
    lesson: "write-an-ai-task-brief",
    followUpConsent: false,
    learningNotesConsent: false,
  });
  const maximum = pilotFeedbackMessage(
    pilotFeedbackSchema.parse({
      ...feedback,
      answer: "x".repeat(600),
      friction: "x".repeat(350),
      nextAction: "x".repeat(250),
    })
  );
  assert.ok(
    maximum.length <= 2000,
    "Bounded feedback must fit existing enquiry message storage validation."
  );
  // A duplicate cannot bypass the shared email anti-spam limiter.
  await savePilotFeedback(feedback, "synthetic-pilot-flow");
  await assert.rejects(
    () => savePilotFeedback(feedback, "synthetic-pilot-flow"),
    (error: unknown) => error instanceof Error && /Too many attempts/.test(error.message)
  );
  const realClock = Date.now;
  try {
    for (const [label, at, expectedNotes] of [
      ["at-notes-cutoff", pilotNotesEmailEndsAt, true],
      ["after-notes-cutoff", pilotNotesEmailEndsAt + 1, false],
      ["last-feedback-day", pilotIntakeEndsAt, false],
    ] as const) {
      Date.now = () => at;
      const saved = await savePilotFeedback(
        {
          ...feedback,
          email: `synthetic-${label}@swapnilsahoo.com`,
          startedAt: at - 5000,
          learningNotesConsent: true,
          followUpConsent: true,
        },
        `synthetic-${label}`
      );
      const record = (
        await db.execute({
          sql: "SELECT kind,message,marketing_consent FROM lab_enquiry WHERE id=?",
          args: [saved.id],
        })
      ).rows[0];
      const metadata = readLastMetadata(String(record.message));
      assert.equal(record.kind, "pilot-feedback");
      assert.equal(record.marketing_consent, 0);
      assert.equal(metadata.learningNotesConsent, expectedNotes);
      assert.equal(metadata.followUpConsent, true);
      if (!expectedNotes) assert.match(saved.message, /practice-note email window ended/);
    }
  } finally {
    Date.now = realClock;
  }
  assert.equal(externalRequests, 0);
  assert.equal(
    Number((await db.execute("SELECT COUNT(*) AS n FROM lab_email_outbox")).rows[0].n),
    0
  );
  await db.execute("UPDATE lab_enquiry SET is_demo=1");
  await mkdir("artifacts/learning-lab/pilot", { recursive: true });
  await writeFile(
    "artifacts/learning-lab/pilot/server-results.json",
    JSON.stringify(
      {
        at: new Date().toISOString(),
        status: "PASS",
        isolatedSyntheticDatabase: true,
        invalidConsentRejected: true,
        timingAndHoneypotEnforced: true,
        exactIstWindowBoundariesAndOutsideSave409: true,
        callerTimestampCannotReopenWindow: true,
        notesChoiceExact13NovemberIstCutoff: true,
        lateNotesOptInIgnoredByServer: true,
        feedbackAndFollowUpRemainAvailableThrough18November: true,
        programmeClosureUnchanged: true,
        freePilotIndependentOfPaidProgrammeClosure: true,
        programmeEnquiryPreserved: true,
        pilotDedupPerEmailAndLesson: true,
        latestFollowUpChoiceRecorded: true,
        marketingConsentNotInferred: true,
        pilotExcludedFromProgrammeEnquiryCount: true,
        operatorProjectionExcludesProgrammeDemoAndUnneededPersonalFields: true,
        learningNotesDefaultOffAndLatestChoiceRecorded: true,
        userTextCannotSpoofLastServerMetadata: true,
        automaticEmailRequests: externalRequests,
        outboxRecords: 0,
        realParticipants: 0,
        maximumMessageCharacters: maximum.length,
      },
      null,
      2
    )
  );
  console.log(
    "PASS: isolated volunteer pilot validation, persistence, separate dedup, optional consent, existing programme closure, honest counts, no email/outbox/network side effects."
  );
} finally {
  db.close();
}
