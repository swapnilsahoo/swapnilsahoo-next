import assert from "node:assert/strict";
import { createDecipheriv, createHash, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createClient } from "@libsql/client";

if (process.env.VERCEL) throw new Error("Local synthetic venture verification only.");
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_DATABASE_URL = `file:.data/venture-feedback-test-${randomUUID()}.db`;
process.env.LAB_DATABASE_AUTH_TOKEN = "";
process.env.LAB_AUTH_SECRET = "synthetic-isolated-venture-secret-32-characters";
process.env.LAB_BASE_URL = "http://localhost:3999";
process.env.LAB_EMAIL_ENABLED = "false";
let networkRequests = 0;
globalThis.fetch = async () => {
  networkRequests++;
  throw new Error("External requests are blocked in this isolated verification.");
};

const { getDatabase } = await import("../src/features/learning-lab/server/database");
const {
  startVentureExperiment,
  readVentureExperiment,
  saveVentureWork,
  reviewVentureWork,
  ventureAdminRecords,
  ventureAvailability,
  withdrawVentureExperiment,
  deleteVentureExperiment,
  purgeExpiredVentureExperiments,
} = await import("../src/features/learning-lab/server/venture-experiment");
const db = await getDatabase();
const operator = {
  id: randomUUID(),
  name: "Synthetic operator",
  email: "synthetic-operator@example.org",
  role: "admin" as const,
  isDemo: false,
  mustChangePassword: false,
};
await db.execute({
  sql: "INSERT INTO lab_user(id,name,email,email_verified,created_at,updated_at) VALUES(?,?,?,?,?,?)",
  args: [operator.id, operator.name, operator.email, 0, Date.now(), Date.now()],
});
const input = {
  name: "Synthetic student",
  email: "synthetic-student@example.org",
  college: "Synthetic college",
  idea: "Test whether adult students want a repair appointment booking service.",
  skills: "Basic spreadsheets and repair knowledge",
  relationships: "A consenting local repair shop owner",
  minutesPerDay: 20,
  affordableCommitment: 0,
  customerAccess: "indirect",
  adultConfirmed: true,
  collegeStudentConfirmed: true,
  voluntaryConfirmed: true,
  privacyAccepted: true,
  website: "",
  startedAt: Date.now() - 5000,
};
const expectStatus = async (operation: () => Promise<unknown>, status: number) => {
  await assert.rejects(
    operation,
    (error: unknown) => error instanceof Error && "status" in error && error.status === status
  );
};
const count = async (
  table: "lab_venture_participant" | "lab_venture_work" | "lab_venture_review"
) => Number((await db.execute(`SELECT COUNT(*) AS count FROM ${table}`)).rows[0].count);

async function runCli(command: string, databaseUrl: string, extra: string[] = []) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "--conditions=react-server",
        "--import",
        "tsx",
        "scripts/learning-lab.mts",
        command,
        ...extra,
      ],
      {
        env: { ...process.env, LAB_DATABASE_URL: databaseUrl },
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let stdout = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.resume();
    child.on("error", () => reject(new Error("Synthetic backup verification could not start.")));
    child.on("close", (code) =>
      code === 0
        ? resolve(stdout)
        : reject(
            new Error("Synthetic backup verification failed; private child output was withheld.")
          )
    );
  });
}

try {
  assert.deepEqual(await ventureAvailability(), { capacity: 20, accepted: 0, remaining: 20 });
  for (const override of [
    { adultConfirmed: false },
    { collegeStudentConfirmed: false },
    { voluntaryConfirmed: false },
    { privacyAccepted: false },
    { minutesPerDay: 481 },
    { affordableCommitment: -1 },
    { customerAccess: "made-up" },
    { website: "spam.invalid" },
    { marketingConsent: true },
    { email: "not-an-email" },
    { startedAt: Date.now() + 5000 },
  ])
    await expectStatus(
      () => startVentureExperiment({ ...input, ...override }, "fixture-invalid"),
      422
    );
  assert.equal(await count("lab_venture_participant"), 0);

  const first = await startVentureExperiment(input, "fixture-first");
  assert.match(first.accessCode, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(first.workspace.stages.length, 4);
  assert.equal(
    first.workspace.stages.every((stage) => stage.revision === 0 && stage.work === ""),
    true
  );
  assert.equal(first.workspace.accessExpiresAt - first.workspace.createdAt, 90 * 86400000);
  const privateRow = (await db.execute("SELECT * FROM lab_venture_participant")).rows[0];
  assert.notEqual(privateRow.access_hash, first.accessCode);
  assert.equal(JSON.stringify(privateRow).includes(first.accessCode), false);
  await expectStatus(
    () => startVentureExperiment({ ...input, email: input.email.toUpperCase() }, "fixture-dedup"),
    409
  );
  assert.equal(await count("lab_venture_participant"), 1);

  await expectStatus(() => readVentureExperiment("x".repeat(43), "fixture-invalid-code"), 401);
  await expectStatus(
    () => readVentureExperiment(first.workspace.id, "fixture-identifier-code"),
    401
  );
  const work =
    "We can commit 20 minutes per day and zero rupees. We will ask three adults about their last repair booking before offering one manually arranged appointment.";
  const saved = await saveVentureWork(
    first.accessCode,
    { stage: 1, work, revision: 0 },
    "fixture-save"
  );
  assert.equal(saved.workspace.stages[0].revision, 1);
  await saveVentureWork(first.accessCode, { stage: 1, work, revision: 0 }, "fixture-save-retry");
  assert.equal(await count("lab_venture_work"), 1);
  await expectStatus(
    () =>
      saveVentureWork(
        first.accessCode,
        { stage: 1, work: `${work} Another draft.`, revision: 0 },
        "fixture-stale"
      ),
    409
  );
  await expectStatus(
    () =>
      saveVentureWork(
        first.accessCode,
        { participantId: "someone-else", stage: 1, work, revision: 1 },
        "fixture-injected-owner"
      ),
    422
  );

  const review = {
    participantId: first.workspace.id,
    stage: 1,
    revision: 1,
    expectedReviewRevision: 0,
    feedback:
      "Your boundary is clear. Record recent customer behaviour separately from your interpretation before choosing the offer.",
    rubric: { boundary: 2, customerEvidence: 0, testDesign: 1, decision: 0 },
    mentoringMinutes: 7,
  };
  for (const denied of [
    { ...operator, role: "learner" as const },
    { ...operator, isDemo: true },
    { ...operator, mustChangePassword: true },
  ]) {
    await expectStatus(() => ventureAdminRecords(denied), 403);
    await expectStatus(() => reviewVentureWork(denied, review), 403);
    await expectStatus(
      () => deleteVentureExperiment(denied, { participantId: first.workspace.id }),
      403
    );
  }
  await reviewVentureWork(operator, review);
  await reviewVentureWork(operator, review);
  assert.equal(await count("lab_venture_review"), 1);
  assert.equal(
    Number(
      (await db.execute("SELECT SUM(mentoring_minutes) AS minutes FROM lab_venture_review")).rows[0]
        .minutes
    ),
    7
  );
  const read = await readVentureExperiment(first.accessCode, "fixture-read");
  assert.equal(read.workspace.stages[0].reviews[0].feedback, review.feedback);
  assert.equal(read.workspace.stages[0].reviews[0].workSnapshot, work);
  assert.equal(read.workspace.stages[0].reviews[0].reviewRevision, 1);
  assert.equal("email" in read.workspace, false);
  assert.equal(JSON.stringify(read).includes("reviewer_id"), false);
  const reviewRace = await Promise.allSettled([
    reviewVentureWork(operator, {
      ...review,
      expectedReviewRevision: 1,
      feedback: `${review.feedback} Review tab A.`,
      mentoringMinutes: 8,
    }),
    reviewVentureWork(operator, {
      ...review,
      expectedReviewRevision: 1,
      feedback: `${review.feedback} Review tab B.`,
      mentoringMinutes: 9,
    }),
  ]);
  assert.equal(reviewRace.filter((result) => result.status === "fulfilled").length, 1);
  const rejectedReview = reviewRace.find((result) => result.status === "rejected");
  assert.equal(rejectedReview?.status === "rejected" && rejectedReview.reason.status, 409);
  const afterReviewRace = (await readVentureExperiment(first.accessCode, "fixture-review-race"))
    .workspace.stages[0].reviews[0];
  assert.equal(afterReviewRace.reviewRevision, 2);
  assert.equal(afterReviewRace.workSnapshot, work);
  assert.equal([8, 9].includes(afterReviewRace.mentoringMinutes), true);
  assert.equal(await count("lab_venture_review"), 1);
  await expectStatus(
    () =>
      reviewVentureWork(operator, {
        ...review,
        expectedReviewRevision: 1,
        feedback: `${review.feedback} Stale edit.`,
      }),
    409
  );
  await saveVentureWork(
    first.accessCode,
    { stage: 1, work: `${work} Revised after founder feedback.`, revision: 1 },
    "fixture-revision"
  );
  await expectStatus(() => reviewVentureWork(operator, review), 409);
  await reviewVentureWork(operator, { ...review, revision: 2, mentoringMinutes: 3 });
  assert.equal(await count("lab_venture_review"), 2);
  assert.equal(
    (await readVentureExperiment(first.accessCode, "fixture-history")).workspace.stages[0].reviews
      .length,
    2
  );
  const historical = (await readVentureExperiment(first.accessCode, "fixture-assessed-snapshots"))
    .workspace.stages[0].reviews;
  assert.equal(historical[0].workSnapshot, work);
  assert.equal(historical[1].workSnapshot, `${work} Revised after founder feedback.`);

  assert.deepEqual(Object.keys(await ventureAvailability()).sort(), [
    "accepted",
    "capacity",
    "remaining",
  ]);

  // Distinct real fixture registrations race for the final 19 places. Successful
  // writes must never exceed 20, and capacity failures never expose an email.
  const attempts = await Promise.allSettled(
    Array.from({ length: 25 }, (_, index) =>
      startVentureExperiment(
        { ...input, email: `synthetic-capacity-${index}@example.org` },
        `fixture-capacity-${index}`
      )
    )
  );
  const created = attempts.filter((result) => result.status === "fulfilled");
  const failed = attempts.filter((result) => result.status === "rejected");
  assert.equal(created.length, 19);
  assert.equal(failed.length, 6);
  for (const failure of failed) {
    if (failure.status !== "rejected") continue;
    assert.equal(failure.reason.status, 409);
    assert.equal(failure.reason.message.includes("@"), false);
  }
  assert.deepEqual(await ventureAvailability(), { capacity: 20, accepted: 20, remaining: 0 });
  assert.equal(await count("lab_venture_participant"), 20);
  const admin = await ventureAdminRecords(operator);
  assert.equal(admin.records.length, 20);
  assert.equal(
    admin.records.some((record) => record.email === input.email),
    true
  );
  assert.equal(JSON.stringify(admin).includes(first.accessCode), false);
  assert.equal(JSON.stringify(admin).includes("access_hash"), false);
  const another = created[0];
  if (another.status !== "fulfilled")
    throw new Error("A second synthetic participant is required.");
  const isolated = await readVentureExperiment(another.value.accessCode, "fixture-second-learner");
  assert.equal(
    isolated.workspace.stages.every((stage) => stage.work === ""),
    true
  );
  assert.equal(JSON.stringify(isolated).includes(review.feedback), false);
  const simultaneous = await Promise.allSettled([
    saveVentureWork(
      first.accessCode,
      { stage: 2, work: `${work} Customer interview draft A.`, revision: 0 },
      "fixture-concurrent-a"
    ),
    saveVentureWork(
      first.accessCode,
      { stage: 2, work: `${work} Customer interview draft B.`, revision: 0 },
      "fixture-concurrent-b"
    ),
  ]);
  assert.equal(simultaneous.filter((result) => result.status === "fulfilled").length, 1);
  const conflict = simultaneous.find((result) => result.status === "rejected");
  assert.equal(conflict?.status === "rejected" && conflict.reason.status, 409);
  assert.equal(
    (await readVentureExperiment(first.accessCode, "fixture-concurrent-result")).workspace.stages[1]
      .revision,
    1
  );

  // Exercise the actual encrypted CLI backup and a fresh isolated restore with
  // nonempty venture work and reviews; never read a production secret or record.
  const backupOutput = await runCli("backup", process.env.LAB_DATABASE_URL!);
  const backupPath = backupOutput.match(/saved to (\.data[\\/]backups[\\/][^\s]+\.json)\./)?.[1];
  assert.ok(backupPath);
  const envelopeText = await readFile(backupPath, "utf8");
  assert.equal(envelopeText.includes(input.email), false);
  assert.equal(envelopeText.includes(first.accessCode), false);
  const envelope = JSON.parse(envelopeText);
  const decipher = createDecipheriv(
    "aes-256-gcm",
    createHash("sha256").update(process.env.LAB_AUTH_SECRET!).digest(),
    Buffer.from(envelope.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const snapshot = JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(envelope.data, "base64")),
      decipher.final(),
    ]).toString("utf8")
  );
  assert.equal(snapshot.lab_venture_participant.length, 20);
  assert.equal(snapshot.lab_venture_work.length, 2);
  assert.equal(snapshot.lab_venture_review.length, 2);
  const restoreUrl = `file:.data/venture-restore-test-${randomUUID()}.db`;
  await runCli("restore", restoreUrl, [backupPath]);
  const restored = createClient({ url: restoreUrl });
  try {
    for (const table of [
      "lab_venture_participant",
      "lab_venture_work",
      "lab_venture_review",
    ] as const) {
      const rows = (await restored.execute(`SELECT * FROM ${table}`)).rows;
      const sortRows = (entries: unknown[]) => entries.map((entry) => JSON.stringify(entry)).sort();
      assert.deepEqual(sortRows(rows), sortRows(snapshot[table]));
    }
    assert.equal((await restored.execute("PRAGMA foreign_key_check")).rows.length, 0);
  } finally {
    restored.close();
  }

  await withdrawVentureExperiment(first.accessCode, "fixture-withdraw");
  assert.equal(await count("lab_venture_work"), 0);
  assert.equal(await count("lab_venture_review"), 0);
  await expectStatus(() => readVentureExperiment(first.accessCode, "fixture-withdrawn"), 401);
  assert.equal((await ventureAvailability()).remaining, 1);
  const replacement = await startVentureExperiment(input, "fixture-rejoin");
  await db.execute({
    sql: "UPDATE lab_venture_participant SET access_expires_at=? WHERE id=?",
    args: [Date.now() - 1, replacement.workspace.id],
  });
  await expectStatus(() => readVentureExperiment(replacement.accessCode, "fixture-expired"), 401);
  assert.equal((await ventureAvailability()).remaining, 1);
  assert.equal((await purgeExpiredVentureExperiments()).deleted, 1);
  await deleteVentureExperiment(operator, {
    participantId: admin.records.find((record) => record.id !== first.workspace.id)!.id,
  });
  assert.equal((await ventureAvailability()).remaining, 2);
  assert.equal(
    Number((await db.execute("SELECT COUNT(*) AS count FROM lab_email_outbox")).rows[0].count),
    0
  );
  assert.equal(networkRequests, 0);
  await mkdir("artifacts/learning-lab/venture", { recursive: true });
  await writeFile(
    "artifacts/learning-lab/venture/server-results.json",
    JSON.stringify(
      {
        passed: true,
        isolated: true,
        capacity: 20,
        concurrentAttempts: 25,
        noExternalRequests: true,
        checks: [
          "adult/student/privacy consent",
          "atomic capacity",
          "email deduplication",
          "hashed private codes",
          "cross-learner access rejection",
          "revision guards",
          "permanent operator authorization",
          "human review persistence",
          "idempotent mentoring minutes",
          "historical reviews",
          "actual encrypted CLI backup and fresh restore",
          "expiry",
          "withdrawal and cascade deletion",
          "no email or artificial production registrations",
        ],
      },
      null,
      2
    )
  );
  console.log(
    "PASS: isolated venture feedback, private access, atomic 20-place limit and human review checks."
  );
} finally {
  db.close();
}
