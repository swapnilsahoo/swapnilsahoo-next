import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import {
  feedbackHighlight,
  strategyShowdownHighlight,
  teachingLinks,
} from "@/features/profile/data/teaching";

export const metadata: Metadata = {
  title: "Teaching Philosophy: Socratic Method & First Principles",
  description:
    "How I teach strategy and entrepreneurship: cases and simulations over lectures, Socratic questioning over answers given, first-principles reasoning over memorised frameworks — with real student outcomes and a full directory of every course.",
  keywords: [
    "teaching philosophy",
    "Socratic method MBA",
    "first principles teaching",
    "case method pedagogy",
    "management education",
    "Great Lakes Gurgaon",
  ],
  alternates: { canonical: "/teaching" },
  openGraph: {
    type: "website",
    title: "Teaching Philosophy: Socratic Method & First Principles",
    description:
      "Cases over lectures, questions over answers, first principles over memorised frameworks.",
    url: "/teaching",
    images: ["/images/gallery/sapience-2025-entrepreneurship-panel.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Teaching Philosophy: Socratic Method & First Principles",
  description:
    "A pedagogy built on cases, simulations, Socratic questioning and first-principles reasoning.",
  author: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
};

const pedagogyPillars = [
  {
    title: "Decisions over recall",
    description:
      "A student who can define a framework but freezes when asked what to actually do has learned the wrong thing. Every session ends in a decision someone has to defend, not a definition someone has to remember.",
  },
  {
    title: "Evidence over assertion",
    description:
      "\"I think\" is not an answer in this classroom. \"Here's the number, here's where it came from, and here's what I'd still want to check\" is. Confidence without evidence gets interrogated, not rewarded.",
  },
  {
    title: "Struggle before structure",
    description:
      "A framework handed over before the problem has been felt is forgotten within a week. Students wrestle with an unstructured case first — the structure arrives as relief, not as the starting instruction.",
  },
  {
    title: "Reflection closes the loop",
    description:
      "Every case, simulation round or build ends by asking what changed in the room's thinking, not just what the final slide said. The decision trail matters as much as the decision.",
  },
] as const;

const socraticSteps = [
  {
    step: "Open",
    detail:
      "A question, not a lecture. Often deliberately underspecified — 'what would you do here?' — so the room has to supply the missing structure itself before I supply anything.",
  },
  {
    step: "Cold-call",
    detail:
      "A specific student defends a specific position, out loud, in front of peers who are about to be asked to disagree with it. There is nowhere to hide behind a group answer.",
  },
  {
    step: "Chain the follow-up",
    detail:
      "\"Why?\" \"What would have to be true for that?\" \"What breaks your answer?\" Each question targets the weakest link in the previous answer, not a new topic.",
  },
  {
    step: "Force the synthesis",
    detail:
      "The room, not the professor, has to land on a defensible position by the end — usually by disagreeing its way there, with me refereeing rather than resolving.",
  },
] as const;

const firstPrinciplesEvidence = [
  {
    title: "Every session starts with a first-principles question",
    description:
      "The 1-Year and 2-Year MBA interactive sessions each open with a provocative question box before any framework is introduced — the question comes first, the tool comes second.",
    href: "/teaching/2-year-mba",
  },
  {
    title: "Frameworks are taught as reasoning, not recipes",
    description:
      "The case-frameworks library explains why each structure exists and where it breaks, with a diagram and a common-mistakes list for each — not a memorise-and-apply checklist.",
    href: "/placements/case-frameworks",
  },
  {
    title: "Estimation is taught as a method, not an answer key",
    description:
      "Guesstimates are graded on whether the assumptions are visible and defensible, never on whether the final number happens to be 'right.'",
    href: "/placements/guesstimates",
  },
] as const;

export default function TeachingPage() {
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
        <Container className="max-w-[87.5rem]">
          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/sapience-2025-entrepreneurship-panel.jpg"
              alt="Dr Swapnil Sahoo speaking on an Entrepreneurship Panel at SAPIENCE 2025, Great Lakes Gurgaon"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 32%" }}
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
              Teaching philosophy
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              A classroom built on{" "}
              <span className="text-brand-200 font-normal italic">questions</span>, not answers.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              I don&apos;t start with a framework and hope it sticks. I start with a question the
              room can&apos;t yet answer, let the discomfort do its work, and only then hand over
              the structure that would have helped — because a tool earns its place once you&apos;ve
              felt the problem it solves. Cases, simulations and fieldwork replace lectures;
              Socratic questioning replaces answers given; first principles replace memorised
              frameworks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#socratic-method"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                See how a session runs
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#programmes"
                className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Explore every course
              </a>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="teaching-inquiry"
        eyebrow="Worth asking before any of this works"
        title="Would you trust a decision you were never asked to defend?"
        questions={[
          "If a lecture only has to inform, why does a case only work once it interrogates?",
          "Which of your current beliefs about 'best practice' would survive being asked why, five times in a row?",
        ]}
      />

      <section aria-labelledby="approach-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / How I think about teaching</p>
              <h2 id="approach-title" className="display text-4xl font-semibold md:text-5xl">
                The classroom is a rehearsal for judgment.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              A management classroom that only transmits information has confused itself with a
              textbook. What it should rehearse is the harder skill: making a defensible call with
              incomplete evidence, under real disagreement, and explaining afterward what you
              would do differently. Every method below — cases, simulations, fieldwork, build
              exercises — exists to manufacture that pressure honestly.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {pedagogyPillars.map((pillar, index) => (
              <article key={pillar.title} className="glass-card p-6">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold">{pillar.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section id="socratic-method" aria-labelledby="socratic-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / The Socratic method, in practice</p>
            <h2 id="socratic-title" className="display text-4xl font-semibold md:text-5xl">
              Four moves, repeated until the room does the work.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Socratic teaching is not just &ldquo;asking questions instead of lecturing.&rdquo;
              It&apos;s a specific discipline: never answer a question the room could answer
              itself, and never let a weak argument survive unchallenged just because it sounded
              confident.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socraticSteps.map((item, index) => (
              <li key={item.step} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow relative mb-3">Move {index + 1}</p>
                <h3 className="relative font-serif text-xl font-semibold">{item.step}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="principles-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / First principles over frameworks</p>
            <h2 id="principles-title" className="display text-4xl font-semibold md:text-5xl">
              Teach why the tool works, and it survives contact with a new problem.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A memorised framework fails the moment a case doesn&apos;t fit its template. A
              first-principles habit — break the problem into its real, checkable parts, then
              rebuild a structure for this specific situation — survives every case, including the
              ones with no clean template at all. This is deliberately built into how these
              materials are written, not just how I talk about them:
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {firstPrinciplesEvidence.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  See it in the material
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[87.5rem]" />

      <section aria-labelledby="evidence-title" className="py-16 sm:py-24">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / What &ldquo;world-class&rdquo; has to mean here</p>
            <h2 id="evidence-title" className="display text-4xl font-semibold md:text-5xl">
              A standard is only credible with evidence attached to it.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              I&apos;d rather point to specific, checkable outcomes than claim a superlative. Here
              is what&apos;s actually on record.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card p-6">
              <p className="eyebrow mb-2">Student feedback</p>
              <h3 className="font-serif text-lg font-semibold">{feedbackHighlight.title}</h3>
              <p className="mt-2">
                <span className="display text-3xl font-semibold">{feedbackHighlight.rating}</span>
                <span className="text-ink-500 dark:text-ink-400 ml-2 text-xs">
                  {feedbackHighlight.ratingLabel}
                </span>
              </p>
              <ul className="text-ink-600 dark:text-ink-300 mt-3 space-y-1.5 text-sm italic">
                {feedbackHighlight.quotes.map((quote) => (
                  <li key={quote}>&ldquo;{quote}&rdquo;</li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <p className="eyebrow mb-2">Student mentoring</p>
              <h3 className="font-serif text-lg font-semibold">
                {strategyShowdownHighlight.title}
              </h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                {strategyShowdownHighlight.description}
              </p>
              <p className="text-ink-500 dark:text-ink-400 mt-3 text-xs">
                {strategyShowdownHighlight.result}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-ink-200/80 p-6 dark:border-ink-700">
            <p className="eyebrow mb-2">External benchmark</p>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              This programme design has also stood in front of outside reviewers — including an
              AACSB peer-review visit connecting the classroom&apos;s field-learning and
              sustainability work to institutional accreditation standards, not just internal
              opinion.
            </p>
          </div>
        </Container>
      </section>

      <section id="programmes" aria-labelledby="programmes-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[87.5rem]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / Every course, one directory</p>
            <h2 id="programmes-title" className="display text-4xl font-semibold md:text-5xl">
              Where this philosophy actually shows up.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachingLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="glass-card p-7 transition-transform hover:-translate-y-1"
              >
                <p className="eyebrow mb-3">{link.eyebrow}</p>
                <h3 className="mb-2 font-serif text-2xl font-semibold">{link.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 text-sm">{link.description}</p>
                <p className="text-brand-700 dark:text-brand-400 link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Open page <ArrowRightIcon className="h-3.5 w-3.5" />
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
