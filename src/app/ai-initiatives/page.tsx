import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

const title = "AI Initiatives";
const description =
  "The three ways I work on AI at Great Lakes Gurgaon: a hands-on AI-literacy workshop for teachers and academic staff, practical AI guidance for PGDM students, and the AI Mini Hackathon — a build-first GenAI programme for students.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI initiatives",
    "AI in management education",
    "AI for educators",
    "AI Mini Hackathon",
    "Great Lakes Gurgaon",
  ],
  alternates: { canonical: "/ai-initiatives" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/ai-initiatives",
    images: ["/images/gallery/ai-mini-hackathon-winners-2026.jpg"],
  },
};

const directory = [
  {
    eyebrow: "Faculty workshop",
    title: "AI for Educators",
    description:
      "A hands-on AI-literacy workshop for teachers and academic staff — five modules, named tools, real workflows. Build a lesson deck, draft rubric-aligned feedback, or train a custom teaching assistant, with one rule that doesn't move: AI drafts, the teacher reviews, edits and owns it.",
    href: "/ai-initiatives/ai-for-educators",
  },
  {
    eyebrow: "Student toolkit",
    title: "AI for Students",
    description:
      "Practical guidance for case prep, placements, assignments and building — where AI genuinely saves time, and where it quietly hollows out the exercise. The same rule as the faculty side, from a student's side of the desk: AI accelerates the draft, the judgment stays yours.",
    href: "/ai-initiatives/ai-for-students",
  },
  {
    eyebrow: "Student build programme",
    title: "AI Mini Hackathon",
    description:
      "The July 2026 PGDM build programme: an incoming cohort turned problems from student life into testable GenAI prototypes, judged on usefulness, feasibility and responsible use — followed by Side Quests, a page of my own beta builds, open for testing.",
    href: "/ai-initiatives/ai-hackathon",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  hasPart: directory.map((item) => ({
    "@type": "WebPage",
    name: item.title,
    description: item.description,
    url: `https://www.swapnilsahoo.com${item.href}`,
  })),
};

export default function AiInitiativesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[min(100%,120rem)]">
          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-ink-950 px-6 py-10 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          >
            <Image
              src="/images/gallery/ai-mini-hackathon-winners-2026.jpg"
              alt="Students and faculty gathered around a trophy during the AI Mini Hackathon awards ceremony"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 35%" }}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(5,10,24,0.82), rgba(30,58,138,0.74), rgba(22,32,51,0.70))",
              }}
            />
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
              AI Initiatives
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Three audiences, one{" "}
              <span className="text-brand-200 font-normal italic">working principle.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              I head the Entrepreneurship and AI initiatives at Great Lakes Gurgaon. On the AI
              side, that splits into three efforts — a literacy workshop for the teachers who
              plan lessons and grade work, practical guidance for the students using AI in their
              own coursework, and a build-first programme for the students who have to ship
              something a real person can open and question. All three return to the same rule:
              AI drafts, a person reviews, edits and owns it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#directory"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See all three programmes
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="ai-initiatives-inquiry"
        eyebrow="Worth asking before any of the three starts"
        title="Would you trust a decision an assistant helped make if you couldn't see how it got there?"
        questions={[
          "For a teacher: what's the one check you'd never let AI skip before a resource reaches a class?",
          "For a student: would your answer survive being asked to defend it without looking at what the assistant gave you?",
        ]}
      />

      <section id="directory" aria-labelledby="directory-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">All three programmes</p>
            <h2 id="directory-title" className="display text-4xl font-semibold md:text-5xl">
              Pick the audience you&apos;re here for.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {directory.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass-card group flex h-full flex-col p-7 transition hover:-translate-y-1 sm:p-9"
              >
                <p className="eyebrow mb-3">{item.eyebrow}</p>
                <h3 className="font-serif text-3xl font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-4 flex-1 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span className="text-brand-700 dark:text-brand-400 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Open the page
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
