import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { linkedInHighlights, linkedInProfileUrl } from "@/features/profile/data/linkedin";
import { teachingLinks, teachingPhilosophy } from "@/features/profile/data/teaching";

export function Teaching() {
  return (
    <Reveal>
      <section id="teaching" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / Teaching</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">
              Strategic Management, Business Simulation and GenAI for Business.
            </h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
            Experiential, simulation-based, case-led, and AI-enabled. Full course materials and
            learning activities are organised here.
          </p>
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
                Ideas carried beyond the classroom.
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

        <figure className="mx-auto mt-14 max-w-3xl text-center">
          <blockquote className="display text-ink-800 dark:text-ink-100 text-2xl leading-snug font-medium md:text-3xl">
            &ldquo;{teachingPhilosophy.quote}&rdquo;
          </blockquote>
          <figcaption className="eyebrow mt-4">— {teachingPhilosophy.attribution}</figcaption>
        </figure>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
