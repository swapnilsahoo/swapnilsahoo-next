import { Reveal } from "@/components/ui/Reveal";
import { CalendarIcon, GraduationCapIcon, MailIcon, RssIcon } from "@/components/icons/LineIcons";
import { contactCards } from "@/features/profile/data/contact";
import type { ContactCard } from "@/features/profile/types";

const contactIcons: Record<ContactCard["icon"], typeof MailIcon> = {
  mail: MailIcon,
  calendar: CalendarIcon,
  rss: RssIcon,
  briefcase: GraduationCapIcon,
};

export function Contact() {
  return (
    <Reveal>
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">10 / Get in touch</p>
            <h2 className="display mb-5 text-4xl font-semibold md:text-5xl">
              Start with a specific question.
            </h2>
            <p className="text-ink-700 dark:text-ink-200 text-base leading-relaxed">
              For PhD work, begin with the research puzzle and a one-page concept note. For an
              executive programme, describe the participants and the decisions they need to work
              through. You can also write with a speaking invitation or a relevant idea. I read my
              own email.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            {contactCards.map((card) => {
              const Icon = contactIcons[card.icon];
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="glass-card p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 mb-3 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{card.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm break-all">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
