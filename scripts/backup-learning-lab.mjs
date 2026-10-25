import { createClient } from "@libsql/client";
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { constants } from "node:fs";
import { copyFile, lstat, mkdir, open, readFile, readdir, realpath, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The production connection never imports the application database initializer.
// Keep this envelope/table list compatible with scripts/learning-lab.mts restore.
export const backupTables = Object.freeze([
  "lab_user", "lab_account", "lab_member", "lab_programme", "lab_cohort",
  "lab_enrolment", "lab_progress", "lab_submission", "lab_certificate",
  "lab_enquiry", "lab_audit",
  "lab_email_outbox",
  "lab_venture_participant", "lab_venture_work", "lab_venture_review",
]);
// These tables were added after the original eleven-table release. Older
// snapshots/installations remain readable without inventing missing records.
const optionalBackupTables = new Set([
  "lab_email_outbox", "lab_venture_participant", "lab_venture_work", "lab_venture_review",
]);
const filePattern = /^lab-daily-(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z)-([0-9a-f-]{36})\.json$/;
const schemaQuery = "SELECT type,name,tbl_name,sql FROM sqlite_master WHERE type IN ('table','index','view','trigger')";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoDirectory = path.dirname(scriptDirectory);

export class BackupFailure extends Error {
  constructor(code) { super(code); this.code = code; }
}
function guard(condition, code) { if (!condition) throw new BackupFailure(code); }
export function canonicalFingerprint(rows) {
  const canonical = rows.map(row => JSON.stringify(Object.fromEntries(
    Object.keys(row).sort().map(key => [key, row[key]])
  ))).sort();
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}
function cipherHash(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function contained(parent, target) {
  const relative = path.relative(parent, target);
  return !!relative && relative !== ".." && !relative.startsWith(".." + path.sep) && !path.isAbsolute(relative);
}
async function safeDirectory(directory, expectedParent) {
  const metadata = await lstat(directory);
  guard(metadata.isDirectory() && !metadata.isSymbolicLink(), "DIRECTORY_LINK_REJECTED");
  guard((await realpath(directory)).toLowerCase() === path.resolve(directory).toLowerCase(), "DIRECTORY_RESOLUTION_CHANGED");
  if (expectedParent) guard(contained(expectedParent, path.resolve(directory)), "DIRECTORY_OUTSIDE_OWNER_ROOT");
}
async function safeFile(file, parent) {
  guard(path.dirname(file) === parent && contained(parent, file), "FILE_OUTSIDE_MANAGED_DIRECTORY");
  const metadata = await lstat(file);
  guard(metadata.isFile() && !metadata.isSymbolicLink(), "FILE_LINK_REJECTED");
  guard((await realpath(file)).toLowerCase() === file.toLowerCase(), "FILE_RESOLUTION_CHANGED");
  return metadata;
}
function envelopeKey(secret) {
  guard(typeof secret === "string" && secret.length >= 32, "ORIGINAL_AUTH_SECRET_REQUIRED");
  return createHash("sha256").update(secret).digest();
}
export function encryptSnapshot(snapshot, secret) {
  const key = envelopeKey(secret);
  try {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const data = Buffer.concat([cipher.update(JSON.stringify(snapshot)), cipher.final()]);
    return Buffer.from(JSON.stringify({ version: 1, iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), data: data.toString("base64") }));
  } finally { key.fill(0); }
}
export function decryptSnapshot(bytes, secret) {
  const key = envelopeKey(secret);
  try {
    const envelope = JSON.parse(bytes.toString("utf8"));
    guard(Object.keys(envelope).sort().join("|") === "data|iv|tag|version" && envelope.version === 1, "BACKUP_ENVELOPE_INVALID");
    const iv = Buffer.from(envelope.iv, "base64"), tag = Buffer.from(envelope.tag, "base64");
    guard(iv.length === 12 && tag.length === 16, "BACKUP_ENVELOPE_INVALID");
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const snapshot = JSON.parse(Buffer.concat([decipher.update(Buffer.from(envelope.data, "base64")), decipher.final()]).toString("utf8"));
    const requiredTables = backupTables.filter(table => !optionalBackupTables.has(table));
    guard(Object.keys(snapshot).every(table => backupTables.includes(table)) &&
      requiredTables.every(table => Array.isArray(snapshot[table])) &&
      [...optionalBackupTables].every(table => !Object.hasOwn(snapshot, table) || Array.isArray(snapshot[table])), "BACKUP_TABLE_SET_INVALID");
    for (const table of optionalBackupTables) snapshot[table] ??= [];
    return snapshot;
  } catch (error) {
    if (error instanceof BackupFailure) throw error;
    throw new BackupFailure("BACKUP_DECRYPTION_FAILED");
  } finally { key.fill(0); }
}

export async function readOnlySnapshot(client) {
  const transaction = await client.transaction("read");
  try {
    const schemaRows = (await transaction.execute(schemaQuery)).rows;
    const tableNames = new Set(schemaRows.filter(row => row.type === "table").map(row => row.name));
    guard(backupTables.filter(table => !optionalBackupTables.has(table)).every(table => tableNames.has(table)), "DEPLOYED_BACKUP_TABLE_MISSING");
    // Read all tables in one server round trip inside the same read transaction,
    // rather than extending an interactive transaction across fifteen requests.
    const present = backupTables.filter(table => tableNames.has(table));
    const results = await transaction.batch(present.map(table => `SELECT * FROM ${table}`));
    const snapshot = Object.fromEntries(backupTables.map(table => [table, []]));
    present.forEach((table, index) => { snapshot[table] = results[index].rows; });
    await transaction.commit();
    return { snapshot, schemaCount: schemaRows.length, schemaFingerprint: canonicalFingerprint(schemaRows) };
  } catch (error) {
    try { await transaction.rollback(); } catch { /* Preserve the original read failure. */ }
    throw error;
  } finally { transaction.close(); }
}
async function privateRestore(backupFile, restoreFile, secret) {
  const environment = { ...process.env };
  for (const name of Object.keys(environment)) if (/^(LAB_|TURSO_|TAVUS_|VERCEL)/i.test(name)) delete environment[name];
  Object.assign(environment, { NODE_ENV: "development", LAB_LOCAL_MODE: "true", LAB_DATABASE_URL: `file:${restoreFile.replaceAll("\\", "/")}`, LAB_DATABASE_AUTH_TOKEN: "", LAB_AUTH_SECRET: secret });
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--conditions=react-server", "--import", "tsx", path.join(scriptDirectory, "learning-lab.mts"), "restore", backupFile], {
      cwd: repoDirectory, env: environment, windowsHide: true, stdio: ["ignore", "pipe", "pipe"],
    });
    // Child output may contain database values. Neither stream is logged or saved.
    child.stdout.resume(); child.stderr.resume();
    const timeout = setTimeout(() => { child.kill(); reject(new BackupFailure("RESTORE_CHILD_TIMEOUT")); }, 180_000);
    child.on("error", () => { clearTimeout(timeout); reject(new BackupFailure("RESTORE_CHILD_START_FAILED")); });
    child.on("close", code => { clearTimeout(timeout); if (code === 0) resolve(); else reject(new BackupFailure("RESTORE_CHILD_FAILED")); });
  });
}
export function restoredExpectedRows(table, rows) {
  return rows.map(row => table === "lab_email_outbox" && ["pending", "processing"].includes(String(row.status))
    ? { ...row, status: "review", last_error_code: "restored-review-required", lease_token: null, lease_expires_at: null }
    : row);
}
async function verifyLocalContent(restoreFile, expected) {
  const restored = createClient({ url: `file:${restoreFile.replaceAll("\\", "/")}` });
  try {
    const checks = [];
    for (const table of backupTables) {
      const rows = (await restored.execute(`SELECT * FROM ${table}`)).rows;
      const expectedRows = restoredExpectedRows(table, expected[table]);
      const matched = rows.length === expectedRows.length && canonicalFingerprint(rows) === canonicalFingerprint(expectedRows);
      checks.push({ table, snapshotCount: expected[table].length, restoredCount: rows.length, matched });
      guard(matched, "RESTORED_TABLE_CONTENT_MISMATCH");
    }
    const integrity = (await restored.execute("PRAGMA integrity_check")).rows;
    guard(integrity.length === 1 && Object.values(integrity[0])[0] === "ok", "RESTORE_INTEGRITY_FAILED");
    guard((await restored.execute("PRAGMA foreign_key_check")).rows.length === 0, "RESTORE_FOREIGN_KEY_FAILED");
    guard(Number((await restored.execute("SELECT COUNT(*) AS n FROM lab_session")).rows[0].n) === 0, "RESTORE_SESSION_NOT_EMPTY");
    return { passed: true, tables: checks, integrityOk: true, foreignKeyViolations: 0, sessionCount: 0, queuedEmailQuarantined: expected.lab_email_outbox.filter(row => ["pending", "processing"].includes(String(row.status))).length };
  } finally { restored.close(); }
}
export async function verifyFreshRestore(backupFile, restoreFile, secret, expected) {
  await privateRestore(backupFile, restoreFile, secret);
  // The native local driver can retain prepared-statement handles until GC,
  // despite client.close(). A private verifier process releases all handles on
  // exit before parent cleanup. No GC forcing or alternate deletion mechanism.
  const environment = { ...process.env };
  for (const name of Object.keys(environment)) if (/^(LAB_|TURSO_|TAVUS_|VERCEL)/i.test(name)) delete environment[name];
  Object.assign(environment, { LAB_AUTH_SECRET: secret, LAB_BACKUP_VERIFY_DATABASE: restoreFile, LAB_BACKUP_VERIFY_ENVELOPE: backupFile });
  const result = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fileURLToPath(import.meta.url), "--verify-local-restore"], { cwd: repoDirectory, env: environment, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    child.stdout.on("data", chunk => { if (stdout.length < 100_000) stdout += String(chunk); });
    child.stderr.resume();
    const timeout = setTimeout(() => { child.kill(); reject(new BackupFailure("RESTORE_VERIFY_CHILD_TIMEOUT")); }, 180_000);
    child.on("error", () => { clearTimeout(timeout); reject(new BackupFailure("RESTORE_VERIFY_CHILD_START_FAILED")); });
    child.on("close", code => {
      clearTimeout(timeout);
      try {
        const evidence = JSON.parse(stdout);
        if (code !== 0 || evidence.passed !== true) reject(new BackupFailure("RESTORE_VERIFY_CHILD_FAILED"));
        else resolve(evidence);
      } catch { reject(new BackupFailure("RESTORE_VERIFY_CHILD_REPORT_INVALID")); }
    });
  });
  guard(result.tables.length === backupTables.length && result.tables.every(check => check.matched && check.snapshotCount === expected[check.table]?.length), "RESTORE_VERIFY_CHILD_REPORT_INVALID");
  return result;
}
async function removeExactRestoreFiles(restoreFile, workDirectory) {
  await safeDirectory(workDirectory);
  for (const suffix of ["", "-wal", "-shm", "-journal"]) {
    const file = restoreFile + suffix;
    try { await safeFile(file, workDirectory); }
    catch (error) { if (error.code === "ENOENT") continue; throw error; }
    // Only a transient file-busy error is retried, for this same exact file.
    // Permissions/policy errors are not retried or bypassed by another mechanism.
    const waits = [100, 250, 500, 1000];
    for (let attempt = 0; ; attempt++) {
      try { await unlink(file); break; }
      catch (error) {
        if (error.code === "ENOENT") break;
        if (error.code !== "EBUSY" || attempt >= waits.length) throw error;
        await new Promise(resolve => setTimeout(resolve, waits[attempt]));
        await safeFile(file, workDirectory);
      }
    }
  }
}

export function selectRetention(records, { now = Date.now(), dailyDays = 30, monthlyCount = 12 } = {}) {
  guard(Number.isInteger(dailyDays) && dailyDays >= 7 && Number.isInteger(monthlyCount) && monthlyCount >= 1, "RETENTION_LIMIT_INVALID");
  const valid = records.filter(record => record.verified === true && filePattern.test(record.file) &&
    Number.isFinite(Date.parse(record.createdAt)) && Date.parse(record.createdAt) <= now)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const keep = new Set();
  const days = new Set(), months = new Set();
  const today = new Date(now).toISOString().slice(0, 10);
  const dailyCutoff = Date.parse(today + "T00:00:00.000Z") - (dailyDays - 1) * 86_400_000;
  for (const record of valid) {
    const day = record.createdAt.slice(0, 10), month = day.slice(0, 7);
    if (Date.parse(record.createdAt) >= dailyCutoff && !days.has(day)) { keep.add(record.file); days.add(day); }
    if (!months.has(month) && months.size < monthlyCount) { keep.add(record.file); months.add(month); }
  }
  // Always keep the newest verified snapshot even during a long offline period.
  if (valid[0]) keep.add(valid[0].file);
  return { keep: valid.filter(record => keep.has(record.file)), candidates: valid.filter(record => !keep.has(record.file)) };
}
async function managedRecords(backupDirectory, reportDirectory, syncDirectory) {
  const records = [];
  for (const name of await readdir(reportDirectory)) {
    if (!/^lab-daily-.*\.json\.report\.json$/.test(name)) continue;
    const reportFile = path.join(reportDirectory, name);
    try {
      await safeFile(reportFile, reportDirectory);
      const report = JSON.parse(await readFile(reportFile, "utf8"));
      if (report.format !== "learning-lab-daily-backup-v1" || report.verified !== true ||
        !filePattern.test(report.file) || name !== report.file + ".report.json" ||
        !/^[a-f0-9]{64}$/.test(report.cipherSha256)) continue;
      const local = path.join(backupDirectory, report.file);
      const needsSyncedPair = report.syncedCopyVerified !== false;
      // Explicit no-sync mode never inspects the OneDrive path, even for older
      // manifests. Preserve previous paired records instead of pruning them.
      if (needsSyncedPair && !syncDirectory) continue;
      await safeFile(local, backupDirectory);
      if (cipherHash(await readFile(local)) !== report.cipherSha256) continue;
      if (needsSyncedPair) {
        const synced = path.join(syncDirectory, report.file);
        await safeFile(synced, syncDirectory);
        if (cipherHash(await readFile(synced)) !== report.cipherSha256) continue;
      }
      records.push(report);
    } catch { /* Unverified, missing or tampered pairs are preserved for review. */ }
  }
  return records;
}
async function applyRetention(plan, backupDirectory, reportDirectory, syncDirectory, evidence) {
  let deleted = 0;
  for (const record of plan.candidates) {
    // Recheck each exact pair immediately before deletion. No pathname globs.
    const local = path.join(backupDirectory, record.file);
    await safeDirectory(backupDirectory); await safeDirectory(reportDirectory);
    await safeFile(local, backupDirectory);
    guard(cipherHash(await readFile(local)) === record.cipherSha256, "RETENTION_PAIR_CHANGED");
    if (record.syncedCopyVerified !== false) {
      guard(syncDirectory, "RETENTION_SYNC_PAIR_REQUIRED");
      const synced = path.join(syncDirectory, record.file);
      await safeDirectory(syncDirectory); await safeFile(synced, syncDirectory);
      guard(cipherHash(await readFile(synced)) === record.cipherSha256, "RETENTION_PAIR_CHANGED");
      await unlink(synced);
    }
    evidence.partialDeletionPossible = true;
    await unlink(local);
    const manifest = path.join(reportDirectory, record.file + ".report.json");
    await safeFile(manifest, reportDirectory);
    await unlink(manifest);
    deleted++;
    evidence.deletedCount = deleted;
  }
  evidence.partialDeletionPossible = false;
  return deleted;
}

export async function runBackupWorkflow(options) {
  const { ownerDirectory, syncDirectory, secret, sourceClient, prune = false, closeLock = handle => handle.close() } = options;
  const backupDirectory = path.join(ownerDirectory, "backups"), reportDirectory = path.join(ownerDirectory, "reports"), workDirectory = path.join(ownerDirectory, "work");
  const result = {
    format: "learning-lab-daily-operation-v1", at: new Date().toISOString(), passed: false,
    encryptedBackupCreated: false, restoreVerified: false, encryptedSyncedCopyVerified: false,
    oneDriveSkipped: !syncDirectory, cloudUploadConfirmed: false,
    syncStatus: syncDirectory ? "not copied" : "OneDrive explicitly skipped; private GitHub required by wrapper", cleanupPassed: true,
    retention: { mode: prune ? "prune-managed" : "report-only", candidateCount: 0, deletedCount: 0 },
  };
  let stage = "local paths", lock, restoreFile, restoreAttempted = false;
  const lockFile = path.join(ownerDirectory, "running.lock");
  let operationFile;
  try {
    await safeDirectory(ownerDirectory);
    if (syncDirectory) await safeDirectory(syncDirectory);
    for (const folder of [backupDirectory, reportDirectory, workDirectory]) {
      await mkdir(folder, { recursive: false }).catch(error => { if (error.code !== "EEXIST") throw error; });
      await safeDirectory(folder, ownerDirectory);
    }
    stage = "concurrent-run lock";
    lock = await open(lockFile, "wx", 0o600);
    await lock.writeFile(JSON.stringify({ format: "learning-lab-backup-lock-v1", pid: process.pid, at: result.at }));
    const stamp = result.at.replaceAll(":", "-").replace(".", "-");
    const file = `lab-daily-${stamp}-${randomUUID()}.json`;
    const localFile = path.join(backupDirectory, file);
    operationFile = path.join(reportDirectory, file + ".operation.json");
    stage = "read-only production snapshot";
    const snapshotRead = await readOnlySnapshot(sourceClient);
    result.productionReadOnly = true;
    stage = "authenticated encryption";
    const encrypted = encryptSnapshot(snapshotRead.snapshot, secret);
    await writeFile(localFile, encrypted, { flag: "wx", mode: 0o600 });
    await safeFile(localFile, backupDirectory);
    const expected = decryptSnapshot(await readFile(localFile), secret);
    guard(backupTables.every(table => canonicalFingerprint(expected[table]) === canonicalFingerprint(snapshotRead.snapshot[table])), "ENCRYPTED_SNAPSHOT_MISMATCH");
    result.encryptedBackupCreated = true; result.backupFile = localFile;
    stage = "fresh local restoration";
    restoreFile = path.join(workDirectory, `restore-${randomUUID()}.db`);
    for (const suffix of ["", "-wal", "-shm", "-journal"]) {
      try { await lstat(restoreFile + suffix); throw new BackupFailure("RESTORE_PATH_ALREADY_EXISTS"); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    restoreAttempted = true;
    result.restore = await verifyFreshRestore(localFile, restoreFile, secret, expected);
    result.restoreVerified = true;
    stage = "production schema comparison";
    const schemaAfter = (await sourceClient.execute(schemaQuery)).rows;
    guard(schemaAfter.length === snapshotRead.schemaCount && canonicalFingerprint(schemaAfter) === snapshotRead.schemaFingerprint, "PRODUCTION_SCHEMA_CHANGED_DURING_BACKUP");
    result.productionSchemaUnchanged = true;
    if (syncDirectory) {
      stage = "encrypted synced copy";
      const syncedFile = path.join(syncDirectory, file);
      await safeDirectory(syncDirectory);
      await copyFile(localFile, syncedFile, constants.COPYFILE_EXCL);
      await safeFile(syncedFile, syncDirectory);
      guard(cipherHash(await readFile(syncedFile)) === cipherHash(encrypted), "SYNC_COPY_CONTENT_MISMATCH");
      result.encryptedSyncedCopyVerified = true; result.syncedFile = syncedFile;
      result.syncStatus = "locally queued; remote upload not independently confirmed";
    }
    const report = { format: "learning-lab-daily-backup-v1", file, createdAt: result.at, verified: true, cipherSha256: cipherHash(encrypted), encrypted: true, restored: true, syncedCopyVerified: !!syncDirectory, cloudUploadConfirmed: false };
    await writeFile(path.join(reportDirectory, file + ".report.json"), JSON.stringify(report), { flag: "wx", mode: 0o600 });
    stage = "managed retention";
    const records = await managedRecords(backupDirectory, reportDirectory, syncDirectory);
    const plan = selectRetention(records, { dailyDays: options.dailyDays ?? 30, monthlyCount: options.monthlyCount ?? 12 });
    result.retention.verifiedManagedCount = records.length;
    result.retention.keepCount = plan.keep.length; result.retention.candidateCount = plan.candidates.length;
    if (prune) result.retention.deletedCount = await applyRetention(plan, backupDirectory, reportDirectory, syncDirectory, result.retention);
    result.passed = true;
  } catch (error) {
    result.failedStage = stage;
    // Only fixed internal codes are published; never provider messages/stacks/rows.
    result.failureCode = error instanceof BackupFailure ? error.code : stage === "concurrent-run lock" && error.code === "EEXIST" ? "ANOTHER_RUN_OR_STALE_LOCK" : "OPERATION_FAILED";
    if (stage === "read-only production snapshot") {
      const safeReadCodes = ["TRANSACTION_CLOSED", "SQLITE_BUSY", "SQLITE_ERROR", "SQLITE_READONLY", "SQL_INPUT_ERROR", "UNAUTHORIZED", "TIMEOUT", "SERVER_ERROR", "HRANA_HTTP_ERROR"];
      result.sourceReadCode = safeReadCodes.includes(error.code) ? error.code : "unclassified";
    }
  } finally {
    if (restoreAttempted) {
      try { await removeExactRestoreFiles(restoreFile, workDirectory); result.restoreTemporaryFilesRemoved = true; }
      catch (error) {
        result.cleanupPassed = false; result.restoreTemporaryFilesRemoved = false; result.cleanupCode = "EXACT_RESTORE_CLEANUP_FAILED";
        result.cleanupDetail = error instanceof BackupFailure ? error.code : ["EACCES", "EPERM", "EBUSY", "ENOENT"].includes(error.code) ? error.code : "OTHER";
      }
    }
    if (lock) {
      try { await closeLock(lock); await safeFile(lockFile, ownerDirectory); await unlink(lockFile); }
      catch { result.cleanupPassed = false; result.lockCleanupCode = "EXACT_LOCK_CLEANUP_FAILED"; }
    }
    result.functionalPassed = result.passed;
    result.passed = result.passed && result.cleanupPassed;
    if (operationFile) {
      try { await writeFile(operationFile, JSON.stringify(result, null, 2), { flag: "wx", mode: 0o600 }); }
      catch { result.reportWriteFailed = true; result.passed = false; }
    }
  }
  return result;
}

async function main() {
  if (process.argv.includes("--verify-local-restore")) {
    try {
      const restoreFile = path.resolve(process.env.LAB_BACKUP_VERIFY_DATABASE || ""), backupFile = path.resolve(process.env.LAB_BACKUP_VERIFY_ENVELOPE || "");
      guard(process.env.LAB_BACKUP_VERIFY_DATABASE && process.env.LAB_BACKUP_VERIFY_ENVELOPE && restoreFile.endsWith(".db"), "LOCAL_VERIFY_PATHS_REQUIRED");
      await safeFile(restoreFile, path.dirname(restoreFile));
      await safeFile(backupFile, path.dirname(backupFile));
      const expected = decryptSnapshot(await readFile(backupFile), process.env.LAB_AUTH_SECRET || "");
      process.stdout.write(JSON.stringify(await verifyLocalContent(restoreFile, expected)));
    } catch (error) {
      process.stdout.write(JSON.stringify({ passed: false, failureCode: error instanceof BackupFailure ? error.code : "LOCAL_RESTORE_CHECK_FAILED" }));
      process.exitCode = 1;
    }
    return;
  }
  if (!process.argv.includes("--run")) {
    console.log("Prepared only. Use scripts/backup-learning-lab.ps1 -Run in the owner Windows account.");
    return;
  }
  let client;
  try {
    guard(process.platform === "win32", "OWNER_WINDOWS_ACCOUNT_REQUIRED");
    const databaseUrl = process.env.LAB_DATABASE_URL || "", token = process.env.LAB_DATABASE_AUTH_TOKEN || "";
    const uri = new URL(databaseUrl);
    guard(["libsql:", "https:"].includes(uri.protocol) && uri.hostname && !uri.username && !uri.password && !uri.search && !uri.hash && token, "REMOTE_PRODUCTION_DATABASE_REQUIRED");
    const projectId = process.env.LAB_BACKUP_PROJECT_ID || "";
    guard(/^prj_[a-zA-Z0-9]+$/.test(projectId), "EXPECTED_PROJECT_ID_REQUIRED");
    const ownerDirectory = path.resolve(repoDirectory, `.data/lab-backup-${projectId}`);
    const skipOneDrive = process.env.LAB_BACKUP_SKIP_ONEDRIVE === "true";
    guard(!skipOneDrive || /^[a-zA-Z0-9][a-zA-Z0-9-]*\/[a-zA-Z0-9_.-]+$/.test(process.env.LAB_BACKUP_GITHUB_REPOSITORY || ""), "SKIP_ONEDRIVE_REQUIRES_GITHUB");
    guard(process.env.LAB_BACKUP_OWNER_DIRECTORY === ownerDirectory && (skipOneDrive || process.env.LAB_BACKUP_SYNC_DIRECTORY), "OWNER_VERIFIED_PATHS_REQUIRED");
    client = createClient({ url: databaseUrl, authToken: token });
    const result = await runBackupWorkflow({ ownerDirectory, syncDirectory: skipOneDrive ? undefined : path.resolve(process.env.LAB_BACKUP_SYNC_DIRECTORY), secret: process.env.LAB_AUTH_SECRET || "", sourceClient: client, prune: process.env.LAB_BACKUP_PRUNE === "true" });
    process.stdout.write(JSON.stringify(result));
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    process.stdout.write(JSON.stringify({ passed: false, failureCode: error instanceof BackupFailure ? error.code : "PRIVATE_CONFIGURATION_FAILED", cloudUploadConfirmed: false }));
    process.exitCode = 1;
  } finally { if (client) client.close(); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
