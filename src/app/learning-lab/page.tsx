import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { VentureQuestion } from "@/features/learning-lab/components/ToolkitParts";
import { labPublicConfig, labSupportLine } from "@/features/learning-lab/config";
import { aiVivaBot, labProductsPath } from "@/features/learning-lab/products";
import {
  toolkitFreeStatement,
  toolkitHref,
  toolkitPath,
  toolkitTools,
} from "@/features/learning-lab/founder-toolkit";
import {
  ventureExperimentPath,
  venturePositioning,
  ventureStages,
} from "@/features/learning-lab/venture-experiment";

export const metadata: Metadata = {
  title: { absolute: labPublicConfig.name },
  description: venturePositioning,
  alternates: { canonical: "/learning-lab" },
  openGraph: {
    title: "Test your business idea in 14 days | Swapnil Sahoo Learning Lab",
    description: venturePositioning,
    url: "/learning-lab",
    images: [
      {
        url: "/learning-lab/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Swapnil Sahoo Learning Lab: test your business idea with real customers in 14 days. Free.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test your business idea in 14 days",
    description: venturePositioning,
    images: [
      {
        url: "/learning-lab/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Swapnil Sahoo Learning Lab: test your business idea with real customers in 14 days. Free.",
      },
    ],
  },
};

export default function LearningLabPage() {
  return (
    <>
      <LabHero
        eyebrow="Free · For college students aged 18+"
        title="Test your business idea with real customers in 14 days."
        description={venturePositioning}
      >
        <Link href={`${ventureExperimentPath}#start`} className="lab-button">
          Start your experiment →
        </Link>
        <Link href={toolkitPath} className="lab-button lab-button-secondary">
          Open the free toolkit
        </Link>
      </LabHero>
      <VentureQuestion />
      <LabSection eyebrow="Why it exists" title="An idea, little money and no clear next step?">
        <div className="lab-split">
          <div className="lab-prose">
            <p className="lab-lead">
              Skip the app, the company and the course fee. Run one small, honest test with real
              customers, then make a decision you can defend. Plan on about 30 minutes a day, plus a
              few customer conversations.
            </p>
            <div className="lab-stat-row">
              <div>
                <span>Cost</span>
                <strong>Free</strong>
              </div>
              <div>
                <span>Length</span>
                <strong>14 days</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>~30 min a day</strong>
              </div>
            </div>
          </div>
          <aside className="lab-callout">
            <h3>You finish with</h3>
            <ul>
              <li>A time and cost limit you can afford (₹0 counts)</li>
              <li>A log of what customers actually did</li>
              <li>One completed customer test</li>
              <li>A clear decision: continue, change or stop</li>
            </ul>
            <p className="lab-small">Stopping is a valid result.</p>
          </aside>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Free founder toolkit"
        title="Copy-ready tools, so you never start from a blank page."
      >
        <div className="lab-grid">
          {toolkitTools.slice(0, 6).map((tool) => (
            <article className="lab-card" key={tool.slug}>
              <span className="lab-tag">
                {tool.when} · {tool.minutes}
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.short}</p>
              <Link href={toolkitHref(tool.slug)} className="lab-text-link">
                Open →
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-small" style={{ marginTop: "1.2rem" }}>
          {toolkitFreeStatement}
        </p>
        <div className="lab-actions">
          <Link href={toolkitPath} className="lab-button">
            See the whole toolkit →
          </Link>
          <Link href={toolkitHref("learn-from-yc")} className="lab-text-link">
            Free Y Combinator reading list →
          </Link>
        </div>
      </LabSection>
      <LabSection eyebrow="How it works" title="Four stages, one experiment.">
        <div className="lab-grid lab-grid-two">
          {ventureStages.map((stage) => (
            <article className="lab-card" key={stage.id}>
              <p className="lab-eyebrow">{stage.days}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p className="lab-small">
                <strong>You leave with:</strong> {stage.output}.
              </p>
            </article>
          ))}
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="What you get"
        title="Guidance, feedback and honest evidence."
      >
        <div className="lab-grid">
          <article>
            <h3>A plan that fits you</h3>
            <p>
              Enter your time, skills, customer access and budget to get your next task. It never
              spends money or contacts anyone for you.
            </p>
          </article>
          <article>
            <h3>Feedback from the founder</h3>
            <p>
              Up to 20 learners at a time get written feedback from Dr. Swapnil Sahoo at each stage.
              Turnaround is not guaranteed.
            </p>
          </article>
          <article>
            <h3>Evidence over opinions</h3>
            <p>
              Count what customers do, not what they say. Refusals, no-replies and costs count too.
            </p>
          </article>
        </div>
        <p className="lab-small">
          Everything here is free for everyone. No funding, business success or certificate is
          promised.
        </p>
        <div className="lab-actions" style={{ alignItems: "center" }}>
          <Link href={`${ventureExperimentPath}#start`} className="lab-button">
            Start your experiment →
          </Link>
          <Link href={`${ventureExperimentPath}#evidence`} className="lab-text-link">
            What counts as a completed test →
          </Link>
        </div>
      </LabSection>
      <LabSection eyebrow="Keep learning" title="More free learning.">
        <div className="lab-grid">
          <article className="lab-card">
            <h3>Six short courses</h3>
            <p>Customer questions, unit economics, strategy and AI task briefs.</p>
            <Link href="/learning-lab/free-courses" className="lab-text-link">
              Explore the courses →
            </Link>
          </article>
          <article className="lab-card">
            <h3>Four worked examples</h3>
            <p>Weekly practice notes, all open now.</p>
            <Link href="/learning-lab/weekly-notes" className="lab-text-link">
              Read and practise →
            </Link>
          </article>
          <article className="lab-card">
            <h3>The full catalogue</h3>
            <p>Free management, career, research and entrepreneurship resources.</p>
            <Link href="/learning-lab/catalogue" className="lab-text-link">
              Browse the catalogue →
            </Link>
          </article>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="Products"
        title="A working prototype you can try today."
      >
        <div className="lab-split">
          <div>
            <p className="lab-lead">
              <strong>{aiVivaBot.name}</strong>: {aiVivaBot.tagline}
            </p>
            <p>{aiVivaBot.solution}</p>
          </div>
          <div className="lab-actions" style={{ marginTop: 0 }}>
            <a
              href={aiVivaBot.demoUrl}
              className="lab-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try the live demo <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens the demo in a new tab)</span>
            </a>
            <Link href={labProductsPath} className="lab-text-link">
              See how it works →
            </Link>
          </div>
        </div>
      </LabSection>
      <LabSection eyebrow="About the Lab" title="Independent, and free for every learner.">
        <div className="lab-split">
          <div>
            <p>
              Run by {labPublicConfig.legalName}, founded by Dr. Swapnil Sahoo. The long-term goal
              is free learning from school to doctoral study. Today&rsquo;s focus is helping
              first-time student entrepreneurs test one idea.
            </p>
            <p>Everything is free. {labSupportLine}</p>
          </div>
          <div className="lab-actions" style={{ marginTop: 0 }}>
            <Link href="/learning-lab/founder" className="lab-text-link">
              Meet the founder →
            </Link>
            <Link href="/learning-lab/purpose" className="lab-text-link">
              Our long-term purpose →
            </Link>
            <Link href="/learning-lab/support" className="lab-text-link">
              Support free learning →
            </Link>
            <Link href="/learning-lab/for-colleges" className="lab-text-link">
              For colleges →
            </Link>
            <Link href="/learning-lab/programmes" className="lab-text-link">
              Other proposed programmes →
            </Link>
          </div>
        </div>
      </LabSection>
    </>
  );
}
