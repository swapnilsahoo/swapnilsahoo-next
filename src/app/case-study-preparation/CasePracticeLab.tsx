"use client";

import { useState } from "react";

const practiceTracks = [
  {
    id: "structure",
    label: "Structure",
    title: "Turn ambiguity into a clean issue tree",
    prompt:
      "Your client is a premium coffee chain. Revenue is growing, but profit has fallen for three consecutive quarters. Where would you begin?",
    moves: [
      "Confirm the objective, time horizon and geography",
      "Separate revenue and cost drivers before forming hypotheses",
      "Start with the branch most likely to explain the decline",
      "State what data would validate or reject the hypothesis",
    ],
  },
  {
    id: "quant",
    label: "Quant",
    title: "Translate business language into numbers",
    prompt:
      "A subscription product has 2 million users, 30% are paid, monthly ARPU is ₹500 and annual churn is 20%. Estimate current annual recurring revenue.",
    moves: [
      "Write the governing equation before calculating",
      "Keep units visible at every step",
      "Sanity-check the order of magnitude",
      "Interpret what the number means for the client",
    ],
  },
  {
    id: "synthesis",
    label: "Synthesis",
    title: "Convert analysis into an executive answer",
    prompt:
      "Your analysis shows that falling weekday traffic—not pricing or food cost—is driving the profitability decline. The client can launch a commuter breakfast offer in six weeks.",
    moves: [
      "Lead with the answer, not the analytical journey",
      "Support it with two or three decisive facts",
      "Name the risk and how to mitigate it",
      "End with the next action and decision required",
    ],
  },
] as const;

const checklist = [
  "I clarified the objective and constraints",
  "My structure was mutually exclusive and collectively exhaustive",
  "I made a hypothesis and updated it with evidence",
  "I calculated cleanly and explained the implication",
  "I stated the answer, risks and next step clearly",
] as const;

export function CasePracticeLab() {
  const [activeTrack, setActiveTrack] = useState<(typeof practiceTracks)[number]["id"]>(
    practiceTracks[0].id
  );
  const [completed, setCompleted] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return checklist.map(() => false);

    const stored = window.localStorage.getItem("case-practice-checklist");
    if (!stored) return checklist.map(() => false);

    try {
      const parsed = JSON.parse(stored) as boolean[];
      return parsed.length === checklist.length ? parsed : checklist.map(() => false);
    } catch {
      return checklist.map(() => false);
    }
  });

  const current = practiceTracks.find((track) => track.id === activeTrack) ?? practiceTracks[0];
  const score = completed.filter(Boolean).length;

  function toggleItem(index: number) {
    const next = completed.map((item, itemIndex) => (itemIndex === index ? !item : item));
    setCompleted(next);
    window.localStorage.setItem("case-practice-checklist", JSON.stringify(next));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="glass-card overflow-hidden p-2">
        <div
          className="border-ink-200/80 dark:border-ink-700 grid grid-cols-3 gap-1 border-b p-2"
          role="tablist"
          aria-label="Case practice modes"
        >
          {practiceTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={activeTrack === track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`focus-visible:ring-brand-500 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:outline-none ${
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
          <p className="eyebrow mb-3">Practice mode · {current.label}</p>
          <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{current.title}</h3>
          <div className="from-brand-50 to-accent-400/10 dark:from-brand-900/25 dark:to-accent-400/5 border-brand-200/70 dark:border-brand-700/40 mt-5 rounded-2xl border bg-gradient-to-br p-5">
            <p className="text-ink-700 dark:text-ink-100 text-sm leading-relaxed">
              {current.prompt}
            </p>
          </div>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.moves.map((move, index) => (
              <li
                key={move}
                className="border-ink-200/80 dark:border-ink-700 flex gap-3 rounded-xl border p-4"
              >
                <span className="bg-brand-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  {move}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[22px] bg-gradient-to-br p-6 text-white shadow-xl shadow-blue-950/15 sm:p-7">
        <div
          className="bg-brand-400/20 absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
            Reflection score
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-serif text-5xl font-semibold">{score}</span>
            <span className="pb-1 text-sm text-blue-200">/ {checklist.length}</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="bg-accent-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(score / checklist.length) * 100}%` }}
            />
          </div>

          <div className="mt-6 space-y-2">
            {checklist.map((item, index) => (
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
            Your checklist is saved privately in this browser.
          </p>
        </div>
      </aside>
    </div>
  );
}
