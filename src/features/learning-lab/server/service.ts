import "server-only";
import { randomBytes, randomUUID, createHmac } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import type { Client, Transaction } from "@libsql/client";
import { z } from "zod";
import { labPublicConfig } from "../config";
import { programmes } from "../programmes";
import type { LabProgramme } from "../types";
import { seedProgrammeContent } from "../store";
import { getDatabase, getAuthSecret } from "./database";
import { LabHttpError, type LabActor } from "./errors";

const slugSchema = z.enum([
  "ai-for-managers",
  "strategy-case-thinking",
  "entrepreneurship-under-constraint",
]);
const textField = (min: number, max: number) => z.string().trim().min(min).max(max);
export const enquirySchema = z
  .object({
    kind: z.enum(["learner", "institution"]),
    name: textField(2, 100),
    email: z
      .email()
      .max(254)
      .transform((v) => v.trim().toLowerCase()),
    programmeSlug: slugSchema,
    organisation: z.string().trim().max(160).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
    adultConfirmed: z.literal(true),
    privacyAccepted: z.literal(true),
    marketingConsent: z.boolean().default(false),
    website: z.string().max(0).optional().default(""),
    startedAt: z.number().int(),
    source: z.string().max(300).default("/learning-lab"),
  })
  .refine((v) => v.kind !== "institution" || v.organisation.length >= 2, {
    path: ["organisation"],
    message: "Enter the institution or organisation name.",
  });
export function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success)
    throw new LabHttpError(
      422,
      "Please check the highlighted fields.",
      Object.fromEntries(result.error.issues.map((x) => [x.path.join("."), x.message]))
    );
  return result.data;
}
export async function audit(actor: LabActor | null, action: string, entity: string | null = null) {
  await (
    await getDatabase()
  ).execute({
    sql: "INSERT INTO lab_audit(id,actor_id,action,entity_id,created_at) VALUES(?,?,?,?,?)",
    args: [randomUUID(), actor?.id || null, action, entity, Date.now()],
  });
}
export async function rateLimit(key: string, max = 5, seconds = 600) {
  const hashed = createHmac("sha256", await getAuthSecret())
    .update(key)
    .digest("hex");
  const now = Date.now(),
    expiry = now + seconds * 1000;
  const row = (
    await (
      await getDatabase()
    ).execute({
      sql: `INSERT INTO lab_rate_limit(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<? THEN 1 ELSE count+1 END,expires_at=CASE WHEN expires_at<? THEN ? ELSE expires_at END RETURNING count`,
      args: [hashed, expiry, now, now, expiry],
    })
  ).rows[0];
  if (Number(row.count) > max)
    throw new LabHttpError(429, "Too many attempts. Please wait a few minutes and try again.");
}
export async function saveEnquiry(raw: unknown, ip: string) {
  const v = parse(enquirySchema, raw);
  if (Date.now() - v.startedAt < 1200 || Date.now() - v.startedAt > 60 * 60 * 1000)
    throw new LabHttpError(422, "Please reload the form and take a moment to complete it.");
  await rateLimit(`enquiry-ip:${ip}`, 10);
  await rateLimit(`enquiry-email:${v.email}`, 5);
  const key = createHmac("sha256", await getAuthSecret())
    .update(`${v.kind}:${v.email}:${v.programmeSlug}:${v.organisation.toLowerCase()}`)
    .digest("hex");
  const now = Date.now();
  const source = v.source.startsWith("/learning-lab")
    ? v.source.replace(/[^a-zA-Z0-9/?&=._%-]/g, "").slice(0, 300)
    : "/learning-lab";
  const result = await writeTransaction(async (tx) => {
    const availability = (
      await tx.execute({
        sql: "SELECT status FROM lab_programme WHERE slug=?",
        args: [v.programmeSlug],
      })
    ).rows[0];
    if (labPublicConfig.launchApproved && availability?.status === "closed")
      throw new LabHttpError(
        409,
        "This programme is not accepting new enquiries. Explore another programme or return when registration of interest reopens."
      );
    return tx.execute({
      sql: `INSERT INTO lab_enquiry(id,kind,name,email,programme_slug,organisation,message,marketing_consent,consent_at,source,created_at,updated_at,dedup_key) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(dedup_key) DO UPDATE SET name=excluded.name,message=excluded.message,marketing_consent=excluded.marketing_consent,consent_at=excluded.consent_at,updated_at=excluded.updated_at RETURNING id`,
      args: [
        randomUUID(),
        v.kind,
        v.name,
        v.email,
        v.programmeSlug,
        v.organisation || null,
        v.message || null,
        Number(v.marketingConsent),
        v.marketingConsent ? now : null,
        source,
        now,
        now,
        key,
      ],
    });
  });
  return {
    ok: true,
    id: String(result.rows[0].id),
    message:
      "Your enquiry has been saved. This records your interest; it does not reserve a place or enrol you. No confirmation email has been sent.",
  };
}

export async function createMember(
  input: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "learner";
    isDemo?: boolean;
  },
  bootstrap = false
) {
  const v = parse(
    z.object({
      name: textField(2, 100),
      email: z
        .email()
        .max(254)
        .transform((v) => v.toLowerCase()),
      password: z.string().min(12).max(128),
      role: z.enum(["admin", "learner"]),
      isDemo: z.boolean().default(false),
    }),
    input
  );
  if (v.role === "admin" && !bootstrap)
    throw new LabHttpError(
      403,
      "Administrators are provisioned by the operator's command-line process only."
    );
  const db = await getDatabase(),
    id = randomUUID(),
    now = Date.now();
  if (
    (await db.execute({ sql: "SELECT id FROM lab_user WHERE email=?", args: [v.email] })).rows
      .length
  )
    throw new LabHttpError(409, "An account with that email already exists.");
  await db.batch(
    [
      {
        sql: "INSERT INTO lab_user(id,name,email,email_verified,created_at,updated_at) VALUES(?,?,?,0,?,?)",
        args: [id, v.name, v.email, now, now],
      },
      {
        sql: "INSERT INTO lab_account(id,account_id,provider_id,user_id,password,created_at,updated_at) VALUES(?,?,'credential',?,?,?,?)",
        args: [randomUUID(), id, id, await hashPassword(v.password), now, now],
      },
      {
        sql: "INSERT INTO lab_member(user_id,role,is_demo,must_change_password) VALUES(?,?,?,?)",
        args: [id, v.role, Number(v.isDemo), v.role === "admin" ? 0 : 1],
      },
    ],
    "write"
  );
  return id;
}
async function writeTransaction<T>(work: (tx: Transaction) => Promise<T>) {
  const tx = await (await getDatabase()).transaction("write");
  try {
    const result = await work(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}
async function ownedEnrolment(actor: LabActor, id: string, executor?: Pick<Client, "execute">) {
  const row = (
    await (executor || (await getDatabase())).execute({
      sql: "SELECT * FROM lab_enrolment WHERE id=? AND user_id=?",
      args: [id, actor.id],
    })
  ).rows[0];
  if (!row) throw new LabHttpError(404, "Programme record not found.");
  return row;
}
export async function learnerRecords(actor: LabActor) {
  const db = await getDatabase();
  const enrolments = (
    await db.execute({
      sql: "SELECT e.*,c.title AS cohort_title FROM lab_enrolment e LEFT JOIN lab_cohort c ON c.id=e.cohort_id WHERE e.user_id=? ORDER BY e.created_at DESC",
      args: [actor.id],
    })
  ).rows;
  const result = [];
  for (const e of enrolments) {
    const content = (
      await db.execute({
        sql: "SELECT content FROM lab_programme WHERE slug=?",
        args: [e.programme_slug],
      })
    ).rows[0];
    const programme = content
      ? (JSON.parse(String(content.content)) as LabProgramme)
      : programmes.find((p) => p.slug === e.programme_slug)!;
    const progress = (
      await db.execute({
        sql: "SELECT lesson_index,completed_at FROM lab_progress WHERE enrolment_id=?",
        args: [e.id],
      })
    ).rows;
    const submission =
      (
        await db.execute({
          sql: "SELECT id,body,attachment_name,score,rubric_scores,feedback,approved,submitted_at,reviewed_at FROM lab_submission WHERE enrolment_id=? AND user_id=?",
          args: [e.id, actor.id],
        })
      ).rows[0] || null;
    const certificate =
      (
        await db.execute({
          sql: "SELECT verification_id,issued_at,publish_name,revoked_at FROM lab_certificate WHERE enrolment_id=?",
          args: [e.id],
        })
      ).rows[0] || null;
    result.push({
      enrolment: e,
      programme,
      completedLessons: progress.map((x) => Number(x.lesson_index)),
      submission,
      certificate,
    });
  }
  return result;
}
export async function completeLesson(actor: LabActor, data: unknown) {
  const v = parse(
    z.object({
      enrolmentId: z.uuid(),
      lessonIndex: z.number().int().min(0).max(29),
      completed: z.boolean(),
    }),
    data
  );
  await writeTransaction(async (tx) => {
    const e = await ownedEnrolment(actor, v.enrolmentId, tx);
    if (e.status !== "active") throw new LabHttpError(409, "This programme is not active.");
    const programme = JSON.parse(
      String(
        (
          await tx.execute({
            sql: "SELECT content FROM lab_programme WHERE slug=?",
            args: [e.programme_slug],
          })
        ).rows[0].content
      )
    ) as LabProgramme;
    if (v.lessonIndex >= programme.sessions.length) throw new LabHttpError(422, "Unknown lesson.");
    if (v.completed)
      await tx.execute({
        sql: "INSERT OR IGNORE INTO lab_progress(enrolment_id,lesson_index,completed_at) VALUES(?,?,?)",
        args: [e.id, v.lessonIndex, Date.now()],
      });
    else {
      if (
        (
          await tx.execute({
            sql: "SELECT id FROM lab_certificate WHERE enrolment_id=? AND revoked_at IS NULL",
            args: [e.id],
          })
        ).rows.length
      )
        throw new LabHttpError(
          409,
          "An issued certificate must be reviewed before removing completion."
        );
      await tx.execute({
        sql: "DELETE FROM lab_progress WHERE enrolment_id=? AND lesson_index=?",
        args: [e.id, v.lessonIndex],
      });
    }
  });
  return { ok: true };
}
export async function submitAssignment(actor: LabActor, data: unknown) {
  const v = parse(
    z.object({
      enrolmentId: z.uuid(),
      body: textField(100, 20000),
      attachmentName: z.string().max(120).optional(),
    }),
    data
  );
  if (
    v.attachmentName &&
    (!/^[a-zA-Z0-9 _.-]+\.txt$/i.test(v.attachmentName) || /[\/\\]|\.\./.test(v.attachmentName))
  )
    throw new LabHttpError(
      422,
      "Only a plain-text .txt attachment with a simple filename is accepted."
    );
  await rateLimit(`submission:${actor.id}`, 20);
  const row = await writeTransaction(async (tx) => {
    const e = await ownedEnrolment(actor, v.enrolmentId, tx);
    if (e.status !== "active") throw new LabHttpError(409, "This programme is not active.");
    if (
      (
        await tx.execute({
          sql: "SELECT id FROM lab_certificate WHERE enrolment_id=? AND revoked_at IS NULL",
          args: [e.id],
        })
      ).rows.length
    )
      throw new LabHttpError(
        409,
        "Ask the instructor to review your issued certificate before replacing this submission."
      );
    return (
      await tx.execute({
        sql: `INSERT INTO lab_submission(id,enrolment_id,user_id,body,attachment_name,submitted_at) VALUES(?,?,?,?,?,?) ON CONFLICT(enrolment_id) DO UPDATE SET body=excluded.body,attachment_name=excluded.attachment_name,submitted_at=excluded.submitted_at,revision=lab_submission.revision+1,score=NULL,rubric_scores=NULL,feedback=NULL,approved=0,reviewer_id=NULL,reviewed_at=NULL RETURNING id`,
        args: [randomUUID(), e.id, actor.id, v.body, v.attachmentName || null, Date.now()],
      })
    ).rows[0];
  });
  await audit(actor, "submission.saved", String(row.id));
  return {
    ok: true,
    message:
      "Submission saved. A revision replaces the earlier text and requires a new instructor review.",
  };
}

export async function adminRecords() {
  const db = await getDatabase();
  const [leads, users, cohorts, enrolments, submissions, content, certificates] = await Promise.all(
    [
      db.execute(
        "SELECT id,kind,name,email,programme_slug,organisation,message,marketing_consent,source,status,is_demo,created_at FROM lab_enquiry ORDER BY created_at DESC LIMIT 200"
      ),
      db.execute(
        "SELECT u.id,u.name,u.email,m.role,m.is_demo,m.must_change_password FROM lab_user u JOIN lab_member m ON m.user_id=u.id ORDER BY u.created_at DESC"
      ),
      db.execute("SELECT * FROM lab_cohort ORDER BY created_at DESC"),
      db.execute(
        "SELECT e.*,u.name,u.email,m.is_demo FROM lab_enrolment e JOIN lab_user u ON u.id=e.user_id JOIN lab_member m ON m.user_id=u.id ORDER BY e.created_at DESC"
      ),
      db.execute(
        "SELECT s.*,u.name,u.email,e.programme_slug,m.is_demo FROM lab_submission s JOIN lab_user u ON u.id=s.user_id JOIN lab_member m ON m.user_id=u.id JOIN lab_enrolment e ON e.id=s.enrolment_id ORDER BY s.submitted_at DESC"
      ),
      db.execute("SELECT * FROM lab_programme"),
      db.execute(
        "SELECT c.*,e.programme_slug,u.name,m.is_demo FROM lab_certificate c JOIN lab_enrolment e ON e.id=c.enrolment_id JOIN lab_user u ON u.id=e.user_id JOIN lab_member m ON m.user_id=u.id"
      ),
    ]
  );
  const real = enrolments.rows.filter((x) => !x.is_demo),
    realSubmissions = submissions.rows.filter((x) => !x.is_demo);
  const realCertificates = certificates.rows.filter((x) => !x.is_demo && !x.revoked_at);
  return {
    leads: leads.rows,
    users: users.rows,
    cohorts: cohorts.rows,
    enrolments: enrolments.rows,
    submissions: submissions.rows,
    programmes: content.rows,
    certificates: certificates.rows,
    outcomes: {
      enquiries: leads.rows.filter((x) => !x.is_demo).length,
      enrolments: real.length,
      submissions: realSubmissions.length,
      certificates: realCertificates.length,
      meanReviewedScore: realSubmissions.filter((x) => x.score !== null).length
        ? Math.round(
            realSubmissions
              .filter((x) => x.score !== null)
              .reduce((sum, x) => sum + Number(x.score), 0) /
              realSubmissions.filter((x) => x.score !== null).length
          )
        : null,
      note: "Synthetic demo records are excluded. Counts are operational records, not evidence of causal learning gains or employment outcomes. Enquiry count displays the latest 200 records.",
    },
  };
}
const programmeSchema = z
  .object({
    slug: slugSchema,
    title: textField(3, 120),
    tagline: textField(3, 250),
    audience: z.array(textField(1, 300)).min(1).max(10),
    prerequisites: z.array(textField(1, 300)).min(1).max(10),
    duration: textField(3, 200),
    format: textField(3, 500),
    outcomes: z.array(textField(1, 400)).min(1).max(12),
    sessions: z
      .array(
        z.object({
          title: textField(2, 160),
          description: textField(10, 3000),
          output: textField(2, 1000),
        })
      )
      .min(1)
      .max(30),
    capstone: textField(20, 5000),
    rubric: z
      .array(
        z.object({
          criterion: textField(2, 120),
          weight: z.number().int().min(1).max(100),
          description: textField(2, 1000),
        })
      )
      .min(2)
      .max(10),
    certificate: z.object({
      attendancePercent: z.number().int().min(1).max(100),
      minScore: z.number().int().min(1).max(100),
      requiredLessons: z.number().int().min(1).max(30),
      requirements: z.array(textField(1, 500)).min(1),
    }),
    sources: z.array(
      z.object({ title: textField(2, 200), url: z.url().refine((v) => v.startsWith("https://")) })
    ),
    demo: z.object({
      title: textField(2, 200),
      scenario: textField(20, 5000),
      lesson: z.array(textField(2, 5000)).min(1),
      task: textField(2, 3000),
      prompts: z.array(textField(2, 1000)).min(1),
      modelAnswer: z.array(textField(2, 3000)).min(1),
      decisions: z
        .array(
          z.object({
            question: textField(2, 1000),
            choices: z
              .array(z.object({ title: textField(2, 500), feedback: textField(2, 3000) }))
              .min(2)
              .max(6),
          })
        )
        .min(1)
        .max(10)
        .optional(),
      checkpoint: z.object({
        question: textField(2, 1000),
        options: z.array(textField(1, 500)).min(2).max(6),
        answer: z.number().int().min(0),
        explanation: textField(2, 2000),
      }),
    }),
  })
  .refine((v) => v.rubric.reduce((sum, r) => sum + r.weight, 0) === 100, {
    message: "Rubric weights must total 100.",
  })
  .refine((v) => v.certificate.requiredLessons === v.sessions.length, {
    message: "Certificate requirements must include every configured lesson.",
  })
  .refine((v) => v.demo.checkpoint.answer < v.demo.checkpoint.options.length, {
    message: "The checkpoint answer must match an option.",
  });

export async function adminMutation(actor: LabActor, action: string, data: unknown) {
  const db = await getDatabase();
  if (action === "user") {
    const v = parse(
      z.object({
        name: textField(2, 100),
        email: z.email(),
        password: z.string().min(12).max(128),
        isDemo: z.boolean().default(false),
      }),
      data
    );
    const id = await createMember({ ...v, role: "learner" });
    await audit(actor, "learner.provisioned", id);
    return {
      ok: true,
      id,
      message:
        "Learner account created. No email was sent; provide the temporary password privately after confirming the recipient's identity.",
    };
  }
  if (action === "cohort") {
    const v = parse(
      z.object({
        programmeSlug: slugSchema,
        title: textField(3, 150),
        status: z.enum(["draft", "active", "completed"]),
        isDemo: z.boolean().default(false),
      }),
      data
    );
    await seedProgrammeContent();
    const id = randomUUID();
    await db.execute({
      sql: "INSERT INTO lab_cohort(id,programme_slug,title,status,is_demo,created_at) VALUES(?,?,?,?,?,?)",
      args: [id, v.programmeSlug, v.title, v.status, Number(v.isDemo), Date.now()],
    });
    await audit(actor, "cohort.created", id);
    return { ok: true, id };
  }
  if (action === "enrolment") {
    const v = parse(
      z.object({
        userId: z.uuid(),
        programmeSlug: slugSchema,
        cohortId: z.uuid().nullable().default(null),
      }),
      data
    );
    await seedProgrammeContent();
    const id = await writeTransaction(async (tx) => {
      const member = (
        await tx.execute({
          sql: "SELECT * FROM lab_member WHERE user_id=? AND role='learner'",
          args: [v.userId],
        })
      ).rows[0];
      if (!member) throw new LabHttpError(422, "Choose a provisioned learner.");
      if (v.cohortId) {
        const c = (
          await tx.execute({
            sql: "SELECT * FROM lab_cohort WHERE id=? AND programme_slug=?",
            args: [v.cohortId, v.programmeSlug],
          })
        ).rows[0];
        if (!c || Boolean(c.is_demo) !== Boolean(member.is_demo))
          throw new LabHttpError(
            422,
            "Choose a matching cohort and keep demo and real participants separate."
          );
      }
      const id = randomUUID();
      await tx.execute({
        sql: "INSERT INTO lab_enrolment(id,user_id,programme_slug,cohort_id,created_at) VALUES(?,?,?,?,?)",
        args: [id, v.userId, v.programmeSlug, v.cohortId, Date.now()],
      });
      return id;
    });
    await audit(actor, "enrolment.created", id);
    return { ok: true, id };
  }
  if (action === "attendance") {
    const v = parse(
      z.object({ enrolmentId: z.uuid(), attendancePercent: z.number().int().min(0).max(100) }),
      data
    );
    if (
      !(await db.execute({ sql: "SELECT id FROM lab_enrolment WHERE id=?", args: [v.enrolmentId] }))
        .rows.length
    )
      throw new LabHttpError(404, "Enrolment not found.");
    const tx = await db.transaction("write");
    try {
      await tx.execute({
        sql: "UPDATE lab_enrolment SET attendance_percent=? WHERE id=?",
        args: [v.attendancePercent, v.enrolmentId],
      });
      await tx.execute({
        sql: "UPDATE lab_certificate SET revoked_at=? WHERE enrolment_id=? AND revoked_at IS NULL",
        args: [Date.now(), v.enrolmentId],
      });
      await tx.commit();
    } catch (e) {
      await tx.rollback();
      throw e;
    }
    await audit(actor, "attendance.updated", v.enrolmentId);
    return {
      ok: true,
      message: "Attendance saved. Any existing certificate was revoked for reassessment.",
    };
  }
  if (action === "lead") {
    const v = parse(
      z.object({ id: z.uuid(), status: z.enum(["new", "qualified", "contacted", "closed"]) }),
      data
    );
    await db.execute({
      sql: "UPDATE lab_enquiry SET status=?,updated_at=? WHERE id=?",
      args: [v.status, Date.now(), v.id],
    });
    await audit(actor, "enquiry.status", v.id);
    return { ok: true };
  }
  if (action === "programme") {
    const v = parse(programmeSchema, data);
    // Lock syllabus once anyone is enrolled; keep evidence and certificate criteria stable.
    await writeTransaction(async (tx) => {
      if (
        (
          await tx.execute({
            sql: "SELECT id FROM lab_enrolment WHERE programme_slug=? LIMIT 1",
            args: [v.slug],
          })
        ).rows.length
      )
        throw new LabHttpError(
          409,
          "This programme has enrolments. Curriculum versioning is required before editing its content."
        );
      await tx.execute({
        sql: "INSERT INTO lab_programme(slug,content,updated_at) VALUES(?,?,?) ON CONFLICT(slug) DO UPDATE SET content=excluded.content,updated_at=excluded.updated_at",
        args: [v.slug, JSON.stringify(v), Date.now()],
      });
    });
    await audit(actor, "programme.updated", v.slug);
    return { ok: true };
  }
  if (action === "availability") {
    const v = parse(
      z.object({
        slug: slugSchema,
        status: z.enum(["register-interest", "pilot-open", "closed"]),
        startsAt: z.iso.date().nullable(),
        feeInr: z.number().int().min(0).max(1000000).nullable(),
        capacity: z.number().int().min(1).max(500).nullable(),
      }),
      data
    );
    if (
      !labPublicConfig.launchApproved &&
      (v.status !== "register-interest" ||
        v.startsAt !== null ||
        v.feeInr !== null ||
        v.capacity !== null)
    )
      throw new LabHttpError(
        409,
        "Founder approval must be recorded in deployment configuration before publishing fees, dates, capacity or enrolment availability."
      );
    await seedProgrammeContent();
    await db.execute({
      sql: "UPDATE lab_programme SET status=?,starts_at=?,fee_inr=?,capacity=?,updated_at=? WHERE slug=?",
      args: [v.status, v.startsAt, v.feeInr, v.capacity, Date.now(), v.slug],
    });
    await audit(actor, "programme.availability", v.slug);
    return { ok: true };
  }
  if (action === "review") {
    const v = parse(
      z.object({
        submissionId: z.uuid(),
        expectedRevision: z.number().int().min(1),
        rubricScores: z.array(z.number().min(0).max(4)),
        feedback: textField(20, 5000),
        approved: z.boolean(),
      }),
      data
    );
    const score = await writeTransaction(async (tx) => {
      const s = (
        await tx.execute({
          sql: "SELECT s.*,e.programme_slug FROM lab_submission s JOIN lab_enrolment e ON e.id=s.enrolment_id WHERE s.id=?",
          args: [v.submissionId],
        })
      ).rows[0];
      if (!s) throw new LabHttpError(404, "Submission not found.");
      if (Number(s.revision) !== v.expectedRevision)
        throw new LabHttpError(
          409,
          "This submission changed after you opened it. Refresh and review the latest revision before grading."
        );
      const p = JSON.parse(
        String(
          (
            await tx.execute({
              sql: "SELECT content FROM lab_programme WHERE slug=?",
              args: [s.programme_slug],
            })
          ).rows[0].content
        )
      ) as LabProgramme;
      if (v.rubricScores.length !== p.rubric.length)
        throw new LabHttpError(422, "Score every configured rubric criterion from 0 to 4.");
      const score = Math.round(
        p.rubric.reduce((sum, r, i) => sum + (r.weight * v.rubricScores[i]) / 4, 0)
      );
      if (v.approved && score < p.certificate.minScore)
        throw new LabHttpError(422, "A capstone below the programme threshold cannot be approved.");
      await tx.execute({
        sql: "UPDATE lab_submission SET score=?,rubric_scores=?,feedback=?,approved=?,reviewer_id=?,reviewed_at=? WHERE id=?",
        args: [
          score,
          JSON.stringify(v.rubricScores),
          v.feedback,
          Number(v.approved),
          actor.id,
          Date.now(),
          s.id,
        ],
      });
      await tx.execute({
        sql: "UPDATE lab_certificate SET revoked_at=? WHERE enrolment_id=? AND revoked_at IS NULL",
        args: [Date.now(), s.enrolment_id],
      });
      return score;
    });
    await audit(actor, "submission.reviewed", v.submissionId);
    return {
      ok: true,
      score,
      message:
        "Review saved. An earlier certificate, if present, was revoked; reassess eligibility before issuing again.",
    };
  }
  if (action === "certificate") return issueCertificate(actor, data);
  if (action === "revoke") {
    const v = parse(z.object({ verificationId: textField(32, 100) }), data);
    await db.execute({
      sql: "UPDATE lab_certificate SET revoked_at=? WHERE verification_id=?",
      args: [Date.now(), v.verificationId],
    });
    await audit(actor, "certificate.revoked", v.verificationId);
    return { ok: true };
  }
  throw new LabHttpError(404, "Unknown administration action.");
}

export async function issueCertificate(actor: LabActor, data: unknown) {
  const v = parse(z.object({ enrolmentId: z.uuid() }), data);
  // Eligibility and issuance share a write transaction so concurrent reviews cannot bypass it.
  const result = await writeTransaction(async (tx) => {
    const e = (
      await tx.execute({
        sql: "SELECT e.*,u.name FROM lab_enrolment e JOIN lab_user u ON u.id=e.user_id WHERE e.id=?",
        args: [v.enrolmentId],
      })
    ).rows[0];
    if (!e) throw new LabHttpError(404, "Enrolment not found.");
    const p = JSON.parse(
      String(
        (
          await tx.execute({
            sql: "SELECT content FROM lab_programme WHERE slug=?",
            args: [e.programme_slug],
          })
        ).rows[0].content
      )
    ) as LabProgramme;
    const completed = (
      await tx.execute({
        sql: "SELECT lesson_index FROM lab_progress WHERE enrolment_id=?",
        args: [e.id],
      })
    ).rows.map((x) => Number(x.lesson_index));
    const s = (
      await tx.execute({ sql: "SELECT * FROM lab_submission WHERE enrolment_id=?", args: [e.id] })
    ).rows[0];
    const lessonsMet = p.sessions.every((_, i) => completed.includes(i));
    if (
      !lessonsMet ||
      Number(e.attendance_percent) < p.certificate.attendancePercent ||
      !s?.approved ||
      Number(s.score) < p.certificate.minScore
    )
      throw new LabHttpError(
        409,
        "Certificate requirements are not yet met: complete every lesson, meet attendance, and obtain instructor approval above the capstone threshold."
      );
    const prior = (
      await tx.execute({ sql: "SELECT * FROM lab_certificate WHERE enrolment_id=?", args: [e.id] })
    ).rows[0];
    if (prior && !prior.revoked_at)
      return { ok: true, verificationId: String(prior.verification_id), alreadyIssued: true };
    const token = randomBytes(32).toString("base64url"),
      now = Date.now();
    if (prior)
      await tx.execute({
        sql: "UPDATE lab_certificate SET verification_id=?,issued_at=?,issuer_id=?,revoked_at=NULL,publish_name=0 WHERE id=?",
        args: [token, now, actor.id, prior.id],
      });
    else
      await tx.execute({
        sql: "INSERT INTO lab_certificate(id,enrolment_id,verification_id,display_name,issued_at,issuer_id) VALUES(?,?,?,?,?,?)",
        args: [randomUUID(), e.id, token, e.name, now, actor.id],
      });
    return { ok: true, verificationId: token };
  });
  if (!result.alreadyIssued) await audit(actor, "certificate.issued", v.enrolmentId);
  return result;
}
export async function setCertificatePrivacy(actor: LabActor, data: unknown) {
  const v = parse(z.object({ enrolmentId: z.uuid(), publishName: z.boolean() }), data);
  await ownedEnrolment(actor, v.enrolmentId);
  await (
    await getDatabase()
  ).execute({
    sql: "UPDATE lab_certificate SET publish_name=? WHERE enrolment_id=?",
    args: [Number(v.publishName), v.enrolmentId],
  });
  await audit(actor, "certificate.public-name-consent", v.enrolmentId);
  return { ok: true };
}
export async function verifyCertificate(token: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const row = (
    await (
      await getDatabase()
    ).execute({
      sql: "SELECT c.issued_at,c.display_name,c.publish_name,c.revoked_at,e.programme_slug,p.content,m.is_demo FROM lab_certificate c JOIN lab_enrolment e ON e.id=c.enrolment_id JOIN lab_programme p ON p.slug=e.programme_slug JOIN lab_member m ON m.user_id=e.user_id WHERE c.verification_id=?",
      args: [token],
    })
  ).rows[0];
  if (!row) return null;
  return {
    status: row.revoked_at ? "revoked" : "valid",
    programme: (JSON.parse(String(row.content)) as LabProgramme).title,
    issuedAt: Number(row.issued_at),
    displayName: row.publish_name ? String(row.display_name) : null,
    isDemo: Boolean(row.is_demo),
    type: "Certificate of Completion",
  };
}
export function csv(rows: Record<string, unknown>[], columns: string[]) {
  const cell = (value: unknown) => {
    let text = value === null || value === undefined ? "" : String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return [columns.join(","), ...rows.map((r) => columns.map((c) => cell(r[c])).join(","))].join(
    "\r\n"
  );
}
