import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon, CalendarIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { blogPostBySlug, blogPosts, blogSlugs, isBlogSlug } from "@/features/writing/data/catalog";
import type { BlogBlock } from "@/features/writing/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) return {};
  const post = blogPostBySlug[slug];

  return {
    title: `${post.title} | Writing`,
    description: post.dek,
    keywords: [post.tag, "Bhagavad Gita", "Krishna", "Vraja", "Janmashtami reflection"],
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url: `/writing/${slug}`,
      publishedTime: post.publishedDate,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Block({ block, index }: { block: BlogBlock; index: number }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-serif mt-12 text-2xl font-semibold sm:text-3xl" key={index}>
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="text-ink-700 dark:text-ink-200 mt-6 text-base leading-relaxed sm:text-lg"
        >
          {block.text}
        </p>
      );
    case "note":
      return (
        <div
          key={index}
          className="mt-8 rounded-2xl border border-amber-900/10 bg-amber-50/70 p-5 dark:border-amber-100/10 dark:bg-amber-400/[0.045]"
        >
          <p className="text-xs font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-200">
            {block.label}
          </p>
          <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
            {block.text}
          </p>
        </div>
      );
    case "verse":
      return (
        <figure
          key={index}
          className="border-amber-500/40 dark:border-amber-400/30 my-8 rounded-2xl border-l-4 bg-amber-50/50 p-6 dark:bg-amber-400/[0.04] sm:p-7"
        >
          <figcaption className="mb-4 flex items-center justify-between gap-3">
            <span className="text-ink-500 dark:text-ink-400 text-xs font-semibold tracking-wide uppercase">
              {block.work}
            </span>
            <span className="tag tag-amber">{block.reference}</span>
          </figcaption>
          {block.sanskrit ? (
            <p lang="sa" className="script-devanagari text-ink-900 dark:text-ink-50 text-xl leading-relaxed whitespace-pre-line sm:text-2xl">
              {block.sanskrit}
            </p>
          ) : null}
          {block.transliteration ? (
            <p className="text-ink-500 dark:text-ink-400 mt-3 text-sm italic leading-relaxed">
              {block.transliteration}
            </p>
          ) : null}
          <p className="text-ink-800 dark:text-ink-100 mt-4 font-serif text-lg leading-relaxed">
            “{block.translation}”
          </p>
        </figure>
      );
    default:
      return null;
  }
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const post = blogPostBySlug[slug];

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    datePublished: post.publishedDate,
    url: `${siteUrl}/writing/${slug}`,
    author: { "@type": "Person", name: "Dr. Swapnil Sahoo" },
    keywords: post.tag,
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20">
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
            <Link href="/writing" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Writing
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              {post.title}
            </span>
          </nav>

          <div
            data-page-hero="scripture"
            className="from-[#1a0f00] via-[#5c3a10] to-[#0f2d3a] relative isolate overflow-hidden rounded-[34px] border border-white/15 bg-gradient-to-br px-6 py-11 text-white shadow-2xl shadow-slate-950/25 sm:px-10 sm:py-16 lg:px-14"
          >
            <div
              className="bg-amber-300/20 absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-white/8 blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.3fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-amber-100 uppercase backdrop-blur-sm">
                  {post.tag} · Personal essay
                </span>
                <h1 className="display mt-8 max-w-4xl text-4xl font-semibold text-balance sm:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {post.dek}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                  </span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/15 bg-black/10 p-6 text-center backdrop-blur-md">
                <p lang="sa" className="script-devanagari text-amber-200 text-6xl">
                  {post.heroGlyph}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="essay-body-heading" className="pb-16 sm:pb-24">
        <Container className="max-w-[min(100%,120rem)]">
          <p className="sr-only" id="essay-body-heading">
            Essay
          </p>
          <div className="mx-auto max-w-3xl">
            <div className="glass-card mb-10 flex flex-wrap items-center gap-3 p-5 text-sm">
              <span className="text-ink-500 dark:text-ink-400">Prompted by</span>
              <a
                href={post.inspiration.videoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 dark:text-brand-400 font-semibold underline decoration-dotted underline-offset-4"
              >
                “{post.inspiration.videoTitle}”
              </a>
              <span className="text-ink-500 dark:text-ink-400">
                on{" "}
                <a
                  href={post.inspiration.channelHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 dark:text-brand-400 font-semibold underline decoration-dotted underline-offset-4"
                >
                  {post.inspiration.channelName}
                </a>
              </span>
            </div>

            <Reveal>
              <article>
                {post.blocks.map((block, index) => (
                  <Block block={block} index={index} key={index} />
                ))}
              </article>
            </Reveal>

            <div className="mt-14 rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 sm:p-8 dark:border-slate-800 dark:bg-slate-950">
              <p className="eyebrow mb-4">What I&apos;m quoting from</p>
              <ol className="divide-y divide-slate-200 dark:divide-slate-800">
                {post.scriptureReferences.map((reference) => (
                  <li key={reference.work} className="py-4 first:pt-0 last:pb-0">
                    {reference.href ? (
                      <Link
                        href={reference.href}
                        className="group block"
                      >
                        <span className="text-brand-700 dark:text-brand-400 block font-serif text-base font-semibold group-hover:underline">
                          {reference.work}
                        </span>
                        <span className="text-ink-600 dark:text-ink-300 mt-1 block text-sm leading-relaxed">
                          {reference.detail}
                        </span>
                      </Link>
                    ) : (
                      <div>
                        <span className="block font-serif text-base font-semibold">{reference.work}</span>
                        <span className="text-ink-600 dark:text-ink-300 mt-1 block text-sm leading-relaxed">
                          {reference.detail}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section aria-labelledby="continue-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-8">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Continue reading</p>
            <h2 id="continue-title" className="display text-3xl font-semibold sm:text-4xl">
              More from the site.
            </h2>
          </div>
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-2">
            <Link
              href="/writing"
              className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group flex flex-col justify-center rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <p className="eyebrow mb-2">Writing</p>
              <h3 className="font-serif text-2xl font-semibold">All essays</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                {otherPosts.length > 0
                  ? "Every essay published so far, newest first."
                  : "The full index — new essays land here as they're written."}
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Back to Writing
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/spirituality/bhagavad-gita"
              className="border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 group flex flex-col justify-center rounded-2xl border p-6 transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <p className="eyebrow mb-2">Source text</p>
              <h3 className="font-serif text-2xl font-semibold">Bhagavad Gītā · Complete Text</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                Every verse quoted above, in context, in this site&apos;s complete 701-verse
                source-text reading edition.
              </p>
              <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Open the reader
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
