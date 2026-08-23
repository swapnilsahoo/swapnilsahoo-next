"use client";

import { useState } from "react";

import { caseFrameworks } from "@/features/placements/data/case-frameworks";
import { IssueTree } from "@/features/placements/components/IssueTree";

export function CaseFrameworkExplorer() {
  const [activeId, setActiveId] = useState<(typeof caseFrameworks)[number]["id"]>(
    caseFrameworks[0].id
  );
  const active = caseFrameworks.find((framework) => framework.id === activeId) ?? caseFrameworks[0];

  return (
    <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-2xl border bg-white dark:bg-ink-950">
      <div
        role="tablist"
        aria-label="Case frameworks"
        className="border-ink-200/80 dark:border-ink-700 grid grid-cols-2 gap-1 border-b p-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {caseFrameworks.map((framework) => (
          <button
            key={framework.id}
            type="button"
            role="tab"
            id={`framework-tab-${framework.id}`}
            aria-selected={framework.id === activeId}
            aria-controls={`framework-panel-${framework.id}`}
            onClick={() => setActiveId(framework.id)}
            className={`focus-visible:ring-brand-500 min-h-[4.5rem] rounded-xl px-3 py-3 text-left text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
              framework.id === activeId
                ? "bg-ink-950 text-white dark:bg-white dark:text-slate-950"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-wider opacity-70">
              {framework.number} / 6
            </span>
            <span className="mt-1 block text-sm">{framework.name}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`framework-panel-${active.id}`}
        aria-labelledby={`framework-tab-${active.id}`}
        className="p-5 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">When to reach for it</p>
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
              {active.openingQuestion}
            </h3>
          </div>
        </div>
        <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-relaxed">
          {active.whenToUse}
        </p>

        {active.tree ? (
          <div className="mt-8">
            <p className="eyebrow mb-4 text-center">The structure</p>
            <IssueTree
              root={active.tree.root}
              rootFormula={active.tree.rootFormula}
              branches={active.tree.branches}
            />
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Questions that keep you on track</p>
            <ul className="grid gap-3">
              {active.guidingQuestions.map((question) => (
                <li
                  key={question}
                  className="border-ink-200/80 dark:border-ink-700 text-ink-700 dark:text-ink-200 rounded-xl border p-4 text-sm leading-relaxed"
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Where candidates go wrong</p>
            <ul className="grid gap-3">
              {active.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                    {mistake}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-ink-200/80 dark:border-ink-700 mt-8 rounded-xl bg-amber-50/70 p-5 dark:bg-amber-400/[0.06]">
          <p className="eyebrow mb-2">A short illustrative example</p>
          <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed italic">
            {active.miniExample}
          </p>
        </div>
      </div>
    </div>
  );
}
