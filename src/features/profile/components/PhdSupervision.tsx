import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { phdColumns, phdSupervision } from "@/features/profile/data/phd";

export function PhdSupervision() {
  return (
    <Reveal>
      <section id="phd" className="mx-auto max-w-[min(100%,120rem)] px-6 py-16">
        <div className="glass-card relative overflow-hidden p-8 md:p-12">
          <div className="bg-brand-500/10 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accent-500/10 absolute -bottom-20 -left-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="relative grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">07 / PhD supervision</p>
              <h2 className="display mb-5 text-4xl font-semibold md:text-5xl">
                A practical guide to working together.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mb-6 text-sm leading-relaxed">
                {phdSupervision.description}
              </p>
              <div className="border-brand-200 dark:border-brand-800 bg-brand-50/70 dark:bg-brand-950/30 mb-6 rounded-2xl border p-5">
                <p className="eyebrow mb-2">Your first note</p>
                <p className="text-ink-700 dark:text-ink-200 text-sm leading-relaxed">
                  {phdSupervision.proposalPrompt}
                </p>
              </div>
              <a href={phdSupervision.ctaHref} className="btn-primary">
                {phdSupervision.ctaLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
              {phdColumns.map((column) => (
                <div key={column.title} className="glass-card p-5">
                  <p className="eyebrow mb-2">{column.title}</p>
                  <ul className="text-ink-700 dark:text-ink-200 space-y-1.5 text-sm">
                    {column.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />
    </Reveal>
  );
}
