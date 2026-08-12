"use client";

import { useState } from "react";

import { sixQFramework } from "@/features/placements/data/industry-analysis";

export function FrameworkExplorer() {
  const [activeId, setActiveId] = useState<(typeof sixQFramework)[number]["id"]>(
    sixQFramework[0].id
  );
  const active = sixQFramework.find((module) => module.id === activeId) ?? sixQFramework[0];

  return (
    <div className="border-ink-200/80 dark:border-ink-700 overflow-hidden rounded-2xl border bg-white dark:bg-ink-950">
      <div
        role="tablist"
        aria-label="The six-question framework"
        className="border-ink-200/80 dark:border-ink-700 grid grid-cols-2 gap-1 border-b p-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {sixQFramework.map((module) => (
          <button
            key={module.id}
            type="button"
            role="tab"
            id={`sixq-tab-${module.id}`}
            aria-selected={module.id === activeId}
            aria-controls={`sixq-panel-${module.id}`}
            onClick={() => setActiveId(module.id)}
            className={`focus-visible:ring-brand-500 min-h-[4.5rem] rounded-xl px-3 py-3 text-left text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
              module.id === activeId
                ? "bg-ink-950 text-white dark:bg-white dark:text-slate-950"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-wider opacity-70">
              {module.number} / 6
            </span>
            <span className="mt-1 block text-sm">{module.question}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`sixq-panel-${active.id}`}
        aria-labelledby={`sixq-tab-${active.id}`}
        className="p-5 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">{active.lens}</p>
            <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{active.question}</h3>
          </div>
          <p className="tag">{active.decisionOutput}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Questions you must answer</p>
            <ul className="grid gap-3">
              {active.coreQuestions.map((question) => (
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
            <p className="eyebrow mb-3">Exactly what to do</p>
            <ol className="grid gap-3">
              {active.whatToDo.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="bg-brand-600 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] text-white">
                    {index + 1}
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-ink-200/80 dark:border-ink-700 mt-8 grid gap-6 border-t pt-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-3">Required exhibits</p>
            <div className="flex flex-wrap gap-2">
              {active.requiredExhibits.map((exhibit) => (
                <span key={exhibit} className="tag tag-ink">
                  {exhibit}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-amber-50/70 p-5 dark:bg-amber-400/[0.06]">
            <p className="eyebrow mb-2">World-class example</p>
            <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed italic">
              {active.worldClassExample}
            </p>
            {active.researchFoundation ? (
              <p className="text-ink-500 mt-3 text-xs leading-relaxed">
                {active.researchFoundation}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
