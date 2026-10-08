// Public operator details are deliberately separate from the academic profile.
// No institutional contact or endorsement is inherited by the Lab.
const brandOwner = "Swapnil Sahoo";
const brandLabel = "Learning Lab";
const name = `${brandOwner} ${brandLabel}`;
const description = "A founder-led professional education initiative hosted on swapnilsahoo.com.";
export const labPublicConfig = {
  name,
  brandOwner,
  brandLabel,
  description,
  positioning: `${name}: ${description}`,
  operatorName: process.env.LAB_OPERATOR_NAME || "Dr. Swapnil Sahoo",
  businessEmail: process.env.LAB_BUSINESS_EMAIL || null,
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
