"use client";

import { useState } from "react";

import { guesstimates } from "@/features/placements/data/guesstimates";
import { IssueTree } from "@/features/placements/components/IssueTree";

export function GuesstimateExplorer() {
  const [activeId, setActiveId] = useState<(typeof guesstimates)[number]["id"]>(
    guesstimates[0].id
  );
  const active = guesstimates.find((item) => item.id === activeId) ?? guesstimates[0];

  return (
    <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-2xl border bg-white dark:bg-ink-950">
      <div
        role="tablist"
        aria-label="Worked guesstimates"
        className="border-ink-200/80 dark:border-ink-700 grid grid-cols-1 gap-1 border-b p-2 sm:grid-cols-3"
      >
        {guesstimates.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`guesstimate-tab-${item.id}`}
            aria-selected={item.id === activeId}
            aria-controls={`guesstimate-panel-${item.id}`}
            onClick={() => setActiveId(item.id)}
            className={`focus-visible:ring-brand-500 min-h-[4.5rem] rounded-xl px-3 py-3 text-left text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
              item.id === activeId
                ? "bg-ink-950 text-white dark:bg-white dark:text-slate-950"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-wider opacity-70">
              {item.number} / {guesstimates.length} · {item.approach}
            </span>
            <span className="mt-1 block text-sm">{item.question}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`guesstimate-panel-${active.id}`}
        aria-labelledby={`guesstimate-tab-${active.id}`}
        className="p-5 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
            {active.question}
          </h3>
          <p className="tag">{active.approach}</p>
        </div>

        <div className="mt-8">
          <p className="eyebrow mb-4 text-center">The decomposition</p>
          <IssueTree
            root={active.tree.root}
            rootFormula={active.tree.rootFormula}
            branches={active.tree.branches}
          />
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {active.steps.map((step, index) => (
            <li key={step.label} className="glass-card p-5">
              <span className="bg-brand-600 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] text-white">
                {index + 1}
              </span>
              <h4 className="mt-3 font-serif text-lg font-semibold">{step.label}</h4>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="from-ink-950 to-brand-900 rounded-2xl bg-gradient-to-br p-6 text-white">
            <p className="font-mono text-[10px] tracking-[0.16em] text-blue-300 uppercase">
              Final answer
            </p>
            <p className="mt-2 font-serif text-xl font-semibold">{active.finalAnswer}</p>
          </div>
          <div className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-6">
            <p className="eyebrow mb-2">Sanity-check habit</p>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              {active.sanityCheck}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
