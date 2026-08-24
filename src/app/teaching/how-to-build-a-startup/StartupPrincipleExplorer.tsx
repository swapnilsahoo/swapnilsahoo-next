"use client";

import { useState } from "react";

import { startupPrinciples } from "@/features/teaching/data/startup-building";

export function StartupPrincipleExplorer() {
  const [activeId, setActiveId] = useState<(typeof startupPrinciples)[number]["id"]>(
    startupPrinciples[0].id
  );
  const active =
    startupPrinciples.find((principle) => principle.id === activeId) ?? startupPrinciples[0];

  return (
    <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-2xl border bg-white dark:bg-ink-950">
      <div
        role="tablist"
        aria-label="Five ways of thinking for early founders"
        className="border-ink-200/80 dark:border-ink-700 grid grid-cols-1 gap-1 border-b p-2 sm:grid-cols-5"
      >
        {startupPrinciples.map((principle) => (
          <button
            key={principle.id}
            type="button"
            role="tab"
            id={`principle-tab-${principle.id}`}
            aria-selected={principle.id === activeId}
            aria-controls={`principle-panel-${principle.id}`}
            onClick={() => setActiveId(principle.id)}
            className={`focus-visible:ring-brand-500 min-h-[4.5rem] rounded-xl px-3 py-3 text-left text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
              principle.id === activeId
                ? "bg-ink-950 text-white dark:bg-white dark:text-slate-950"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-wider opacity-70">
              {principle.number} / 5
            </span>
            <span className="mt-1 block text-sm">{principle.name}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`principle-panel-${active.id}`}
        aria-labelledby={`principle-tab-${active.id}`}
        className="p-5 sm:p-8"
      >
        <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{active.name}</h3>
        <p className="text-ink-700 dark:text-ink-200 mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
          {active.plainEnglish}
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="border-ink-200/80 dark:border-ink-700 rounded-xl bg-amber-50/70 p-5 dark:bg-amber-400/[0.06]">
            <p className="eyebrow mb-2">What this looks like</p>
            <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed italic">
              {active.example}
            </p>
          </div>
          <div className="from-ink-950 to-brand-900 rounded-xl bg-gradient-to-br p-5 text-white">
            <p className="font-mono text-[10px] tracking-[0.16em] text-blue-300 uppercase">
              Try this
            </p>
            <p className="mt-2 text-sm leading-relaxed text-blue-50">{active.tryThis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
