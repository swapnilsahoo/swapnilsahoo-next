"use client";

import { useMemo, useState } from "react";

import { assessmentItems } from "@/features/wellbeing/data/mentalWellbeing";

const STORAGE_KEY = "wellbeing-self-assessment-v1";

type Ratings = Record<string, number>;

function defaultRatings(): Ratings {
  return Object.fromEntries(assessmentItems.map((item) => [item.id, 5]));
}

function loadInitialRatings(): Ratings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultRatings(), ...JSON.parse(raw) } : defaultRatings();
  } catch {
    return defaultRatings();
  }
}

function readingFor(average: number): string {
  if (average >= 7) {
    return "This reads as significant distress right now. The eight-week program below is built for exactly this — and if any of the “when to seek help” criteria further down describe you, please read that section too.";
  }
  if (average >= 4) {
    return "A real but workable level of distress. Weeks 1–2 below — regulating your nervous system first — is the right place to start.";
  }
  return "Lower than the range this program is built for most intensely, which is good news. The practices still hold up as general tools for stress and attachment anxiety.";
}

export function SelfAssessment() {
  // This component is only ever rendered client-side (see ClientOnly.tsx), so
  // reading localStorage in the initializer is safe — there's no server-rendered
  // markup for it to mismatch against.
  const [ratings, setRatings] = useState<Ratings>(loadInitialRatings);
  const [saved, setSaved] = useState(false);

  const average = useMemo(() => {
    const values = Object.values(ratings);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }, [ratings]);

  function updateRating(id: string, value: number) {
    setRatings((previous) => (previous ? { ...previous, [id]: value } : previous));
    setSaved(false);
  }

  function handleSave() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    setSaved(true);
  }

  function handleReset() {
    const reset = defaultRatings();
    setRatings(reset);
    window.localStorage.removeItem(STORAGE_KEY);
    setSaved(false);
  }

  return (
    <div className="glass-card p-6 sm:p-8">
      <p className="eyebrow mb-2">Start here</p>
      <h3 className="font-serif text-2xl font-semibold sm:text-3xl">Where are you right now?</h3>
      <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-relaxed">
        Rate each one from 0 (not at all) to 10 (constant, overwhelming). This isn&apos;t a
        diagnosis — it&apos;s a baseline, so you can see real movement by week four and week
        eight. Nothing you enter leaves this browser.
      </p>

      <div className="mt-8 space-y-6">
        {assessmentItems.map((item) => (
          <div key={item.id}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <label htmlFor={item.id} className="text-sm leading-relaxed sm:text-base">
                {item.prompt}
              </label>
              <span className="text-brand-700 dark:text-brand-300 font-mono text-sm font-semibold">
                {ratings[item.id]}
              </span>
            </div>
            <input
              id={item.id}
              type="range"
              min={0}
              max={10}
              step={1}
              value={ratings[item.id]}
              onChange={(event) => updateRating(item.id, Number(event.target.value))}
              className="accent-brand-600 w-full"
            />
          </div>
        ))}
      </div>

      <div
        className="mt-8 rounded-2xl border p-5 text-sm leading-relaxed"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="eyebrow mb-2">Your average: {average.toFixed(1)} / 10</p>
        <p className="text-ink-700 dark:text-ink-200">{readingFor(average)}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={handleSave} className="btn-primary">
          Save this baseline
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn-ghost"
        >
          Reset
        </button>
        {saved ? (
          <span className="text-ink-500 dark:text-ink-400 text-xs">
            Saved on this device. Come back at week 4 and week 8 to compare.
          </span>
        ) : null}
      </div>
    </div>
  );
}
