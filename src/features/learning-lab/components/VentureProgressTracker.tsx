"use client";

import { useEffect, useId, useState } from "react";
import { ventureDays } from "../venture-experiment";
import { useLabHydrated } from "./useLabHydrated";
import "./toolkit.css";

const storageKey = "learning-lab-venture-progress-v1";

function readSaved(): boolean[] | null {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) || "null");
    const done = (raw as { done?: unknown } | null)?.done;
    if (!Array.isArray(done) || done.length !== ventureDays.length) return null;
    return done.map((value) => value === true);
  } catch {
    return null;
  }
}

/** Private tick-boxes for the 14 days. Remembered on this device only if the student switches it on. */
export function VentureProgressTracker() {
  const hydrated = useLabHydrated();
  const base = useId();
  const [done, setDone] = useState<boolean[]>(() => ventureDays.map(() => false));
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Only restores progress the student previously chose to remember on this device.
    const saved = readSaved();
    if (!saved) return;
    const timer = window.setTimeout(() => {
      setDone(saved);
      setRemember(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function persist(next: boolean[], keep: boolean) {
    try {
      if (keep) localStorage.setItem(storageKey, JSON.stringify({ done: next }));
      else localStorage.removeItem(storageKey);
      return true;
    } catch {
      setStatus(
        "This browser would not let the page remember your ticks. They still work for this visit."
      );
      return false;
    }
  }

  function toggle(index: number, checked: boolean) {
    const next = done.map((value, i) => (i === index ? checked : value));
    setDone(next);
    if (remember) persist(next, true);
  }

  const count = done.filter(Boolean).length;
  const nextIndex = done.findIndex((value) => !value);
  const next = nextIndex === -1 ? null : ventureDays[nextIndex];

  return (
    <section className="lab-progress" aria-labelledby={`${base}-title`}>
      <div className="lab-progress-head">
        <h3 id={`${base}-title`}>Your progress</h3>
        <p className="lab-small" style={{ margin: 0 }} aria-live="polite">
          {count} of {ventureDays.length} days done
        </p>
      </div>
      <div className="lab-progress-bar" aria-hidden="true">
        <span style={{ width: `${(count / ventureDays.length) * 100}%` }} />
      </div>
      <fieldset className="lab-progress-days" disabled={!hydrated}>
        <legend className="sr-only">Tick the days you have finished</legend>
        {ventureDays.map((day, index) => (
          <label key={day.day} title={day.title}>
            <input
              type="checkbox"
              checked={done[index]}
              aria-label={`Day ${day.day}: ${day.title} — done`}
              onChange={(event) => toggle(index, event.target.checked)}
            />
            <span aria-hidden="true">Day {day.day}</span>
          </label>
        ))}
      </fieldset>
      <div className="lab-progress-foot">
        {next ? (
          <a className="lab-text-link" href={`#venture-day-${next.day}`}>
            Next up: Day {next.day}, {next.title} →
          </a>
        ) : (
          <strong>All 14 days ticked. Write your decision and celebrate an honest finish.</strong>
        )}
        <label className="lab-form-check" style={{ margin: 0 }}>
          <input
            type="checkbox"
            checked={remember}
            disabled={!hydrated}
            onChange={(event) => {
              const keep = event.target.checked;
              if (persist(done, keep)) {
                setRemember(keep);
                setStatus(
                  keep
                    ? "Your ticks will be remembered in this browser. Anyone using this device can see them."
                    : "Forgotten. Your ticks are no longer saved in this browser."
                );
              }
            }}
          />
          <span>Remember my ticks on this device</span>
        </label>
      </div>
      <p className="lab-small" style={{ marginTop: "0.6rem", marginBottom: 0 }}>
        Ticks are for your own motivation. They are not sent anywhere and do not count as a
        completed test. Take more than 14 days if you need to.
      </p>
      {status && (
        <p role="status" className="lab-small" style={{ marginBottom: 0 }}>
          {status}
        </p>
      )}
    </section>
  );
}
