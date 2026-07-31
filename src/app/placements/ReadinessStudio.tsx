"use client";

import { useState } from "react";

const roleTracks = [
  {
    id: "consulting",
    label: "Consulting",
    title: "Bring structure to ambiguous problems.",
    positioning:
      "Show that you can turn an open-ended business problem into a structured, evidence-led recommendation.",
    evidence: [
      "A case where you diagnosed the root cause",
      "A decision influenced through structured communication",
      "A measurable improvement in business performance",
    ],
    practice:
      "Prepare one profitability case, one market-entry case and a two-minute synthesis of each.",
  },
  {
    id: "techno-functional",
    label: "Techno-functional",
    title: "Connect technology to business value.",
    positioning:
      "Demonstrate technical credibility, process understanding and the ability to translate between client and delivery teams.",
    evidence: [
      "A complex idea explained to a non-technical stakeholder",
      "A changing requirement converted into an executable plan",
      "A technology choice tied to commercial or operational value",
    ],
    practice:
      "Map one end-to-end business process and explain how data, cloud or enterprise platforms improve it.",
  },
  {
    id: "growth",
    label: "Growth & product",
    title: "Connect customer insight to commercial action.",
    positioning:
      "Prove that you can identify a user need, prioritise opportunities and make trade-offs across growth, experience and feasibility.",
    evidence: [
      "A customer insight that changed a decision",
      "An experiment or launch with a clear success metric",
      "A cross-functional trade-off you helped resolve",
    ],
    practice:
      "Diagnose one product funnel, define the north-star metric and propose a testable growth hypothesis.",
  },
] as const;

const readinessItems = [
  "Role thesis: I can explain why this role fits my experience and direction.",
  "Proof CV: Every important claim has an action, scale and outcome.",
  "Story bank: I have six distinct STAR stories with specific evidence.",
  "Business judgment: I can structure an unfamiliar problem aloud.",
  "Company depth: I understand the business model, priorities and role.",
  "Interview finish: I can summarise my answer and ask thoughtful questions.",
] as const;

export function ReadinessStudio() {
  const [activeTrack, setActiveTrack] = useState<(typeof roleTracks)[number]["id"]>(
    roleTracks[0].id
  );
  const [completed, setCompleted] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return readinessItems.map(() => false);
    const stored = window.localStorage.getItem("placement-readiness-checklist");
    if (!stored) return readinessItems.map(() => false);
    try {
      const parsed = JSON.parse(stored) as boolean[];
      return parsed.length === readinessItems.length ? parsed : readinessItems.map(() => false);
    } catch {
      return readinessItems.map(() => false);
    }
  });

  const current = roleTracks.find((track) => track.id === activeTrack) ?? roleTracks[0];
  const score = completed.filter(Boolean).length;

  function toggleItem(index: number) {
    const next = completed.map((item, itemIndex) => (itemIndex === index ? !item : item));
    setCompleted(next);
    window.localStorage.setItem("placement-readiness-checklist", JSON.stringify(next));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="glass-card overflow-hidden p-2">
        <div
          className="border-ink-200/80 dark:border-ink-700 grid grid-cols-3 gap-1 border-b p-2"
          role="tablist"
          aria-label="Placement role tracks"
        >
          {roleTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={activeTrack === track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`focus-visible:ring-brand-500 rounded-xl px-2 py-3 text-xs font-semibold transition focus-visible:ring-2 focus-visible:outline-none sm:text-sm ${
                activeTrack === track.id
                  ? "bg-ink-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                  : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-7" role="tabpanel">
          <p className="eyebrow mb-3">Role lens · {current.label}</p>
          <h3 className="font-serif text-3xl font-semibold">{current.title}</h3>
          <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
            {current.positioning}
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Evidence to prepare</p>
              <ul className="space-y-3">
                {current.evidence.map((item) => (
                  <li
                    key={item}
                    className="border-ink-200/80 dark:border-ink-700 flex gap-3 rounded-xl border p-3"
                  >
                    <span
                      className="bg-accent-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/25 dark:to-accent-400/5 border-brand-200/70 dark:border-brand-700/40 rounded-2xl border bg-gradient-to-br p-5">
              <p className="eyebrow mb-3">Practice assignment</p>
              <p className="text-ink-700 dark:text-ink-100 font-serif text-xl leading-snug">
                {current.practice}
              </p>
            </div>
          </div>
        </div>
      </div>

      <aside className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[22px] bg-gradient-to-br p-6 text-white shadow-xl shadow-blue-950/15 sm:p-7">
        <div
          className="bg-brand-400/20 absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
            Readiness pulse
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-serif text-5xl font-semibold">{score}</span>
            <span className="pb-1 text-sm text-blue-200">/ {readinessItems.length}</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="bg-accent-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(score / readinessItems.length) * 100}%` }}
            />
          </div>

          <div className="mt-6 space-y-2">
            {readinessItems.map((item, index) => (
              <label
                key={item}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
              >
                <input
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() => toggleItem(index)}
                  className="accent-accent-400 mt-0.5 h-4 w-4"
                />
                <span className="text-sm leading-snug text-blue-50">{item}</span>
              </label>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-blue-200">
            Progress is stored only in this browser.
          </p>
        </div>
      </aside>
    </div>
  );
}
