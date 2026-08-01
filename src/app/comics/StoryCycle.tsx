import type { ComicsStoryCycle } from "./storyCycles";
import styles from "./comics.module.css";

type StoryTone = "spider" | "superman" | "heMan";

const toneClasses = {
  spider: {
    border: "border-slate-200 dark:border-white/15",
    eyebrow: "text-red-700 dark:text-red-400",
    heading: "text-slate-950 dark:text-white",
    muted: "text-slate-600 dark:text-slate-300",
    premise:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300",
    premiseLabel: "text-blue-700 dark:text-blue-300",
    ladder:
      "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.025] dark:text-slate-300",
    ladderNumber: "text-red-700 dark:text-red-400",
    chapter: "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.025]",
    summary:
      "hover:bg-slate-50 focus-visible:ring-blue-600 dark:hover:bg-white/[0.045] dark:focus-visible:ring-blue-300",
    chapterNumber: "text-red-700 dark:text-red-400",
    chapterTitle: "text-slate-950 dark:text-white",
    chapterMeta: "text-blue-700 dark:text-blue-300",
    body: "border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-300",
    reflection:
      "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-300/20 dark:bg-blue-300/10 dark:text-blue-100",
    final: "border-blue-900 bg-blue-950 text-white",
    finalLabel: "text-yellow-300",
    finalMuted: "text-blue-100",
  },
  superman: {
    border: "border-white/20",
    eyebrow: "text-yellow-300",
    heading: "text-white",
    muted: "text-slate-300",
    premise: "border-white/15 bg-white/[0.045] text-slate-300",
    premiseLabel: "text-yellow-300",
    ladder: "border-white/15 bg-white/[0.035] text-slate-300",
    ladderNumber: "text-red-400",
    chapter: "border-white/15 bg-white/[0.035]",
    summary: "hover:bg-white/[0.06] focus-visible:ring-yellow-300",
    chapterNumber: "text-red-400",
    chapterTitle: "text-white",
    chapterMeta: "text-yellow-200",
    body: "border-white/15 text-slate-300",
    reflection: "border-yellow-300/20 bg-yellow-300/10 text-yellow-50",
    final: "border-yellow-300/30 bg-[#020817] text-white",
    finalLabel: "text-yellow-300",
    finalMuted: "text-slate-300",
  },
  heMan: {
    border: "border-slate-900/20",
    eyebrow: "text-purple-900",
    heading: "text-slate-950",
    muted: "text-slate-700",
    premise: "border-slate-900/20 bg-white/40 text-slate-800",
    premiseLabel: "text-purple-900",
    ladder: "border-slate-900/20 bg-white/35 text-slate-800",
    ladderNumber: "text-purple-900",
    chapter: "border-slate-900/20 bg-white/40",
    summary: "hover:bg-white/55 focus-visible:ring-purple-900",
    chapterNumber: "text-purple-900",
    chapterTitle: "text-slate-950",
    chapterMeta: "text-red-900",
    body: "border-slate-900/20 text-slate-800",
    reflection: "border-purple-900/20 bg-purple-950/10 text-purple-950",
    final: "border-purple-950 bg-purple-950 text-white",
    finalLabel: "text-yellow-300",
    finalMuted: "text-purple-100",
  },
} as const;

function countWords(paragraphs: readonly string[]) {
  return paragraphs.reduce(
    (total, paragraph) => total + paragraph.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}

function readingMinutes(paragraphs: readonly string[]) {
  return Math.max(1, Math.ceil(countWords(paragraphs) / 180));
}

export function StoryCycle({
  story,
  characterName,
  slug,
  tone,
}: {
  story: ComicsStoryCycle;
  characterName: string;
  slug: string;
  tone: StoryTone;
}) {
  if (story.chapters.length !== 6) {
    throw new Error(`${characterName} must have exactly six story chapters.`);
  }

  const palette = toneClasses[tone];
  const totalMinutes = Math.max(
    1,
    Math.ceil(
      story.chapters.reduce((total, chapter) => total + countWords(chapter.paragraphs), 0) / 180
    )
  );

  return (
    <section
      id={`${slug}-story-cycle`}
      aria-labelledby={`${slug}-story-title`}
      className={`mt-20 scroll-mt-28 border-t pt-16 sm:mt-24 sm:pt-20 ${palette.border}`}
      data-story-cycle={slug}
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className={`text-sm font-bold uppercase ${palette.eyebrow}`}>
            Original interpretive storyline · Six chapters
          </p>
          <h3
            id={`${slug}-story-title`}
            className={`mt-4 font-serif text-4xl leading-tight font-bold sm:text-5xl ${palette.heading}`}
          >
            {story.title}
          </h3>
          <p className={`mt-5 max-w-2xl text-base leading-8 ${palette.muted}`}>{story.subtitle}</p>
          <p className={`mt-5 font-mono text-xs tracking-[0.1em] uppercase ${palette.muted}`}>
            6 chapters · approximately {totalMinutes} minutes · unofficial fiction, not canon
          </p>
        </div>

        <aside
          className={`border p-6 sm:p-7 ${palette.premise}`}
          aria-label={`${characterName} story premise`}
        >
          <p className={`text-xs font-bold uppercase ${palette.premiseLabel}`}>The premise</p>
          <p className="mt-4 text-base leading-8">{story.premise}</p>
        </aside>
      </div>

      <div className="mt-12 hidden sm:block">
        <p className={`text-xs font-bold tracking-[0.12em] uppercase ${palette.muted}`}>
          The conceptual climb
        </p>
        <ol
          aria-label={`${characterName} story concept progression`}
          className={`mt-4 grid border sm:grid-cols-2 lg:grid-cols-6 ${palette.ladder}`}
        >
          {story.chapters.map((chapter) => (
            <li
              key={chapter.level}
              className={`min-h-24 border-b p-4 last:border-b-0 sm:border-r sm:odd:border-r lg:min-h-28 lg:border-b-0 lg:last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 ${palette.border}`}
            >
              <span className={`font-mono text-xs font-bold ${palette.ladderNumber}`}>
                {chapter.level}
              </span>
              <span className="mt-5 block text-sm font-bold">{chapter.concept}</span>
              <span className={`mt-1 block text-xs leading-5 ${palette.muted}`}>
                {chapter.stage}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ol aria-label={`${characterName} six-chapter story cycle`} className="mt-10 space-y-3">
        {story.chapters.map((chapter, index) => {
          const minutes = readingMinutes(chapter.paragraphs);
          const chapterId = `${slug}-chapter-${index + 1}`;

          return (
            <li key={chapterId}>
              <details
                id={chapterId}
                className={`${styles.storyChapter} scroll-mt-28 border ${palette.chapter}`}
              >
                <summary
                  className={`${styles.storySummary} grid min-h-16 cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset sm:grid-cols-[7.5rem_minmax(0,1fr)_auto_2.5rem] sm:px-6 ${palette.summary}`}
                >
                  <span
                    className={`font-mono text-xs font-bold tracking-[0.08em] uppercase ${palette.chapterNumber}`}
                  >
                    Chapter {index + 1} of 6
                  </span>
                  <h4
                    className={`col-start-1 row-start-2 min-w-0 font-serif text-xl leading-snug font-bold sm:col-start-2 sm:row-start-1 sm:text-2xl ${palette.chapterTitle}`}
                  >
                    {chapter.title}
                  </h4>
                  <span
                    className={`col-start-2 row-start-1 text-right text-xs font-semibold sm:col-start-3 sm:row-start-1 ${palette.chapterMeta}`}
                  >
                    {chapter.concept} · {minutes} min
                  </span>
                  <span
                    className={`${styles.storyChevron} col-start-2 row-start-2 flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-current sm:col-start-4 sm:row-start-1`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </span>
                </summary>

                <div className={`border-t px-4 py-7 sm:px-6 sm:py-9 ${palette.body}`}>
                  <div className="max-w-[68ch] text-[16px] leading-8 sm:text-[17px]">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-5 first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className={`mt-8 max-w-[68ch] border p-5 sm:p-6 ${palette.reflection}`}>
                    <p className="text-xs font-bold tracking-[0.12em] uppercase">Concept step</p>
                    <p className="mt-3 text-sm leading-7 sm:text-base">{chapter.reflection}</p>
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ol>

      <div className={`mt-10 border p-6 sm:p-8 lg:p-10 ${palette.final}`}>
        <p className={`text-xs font-bold tracking-[0.12em] uppercase ${palette.finalLabel}`}>
          Highest-order concept
        </p>
        <h4 className="mt-4 max-w-3xl font-serif text-3xl leading-tight font-bold sm:text-4xl">
          {story.highestOrder.title}
        </h4>
        <p className={`mt-5 max-w-3xl text-base leading-8 ${palette.finalMuted}`}>
          {story.highestOrder.body}
        </p>
        <p className="mt-7 max-w-3xl border-l-2 border-current pl-5 font-serif text-xl leading-8 italic sm:text-2xl">
          {story.highestOrder.question}
        </p>
      </div>
    </section>
  );
}
