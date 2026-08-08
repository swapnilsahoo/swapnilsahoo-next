import type { Metadata } from "next";

import { KarmaYogaHub } from "./KarmaYogaHub";

const title = "Karma Yoga — Two Pathways";
const description =
  "Explore two Karma Yoga pathways: field learning for B-schools and the long-horizon Mehalchauri community partnership in Uttarakhand.";
const image = "/images/teaching/karma-yoga/mehalchauri/community-circle.webp";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Karma Yoga",
    "Karma Yoga for B-Schools",
    "Karma Yoga for India",
    "Mehalchauri",
    "experiential leadership",
    "community engagement",
  ],
  alternates: { canonical: "/teaching/karma-yoga" },
  openGraph: {
    type: "article",
    title,
    description,
    url: "/teaching/karma-yoga",
    images: [{ url: image, width: 1600, height: 900, alt: "A community circle in Mehalchauri" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function KarmaYogaPage() {
  return <KarmaYogaHub />;
}
