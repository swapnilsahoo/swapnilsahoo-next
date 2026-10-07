import type { Metadata } from "next";

import { OneYearMbaExperience } from "./OneYearMbaExperience";

export const metadata: Metadata = {
  title: "Strategic Management | 1-Year MBA · PGPM 2026–27",
  description:
    "The PGPM 2026–27 Strategic Management course: 13 sessions covering analysis, formulation and implementation, with cases, readings and interactive lessons.",
  alternates: { canonical: "/teaching/1-year-mba" },
  openGraph: {
    type: "website",
    title: "Strategic Management | 1-Year MBA · PGPM 2026–27",
    description:
      "Thirteen discussion-intensive sessions connecting professional experience to strategy analysis, formulation and implementation.",
    url: "/teaching/1-year-mba",
    images: ["/images/ai-hackathon/hackathon-demo.jpg"],
  },
};

export default function OneYearMbaPage() {
  return <OneYearMbaExperience />;
}
