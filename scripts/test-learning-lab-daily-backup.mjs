import assert from "node:assert/strict";
import { createClient } from "@libsql/client";
import { createHash, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { backupTables, canonicalFingerprint, decryptSnapshot, encryptSnapshot, readOnlySnapshot, runBackupWorkflow, selectRetention, verifyFreshRestore } from "./backup-learning-lab.mjs";

// Synthetic isolated file databases only. No existing secret/env/recovery file,
// provider API, OneDrive destination or production database is accessed.
const fixture = path.resolve("artifacts/learning-lab", "daily-backup-test-" + randomUUID());
await mkdir(fixture, { recursive: true });
const secret = "synthetic-only-daily-backup-secret-" + randomUUID();
const sourceFile = path.join(fixture, "source.db");
const environment = { ...process.env, NODE_ENV: "development", LAB_LOCAL_MODE: "true", LAB_DATABASE_URL: `file:${sourceFile.replaceAll("\\", "/")}`, LAB_DATABASE_AUTH_TOKEN: "", LAB_AUTH_SECRET: secret };
for (const name of Object.keys(environment)) if (/^(TURSO_|TAVUS_|VERCEL)/i.test(name) || /^LAB_ADMIN_/.test(name)) delete environment[name];
function cli(command, extra = [], childEnvironment = environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--conditions=react-server", "--import", "tsx", "scripts/learning-lab.mts", command, ...extra], { cwd: process.cwd(), env: childEnvironment, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    child.stdout.resume(); child.stderr.resume();
    child.on("error", () => reject(new Error("Synthetic CLI child start failed.")));
    child.on("close", code => code === 0 ? resolve() : reject(new Error("Synthetic CLI child failed.")));
  });
}
const checks = [];
function passed(name) { checks.push(name); console.log("PASS " + name); }
let source;
try {
  await cli("init");
  source = createClient({ url: environment.LAB_DATABASE_URL });
  const now = Date.now();
  await source.execute({ sql: "INSERT INTO lab_enquiry(id,kind,name,email,programme_slug,marketing_consent,status,next_action,is_demo,created_at,updated_at,dedup_key) VALUES(?,?,?,?,?,0,'qualified',?,1,?,?,?)", args: [randomUUID(), "institution", "Synthetic backup fixture", "backup-test@demo.invalid", "ai-for-managers", "Synthetic workflow metadata", now, now, randomUUID()] });
  for (const status of ["pending", "processing", "accepted", "failed", "review"]) {
    await source.execute({ sql: "INSERT INTO lab_email_outbox(id,event_type,idempotency_key,payload,status,attempts,next_attempt_at,lease_token,lease_expires_at,provider_message_id,last_error_code,created_at,updated_at) VALUES(?,'operator-test',?,?,?,1,?,?,?,?,?, ?,?)", args: [randomUUID(), randomUUID(), JSON.stringify({ synthetic: true, status }), status, now, status === "processing" ? "synthetic-lease" : null, status === "processing" ? now + 30_000 : null, status === "accepted" ? "synthetic-provider-id" : null, status === "failed" ? "synthetic-failure" : null, now, now] });
  }
  const schemaBefore = canonicalFingerprint((await source.execute("SELECT type,name,tbl_name,sql FROM sqlite_master")).rows);
  const outboxBefore = canonicalFingerprint((await source.execute("SELECT * FROM lab_email_outbox")).rows);
  const statements = [];
  const protectedSource = {
    async transaction(mode) {
      assert.equal(mode, "read");
      const transaction = await source.transaction(mode);
      return { async execute(sql) { statements.push(sql); assert.match(sql, /^SELECT\s/i); return transaction.execute(sql); }, commit: () => transaction.commit(), rollback: () => transaction.rollback(), close: () => transaction.close() };
    },
    async execute(sql) { statements.push(sql); assert.match(sql, /^SELECT\s/i); return source.execute(sql); },
  };
  const snapshot = (await readOnlySnapshot(protectedSource)).snapshot;
  assert.equal(Object.keys(snapshot).length, backupTables.length);
  assert.equal(snapshot.lab_email_outbox.length, 5);
  passed("Production snapshot issues only SELECT statements in a read transaction and captures all 12 tables");
  const encrypted = encryptSnapshot(snapshot, secret);
  assert.deepEqual(decryptSnapshot(encrypted, secret), snapshot);
  assert.equal(encrypted.toString().includes("backup-test@demo.invalid"), false);
  assert.equal(encrypted.toString().includes(secret), false);
  assert.throws(() => decryptSnapshot(encrypted, "wrong-key-synthetic-secret-that-is-long-enough"), /BACKUP_DECRYPTION_FAILED/);
  const tampered = JSON.parse(encrypted.toString());
  tampered.data = Buffer.from("corrupt").toString("base64");
  assert.throws(() => decryptSnapshot(Buffer.from(JSON.stringify(tampered)), secret), /BACKUP_DECRYPTION_FAILED/);
  passed("AES-GCM envelope round trip, plaintext exclusion, wrong-key and corruption rejection");
  const ownerDirectory = path.join(fixture, "managed"), syncDirectory = path.join(fixture, "synthetic-sync");
  await mkdir(ownerDirectory); await mkdir(syncDirectory);
  const operation = await runBackupWorkflow({ ownerDirectory, syncDirectory, secret, sourceClient: protectedSource });
  assert.equal(operation.passed, true);
  assert.equal(operation.restore.tables.length, 12);
  assert.equal(operation.restore.queuedEmailQuarantined, 2);
  assert.equal(operation.cloudUploadConfirmed, false);
  assert.equal(operation.retention.deletedCount, 0);
  assert.equal(operation.restoreTemporaryFilesRemoved, true);
  assert.deepEqual(await readdir(path.join(ownerDirectory, "work")), []);
  assert.equal(await readFile(operation.backupFile, "utf8"), await readFile(operation.syncedFile, "utf8"));
  passed("Actual CLI restore matches 12 tables with deliberate mail quarantine, integrity/FKs/session0 and exact temporary cleanup");
  assert.equal(canonicalFingerprint((await source.execute("SELECT type,name,tbl_name,sql FROM sqlite_master")).rows), schemaBefore);
  assert.equal(canonicalFingerprint((await source.execute("SELECT * FROM lab_email_outbox")).rows), outboxBefore);
  assert.ok(statements.every(sql => /^SELECT\s/i.test(sql)));
  passed("Source schema and all original queued mail remain unchanged");
  const legacy = { ...snapshot }; delete legacy.lab_email_outbox;
  const legacyFile = path.join(fixture, "legacy-eleven-table.json");
  await writeFile(legacyFile, encryptSnapshot(legacy, secret), { flag: "wx" });
  const legacyResult = await verifyFreshRestore(legacyFile, path.join(fixture, "legacy-restored.db"), secret, decryptSnapshot(await readFile(legacyFile), secret));
  assert.equal(legacyResult.tables.find(check => check.table === "lab_email_outbox").restoredCount, 0);
  passed("Legacy eleven-table backup restores with an empty mail outbox");
  await writeFile(path.join(ownerDirectory, "running.lock"), "synthetic stale lock", { flag: "wx" });
  const locked = await runBackupWorkflow({ ownerDirectory, syncDirectory, secret, sourceClient: protectedSource });
  assert.equal(locked.passed, false); assert.equal(locked.failureCode, "ANOTHER_RUN_OR_STALE_LOCK");
  assert.equal(await readFile(path.join(ownerDirectory, "running.lock"), "utf8"), "synthetic stale lock");
  passed("Concurrent/stale lock fails without replacing or deleting the existing lock");
  const records = [];
  const retentionNow = Date.parse("2026-10-11T12:00:00.000Z");
  for (let index = 0; index < 430; index++) {
    const createdAt = new Date(retentionNow - index * 86_400_000).toISOString();
    records.push({ file: `lab-daily-${createdAt.replaceAll(":", "-").replace(".", "-")}-${randomUUID()}.json`, createdAt, verified: true });
  }
  records.push({ file: "activation-existing.json", createdAt: records[0].createdAt, verified: true });
  records.push({ file: records[0].file.replace(/\.json$/, "-unknown.json"), createdAt: records[0].createdAt, verified: false });
  const plan = selectRetention(records, { now: retentionNow });
  assert.equal(plan.keep.length, 40); // 30 recent days; October already included; 11 other monthly anchors, September daily overlap.
  assert.equal(plan.keep.length + plan.candidates.length, 430);
  assert.ok(plan.keep.includes(records[0]));
  assert.ok(!plan.candidates.some(record => record.file === "activation-existing.json"));
  passed("30 daily + 12 monthly selection preserves newest and ignores unmanaged/unverified files");
  const retentionOwner = path.join(fixture, "retention-managed"), retentionSync = path.join(fixture, "retention-synthetic-sync");
  for (const folder of [retentionOwner, retentionSync]) await mkdir(folder);
  for (const child of ["backups", "reports", "work"]) await mkdir(path.join(retentionOwner, child));
  const generated = [];
  for (const [index, state] of ["verified", "verified", "changed", "unverified"].entries()) {
    const createdAt = `2020-01-0${index + 1}T12:00:00.000Z`;
    const file = `lab-daily-${createdAt.replaceAll(":", "-").replace(".", "-")}-${randomUUID()}.json`;
    await writeFile(path.join(retentionOwner, "backups", file), encrypted, { flag: "wx" });
    await writeFile(path.join(retentionSync, file), state === "changed" ? "synthetic changed ciphertext" : encrypted, { flag: "wx" });
    await writeFile(path.join(retentionOwner, "reports", file + ".report.json"), JSON.stringify({ format: "learning-lab-daily-backup-v1", file, createdAt, verified: state !== "unverified", cipherSha256: createHash("sha256").update(encrypted).digest("hex") }), { flag: "wx" });
    generated.push(file);
  }
  await writeFile(path.join(retentionSync, "existing-unmanaged.json"), "synthetic preserve", { flag: "wx" });
  const pruned = await runBackupWorkflow({ ownerDirectory: retentionOwner, syncDirectory: retentionSync, secret, sourceClient: protectedSource, prune: true });
  assert.equal(pruned.passed, true); assert.equal(pruned.retention.deletedCount, 1);
  assert.equal((await readdir(path.join(retentionOwner, "backups"))).includes(generated[0]), false);
  assert.equal((await readdir(retentionSync)).includes(generated[0]), false);
  for (const file of generated.slice(1)) assert.ok((await readdir(retentionSync)).includes(file));
  assert.equal(await readFile(path.join(retentionSync, "existing-unmanaged.json"), "utf8"), "synthetic preserve");
  passed("Actual managed retention removes only an exact verified old pair; changed/unverified/unmanaged files survive");
  const failedOwner = path.join(fixture, "failed-managed"); await mkdir(failedOwner);
  const failed = await runBackupWorkflow({ ownerDirectory: failedOwner, syncDirectory, secret, sourceClient: { transaction() { throw new Error("synthetic private URL and row must not leak"); } } });
  assert.equal(failed.passed, false); assert.equal(failed.failureCode, "OPERATION_FAILED");
  assert.equal(JSON.stringify(failed).includes("synthetic private URL"), false);
  assert.equal(failed.cleanupPassed, true);
  passed("Provider failures publish a fixed safe stage/code and release only this run's lock");
  await writeFile(path.join(fixture, "results.json"), JSON.stringify({ passed: true, checks, fixture }, null, 2));
  console.log(`PASS ${checks.length} synthetic daily-backup checks. Fixtures retained under ignored artifacts/learning-lab.`);
} finally { if (source) source.close(); }
