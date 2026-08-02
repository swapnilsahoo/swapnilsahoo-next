import { CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

export type InquiryQuestions = readonly [string, string, string, string];

interface InquiryPreludeProps {
  id: string;
  eyebrow?: string;
  title: string;
  introduction: string;
  socraticQuestions: InquiryQuestions;
  firstPrinciplesQuestions: InquiryQuestions;
  contained?: boolean;
}

function QuestionList({
  questions,
  inverse = false,
}: {
  questions: readonly string[];
  inverse?: boolean;
}) {
  return (
    <ol role="list" className="mt-5 space-y-4">
      {questions.map((question, index) => (
        <li key={question} className="grid grid-cols-[auto_1fr] gap-3">
          <span
            aria-hidden="true"
            className="bg-brand-600 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-white"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className={`pt-0.5 text-sm leading-relaxed ${
              inverse ? "text-blue-50" : "text-ink-700 dark:text-ink-200"
            }`}
          >
            {question}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function InquiryPrelude({
  id,
  eyebrow = "Questions before answers",
  title,
  introduction,
  socraticQuestions,
  firstPrinciplesQuestions,
  contained = true,
}: InquiryPreludeProps) {
  const content = (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-inquiry-prelude
      className="py-16 sm:py-24"
    >
      <div className="mb-9 max-w-4xl">
        <span className="accent-rule" />
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={`${id}-title`} className="display text-4xl font-semibold text-balance md:text-5xl">
          {title}
        </h2>
        <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-3xl text-sm leading-relaxed sm:text-base">
          {introduction}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <article data-inquiry-lens="socratic" className="glass-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <CompassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">Socratic lens</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">Test the assumption.</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                Ask what is being taken for granted, whose evidence matters, what a counterexample
                would show and who lives with the consequence.
              </p>
            </div>
          </div>
          <QuestionList questions={socraticQuestions} />
        </article>

        <article
          data-inquiry-lens="first-principles"
          className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[22px] bg-gradient-to-br p-6 text-white shadow-xl shadow-blue-950/15 sm:p-8"
        >
          <div
            className="bg-accent-400/15 absolute -right-20 -bottom-24 h-72 w-72 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                <SparkIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  First-principles lens
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">Find what must be true.</h3>
                <p className="mt-2 text-xs leading-relaxed text-blue-100">
                  Strip the subject back to its purpose, evidence, mechanism and constraints before
                  rebuilding the argument.
                </p>
              </div>
            </div>
            <QuestionList questions={firstPrinciplesQuestions} inverse />
          </div>
        </article>
      </div>
    </section>
  );

  return contained ? <Container className="max-w-6xl">{content}</Container> : content;
}
