import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  labEntityLine,
  labPublicConfig,
  labSupportLimits,
  labSupportLine,
} from "@/features/learning-lab/config";
import { journeyModules } from "@/features/learning-lab/entrepreneurship-journey";
import { toolkitTools } from "@/features/learning-lab/founder-toolkit";
import { freeCourses } from "@/features/learning-lab/free-courses";
import { labPurpose } from "@/features/learning-lab/mission";
import {
  howItWorks,
  labServicesPath,
  serviceFaqs,
  serviceGroups,
  serviceStatus,
  serviceTerms,
  whyLearnWithLab,
} from "@/features/learning-lab/services";
import { ventureExperimentPath } from "@/features/learning-lab/venture-experiment";

const description =
  "Everything Swapnil Sahoo Learning Lab offers, by audience: the 14-day venture experiment, founder feedback, the seven-module journey, the toolkit, free courses, a kit for E-Cells, AI Viva Bot and proposed programmes. All free.";
const shareTitle = "Services: free learning, tools and programmes";
const shareImage = {
  url: `${labServicesPath}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "The services of Swapnil Sahoo Learning Lab: free learning, tools and programmes for adults aged 18 and over.",
};

export const metadata: Metadata = {
  title: "Our Services",
  description,
  alternates: { canonical: labServicesPath },
  openGraph: {
    type: "website",
    siteName: "Swapnil Sahoo Learning Lab",
    title: shareTitle,
    description,
    url: labServicesPath,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: [shareImage],
  },
};

// Facts about the offering itself, counted from the data that renders each service.
const facts = [
  ["Fees", "₹0"],
  ["Who", "Adults 18+"],
  ["Journey", `${journeyModules.length} modules`],
  ["Experiment", "14 days"],
  ["Toolkit", `${toolkitTools.length} tools`],
  ["Short courses", `${freeCourses.length} free`],
] as const;

const statusOrder = ["open", "pilot", "prototype", "proposed", "planned"] as const;
const band = (index: number) => (index % 2 === 1 ? "lab-band" : "");

export default function ServicesPage() {
  const after = serviceGroups.length;
  return (
    <>
      <LabHero
        eyebrow="Our services · Free for adults aged 18+"
        title="What we offer, and who it is for."
        description="Every service is free. Choose where to start: each one says who it is for, how it works and whether it is open now or still proposed."
      >
        <Link href={`${ventureExperimentPath}#start`} className="lab-button">
          Start the 14-day experiment →
        </Link>
        <Link href="/digital-guide" className="lab-button lab-button-secondary">
          Ask the AI mentor
        </Link>
      </LabHero>
      <div className="lab-container">
        <dl className="lab-facts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <nav className="lab-anchor-links" aria-label="Services by audience">
          {serviceGroups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              {group.audience}
            </a>
          ))}
          <a href="#why">Why learn with the Lab</a>
          <a href="#how">How it works</a>
          <a href="#questions">Questions</a>
          <a href="#terms">Terms</a>
          <a href="#provider">Who provides them</a>
        </nav>
        <p className="lab-small">
          {statusOrder.map((key, index) => (
            <span key={key}>
              {index > 0 && " "}
              <strong>{serviceStatus[key].label}:</strong> {serviceStatus[key].meaning}.
            </span>
          ))}
        </p>
      </div>

      {serviceGroups.map((group, groupIndex) => (
        <LabSection
          id={group.id}
          key={group.id}
          className={band(groupIndex)}
          eyebrow={group.audience}
          title={group.title}
        >
          <p className="lab-lead">{group.intro}</p>
          <div className="lab-grid" style={{ marginTop: "1.6rem" }}>
            {group.services.map((service) => (
              <article className="lab-card" key={service.id} id={`service-${service.id}`}>
                <p
                  className={`lab-journey-status lab-journey-status-${serviceStatus[service.status].chip}`}
                >
                  {serviceStatus[service.status].label}
                </p>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <p className="lab-small">{service.format}</p>
                <Link href={service.href} className="lab-text-link">
                  {service.action} →<span className="sr-only">: {service.name}</span>
                </Link>
              </article>
            ))}
          </div>
        </LabSection>
      ))}

      <LabSection
        id="why"
        className={band(after)}
        eyebrow="Why learn with the Lab"
        title="Practical, personal and free."
      >
        <div className="lab-grid">
          {whyLearnWithLab.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </LabSection>

      <LabSection
        id="how"
        className={band(after + 1)}
        eyebrow="How it works"
        title="Four steps from idea to decision."
      >
        <div className="lab-grid lab-grid-two">
          {howItWorks.map((step, index) => (
            <article className="lab-card" key={step.title}>
              <p className="lab-card-number">{String(index + 1).padStart(2, "0")}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="lab-actions" style={{ alignItems: "center" }}>
          <Link href={`${ventureExperimentPath}#start`} className="lab-button">
            Start free →
          </Link>
          <Link href="/digital-guide" className="lab-text-link">
            Have a question? Ask the AI mentor →
          </Link>
        </div>
      </LabSection>

      <LabSection
        id="questions"
        className={band(after + 2)}
        eyebrow="Questions"
        title="Before you start."
      >
        <div className="lab-prose">
          {serviceFaqs.map(([question, answer]) => (
            <details key={question} className="lab-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <Link href="/learning-lab/faq" className="lab-text-link">
          More answers in the FAQs →
        </Link>
      </LabSection>

      <LabSection
        id="terms"
        className={band(after + 3)}
        eyebrow="How our services work"
        title="Free, online and honest about limits."
      >
        <div className="lab-grid">
          {serviceTerms.map((term) => (
            <article key={term.title}>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
            </article>
          ))}
        </div>
        <div className="lab-actions" style={{ alignItems: "center" }}>
          <Link href="/learning-lab/policies" className="lab-text-link">
            Read the policies →
          </Link>
          <Link href="/learning-lab/policies/refunds" className="lab-text-link">
            Refunds and cancellations →
          </Link>
          <Link href="/learning-lab/contact" className="lab-text-link">
            Contact the Lab →
          </Link>
        </div>
      </LabSection>

      <LabSection
        id="provider"
        className={band(after + 4)}
        eyebrow="Who provides them"
        title={labPublicConfig.legalName}
      >
        <div className="lab-split">
          <div>
            <p className="lab-lead">{labPurpose.statement}</p>
            <p>
              {labEntityLine} The company is separate from the founder&rsquo;s employment, and no
              institutional endorsement is implied.
            </p>
            <div className="lab-actions" style={{ alignItems: "center" }}>
              <Link href="/learning-lab/purpose" className="lab-text-link">
                Our purpose, mission and vision →
              </Link>
              <Link href="/learning-lab/founder" className="lab-text-link">
                Meet the founder →
              </Link>
            </div>
          </div>
          <div className="lab-callout">
            <h3>Help keep it free</h3>
            <p>{labSupportLine}</p>
            <p className="lab-small">{labSupportLimits}</p>
            <Link href="/learning-lab/support" className="lab-text-link">
              Support the Lab →
            </Link>
          </div>
        </div>
      </LabSection>
    </>
  );
}
