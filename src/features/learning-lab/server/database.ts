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
  `CREATE TABLE IF NOT EXISTS lab_programme (slug TEXT PRIMARY KEY, content TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'register-interest', starts_at TEXT, fee_inr INTEGER, capacity INTEGER, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_cohort (id TEXT PRIMARY KEY, programme_slug TEXT NOT NULL REFERENCES lab_programme(slug), title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', is_demo INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_enrolment (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE, programme_slug TEXT NOT NULL REFERENCES lab_programme(slug), cohort_id TEXT REFERENCES lab_cohort(id), status TEXT NOT NULL DEFAULT 'active', attendance_percent INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, UNIQUE(user_id, programme_slug))`,
  `CREATE TABLE IF NOT EXISTS lab_progress (enrolment_id TEXT NOT NULL REFERENCES lab_enrolment(id) ON DELETE CASCADE, lesson_index INTEGER NOT NULL, completed_at INTEGER NOT NULL, PRIMARY KEY(enrolment_id, lesson_index))`,
  `CREATE TABLE IF NOT EXISTS lab_submission (id TEXT PRIMARY KEY, enrolment_id TEXT NOT NULL UNIQUE REFERENCES lab_enrolment(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES lab_user(id) ON DELETE CASCADE, body TEXT NOT NULL, attachment_name TEXT, revision INTEGER NOT NULL DEFAULT 1, score INTEGER CHECK(score BETWEEN 0 AND 100), rubric_scores TEXT, feedback TEXT, approved INTEGER NOT NULL DEFAULT 0, reviewer_id TEXT REFERENCES lab_user(id), submitted_at INTEGER NOT NULL, reviewed_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS lab_certificate (id TEXT PRIMARY KEY, enrolment_id TEXT NOT NULL UNIQUE REFERENCES lab_enrolment(id) ON DELETE CASCADE, verification_id TEXT NOT NULL UNIQUE, display_name TEXT, publish_name INTEGER NOT NULL DEFAULT 0, issued_at INTEGER NOT NULL, issuer_id TEXT NOT NULL REFERENCES lab_user(id), revoked_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS lab_enquiry (id TEXT PRIMARY KEY, kind TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, programme_slug TEXT NOT NULL, organisation TEXT, message TEXT, marketing_consent INTEGER NOT NULL DEFAULT 0, consent_at INTEGER, source TEXT, status TEXT NOT NULL DEFAULT 'new', is_demo INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, dedup_key TEXT NOT NULL UNIQUE)`,
  `CREATE TABLE IF NOT EXISTS lab_rate_limit (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS lab_audit (id TEXT PRIMARY KEY, actor_id TEXT, action TEXT NOT NULL, entity_id TEXT, created_at INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS lab_submission_user ON lab_submission(user_id)`,
  `CREATE INDEX IF NOT EXISTS lab_enrolment_user ON lab_enrolment(user_id)`,
  `CREATE INDEX IF NOT EXISTS lab_session_user ON lab_session(user_id)`,
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
  // Additive migration for local pilot databases created before revision checks.
  const columns = (await client.execute("PRAGMA table_info(lab_submission)")).rows;
  if (!columns.some((column) => column.name === "revision"))
    await client.execute(
      "ALTER TABLE lab_submission ADD COLUMN revision INTEGER NOT NULL DEFAULT 1"
    );
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
