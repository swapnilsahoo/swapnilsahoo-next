import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { getPublicProgrammes } from "@/features/learning-lab/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learning Resources",
  description:
    "Try original Learning Lab demonstration lessons and explore selected public resources on strategy, entrepreneurship and responsible AI.",
  alternates: { canonical: "/learning-lab/resources" },
};

export default async function ResourcesPage() {
  const programmes = await getPublicProgrammes();
  return (
    <>
      <LabHero
        eyebrow="Open learning resources"
        title="Try a small piece of the work."
        description="The demonstration lessons use original fictional scenarios. Make an attempt, compare the feedback and reflect on what you would change. No account is required."
      />
      <LabSection eyebrow="Original demonstrations" title="One usable exercise for each programme.">
        <div className="lab-grid">
          {programmes.map((p) => (
            <article className="lab-card" key={p.slug}>
              <span className="lab-tag">Original fictional scenario</span>
              <h3>{p.demo.title}</h3>
              <p>{p.demo.scenario}</p>
              <Link href={`/learning-lab/programmes/${p.slug}#demo`} className="lab-text-link">
                Open the exercise →
              </Link>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Read further"
        title="Public sources for further exploration."
      >
        <div className="lab-grid">
          <article className="lab-card">
            <h3>Responsible AI</h3>
            <p>
              Start with risk, context and human oversight rather than assuming every task should be
              automated.
            </p>
            <a
              className="lab-text-link"
              href="https://www.nist.gov/itl/ai-risk-management-framework"
              target="_blank"
              rel="noopener noreferrer"
            >
              NIST AI Risk Management Framework ↗
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
          <article className="lab-card">
            <h3>Strategy</h3>
            <p>
              Explore the distinctions between operational improvement, strategic positioning and
              trade-offs.
            </p>
            <a
              className="lab-text-link"
              href="https://hbr.org/1996/11/what-is-strategy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Porter: What Is Strategy? ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
          <article className="lab-card">
            <h3>Entrepreneurial action</h3>
            <p>Explore how entrepreneurs work with available means and manage affordable loss.</p>
            <a
              className="lab-text-link"
              href="https://effectuation.org/the-five-principles-of-effectuation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Effectuation principles ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        </div>
        <p className="lab-small" style={{ marginTop: "1.4rem" }}>
          External materials remain with their publishers and may require access or payment. They do
          not indicate a partnership with the Lab.
        </p>
      </LabSection>
    </>
  );
}
