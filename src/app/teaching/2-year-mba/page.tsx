import type { Metadata } from "next";

import { TwoYearMbaExperience } from "./TwoYearMbaExperience";

export const metadata: Metadata = {
  title: "2-Year MBA — Strategy, End to End",
  description:
    "A complete 20-session Strategic Management learning system for PGDM professionals—from competitive foundations to corporate scope, execution and global change.",
  alternates: { canonical: "/teaching/2-year-mba" },
  openGraph: {
    type: "website",
    title: "2-Year MBA — Strategy, End to End",
    description:
      "Twenty cumulative sessions, original field evidence and a complete path from diagnosis to coordinated action.",
    url: "/teaching/2-year-mba",
    images: ["/images/teaching/pgdm-strategy-classroom.png"],
  },
};

export default function TwoYearMbaPage() {
  return <TwoYearMbaExperience />;
}
