"use client";

import { useMemo, useState, type ReactNode } from "react";

import { ValuedTree } from "@/features/placements/components/ValuedTree";
import { guesstimates } from "@/features/placements/data/guesstimates";
import type { Assumption, CalcLine } from "@/features/placements/data/case-primitives";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;
type DifficultyFilter = (typeof DIFFICULTIES)[number];

const BASIS_LABEL: Record<Assumption["basis"], string> = {
  "census-anchor": "Census anchor",
  "published-benchmark": "Published benchmark",
  "physical-constant": "Physical constant",
  "observed-behaviour": "Observed behaviour",
  "structural-logic": "Structural logic",
  "declared-judgement": "Declared judgement",
};

const CONFIDENCE_CLASS: Record<Assumption["confidence"], string> = {
  anchor: "border-emerald-600/25 text-emerald-700 dark:text-emerald-400",
  defensible: "border-blue-600/25 text-blue-700 dark:text-blue-300",
  judgement: "border-amber-600/30 text-amber-700 dark:text-amber-300",
  shaky: "border-rose-600/30 text-rose-700 dark:text-rose-300",
};

function SectionTitle({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="text-ink-400 dark:text-ink-500 font-mono text-[11px]">{n}</span>
      <h4 className="font-serif text-xl font-semibold">{children}</h4>
    </div>
  );
}

function CalcTable({ lines, caption }: { lines: readonly CalcLine[]; caption: string }) {
  return (
    <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-ink-50 dark:bg-white/[0.04]">
            <tr>
              <th
                scope="col"
                className="text-ink-500 dark:text-ink-400 px-3 py-2 font-mono text-[10px] tracking-wider uppercase"
              >
                Step
              </th>
              <th
                scope="col"
                className="text-ink-500 dark:text-ink-400 px-3 py-2 font-mono text-[10px] tracking-wider uppercase"
              >
                Working
              </th>
              <th
                scope="col"
                className="text-ink-500 dark:text-ink-400 px-3 py-2 text-right font-mono text-[10px] tracking-wider uppercase"
              >
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-ink-200/70 dark:divide-ink-700 divide-y">
            {lines.map((line) => (
              <tr key={line.id} className="align-top">
                <td className="px-3 py-3">
                  <p className="font-medium">{line.label}</p>
                  {line.soWhat ? (
                    <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs leading-relaxed">
                      {line.soWhat}
                    </p>
                  ) : null}
                </td>
                <td className="text-ink-600 dark:text-ink-300 px-3 py-3 font-mono text-xs">
                  {line.display}
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  <span className="font-serif font-semibold">
                    {line.carriedForward ?? line.result.toLocaleString("en-IN")}
                  </span>
                  <span className="text-ink-500 dark:text-ink-400 block text-[11px]">
                    {line.unit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GuesstimateExplorer() {
  const [activeId, setActiveId] = useState(guesstimates[0]?.id ?? "");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");

  const visible = useMemo(
    () => guesstimates.filter((g) => difficulty === "All" || g.difficulty === difficulty),
    [difficulty]
  );

  const active = guesstimates.find((g) => g.id === activeId) ?? guesstimates[0];
  if (!active) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(14rem,18rem)_1fr] xl:grid-cols-[minmax(16rem,20rem)_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <fieldset className="mb-3">
          <legend className="eyebrow mb-2">Filter by difficulty</legend>
          <div className="flex flex-wrap gap-1.5">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={difficulty === level}
                onClick={() => setDifficulty(level)}
                className={`focus-visible:ring-brand-500 min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none ${
                  difficulty === level
                    ? "bg-ink-950 border-ink-950 text-white dark:bg-white dark:text-slate-950"
                    : "border-ink-200 text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-white/5"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="text-ink-500 dark:text-ink-400 mb-2 text-xs">
          {visible.length} of {guesstimates.length} shown
        </p>

        <ul className="border-ink-200/80 dark:border-ink-700 max-h-[28rem] space-y-1 overflow-y-auto rounded-xl border p-1.5 lg:max-h-[34rem]">
          {visible.map((item) => {
            const current = item.id === active.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={current ? "true" : undefined}
                  onClick={() => setActiveId(item.id)}
                  className={`focus-visible:ring-brand-500 w-full rounded-lg px-3 py-2.5 text-left transition focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
                    current
                      ? "bg-ink-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-wider opacity-70">
                    <span>{item.number}</span>
                    <span>{item.difficulty}</span>
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.tabLabel}</span>
                </button>
              </li>
            );
          })}
          {visible.length === 0 ? (
            <li className="text-ink-500 dark:text-ink-400 px-3 py-4 text-sm">
              No guesstimates at that difficulty.
            </li>
          ) : null}
        </ul>
      </div>

      <article className="border-ink-200/80 dark:border-ink-700 dark:bg-ink-950 min-w-0 rounded-2xl border bg-white p-5 sm:p-7">
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag tag-ink">{active.difficulty}</span>
            <span className="tag">{active.routeChoice.chosen}</span>
            <span className="text-ink-500 dark:text-ink-400 text-xs">
              {active.timeboxMinutes} min &middot; {active.archetype.replace(/-/g, " ")}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-balance sm:text-3xl">
            {active.question}
          </h3>
          <p className="border-brand-400 text-ink-700 dark:text-ink-200 mt-4 border-l-2 pl-4 text-sm leading-relaxed">
            {active.teachingPoint}
          </p>
        </header>

        <section className="mt-9">
          <SectionTitle n="01">Define what you are counting</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4">
              <p className="eyebrow mb-1">Counting</p>
              <p className="text-sm leading-relaxed">{active.scope.countingWhat}</p>
              <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs">
                {active.scope.unit} &middot; {active.scope.timeBasis} &middot;{" "}
                {active.scope.geography}
              </p>
            </div>
            <div className="rounded-xl border border-amber-900/15 bg-amber-50/70 p-4 dark:border-amber-100/10 dark:bg-amber-400/[0.05]">
              <p className="mb-1 text-xs font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-200">
                The boundary trap
              </p>
              <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                {active.scope.boundaryTrap}
              </p>
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-1.5">In</p>
              <ul className="text-ink-600 dark:text-ink-300 space-y-1 text-sm">
                {active.scope.included.map((entry) => (
                  <li key={entry} className="flex gap-2">
                    <span aria-hidden="true" className="text-emerald-600 dark:text-emerald-400">
                      +
                    </span>
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-1.5">Out</p>
              <ul className="text-ink-600 dark:text-ink-300 space-y-1 text-sm">
                {active.scope.excluded.map((entry) => (
                  <li key={entry} className="flex gap-2">
                    <span aria-hidden="true" className="text-rose-600 dark:text-rose-400">
                      &minus;
                    </span>
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-9">
          <SectionTitle n="02">Choose a route, and say why</SectionTitle>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="border-brand-300 bg-brand-50/60 dark:border-brand-600/50 dark:bg-brand-900/20 rounded-xl border p-4">
              <p className="eyebrow mb-1">Taking &middot; {active.routeChoice.chosen}</p>
              <p className="text-sm leading-relaxed">{active.routeChoice.why}</p>
            </div>
            <div className="border-ink-200/80 dark:border-ink-700 rounded-xl border border-dashed p-4">
              <p className="eyebrow mb-1">Not taking &middot; {active.routeChoice.rejectedRoute}</p>
              <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                {active.routeChoice.rejectedWhyNot}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-9">
          <SectionTitle n="03">Decompose it</SectionTitle>
          <ValuedTree
            root={active.tree.root}
            rootFormula={active.tree.rootFormula}
            value={active.tree.value}
            branches={active.tree.branches}
          />
        </section>

        <section className="mt-9">
          <SectionTitle n="04">Every assumption, with its defence</SectionTitle>
          <ul className="grid gap-2.5">
            {active.assumptions.map((assumption) => (
              <li
                key={assumption.id}
                className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold">{assumption.lever}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-semibold">{assumption.value}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${CONFIDENCE_CLASS[assumption.confidence]}`}
                    >
                      {assumption.confidence}
                    </span>
                  </div>
                </div>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                  {assumption.defence}
                </p>
                <p className="text-ink-500 dark:text-ink-400 mt-2 font-mono text-[10px] tracking-wide uppercase">
                  {BASIS_LABEL[assumption.basis]}
                </p>
                {assumption.contestedBy ? (
                  <p className="text-ink-500 dark:text-ink-400 border-ink-200/70 dark:border-ink-700 mt-2 border-t pt-2 text-xs leading-relaxed">
                    <span className="font-semibold">If challenged: </span>
                    {assumption.contestedBy}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9">
          <SectionTitle n="05">The arithmetic, line by line</SectionTitle>
          <CalcTable lines={active.calculation} caption={`Calculation for ${active.question}`} />
          <div className="from-ink-950 to-brand-900 mt-4 rounded-2xl bg-gradient-to-br p-5 text-white">
            <p className="font-mono text-[10px] tracking-[0.16em] text-blue-300 uppercase">Answer</p>
            <p className="mt-1.5 font-serif text-xl font-semibold">{active.finalAnswer}</p>
            <p className="mt-2 text-sm text-blue-100">{active.answerBand}</p>
            <p className="mt-1 font-mono text-[11px] text-blue-200">
              Order of magnitude {active.orderOfMagnitude}
            </p>
          </div>
        </section>

        <section className="mt-9">
          <SectionTitle n="06">{active.triangulation.label}</SectionTitle>
          <p className="text-ink-600 dark:text-ink-300 mb-3 text-sm leading-relaxed">
            {active.triangulation.premise}
          </p>
          <CalcTable lines={active.triangulation.lines} caption="Second, independent route" />
          <div className="border-ink-200/80 dark:border-ink-700 mt-3 rounded-xl border p-4">
            <p className="font-serif text-base font-semibold">{active.triangulation.answer}</p>
            <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
              {active.triangulation.verdict}
            </p>
          </div>
        </section>

        <section className="mt-9">
          <SectionTitle n="07">Which lever actually moves the answer</SectionTitle>
          <p className="text-ink-600 dark:text-ink-300 mb-3 text-sm leading-relaxed">
            {active.sensitivity.whyThisLever}
          </p>
          <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Sensitivity of the answer to its shakiest lever
                </caption>
                <thead className="bg-ink-50 dark:bg-white/[0.04]">
                  <tr>
                    {["Scenario", "Lever", "Answer", "vs base"].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="text-ink-500 dark:text-ink-400 px-3 py-2 font-mono text-[10px] tracking-wider uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-ink-200/70 dark:divide-ink-700 divide-y">
                  {active.sensitivity.cases.map((entry) => (
                    <tr key={entry.scenario}>
                      <td className="px-3 py-2.5 font-semibold">{entry.scenario}</td>
                      <td className="text-ink-600 dark:text-ink-300 px-3 py-2.5 font-mono text-xs">
                        {entry.leverValue}
                      </td>
                      <td className="px-3 py-2.5">{entry.answer}</td>
                      <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap">
                        {entry.deltaVsBase}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
            <span className="font-semibold">Breakpoint: </span>
            {active.sensitivity.breakpoint}
          </p>
          <p className="border-brand-400 text-ink-700 dark:text-ink-200 mt-3 border-l-2 pl-4 text-sm leading-relaxed">
            {active.sensitivity.oneLiner}
          </p>
        </section>

        <section className="mt-9">
          <SectionTitle n="08">Sanity checks</SectionTitle>
          <ul className="grid gap-2 sm:grid-cols-2">
            {active.sanityChecks.map((check) => (
              <li
                key={check}
                className="border-ink-200/80 dark:border-ink-700 text-ink-600 dark:text-ink-300 rounded-xl border p-3.5 text-sm leading-relaxed"
              >
                {check}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9">
          <SectionTitle n="09">Where candidates lose marks</SectionTitle>
          <ul className="grid gap-2.5">
            {active.traps.map((trap) => (
              <li
                key={trap.trap}
                className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4"
              >
                <p className="text-sm font-semibold">{trap.trap}</p>
                <p className="text-ink-600 dark:text-ink-300 mt-1.5 text-sm leading-relaxed">
                  {trap.whyItHappens}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-800 dark:text-emerald-300">
                  <span className="font-semibold">Fix: </span>
                  {trap.fix}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9">
          <SectionTitle n="10">What the interviewer asks next</SectionTitle>
          <ul className="grid gap-2.5">
            {active.probes.map((probe) => (
              <li
                key={probe.question}
                className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-4"
              >
                <p className="font-serif text-base font-semibold">{probe.question}</p>
                <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs">
                  Testing: {probe.intent}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-emerald-800 dark:text-emerald-300">
                  <span className="font-semibold">Strong: </span>
                  {probe.goodAnswer}
                </p>
                {probe.weakAnswer ? (
                  <p className="text-ink-500 dark:text-ink-400 mt-1.5 text-sm leading-relaxed">
                    <span className="font-semibold">Weak: </span>
                    {probe.weakAnswer}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
