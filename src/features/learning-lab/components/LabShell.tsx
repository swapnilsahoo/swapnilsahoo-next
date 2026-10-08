import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { labPublicConfig } from "../config";

const navigation = [
  ["Programmes", "/learning-lab/programmes"],
  ["For colleges", "/learning-lab/for-colleges"],
  ["For professionals", "/learning-lab/for-professionals"],
  ["Founder", "/learning-lab/founder"],
  ["Resources", "/learning-lab/resources"],
] as const;

export function LabShell({ children }: { children: ReactNode }) {
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
          <Link href="/learning-lab/login" className="lab-text-link">
            <span className="lab-signin-full">Learner sign in</span>
            <span className="lab-signin-short">Sign in</span> <span aria-hidden="true">↗</span>
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
            Register interest <span aria-hidden="true">→</span>
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
            <p className="lab-small">{labPublicConfig.description}</p>
            <p className="lab-small">
              Proposed programmes for adults aged 18 and over. Registration of interest is free and
              does not reserve a paid place.
            </p>
          </div>
          <nav aria-label="Learning Lab information">
            <Link href="/learning-lab/faq">FAQs</Link>
            <Link href="/learning-lab/contact">Contact</Link>
            <Link href="/learning-lab/policies">Draft policies</Link>
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
