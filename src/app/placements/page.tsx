import type { Metadata } from "next";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { profile } from "@/features/profile/data/profile";

import { ReadinessStudio } from "./ReadinessStudio";

export const metadata: Metadata = {
  title: "Placement Readiness Studio",
  description:
    "Placement preparation for MBA students: choosing a credible role, writing an evidence-led CV and practising interviews with honest feedback.",
  keywords: [
    "MBA placements",
    "placement preparation",
    "consulting interview",
    "techno-functional consultant",
    "behavioral interview",
    "STAR method",
    "MBA careers",
  ],
  alternates: { canonical: "/placements" },
  openGraph: {
    type: "website",
    title: "Placement Readiness Studio — From Experience to Evidence",
    description:
      "Choose a credible role, find the evidence in your experience and practise saying it clearly.",
    url: "/placements",
    images: ["/images/profile_pic.jpg"],
  },
};

const readinessJourney = [
  {
    index: "01",
    title: "Choose a role thesis",
    description:
      "Connect your prior experience, current capabilities and future direction in one credible narrative.",
  },
  {
    index: "02",
    title: "Build the evidence",
    description:
      "Translate responsibilities into decisions, scale, outcomes and lessons an interviewer can verify.",
  },
  {
    index: "03",
    title: "Rehearse the signal",
    description:
      "Practise role-specific cases, behavioural follow-up questions and concise answers under realistic pressure.",
  },
  {
    index: "04",
    title: "Close with judgment",
    description:
      "State your conclusion clearly, discuss trade-offs and ask questions that show genuine business curiosity.",
  },
] as const;

const starPrompts = [
  {
    title: "Leadership without authority",
    prompt: "When did you align people who had different priorities?",
  },
  {
    title: "Ambiguity",
    prompt: "When did you create structure before the answer was clear?",
  },
  {
    title: "Failure and learning",
    prompt: "What did not work, what did you own and what changed afterward?",
  },
  {
    title: "Stakeholder challenge",
    prompt: "When did you disagree constructively and still preserve trust?",
  },
  {
    title: "Customer or client impact",
    prompt: "How did your decision improve value for the person you served?",
  },
  {
    title: "Execution under pressure",
    prompt: "How did you prioritise when time, data or resources were constrained?",
  },
] as const;

const interviewSignals = [
  {
    Icon: CompassIcon,
    title: "Clarity",
    description: "Answer the question asked and signpost the logic.",
  },
  {
    Icon: NetworkIcon,
    title: "Structure",
    description: "Break complexity into a sequence the interviewer can follow.",
  },
  {
    Icon: BricolageIcon,
    title: "Evidence",
    description: "Use specific actions, scale, outcomes and learning.",
  },
  {
    Icon: SparkIcon,
    title: "Judgment",
    description: "Name trade-offs, risks and the next best action.",
  },
] as const;

export default function PlacementsPage() {
  return (
    <main id="main-content">
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14">
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  Placement readiness · MBA careers
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Turn experience{" "}
                  <span className="text-brand-200 font-normal italic">into evidence.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Start by deciding which role makes sense for you. Then find the evidence in your
                  experience, write it plainly and practise until you can discuss it without
                  sounding rehearsed.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#readiness-studio"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Check your readiness
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="/case-study-preparation"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Practise consulting cases
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Strong answer
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">
                    Claim → Evidence → Insight
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Strong preparation
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">
                    Role fit → Reps → Reflection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="journey-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / A useful order of work</p>
              <h2 id="journey-title" className="display text-4xl font-semibold md:text-5xl">
                Know what you are trying to prove.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              A folder of polished answers is not a placement strategy. You need a believable
              account of where you can contribute, specific evidence from your work and enough
              practice to handle the question you did not predict.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {readinessJourney.map((step) => (
              <li key={step.index} className="glass-card relative overflow-hidden p-6">
                <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                  {step.index}
                </span>
                <p className="eyebrow relative mb-4">Stage {step.index}</p>
                <h3 className="relative font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="readiness-studio" aria-labelledby="studio-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Interactive readiness studio</p>
            <h2 id="studio-title" className="display text-4xl font-semibold md:text-5xl">
              Prepare for the role you actually want.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Different roles ask for different proof. Switch between them, look at what each one
              requires and use the readiness check to choose your next practice task.
            </p>
          </div>
          <ReadinessStudio />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="stories-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / Story bank</p>
              <h2 id="stories-title" className="display text-4xl font-semibold md:text-5xl">
                Prepare six stories you can tell honestly.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                STAR is useful as an editing tool, not a script. Give just enough context, say what
                you were responsible for, describe what you did and explain what changed.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {starPrompts.map((story, index) => (
                <article key={story.title} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-brand-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-semibold">{story.title}</h3>
                      <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                        {story.prompt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[26px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div
              className="bg-accent-400/15 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  The 90-second answer
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">
                  Make every sentence earn its place.
                </h2>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Answer", "Lead with the point you want remembered."],
                  ["02", "Prove", "Use one specific example with scale and outcome."],
                  ["03", "Interpret", "Explain what the experience taught you."],
                  ["04", "Connect", "Tie the evidence back to this role and company."],
                ].map(([number, title, description]) => (
                  <li key={number} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="font-mono text-[10px] text-blue-300">{number}</span>
                    <h3 className="mt-1 font-serif text-xl font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="signals-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Interview signals</p>
            <h2 id="signals-title" className="display text-4xl font-semibold md:text-5xl">
              What strong performance sounds like.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interviewSignals.map(({ Icon, title, description }) => (
              <article key={title} className="glass-card p-6">
                <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 mb-5 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="resources-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="bg-accent-400/10 text-accent-600 dark:text-accent-400 mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
                <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="eyebrow mb-3">05 / Continue practising</p>
              <h2 id="resources-title" className="display text-4xl font-semibold">
                Build range without losing depth.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/case-study-preparation"
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Consulting practice</p>
                <h3 className="font-serif text-2xl font-semibold">Case Study Studio</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Practise structuring, quantitative reasoning and executive synthesis.
                </p>
              </a>
              <a
                href={`mailto:${profile.email}?subject=Placement%20Preparation%20Mentoring`}
                className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <p className="eyebrow mb-2">Mentoring</p>
                <h3 className="font-serif text-2xl font-semibold">Discuss your preparation</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  Share your target role and the preparation gap you want to work through.
                </p>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
