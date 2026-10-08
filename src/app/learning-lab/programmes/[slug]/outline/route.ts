import { labPublicConfig } from "@/features/learning-lab/config";
import { getPublicProgramme } from "@/features/learning-lab/store";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = await getPublicProgramme(slug);
  if (!programme) return new Response("Programme not found.", { status: 404 });
  const bulletList = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
  const offer = programme.offerDetails;
  const approvedOffer =
    programme.availability.status === "pilot-open"
      ? [
          "APPROVED PILOT DETAILS — ENQUIRE ABOUT JOINING",
          `Start: ${programme.availability.startsAt || "Not published"}`,
          `IST timetable: ${offer.timetableIst || "Not published"}`,
          `Total payable fee: ${programme.availability.feeInr === null ? "Not published" : `INR ${programme.availability.feeInr}`}`,
          `Tax presentation: ${offer.taxDisplay || "Not published"}`,
          `Minimum learners: ${offer.minCohort ?? "Not published"}`,
          `Maximum learners: ${programme.availability.capacity ?? "Not published"}`,
          `Instructor: ${offer.instructor || "Not published"}`,
          `Delivery format: ${offer.format || "Not published"}`,
          `Finished work: ${offer.learningOutput || "Not published"}`,
          `Access and attendance alternatives: ${offer.accessTerms || "Not published"}`,
          `Support and feedback: ${offer.supportTerms || "Not published"}`,
          `Cancellation and rescheduling: ${offer.cancellationTerms || "Not published"}`,
          "An enquiry does not reserve a place. Payments on this site remain disabled.",
          "",
        ]
      : [];
  const outline = [
    labPublicConfig.name,
    programme.title,
    programme.tagline,
    "",
    "PROPOSED PROGRAMME — ADULTS 18+",
    "This outline describes the learning design, not a paid offer or reserved place.",
    `Operator: ${labPublicConfig.operatorName}`,
    `Contact: ${labPublicConfig.businessEmail || "See the contact page for availability."}`,
    `Duration: ${programme.duration}`,
    `Format: ${programme.format}`,
    "Fees, dates and capacity require an approved offer. Payments are currently disabled.",
    "",
    ...approvedOffer,
    "WHO IT IS FOR",
    bulletList(programme.audience),
    "",
    "BEFORE YOU START",
    bulletList(programme.prerequisites),
    "",
    "WHAT YOU WILL PRACTISE PRODUCING",
    bulletList(programme.outcomes),
    "",
    "SESSION OUTLINE",
    ...programme.sessions.flatMap((session) => [
      session.title,
      session.description,
      `Learner output: ${session.output}`,
      "",
    ]),
    "CAPSTONE",
    programme.capstone,
    "",
    "ASSESSMENT RUBRIC",
    ...programme.rubric.map(
      (item) => `${item.criterion} (${item.weight}/100): ${item.description}`
    ),
    "",
    "COMPLETION AND CERTIFICATE BOUNDARIES",
    bulletList(programme.certificate.requirements),
    "",
    "SELECTED READINGS",
    ...programme.sources.map((source) => `${source.title}\n${source.url}`),
    "",
    "TRY THE ORIGINAL PUBLIC DEMONSTRATION",
    `https://www.swapnilsahoo.com/learning-lab/programmes/${programme.slug}#demo`,
    "Demonstration practice does not count towards assessed programme completion.",
    "",
    "Review the current programme page for updates and the Lab's draft policies before participating.",
    "https://www.swapnilsahoo.com/learning-lab/policies",
    "The Lab is independently operated; this outline does not imply institutional endorsement.",
    "",
  ].join("\n");
  return new Response(outline, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${programme.slug}-programme-outline.txt"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
