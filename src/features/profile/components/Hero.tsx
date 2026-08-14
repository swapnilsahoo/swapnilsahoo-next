import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CalendarIcon } from "@/components/icons/LineIcons";
import { profile } from "@/features/profile/data/profile";
import { AffiliationMarquee } from "./AffiliationMarquee";

export function Hero() {
  return (
    <header id="top" className="relative overflow-x-clip pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="aurora" />
      <Container className="grid max-w-6xl items-center gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow">{profile.title}</span>
            <span className="tag tag-amber">
              <span className="bg-accent-500 h-1.5 w-1.5 rounded-full" aria-hidden="true" />
              Accepting PhD enquiries
            </span>
            <span className="tag tag-emerald">17 years in industry · now in academia</span>
          </div>
          <h1 className="display mb-6 text-5xl font-semibold md:text-6xl lg:text-7xl">
            Dr. {profile.firstName}{" "}
            <span className="text-brand-700 dark:text-brand-400 font-normal italic">
              {profile.lastName}
            </span>
            .
          </h1>
          <p className="text-ink-700 dark:text-ink-200 mb-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            Before joining academia, I spent 17 years in strategic roles at Wipro, Accenture,
            Cognizant, Exilant, TimesofMoney, Mahindra and 42Gears Mobility. That experience now
            shapes my research on how
            organisations act when resources are tight and the way I teach{" "}
            <strong>
              Strategy &amp; Entrepreneurship at Great Lakes Institute of Management, Gurgaon, where
              I head the Entrepreneurship and AI initiatives.
            </strong>{" "}
            I earned my <strong>Ph.D. in Entrepreneurship from XLRI Jamshedpur</strong>, with a
            dissertation titled{" "}
            <cite>
              &ldquo;Entrepreneurial Resourcefulness in Resource-Constrained Environments&rdquo;
            </cite>
            .
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Get in touch
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a href="#publications" className="btn-ghost">
              View publications
            </a>
            <a
              href={profile.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <CalendarIcon className="h-4 w-4" />
              Book a 1:1
            </a>
          </div>

          <div className="mt-12">
            <p className="eyebrow mb-4">The organisations that shaped my work</p>
            <AffiliationMarquee />
          </div>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.1}>
          <div className="relative">
            <div className="glass-card relative p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 768px) 340px, 90vw"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-3">
                <div>
                  <p className="text-ink-500 dark:text-ink-300 font-mono text-xs">Currently</p>
                  <p className="text-sm font-semibold">{profile.location}</p>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline text-brand-700 dark:text-brand-400 text-xs font-medium"
                >
                  Email →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}
