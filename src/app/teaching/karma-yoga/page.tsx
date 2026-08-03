import type { Metadata } from "next";

import { SubjectCoursePage } from "../_components/SubjectCoursePage";
import { karmaYogaCourse } from "../subjectCourseData";

export const metadata: Metadata = {
  title: "Karma Yoga for All — Experiential Leadership Through Service",
  description:
    "An evidence-led Karma Yoga field journey for PGDM learners: listen, frame, co-design, build, deliver, measure, hand over and reflect.",
  keywords: [
    "Karma Yoga",
    "experiential leadership",
    "community engagement",
    "societal impact",
    "PGDM",
    "Great Lakes Gurgaon",
    "SDG 4",
    "SDG 11",
  ],
  alternates: { canonical: "/teaching/karma-yoga" },
  openGraph: {
    type: "article",
    title: "Karma Yoga for All — Leadership Through Service, Evidence and Reflection",
    description:
      "A complete community field-learning architecture connecting empathy, responsible action, measurable impact and reflective leadership.",
    url: "/teaching/karma-yoga",
  },
};

export default function KarmaYogaPage() {
  return <SubjectCoursePage config={karmaYogaCourse} />;
}
