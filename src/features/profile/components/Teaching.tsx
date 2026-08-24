import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { linkedInHighlights, linkedInProfileUrl } from "@/features/profile/data/linkedin";
import {
  feedbackHighlight,
  strategyShowdownHighlight,
  teachingLinks,
  teachingPhilosophy,
} from "@/features/profile/data/teaching";

export function Teaching() {
  return (
    <Reveal>
      <section id="teaching" className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative isolate mb-10 overflow-hidden rounded-[28px] border border-white/10 bg-ink-950 px-6 py-10 text-white shadow-xl shadow-blue-950/15 sm:px-10 sm:py-12">
          <Image
            src="/images/gallery/sapience-2025-panel-speaking.jpg"
            alt="Dr Swapnil Sahoo mid-speech on a panel at SAPIENCE 2025, Great Lakes Gurgaon"
            fill
            className="-z-20 object-cover"
            style={{ objectPosition: "center 30%" }}
            sizes="(min-width: 1024px) 1152px, 100vw"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(5,10,24,0.92), rgba(30,58,138,0.85), rgba(22,32,51,0.82))",
            }}
          />
          <div
            className="bg-accent-400/20 absolute -top-24 -right-20 -z-10 h-72 w-72 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="accent-rule" />
              <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-blue-200 uppercase">
                06 / Teaching
              </p>
              <h2 className="display text-4xl font-semibold md:text-5xl">
                Teaching strategy through decisions, trade-offs and practice.
              </h2>
            </div>
            <p className="self-end text-sm leading-relaxed text-blue-100 md:col-span-8">
              Across PGPM and PGDM classrooms, I use cases, simulations, fieldwork and build
              exercises to move from a framework to a defensible decision. AI appears where it
              genuinely improves the work; fluent output still needs verification and human
              judgment.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teachingLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="glass-card p-7 transition-transform hover:-translate-y-1"
            >
              <p className="eyebrow mb-3">{link.eyebrow}</p>
              <h3 className="mb-2 font-serif text-2xl font-semibold">{link.title}</h3>
              <p className="text-ink-600 dark:text-ink-300 text-sm">{link.description}</p>
              <p className="text-brand-700 dark:text-brand-400 link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium">
                Open page <ArrowRightIcon className="h-3.5 w-3.5" />
              </p>
            </a>
          ))}
        </div>

        <aside className="mt-16" aria-labelledby="linkedin-notes-heading">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-2">Field notes / LinkedIn</p>
              <h3
                id="linkedin-notes-heading"
                className="display text-ink-900 dark:text-ink-50 text-3xl font-semibold"
              >
                Questions I am working through in public.
              </h3>
            </div>
            <a
              href={linkedInProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 dark:text-brand-400 link-underline inline-flex items-center gap-2 text-sm font-medium"
            >
              <LinkedInIcon className="h-4 w-4" />
              View all LinkedIn posts
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {linkedInHighlights.map((post) => (
              <a
                key={post.href}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group p-6 transition-transform hover:-translate-y-1"
              >
                <p className="eyebrow mb-3">{post.eyebrow}</p>
                <h4 className="text-ink-900 dark:text-ink-50 mb-2 font-serif text-xl font-semibold">
                  {post.title}
                </h4>
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                  {post.description}
                </p>
                <span className="text-brand-700 dark:text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Read on LinkedIn
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </aside>

        <aside className="glass-card mx-auto mt-14 max-w-3xl p-7 md:p-9">
          <p className="eyebrow mb-3">Teaching approach</p>
          <h3 className="display text-ink-900 dark:text-ink-50 text-2xl font-semibold md:text-3xl">
            {teachingPhilosophy.title}
          </h3>
          <p className="text-ink-700 dark:text-ink-200 mt-4 leading-relaxed">
            {teachingPhilosophy.description}
          </p>
        </aside>

        <div className="mx-auto mt-6 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="glass-card p-6">
            <p className="eyebrow mb-2">Student mentoring</p>
            <h4 className="font-serif text-lg font-semibold">{strategyShowdownHighlight.title}</h4>
            <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
              {strategyShowdownHighlight.description}
            </p>
            <p className="text-ink-500 dark:text-ink-400 mt-3 text-xs">
              {strategyShowdownHighlight.result}
            </p>
          </div>

          <div className="glass-card p-6">
            <p className="eyebrow mb-2">Student feedback</p>
            <h4 className="font-serif text-lg font-semibold">{feedbackHighlight.title}</h4>
            <p className="mt-2">
              <span className="display text-3xl font-semibold">{feedbackHighlight.rating}</span>
              <span className="text-ink-500 dark:text-ink-400 ml-2 text-xs">
                {feedbackHighlight.ratingLabel}
              </span>
            </p>
            <ul className="text-ink-600 dark:text-ink-300 mt-3 space-y-1.5 text-sm italic">
              {feedbackHighlight.quotes.map((quote) => (
                <li key={quote}>&ldquo;{quote}&rdquo;</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
