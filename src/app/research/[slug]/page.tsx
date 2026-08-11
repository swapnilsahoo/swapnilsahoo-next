import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchBranchPage } from "@/features/research/components/ResearchBranchPage";
import {
  getResearchBranch,
  researchBranches,
} from "@/features/research/data/researchAgenda";

type ResearchBranchRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchBranches.map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: ResearchBranchRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getResearchBranch(slug);

  if (!branch) notFound();

  const title = `${branch.title} — Research`;
  const canonical = `/research/${branch.slug}`;

  return {
    title,
    description: branch.summary,
    keywords: branch.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description: branch.summary,
      url: canonical,
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
      description: branch.summary,
      images: ["/images/profile_pic.jpg"],
    },
  };
}

export default async function ResearchBranchRoute({ params }: ResearchBranchRouteProps) {
  const { slug } = await params;
  const branch = getResearchBranch(slug);

  if (!branch) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: branch.title,
    description: branch.summary,
    url: `${siteUrl}/research/${branch.slug}`,
    isPartOf: {
      "@type": "CollectionPage",
      name: "Research — Entrepreneurial Resourcefulness Under Constraint",
      url: `${siteUrl}/research`,
    },
    author: {
      "@type": "Person",
      name: "Dr. Swapnil Sahoo",
      url: siteUrl,
    },
    about: branch.concepts.map((concept) => ({ "@type": "Thing", name: concept })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ResearchBranchPage branch={branch} />
    </>
  );
}
