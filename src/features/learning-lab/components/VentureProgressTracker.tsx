"use client";

import { useEffect, useId, useState } from "react";
import { siteOrigin, ventureDayHelp } from "../founder-toolkit";
import { buildVentureCalendar } from "../founder-toolkit-extras";
import { ventureDays, ventureExperimentPath } from "../venture-experiment";
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
  const [startDate, setStartDate] = useState("");
  const [reminderTime, setReminderTime] = useState("19:00");
  const pageUrl = `${siteOrigin}${ventureExperimentPath}`;

  function downloadReminders() {
    const now = new Date();
    const local = (value: number) => String(value).padStart(2, "0");
    const start =
      startDate || `${now.getFullYear()}-${local(now.getMonth() + 1)}-${local(now.getDate())}`;
    const stamp = now
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
    const calendar = buildVentureCalendar(start, reminderTime, ventureDays, pageUrl, stamp);
    if (!calendar) {
      setStatus("Choose a valid start date and time, then try again.");
      return;
    }
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "14-day-venture-reminders.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      "Reminder file downloaded. Open it to add 14 daily reminders to your phone or computer calendar. Nothing was sent to the Lab."
    );
  }

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
        {next && (
          <a
            className="lab-text-link"
            href={`https://wa.me/?text=${encodeURIComponent(
              [
                `Day ${next.day} of 14: ${next.title}`,
                ...(ventureDayHelp[next.day]?.doToday ?? []).map((task) => `- ${task}`),
                `${pageUrl}#venture-day-${next.day}`,
              ].join("\n")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send today’s task to myself on WhatsApp ↗
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
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
      <details className="lab-reminders">
        <summary>Get a daily reminder on your phone</summary>
        <fieldset disabled={!hydrated} className="lab-form-fieldset">
          <legend className="sr-only">Calendar reminders</legend>
          <div className="lab-form-grid">
            <div className="lab-field">
              <label htmlFor={`${base}-start`}>Start date (leave blank for today)</label>
              <input
                id={`${base}-start`}
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="lab-field">
              <label htmlFor={`${base}-time`}>Reminder time</label>
              <input
                id={`${base}-time`}
                type="time"
                value={reminderTime}
                onChange={(event) => setReminderTime(event.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="lab-button lab-button-secondary"
            onClick={downloadReminders}
          >
            Download 14 calendar reminders (.ics)
          </button>
          <p className="lab-small" style={{ marginTop: "0.6rem" }}>
            Works with Google Calendar, Apple Calendar and Outlook. The file is made in your
            browser; the Lab does not send reminders or collect your details.
          </p>
        </fieldset>
      </details>
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
