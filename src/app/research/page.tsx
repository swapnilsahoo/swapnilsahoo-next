import type { Metadata } from "next";

import { ResearchHub } from "@/features/research/components/ResearchHub";
import { researchAgenda, researchBranches } from "@/features/research/data/researchAgenda";

const title = "Research — Entrepreneurial Resourcefulness Under Constraint";
const description =
  "Explore Swapnil Sahoo’s research agenda on neurodiversity and entrepreneurial agency, bricolage and effectuation, family-business resourcefulness, dynamic capabilities and frugal innovation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "entrepreneurial resourcefulness",
    "resource-constrained environments",
    "neurodiversity and entrepreneurship",
    "bricolage and effectuation",
    "family business resourcefulness",
    "frugal innovation",
    "dynamic capabilities",
  ],
  alternates: { canonical: "/research" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/research",
    images: [
      {
        url: "/images/profile_pic.jpg",
        width: 1200,
        height: 1200,
        alt: "Dr. Swapnil Sahoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/profile_pic.jpg"],
  },
};

export default function ResearchPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: researchAgenda.description,
    url: `${siteUrl}/research`,
    about: {
      "@type": "Thing",
      name: "Entrepreneurial resourcefulness in resource-constrained environments",
    },
    author: {
      "@type": "Person",
      name: "Dr. Swapnil Sahoo",
      url: siteUrl,
    },
    hasPart: researchBranches.map((branch) => ({
      "@type": "WebPage",
      name: branch.title,
      description: branch.summary,
      url: `${siteUrl}/research/${branch.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchHub />
    </>
  );
}
