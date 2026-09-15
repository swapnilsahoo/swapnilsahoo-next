"use client";

import { useMemo, useState } from "react";

import type { OptionLetter, QuizQuestion } from "@/features/teaching/data/session-quizzes";

const LETTERS: OptionLetter[] = ["A", "B", "C", "D"];
const ROUND_SIZE = 10;

type Answered = { chosen: OptionLetter; correct: boolean };

/**
 * A quiz is only useful if a wrong answer teaches something, so the rationale
 * is revealed on answering rather than at the end, and the question stays on
 * screen next to it. Progress is deliberately not persisted: this is practice,
 * and a remembered score invites gaming it rather than re-attempting.
 */
export function SessionQuiz({
  questions,
  sessionTitle,
}: {
  questions: QuizQuestion[];
  sessionTitle: string;
}) {
  const [roundStart, setRoundStart] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answered>>({});

  const round = useMemo(
    () => questions.slice(roundStart, roundStart + ROUND_SIZE),
    [questions, roundStart]
  );

  const current = round[index];
  const answeredInRound = round.filter((_, i) => answers[roundStart + i] !== undefined).length;
  const correctInRound = round.filter((_, i) => answers[roundStart + i]?.correct).length;
  const roundComplete = answeredInRound === round.length && round.length > 0;
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = Object.values(answers).filter((a) => a.correct).length;

  const streak = useMemo(() => {
    let run = 0;
    for (let i = index; i >= 0; i -= 1) {
      const a = answers[roundStart + i];
      if (a?.correct) run += 1;
      else break;
    }
    return run;
  }, [answers, index, roundStart]);

  if (!current) return null;

  const answered = answers[roundStart + index];

  function choose(letter: OptionLetter) {
    if (answered) return;
    setAnswers((prev) => ({
      ...prev,
      [roundStart + index]: { chosen: letter, correct: letter === current.answer },
    }));
  }

  function next() {
    if (index + 1 < round.length) setIndex(index + 1);
  }

  function nextRound() {
    const start = roundStart + ROUND_SIZE;
    if (start >= questions.length) return;
    setRoundStart(start);
    setIndex(0);
  }

  const totalRounds = Math.ceil(questions.length / ROUND_SIZE);
  const roundNumber = Math.floor(roundStart / ROUND_SIZE) + 1;

  return (
    <div className="border-ink-200/80 dark:border-ink-700 dark:bg-ink-950 rounded-2xl border bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag tag-ink">
            Round {roundNumber} of {totalRounds}
          </span>
          <span className="text-ink-500 dark:text-ink-400 text-xs">
            Question {index + 1} of {round.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {streak >= 3 ? (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              {streak} in a row
            </span>
          ) : null}
          <span className="text-ink-500 dark:text-ink-400 font-mono text-xs">
            {correctInRound}/{answeredInRound} this round
            {totalAnswered > answeredInRound ? ` · ${totalCorrect}/${totalAnswered} overall` : ""}
          </span>
        </div>
      </div>

      <div
        className="bg-ink-100 dark:bg-ink-800 mt-3 h-1.5 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={answeredInRound}
        aria-valuemin={0}
        aria-valuemax={round.length}
        aria-label={`Progress through round ${roundNumber}`}
      >
        <div
          className="bg-brand-600 h-full rounded-full transition-[width] duration-300"
          style={{ width: `${(answeredInRound / round.length) * 100}%` }}
        />
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {current.set ? <span className="tag">Set {current.set}</span> : null}
          {current.lo ? (
            <span className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-wide uppercase">
              {current.lo}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-serif text-lg leading-snug font-semibold sm:text-xl">
          {current.stem}
        </h3>

        <ul className="mt-4 grid gap-2">
          {LETTERS.map((letter) => {
            const isChosen = answered?.chosen === letter;
            const isCorrect = current.answer === letter;
            const reveal = Boolean(answered);

            let tone =
              "border-ink-200 hover:border-brand-400 hover:bg-brand-50/40 dark:border-ink-700 dark:hover:bg-white/5";
            if (reveal && isCorrect) {
              tone = "border-emerald-500 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-500/10";
            } else if (reveal && isChosen) {
              tone = "border-rose-500 bg-rose-50 dark:border-rose-500/60 dark:bg-rose-500/10";
            } else if (reveal) {
              tone = "border-ink-200 opacity-60 dark:border-ink-700";
            }

            return (
              <li key={letter}>
                <button
                  type="button"
                  onClick={() => choose(letter)}
                  disabled={Boolean(answered)}
                  aria-pressed={isChosen}
                  className={`focus-visible:ring-brand-500 flex w-full gap-3 rounded-xl border p-3.5 text-left text-sm transition focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default ${tone}`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] ${
                      reveal && isCorrect
                        ? "border-emerald-600 text-emerald-700 dark:text-emerald-300"
                        : reveal && isChosen
                          ? "border-rose-600 text-rose-700 dark:text-rose-300"
                          : "border-ink-300 text-ink-500 dark:border-ink-600 dark:text-ink-400"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="min-w-0 leading-relaxed">{current.options[letter]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {answered ? (
          <div
            className={`mt-4 rounded-xl border p-4 ${
              answered.correct
                ? "border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-500/[0.07]"
                : "border-amber-600/30 bg-amber-50/70 dark:bg-amber-400/[0.06]"
            }`}
            role="status"
          >
            <p className="text-sm font-semibold">
              {answered.correct ? "Correct." : `Not quite — the answer is ${current.answer}.`}
            </p>
            {current.explanation ? (
              <p className="text-ink-700 dark:text-ink-200 mt-2 text-sm leading-relaxed">
                {current.explanation}
              </p>
            ) : (
              <p className="text-ink-500 dark:text-ink-400 mt-2 text-sm leading-relaxed">
                This question came from a set whose key recorded the answer but not a rationale.
              </p>
            )}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {answered && index + 1 < round.length ? (
            <button type="button" onClick={next} className="btn-primary">
              Next question
            </button>
          ) : null}

          {roundComplete ? (
            <>
              <p className="text-sm font-semibold">
                Round {roundNumber}: {correctInRound} of {round.length}.
              </p>
              {roundStart + ROUND_SIZE < questions.length ? (
                <button type="button" onClick={nextRound} className="btn-primary">
                  Next ten questions
                </button>
              ) : (
                <p className="text-ink-600 dark:text-ink-300 text-sm">
                  That is every question in {sessionTitle}.
                </p>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
