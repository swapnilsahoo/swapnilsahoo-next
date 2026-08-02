import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { linkedInHighlights } from "@/features/profile/data/linkedin";

import { twoYearMba } from "../mbaData";
import { interviewQuestionThemes } from "./interviewQuestionBank";
import styles from "./TwoYearMbaExperience.module.css";
import {
  assessments,
  coursePhases,
  courseReadings,
  deliverables,
  learningObjectives,
  programmeOutcomes,
  sessions,
} from "./twoYearMbaCourseData";

const responsibleAiPost = linkedInHighlights[0];

const strategicManagementInquiry = {
  socraticQuestions: [
    "Does a framework predict what a firm should do, or merely give us a tidy label after the outcome—and what evidence could tell the difference?",
    "Can a recommendation still be called coherent if marketing, operations, finance or people must absorb contradictions that the strategy slide leaves unresolved?",
    "How should a decision change when competitors, regulators, employees and customers can respond rather than remain fixed assumptions in the analysis?",
    "When growth looks attractive, which cash demands, capability gaps, implementation owners and stakeholder consequences might reverse the recommendation?",
  ],
  firstPrinciplesQuestions: [
    "What causal chain connects a change in the environment to a managerial choice, a configuration of activities and an outcome the firm can observe?",
    "Which constraint currently limits value creation or capture, and would the proposed action remove that constraint or simply move it elsewhere?",
    "What must be different relative to rivals for advantage to exist, and what would make that difference valuable, difficult to copy and durable enough to matter?",
    "Who must do what differently for the strategy to become action, which leading signals will reveal progress and what evidence should trigger correction?",
  ],
} as const;

const assessmentColours = [
  "bg-emerald-600",
  "bg-emerald-400",
  "bg-blue-600",
  "bg-blue-900",
  "bg-amber-600",
] as const;

const learningMoves = [
  {
    icon: CompassIcon,
    label: "Diagnose",
    title: "Read the whole system",
    description:
      "Move from industry conditions and resources to corporate scope, governance and global change.",
  },
  {
    icon: BricolageIcon,
    label: "Design",
    title: "Build the strategic choice",
    description:
      "Choose a position, configure activities and decide how the firm will own, ally, acquire or adapt.",
  },
  {
    icon: NetworkIcon,
    label: "Deliver",
    title: "Convert intent into action",
    description:
      "Tie recommendations to evidence, implementation mode, stakeholder response and a practical timeline.",
  },
] as const;

const projectSteps = [
  ["01", "Select", "Choose a startup or regular company, preferably under 10–15 years old."],
  ["02", "Interview", "Conduct a live, in-depth founder, CXO or core-team conversation."],
  ["03", "Analyse", "Apply course frameworks to original evidence, decisions and evolution."],
  ["04", "Return", "Email practical recommendations and request a 1–10 relevance rating."],
] as const;

const projectDeliverables = [
  ["Primary evidence", "Audio/video or detailed interview notes and transcript"],
  ["Strategic analysis", "A focused 5–7 page report"],
  ["Executive synthesis", "A presentation of up to 10 slides"],
  ["Individual meaning", "A 150-word handwritten reflection from every member"],
] as const;

function Citations({ ids }: { ids: readonly number[] }) {
  return (
    <span className="ml-1 whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={`#reference-${id}`}
          aria-label={`See reference ${id}`}
          className="ml-0.5 align-super text-[10px] font-bold text-emerald-700 hover:underline dark:text-emerald-300"
        >
          [{id}]
        </a>
      ))}
    </span>
  );
}

export function TwoYearMbaExperience() {
  return (
    <main id="main-content" className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div
          className={`${styles.heroShell} mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.95)] sm:rounded-[2.5rem]`}
        >
          <div className="grid min-h-[700px] lg:grid-cols-[0.84fr_1.16fr]">
            <div className="relative z-10 flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-emerald-100 uppercase">
                    PGDM · Strategic Management
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
                    2025–27 · Term 3 · 3 credits
                  </span>
                </div>

                <h1 className="mt-10 max-w-3xl font-serif text-[clamp(3.6rem,6.5vw,7.2rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
                  Strategy,
                  <span className="mt-2 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-2 text-transparent">
                    end to end.
                  </span>
                </h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Twenty linked sessions move from competitive foundations to corporate scope,
                  execution and global change, then test the whole system against original field
                  evidence.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#sessions"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none"
                  >
                    Explore all 20 sessions
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#field-lab"
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none"
                  >
                    Enter the field lab
                  </a>
                </div>
              </div>

              <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-6 text-sm text-slate-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10">
                  <SparkIcon className="h-4 w-4 text-amber-200" aria-hidden="true" />
                </span>
                <p className="max-w-lg">
                  The course moves from diagnosis and strategic choice to a recommendation that can
                  be implemented.
                </p>
              </div>
            </div>

            <div
              className={`${styles.photoFrame} relative min-h-[560px] overflow-hidden border-t border-white/10 lg:min-h-full lg:border-t-0 lg:border-l`}
            >
              <Image
                src="/images/ai-hackathon/hackathon-room.jpg"
                alt="Dr Swapnil Sahoo speaking during the incoming PGDM cohort's July 2026 AI Mini Hackathon"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "52% center" }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="absolute right-5 bottom-5 left-5 z-10 rounded-2xl border border-white/15 bg-slate-950/68 p-5 backdrop-blur-xl sm:right-8 sm:bottom-8 sm:left-auto sm:max-w-sm">
                <p className="font-mono text-[10px] tracking-[0.18em] text-emerald-200 uppercase">
                  PGDM teaching in practice
                </p>
                <p className="mt-3 font-serif text-xl leading-snug font-semibold">
                  A live build session from the July 2026 AI Mini Hackathon.
                </p>
              </div>
            </div>
          </div>

          <dl className="grid border-t border-white/10 bg-black/25 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["20", "90-minute sessions"],
              ["30", "contact hours"],
              ["7", "programme outcomes"],
              ["100", "marks across five signals"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-white/10 px-6 py-5 sm:border-r last:sm:border-r-0 lg:px-8"
              >
                <dt className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                  {label}
                </dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Container className="max-w-6xl">
        <nav
          aria-label="On this course page"
          className="nav-glass my-8 hidden items-center justify-between rounded-full px-5 py-2.5 lg:flex"
        >
          <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            Course map
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold">
            {[
              ["Profile", "#course-profile"],
              ["Pathway", "#pathway"],
              ["20 sessions", "#sessions"],
              ["Field lab", "#field-lab"],
              ["Assessment", "#assessment"],
              ["References", "#references"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-2 transition hover:bg-emerald-600/8 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </Container>

      <InquiryPrelude
        id="strategic-management-inquiry"
        title="Strategy begins where the obvious answer stops."
        introduction="Before moving through the course architecture, these questions make the work beneath a recommendation visible: causal reasoning, competitive response, cross-functional coherence, stakeholder consequences and the conditions under which a decision should change."
        socraticQuestions={strategicManagementInquiry.socraticQuestions}
        firstPrinciplesQuestions={strategicManagementInquiry.firstPrinciplesQuestions}
      />

      <section
        id="course-profile"
        aria-labelledby="course-profile-title"
        className="py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow">01 / Course profile</p>
              <h2
                id="course-profile-title"
                className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                From competitive position to coordinated action.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-xl text-sm leading-7">
                Strategic Management develops the analytical tools and managerial perspective to
                read environments, evaluate resources, choose scope and implement coherent strategy
                in dynamic markets.
              </p>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
              {[
                ["Course code", "PGDM-2025-27-T3-SM"],
                ["Instructor", "Dr. Swapnil Sahoo"],
                ["Programme / term", "PGDM 2025–27 · Term 3"],
                ["Credit value", "3 credits"],
                ["Contact design", "20 × 1.5 hours"],
                [
                  "Prerequisite",
                  "All core business requirements, including operations, accounting, marketing, OB, leadership and communication",
                ],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/75 p-5 dark:bg-[#0a1629]/90">
                  <dt className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-[0.14em] uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2 font-serif text-lg leading-snug font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {learningMoves.map(({ icon: Icon, label, title, description }, index) => (
              <article
                key={label}
                className="glass-card group relative overflow-hidden p-6 sm:min-h-64"
              >
                <span className="absolute -top-4 right-4 font-serif text-8xl font-semibold text-emerald-600/10 dark:text-emerald-300/10">
                  {index + 1}
                </span>
                <Icon className="relative h-6 w-6 text-emerald-700 dark:text-emerald-300" />
                <p className="relative mt-8 font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
                  {label}
                </p>
                <h3 className="relative mt-2 font-serif text-2xl font-semibold">{title}</h3>
                <p className="text-ink-600 dark:text-ink-300 relative mt-4 text-sm leading-6">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="pathway"
        aria-labelledby="pathway-title"
        className="bg-slate-950 py-20 text-white sm:py-28"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-emerald-300 uppercase">
                02 / The strategic pathway
              </p>
              <h2
                id="pathway-title"
                className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                Five stages across twenty sessions.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-300">
              The course widens its focus in stages: from industry and competitive advantage to
              corporate scope, execution and global change.
            </p>
          </div>

          <div className={`${styles.phaseRail} mt-14 grid gap-4 md:grid-cols-5`}>
            {coursePhases.map((phase) => (
              <article
                key={phase.number}
                className="relative ml-12 rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm md:ml-0 md:pt-10"
              >
                <span className="absolute top-5 -left-[3.35rem] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-950 font-mono text-[10px] font-bold text-emerald-200 md:top-0 md:left-5 md:-translate-y-1/2">
                  {phase.number}
                </span>
                <p className="font-mono text-[10px] tracking-[0.14em] text-emerald-300 uppercase">
                  Sessions {phase.sessions}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold">{phase.title}</h3>
                <p className="mt-3 text-xs leading-5 text-slate-300">{phase.question}</p>
                <div className="my-4 h-px bg-white/10" />
                <p className="font-mono text-[9px] tracking-[0.14em] text-amber-200 uppercase">
                  Cases · {phase.cases}
                </p>
                <ul className="mt-4 space-y-2">
                  {phase.focus.map((focus) => (
                    <li key={focus} className="flex gap-2 text-[11px] leading-4 text-slate-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-300" />
                      {focus}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="sessions" aria-labelledby="sessions-title" className="py-20 sm:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">03 / Complete session plan</p>
              <h2
                id="sessions-title"
                className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                The entire course, session by session.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 max-w-md text-sm leading-6">
              Every 90-minute session below follows the supplied teaching plan, including topics,
              cases and assigned preparation.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
            {sessions.map((session, index) => (
              <details
                key={session.number}
                open={index === 0}
                className="glass-card group overflow-hidden"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 p-5 marker:hidden sm:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 font-mono text-[11px] font-bold text-white dark:bg-emerald-600">
                    {session.number}
                  </span>
                  <div>
                    <p className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-[0.14em] uppercase">
                      Session {session.number} · 1.5 hours
                    </p>
                    <h3 className="mt-1 font-serif text-xl leading-snug font-semibold">
                      {session.title}
                    </h3>
                  </div>
                  <span
                    className="text-ink-500 dark:text-ink-300 flex h-8 w-8 items-center justify-center rounded-full border border-slate-900/10 text-xl transition-transform group-open:rotate-45 dark:border-white/10"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-slate-900/10 px-5 pt-5 pb-6 sm:px-6 dark:border-white/10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] font-bold tracking-[0.15em] text-emerald-700 uppercase dark:text-emerald-300">
                        Topics & coverage
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {session.topics.map((topic) => (
                          <li
                            key={topic}
                            className="text-ink-700 dark:text-ink-200 flex gap-3 text-sm leading-6"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold tracking-[0.15em] text-emerald-700 uppercase dark:text-emerald-300">
                        Readings & references
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {session.readings.map((reading, readingIndex) => (
                          <li
                            key={reading}
                            className="text-ink-600 dark:text-ink-300 grid grid-cols-[auto_1fr] gap-3 text-xs leading-5"
                          >
                            <span className="text-ink-400 font-mono">
                              {String(readingIndex + 1).padStart(2, "0")}
                            </span>
                            {reading}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="practice-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="glass-card p-7 sm:p-9">
              <p className="eyebrow">04 / Learning methodology</p>
              <h2
                id="practice-title"
                className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
              >
                A workshop with seminar discipline.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
                Learners lead discussion from mandatory papers, cases and current evidence. The
                instructor adds only the theory needed to sharpen the decision.
                <Citations ids={[2, 7]} />
              </p>
              <ul className="text-ink-600 dark:text-ink-300 mt-7 space-y-4 text-sm leading-6">
                {[
                  "Classroom lecture and discussion across the core text, references and videos.",
                  "Case analyses spanning Tesla, Patagonia, NVIDIA, Amazon, Tata Group and Rajesh Exports.",
                  "One quiz per session, case exercises, a group field project, midterm and end-term exams.",
                  "Independent literature search that extends mandatory preparation.",
                ].map((method) => (
                  <li key={method} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    {method}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-card p-7 sm:p-9">
              <p className="eyebrow">Tentative deliverable timeline</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">
                Five milestones, each building on the evidence before it.
              </h3>
              <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                {deliverables.map(([when, title, description], index) => (
                  <li
                    key={title}
                    className="rounded-2xl border border-slate-900/8 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-emerald-700 uppercase dark:text-emerald-300">
                        {when}
                      </span>
                      <span className="text-ink-400 font-mono text-[10px]">0{index + 1}</span>
                    </div>
                    <h4 className="mt-3 font-serif text-lg font-semibold">{title}</h4>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-5">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="text-ink-500 dark:text-ink-400 mt-4 text-[11px] leading-5">
                The schedule is tentative. The course brief separately describes reflection
                checkpoints at the ends of Sessions 10 and 20; instructor communication governs
                final timing.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section id="field-lab" aria-labelledby="field-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div
              className="absolute -top-36 -right-24 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-emerald-200 uppercase">
                  05 / Signature field lab
                </p>
                <h2
                  id="field-title"
                  className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
                >
                  Primary evidence or it does not count.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-sm leading-6 text-emerald-50">
                  Teams of up to six study a real company through a live founder, CXO or core-team
                  interview. Websites and reports may provide context, but marks depend on the
                  originality and depth of primary evidence.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-amber-100 uppercase">
                    25 marks
                  </span>
                  <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald-100 uppercase">
                    No email-only interviews
                  </span>
                  <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald-100 uppercase">
                    No secondary-data-only projects
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-12 grid gap-6 md:grid-cols-4">
              <span className={`${styles.projectLine} hidden md:block`} aria-hidden="true" />
              {projectSteps.map(([number, title, description]) => (
                <article key={number} className="relative">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200/25 bg-slate-950 font-mono text-xs font-bold text-emerald-100">
                    {number}
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-50">{description}</p>
                </article>
              ))}
            </div>

            <div className="relative mt-12 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {projectDeliverables.map(([label, description]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-amber-200 uppercase">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-emerald-50">{description}</p>
                </article>
              ))}
            </div>

            <div className="relative mt-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-black/15 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-lg font-semibold">
                  Appendix 1 · Complete project guide
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-100">
                  Report structure, interview protocol, email template and submission rules.
                </p>
              </div>
              <a
                href="https://docs.google.com/document/d/1ma6Pesd4bxjP23ZoDw7guZH5ugQhGfX1WszFMFIp6qY/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-emerald-200 hover:text-white"
              >
                Open the field guide
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="question-bank-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div
            className={`${styles.questionGrid} glass-card overflow-hidden border-emerald-900/10 dark:border-emerald-200/10`}
          >
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <p className="eyebrow">06 / Interview question bank</p>
                <h2
                  id="question-bank-title"
                  className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
                >
                  A bank of 58 field-interview questions.
                </h2>
              </div>
              <p className="text-ink-600 dark:text-ink-300 max-w-2xl text-sm leading-7">
                The interview bank spans resourcefulness, effectuation, dynamic capabilities, frugal
                innovation, entrepreneurial orientation, stakeholders and performance. Use it as a
                diagnostic menu—not a mechanical questionnaire.
              </p>
            </div>

            <div className="grid gap-px border-t border-slate-900/10 bg-slate-900/10 md:grid-cols-2 dark:border-white/10 dark:bg-white/10">
              {interviewQuestionThemes.map((theme, themeIndex) => {
                const offset = interviewQuestionThemes
                  .slice(0, themeIndex)
                  .reduce((sum, item) => sum + item.questions.length, 0);

                return (
                  <details key={theme.title} className="group bg-white/90 dark:bg-[#081426]/95">
                    <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 p-5 marker:hidden sm:p-6">
                      <div>
                        <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-700 uppercase dark:text-emerald-300">
                          {theme.range}
                        </p>
                        <h3 className="mt-2 font-serif text-xl font-semibold">{theme.title}</h3>
                      </div>
                      <span
                        className="text-ink-500 dark:text-ink-300 flex h-8 w-8 items-center justify-center rounded-full border border-slate-900/10 text-xl transition-transform group-open:rotate-45 dark:border-white/10"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <ol className="space-y-4 border-t border-slate-900/10 px-5 py-6 sm:px-6 dark:border-white/10">
                      {theme.questions.map((question, questionIndex) => (
                        <li
                          key={question}
                          className="text-ink-600 dark:text-ink-300 grid grid-cols-[auto_1fr] gap-3 text-xs leading-5"
                        >
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                            {String(offset + questionIndex + 1).padStart(2, "0")}
                          </span>
                          {question}
                        </li>
                      ))}
                    </ol>
                  </details>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="assessment"
        aria-labelledby="assessment-title"
        className="border-y border-slate-900/8 bg-white/35 py-20 backdrop-blur-sm sm:py-28 dark:border-white/8 dark:bg-slate-950/20"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex flex-col items-center lg:items-start">
              <p className="eyebrow self-start">07 / Evidence of learning</p>
              <h2
                id="assessment-title"
                className="mt-4 self-start font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                Five signals. One hundred marks.
              </h2>
              <div
                className={`${styles.assessmentRing} mt-10`}
                role="img"
                aria-label="Assessment allocation totalling 100 marks: quizzes 20, reflection 5, midterm 15, end term 35, field analysis 25"
              >
                <div className={`${styles.assessmentValue} text-center`}>
                  <strong className="block font-serif text-6xl leading-none font-semibold">
                    100
                  </strong>
                  <span className="text-ink-500 dark:text-ink-300 mt-2 block font-mono text-[10px] tracking-[0.16em] uppercase">
                    total marks
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {assessments.map((item, index) => (
                <article
                  key={item.title}
                  className="glass-card grid grid-cols-[auto_1fr] items-center gap-4 p-5 sm:grid-cols-[auto_1fr_auto]"
                >
                  <span
                    className={`${assessmentColours[index]} h-3 w-3 rounded-full`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-5">
                      {item.instrument}
                      <span className="text-ink-400 mx-2" aria-hidden="true">
                        ·
                      </span>
                      {item.alignment}
                    </p>
                  </div>
                  <span className="col-start-2 font-mono text-xs font-bold text-emerald-700 sm:col-start-auto dark:text-emerald-300">
                    {item.marks} marks
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <article className="glass-card p-7">
              <p className="eyebrow">Reflection rubric</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">
                Concepts and critical thinking carry equal weight.
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [
                    "50%",
                    "Concepts & frameworks",
                    "Understand and integrate tools for strategy formulation and execution.",
                  ],
                  [
                    "50%",
                    "Critical thinking",
                    "Demonstrate analytical capability for strategic decision-making.",
                  ],
                ].map(([weight, title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-900/8 bg-white/45 p-5 dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <p className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      {weight}
                    </p>
                    <h4 className="mt-2 font-serif text-lg font-semibold">{title}</h4>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-card p-7">
              <p className="eyebrow">Field-project rubric</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">
                Original evidence, disciplined analysis.
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [
                    "40%",
                    "Framework application",
                    "Integrate strategy concepts, tools and frameworks with the company evidence.",
                  ],
                  [
                    "60%",
                    "Strategic reasoning",
                    "Demonstrate conceptual, analytical and critical-thinking capability.",
                  ],
                ].map(([weight, title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-900/8 bg-white/45 p-5 dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <p className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300">
                      {weight}
                    </p>
                    <h4 className="mt-2 font-serif text-lg font-semibold">{title}</h4>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section aria-labelledby="outcomes-title" className="py-20 sm:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="eyebrow">08 / Capability outcomes</p>
              <h2
                id="outcomes-title"
                className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
              >
                Ten capabilities, from diagnosis to persuasion.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-6">
                CO 1 builds command of formulation and execution frameworks. CO 2 develops
                conceptual, analytical and critical thinking for strategic decisions.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
              {learningObjectives.map((objective, index) => (
                <li
                  key={objective}
                  className="grid grid-cols-[auto_1fr] gap-4 bg-white/80 p-5 dark:bg-[#081426]/92"
                >
                  <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-lg leading-snug font-semibold">{objective}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass-card mt-12 p-7 sm:p-9">
            <p className="eyebrow">PGDM programme outcomes</p>
            <div className="mt-6 grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {programmeOutcomes.map(([code, description]) => (
                <article key={code} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                    {code}
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-xs leading-5">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <aside aria-labelledby="connected-practice-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow">Connected practice</p>
              <h2
                id="connected-practice-title"
                className="mt-4 font-serif text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl"
              >
                Move from AI opportunity to responsible adoption.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">
                The build record and field note extend this course’s work on technology, evidence
                and implementation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/teaching/ai-hackathon"
                className="border-ink-200/80 dark:border-ink-700 group rounded-2xl border p-5 transition hover:border-emerald-400 dark:hover:border-emerald-500"
              >
                <p className="eyebrow">PGDM learning lab</p>
                <h3 className="mt-2 font-serif text-xl font-semibold">AI Mini Hackathon</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                  See how an incoming PGDM cohort turned student problems into testable GenAI
                  prototypes.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Explore the programme
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <a
                href={responsibleAiPost.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink-200/80 dark:border-ink-700 group rounded-2xl border p-5 transition hover:border-emerald-400 dark:hover:border-emerald-500"
              >
                <p className="eyebrow inline-flex items-center gap-2">
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
                  LinkedIn field note
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold">{responsibleAiPost.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                  {responsibleAiPost.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Read on LinkedIn
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </aside>

      <section id="references" aria-labelledby="references-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card overflow-hidden">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.36fr_0.64fr]">
              <div>
                <p className="eyebrow">09 / References</p>
                <h2
                  id="references-title"
                  className="mt-4 font-serif text-4xl leading-tight font-semibold tracking-[-0.03em]"
                >
                  Research behind the course design.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">
                  Inline citations connect the learning design to established work on strategy, the
                  case method and assurance of learning.
                </p>
              </div>
              <ol className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {twoYearMba.references.map((reference) => (
                  <li
                    id={`reference-${reference.id}`}
                    key={reference.id}
                    className="text-ink-600 dark:text-ink-300 scroll-mt-28 text-xs leading-5"
                  >
                    <span className="text-ink-900 dark:text-ink-50 mr-2 font-mono font-bold">
                      [{reference.id}]
                    </span>
                    {reference.author} ({reference.year}).{" "}
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
                    >
                      {reference.title}
                    </a>
                    . {reference.publisher}.
                  </li>
                ))}
              </ol>
            </div>

            <details className="group border-t border-slate-900/10 dark:border-white/10">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-5 px-7 py-6 marker:hidden sm:px-10">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-[0.15em] text-emerald-700 uppercase dark:text-emerald-300">
                    Complete course reading list
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm">
                    Core textbook plus all 22 recommended books, cases and articles in the teaching
                    plan.
                  </p>
                </div>
                <span
                  className="text-ink-500 dark:text-ink-300 flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 text-xl transition-transform group-open:rotate-45 dark:border-white/10"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <ol className="grid gap-x-8 gap-y-4 border-t border-slate-900/10 px-7 py-7 sm:px-10 md:grid-cols-2 dark:border-white/10">
                {courseReadings.map((reading, index) => (
                  <li
                    key={reading}
                    className="text-ink-600 dark:text-ink-300 grid grid-cols-[auto_1fr] gap-3 text-xs leading-5"
                  >
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {reading}
                  </li>
                ))}
              </ol>
            </details>

            <div className="flex flex-col gap-4 border-t border-slate-900/10 bg-slate-950/[0.025] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 dark:border-white/10 dark:bg-white/[0.025]">
              <p className="text-ink-600 dark:text-ink-300 text-sm">
                Looking for the accelerated executive-format course?
              </p>
              <Link
                href="/teaching/1-year-mba"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300"
              >
                Explore the 1-Year MBA
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
