import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labFreeLine } from "@/features/learning-lab/config";
import {
  differentiation,
  entrepreneurshipJourney,
  entrepreneurshipJourneyPath,
  journeyAvailability,
  journeyModules,
  journeySources,
  knowingDoingGap,
  problemStatement,
  valueProposition,
} from "@/features/learning-lab/entrepreneurship-journey";
import { toolkitPath } from "@/features/learning-lab/founder-toolkit";
import { ventureExperimentPath } from "@/features/learning-lab/venture-experiment";

const { description, shareTitle } = entrepreneurshipJourney;
const shareImage = {
  url: `${entrepreneurshipJourneyPath}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: entrepreneurshipJourney.shareAlt,
};

export const metadata: Metadata = {
  title: entrepreneurshipJourney.title,
  description,
  alternates: { canonical: entrepreneurshipJourneyPath },
  openGraph: {
    type: "website",
    siteName: "Swapnil Sahoo Learning Lab",
    title: shareTitle,
    description,
    url: entrepreneurshipJourneyPath,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: [shareImage],
  },
};

const availabilityOrder = ["open", "partial", "planned"] as const;

export default function EntrepreneurshipJourneyPage() {
  return (
    <>
      <LabHero
        eyebrow="Free learning journey · For aspiring entrepreneurs aged 18+"
        title="From startup idea to venture growth."
        description={`${entrepreneurshipJourney.lead} ${entrepreneurshipJourney.start}`}
      >
        <Link href={`${ventureExperimentPath}#start`} className="lab-button">
          Start with the 14-day experiment →
        </Link>
        <a href="#modules" className="lab-button lab-button-secondary">
          See the seven modules ↓
        </a>
      </LabHero>
      <div className="lab-container">
        <nav className="lab-anchor-links" aria-label="Journey sections">
          <a href="#modules">Seven modules</a>
          <a href="#gap">The gap we are trying to solve</a>
          <a href="#problem">Problem statement</a>
          <a href="#value">Value proposition</a>
          <a href="#difference">Our differentiation</a>
        </nav>
      </div>

      <LabSection id="modules" eyebrow="Seven modules" title="Seven modules, one journey.">
        <p className="lab-lead">
          Each module lists free resources you can use today, from the Lab and from Dr. Swapnil
          Sahoo&rsquo;s public teaching pages. Modules 01, 03 and 07 share the 14-day experiment:
          Days 1&ndash;6, 7&ndash;11 and 12&ndash;14.
        </p>
        <p className="lab-small">
          {availabilityOrder.map((key, index) => (
            <span key={key}>
              {index > 0 && " "}
              <strong>{journeyAvailability[key].label}:</strong> {journeyAvailability[key].meaning}.
            </span>
          ))}
        </p>
        <ol className="lab-journey">
          {journeyModules.map((journeyModule) => {
            const status = journeyAvailability[journeyModule.availability];
            return (
              <li className="lab-journey-module" id={`module-${journeyModule.number}`} key={journeyModule.number}>
                <div>
                  <p className="lab-journey-number">Module {journeyModule.number}</p>
                  <h3>{journeyModule.title}</h3>
                  <p
                    className={`lab-journey-status lab-journey-status-${journeyModule.availability}`}
                  >
                    {status.label}
                  </p>
                  <p className="lab-journey-description">{journeyModule.description}</p>
                </div>
                <div>
                  <p className="lab-journey-label">Start with</p>
                  <ul className="lab-journey-links">
                    {journeyModule.resources.map((resource) => (
                      <li key={`${resource.href}-${resource.title}`}>
                        <span className="lab-journey-kind">{resource.kind}</span>
                        <Link href={resource.href}>{resource.title}</Link>
                        <span className="lab-journey-use">{resource.use}</span>
                      </li>
                    ))}
                  </ul>
                  {journeyModule.notCoveredYet && (
                    <p className="lab-journey-gap">
                      <strong>Not covered yet:</strong> {journeyModule.notCoveredYet}
                    </p>
                  )}
                  {journeyModule.caution && <p className="lab-journey-caution">{journeyModule.caution}</p>}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="lab-small">{entrepreneurshipJourney.scope}</p>
      </LabSection>

      <LabSection
        id="gap"
        className="lab-band"
        eyebrow="The gap we are trying to solve"
        title={knowingDoingGap.line}
      >
        <p className="lab-lead">{knowingDoingGap.context}</p>
        <div className="lab-table-wrap">
          <table className="lab-table lab-table-fluid">
            <caption className="sr-only">What exists today, and what is missing</caption>
            <thead>
              <tr>
                {knowingDoingGap.columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {knowingDoingGap.rows.map(([exists, missing]) => (
                <tr key={exists}>
                  <td>{exists}</td>
                  <td>{missing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LabSection>

      <LabSection id="problem" eyebrow="Problem statement" title="The problem we are working on.">
        <div className="lab-prose">
          <p className="lab-lead">{problemStatement.summary}</p>
        </div>
        <div className="lab-callout">
          <p className="lab-eyebrow">How might we</p>
          <p className="lab-lead">
            <strong>{problemStatement.howMightWe}</strong>
          </p>
        </div>
        <p className="lab-eyebrow" style={{ marginTop: "2.4rem" }}>
          Core problems to address
        </p>
        <div className="lab-grid" style={{ marginTop: "1rem" }}>
          {problemStatement.gaps.map((gap) => (
            <article className="lab-card" key={gap.name}>
              <h3>{gap.name}</h3>
              <p>{gap.text}</p>
              <p>
                <strong>Today:</strong> {gap.today}
              </p>
              {gap.href.startsWith("#") ? (
                <a href={gap.href} className="lab-text-link">
                  {gap.action}
                </a>
              ) : (
                <Link href={gap.href} className="lab-text-link">
                  {gap.action}
                </Link>
              )}
            </article>
          ))}
        </div>
        <div className="lab-callout" style={{ marginTop: "2rem" }}>
          <p className="lab-eyebrow">One-line problem statement</p>
          <p className="lab-lead">
            <strong>{problemStatement.oneLine}</strong>
          </p>
        </div>
      </LabSection>

      <LabSection
        id="value"
        className="lab-band"
        eyebrow="Our proposed value proposition"
        title="From intent to action."
      >
        <ol className="lab-value-flow">
          {valueProposition.map((step, index) => (
            <li className="lab-card" key={step.title}>
              <p className="lab-card-number">{String(index + 1).padStart(2, "0")}</p>
              <h3>{step.title}</h3>
              {"chain" in step ? (
                <p className="lab-value-chain">
                  {step.chain.map((stage, stageIndex) => (
                    <Fragment key={stage}>
                      {stageIndex > 0 && <span aria-hidden="true">→</span>}
                      <span className="lab-tag">{stage}</span>
                    </Fragment>
                  ))}
                </p>
              ) : (
                <p>{step.text}</p>
              )}
              {index < valueProposition.length - 1 && (
                <span className="lab-value-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="lab-small" style={{ marginTop: "1.4rem" }}>
          Stopping after an honest test is a valid result too.
        </p>
      </LabSection>

      <LabSection id="difference" eyebrow="Our differentiation" title="What makes this different.">
        <div className="lab-prose">
          <p className="lab-lead">
            {differentiation.notMerely} <strong>{differentiation.capability}</strong>
          </p>
          <p>{differentiation.hypothesis}</p>
        </div>
        <div className="lab-callout">
          <h3>We test our own idea too</h3>
          <p>{differentiation.testing}</p>
          <p>
            {differentiation.claims} {differentiation.us}
          </p>
        </div>
      </LabSection>

      <LabSection className="lab-band" eyebrow="Start here" title="Begin with Module 01 this week.">
        <p className="lab-lead">
          The free 14-day venture experiment is the practical start of the journey. Plan on about 30
          minutes a day, plus a few customer conversations.
        </p>
        <div className="lab-actions" style={{ alignItems: "center" }}>
          <Link href={`${ventureExperimentPath}#start`} className="lab-button">
            Start your experiment →
          </Link>
          <Link href={toolkitPath} className="lab-text-link">
            Open the free toolkit →
          </Link>
        </div>
        <p className="lab-small" style={{ marginTop: "1.6rem" }}>
          {labFreeLine} For adults aged 18 and over. No funding, business success or certificate is
          promised.
        </p>
        <p className="lab-small">
          Sources:{" "}
          {journeySources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && "; "}
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              , {source.note}
            </span>
          ))}
          . The Lab is independent of these authors and publishers.
        </p>
      </LabSection>
    </>
  );
}
