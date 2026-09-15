import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import {
  loadQuizManifest,
  loadSessionQuiz,
} from "@/features/teaching/data/session-quizzes";

import { SessionQuiz } from "./SessionQuiz";

type PageProps = { params: Promise<{ session: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const manifest = await loadQuizManifest();
  return manifest.map((entry) => ({ session: entry.sessionId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { session } = await params;
  const quiz = await loadSessionQuiz(session);
  if (!quiz) return {};
  const programme = quiz.course === "2-year-mba" ? "STRAMGT 206" : "STRAMGT 221";
  const title = `${quiz.title} — Session ${quiz.sessionNumber} quiz`;
  return {
    title: `${title} | ${programme}`,
    description: `${quiz.questionCount} practice questions with worked rationales for Session ${quiz.sessionNumber}, ${quiz.title}.`,
    alternates: { canonical: `/teaching/quiz/${quiz.sessionId}` },
    openGraph: {
      type: "article",
      title,
      description: `${quiz.questionCount} practice questions with worked rationales.`,
      url: `/teaching/quiz/${quiz.sessionId}`,
    },
  };
}

export default async function SessionQuizPage({ params }: PageProps) {
  const { session } = await params;
  const quiz = await loadSessionQuiz(session);
  if (!quiz) notFound();

  const manifest = await loadQuizManifest();
  const siblings = manifest.filter((entry) => entry.course === quiz.course);
  const position = siblings.findIndex((entry) => entry.sessionId === quiz.sessionId);
  const previous = position > 0 ? siblings[position - 1] : undefined;
  const next = position >= 0 && position + 1 < siblings.length ? siblings[position + 1] : undefined;

  const courseHref = `/teaching/${quiz.course}`;
  const courseLabel =
    quiz.course === "2-year-mba"
      ? "STRAMGT 206: Strategic Management"
      : "STRAMGT 221: Strategy and Disruption";
  const withRationale = quiz.questions.filter((q) => q.explanation).length;

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-12">
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
            <Link
              href={courseHref}
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              {courseLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/teaching/quiz"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Session quizzes
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Session {quiz.sessionNumber}
            </span>
          </nav>

          <p className="eyebrow mb-3">
            {courseLabel} &middot; Session {String(quiz.sessionNumber).padStart(2, "0")}
          </p>
          <h1 className="display max-w-4xl text-4xl font-semibold text-balance sm:text-5xl">
            {quiz.title}
          </h1>
          <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
            {quiz.questionCount}
            {" questions drawn from this session’s own question papers,"}
            {withRationale === quiz.questionCount
              ? " each with the rationale recorded in the instructor key."
              : ` ${withRationale} of them carrying the rationale recorded in the instructor key.`}{" "}
            Answer first, then read why — the explanation is the point, not the score.
          </p>
        </Container>
      </header>

      <section aria-label="Practice questions" className="pb-14 sm:pb-20">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mx-auto max-w-4xl">
            <SessionQuiz questions={quiz.questions} sessionTitle={quiz.title} />

            <nav
              aria-label="Other session quizzes"
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/teaching/quiz/${previous.sessionId}`}
                  className="border-ink-200 dark:border-ink-700 hover:border-brand-400 rounded-xl border p-4 transition"
                >
                  <p className="eyebrow mb-1">
                    Previous &middot; Session {previous.sessionNumber}
                  </p>
                  <p className="font-serif text-base font-semibold">{previous.title}</p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/teaching/quiz/${next.sessionId}`}
                  className="border-ink-200 dark:border-ink-700 hover:border-brand-400 rounded-xl border p-4 text-right transition"
                >
                  <p className="eyebrow mb-1">Next &middot; Session {next.sessionNumber}</p>
                  <p className="font-serif text-base font-semibold">{next.title}</p>
                </Link>
              ) : null}
            </nav>
          </div>
        </Container>
      </section>
    </main>
  );
}
