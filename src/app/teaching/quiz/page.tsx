import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { loadQuizManifest } from "@/features/teaching/data/session-quizzes";

const title = "Session quizzes — Strategic Management";
const description =
  "Practice questions for individual strategy sessions, taken from the course's own question papers and instructor keys, each with the recorded rationale.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "strategic management quiz",
    "MBA strategy practice questions",
    "Porter five forces quiz",
    "blue ocean strategy quiz",
    "corporate strategy MCQ",
  ],
  alternates: { canonical: "/teaching/quiz" },
  openGraph: { type: "website", title, description, url: "/teaching/quiz" },
};

const COURSE_LABEL: Record<string, string> = {
  "2-year-mba": "STRAMGT 206: Strategic Management",
  "1-year-mba": "STRAMGT 221: Strategy and Disruption",
};

export default async function QuizIndexPage() {
  const manifest = await loadQuizManifest();
  const courses = ["2-year-mba", "1-year-mba"] as const;
  const totalQuestions = manifest.reduce((n, entry) => n + entry.questionCount, 0);

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[min(100%,120rem)]">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/teaching" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Teaching
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Session quizzes
            </span>
          </nav>

          <span className="accent-rule" />
          <p className="eyebrow mb-3">Practice</p>
          <h1 className="display max-w-4xl text-4xl font-semibold text-balance sm:text-6xl">
            Answer first. <span className="text-brand-700 dark:text-brand-300 font-normal italic">Then read why.</span>
          </h1>
          <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-3xl text-sm leading-relaxed sm:text-base">
            {totalQuestions}
            {" questions across "}
            {manifest.length}
            {" sessions, taken from the question papers and instructor keys used in class rather than written for the web. Each one reveals the recorded rationale as soon as you answer, because the explanation is what makes a wrong answer worth something."}
          </p>
        </Container>
      </header>

      {courses.map((course) => {
        const entries = manifest.filter((entry) => entry.course === course);
        if (entries.length === 0) return null;
        return (
          <section key={course} aria-labelledby={`${course}-quizzes`} className="pb-14 sm:pb-20">
            <Container className="max-w-[min(100%,120rem)]">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h2 id={`${course}-quizzes`} className="display text-2xl font-semibold sm:text-3xl">
                  {COURSE_LABEL[course]}
                </h2>
                <Link
                  href={`/teaching/${course}`}
                  className="text-brand-700 dark:text-brand-400 text-sm font-semibold"
                >
                  Course outline
                </Link>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                  <li key={entry.sessionId}>
                    <Link
                      href={`/teaching/quiz/${entry.sessionId}`}
                      className="glass-card group flex h-full flex-col p-5 transition"
                    >
                      <p className="eyebrow mb-2">
                        Session {String(entry.sessionNumber).padStart(2, "0")}
                      </p>
                      <h3 className="font-serif text-lg leading-snug font-semibold">
                        {entry.title}
                      </h3>
                      <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs">
                        {entry.questionCount} questions
                        {entry.withExplanations < entry.questionCount
                          ? ` · ${entry.withExplanations} with rationale`
                          : " · all with rationale"}
                      </p>
                      <span className="text-brand-700 dark:text-brand-400 mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold">
                        Start
                        <ArrowRightIcon
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}
    </main>
  );
}
