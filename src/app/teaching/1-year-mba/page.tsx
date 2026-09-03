import type { Metadata } from "next";

import { OneYearMbaExperience } from "./OneYearMbaExperience";

export const metadata: Metadata = {
  title: "STRAMGT 221: Strategy and Disruption | 1-Year MBA — Strategy at Executive Speed",
  description:
    "A 13-session, research-grounded strategy course for experienced MBA professionals, built around cases, decisions, reflection and primary field evidence.",
  alternates: { canonical: "/teaching/1-year-mba" },
  openGraph: {
    type: "website",
    title: "STRAMGT 221: Strategy and Disruption | 1-Year MBA — Strategy at Executive Speed",
    description:
      "Thirteen discussion-intensive sessions connecting professional experience to competitive and corporate strategy.",
    url: "/teaching/1-year-mba",
    images: ["/images/ai-hackathon/hackathon-demo.jpg"],
  },
};

export default function OneYearMbaPage() {
  return <OneYearMbaExperience />;
}
