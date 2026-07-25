import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CalendarIcon } from "@/components/icons/LineIcons";
import { profile } from "@/features/profile/data/profile";
import { AffiliationMarquee } from "./AffiliationMarquee";

export function Hero() {
  return (
    <header id="top" className="relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="aurora" />
      <Container className="grid items-center gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow">{profile.title}</span>
            <span className="tag tag-amber">
              <span className="bg-accent-500 h-1.5 w-1.5 animate-pulse rounded-full" />
              Accepting PhD enquiries
            </span>
            <span className="tag tag-emerald">Writer · Educator . Executor</span>
          </div>
          <h1 className="display mb-6 text-5xl font-semibold md:text-7xl">
            Dr. {profile.firstName}{" "}
            <span className="text-brand-700 dark:text-brand-400 font-normal italic">
              {profile.lastName}
            </span>
            .
          </h1>
          <p className="text-ink-700 dark:text-ink-200 mb-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            I research how organisations — from young ventures to multi-generational family firms
            — build <em>resourcefulness</em> under constraint, and how AI is reshaping the way we
            teach strategy. Faculty at{" "}
            <strong>Great Lakes Institute of Management, Gurgaon</strong>; Ph.D. from{" "}
            <strong>XLRI Jamshedpur</strong>.
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
            <p className="eyebrow mb-4">17 years across industry &amp; academia</p>
            <AffiliationMarquee />
          </div>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.1}>
          <div className="relative">
            <div className="from-brand-500/20 via-accent-500/10 absolute -inset-4 rounded-[28px] bg-gradient-to-br to-transparent blur-2xl" />
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
