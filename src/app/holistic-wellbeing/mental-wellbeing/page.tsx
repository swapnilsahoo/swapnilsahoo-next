import type { Metadata } from "next";

import { MentalWellbeingExperience } from "@/features/wellbeing/components/MentalWellbeingExperience";

const title = "Mental Wellbeing — An Eight-Week Anxious Attachment Recovery Program";
const description =
  "A practical, evidence-based eight-week program for anxious attachment and relationship anxiety, integrating CBT, DBT, ACT and polyvagal theory, with an interactive self-assessment and daily tracker.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "anxious attachment recovery",
    "trauma bonding recovery",
    "CBT self-help",
    "DBT skills",
    "polyvagal theory practice",
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
