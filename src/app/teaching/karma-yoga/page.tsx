import type { Metadata } from "next";

import { SubjectCoursePage } from "../_components/SubjectCoursePage";
import { karmaYogaCourse } from "../subjectCourseData";
import { KarmaYogaPathways } from "./KarmaYogaPathways";

export const metadata: Metadata = {
  title: "Karma Yoga for B-Schools and India — Learning Through Service",
  description:
    "Two Karma Yoga pathways: a rigorous B-school field-learning architecture and the long-horizon Mehalchauri community partnership in Uttarakhand.",
  keywords: [
    "Karma Yoga",
    "Karma Yoga for B-Schools",
    "Karma Yoga for India",
    "Mehalchauri",
    "Uttarakhand",
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
    title: "Karma Yoga for B-Schools and India",
    description:
      "A B-school field-learning pathway and the story of a sustained community relationship in Mehalchauri, Uttarakhand.",
    url: "/teaching/karma-yoga",
  },
};

export default function KarmaYogaPage() {
  return (
    <SubjectCoursePage
      config={karmaYogaCourse}
      leadingNavigationItems={[
        { label: "B-Schools", href: "#karma-yoga-b-schools" },
        { label: "India", href: "#karma-yoga-india" },
      ]}
      featuredContent={<KarmaYogaPathways />}
    />
  );
}
