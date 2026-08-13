import { Container } from "@/components/ui/Container";

export type TriggerQuestions = readonly string[];

interface InquiryPreludeProps {
  id: string;
  eyebrow?: string;
  title: string;
  questions: TriggerQuestions;
  contained?: boolean;
}

export function InquiryPrelude({
  id,
  eyebrow = "Worth asking",
  title,
  questions,
  contained = true,
}: InquiryPreludeProps) {
  const content = (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-inquiry-prelude
      className="py-12 sm:py-16"
    >
      <div className="grid gap-6 border-t pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start" style={{ borderColor: "var(--line)" }}>
        <div>
          <span className="accent-rule" />
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 id={`${id}-title`} className="display text-2xl font-semibold text-balance sm:text-3xl">
            {title}
          </h2>
        </div>
        <ol role="list" className="space-y-4">
          {questions.map((question, index) => (
            <li key={question} className="grid grid-cols-[1.75rem_1fr] gap-3">
              <span
                aria-hidden="true"
                className="text-brand-700 dark:text-brand-300 pt-0.5 font-mono text-xs font-semibold"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-ink-700 dark:text-ink-200 font-serif text-base leading-relaxed sm:text-lg">
                {question}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );

  return contained ? <Container className="max-w-6xl">{content}</Container> : content;
}
