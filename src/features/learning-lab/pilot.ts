import { z } from "zod";

export const pilotIntakeStartsAt = Date.parse("2026-10-20T00:00:00+05:30");
export const pilotIntakeEndsAt = Date.parse("2026-11-18T23:59:59.999+05:30");
export const pilotNotesEmailEndsAt = Date.parse("2026-11-13T23:59:59.999+05:30");

export function pilotIntakeIsOpen(now = Date.now()) {
  return Number.isFinite(now) && now >= pilotIntakeStartsAt && now <= pilotIntakeEndsAt;
}

export function pilotNotesEmailIsOpen(now = Date.now()) {
  return pilotIntakeIsOpen(now) && now <= pilotNotesEmailEndsAt;
}

export function getPilotIntakeStatus(now = Date.now()) {
  return {
    open: pilotIntakeIsOpen(now),
    started: now >= pilotIntakeStartsAt,
    notesAvailable: pilotNotesEmailIsOpen(now),
  };
}

export const pilotLessons = [
  {
    slug: "read-your-unit-economics",
    title: "Test a discount against capacity",
    programmeSlug: "entrepreneurship-under-constraint",
    task: "Use the fictional lunch business. Change the price from ₹150 to ₹120, keep the other inputs, and explain whether the discount can cover the listed costs within 300 lunches of capacity.",
    output: "Your recommendation, the break-even quantity, and one assumption you would test.",
  },
  {
    slug: "write-an-ai-task-brief",
    title: "Stop an AI assistant inventing a booking",
    programmeSlug: "ai-for-managers",
    task: "Read the fictional room-booking request and policy. Revise the task brief so the assistant cannot invent availability, a price or permission to book beyond closing time.",
    output: "Your missing-fact rule, the permitted output, and the person who approves it.",
  },
  {
    slug: "ask-better-customer-questions",
    title: "Replace a leading customer question",
    programmeSlug: "entrepreneurship-under-constraint",
    task: "Use the fictional clothing-repair example. Build five neutral questions about a recent experience, alternatives, difficulty and actual time or money spent.",
    output: "One question you revised, why the revision is more neutral, and one uncertainty left.",
  },
] as const;

export const pilotFeedbackSchema = z.object({
  lessonSlug: z.enum([
    "read-your-unit-economics",
    "write-an-ai-task-brief",
    "ask-better-customer-questions",
  ]),
  name: z.string().trim().min(2).max(100),
  email: z
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  attempt: z.enum(["completed", "stopped"]),
  answer: z.string().trim().min(10).max(600),
  clarity: z.enum(["clear", "some-confusion", "blocked"]),
  friction: z.string().trim().max(350).default(""),
  nextAction: z.string().trim().max(250).default(""),
  followUpConsent: z.boolean().default(false),
  learningNotesConsent: z.boolean().default(false),
  adultConfirmed: z.literal(true),
  voluntaryConfirmed: z.literal(true),
  privacyAccepted: z.literal(true),
  website: z.string().max(0).default(""),
  startedAt: z.number().int(),
  source: z.string().max(300).default("/learning-lab/pilot"),
});

export type PilotFeedback = z.infer<typeof pilotFeedbackSchema>;
export type PilotLessonSlug = PilotFeedback["lessonSlug"];

export function pilotFeedbackMessage(feedback: PilotFeedback) {
  return (
    [
      "Voluntary free-lesson pilot feedback: self-reported, not an observed or assessed learning outcome.",
      `Lesson: ${feedback.lessonSlug}`,
      `Attempt: ${feedback.attempt}`,
      `Reasoning / stopping point: ${feedback.answer}`,
      `Instruction clarity: ${feedback.clarity}`,
      `Difficulty / suggested change: ${feedback.friction || "Not supplied"}`,
      `Next action: ${feedback.nextAction || "Not supplied"}`,
      `Pilot-only follow-up permission: ${feedback.followUpConsent ? "Yes" : "No"}.`,
      `Four pilot practice notes through 13 November 2026: ${feedback.learningNotesConsent ? "Yes" : "No"}. Reply STOP to withdraw.`,
      "Adult, voluntary participation and privacy acknowledgement confirmed at submission. The optional four-note email choice is separate; no general mailing-list signup, publication permission, enrolment or certificate is created.",
    ].join("\n\n") +
    "\nPILOT_AUTOMATION_META_V1\n" +
    JSON.stringify({
      lesson: feedback.lessonSlug,
      followUpConsent: feedback.followUpConsent,
      learningNotesConsent: feedback.learningNotesConsent,
    })
  );
}
