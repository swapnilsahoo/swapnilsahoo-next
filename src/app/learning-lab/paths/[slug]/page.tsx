import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabHero } from "@/features/learning-lab/components/LabShell";
import { LearningPathView } from "@/features/learning-lab/components/LearningPathView";
import { getCatalogueResource, getLearningPath, learningPaths, type CatalogueResource } from "@/features/learning-lab/catalogue";
import "@/features/learning-lab/components/catalogue.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return learningPaths.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) return { title: "Learning path not found" };
  return { title: path.title, description: path.summary, alternates: { canonical: `/learning-lab/paths/${slug}` } };
}
export default async function LearningPathPage({ params }: Props) {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) notFound();
  const resolve = (ids: string[]) => ids.map(getCatalogueResource).filter((item): item is CatalogueResource => Boolean(item));
  const resources = resolve(path.resourceIds);
  return (
    <>
      <LabHero eyebrow="An open learning path" title={path.title} description={path.summary}>
        <a href="#path-steps" className="lab-button">Follow the steps ↓</a>
        <Link href="/learning-lab/catalogue" className="lab-button lab-button-secondary">All learning goals</Link>
      </LabHero>
      <div className="lab-container lab-path-hero-meta">
        <p className="lab-small"><strong>For:</strong> {path.audience}<br /><strong>Suggested background:</strong> {path.prerequisites}<br />English · {resources.length} ordered steps · free / open · self-paced · no account required</p>
      </div>
      <LearningPathView key={path.slug} path={path} resources={resources} optional={resolve(path.optionalIds)} />
    </>
  );
}
