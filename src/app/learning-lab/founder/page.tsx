import type { Metadata } from "next";
import Link from "next/link";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";

export const metadata: Metadata = {
  title: "About the Founder",
  description:
    "Dr. Swapnil Sahoo’s background and approach to the Learning Lab, with clear separation between prior academic and industry experience and the new initiative.",
  alternates: { canonical: "/learning-lab/founder" },
};

export default function FounderPage() {
  return (
    <>
      <LabHero
        eyebrow="About the founder"
        title="Dr. Swapnil Sahoo"
        description="A founder interested in how people make decisions, build useful things and act when resources are limited. The Learning Lab is currently run on a not-for-profit basis, with free learning in strategy, entrepreneurship and applied AI."
      />
      <LabSection>
        <div className="lab-split">
          <div className="lab-prose">
            <h2>Background that informs the teaching.</h2>
            <p>
              Dr. Swapnil Sahoo holds a Ph.D. from XLRI Jamshedpur, specialising in Entrepreneurship
              and Innovation, an MBA from XIMB and a B.Tech from Utkal University. He brings 17 years
              of corporate experience in strategic and partnership roles to his teaching and
              research on entrepreneurial resourcefulness.
            </p>
            <p>
              His public website documents teaching in strategy and entrepreneurship and resources
              on AI in management education. These are the founder’s prior activities, not outcomes
              delivered by the Learning Lab.
            </p>
            <p>
              <a href="https://www.swapnilsahoo.com/#about">Read the founder’s academic profile</a>{" "}
              and{" "}
              <a href="https://www.greatlakes.edu.in/gurgaon/swapnil-sahoo/">
                the published faculty biography
              </a>
              .
            </p>
          </div>
          <aside className="lab-callout">
            <h3>An independent initiative.</h3>
            <p>
              Dr. Swapnil Sahoo runs the Learning Lab independently. His academic and professional
              affiliations describe his background; they do not imply sponsorship, endorsement or
              partnership with the Lab.
            </p>
            <p>
              The Lab is currently run on a not-for-profit basis. Voluntary assistance and donations
              are welcome to help improve its learning content and infrastructure. The free courses
              remain free; support does not purchase enrolment, assessment or a certificate.
            </p>
            <p>
              <Link href="/learning-lab/support">Explore ways to support the Lab →</Link>
            </p>
          </aside>
        </div>
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="The teaching approach"
        title="Ideas should survive a practical question."
      >
        <div className="lab-grid">
          <article>
            <h3>Make the reasoning visible</h3>
            <p className="lab-muted">
              Ask what the decision is, what evidence supports it and what would cause you to change
              course.
            </p>
          </article>
          <article>
            <h3>Work within constraints</h3>
            <p className="lab-muted">
              Practise with limited time, information and resources. Learn to design a useful next
              step before a large commitment.
            </p>
          </article>
          <article>
            <h3>Keep human judgement responsible</h3>
            <p className="lab-muted">
              Use AI thoughtfully, check its outputs and retain human responsibility for decisions,
              assessed feedback and certificates.
            </p>
          </article>
        </div>
      </LabSection>
      <LabSection>
        <Link href="/learning-lab/programmes" className="lab-button">
          Explore the proposed programmes →
        </Link>
      </LabSection>
    </>
  );
}
