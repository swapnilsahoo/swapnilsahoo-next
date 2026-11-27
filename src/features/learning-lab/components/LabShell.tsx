import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { labPublicConfig } from "../config";
import { labPurpose } from "../mission";

const navigation = [
  ["Entrepreneurship", "/learning-lab/entrepreneurship"],
  ["14-day venture", "/learning-lab/venture-experiment"],
  ["Free toolkit", "/learning-lab/toolkit"],
  ["Free courses", "/learning-lab/free-courses"],
  ["Catalogue", "/learning-lab/catalogue"],
  ["Services", "/learning-lab/services"],
  ["For colleges", "/learning-lab/for-colleges"],
  ["Products", "/learning-lab/products"],
  ["Founder", "/learning-lab/founder"],
  ["Resources", "/learning-lab/resources"],
] as const;

export function LabShell({
  children,
  learnerAccessAvailable = false,
}: {
  children: ReactNode;
  learnerAccessAvailable?: boolean;
}) {
  return (
    <div className="lab">
      <div className="lab-container lab-masthead">
        <Link href="/learning-lab" className="lab-wordmark" aria-label="Learning Lab home">
          <span className="lab-mark" aria-hidden="true">
            L<span>↗</span>
          </span>
          <span>
            {labPublicConfig.brandOwner}
            <span className="lab-wordmark-sub">{labPublicConfig.brandLabel}</span>
          </span>
        </Link>
        <div className="lab-masthead-actions">
          <Link
            href={
              learnerAccessAvailable ? "/learning-lab/login" : "/learning-lab/login?unavailable=1"
            }
            className="lab-text-link"
            aria-label={learnerAccessAvailable ? "Learner sign in" : "Learner access coming soon"}
          >
            <span className="lab-signin-full">
              {learnerAccessAvailable ? "Learner sign in" : "Learner access coming soon"}
            </span>
            <span className="lab-signin-short">
              {learnerAccessAvailable ? "Sign in" : "Access soon"}
            </span>{" "}
            <span aria-hidden="true">↗</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Learning Lab navigation" className="lab-subnav">
        <div className="lab-container lab-nav-links">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link href="/learning-lab/contact" className="lab-nav-contact">
            Contact <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
      <main id="main-content" tabIndex={-1}>
        <noscript>
          <p className="lab-container lab-callout">
            Enable JavaScript to use forms, interactive exercises and private learning workspaces.
            Nothing has been submitted.
          </p>
        </noscript>
        {children}
      </main>
      <footer className="lab-footer">
        <div className="lab-container lab-footer-grid">
          <div>
            <p className="lab-eyebrow">{labPublicConfig.name}</p>
            <p className="lab-small">{labPurpose.statement}</p>
            <p className="lab-small">{labPublicConfig.description}</p>
            <p className="lab-small">
              Run by {labPublicConfig.legalName}, founded by Dr. Swapnil Sahoo. His academic and
              professional affiliations do not imply sponsorship or endorsement of the Lab.
            </p>
            <p className="lab-small">
              Everything the Lab offers is free, for adults aged 18 and over. There are no fees.
            </p>
            <p className="lab-small">
              Voluntary financial assistance and support for our infrastructure and services are
              welcome and appreciated.
            </p>
          </div>
          <nav aria-label="Learning Lab information">
            <Link href="/learning-lab/entrepreneurship">From startup idea to venture growth</Link>
            <Link href="/learning-lab/venture-experiment">Free 14-day venture experiment</Link>
            <Link href="/learning-lab/toolkit">Free founder toolkit</Link>
            <Link href="/learning-lab/products">Products: AI Viva Bot</Link>
            <Link href="/learning-lab/services">Our services</Link>
            <Link href="/learning-lab/purpose">Our purpose, mission and vision</Link>
            <Link href="/learning-lab/weekly-notes">Weekly practice and timeline</Link>
            <Link href="/learning-lab/pilot">Volunteer pilot</Link>
            <Link href="/learning-lab/catalogue">Open catalogue and learning paths</Link>
            <Link href="/learning-lab/free-courses">Free courses</Link>
            <Link href="/learning-lab/support">Support the Lab</Link>
            <Link href="/learning-lab/programmes">Proposed programmes</Link>
            <Link href="/learning-lab/for-professionals">For professionals</Link>
            <Link href="/digital-guide">AI learning mentor</Link>
            <Link href="/learning-lab/faq">FAQs</Link>
            <Link href="/learning-lab/contact">Contact</Link>
            {labPublicConfig.businessEmail && (
              <a href={`mailto:${labPublicConfig.businessEmail}`}>Email the Lab</a>
            )}
            <Link href="/learning-lab/policies">Privacy and policies</Link>
            <Link href="/learning-lab/policies/privacy">Privacy</Link>
            <Link href="/">Founder’s academic website</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function LabHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="lab-container lab-page-hero">
      <p className="lab-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lab-lead">{description}</p>
      {children && <div className="lab-actions">{children}</div>}
    </header>
  );
}

export function LabSection({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`lab-section ${className}`}>
      <div className="lab-container">
        {eyebrow && <p className="lab-eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
