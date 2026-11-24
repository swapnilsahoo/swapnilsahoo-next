import { labLegalName } from "./entity";

// Public operator details are deliberately separate from the academic profile.
// Contact details are set explicitly by the founder; they imply no institutional endorsement.
const brandOwner = "Swapnil Sahoo";
const brandLabel = "Learning Lab";
const name = `${brandOwner} ${brandLabel}`;
const description =
  "Free practical guidance for first-time student entrepreneurs: turn an idea into a small, affordable customer experiment in 14 days.";
const legalName = labLegalName;
export const labPublicConfig = {
  name,
  brandOwner,
  brandLabel,
  description,
  legalName,
  founderName: "Dr. Swapnil Sahoo",
  positioning: `${name}: ${description}`,
  operatorName: process.env.LAB_OPERATOR_NAME || "Dr. Swapnil Sahoo",
  businessEmail: process.env.LAB_BUSINESS_EMAIL || "swapnil.s@greatlakes.edu.in",
  businessAddress: process.env.LAB_BUSINESS_ADDRESS || null,
  launchApproved: process.env.LAB_LAUNCH_APPROVED === "true",
  paymentsEnabled: false,
  showFounderPortrait: false,
} as const;

/** Who runs the Lab, in one sentence. */
export const labEntityLine = `${legalName} runs the Lab. It was founded by Dr. Swapnil Sahoo.`;
/** The Lab charges nothing, for anything. */
export const labFreeLine =
  "Everything the Lab offers is free: courses, the 14-day experiment, the toolkit, founder feedback and future programmes. There are no fees.";
/** Voluntary support, in the founder's words. */
export const labSupportLine =
  "Voluntary financial assistance and support for our infrastructure and services are welcome and appreciated.";
/** What support never buys, and the honest tax position. */
export const labSupportLimits =
  "Support is never required. It does not buy a place, feedback, assessment, a certificate or preferential treatment. No registered-charity status or tax deduction is claimed.";

export type ProgrammeAvailability = {
  status: "register-interest" | "pilot-open" | "closed";
  startsAt: string | null;
  feeInr: number | null;
  capacity: number | null;
};

export const defaultAvailability: ProgrammeAvailability = {
  status: "register-interest",
  startsAt: null,
  feeInr: null,
  capacity: null,
};

// These fields may be saved privately as a draft. Public pages receive them only
// for an explicitly approved, open pilot; feeInr remains the total payable fee.
export type ProgrammeOfferDetails = {
  timetableIst: string | null;
  taxDisplay: string | null;
  minCohort: number | null;
  instructor: string | null;
  accessTerms: string | null;
  supportTerms: string | null;
  cancellationTerms: string | null;
  format: string | null;
  learningOutput: string | null;
};

export const defaultOfferDetails: ProgrammeOfferDetails = {
  timetableIst: null,
  taxDisplay: null,
  minCohort: null,
  instructor: null,
  accessTerms: null,
  supportTerms: null,
  cancellationTerms: null,
  format: null,
  learningOutput: null,
};
