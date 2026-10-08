import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

// Test approval states only in a new, isolated synthetic database.
if (process.env.VERCEL) throw new Error("Local availability verification only.");
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_LAUNCH_APPROVED = "true";
process.env.LAB_DATABASE_URL = `file:.data/learning-lab-availability-${randomUUID()}.db`;
process.env.LAB_DATABASE_AUTH_TOKEN = "";
const { getDatabase } = await import("../src/features/learning-lab/server/database");
const { saveEnquiry } = await import("../src/features/learning-lab/server/service");
const { LabHttpError } = await import("../src/features/learning-lab/server/errors");
const { seedProgrammeContent, getPublicProgramme } =
  await import("../src/features/learning-lab/store");
const db = await getDatabase();
await seedProgrammeContent();
const enquiry = {
  kind: "learner",
  name: "Synthetic availability test",
  email: "availability@demo.invalid",
  programmeSlug: "ai-for-managers",
  adultConfirmed: true,
  privacyAccepted: true,
  startedAt: Date.now() - 5000,
};
try {
  await db.execute("UPDATE lab_programme SET status='closed' WHERE slug='ai-for-managers'");
  await assert.rejects(
    () => saveEnquiry(enquiry, "synthetic-availability-test"),
    (error) => error instanceof LabHttpError && error.status === 409
  );
  assert.equal(Number((await db.execute("SELECT COUNT(*) AS n FROM lab_enquiry")).rows[0].n), 0);
  assert.equal((await getPublicProgramme("ai-for-managers"))?.availability.status, "closed");
  await db.execute(
    "UPDATE lab_programme SET status='pilot-open',starts_at='2027-01-01',fee_inr=8000,capacity=12 WHERE slug='ai-for-managers'"
  );
  const approved = (await getPublicProgramme("ai-for-managers"))?.availability;
  assert.deepEqual(approved, {
    status: "pilot-open",
    startsAt: "2027-01-01",
    feeInr: 8000,
    capacity: 12,
  });
  const saved = await saveEnquiry(enquiry, "synthetic-availability-test");
  await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [saved.id] });
  assert.equal(saved.ok, true);
  const code =
    "const {getPublicProgramme}=await import('./src/features/learning-lab/store.ts'); const p=await getPublicProgramme('ai-for-managers'); console.log(JSON.stringify(p.availability));";
  const unapproved = await new Promise<string>((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["--conditions=react-server", "--import", "tsx", "--input-type=module", "-e", code],
      {
        env: { ...process.env, LAB_LAUNCH_APPROVED: "false" },
        windowsHide: true,
        stdio: ["ignore", "pipe", "ignore"],
      }
    );
    let output = "";
    child.stdout.on("data", (chunk) => (output += String(chunk)));
    child.on("error", reject);
    child.on("exit", (exitCode) =>
      exitCode === 0 ? resolve(output) : reject(new Error("Unapproved configuration check failed."))
    );
  });
  assert.deepEqual(JSON.parse(unapproved), {
    status: "register-interest",
    startsAt: null,
    feeInr: null,
    capacity: null,
  });
  await mkdir("artifacts/learning-lab", { recursive: true });
  await writeFile(
    "artifacts/learning-lab/availability-results.json",
    JSON.stringify(
      {
        at: new Date().toISOString(),
        status: "PASS",
        isolatedSyntheticDatabase: true,
        closedEnquiryRejected: true,
        noClosedEnquiryPersisted: true,
        approvedDetailsConfigurable: true,
        openEnquiryPersisted: true,
        unapprovedDetailsHidden: true,
      },
      null,
      2
    )
  );
  console.log(
    "PASS isolated availability checks: closure enforced before persistence; approved details configurable; unapproved fees, dates and capacity hidden."
  );
} finally {
  db.close();
}
