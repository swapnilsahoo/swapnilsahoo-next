import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

// Isolated synthetic data only. This script never contacts a production service.
if (process.env.VERCEL) throw new Error("Local pilot-detail verification only.");
const approvedChild = process.argv.includes("--approved-child");
if (!approvedChild)
  process.env.LAB_DATABASE_URL = `file:.data/learning-lab-pilot-details-${randomUUID()}.db`;
if (!process.env.LAB_DATABASE_URL?.startsWith("file:.data/learning-lab-pilot-details-"))
  throw new Error("An isolated pilot-detail test database is required.");
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_LAUNCH_APPROVED = approvedChild ? "true" : "false";
process.env.LAB_DATABASE_AUTH_TOKEN = "";
const { getDatabase } = await import("../src/features/learning-lab/server/database");
const { adminMutation, adminRecords, createMember, saveEnquiry } =
  await import("../src/features/learning-lab/server/service");
const { LabHttpError } = await import("../src/features/learning-lab/server/errors");
const { seedProgrammeContent, getPublicProgramme } =
  await import("../src/features/learning-lab/store");
const { defaultOfferDetails } = await import("../src/features/learning-lab/config");
const db = await getDatabase();
await seedProgrammeContent();
const actor = {
  id: process.env.LAB_PILOT_TEST_ACTOR_ID || "",
  name: "Synthetic pilot administrator",
  email: "pilot-details@demo.invalid",
  role: "admin" as const,
  isDemo: true,
  mustChangePassword: false,
};
const slug = "ai-for-managers";
const failure = (status: number) => (error: unknown) =>
  error instanceof LabHttpError && error.status === status;
const offerDetails = {
  timetableIst: "Synthetic test timetable, 18:00–19:30 IST",
  taxDisplay: "Synthetic total payable amount; not a real offer.",
  minCohort: 10,
  instructor: "Synthetic instructor",
  accessTerms: "Synthetic 30-day access terms.",
  supportTerms: "Synthetic email support terms.",
  cancellationTerms: "Synthetic full-refund cancellation terms.",
  format: "Synthetic online session.",
  learningOutput: "Synthetic workflow and evaluation sheet.",
};
try {
  if (approvedChild) {
    await assert.rejects(
      () =>
        adminMutation(actor, "availability", {
          slug,
          status: "pilot-open",
          startsAt: "2027-01-01",
          feeInr: 100,
          capacity: 9,
        }),
      failure(422)
    );
    await adminMutation(actor, "availability", {
      slug,
      status: "pilot-open",
      startsAt: "2027-01-01",
      feeInr: 100,
      capacity: 12,
    });
    assert.deepEqual((await getPublicProgramme(slug))?.offerDetails, offerDetails);
    for (const storedDetails of ["null", "42", '"text"', "{", "[]", '{"minCohort":"10"}']) {
      await db.execute({
        sql: "UPDATE lab_programme SET offer_details=? WHERE slug=?",
        args: [storedDetails, slug],
      });
      assert.deepEqual((await getPublicProgramme(slug))?.offerDetails, defaultOfferDetails);
    }
    await adminMutation(actor, "pilot-details", { slug, offerDetails });
    await adminMutation(actor, "availability", {
      slug,
      status: "register-interest",
      startsAt: null,
      feeInr: null,
      capacity: null,
    });
    assert.deepEqual((await getPublicProgramme(slug))?.offerDetails, defaultOfferDetails);
    console.log(
      JSON.stringify({
        approvedOpenPublished: true,
        invalidStoredDetailsDefaultSafely: true,
        otherStatusHidden: true,
      })
    );
  } else {
    actor.id = await createMember(
      {
        name: actor.name,
        email: actor.email,
        password: randomBytes(24).toString("base64url"),
        role: "admin",
        isDemo: true,
      },
      true
    );
    await assert.rejects(
      () => adminMutation({ ...actor, role: "learner" }, "pilot-details", { slug, offerDetails }),
      failure(403)
    );
    await adminMutation(actor, "pilot-details", { slug, offerDetails });
    assert.deepEqual(
      JSON.parse(
        String(
          (
            await db.execute({
              sql: "SELECT offer_details FROM lab_programme WHERE slug=?",
              args: [slug],
            })
          ).rows[0].offer_details
        )
      ),
      offerDetails
    );
    assert.deepEqual((await getPublicProgramme(slug))?.offerDetails, defaultOfferDetails);
    for (const payload of [
      { slug, offerDetails, unknown: true },
      { slug, offerDetails: { ...offerDetails, unknown: true } },
      { slug, offerDetails: { minCohort: 10 } },
      { slug, offerDetails: { ...offerDetails, minCohort: 501 } },
      { slug, offerDetails: { ...offerDetails, timetableIst: "x".repeat(2001) } },
    ])
      await assert.rejects(() => adminMutation(actor, "pilot-details", payload), failure(422));
    await db.execute({
      sql: "UPDATE lab_programme SET capacity=12 WHERE slug=?",
      args: [slug],
    });
    await assert.rejects(
      () =>
        adminMutation(actor, "pilot-details", {
          slug,
          offerDetails: { ...offerDetails, minCohort: 13 },
        }),
      failure(422)
    );
    const enquiry = {
      kind: "institution",
      name: "Synthetic institution buyer",
      email: "buyer@demo.invalid",
      programmeSlug: slug,
      organisation: "Synthetic institution",
      role: "Programme director",
      learnerCount: 30,
      preferredTimetable: "Saturday mornings IST",
      adultConfirmed: true,
      privacyAccepted: true,
      startedAt: Date.now() - 5000,
    };
    const lead = await saveEnquiry(enquiry, "synthetic-pilot-test");
    await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [lead.id] });
    await adminMutation(actor, "lead", {
      id: lead.id,
      status: "qualified",
      ownerUserId: actor.id,
      nextAction: "Synthetic discovery call",
      nextActionAt: Date.parse("2027-01-02T00:00:00Z"),
    });
    const again = await saveEnquiry(
      { ...enquiry, role: "Dean", learnerCount: 40, preferredTimetable: "Sunday mornings IST" },
      "synthetic-pilot-test"
    );
    assert.equal(again.id, lead.id);
    const record = (await adminRecords()).leads.find((row) => row.id === lead.id)!;
    assert.equal(record.role, "Dean");
    assert.equal(record.learner_count, 40);
    assert.equal(record.preferred_timetable, "Sunday mornings IST");
    assert.equal(record.status, "qualified");
    assert.equal(record.owner_user_id, actor.id);
    assert.equal(record.next_action, "Synthetic discovery call");
    assert.equal(record.next_action_at, Date.parse("2027-01-02T00:00:00Z"));
    for (const payload of [
      { ...enquiry, kind: "learner" },
      { ...enquiry, role: "x".repeat(121) },
      { ...enquiry, learnerCount: 10001 },
      { ...enquiry, learnerCount: 1.5 },
      { ...enquiry, preferredTimetable: "x".repeat(501) },
    ])
      await assert.rejects(() => saveEnquiry(payload, "synthetic-pilot-test"), failure(422));
    const childResult = await new Promise<string>((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [
          "--conditions=react-server",
          "--import",
          "tsx",
          "scripts/test-learning-lab-pilot-details.mts",
          "--approved-child",
        ],
        {
          env: { ...process.env, LAB_PILOT_TEST_ACTOR_ID: actor.id },
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        }
      );
      let output = "";
      let errorOutput = "";
      child.stdout.on("data", (chunk) => (output += String(chunk)));
      child.stderr.on("data", (chunk) => (errorOutput += String(chunk)));
      child.on("error", reject);
      child.on("exit", (code) =>
        code === 0
          ? resolve(output)
          : reject(new Error(`Synthetic approved-state check failed: ${errorOutput}`))
      );
    });
    assert.deepEqual(JSON.parse(childResult), {
      approvedOpenPublished: true,
      invalidStoredDetailsDefaultSafely: true,
      otherStatusHidden: true,
    });
    await mkdir("artifacts/learning-lab", { recursive: true });
    await writeFile(
      "artifacts/learning-lab/pilot-details-results.json",
      JSON.stringify(
        {
          at: new Date().toISOString(),
          status: "PASS",
          isolatedSyntheticDatabase: true,
          nonAdminRejected: true,
          privateDraftSavedWithoutLaunchApproval: true,
          strictFieldValidation: true,
          capacityChecksBothDirections: true,
          institutionDetailsPersisted: true,
          dedupPreservedWorkflow: true,
          learnerInstitutionDetailsRejected: true,
          ...JSON.parse(childResult),
        },
        null,
        2
      )
    );
    console.log("PASS isolated pilot-detail and institutional enquiry checks.");
  }
} finally {
  db.close();
}
