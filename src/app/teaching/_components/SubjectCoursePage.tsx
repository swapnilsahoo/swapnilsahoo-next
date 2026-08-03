import Link from "next/link";
import Image from "next/image";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

export type SubjectReference = {
  id: number;
  author: string;
  year: string;
  title: string;
  publisher: string;
  href: string;
};

export type SubjectPrinciple = {
  title: string;
  description: string;
  citations: readonly number[];
};

export type SubjectLearningLoopStep = {
  label: string;
  title: string;
  description: string;
};

export type SubjectSession = {
  number: string;
  phase: string;
  title: string;
  question: string;
  topics: readonly string[];
  activities: readonly string[];
  artifact: string;
  citations: readonly number[];
};

export type SubjectPracticeStudio = {
  title: string;
  description: string;
  evidence: string;
};

export type SubjectAssessment = {
  weight: string;
  title: string;
  description: string;
  method?: string;
};

export type SubjectSafeguard = {
  title: string;
  description: string;
  citations?: readonly number[];
};

export type SubjectCourseConfig = {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  metadata: readonly {
    label: string;
    value: string;
  }[];
  inquiry: {
    title: string;
    introduction: string;
    socraticQuestions: readonly [string, string, string, string];
    firstPrinciplesQuestions: readonly [string, string, string, string];
  };
  promise: {
    title: string;
    description: string;
  };
  fieldStory?: {
    eyebrow: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    moments: readonly [
      { title: string; description: string },
      { title: string; description: string },
    ];
  };
  principles: readonly [SubjectPrinciple, SubjectPrinciple, SubjectPrinciple];
  learningLoop: {
    name: string;
    title: string;
    description: string;
    steps: readonly SubjectLearningLoopStep[];
  };
  learningOutcomes: readonly [string, string, string, string];
  sessions: readonly SubjectSession[];
  studios: readonly SubjectPracticeStudio[];
  assessments: readonly SubjectAssessment[];
  safeguards: readonly SubjectSafeguard[];
  evidenceNote?: {
    title: string;
    description: string;
    indicators?: readonly string[];
  };
  references: readonly SubjectReference[];
  siblingHref: string;
  siblingLabel: string;
};

function Citations({ ids }: { ids: readonly number[] }) {
  if (ids.length === 0) {
    return null;
  }

  return (
    <span className="ml-1 whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={`#reference-${id}`}
          aria-label={`See reference ${id}`}
          className="text-brand-700 dark:text-brand-300 ml-0.5 align-super text-[10px] font-bold hover:underline"
        >
          [{id}]
        </a>
      ))}
    </span>
  );
}

export function SubjectCoursePage({ config }: { config: SubjectCourseConfig }) {
  const studioIcons = [CompassIcon, NetworkIcon, BricolageIcon, GraduationCapIcon] as const;

  return (
    <main id="main-content" tabIndex={-1} className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div
          data-page-hero="course"
          className="from-ink-950 via-brand-950 to-ink-900 relative isolate mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.9)] sm:rounded-[2.5rem]"
        >
          <div
            className="bg-brand-500/20 absolute -top-40 -left-28 -z-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="bg-accent-400/15 absolute -right-32 -bottom-44 -z-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [mask-image:linear-gradient(115deg,#000,transparent_78%)] [background-size:48px_48px] opacity-20"
            aria-hidden="true"
          />

          <div className="grid min-h-[650px] items-end gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:px-16 lg:py-20">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-blue-100 uppercase backdrop-blur-sm">
                {config.hero.eyebrow}
              </span>
              <h1 className="mt-9 max-w-5xl font-serif text-[clamp(3.5rem,7vw,7.8rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
                {config.hero.title}
                <span className="from-brand-200 to-accent-200 mt-2 block bg-gradient-to-r via-white bg-clip-text pb-2 font-normal text-transparent italic">
                  {config.hero.accent}
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {config.hero.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none"
                >
                  View the complete course
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#assessment"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none"
                >
                  See evidence of learning
                </a>
              </div>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {config.metadata.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md"
                >
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-serif text-xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <Container className="max-w-6xl">
        <nav
          aria-label="On this subject page"
          className="nav-glass my-6 flex items-center gap-4 overflow-x-auto rounded-xl px-4 py-2 lg:my-8 lg:justify-between"
        >
          <p className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            Course map
          </p>
          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold">
            {[
              ["Promise", "#promise"],
              ["Learning loop", "#learning-loop"],
              ["Outcomes", "#outcomes"],
              ["Sessions", "#journey"],
              ["Practice", "#practice"],
              ["Assessment", "#assessment"],
              ["Integrity", "#integrity"],
              ["References", "#references"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-3 py-2 whitespace-nowrap transition hover:bg-blue-600/8 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </Container>

      <InquiryPrelude
        id="course-inquiry"
        title={config.inquiry.title}
        introduction={config.inquiry.introduction}
        socraticQuestions={config.inquiry.socraticQuestions}
        firstPrinciplesQuestions={config.inquiry.firstPrinciplesQuestions}
      />

      <section id="promise" aria-labelledby="promise-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Learning promise</p>
              <h2
                id="promise-title"
                className="display text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
              >
                {config.promise.title}
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-xl text-sm leading-7">
                {config.promise.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {config.principles.map((principle, index) => (
                <article key={principle.title} className="glass-card p-6">
                  <span className="text-brand-600 dark:text-brand-300 font-mono text-[10px] font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold">{principle.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {principle.description}
                    <Citations ids={principle.citations} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {config.fieldStory ? (
        <section aria-labelledby="field-story-title" className="pb-16 sm:pb-24">
          <Container className="max-w-6xl">
            <figure className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white dark:border-white/10 dark:bg-slate-950">
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src={config.fieldStory.image.src}
                  alt={config.fieldStory.image.alt}
                  width={config.fieldStory.image.width}
                  height={config.fieldStory.image.height}
                  sizes="(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="grid gap-8 border-t border-slate-900/10 px-6 py-8 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-10 dark:border-white/10">
                <div>
                  <p className="eyebrow mb-3">{config.fieldStory.eyebrow}</p>
                  <h2
                    id="field-story-title"
                    className="display text-3xl leading-tight font-semibold text-balance sm:text-5xl"
                  >
                    {config.fieldStory.title}
                  </h2>
                  <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-xl text-sm leading-7">
                    {config.fieldStory.description}
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {config.fieldStory.moments.map((moment, index) => (
                    <div key={moment.title} className="border-l border-amber-400/70 pl-5">
                      <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
                        Moment {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-serif text-xl font-semibold">{moment.title}</h3>
                      <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                        {moment.description}
                      </p>
                    </div>
                  ))}
                </div>
              </figcaption>
            </figure>
          </Container>
        </section>
      ) : null}

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="learning-loop" aria-labelledby="learning-loop-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / {config.learningLoop.name}</p>
            <h2
              id="learning-loop-title"
              className="display text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
            >
              {config.learningLoop.title}
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
              {config.learningLoop.description}
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {config.learningLoop.steps.map((step, index) => (
              <li key={`${step.label}-${step.title}`} className="glass-card relative p-6">
                <span
                  className="bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200 flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow mt-5">{step.label}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="outcomes" aria-labelledby="outcomes-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-950 relative overflow-hidden rounded-[2rem] bg-gradient-to-br px-6 py-10 text-white shadow-xl shadow-blue-950/15 sm:px-10 sm:py-14">
            <div
              className="bg-accent-400/12 absolute -right-24 -bottom-28 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-[0.56fr_1.44fr]">
              <div>
                <SparkIcon className="h-7 w-7 text-blue-200" aria-hidden="true" />
                <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  03 / Learning outcomes
                </p>
                <h2 id="outcomes-title" className="mt-3 font-serif text-4xl font-semibold">
                  What learners should be able to do.
                </h2>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {config.learningOutcomes.map((outcome, index) => (
                  <li
                    key={outcome}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <span className="font-mono text-[10px] font-bold text-blue-200">
                      LO-{index + 1}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-100">{outcome}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section id="journey" aria-labelledby="journey-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Complete session sequence</p>
              <h2
                id="journey-title"
                className="display max-w-3xl text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
              >
                How each stage builds on the last.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 max-w-md text-sm leading-6">
              Open any stage to inspect its question, coverage, learning activity and evidence of
              completion.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
            {config.sessions.map((session, index) => (
              <details
                key={session.number}
                open={index === 0}
                className="glass-card group overflow-hidden"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 p-5 marker:hidden sm:p-6">
                  <span className="bg-ink-950 dark:bg-brand-600 flex h-11 w-11 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white">
                    {session.number}
                  </span>
                  <div>
                    <p className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-[0.14em] uppercase">
                      {session.phase}
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
                  <div className="bg-brand-50/70 dark:bg-brand-950/45 rounded-2xl p-4">
                    <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-blue-700 uppercase dark:text-blue-300">
                      Driving question
                    </p>
                    <p className="text-ink-900 dark:text-ink-50 mt-2 font-serif text-lg leading-7 font-semibold">
                      {session.question}
                      <Citations ids={session.citations} />
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                        Topics & lenses
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
                      <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                        Learning in action
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {session.activities.map((activity) => (
                          <li
                            key={activity}
                            className="text-ink-700 dark:text-ink-200 flex gap-3 text-sm leading-6"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-900/10 pt-5 dark:border-white/10">
                    <p className="text-ink-500 dark:text-ink-400 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                      Evidence / output
                    </p>
                    <p className="text-ink-800 dark:text-ink-100 mt-2 text-sm leading-6">
                      {session.artifact}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="practice" aria-labelledby="practice-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / Practice studios</p>
            <h2
              id="practice-title"
              className="display text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
            >
              Practice produces work that can be reviewed.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
              Each studio asks learners to take a concrete action and submit evidence of what they
              did.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {config.studios.map((studio, index) => {
              const Icon = studioIcons[index % studioIcons.length];

              return (
                <article key={studio.title} className="glass-card p-6">
                  <Icon className="text-brand-600 dark:text-brand-300 h-6 w-6" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-xl font-semibold">{studio.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {studio.description}
                  </p>
                  <p className="text-brand-700 dark:text-brand-300 mt-5 font-mono text-[10px] font-bold tracking-[0.12em] uppercase">
                    Evidence · {studio.evidence}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="assessment"
        aria-labelledby="assessment-title"
        className="bg-slate-950 py-16 text-white sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                06 / Evidence of learning
              </p>
              <h2
                id="assessment-title"
                className="mt-4 font-serif text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
              >
                Assessment built around the work.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
                Learners are assessed through preparation, action, reflection and evidence from
                several tasks—not a single test.
              </p>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {config.assessments.map((assessment) => (
                <li
                  key={`${assessment.weight}-${assessment.title}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-blue-200 uppercase">
                    {assessment.weight}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{assessment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{assessment.description}</p>
                  {assessment.method ? (
                    <p className="mt-4 font-mono text-[10px] tracking-[0.12em] text-slate-400 uppercase">
                      Method · {assessment.method}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="integrity" aria-labelledby="integrity-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">07 / Safeguards & integrity</p>
              <h2
                id="integrity-title"
                className="display text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl"
              >
                Clear boundaries for responsible work.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-6 text-sm leading-7">
                Clear boundaries protect people, learning quality and the legitimacy of the evidence
                produced.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {config.safeguards.map((safeguard, index) => (
                <li key={safeguard.title} className="glass-card p-6">
                  <span className="text-brand-600 dark:text-brand-300 font-mono text-[10px] font-bold">
                    G-{String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{safeguard.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {safeguard.description}
                    <Citations ids={safeguard.citations ?? []} />
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {config.evidenceNote ? (
            <aside className="border-brand-200 bg-brand-50/65 dark:border-brand-800 dark:bg-brand-950/35 mt-10 rounded-3xl border p-7 sm:p-9">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="eyebrow mb-3">Measurement note</p>
                  <h3 className="font-serif text-2xl font-semibold">{config.evidenceNote.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {config.evidenceNote.description}
                  </p>
                </div>
                {config.evidenceNote.indicators?.length ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {config.evidenceNote.indicators.map((indicator) => (
                      <li
                        key={indicator}
                        className="border-brand-100 text-ink-700 dark:border-brand-900 dark:text-ink-200 rounded-2xl border bg-white/75 p-4 text-sm leading-6 dark:bg-slate-950/45"
                      >
                        {indicator}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </aside>
          ) : null}
        </Container>
      </section>

      <section id="references" aria-labelledby="references-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card p-7 sm:p-10">
            <div className="grid gap-9 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="eyebrow mb-3">08 / References</p>
                <h2 id="references-title" className="display text-4xl font-semibold">
                  Research behind the design.
                </h2>
              </div>
              <ol className="space-y-4">
                {config.references.map((reference) => (
                  <li
                    id={`reference-${reference.id}`}
                    key={reference.id}
                    className="text-ink-600 dark:text-ink-300 scroll-mt-28 text-sm leading-7"
                  >
                    <span className="text-ink-900 dark:text-ink-50 mr-2 font-mono font-semibold">
                      [{reference.id}]
                    </span>
                    {reference.author} ({reference.year}).{" "}
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 dark:text-brand-300 font-semibold hover:underline"
                    >
                      {reference.title}
                    </a>
                    . {reference.publisher}.
                  </li>
                ))}
              </ol>
            </div>

            <div className="hr-fade my-8" />
            <Link
              href={config.siblingHref}
              className="text-brand-700 dark:text-brand-300 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Continue to {config.siblingLabel}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
