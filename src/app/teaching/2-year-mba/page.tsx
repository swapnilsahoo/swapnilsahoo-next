import type { Metadata } from "next";

import { TwoYearMbaExperience } from "./TwoYearMbaExperience";

export const metadata: Metadata = {
  title: "2-Year MBA — Strategy, End to End",
  description:
    "A 20-session Strategic Management course for PGDM professionals, moving from competitive foundations to corporate scope, execution and global change.",
  alternates: { canonical: "/teaching/2-year-mba" },
  openGraph: {
    type: "website",
    title: "2-Year MBA — Strategy, End to End",
    description:
      "Twenty linked sessions, original field evidence and a path from diagnosis to coordinated action.",
    url: "/teaching/2-year-mba",
    images: ["/images/ai-hackathon/hackathon-room.jpg"],
  },
};

export default function TwoYearMbaPage() {
  return <TwoYearMbaExperience />;
}
