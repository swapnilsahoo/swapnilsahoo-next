import "server-only";
import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";

export class LabUnavailable extends Error {}

export const user = sqliteTable("lab_user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
export const session = sqliteTable("lab_session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
export const account = sqliteTable("lab_account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp_ms" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
export const verification = sqliteTable("lab_verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
export const rateLimit = sqliteTable("lab_auth_rate_limit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: integer("last_request").notNull(),
});

const ddl = [
  `CREATE TABLE IF NOT EXISTS lab_user (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, email_verified INTEGER NOT NULL DEFAULT 0, image TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_session (id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL, token TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, ip_address TEXT, user_agent TEXT, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS lab_account (id TEXT PRIMARY KEY, account_id TEXT NOT NULL, provider_id TEXT NOT NULL, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE, access_token TEXT, refresh_token TEXT, id_token TEXT, access_token_expires_at INTEGER, refresh_token_expires_at INTEGER, scope TEXT, password TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_verification (id TEXT PRIMARY KEY, identifier TEXT NOT NULL, value TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_auth_rate_limit (id TEXT PRIMARY KEY, key TEXT NOT NULL UNIQUE, count INTEGER NOT NULL, last_request INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_member (user_id TEXT PRIMARY KEY REFERENCES lab_user(id) ON DELETE CASCADE, role TEXT NOT NULL CHECK(role IN ('admin','learner')), is_demo INTEGER NOT NULL DEFAULT 0, must_change_password INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS lab_programme (slug TEXT PRIMARY KEY, content TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'register-interest', starts_at TEXT, fee_inr INTEGER, capacity INTEGER, offer_details TEXT, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_cohort (id TEXT PRIMARY KEY, programme_slug TEXT NOT NULL REFERENCES lab_programme(slug), title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', is_demo INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_enrolment (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE, programme_slug TEXT NOT NULL REFERENCES lab_programme(slug), cohort_id TEXT REFERENCES lab_cohort(id), status TEXT NOT NULL DEFAULT 'active', attendance_percent INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, UNIQUE(user_id, programme_slug))`,
  `CREATE TABLE IF NOT EXISTS lab_progress (enrolment_id TEXT NOT NULL REFERENCES lab_enrolment(id) ON DELETE CASCADE, lesson_index INTEGER NOT NULL, completed_at INTEGER NOT NULL, PRIMARY KEY(enrolment_id, lesson_index))`,
  `CREATE TABLE IF NOT EXISTS lab_submission (id TEXT PRIMARY KEY, enrolment_id TEXT NOT NULL UNIQUE REFERENCES lab_enrolment(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE, body TEXT NOT NULL, attachment_name TEXT, revision INTEGER NOT NULL DEFAULT 1, score INTEGER CHECK(score BETWEEN 0 AND 100), rubric_scores TEXT, feedback TEXT, approved INTEGER NOT NULL DEFAULT 0, reviewer_id TEXT REFERENCES lab_user(id), submitted_at INTEGER NOT NULL, reviewed_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS lab_certificate (id TEXT PRIMARY KEY, enrolment_id TEXT NOT NULL UNIQUE REFERENCES lab_enrolment(id) ON DELETE CASCADE, verification_id TEXT NOT NULL UNIQUE, display_name TEXT, publish_name INTEGER NOT NULL DEFAULT 0, issued_at INTEGER NOT NULL, issuer_id TEXT NOT NULL REFERENCES lab_user(id), revoked_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS lab_enquiry (id TEXT PRIMARY KEY, kind TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, programme_slug TEXT NOT NULL, organisation TEXT, role TEXT, learner_count INTEGER, preferred_timetable TEXT, message TEXT, marketing_consent INTEGER NOT NULL DEFAULT 0, consent_at INTEGER, source TEXT, status TEXT NOT NULL DEFAULT 'new', owner_user_id TEXT REFERENCES lab_user(id) ON DELETE SET NULL, next_action TEXT, next_action_at INTEGER, is_demo INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, dedup_key TEXT NOT NULL UNIQUE)`,
  `CREATE TABLE IF NOT EXISTS lab_email_outbox (id TEXT PRIMARY KEY, enquiry_id TEXT REFERENCES lab_enquiry(id) ON DELETE CASCADE, event_type TEXT NOT NULL CHECK(event_type IN ('receipt','operator','operator-test')), idempotency_key TEXT NOT NULL UNIQUE, payload TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','accepted','failed','review')), attempts INTEGER NOT NULL DEFAULT 0, first_attempt_at INTEGER, last_attempt_at INTEGER, next_attempt_at INTEGER NOT NULL, lease_token TEXT, lease_expires_at INTEGER, provider_message_id TEXT, last_error_code TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, UNIQUE(enquiry_id,event_type))`,
  `CREATE TABLE IF NOT EXISTS lab_rate_limit (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_audit (id TEXT PRIMARY KEY, actor_id TEXT, action TEXT NOT NULL, entity_id TEXT, created_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_venture_participant (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, email_hash TEXT NOT NULL UNIQUE, college TEXT NOT NULL, idea TEXT NOT NULL, constraints_json TEXT NOT NULL, access_hash TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, access_expires_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_venture_work (participant_id TEXT NOT NULL REFERENCES lab_venture_participant(id) ON DELETE CASCADE, stage INTEGER NOT NULL CHECK(stage BETWEEN 1 AND 4), work TEXT NOT NULL, revision INTEGER NOT NULL CHECK(revision>=1), updated_at INTEGER NOT NULL, PRIMARY KEY(participant_id,stage))`,
  `CREATE TABLE IF NOT EXISTS lab_venture_review (participant_id TEXT NOT NULL REFERENCES lab_venture_participant(id) ON DELETE CASCADE, stage INTEGER NOT NULL CHECK(stage BETWEEN 1 AND 4), work_revision INTEGER NOT NULL CHECK(work_revision>=1), review_revision INTEGER NOT NULL DEFAULT 1 CHECK(review_revision>=1), work_snapshot TEXT NOT NULL, feedback TEXT NOT NULL, rubric_json TEXT NOT NULL, mentoring_minutes INTEGER NOT NULL CHECK(mentoring_minutes BETWEEN 1 AND 180), reviewer_id TEXT NOT NULL REFERENCES lab_user(id), reviewed_at INTEGER NOT NULL, PRIMARY KEY(participant_id,stage,work_revision))`,
  `CREATE INDEX IF NOT EXISTS lab_submission_user ON lab_submission(user_id)`,
  `CREATE INDEX IF NOT EXISTS lab_enrolment_user ON lab_enrolment(user_id)`,
  `CREATE INDEX IF NOT EXISTS lab_session_user ON lab_session(user_id)`,
  `CREATE INDEX IF NOT EXISTS lab_email_due ON lab_email_outbox(status,next_attempt_at)`,
  `CREATE INDEX IF NOT EXISTS lab_venture_expiry ON lab_venture_participant(access_expires_at)`,
];

let connection: Promise<Client> | undefined;
export function getDatabase(): Promise<Client> {
  connection ??= initialise().catch((error) => {
    connection = undefined;
    throw error;
  });
  return connection;
}
async function initialise() {
  const local =
    !process.env.VERCEL &&
    (process.env.NODE_ENV !== "production" || process.env.LAB_LOCAL_MODE === "true");
  const url = process.env.LAB_DATABASE_URL || (local ? "file:.data/learning-lab.db" : "");
  if (!url || (url.startsWith("file:") && !local))
    throw new LabUnavailable("Persistent Lab storage is not configured.");
  if (url.startsWith("file:")) await mkdir(path.dirname(url.slice(5)), { recursive: true });
  const client = createClient({ url, authToken: process.env.LAB_DATABASE_AUTH_TOKEN });
  await client.execute("PRAGMA foreign_keys = ON");
  await client.batch(ddl, "write");
  // Serialize additive migrations so simultaneous cold starts cannot add the same
  // column twice. Existing lead stages and enquiry data remain unchanged.
  const migration = await client.transaction("write");
  try {
    const submissionColumns = (await migration.execute("PRAGMA table_info(lab_submission)")).rows;
    if (!submissionColumns.some((column) => column.name === "revision"))
      await migration.execute(
        "ALTER TABLE lab_submission ADD COLUMN revision INTEGER NOT NULL DEFAULT 1"
      );
    const programmeColumns = (await migration.execute("PRAGMA table_info(lab_programme)")).rows;
    if (!programmeColumns.some((column) => column.name === "offer_details"))
      await migration.execute("ALTER TABLE lab_programme ADD COLUMN offer_details TEXT");
    const enquiryColumns = (await migration.execute("PRAGMA table_info(lab_enquiry)")).rows;
    for (const [name, definition] of [
      ["owner_user_id", "TEXT REFERENCES lab_user(id) ON DELETE SET NULL"],
      ["next_action", "TEXT"],
      ["next_action_at", "INTEGER"],
      ["role", "TEXT"],
      ["learner_count", "INTEGER"],
      ["preferred_timetable", "TEXT"],
    ])
      if (!enquiryColumns.some((column) => column.name === name))
        await migration.execute(`ALTER TABLE lab_enquiry ADD COLUMN ${name} ${definition}`);
    const ventureReviewColumns = (await migration.execute("PRAGMA table_info(lab_venture_review)"))
      .rows;
    for (const [name, definition] of [
      ["review_revision", "INTEGER NOT NULL DEFAULT 1"],
      ["work_snapshot", "TEXT NOT NULL DEFAULT ''"],
    ])
      if (!ventureReviewColumns.some((column) => column.name === name))
        await migration.execute(`ALTER TABLE lab_venture_review ADD COLUMN ${name} ${definition}`);
    await migration.commit();
  } catch (error) {
    await migration.rollback();
    throw error;
  } finally {
    migration.close();
  }
  // Only the new voluntary venture records expire here. Codes are rejected at
  // 90 days even when no request has yet triggered this maintenance cleanup.
  await client.execute({
    sql: "DELETE FROM lab_venture_participant WHERE access_expires_at<=?",
    args: [Date.now()],
  });
  return client;
}

export async function getAuthSecret() {
  const configured = process.env.LAB_AUTH_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (
    process.env.VERCEL ||
    (process.env.NODE_ENV === "production" && process.env.LAB_LOCAL_MODE !== "true")
  )
    throw new LabUnavailable("Lab authentication is not configured.");
  const secretPath = path.resolve(".data/learning-lab-secret");
  await mkdir(path.dirname(secretPath), { recursive: true });
  try {
    return await readFile(secretPath, "utf8");
  } catch {
    const generated = randomBytes(48).toString("base64url");
    try {
      await writeFile(secretPath, generated, { flag: "wx", mode: 0o600 });
      return generated;
    } catch {
      return await readFile(secretPath, "utf8");
    }
  }
}

export async function getAuthDatabase() {
  return drizzle(await getDatabase(), {
    schema: { user, session, account, verification, rateLimit },
  });
}
