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

function QuestionList({ questions }: { questions: readonly string[] }) {
  return (
    <ol role="list" className="mt-6 border-t" style={{ borderColor: "var(--line)" }}>
      {questions.map((question, index) => (
        <li
          key={question}
          className="grid grid-cols-[2rem_1fr] gap-3 border-b py-4 last:border-b-0"
          style={{ borderColor: "var(--line)" }}
        >
          <span
            aria-hidden="true"
            className="text-brand-700 dark:text-brand-300 pt-0.5 font-mono text-xs font-semibold"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">{question}</p>
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
      className="py-16 sm:py-20"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <span className="accent-rule" />
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="display text-4xl font-semibold text-balance md:text-5xl"
          >
            {title}
          </h2>
        </div>
        <p className="text-ink-600 dark:text-ink-300 max-w-3xl text-sm leading-relaxed sm:text-base">
          {introduction}
        </p>
      </div>

      <div
        className="divide-ink-200 dark:divide-ink-800 mt-12 grid border-y lg:grid-cols-2 lg:divide-x"
        style={{ borderColor: "var(--line)" }}
      >
        <article data-inquiry-lens="socratic" className="py-8 lg:pr-10">
          <div>
            <p className="eyebrow">Socratic lens</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">Test the assumption.</h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-xl text-xs leading-relaxed">
              Ask what is being taken for granted, whose evidence matters, what a counterexample
              would show and who lives with the consequence.
            </p>
          </div>
          <QuestionList questions={socraticQuestions} />
        </article>

        <article
          data-inquiry-lens="first-principles"
          className="border-t py-8 lg:border-t-0 lg:pl-10"
          style={{ borderColor: "var(--line)" }}
        >
          <div>
            <p className="eyebrow">First-principles lens</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">Find what must be true.</h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-xl text-xs leading-relaxed">
              Strip the subject back to its purpose, evidence, mechanism and constraints before
              rebuilding the argument.
            </p>
          </div>
          <QuestionList questions={firstPrinciplesQuestions} />
        </article>
      </div>
    </section>
  );

  return contained ? <Container className="max-w-6xl">{content}</Container> : content;
}
