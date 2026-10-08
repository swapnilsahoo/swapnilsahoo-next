// Public operator details are deliberately separate from the academic profile.
// Contact details are set explicitly by the founder; they imply no institutional endorsement.
const brandOwner = "Swapnil Sahoo";
const brandLabel = "Learning Lab";
const name = `${brandOwner} ${brandLabel}`;
const description = "A founder-led edtech initiative, currently run on a not-for-profit basis.";
export const labPublicConfig = {
  name,
  brandOwner,
  brandLabel,
  description,
  positioning: `${name}: ${description}`,
  operatorName: process.env.LAB_OPERATOR_NAME || "Dr. Swapnil Sahoo",
  businessEmail: process.env.LAB_BUSINESS_EMAIL || "swapnil.s@greatlakes.edu.in",
  businessAddress: process.env.LAB_BUSINESS_ADDRESS || null,
  launchApproved: process.env.LAB_LAUNCH_APPROVED === "true",
  paymentsEnabled: false,
  showFounderPortrait: false,
} as const;

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
