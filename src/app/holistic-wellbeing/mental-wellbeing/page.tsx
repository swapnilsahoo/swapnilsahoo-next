import type { Metadata } from "next";

import { MentalWellbeingExperience } from "@/features/wellbeing/components/MentalWellbeingExperience";

const title = "Mental Wellbeing — An Eight-Week Reflection Guide";
const description =
  "A bounded, educational reflection guide for relationship anxiety and attachment-related distress, with optional exercises, a private check-in and clear guidance on seeking licensed care.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "relationship anxiety reflection guide",
    "attachment-related distress",
    "mental health self-reflection",
    "CBT-informed exercises",
    "when to seek mental health care",
    "mental wellbeing",
  ],
  alternates: { canonical: "/holistic-wellbeing/mental-wellbeing" },
  openGraph: {
    type: "article",
    title,
    description,
    url: "/holistic-wellbeing/mental-wellbeing",
  },
};

export default function MentalWellbeingPage() {
  return <MentalWellbeingExperience />;
}
