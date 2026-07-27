import type { Metadata } from "next";

import { MbaProgrammePage } from "../MbaProgrammePage";
import { twoYearMba } from "../mbaData";

export const metadata: Metadata = {
  title: "2-Year MBA — Strategy & Entrepreneurship Pathway",
  description:
    "A scaffolded, research-grounded MBA pathway from strategic foundations to independent judgment.",
  alternates: { canonical: "/teaching/2-year-mba" },
  openGraph: {
    type: "website",
    title: "2-Year MBA — Build the Foundations. Earn the Judgment.",
    description:
      "A cumulative learning journey through cases, experiments, simulations and live decisions.",
    url: "/teaching/2-year-mba",
  },
};

export default function TwoYearMbaPage() {
  return <MbaProgrammePage config={twoYearMba} />;
}
