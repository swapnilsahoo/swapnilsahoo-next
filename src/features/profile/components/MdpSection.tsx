import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { mdpModules, mdpProgramsConducted } from "@/features/profile/data/mdp";

export function MdpSection() {
  return (
    <Reveal>
      <section id="mdp" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">07 / Executive education</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">For senior leaders.</h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
            A modular MDP curriculum, plus selected engagements with public-sector institutions
            and community programmes.
          </p>
        </div>

        <div className="mb-10">
          <p className="eyebrow mb-4">Programmes conducted</p>
          <div className="grid gap-5 md:grid-cols-2">
            {mdpProgramsConducted.map((program) => (
              <div key={program.title} className="glass-card p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="tag">{program.venue}</span>
                  <span className="tag tag-ink">{program.audience}</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold">{program.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="eyebrow mb-4">Modular MDP curriculum</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mdpModules.map((module) => (
            <div key={module.title} className="glass-card p-6">
              <p className="eyebrow mb-2">{module.index}</p>
              <h3 className="mb-3 font-serif text-xl font-semibold">{module.title}</h3>
              <ul className="text-ink-700 dark:text-ink-200 marker:text-brand-500 list-inside list-disc space-y-1.5 text-sm">
                {module.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="glass-card bg-ink-900 dark:bg-brand-900/40 border-0 p-6 text-white">
            <p className="eyebrow text-ink-300">Custom</p>
            <h3 className="mb-3 font-serif text-xl font-semibold">Bespoke Programmes</h3>
            <p className="text-ink-100 mb-4 text-sm">
              I co-design MDPs for corporates, government academies, and family business owners.
              Recent engagements include IRS officer training and senior PSU leadership.
            </p>
            <a
              href="mailto:swapnil.sahoo@greatlakes.edu.in?subject=MDP%20enquiry"
              className="link-underline inline-flex items-center gap-1 text-sm font-semibold text-white"
            >
              Discuss a programme <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
