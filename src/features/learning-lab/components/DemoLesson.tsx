"use client";

import { useId, useState } from "react";
import type { LabProgramme } from "../types";
import { demoDecisions } from "../demo-decisions";

const buttonClass =
  "lab-button inline-flex min-h-11 items-center justify-center rounded-full border border-brand-700 bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-400 dark:bg-brand-400 dark:text-ink-950 dark:hover:bg-brand-300";
const secondaryClass =
  "lab-button lab-button-secondary inline-flex min-h-11 items-center justify-center rounded-full border border-ink-300 px-5 py-2.5 text-sm font-semibold text-ink-800 transition hover:bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ink-600 dark:text-ink-100 dark:hover:bg-ink-800";

type PracticeMaterial = Pick<LabProgramme, "title" | "demo" | "sources"> & { slug: string };

export function DemoLesson({
  programme,
  freeCourse = false,
}: {
  programme: PracticeMaterial;
  freeCourse?: boolean;
}) {
  const lessonDecisions =
    programme.demo.decisions || demoDecisions[programme.slug as LabProgramme["slug"]] || [];
  const componentId = useId();
  const prefix = `${programme.slug}-${componentId}`;
  const [choices, setChoices] = useState<(number | null)[]>(lessonDecisions.map(() => null));
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [reflections, setReflections] = useState<string[]>(programme.demo.prompts.map(() => ""));
  const [noteStatus, setNoteStatus] = useState("");
  const storageKey = `learning-lab-${freeCourse ? "free-course" : "demo"}-notes-v1:${programme.slug}`;
  const hasNotes = reflections.some((reflection) => reflection.trim().length > 0);

  function saveNotes() {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ reflections, savedAt: new Date().toISOString() })
      );
      setNoteStatus("Notes saved in this browser. They have not been sent to the Lab.");
    } catch {
      setNoteStatus(
        "This browser could not save the notes. Download your worksheet to keep a copy."
      );
    }
  }

  function restoreNotes() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        setNoteStatus("There are no saved notes for this lesson in this browser.");
        return;
      }
      const parsed: unknown = JSON.parse(saved);
      if (typeof parsed !== "object" || parsed === null || !("reflections" in parsed))
        throw new Error("Invalid notes");
      const restored = parsed.reflections;
      if (
        !Array.isArray(restored) ||
        restored.length !== programme.demo.prompts.length ||
        !restored.every((value) => typeof value === "string" && value.length <= 5000)
      )
        throw new Error("Invalid notes");
      setReflections(restored);
      setNoteStatus("Saved notes restored from this browser.");
    } catch {
      setNoteStatus(
        "Saved notes could not be restored. You can continue here or use a downloaded copy."
      );
    }
  }

  function clearNotes() {
    let message = "Notes cleared from this page and this browser.";
    try {
      localStorage.removeItem(storageKey);
    } catch {
      message =
        "Notes cleared from this page. This browser did not allow removal of its saved copy; use your browser's site-data controls to remove it.";
    }
    setReflections(programme.demo.prompts.map(() => ""));
    setNoteStatus(message);
  }

  function downloadWorksheet() {
    const lines = [
      `Swapnil Sahoo Learning Lab — ${freeCourse ? "free course" : "demonstration"} worksheet`,
      programme.title,
      programme.demo.title,
      "Original hypothetical exercise. Self-practice only; not an assessed submission or certificate record.",
      "",
      "SCENARIO",
      programme.demo.scenario,
      "",
      "YOUR DECISIONS",
      ...lessonDecisions.map(
        (decision, index) =>
          `${decision.question}\n${choices[index] === null ? "Not selected" : decision.choices[choices[index]!].title}`
      ),
      "",
      "YOUR REFLECTION",
      ...programme.demo.prompts.map(
        (prompt, index) => `${prompt}\n${reflections[index] || "Not yet written"}\n`
      ),
      "",
      "CHECKPOINT",
      programme.demo.checkpoint.question,
      answer === null ? "Not selected" : programme.demo.checkpoint.options[answer],
      checked ? programme.demo.checkpoint.explanation : "Not checked",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${programme.slug}-${freeCourse ? "course" : "demo"}-worksheet.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setNoteStatus("Worksheet download prepared. Keep the file somewhere you control.");
  }

  return (
    <section
      aria-labelledby={`${prefix}-heading`}
      className="lab-demo border-ink-200 text-ink-800 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100 space-y-8 rounded-3xl border bg-white p-5 sm:p-8"
    >
      <header className="space-y-3">
        <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-widest uppercase">
          {freeCourse
            ? "Put the idea to work · guided practice"
            : "Try a lesson · about 15–20 minutes"}
        </p>
        <h2 id={`${prefix}-heading`} className="font-serif text-2xl leading-tight sm:text-3xl">
          {programme.demo.title}
        </h2>
        <p className="text-ink-600 dark:text-ink-300 max-w-3xl text-sm leading-relaxed">
          A public demonstration using original hypothetical material. Explore choices and compare
          your reasoning. This activity does not submit work, count towards assessed progress or
          issue a certificate.
        </p>
      </header>

      <div className="lab-demo-step space-y-4">
        <h3 className="text-lg font-semibold">1. Read the decision</h3>
        <p className="bg-ink-50 dark:bg-ink-800 rounded-2xl p-5 leading-relaxed">
          {programme.demo.scenario}
        </p>
        <ul className="text-ink-600 dark:text-ink-300 list-disc space-y-3 pl-5 text-sm leading-relaxed">
          {programme.demo.lesson.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="lab-demo-step space-y-5">
        <h3 className="text-lg font-semibold">2. Choose and examine the consequences</h3>
        <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
          {programme.demo.task} Try a different choice to see how the reasoning changes. Feedback is
          written instructional guidance, not AI-generated advice.
        </p>
        {lessonDecisions.map((decision, index) => (
          <fieldset key={decision.question} className="space-y-3">
            <legend className="mb-3 font-semibold">{decision.question}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {decision.choices.map((choice, choiceIndex) => (
                <label
                  key={choice.title}
                  className={`lab-choice focus-within:outline-brand-600 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed focus-within:outline-2 focus-within:outline-offset-2 ${choices[index] === choiceIndex ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/40" : "border-ink-200 hover:border-ink-400 dark:border-ink-700 dark:hover:border-ink-400"}`}
                >
                  <input
                    type="radio"
                    name={`${prefix}-decision-${index}`}
                    checked={choices[index] === choiceIndex}
                    onChange={() =>
                      setChoices((previous) =>
                        previous.map((value, slot) => (slot === index ? choiceIndex : value))
                      )
                    }
                    className="accent-brand-700 dark:accent-brand-300 mt-1 shrink-0"
                  />
                  <span>{choice.title}</span>
                </label>
              ))}
            </div>
            <div
              className="lab-feedback bg-ink-50 dark:bg-ink-800 min-h-14 rounded-2xl p-4 text-sm leading-relaxed"
              aria-live="polite"
              aria-atomic="true"
            >
              {choices[index] === null
                ? "Select an approach to examine its consequences."
                : decision.choices[choices[index]!].feedback}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="lab-demo-step space-y-4">
        <h3 className="text-lg font-semibold">3. Check your understanding</h3>
        <fieldset className="space-y-3">
          <legend className="mb-3 font-medium">{programme.demo.checkpoint.question}</legend>
          {programme.demo.checkpoint.options.map((option, index) => (
            <label
              key={option}
              className="border-ink-200 focus-within:outline-brand-600 dark:border-ink-700 flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed focus-within:outline-2 focus-within:outline-offset-2"
            >
              <input
                type="radio"
                name={`${prefix}-checkpoint`}
                checked={answer === index}
                onChange={() => {
                  setAnswer(index);
                  setChecked(false);
                }}
                className="accent-brand-700 dark:accent-brand-300 mt-1 shrink-0"
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={answer === null}
            onClick={() => setChecked(true)}
            className={buttonClass}
          >
            Check my reasoning
          </button>
          <button
            type="button"
            onClick={() => {
              setAnswer(null);
              setChecked(false);
            }}
            className={secondaryClass}
          >
            Reset checkpoint
          </button>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {checked && (
            <p className="lab-feedback bg-ink-50 dark:bg-ink-800 rounded-2xl p-5 text-sm leading-relaxed">
              <strong>
                {answer === programme.demo.checkpoint.answer
                  ? "This is the strongest choice. "
                  : "Revisit the decision criteria and try again. "}
              </strong>
              {programme.demo.checkpoint.explanation}
            </p>
          )}
        </div>
      </div>

      <div className="lab-reflection lab-demo-step space-y-5">
        <h3 className="text-lg font-semibold">4. Write your decision memo</h3>
        <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
          Your notes stay on this page unless you choose to save them in this browser or download
          them. They are not sent to the Lab. Avoid personal, employer, customer or confidential
          information. Browser-saved notes can be read by someone using this browser profile.
        </p>
        {programme.demo.prompts.map((prompt, index) => (
          <div key={prompt} className="space-y-2">
            <label htmlFor={`${prefix}-reflection-${index}`} className="block text-sm font-medium">
              {prompt}
            </label>
            <textarea
              id={`${prefix}-reflection-${index}`}
              rows={4}
              maxLength={5000}
              value={reflections[index]}
              onChange={(event) => {
                setReflections((previous) =>
                  previous.map((value, slot) => (slot === index ? event.target.value : value))
                );
                setNoteStatus(
                  "Edited notes have not been saved. Use Save in this browser or Download worksheet to keep them."
                );
              }}
              className="lab-field border-ink-300 focus-visible:outline-brand-600 dark:border-ink-600 dark:bg-ink-950 w-full min-w-0 resize-y rounded-xl border bg-white p-4 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2"
            />
          </div>
        ))}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={downloadWorksheet} className={buttonClass}>
            Download worksheet
          </button>
          <button type="button" onClick={saveNotes} disabled={!hasNotes} className={secondaryClass}>
            Save in this browser
          </button>
          <button type="button" onClick={restoreNotes} className={secondaryClass}>
            Restore saved notes
          </button>
          <button type="button" onClick={clearNotes} className={secondaryClass}>
            Clear notes
          </button>
        </div>
        <p role="status" className="text-ink-600 dark:text-ink-300 min-h-6 text-sm leading-relaxed">
          {noteStatus}
        </p>
        <details className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5">
          <summary className="focus-visible:outline-brand-600 min-h-7 cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
            Compare with a worked response
          </summary>
          <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
            This is one defensible response. Your recommendation may differ if you explain the
            assumptions and evidence.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed">
            {programme.demo.modelAnswer.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </details>
      </div>

      <footer className="border-ink-200 dark:border-ink-700 space-y-3 border-t pt-5">
        <p className="text-sm font-semibold">Framework references</p>
        <ul className="space-y-2 text-sm leading-relaxed">
          {programme.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                className="text-brand-700 decoration-brand-300 focus-visible:outline-brand-600 dark:text-brand-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed">
          References inform the learning approach. The named organisations do not endorse or
          accredit the Lab. Linked publisher material may have separate access conditions; it is not
          reproduced here.
        </p>
      </footer>
    </section>
  );
}

export default DemoLesson;
