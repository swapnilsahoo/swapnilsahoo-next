import type { Metadata } from "next";

import { OneYearMbaExperience } from "./OneYearMbaExperience";

export const metadata: Metadata = {
  title: "1-Year MBA — Strategy at Executive Speed",
  description:
    "A 13-session, research-grounded strategy learning journey for experienced MBA professionals—built around cases, decisions, reflection and primary field evidence.",
  alternates: { canonical: "/teaching/1-year-mba" },
  openGraph: {
    type: "website",
    title: "1-Year MBA — Strategy at Executive Speed",
    description:
      "Thirteen discussion-intensive sessions that turn professional experience into strategic range.",
    url: "/teaching/1-year-mba",
    images: ["/images/gallery/classroom-dialogue.png"],
  },
};

export default function OneYearMbaPage() {
  return <OneYearMbaExperience />;
}
