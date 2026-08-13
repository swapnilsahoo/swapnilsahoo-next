"use client";

import { useState } from "react";

const STORAGE_PREFIX = "wellbeing-daily-tracker-";

const trackerItems = [
  { id: "morning-routine", label: "Completed the morning routine" },
  { id: "opposite-action", label: "Used Opposite Action, if an urge came up" },
  { id: "tipp", label: "Used TIPP, if anxiety spiked" },
  { id: "rain", label: "Used RAIN" },
  { id: "exercise", label: "Exercised" },
  { id: "values-activity", label: "Did one values-aligned activity" },
  { id: "thought-record", label: "Wrote a thought record" },
  { id: "grief-journal", label: "Grief journaled" },
] as const;

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

interface StoredDay {
  checked: Record<string, boolean>;
  win: string;
}

function loadToday(): StoredDay {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + todayKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      return { checked: parsed.checked ?? {}, win: parsed.win ?? "" };
    }
  } catch {
    // ignore malformed storage
  }
  return { checked: {}, win: "" };
}

export function DailyTracker() {
  // Only ever rendered client-side (see ClientOnly.tsx) — safe to read
  // localStorage and the current date directly in the initializers.
  const [stored, setStored] = useState<StoredDay>(loadToday);
  const [dateLabel] = useState(() =>
    new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
  );
  const { checked, win } = stored;

  function persist(nextChecked: Record<string, boolean>, nextWin: string) {
    window.localStorage.setItem(
      STORAGE_PREFIX + todayKey(),
      JSON.stringify({ checked: nextChecked, win: nextWin })
    );
  }

  function toggle(id: string) {
    setStored((previous) => {
      const nextChecked = { ...previous.checked, [id]: !previous.checked[id] };
      persist(nextChecked, previous.win);
      return { checked: nextChecked, win: previous.win };
    });
  }

  function updateWin(value: string) {
    setStored((previous) => {
      persist(previous.checked, value);
      return { ...previous, win: value };
    });
  }

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Today&apos;s tracker</p>
          <h3 className="font-serif text-xl font-semibold sm:text-2xl">{dateLabel || "Today"}</h3>
        </div>
        <span className="tag tag-emerald">
          {completedCount} / {trackerItems.length}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {trackerItems.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-3 text-sm leading-relaxed sm:text-base">
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
                className="accent-brand-600 h-4 w-4 shrink-0"
              />
              <span className={checked[item.id] ? "text-ink-400 dark:text-ink-500 line-through" : ""}>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <label htmlFor="daily-win" className="text-sm leading-relaxed sm:text-base">
          One win today, however small
        </label>
        <input
          id="daily-win"
          type="text"
          value={win}
          onChange={(event) => updateWin(event.target.value)}
          placeholder="Something you did that you're proud of"
          className="border-ink-200 dark:border-ink-700 focus-visible:ring-brand-500 mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-relaxed">
        Saved on this device only, for today. Resets tomorrow — consistency of tracking is itself
        part of the practice.
      </p>
    </div>
  );
}
