import { randomUUID, createHash, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { getDatabase, getAuthSecret } from "../src/features/learning-lab/server/database";
import { createMember } from "../src/features/learning-lab/server/service";
import { seedProgrammeContent } from "../src/features/learning-lab/store";

const command = process.argv[2] || "init";
const db = await getDatabase();
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
];
try {
  if (command === "init") {
    await seedProgrammeContent();
    console.log("Learning Lab schema and proposed programme content are ready.");
  } else if (command === "admin") {
    const email = process.env.LAB_ADMIN_EMAIL,
      password = process.env.LAB_ADMIN_PASSWORD;
    if (!email || !password || password.length < 12)
      throw new Error(
        "Set LAB_ADMIN_EMAIL and a LAB_ADMIN_PASSWORD of at least 12 characters privately."
      );
    if ((await db.execute("SELECT user_id FROM lab_member WHERE role='admin' LIMIT 1")).rows.length)
      throw new Error(
        "An administrator already exists. This bootstrap command cannot promote or overwrite accounts."
      );
    await seedProgrammeContent();
    const adminId = await createMember(
      {
        email,
        password,
        name: process.env.LAB_ADMIN_NAME || "Learning Lab administrator",
        role: "admin",
      },
      true
    );
    if (process.env.LAB_ADMIN_MUST_CHANGE_PASSWORD === "true") {
      await db.execute({
        sql: "UPDATE lab_member SET must_change_password=1 WHERE user_id=? AND role='admin'",
        args: [adminId],
      });
      if (
        (await db.execute({
          sql: "SELECT must_change_password FROM lab_member WHERE user_id=? AND role='admin'",
          args: [adminId],
        })).rows[0]?.must_change_password !== 1
      )
        throw new Error("Temporary administrator password replacement was not confirmed.");
    }
    console.log(
      "Administrator provisioned. No email sent. Remove bootstrap password variables after use."
    );
  } else if (command === "demo") {
    if (process.env.LAB_LOCAL_MODE !== "true" || !process.env.LAB_DATABASE_URL?.startsWith("file:"))
      throw new Error("Synthetic seed is restricted to an explicitly local file database.");
    const password = process.env.LAB_DEMO_PASSWORD;
    if (!password || password.length < 12)
      throw new Error("Set a private LAB_DEMO_PASSWORD of at least 12 characters.");
    await seedProgrammeContent();
    for (const [index, name] of ["Demo Learner One", "Demo Learner Two"].entries()) {
      const email = `learner${index + 1}@demo.invalid`;
      if (
        (await db.execute({ sql: "SELECT id FROM lab_user WHERE email=?", args: [email] })).rows
          .length
      )
        continue;
      const id = await createMember({ name, email, password, role: "learner", isDemo: true });
      const cohort = randomUUID();
      await db.execute({
        sql: "INSERT INTO lab_cohort(id,programme_slug,title,status,is_demo,created_at) VALUES(?,'ai-for-managers','Synthetic demonstration cohort','active',1,?)",
        args: [cohort, Date.now()],
      });
      await db.execute({
        sql: "INSERT INTO lab_enrolment(id,user_id,programme_slug,cohort_id,created_at) VALUES(?,?,'ai-for-managers',?,?)",
        args: [randomUUID(), id, cohort, Date.now()],
      });
    }
    console.log(
      "Synthetic learners learner1@demo.invalid and learner2@demo.invalid prepared. Change the supplied temporary password at first sign-in. They are excluded from real outcome reports."
    );
  } else if (command === "backup") {
    const tx = await db.transaction("read"),
      snapshot: Record<string, unknown[]> = {};
    try {
      for (const table of tables)
        snapshot[table] = (await tx.execute(`SELECT * FROM ${table}`)).rows;
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      throw error;
    }
    const key = createHash("sha256")
        .update(await getAuthSecret())
        .digest(),
      iv = randomBytes(12),
      cipher = createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(snapshot)), cipher.final()]);
    await mkdir(".data/backups", { recursive: true });
    const file = `.data/backups/lab-${Date.now()}.json`;
    await writeFile(
      file,
      JSON.stringify({
        version: 1,
        iv: iv.toString("base64"),
        tag: cipher.getAuthTag().toString("base64"),
        data: encrypted.toString("base64"),
      }),
      { mode: 0o600 }
    );
    console.log(
      `Encrypted logical backup saved to ${file}. It excludes sessions and authentication/rate-limit logs. Keep the secret separately and test restoration before launch.`
    );
  } else if (command === "restore") {
    if (!process.argv[3])
      throw new Error(
        "Supply the encrypted backup path and point LAB_DATABASE_URL at a fresh database."
      );
    for (const table of ["lab_user", "lab_enquiry", "lab_enrolment"])
      if ((await db.execute(`SELECT COUNT(*) AS n FROM ${table}`)).rows[0].n)
        throw new Error("Restore is permitted only into a fresh, empty database.");
    const envelope = JSON.parse(await readFile(process.argv[3], "utf8"));
    const key = createHash("sha256")
        .update(await getAuthSecret())
        .digest(),
      decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(envelope.iv, "base64"));
    decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
    const snapshot = JSON.parse(
      Buffer.concat([
        decipher.update(Buffer.from(envelope.data, "base64")),
        decipher.final(),
      ]).toString("utf8")
    ) as Record<string, Record<string, string | number | null>[]>;
    const tx = await db.transaction("write");
    try {
      for (const table of tables)
        for (const row of snapshot[table] || []) {
          const columns = Object.keys(row);
          if (columns.some((c) => !/^[a-z_]+$/.test(c))) throw new Error("Invalid backup schema.");
          await tx.execute({
            sql: `INSERT INTO ${table}(${columns.join(",")}) VALUES(${columns.map(() => "?").join(",")})`,
            args: columns.map((c) => row[c]),
          });
        }
      await tx.commit();
    } catch (error) {
      await tx.rollback();
      throw error;
    }
    console.log(
      "Backup restored into the empty database. Sessions were not restored; everyone must sign in again."
    );
  } else if (command === "purge") {
    // Operational proposal, not automatic deletion: approve retention before running.
    if (process.env.LAB_CONFIRM_RETENTION !== "approved")
      throw new Error(
        "Review the retention policy and set LAB_CONFIRM_RETENTION=approved before deleting expired records."
      );
    const now = Date.now();
    const result = await db.batch(
      [
        {
          sql: "DELETE FROM lab_enquiry WHERE status IN ('new','closed','lost') AND updated_at<?",
          args: [now - 180 * 86400000],
        },
        { sql: "DELETE FROM lab_rate_limit WHERE expires_at<?", args: [now] },
        { sql: "DELETE FROM lab_session WHERE expires_at<?", args: [now] },
        { sql: "DELETE FROM lab_auth_rate_limit WHERE last_request<?", args: [now - 86400000] },
        { sql: "DELETE FROM lab_audit WHERE created_at<?", args: [now - 30 * 86400000] },
      ],
      "write"
    );
    console.log(
      `Approved retention task completed; ${result.reduce((sum, r) => sum + r.rowsAffected, 0)} expired records removed. Cohort-record deletion and individual rights requests require operator review.`
    );
  } else throw new Error("Commands: init, admin, demo, backup, restore <file>, purge.");
} finally {
  db.close();
}
