import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

type PathwayPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  cardClassName: string;
  frameClassName: string;
  objectPosition?: string;
};

const bSchoolPhotos: readonly PathwayPhoto[] = [
  {
    src: "/images/teaching/karma-yoga/b-schools/classroom-learning.webp",
    alt: "Management students leading a participatory classroom lesson with schoolchildren",
    caption:
      "Learning in the classroom · student teams turn preparation into participatory teaching.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-8",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/field-immersion.webp",
    alt: "Management students walking along a narrow path through cultivated rice fields",
    caption:
      "Walking the field · immersion makes context and constraint impossible to abstract away.",
    width: 480,
    height: 853,
    cardClassName: "md:col-span-4",
    frameClassName: "aspect-[3/4]",
    objectPosition: "center 58%",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/community-listening.webp",
    alt: "Management students listening to schoolchildren in a shaded village courtyard",
    caption: "Listening before designing · learners begin with conversations, not prescriptions.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-6",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/classroom-community.webp",
    alt: "Management students and schoolchildren gathered together inside a classroom",
    caption:
      "Inside the learning community · proximity changes how a managerial problem is framed.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-6",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/library-preparation.webp",
    alt: "A management student sorting children's books in a school library",
    caption:
      "Preparing the library · service also means the quiet work of organising shared resources.",
    width: 800,
    height: 1066,
    cardClassName: "md:col-span-4",
    frameClassName: "aspect-[3/4]",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/school-team.webp",
    alt: "A management student field team standing together outside a government school",
    caption:
      "A team in the field · planning, role clarity and collective accountability travel together.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-8",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/b-schools/student-connection.webp",
    alt: "Management students taking a cheerful group photograph with schoolchildren outdoors",
    caption:
      "Connection before intervention · trust is built in the moments between formal activities.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-12",
    frameClassName: "aspect-[16/9]",
    objectPosition: "center 42%",
  },
];

const indiaPhotos: readonly PathwayPhoto[] = [
  {
    src: "/images/teaching/karma-yoga/mehalchauri/community-circle.webp",
    alt: "Women and girls forming a community circle in a Mehalchauri courtyard",
    caption: "A community circle · participation begins with shared presence.",
    width: 1600,
    height: 900,
    cardClassName: "md:col-span-8",
    frameClassName: "aspect-[16/9]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/clouds-and-rain-workshop.webp",
    alt: "Children at Saraswati Shishu Mandir holding artwork from a clouds and rain workshop",
    caption: "Clouds & Rain · children share their creative work during the April 2026 workshop.",
    width: 1081,
    height: 2400,
    cardClassName: "md:col-span-4",
    frameClassName: "aspect-[3/4]",
    objectPosition: "center 30%",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/school-assembly.webp",
    alt: "Students and teachers gathered for morning assembly at Saraswati Shishu Mandir in Dhaknoli",
    caption: "Morning assembly · Saraswati Shishu Mandir, Dhaknoli.",
    width: 2000,
    height: 901,
    cardClassName: "md:col-span-7",
    frameClassName: "aspect-[16/9]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/community-welcome.webp",
    alt: "Prof. S. K. Palhan exchanging a bouquet with a local school representative",
    caption: "Receiving the team · Prof. S. K. Palhan during the school welcome.",
    width: 1600,
    height: 903,
    cardClassName: "md:col-span-5",
    frameClassName: "aspect-[16/9]",
  },
];

function PhotoSet({
  name,
  photos,
  dark = false,
}: {
  name: "b-schools" | "india";
  photos: readonly PathwayPhoto[];
  dark?: boolean;
}) {
  return (
    <div
      data-photo-set={name}
      role="group"
      aria-label={`${name === "b-schools" ? "Karma Yoga for B-Schools" : "Karma Yoga for India"} photographs`}
      className="mt-10 grid items-start gap-4 md:grid-cols-12"
    >
      {photos.map((photo) => (
        <figure
          key={photo.src}
          data-photo-src={photo.src}
          className={`${photo.cardClassName} overflow-hidden rounded-2xl border shadow-sm ${
            dark
              ? "border-white/10 bg-white/5 shadow-black/20"
              : "border-slate-900/10 bg-white shadow-slate-950/5 dark:border-white/10 dark:bg-slate-950"
          }`}
        >
          <div className={`relative overflow-hidden ${photo.frameClassName}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1280px) 720px, (min-width: 768px) 66vw, calc(100vw - 32px)"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.015]"
              style={{ objectPosition: photo.objectPosition ?? "center" }}
            />
          </div>
          <figcaption
            className={`px-4 py-3 text-xs leading-5 ${
              dark ? "text-slate-300" : "text-ink-600 dark:text-ink-300"
            }`}
          >
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function KarmaYogaPathways() {
  return (
    <div>
      <section
        id="karma-yoga-b-schools"
        aria-labelledby="karma-yoga-b-schools-title"
        className="scroll-mt-24 py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Pathway 01 · Field pedagogy</p>
              <h2
                id="karma-yoga-b-schools-title"
                className="display text-4xl leading-[1.02] font-semibold text-balance sm:text-6xl"
              >
                Karma Yoga for B-Schools
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-3xl text-base leading-8">
                Designed for management education, this pathway turns community engagement into a
                rigorous field laboratory. Student teams move from listening and problem framing to
                co-design, delivery, measurement, handover and reflection.
              </p>
            </div>

            <blockquote className="border-brand-500/40 from-brand-50 to-accent-50/60 dark:from-brand-950/60 rounded-2xl border bg-gradient-to-br p-6 dark:to-slate-950">
              <p className="font-serif text-2xl leading-snug font-semibold text-balance">
                “The classroom travels to the community—and returns with better questions.”
              </p>
              <footer className="text-ink-500 dark:text-ink-400 mt-4 text-xs">
                Field-learning principle
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "Field before framework",
                "Learners encounter people, place and constraint before deciding which managerial lens is useful.",
              ],
              [
                "Service as practice",
                "Teams plan, coordinate, adapt and take responsibility for work whose consequences are real.",
              ],
              [
                "Evidence after action",
                "Outputs, outcomes, partner feedback, limits and handover matter more than a polished activity story.",
              ],
            ].map(([title, description], index) => (
              <article key={title} className="glass-card p-6">
                <span className="text-brand-600 dark:text-brand-300 font-mono text-[10px] font-bold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <PhotoSet name="b-schools" photos={bSchoolPhotos} />

          <a
            href="#learning-loop"
            className="text-brand-700 dark:text-brand-300 mt-8 inline-flex items-center gap-2 text-sm font-bold hover:underline"
          >
            Explore the complete B-school learning architecture
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </Container>
      </section>

      <section
        id="karma-yoga-india"
        aria-labelledby="karma-yoga-india-title"
        className="scroll-mt-24 bg-slate-950 py-16 text-white sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <span className="block h-1 w-14 rounded-full bg-emerald-300" />
              <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-200 uppercase">
                Pathway 02 · Long-horizon partnership
              </p>
              <h2
                id="karma-yoga-india-title"
                className="mt-4 font-serif text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl"
              >
                Karma Yoga for India
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-300">
                Mehalchauri is not a one-visit story. In the Himalayan foothills of Chamoli
                district, Uttarakhand—roughly a 12-hour road journey from Delhi and about 1,750
                metres above sea level—the relationship described in the programme record began
                around 2009–10 and grew through education, local participation, sport, environmental
                stewardship and livelihood experiments.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
                The Mehalchauri story
              </p>
              <h3 className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-4xl">
                A relationship measured in returns, not visits.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                The Indus Quality Foundation extended its work beyond Delhi through Heera Singh
                Negi’s connection to his home village. Over time, local schools, Panchayat members,
                teachers, children and volunteers became partners in a wider programme to connect
                learning, confidence, community capability and care for place.
              </p>
            </div>
          </div>

          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["c. 2009–10", "Partnership begins"],
              ["~1,750 m", "Himalayan foothills"],
              ["1–6 Apr 2026", "Documented return"],
              ["100+ children", "Reported in the post-visit deck"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="text-xs leading-5 text-slate-400">{label}</dt>
                <dd className="mt-2 font-serif text-2xl font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {[
              [
                "01",
                "A relationship begins",
                "The source record differs on the exact starting year, so the story is dated carefully to around 2009–10.",
              ],
              [
                "02",
                "Trust through learning",
                "Libraries, computer literacy, science, creativity, sport and teacher engagement created repeated points of connection.",
              ],
              [
                "03",
                "Small, linked experiments",
                "Historical programme records connect solar lighting with mulberry planting, and school technology with oak plantation.",
              ],
              [
                "04",
                "The 2026 return",
                "The April deck documents school assembly, creative workshops, river stewardship, games, cultural exchange and reflection.",
              ],
              [
                "05",
                "Learning travels both ways",
                "The work treats community members as partners in judgment—not recipients at the end of a management exercise.",
              ],
            ].map(([number, title, description]) => (
              <li key={number} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-mono text-[10px] font-bold text-emerald-200">{number}</span>
                <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>

          <PhotoSet name="india" photos={indiaPhotos} dark />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <blockquote className="rounded-3xl border border-emerald-300/25 bg-emerald-300/8 p-7 sm:p-9">
              <p className="font-serif text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                “They taught us hope in the simplest way, and left their smiles with us to stay.”
              </p>
              <footer className="mt-5 text-sm text-emerald-100">
                Ruhan Bhatia · student reflection, April 2026
              </footer>
            </blockquote>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 text-xs leading-6 text-slate-400">
              <p className="font-mono font-bold tracking-[0.14em] text-slate-300 uppercase">
                Editorial note
              </p>
              <p className="mt-3">
                This account draws on the April 2026 post-visit deck, the pre-visit planning note
                and the historical case supplied for this page. Planned activities are not described
                as completed unless the post-visit deck records them; historical outcomes are
                labelled as historical.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
