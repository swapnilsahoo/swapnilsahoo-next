import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, CalendarIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/features/writing/data/catalog";

const title = "Writing — Dr. Swapnil Sahoo";
const description =
  "Short first-person essays, usually prompted by something I've just read or watched, checked only against primary texts and named sources.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Swapnil Sahoo writing",
    "Janmashtami reflection",
    "Bhagavad Gita essay",
    "Krishna Vraja",
    "personal essays",
  ],
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/writing",
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function WritingIndexPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
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
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Writing
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="from-[#1a0f00] via-[#5c3a10] to-[#0f2d3a] relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-amber-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <div
              className="bg-amber-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-teal-400/15 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-amber-100 uppercase backdrop-blur-sm">
              Personal essays
            </span>
            <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
              Writing, checked{" "}
              <span className="text-amber-200 font-normal italic">against the texts.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-amber-50/90 sm:text-lg">
              Short essays, written in the first person, usually prompted by something I&apos;ve
              just read or watched. Where a piece touches scripture, it&apos;s checked only against
              named chapters and verses — and I say so plainly whenever a story I&apos;m telling
              isn&apos;t yet one I can link you to on this site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`#${blogPosts[0]?.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Read the latest essay
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://swapnilsahoo.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Also on Substack ↗
              </a>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="essays-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Essays</p>
            <h2 id="essays-title" className="display text-4xl font-semibold md:text-5xl">
              {blogPosts.length} {blogPosts.length === 1 ? "essay" : "essays"} so far.
            </h2>
          </div>

          <ol role="list" className="grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <li key={post.slug} id={post.slug}>
                <Reveal>
                  <Link href={`/writing/${post.slug}`} className="glass-card group block h-full p-7 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="tag tag-amber">{post.tag}</span>
                      <span className="text-ink-500 dark:text-ink-400 inline-flex items-center gap-1.5 text-xs">
                        <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                      </span>
                      <span className="text-ink-500 dark:text-ink-400 text-xs">
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-semibold sm:text-3xl">
                      {post.title}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed sm:text-base">
                      {post.dek}
                    </p>
                    <span className="text-brand-700 dark:text-brand-400 mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                      Read the essay
                      <ArrowRightIcon
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </main>
  );
}
