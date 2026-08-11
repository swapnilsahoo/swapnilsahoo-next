import Link from "next/link";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import {
  researchAgenda,
  researchBranches,
  researchCollaborationHref,
  thesisFoundation,
} from "@/features/research/data/researchAgenda";
import type { ResearchIcon } from "@/features/research/types";

import { CollaborationInvite } from "./CollaborationInvite";
import { ResearchBranchNav } from "./ResearchBranchNav";

const branchIcons: Record<ResearchIcon, typeof BricolageIcon> = {
  bricolage: BricolageIcon,
  compass: CompassIcon,
  spark: SparkIcon,
  network: NetworkIcon,
};

const researchLogic = [
  {
    index: "01",
    eyebrow: "Constraint",
    title: "Resources and institutions are incomplete",
    items: ["Material scarcity", "Institutional voids", "Uneven support"],
  },
  {
    index: "02",
    eyebrow: "Mobilisation",
    title: "People work with what is actually available",
    items: ["Cognitive strengths", "Bricolage", "Family coordination"],
  },
  {
    index: "03",
    eyebrow: "Strategic possibility",
    title: "Action can widen the future choice set",
    items: ["Entrepreneurial agency", "Effectuation", "Frugal innovation"],
  },
] as const;

export function ResearchHub() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-ink-500 mb-5 flex gap-2 text-xs">
            <Link href="/" className="hover:text-brand-700 dark:hover:text-brand-300 transition">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Research
            </span>
          </nav>

          <div
            data-page-hero="research"
            className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[#111827] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_0.38fr] lg:items-end">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] text-blue-200 uppercase">
                  {researchAgenda.eyebrow}
                </p>
                <h1 className="display mt-5 max-w-4xl text-5xl font-semibold sm:text-7xl">
                  {researchAgenda.title}
                </h1>
                <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {researchAgenda.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#branches"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                  >
                    Explore the four branches
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={researchCollaborationHref("entrepreneurial resourcefulness")}
                    className="inline-flex min-h-11 items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                  >
                    Start a research conversation
                  </a>
                </div>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15">
                <div className="bg-slate-950/50 p-5">
                  <dt className="font-mono text-[10px] tracking-wider text-white/55 uppercase">
                    Connected branches
                  </dt>
                  <dd className="mt-2 font-serif text-4xl font-semibold text-blue-200">04</dd>
                </div>
                <div className="bg-slate-950/50 p-5">
                  <dt className="font-mono text-[10px] tracking-wider text-white/55 uppercase">
                    Doctoral foundation
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">Submitted · 2024</dd>
                </div>
                <div className="bg-slate-950/50 p-5">
                  <dt className="font-mono text-[10px] tracking-wider text-white/55 uppercase">
                    Status
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">Collaboration welcome</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </header>

      <Container className="max-w-6xl pb-10">
        <ResearchBranchNav />
      </Container>

      <section aria-labelledby="logic-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Unifying logic</p>
              <h2 id="logic-title" className="display text-4xl font-semibold sm:text-5xl">
                Resourcefulness is action, not inventory.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              The programme follows a shared mechanism: constraint shapes the action field; people
              mobilise cognitive, material and relational resources; those actions may build new
              capabilities and strategic possibilities. Each branch tests a different part of that
              sequence.
            </p>
          </div>

          <ol className="grid gap-4 lg:grid-cols-3">
            {researchLogic.map((stage, index) => (
              <li key={stage.eyebrow} className="relative glass-card p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">{stage.eyebrow}</p>
                  <span className="font-mono text-xs text-brand-700 dark:text-brand-300">
                    {stage.index}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{stage.title}</h3>
                <ul className="text-ink-600 dark:text-ink-300 mt-5 space-y-2 text-sm">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand-600 dark:text-brand-300">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                {index < researchLogic.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="text-brand-600 dark:text-brand-300 absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white text-sm shadow-sm lg:grid dark:bg-[#11161e]"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="branches" aria-labelledby="branches-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Research branches</p>
            <h2 id="branches-title" className="display text-4xl font-semibold sm:text-5xl">
              Four ways into one larger question.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              These pages are an open research map—not a repository of unpublished papers. Each
              branch separates what the thesis contributes from what still needs to be tested.
            </p>
          </div>

          <ol className="grid gap-5 md:grid-cols-2">
            {researchBranches.map((branch) => {
              const Icon = branchIcons[branch.icon];

              return (
                <li key={branch.slug}>
                  <Link
                    href={`/research/${branch.slug}`}
                    className="glass-card group flex h-full flex-col p-6 transition hover:border-brand-300 sm:p-8 dark:hover:border-brand-600"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 grid h-11 w-11 place-items-center rounded-xl">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="tag tag-ink">Branch {branch.index}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold sm:text-3xl">
                      {branch.title}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                      {branch.summary}
                    </p>
                    <p className="text-ink-500 mt-5 font-mono text-[11px] tracking-wide uppercase">
                      {branch.status}
                    </p>
                    <span className="text-brand-700 dark:text-brand-300 mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold group-hover:gap-3">
                      Enter this research branch
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section id="doctoral-foundation" aria-labelledby="thesis-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="overflow-hidden rounded-2xl bg-[#111827] p-6 text-white sm:p-9">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-200">
                  <GraduationCapIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-blue-200 uppercase">
                    {thesisFoundation.eyebrow}
                  </p>
                  <h2 id="thesis-title" className="mt-4 font-serif text-3xl font-semibold">
                    {thesisFoundation.title}
                  </h2>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-300">
                {thesisFoundation.description}
              </p>
              <dl className="mt-7 grid gap-4 border-t border-white/15 pt-6 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                    Status
                  </dt>
                  <dd className="mt-2 text-slate-200">{thesisFoundation.status}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                    Institution
                  </dt>
                  <dd className="mt-2 text-slate-200">{thesisFoundation.institution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                    Manuscript
                  </dt>
                  <dd className="mt-2 text-slate-200">{thesisFoundation.manuscriptDate}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-wide text-white/50 uppercase">
                    Submitted
                  </dt>
                  <dd className="mt-2 text-slate-200">{thesisFoundation.submittedDate}</dd>
                </div>
              </dl>
              <a
                href={researchCollaborationHref("the doctoral thesis on entrepreneurial resourcefulness")}
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                Request the thesis
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-xs leading-relaxed text-white/55">
                The full thesis is available by request. Unpublished essay manuscripts are not
                hosted on this website.
              </p>
            </article>

            <div className="grid gap-5">
              <article className="glass-card p-6 sm:p-8">
                <p className="eyebrow">Thesis committee</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">Guidance behind the work</h3>
                <ul className="mt-6 divide-y divide-slate-200 dark:divide-slate-700">
                  {thesisFoundation.committee.map((member) => (
                    <li key={member.name} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-ink-500 mt-1 text-xs">{member.role}</p>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="glass-card p-6 sm:p-8">
                <p className="eyebrow">Acknowledgement</p>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                  {thesisFoundation.acknowledgement}
                </p>
              </article>
            </div>
          </div>

          <article className="glass-card mt-6 p-6 sm:p-8">
            <p className="eyebrow">Foundational questions</p>
            <ol className="mt-5 grid gap-4 lg:grid-cols-3">
              {thesisFoundation.questions.map((question, index) => (
                <li key={question} className="bg-ink-50 dark:bg-ink-800 rounded-xl p-5">
                  <span className="font-mono text-xs text-brand-700 dark:text-brand-300">
                    0{index + 1}
                  </span>
                  <p className="mt-3 font-serif text-lg font-semibold leading-snug">{question}</p>
                </li>
              ))}
            </ol>
          </article>

          <details className="glass-card mt-6 p-6 sm:p-8">
            <summary className="min-h-11 cursor-pointer font-semibold">Suggested thesis citation</summary>
            <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-4xl text-sm leading-relaxed">
              {thesisFoundation.citation}
            </p>
          </details>
        </Container>
      </section>

      <Container className="max-w-6xl py-14 sm:py-20">
        <CollaborationInvite
          subject="entrepreneurial resourcefulness"
          description={researchAgenda.collaboration}
        />
        <p className="text-ink-500 mt-5 text-xs leading-relaxed">
          Source note: the summaries on these pages are grounded in the submitted 2024 doctoral
          thesis. They distinguish thesis evidence, conceptual propositions and future questions;
          no unpublished paper files are distributed here.
        </p>
      </Container>
    </main>
  );
}
