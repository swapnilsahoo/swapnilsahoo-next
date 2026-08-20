import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutParagraphs,
  beyondClassroom,
  education,
  languages,
  questionsIReturnTo,
} from "@/features/profile/data/profile";

export function About() {
  return (
    <Reveal>
      <section id="about" className="mb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / About</p>
              <h2 className="display text-4xl font-semibold md:text-5xl">
                From industry practice to the strategy classroom.
              </h2>
            </div>
            <div className="text-ink-700 dark:text-ink-200 space-y-5 text-base leading-relaxed md:col-span-8">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass-card p-5">
                  <p className="eyebrow">Education</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {education.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-5">
                  <p className="eyebrow">Questions I return to</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {questionsIReturnTo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-5">
                  <p className="eyebrow">Languages</p>
                  <p className="mt-2 text-sm leading-relaxed">{languages.join(" · ")}</p>
                </div>
                <div className="glass-card p-5">
                  <p className="eyebrow">Beyond the classroom</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {beyondClassroom.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
