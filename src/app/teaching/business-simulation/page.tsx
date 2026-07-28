import type { Metadata } from "next";

import { SubjectCoursePage } from "../_components/SubjectCoursePage";
import { businessSimulationCourse } from "../subjectCourseData";

export const metadata: Metadata = {
  title: "Business Simulation — Global Strategy Under Pressure",
  description:
    "A complete 20-session business simulation course integrating strategy, markets, R&D, operations, finance, people, tax and ESG across global competitive rounds.",
  keywords: [
    "business simulation",
    "Cesim Global Challenge",
    "strategy simulation",
    "experiential learning",
    "PGDM",
    "cross-functional decision making",
    "ESG strategy",
  ],
  alternates: { canonical: "/teaching/business-simulation" },
  openGraph: {
    type: "article",
    title: "Business Simulation — Strategy Under Pressure, With Consequences",
    description:
      "Twenty decision-rich sessions, six competitive rounds and an evidence-led path from strategic thesis to individual viva.",
    url: "/teaching/business-simulation",
  },
};

export default function BusinessSimulationPage() {
  return <SubjectCoursePage config={businessSimulationCourse} />;
}
