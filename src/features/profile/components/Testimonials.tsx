import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/features/profile/data/testimonials";

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <figure className="glass-card flex h-full flex-col p-6">
      <span className="text-brand-300 dark:text-brand-700 font-serif text-4xl leading-none" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="text-ink-700 dark:text-ink-200 mt-2 flex-1 text-sm leading-relaxed">
        {testimonial.quote}
      </blockquote>
      <figcaption className="border-ink-200/70 dark:border-ink-700 mt-5 border-t pt-4">
        <p className="font-serif text-sm font-semibold">{testimonial.name}</p>
        <p className="text-ink-500 dark:text-ink-400 mt-0.5 text-xs">
          {testimonial.title} · {testimonial.company}
        </p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const featured = testimonials.slice(0, 6);
  const rest = testimonials.slice(6);

  return (
    <Reveal>
      <section id="testimonials" className="mb-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / What colleagues say</p>
              <h2 className="display text-4xl font-semibold md:text-5xl">
                Seventeen years, in their words.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
              Recommendations from teammates, clients and managers across Accenture, Cognizant,
              Mahindra Comviva, TimesofMoney and 42Gears Mobility—the industry years the research
              and teaching now draw on.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          {rest.length > 0 && (
            <details className="group mt-4">
              <summary className="text-brand-700 dark:text-brand-300 mt-4 flex cursor-pointer list-none items-center gap-2 text-sm font-semibold marker:hidden">
                Show all {testimonials.length} recommendations
                <span
                  className="border-ink-300 dark:border-ink-600 flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((testimonial) => (
                  <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                ))}
              </div>
            </details>
          )}
        </Container>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
