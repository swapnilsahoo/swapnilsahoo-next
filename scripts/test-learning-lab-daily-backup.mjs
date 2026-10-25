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
  const reviewerId = randomUUID(), participantId = randomUUID();
  await source.execute({ sql: "INSERT INTO lab_user(id,name,email,email_verified,created_at,updated_at) VALUES(?,?,?,0,?,?)", args: [reviewerId, "Synthetic reviewer", "reviewer@demo.invalid", now, now] });
  await source.execute({ sql: "INSERT INTO lab_venture_participant(id,name,email,email_hash,college,idea,constraints_json,access_hash,created_at,access_expires_at) VALUES(?,?,?,?,?,?,?,?,?,?)", args: [participantId, "Synthetic participant", "venture-backup@demo.invalid", randomUUID(), "Synthetic college", "Synthetic customer experiment", JSON.stringify({ budget: 0 }), randomUUID(), now, now + 86_400_000] });
  await source.execute({ sql: "INSERT INTO lab_venture_work(participant_id,stage,work,revision,updated_at) VALUES(?,1,?,2,?)", args: [participantId, "Synthetic revised experiment boundary", now] });
  for (const revision of [1, 2]) {
    await source.execute({ sql: "INSERT INTO lab_venture_review(participant_id,stage,work_revision,review_revision,work_snapshot,feedback,rubric_json,mentoring_minutes,reviewer_id,reviewed_at) VALUES(?,1,?,1,?,?,?,?,?,?)", args: [participantId, revision, `Synthetic work revision ${revision}`, `Synthetic human feedback ${revision}`, JSON.stringify({ evidence: revision }), 7, reviewerId, now] });
  }
  await source.execute({ sql: "INSERT INTO lab_enquiry(id,kind,name,email,programme_slug,marketing_consent,status,next_action,is_demo,created_at,updated_at,dedup_key) VALUES(?,?,?,?,?,0,'qualified',?,1,?,?,?)", args: [randomUUID(), "institution", "Synthetic backup fixture", "backup-test@demo.invalid", "ai-for-managers", "Synthetic workflow metadata", now, now, randomUUID()] });
  for (const status of ["pending", "processing", "accepted", "failed", "review"]) {
    await source.execute({ sql: "INSERT INTO lab_email_outbox(id,event_type,idempotency_key,payload,status,attempts,next_attempt_at,lease_token,lease_expires_at,provider_message_id,last_error_code,created_at,updated_at) VALUES(?,'operator-test',?,?,?,1,?,?,?,?,?, ?,?)", args: [randomUUID(), randomUUID(), JSON.stringify({ synthetic: true, status }), status, now, status === "processing" ? "synthetic-lease" : null, status === "processing" ? now + 30_000 : null, status === "accepted" ? "synthetic-provider-id" : null, status === "failed" ? "synthetic-failure" : null, now, now] });
  }
  const schemaBefore = canonicalFingerprint((await source.execute("SELECT type,name,tbl_name,sql FROM sqlite_master")).rows);
  const outboxBefore = canonicalFingerprint((await source.execute("SELECT * FROM lab_email_outbox")).rows);
  const ventureBefore = Object.fromEntries(await Promise.all(["lab_venture_participant", "lab_venture_work", "lab_venture_review"].map(async table => [table, canonicalFingerprint((await source.execute(`SELECT * FROM ${table}`)).rows)])));
  const statements = [];
  const protectedSource = {
    async transaction(mode) {
      assert.equal(mode, "read");
      const transaction = await source.transaction(mode);
      return {
        async execute(sql) { statements.push(sql); assert.match(sql, /^SELECT\s/i); return transaction.execute(sql); },
        async batch(sqls) { assert.equal(sqls.length, 15); statements.push(...sqls); for (const sql of sqls) assert.match(sql, /^SELECT\s/i); return transaction.batch(sqls); },
        commit: () => transaction.commit(), rollback: () => transaction.rollback(), close: () => transaction.close(),
      };
    },
    async execute(sql) { statements.push(sql); assert.match(sql, /^SELECT\s/i); return source.execute(sql); },
  };
  const snapshot = (await readOnlySnapshot(protectedSource)).snapshot;
  assert.equal(Object.keys(snapshot).length, backupTables.length);
  assert.equal(snapshot.lab_email_outbox.length, 5);
  assert.equal(snapshot.lab_venture_participant.length, 1);
  assert.equal(snapshot.lab_venture_work.length, 1);
  assert.equal(snapshot.lab_venture_review.length, 2);
  passed("Production snapshot issues only SELECT statements in a read transaction and captures all 15 tables, including venture work and review history");
  let individualReads = 0, batchReads = 0, committed = false;
  const limitedRoundTrips = await readOnlySnapshot({ transaction: async mode => {
    assert.equal(mode, "read");
    const transaction = await source.transaction(mode);
    return {
      execute: sql => { individualReads++; assert.equal(individualReads, 1, "Only schema discovery may be an individual read"); return transaction.execute(sql); },
      batch: sqls => { batchReads++; assert.equal(sqls.length, 15); return transaction.batch(sqls); },
      commit: () => { committed = true; return transaction.commit(); }, rollback: () => transaction.rollback(), close: () => transaction.close(),
    };
  }});
  assert.equal(individualReads, 1); assert.equal(batchReads, 1); assert.equal(committed, true);
  assert.deepEqual(limitedRoundTrips.snapshot, snapshot);
  passed("All fifteen table reads use one batch in one read transaction instead of fifteen remote round trips");
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
  assert.equal(operation.restore.tables.length, 15);
  assert.equal(operation.restore.tables.find(check => check.table === "lab_venture_review").restoredCount, 2);
  assert.equal(operation.restore.queuedEmailQuarantined, 2);
  assert.equal(operation.cloudUploadConfirmed, false);
  assert.equal(operation.retention.deletedCount, 0);
  assert.equal(operation.restoreTemporaryFilesRemoved, true);
  assert.deepEqual(await readdir(path.join(ownerDirectory, "work")), []);
  assert.equal(await readFile(operation.backupFile, "utf8"), await readFile(operation.syncedFile, "utf8"));
  passed("Actual CLI restore matches 15 tables and linked venture review history, with mail quarantine, integrity/FKs/session0 and exact temporary cleanup");
  assert.equal(canonicalFingerprint((await source.execute("SELECT type,name,tbl_name,sql FROM sqlite_master")).rows), schemaBefore);
  assert.equal(canonicalFingerprint((await source.execute("SELECT * FROM lab_email_outbox")).rows), outboxBefore);
  for (const [table, fingerprint] of Object.entries(ventureBefore)) assert.equal(canonicalFingerprint((await source.execute(`SELECT * FROM ${table}`)).rows), fingerprint);
  assert.ok(statements.every(sql => /^SELECT\s/i.test(sql)));
  passed("Source schema, queued mail and venture participant/work/review records remain unchanged");
  const noSyncOwner = path.join(fixture, "no-sync-managed"); await mkdir(noSyncOwner);
  const noSync = await runBackupWorkflow({ ownerDirectory: noSyncOwner, secret, sourceClient: protectedSource });
  assert.equal(noSync.passed, true); assert.equal(noSync.restoreVerified, true);
  assert.equal(noSync.oneDriveSkipped, true); assert.equal(noSync.encryptedSyncedCopyVerified, false);
  assert.equal(Object.hasOwn(noSync, "syncedFile"), false); assert.equal(noSync.cloudUploadConfirmed, false);
  assert.equal(noSync.retention.verifiedManagedCount, 1);
  assert.deepEqual(await readdir(path.join(noSyncOwner, "work")), []);
  assert.equal(canonicalFingerprint((await source.execute("SELECT * FROM lab_email_outbox")).rows), outboxBefore);
  passed("Explicit no-sync worker still encrypts/restores/cleans privately with source unchanged and no OneDrive/cloud claim");
  const invalidSkipEnvironment = { ...environment, LAB_DATABASE_URL: "libsql://synthetic.invalid", LAB_DATABASE_AUTH_TOKEN: "synthetic-only-token", LAB_BACKUP_PROJECT_ID: "prj_Synthetic", LAB_BACKUP_OWNER_DIRECTORY: path.resolve(".data/lab-backup-prj_Synthetic"), LAB_BACKUP_SKIP_ONEDRIVE: "true", LAB_BACKUP_GITHUB_REPOSITORY: "" };
  const invalidSkip = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/backup-learning-lab.mjs", "--run"], { cwd: process.cwd(), env: invalidSkipEnvironment, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = ""; child.stdout.on("data", chunk => { stdout += String(chunk); }); child.stderr.resume();
    child.on("error", () => reject(new Error("Synthetic boundary child failed.")));
    child.on("close", code => resolve({ code, result: JSON.parse(stdout) }));
  });
  assert.equal(invalidSkip.code, 1); assert.equal(invalidSkip.result.failureCode, "SKIP_ONEDRIVE_REQUIRES_GITHUB");
  passed("No-sync CLI without a GitHub destination is refused before any provider connection");
  const legacy = { ...snapshot };
  for (const table of ["lab_email_outbox", "lab_venture_participant", "lab_venture_work", "lab_venture_review"]) delete legacy[table];
  const legacyFile = path.join(fixture, "legacy-eleven-table.json");
  await writeFile(legacyFile, encryptSnapshot(legacy, secret), { flag: "wx" });
  const legacyResult = await verifyFreshRestore(legacyFile, path.join(fixture, "legacy-restored.db"), secret, decryptSnapshot(await readFile(legacyFile), secret));
  assert.equal(legacyResult.tables.find(check => check.table === "lab_email_outbox").restoredCount, 0);
  for (const table of ["lab_venture_participant", "lab_venture_work", "lab_venture_review"]) assert.equal(legacyResult.tables.find(check => check.table === table).restoredCount, 0);
  passed("Legacy eleven-table backup restores with empty mail and venture tables");
  const previous = { ...snapshot };
  for (const table of ["lab_venture_participant", "lab_venture_work", "lab_venture_review"]) delete previous[table];
  const previousFile = path.join(fixture, "previous-twelve-table.json");
  await writeFile(previousFile, encryptSnapshot(previous, secret), { flag: "wx" });
  const previousResult = await verifyFreshRestore(previousFile, path.join(fixture, "previous-restored.db"), secret, decryptSnapshot(await readFile(previousFile), secret));
  assert.equal(previousResult.queuedEmailQuarantined, 2);
  assert.equal(previousResult.tables.find(check => check.table === "lab_venture_participant").restoredCount, 0);
  passed("Previous twelve-table daily backups remain restorable, with mail quarantine and empty venture tables");
  const malformed = { ...snapshot, lab_venture_work: {} };
  assert.throws(() => decryptSnapshot(encryptSnapshot(malformed, secret), secret), /BACKUP_TABLE_SET_INVALID/);
  passed("Present but malformed venture arrays are rejected rather than silently omitted");
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
  const closedReadOwner = path.join(fixture, "closed-read-managed"); await mkdir(closedReadOwner);
  const closedRead = await runBackupWorkflow({ ownerDirectory: closedReadOwner, secret, sourceClient: { transaction() { throw Object.assign(new Error("synthetic private credentials must not leak"), { code: "TRANSACTION_CLOSED" }); } } });
  assert.equal(closedRead.sourceReadCode, "TRANSACTION_CLOSED");
  assert.equal(JSON.stringify(closedRead).includes("synthetic private"), false);
  passed("Read diagnostics allow a fixed transaction status without exposing provider messages");
  const closeFailureOwner = path.join(fixture, "close-failure-managed"); await mkdir(closeFailureOwner);
  const closeFailure = await runBackupWorkflow({ ownerDirectory: closeFailureOwner, secret, sourceClient: { transaction() { throw new Error("synthetic private source failure"); } }, closeLock: async handle => { await handle.close(); throw new Error("synthetic private close failure"); } });
  assert.equal(closeFailure.passed, false); assert.equal(closeFailure.cleanupPassed, false);
  assert.equal(closeFailure.lockCleanupCode, "EXACT_LOCK_CLEANUP_FAILED");
  assert.equal(JSON.stringify(closeFailure).includes("synthetic private"), false);
  assert.ok((await readdir(closeFailureOwner)).includes("running.lock"));
  passed("Lock-close rejection remains a structured safe failure and preserves the uncertain lock for guarded recovery");
  await writeFile(path.join(fixture, "results.json"), JSON.stringify({ passed: true, checks, fixture }, null, 2));
  console.log(`PASS ${checks.length} synthetic daily-backup checks. Fixtures retained under ignored artifacts/learning-lab.`);
} finally { if (source) source.close(); }
