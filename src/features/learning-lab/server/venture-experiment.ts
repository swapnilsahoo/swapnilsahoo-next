import "server-only";
import { createHmac, randomBytes, randomUUID } from "node:crypto";
import type { Client, Transaction } from "@libsql/client";
import { z } from "zod";
import type {
  VentureAdminWorkspace,
  VentureConstraints,
  VentureReview,
  VentureStage,
  VentureWorkspace,
} from "../venture-feedback";
import { getAuthSecret, getDatabase } from "./database";
import { LabHttpError, type LabActor } from "./errors";
import { audit, parse, rateLimit } from "./service";

export const ventureFeedbackCapacity = 20;
export const ventureAccessDays = 90;
const accessDuration = ventureAccessDays * 24 * 60 * 60 * 1000;
const stageNumber = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
const score = z.union([z.literal(0), z.literal(1), z.literal(2)]);
const text = (min: number, max: number) => z.string().trim().min(min).max(max);

export const ventureStartSchema = z
  .object({
    name: text(2, 100),
    email: z
      .email()
      .max(254)
      .transform((value) => value.toLowerCase()),
    college: text(2, 160),
    idea: text(20, 1000),
    skills: text(2, 500),
    relationships: text(2, 500),
    minutesPerDay: z.number().int().min(0).max(480),
    affordableCommitment: z.number().min(0).max(10000),
    customerAccess: z.enum(["none", "indirect", "direct"]),
    adultConfirmed: z.literal(true),
    collegeStudentConfirmed: z.literal(true),
    privacyAccepted: z.literal(true),
    voluntaryConfirmed: z.literal(true),
    website: z.string().max(0).optional().default(""),
    startedAt: z.number().int(),
  })
  .strict();

const workSchema = z
  .object({ stage: stageNumber, work: text(20, 6000), revision: z.number().int().min(0) })
  .strict();
const reviewSchema = z
  .object({
    participantId: z.uuid(),
    stage: stageNumber,
    revision: z.number().int().min(1),
    expectedReviewRevision: z.number().int().min(0),
    feedback: text(20, 4000),
    rubric: z
      .object({ boundary: score, customerEvidence: score, testDesign: score, decision: score })
      .strict(),
    mentoringMinutes: z.number().int().min(1).max(180),
  })
  .strict();

type Executor = Pick<Client, "execute"> | Pick<Transaction, "execute">;
type Participant = {
  id: string;
  name: string;
  email: string;
  college: string;
  idea: string;
  constraints_json: string;
  created_at: number;
  access_expires_at: number;
};
const participantColumns =
  "id,name,email,college,idea,constraints_json,created_at,access_expires_at";

async function hash(value: string) {
  return createHmac("sha256", await getAuthSecret())
    .update(value)
    .digest("hex");
}

async function transaction<T>(work: (tx: Transaction) => Promise<T>) {
  const tx = await (await getDatabase()).transaction("write");
  try {
    const result = await work(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
}

function requireOperator(actor: LabActor) {
  if (actor.role !== "admin" || actor.isDemo || actor.mustChangePassword)
    throw new LabHttpError(403, "A permanent operator account is required.");
}

async function workspace(executor: Executor, row: Participant): Promise<VentureWorkspace> {
  const works = (
    await executor.execute({
      sql: "SELECT stage,work,revision,updated_at FROM lab_venture_work WHERE participant_id=? ORDER BY stage",
      args: [row.id],
    })
  ).rows;
  const reviews = (
    await executor.execute({
      sql: "SELECT stage,work_revision,review_revision,work_snapshot,feedback,rubric_json,mentoring_minutes,reviewed_at FROM lab_venture_review WHERE participant_id=? ORDER BY work_revision,reviewed_at",
      args: [row.id],
    })
  ).rows;
  return {
    id: row.id,
    name: row.name,
    college: row.college,
    idea: row.idea,
    constraints: JSON.parse(row.constraints_json) as VentureConstraints,
    createdAt: Number(row.created_at),
    accessExpiresAt: Number(row.access_expires_at),
    stages: ([1, 2, 3, 4] as const).map((stage): VentureStage => {
      const work = works.find((entry) => entry.stage === stage);
      return {
        stage,
        work: String(work?.work || ""),
        revision: Number(work?.revision || 0),
        updatedAt: work ? Number(work.updated_at) : null,
        reviews: reviews
          .filter((review) => review.stage === stage)
          .map((review): VentureReview => ({
            feedback: String(review.feedback),
            rubric: JSON.parse(String(review.rubric_json)),
            mentoringMinutes: Number(review.mentoring_minutes),
            workRevision: Number(review.work_revision),
            reviewRevision: Number(review.review_revision),
            workSnapshot: String(review.work_snapshot),
            reviewedAt: Number(review.reviewed_at),
          })),
      };
    }),
  };
}

async function participantForCode(code: string, executor?: Executor) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(code))
    throw new LabHttpError(401, "The private access code is invalid or has expired.");
  const result = await (executor || (await getDatabase())).execute({
    sql: `SELECT ${participantColumns} FROM lab_venture_participant WHERE access_hash=? AND access_expires_at>?`,
    args: [await hash(`venture-code:${code}`), Date.now()],
  });
  if (!result.rows[0])
    throw new LabHttpError(401, "The private access code is invalid or has expired.");
  return result.rows[0] as unknown as Participant;
}

export async function ventureAvailability() {
  const accepted = Number(
    (
      await (
        await getDatabase()
      ).execute({
        sql: "SELECT COUNT(*) AS count FROM lab_venture_participant WHERE access_expires_at>?",
        args: [Date.now()],
      })
    ).rows[0].count
  );
  return {
    capacity: ventureFeedbackCapacity,
    accepted,
    remaining: Math.max(0, ventureFeedbackCapacity - accepted),
  };
}

export async function startVentureExperiment(raw: unknown, ip: string) {
  const input = parse(ventureStartSchema, raw);
  const now = Date.now();
  if (now - input.startedAt < 1200 || now - input.startedAt > 60 * 60 * 1000)
    throw new LabHttpError(422, "Please reload the form and take a moment to complete it.");
  await rateLimit(`venture-start-ip:${ip}`, 30);
  await rateLimit(`venture-start-email:${input.email}`, 3);
  const accessCode = randomBytes(32).toString("base64url");
  const emailHash = await hash(`venture-email:${input.email}`);
  const accessHash = await hash(`venture-code:${accessCode}`);
  const constraints: VentureConstraints = {
    skills: input.skills,
    relationships: input.relationships,
    minutesPerDay: input.minutesPerDay,
    affordableCommitment: input.affordableCommitment,
    customerAccess: input.customerAccess,
  };
  const db = await getDatabase();
  await db.execute({
    sql: "DELETE FROM lab_venture_participant WHERE access_expires_at<=?",
    args: [now],
  });
  // The single INSERT ... SELECT statement is one atomic database write. This
  // avoids holding an interactive write lock across concurrent registrations.
  const result = await db.execute({
    sql: `INSERT INTO lab_venture_participant(id,name,email,email_hash,college,idea,constraints_json,access_hash,created_at,access_expires_at) SELECT ?,?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM lab_venture_participant)<? AND NOT EXISTS(SELECT 1 FROM lab_venture_participant WHERE email_hash=?) RETURNING ${participantColumns}`,
    args: [
      randomUUID(),
      input.name,
      input.email,
      emailHash,
      input.college,
      input.idea,
      JSON.stringify(constraints),
      accessHash,
      now,
      now + accessDuration,
      ventureFeedbackCapacity,
      emailHash,
    ],
  });
  if (!result.rows[0])
    throw new LabHttpError(
      409,
      "A new feedback place could not be created. If you already joined, use your private access code. Otherwise continue with the free public experiment or contact the Lab."
    );
  const row = result.rows[0] as unknown as Participant;
  return {
    ok: true,
    accessCode,
    workspace: await workspace(await getDatabase(), row),
    message:
      "Your feedback place is saved. Keep this private access code: it is shown only now, expires after 90 days and is needed to return to your work. No email has been sent. Submit a stage when you are ready for founder review; no response deadline or completion is implied by registration.",
  };
}

export async function readVentureExperiment(code: string, ip: string) {
  await rateLimit(`venture-read:${ip}`, 240);
  const db = await getDatabase();
  return { ok: true, workspace: await workspace(db, await participantForCode(code, db)) };
}

export async function saveVentureWork(code: string, raw: unknown, ip: string) {
  const input = parse(workSchema, raw);
  await rateLimit(`venture-save:${ip}`, 160);
  const db = await getDatabase();
  const row = await participantForCode(code, db);
  const currentWork = async () =>
    (
      await db.execute({
        sql: "SELECT work,revision FROM lab_venture_work WHERE participant_id=? AND stage=?",
        args: [row.id, input.stage],
      })
    ).rows[0];
  const previous = await currentWork();
  if (previous?.work !== input.work) {
    if (Number(previous?.revision || 0) !== input.revision)
      throw new LabHttpError(
        409,
        "This stage has changed. Reload your private work before saving."
      );
    const saved = await db.execute({
      sql: "INSERT INTO lab_venture_work(participant_id,stage,work,revision,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(participant_id,stage) DO UPDATE SET work=excluded.work,revision=excluded.revision,updated_at=excluded.updated_at WHERE lab_venture_work.revision=? RETURNING revision",
      args: [row.id, input.stage, input.work, input.revision + 1, Date.now(), input.revision],
    });
    if (!saved.rows.length && (await currentWork())?.work !== input.work)
      throw new LabHttpError(
        409,
        "This stage has changed. Reload your private work before saving."
      );
  }
  return {
    ok: true,
    workspace: await workspace(await getDatabase(), row),
    message:
      "Your own stage work is saved for founder review. A saved submission is not a review or verified experiment completion.",
  };
}

export async function ventureAdminRecords(actor: LabActor) {
  requireOperator(actor);
  const db = await getDatabase();
  const rows = (
    await db.execute({
      sql: `SELECT ${participantColumns} FROM lab_venture_participant WHERE access_expires_at>? ORDER BY created_at`,
      args: [Date.now()],
    })
  ).rows as unknown as Participant[];
  const records: VentureAdminWorkspace[] = [];
  for (const row of rows) records.push({ ...(await workspace(db, row)), email: row.email });
  return { ok: true, records, ...(await ventureAvailability()) };
}

export async function reviewVentureWork(actor: LabActor, raw: unknown) {
  requireOperator(actor);
  const input = parse(reviewSchema, raw);
  await rateLimit(`venture-review:${actor.id}`, 40);
  const db = await getDatabase();
  const row = (
    await db.execute({
      sql: `SELECT ${participantColumns} FROM lab_venture_participant WHERE id=? AND access_expires_at>?`,
      args: [input.participantId, Date.now()],
    })
  ).rows[0] as unknown as Participant | undefined;
  if (!row) throw new LabHttpError(404, "This active feedback place was not found.");
  const work = (
    await db.execute({
      sql: "SELECT work,revision FROM lab_venture_work WHERE participant_id=? AND stage=?",
      args: [input.participantId, input.stage],
    })
  ).rows[0];
  if (!work || work.revision !== input.revision)
    throw new LabHttpError(409, "The learner's work has changed. Reload it before reviewing.");
  const currentReview = async () =>
    (
      await db.execute({
        sql: "SELECT review_revision,feedback,rubric_json,mentoring_minutes FROM lab_venture_review WHERE participant_id=? AND stage=? AND work_revision=?",
        args: [input.participantId, input.stage, input.revision],
      })
    ).rows[0];
  const rubricJson = JSON.stringify(input.rubric);
  const identical = (previous: Awaited<ReturnType<typeof currentReview>>) =>
    previous?.feedback === input.feedback &&
    previous.rubric_json === rubricJson &&
    previous.mentoring_minutes === input.mentoringMinutes;
  const previous = await currentReview();
  if (!identical(previous)) {
    if (Number(previous?.review_revision || 0) !== input.expectedReviewRevision)
      throw new LabHttpError(
        409,
        "This feedback has changed in another tab. Reload it before saving your review."
      );
    // Both the reviewed work version and existing review version are checked by
    // one atomic write. A parallel tab cannot overwrite feedback or its minutes.
    const saved = await db.execute({
      sql: "INSERT INTO lab_venture_review(participant_id,stage,work_revision,review_revision,work_snapshot,feedback,rubric_json,mentoring_minutes,reviewer_id,reviewed_at) SELECT participant_id,stage,revision,?,work,?,?,?,?,? FROM lab_venture_work WHERE participant_id=? AND stage=? AND revision=? ON CONFLICT(participant_id,stage,work_revision) DO UPDATE SET review_revision=excluded.review_revision,feedback=excluded.feedback,rubric_json=excluded.rubric_json,mentoring_minutes=excluded.mentoring_minutes,reviewer_id=excluded.reviewer_id,reviewed_at=excluded.reviewed_at WHERE lab_venture_review.review_revision=? RETURNING review_revision",
      args: [
        input.expectedReviewRevision + 1,
        input.feedback,
        rubricJson,
        input.mentoringMinutes,
        actor.id,
        Date.now(),
        input.participantId,
        input.stage,
        input.revision,
        input.expectedReviewRevision,
      ],
    });
    if (!saved.rows.length && !identical(await currentReview()))
      throw new LabHttpError(
        409,
        "The work or feedback has changed. Reload it before saving your review."
      );
  }
  await audit(actor, "venture.review", row.id);
  return {
    ok: true,
    workspace: await workspace(await getDatabase(), row),
    message: "Your human feedback and mentoring minutes have been saved for this work revision.",
  };
}

export async function withdrawVentureExperiment(code: string, ip: string) {
  await rateLimit(`venture-withdraw:${ip}`, 10);
  await transaction(async (tx) => {
    const participant = await participantForCode(code, tx);
    await tx.execute({
      sql: "DELETE FROM lab_venture_participant WHERE id=?",
      args: [participant.id],
    });
  });
  return {
    ok: true,
    message:
      "Your feedback registration, stage work and reviews have been deleted. Your private access code no longer works. Free public learning remains available.",
  };
}

export async function deleteVentureExperiment(actor: LabActor, raw: unknown) {
  requireOperator(actor);
  const { participantId } = parse(z.object({ participantId: z.uuid() }).strict(), raw);
  await (
    await getDatabase()
  ).execute({
    sql: "DELETE FROM lab_venture_participant WHERE id=?",
    args: [participantId],
  });
  await audit(actor, "venture.delete", participantId);
  return { ok: true, message: "The feedback registration, work and reviews have been deleted." };
}

export async function purgeExpiredVentureExperiments() {
  const result = await (
    await getDatabase()
  ).execute({
    sql: "DELETE FROM lab_venture_participant WHERE access_expires_at<=?",
    args: [Date.now()],
  });
  return { deleted: result.rowsAffected };
}
