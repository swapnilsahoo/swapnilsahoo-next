import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { labPublicConfig } from "@/features/learning-lab/config";
import { aiVivaBot, labProductsPath } from "@/features/learning-lab/products";

const description =
  "Working prototypes from Swapnil Sahoo Learning Lab. AI Viva Bot is an AI oral examiner that questions each student on their own submission. Try the live demo.";
const shareImage = {
  url: "/learning-lab/products/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AI Viva Bot by Swapnil Sahoo Learning Lab: an AI oral examiner with a live demo.",
};

export const metadata: Metadata = {
  title: "Products: AI Viva Bot",
  description,
  alternates: { canonical: labProductsPath },
  openGraph: {
    type: "website",
    siteName: "Swapnil Sahoo Learning Lab",
    title: "AI Viva Bot: an AI oral examiner you can try today",
    description,
    url: labProductsPath,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Viva Bot: an AI oral examiner you can try today",
    description,
    images: [shareImage],
  },
};

function DemoLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a href={aiVivaBot.demoUrl} className={className} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens the demo in a new tab)</span>
    </a>
  );
}

export default function ProductsPage() {
  const product = aiVivaBot;
  return (
    <>
      <LabHero
        eyebrow="Learning Lab products"
        title="Working prototypes you can try today."
        description={`Built by ${labPublicConfig.legalName}, founded by Dr. Swapnil Sahoo. Our first product, ${product.name}, is live as a working prototype with a public demo.`}
      >
        <DemoLink className="lab-button">Try the {product.name} demo</DemoLink>
        <a href="#try" className="lab-button lab-button-secondary">
          Try it in three minutes
        </a>
      </LabHero>

      <LabSection id={product.slug} eyebrow={product.status} title={product.name}>
        <div className="lab-split">
          <div className="lab-prose">
            <p className="lab-lead">{product.tagline}</p>
            <h3>The problem</h3>
            <p>{product.problem}</p>
            <h3>What it does</h3>
            <p>{product.solution}</p>
            <h3>Who it is for</h3>
            <p>{product.forWhom}</p>
          </div>
          <aside className="lab-callout">
            <h3>See it working</h3>
            <p>The demo runs in your browser. No sign-up is needed to look around.</p>
            <div className="lab-actions" style={{ marginTop: "0.8rem" }}>
              <DemoLink className="lab-button">Open the live demo</DemoLink>
            </div>
            <h3 style={{ marginTop: "1.4rem" }}>Built with</h3>
            <ul>
              {product.builtWith.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <Link href="/learning-lab/contact" className="lab-text-link">
                Ask for a walkthrough or a pilot →
              </Link>
            </p>
          </aside>
        </div>
      </LabSection>

      <LabSection
        id="how"
        className="lab-band"
        eyebrow="How it works"
        title="From exam setup to evaluation."
      >
        <div className="lab-grid">
          {product.flow.map((stage, index) => (
            <article className="lab-card" key={stage.title}>
              <p className="lab-card-number">{String(index + 1).padStart(2, "0")}</p>
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
            </article>
          ))}
        </div>
      </LabSection>

      <LabSection id="try" eyebrow="For investors and faculty" title="Try it in three minutes.">
        <ol className="lab-flow">
          {product.tryIt.map((item) => (
            <li key={item.step}>
              <div>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>{item.step}</h3>
                <p style={{ margin: "0.4rem 0 0" }}>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lab-actions">
          <DemoLink className="lab-button">Open the live demo</DemoLink>
          <Link href="/learning-lab/contact" className="lab-text-link">
            Contact the founder →
          </Link>
        </div>
        <p className="lab-small" style={{ marginTop: "1.2rem" }}>
          {product.brandingNote} Everything the Lab offers learners is free.
        </p>
      </LabSection>
    </>
  );
}
