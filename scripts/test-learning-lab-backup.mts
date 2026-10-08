import { createHash, createDecipheriv, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@libsql/client";

const tables = [
  "lab_user",
  "lab_account",
  "lab_member",
  "lab_programme",
  "lab_cohort",
  "lab_enrolment",
  "lab_progress",
  "lab_submission",
  "lab_certificate",
  "lab_enquiry",
  "lab_audit",
] as const;
type TableRow = Record<string, string | number | null>;

function fingerprint(rows: TableRow[]) {
  const canonical = rows
    .map((row) =>
      JSON.stringify(
        Object.fromEntries(
          Object.keys(row)
            .sort()
            .map((key) => [key, row[key]])
        )
      )
    )
    .sort();
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

async function runNode(args: string[], env: NodeJS.ProcessEnv) {
  return await new Promise<{ code: number | null; stdout: string }>((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: process.cwd(),
      env,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    // Provider or database errors are deliberately not printed: they can contain data.
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.resume();
    child.on("error", () => reject(new Error("The verification child process could not start.")));
    child.on("close", (code) => resolve({ code, stdout }));
  });
}

async function cli(command: string, env: NodeJS.ProcessEnv, extra: string[] = []) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await runNode(
      [
        "--conditions=react-server",
        "--import",
        "tsx",
        "scripts/learning-lab.mts",
        command,
        ...extra,
      ],
      env
    );
    if (result.code === 0) return result.stdout;
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(
    `The ${command} verification command failed after three attempts. No child error data was printed.`
  );
}

const artifactDirectory = path.resolve("artifacts/learning-lab");
const resultPath = path.join(artifactDirectory, "backup-results.json");
await mkdir(artifactDirectory, { recursive: true });
const evidence: Record<string, unknown> = { testedAt: new Date().toISOString(), pass: false };

try {
  const secret = await readFile(path.resolve(".data/learning-lab-secret"), "utf8");
  if (secret.length < 32)
    throw new Error(
      "The existing local authentication secret is not suitable for this verification."
    );
  const localEnvironment: NodeJS.ProcessEnv = {
    ...process.env,
    NODE_ENV: "development",
    LAB_LOCAL_MODE: "true",
    LAB_DATABASE_URL: "file:.data/learning-lab.db",
    LAB_DATABASE_AUTH_TOKEN: "",
    LAB_AUTH_SECRET: secret,
  };

  // The real CLI takes a read transaction; concurrent pilot QA may change the live
  // source after it commits, so the decrypted backup is the comparison snapshot.
  const backupOutput = await cli("backup", localEnvironment);
  const backupMatch = backupOutput.match(/saved to (\.data[\\/]backups[\\/][^\s]+\.json)\./);
  if (!backupMatch) throw new Error("The CLI did not identify the encrypted backup file.");
  const backupFile = backupMatch[1];
  const envelopeText = await readFile(path.resolve(backupFile), "utf8");
  const envelope = JSON.parse(envelopeText) as {
    version: number;
    iv: string;
    tag: string;
    data: string;
  };
  if (envelope.version !== 1) throw new Error("Unexpected backup envelope version.");
  const key = createHash("sha256").update(secret).digest();
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(envelope.data, "base64")),
    decipher.final(),
  ]).toString("utf8");
  const snapshot = JSON.parse(decrypted) as Record<string, TableRow[]>;
  if (Object.keys(snapshot).sort().join("|") !== [...tables].sort().join("|"))
    throw new Error("The actual backup does not contain exactly the eleven supported tables.");

  const emailValues = [...(snapshot.lab_user || []), ...(snapshot.lab_enquiry || [])]
    .map((row) => String(row.email || ""))
    .filter(Boolean);
  const plaintextEmailLeak = emailValues.some((email) => envelopeText.includes(email));
  const secretLeak = envelopeText.includes(secret);
  if (plaintextEmailLeak || secretLeak)
    throw new Error("Sensitive plaintext appeared in the encrypted backup envelope.");

  let wrongKeyRejected = false;
  try {
    const wrong = createDecipheriv(
      "aes-256-gcm",
      createHash("sha256").update(randomUUID()).digest(),
      Buffer.from(envelope.iv, "base64")
    );
    wrong.setAuthTag(Buffer.from(envelope.tag, "base64"));
    wrong.update(Buffer.from(envelope.data, "base64"));
    wrong.final();
  } catch {
    wrongKeyRejected = true;
  }
  if (!wrongKeyRejected)
    throw new Error("The authenticated backup accepted an incorrect decryption key.");

  const restoreFile = `.data/learning-lab-restore-${randomUUID()}.db`;
  const restoreEnvironment = { ...localEnvironment, LAB_DATABASE_URL: `file:${restoreFile}` };
  await cli("restore", restoreEnvironment, [backupFile]);
  const restored = createClient({ url: `file:${restoreFile}` });
  try {
    const tableChecks = [];
    for (const table of tables) {
      const rows = (await restored.execute(`SELECT * FROM ${table}`)).rows as unknown as TableRow[];
      const expectedRows = snapshot[table];
      const expectedSha256 = fingerprint(expectedRows);
      const restoredSha256 = fingerprint(rows);
      const match = rows.length === expectedRows.length && expectedSha256 === restoredSha256;
      tableChecks.push({
        table,
        expectedCount: expectedRows.length,
        restoredCount: rows.length,
        expectedSha256,
        restoredSha256,
        match,
      });
    }
    const restoredSessionCount = Number(
      (await restored.execute("SELECT COUNT(*) AS count FROM lab_session")).rows[0].count
    );
    const foreignKeyViolations = (await restored.execute("PRAGMA foreign_key_check")).rows.length;
    const integrityRows = (await restored.execute("PRAGMA integrity_check")).rows;
    const integrityOk = integrityRows.length === 1 && Object.values(integrityRows[0])[0] === "ok";
    evidence.backupFile = backupFile;
    evidence.restoreFile = restoreFile;
    evidence.encryption = {
      algorithm: "AES-256-GCM",
      envelopeVersion: 1,
      emailValuesChecked: emailValues.length,
      plaintextEmailLeak,
      secretLeak,
      wrongKeyRejected,
    };
    evidence.tables = tableChecks;
    evidence.restoredSessionCount = restoredSessionCount;
    evidence.foreignKeyViolations = foreignKeyViolations;
    evidence.integrityOk = integrityOk;
    if (
      tableChecks.some((check) => !check.match) ||
      restoredSessionCount !== 0 ||
      foreignKeyViolations !== 0 ||
      !integrityOk
    )
      throw new Error("Restored database verification failed.");
  } finally {
    restored.close();
  }

  const productionEnvironment: NodeJS.ProcessEnv = {
    ...process.env,
    NODE_ENV: "production",
    LAB_LOCAL_MODE: "false",
  };
  delete productionEnvironment.LAB_DATABASE_URL;
  delete productionEnvironment.LAB_DATABASE_AUTH_TOKEN;
  delete productionEnvironment.LAB_AUTH_SECRET;
  const failClosedCode = `
    const { getDatabase, getAuthSecret, LabUnavailable } = await import('./src/features/learning-lab/server/database.ts');
    const results = {};
    for (const [name, getter] of [['storage', getDatabase], ['authenticationSecret', getAuthSecret]]) {
      try { await getter(); results[name] = { blocked: false }; }
      catch (error) { results[name] = { blocked: error instanceof LabUnavailable, errorClass: error.constructor.name }; }
    }
    console.log(JSON.stringify(results));
    if (!Object.values(results).every(value => value.blocked)) process.exitCode = 1;
  `;
  const productionResult = await runNode(
    ["--conditions=react-server", "--import", "tsx", "--input-type=module", "-e", failClosedCode],
    productionEnvironment
  );
  evidence.productionFailClosed = JSON.parse(productionResult.stdout.trim());
  if (productionResult.code !== 0)
    throw new Error("Missing production configuration was not rejected.");
  const hostedEnvironment: NodeJS.ProcessEnv = {
    ...productionEnvironment,
    VERCEL: "1",
    LAB_LOCAL_MODE: "true",
    LAB_DATABASE_URL: "file:.data/must-not-create-hosted.db",
  };
  const hostedResult = await runNode(
    ["--conditions=react-server", "--import", "tsx", "--input-type=module", "-e", failClosedCode],
    hostedEnvironment
  );
  evidence.hostedFileDatabaseBlocked = JSON.parse(hostedResult.stdout.trim());
  if (hostedResult.code !== 0)
    throw new Error("Hosted execution accepted an ephemeral local database or generated secret.");
  evidence.pass = true;
  await writeFile(resultPath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(
    "PASS: actual CLI encrypted backup and fresh restore match all 11 tables; sessions remain empty; foreign keys/integrity pass; missing production storage/secret fail closed."
  );
  console.log(
    "Evidence: artifacts/learning-lab/backup-results.json. No secret values or learner records printed."
  );
} catch (error) {
  evidence.error = error instanceof Error ? error.message : "Verification failed.";
  await writeFile(resultPath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.error(
    "FAIL: backup/configuration verification. Read the evidence file for the data-free failure summary."
  );
  process.exitCode = 1;
}
