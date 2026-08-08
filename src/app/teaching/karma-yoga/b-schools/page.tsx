import type { Metadata } from "next";

import { SubjectCoursePage } from "../../_components/SubjectCoursePage";
import { karmaYogaCourse } from "../../subjectCourseData";
import { KarmaYogaBranchNav, KarmaYogaBschoolsStory } from "../KarmaYogaPathways";

const title = "Karma Yoga for B-Schools";
const description =
  "A rigorous B-school field-learning architecture built around community listening, co-design, execution, evidence, handover and reflection.";
const image = "/images/teaching/karma-yoga/b-schools/student-connection.webp";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Karma Yoga for B-Schools",
    "experiential leadership",
    "field learning",
    "management education",
    "community co-design",
    "Great Lakes Gurgaon",
  ],
  alternates: { canonical: "/teaching/karma-yoga/b-schools" },
  openGraph: {
    type: "article",
    title,
    description,
    url: "/teaching/karma-yoga/b-schools",
    images: [
      {
        url: image,
        width: 1280,
        height: 960,
        alt: "Management students learning with schoolchildren in the field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function KarmaYogaForBSchoolsPage() {
  return (
    <SubjectCoursePage
      config={karmaYogaCourse}
      contextNavigation={<KarmaYogaBranchNav current="b-schools" />}
      featuredContent={<KarmaYogaBschoolsStory />}
    />
  );
}
