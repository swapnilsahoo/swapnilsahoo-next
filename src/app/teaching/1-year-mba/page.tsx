import type { Metadata } from "next";

import { MbaProgrammePage } from "../MbaProgrammePage";
import { oneYearMba } from "../mbaData";

export const metadata: Metadata = {
  title: "1-Year MBA — Executive Strategy Learning System",
  description:
    "An intensive, research-grounded strategy and entrepreneurship learning journey for experienced MBA professionals.",
  alternates: { canonical: "/teaching/1-year-mba" },
  openGraph: {
    type: "website",
    title: "1-Year MBA — Experience Becomes Strategic Range",
    description:
      "Cases, simulations, live challenges and responsible AI for enterprise-level judgment.",
    url: "/teaching/1-year-mba",
  },
};

export default function OneYearMbaPage() {
  return <MbaProgrammePage config={oneYearMba} />;
}
