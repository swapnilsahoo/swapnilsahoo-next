import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Session quiz banks, extracted from the course's own question papers and
 * instructor keys rather than written for the site.
 *
 * Two properties of the source material are worth knowing, because both are
 * corrected during extraction rather than carried through:
 *
 *  - several instructor keys place the correct option first throughout a set,
 *    intended to be shuffled before handing the paper to a class. Options are
 *    therefore re-ordered with a seed derived from the question itself, so the
 *    order is stable between builds but the answer's position is not a tell.
 *  - the keys use more than one table layout, and one of them puts the answer
 *    in a different column. Columns are read by header name, and any row whose
 *    answer is not a real option letter is dropped rather than guessed.
 */
export type OptionLetter = "A" | "B" | "C" | "D";

export interface QuizQuestion {
  n: number;
  /** Which paper set this came from, where the source distinguished them. */
  set?: string | null;
  stem: string;
  options: Record<OptionLetter, string>;
  answer: OptionLetter;
  /** The instructor's own rationale, where the source recorded one. */
  explanation?: string;
  /** Learning-objective tag, where the source recorded one. */
  lo?: string | null;
}

export interface SessionQuiz {
  sessionId: string;
  course: "1-year-mba" | "2-year-mba";
  sessionNumber: number;
  title: string;
  questionCount: number;
  questions: QuizQuestion[];
}

export interface QuizManifestEntry {
  sessionId: string;
  course: "1-year-mba" | "2-year-mba";
  sessionNumber: number;
  title: string;
  questionCount: number;
  withExplanations: number;
}

const QUIZ_DIR = path.join(process.cwd(), "content", "quizzes");

export async function loadQuizManifest(): Promise<QuizManifestEntry[]> {
  const raw = await readFile(path.join(QUIZ_DIR, "manifest.json"), "utf8");
  const entries = JSON.parse(raw) as QuizManifestEntry[];
  return entries.sort(
    (a, b) => a.course.localeCompare(b.course) || a.sessionNumber - b.sessionNumber
  );
}

export async function loadSessionQuiz(sessionId: string): Promise<SessionQuiz | null> {
  // sessionId reaches this from a route segment, so refuse anything that is not
  // the exact shape we generate rather than letting it reach the filesystem.
  if (!/^(1yr|2yr)-\d{2}$/.test(sessionId)) return null;
  try {
    const raw = await readFile(path.join(QUIZ_DIR, `${sessionId}.json`), "utf8");
    return JSON.parse(raw) as SessionQuiz;
  } catch {
    return null;
  }
}
