import type { QuizQuestion } from "@/features/placements/data/product-management-quiz";

interface QuizListProps {
  topics: readonly string[];
  questions: readonly QuizQuestion[];
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * A dependency-free, reveal-on-click self-test list, grouped by topic.
 * Shared by the Product Management and Strategy & Entrepreneurship
 * quiz pages under /placements.
 */
export function QuizList({ topics, questions }: QuizListProps) {
  return (
    <div className="grid gap-10">
      {topics.map((topic) => {
        const topicQuestions = questions.filter((question) => question.topic === topic);
        if (!topicQuestions.length) return null;

        return (
          <div key={topic}>
            <p className="eyebrow mb-4">{topic}</p>
            <div className="grid gap-4">
              {topicQuestions.map((item) => (
                <details key={item.id} className="glass-card group p-2">
                  <summary className="focus-visible:ring-brand-500 flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 rounded-xl px-4 py-3 font-serif text-base font-semibold focus-visible:ring-2 focus-visible:outline-none sm:text-lg">
                    <span>{item.question}</span>
                    <span className="text-brand-700 dark:text-brand-300 shrink-0 font-sans text-xs font-medium group-open:hidden">
                      Reveal
                    </span>
                    <span className="text-brand-700 dark:text-brand-300 hidden shrink-0 font-sans text-xs font-medium group-open:inline">
                      Hide
                    </span>
                  </summary>
                  <div className="border-ink-200/80 dark:border-ink-700 border-t px-4 pt-4 pb-4">
                    <ul className="grid gap-2">
                      {item.options.map((option, index) => (
                        <li
                          key={option}
                          className={`rounded-lg border p-3 text-sm ${
                            index === item.correctIndex
                              ? "border-emerald-400/60 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-400/10 dark:text-emerald-200"
                              : "border-ink-200/80 dark:border-ink-700 text-ink-600 dark:text-ink-300"
                          }`}
                        >
                          <span className="mr-2 font-mono text-xs font-semibold">
                            {LETTERS[index]}.
                          </span>
                          {option}
                          {index === item.correctIndex ? (
                            <span className="ml-2 text-xs font-semibold">✓ Correct</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                    <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                      <span className="text-ink-800 dark:text-ink-100 font-semibold">Why: </span>
                      {item.explanation}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
