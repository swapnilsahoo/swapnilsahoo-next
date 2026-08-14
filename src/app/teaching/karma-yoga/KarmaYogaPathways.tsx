import Image from "next/image";
import Link from "next/link";

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
  {
    src: "/images/teaching/karma-yoga/mehalchauri/community-shrine-visit-2026.webp",
    alt: "Prof. S. K. Palhan and Dr. Swapnil Sahoo with local families and children at a village shrine",
    caption:
      "A village welcome · Prof. S. K. Palhan and Dr. Swapnil Sahoo with families and children at the shrine.",
    width: 1600,
    height: 1201,
    cardClassName: "md:col-span-7",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/family-visit-2026.webp",
    alt: "Great Lakes students gathered with a Mehalchauri family outside their home",
    caption: "With a Mehalchauri family · the team pauses for a group photo during the visit.",
    width: 1201,
    height: 1600,
    cardClassName: "md:col-span-5",
    frameClassName: "aspect-[3/4]",
  },
];

const historicalPhotos: readonly PathwayPhoto[] = [
  {
    src: "/images/teaching/karma-yoga/mehalchauri/historical/hands-on-science.webp",
    alt: "A facilitator guiding schoolchildren through a hands-on science activity",
    caption:
      "Learning by doing · children explore science through experiment and observation in the historical programme archive.",
    width: 1600,
    height: 900,
    cardClassName: "md:col-span-7",
    frameClassName: "aspect-[16/9]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/historical/girls-football-coaching.webp",
    alt: "Girls in sports uniforms gathered with programme facilitators on a Himalayan playing field",
    caption:
      "Confidence in motion · a team-side conversation during girls’ football in the historical programme archive.",
    width: 1600,
    height: 900,
    cardClassName: "md:col-span-5",
    frameClassName: "aspect-[16/9]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/historical/village-panchayat-dialogue.webp",
    alt: "Village residents and programme partners seated together in a courtyard discussion",
    caption:
      "Listening before action · the archive records residents and programme partners meeting with the Panchayat in neighbouring Silanga.",
    width: 1600,
    height: 1200,
    cardClassName: "md:col-span-12",
    frameClassName: "aspect-[16/9]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/historical/geometry-activity.webp",
    alt: "Schoolchildren gathered around a pattern-block geometry activity with a facilitator",
    caption:
      "Shapes and patterns · a hands-on geometry activity from the historical programme archive.",
    width: 1600,
    height: 1200,
    cardClassName: "md:col-span-7",
    frameClassName: "aspect-[4/3]",
  },
  {
    src: "/images/teaching/karma-yoga/mehalchauri/historical/volunteer-teaching.webp",
    alt: "A student volunteer demonstrating an activity with wooden sticks to schoolchildren in a classroom",
    caption:
      "A volunteer-led lesson · the archive records a hands-on classroom activity with local schoolchildren.",
    width: 1280,
    height: 960,
    cardClassName: "md:col-span-5",
    frameClassName: "aspect-[4/3]",
  },
];

const mehalchauriWorkstreams = [
  {
    number: "01",
    title: "Learning infrastructure",
    description:
      "Computer literacy and centres, libraries, science labs, toy banks and classroom support widened the spaces in which children could learn.",
  },
  {
    number: "02",
    title: "Sport and confidence",
    description:
      "Girls’ football and team games made participation visible. The 2019 case reports four local students selected for Uttarakhand’s Under-14 football team.",
  },
  {
    number: "03",
    title: "Energy and environment",
    description:
      "Solar lamps, LED lighting, cleanliness drives and tree planting joined practical community needs with care for the Himalayan landscape.",
  },
  {
    number: "04",
    title: "Livelihood experiments",
    description:
      "Napier grass, mulberry and walnut cultivation were explored; agricultural advice in 2016 connected fodder, farming and longer-term resilience.",
  },
  {
    number: "05",
    title: "Community capability",
    description:
      "Panchayat consultation, tool-sharing centres, teacher workshops and career guidance placed local institutions at the centre of the work.",
  },
  {
    number: "06",
    title: "Creativity and culture",
    description:
      "Creative programmes, cultural events, student exchanges, yoga centres and Centres of Joy created recurring spaces for expression and connection.",
  },
] as const;

const mehalchauriTimeline = [
  {
    date: "2008",
    title: "The invitation",
    description:
      "As the Indus Quality Foundation considered work beyond Delhi, Heera Singh Negi proposed a relationship with his home village.",
  },
  {
    date: "c. 2009–10",
    title: "Field partnership begins",
    description:
      "The supplied sources differ by a year, so the beginning is dated carefully. Schools, children, local leaders and volunteers became recurring partners.",
  },
  {
    date: "2016",
    title: "Agricultural knowledge joins",
    description:
      "Agricultural scientist Dr. Anil Kishore Joshi advised on Napier grass, mulberry and walnut cultivation as the work broadened beyond education.",
  },
  {
    date: "2019 case record",
    title: "Sport becomes a signal",
    description:
      "The historical case reports four Mehalchauri students selected for Uttarakhand’s state Under-14 football team—a marker of confidence built over time.",
  },
  {
    date: "1–6 Apr 2026",
    title: "A documented return",
    description:
      "The post-visit deck records a school assembly, Clouds & Rain workshops, a riverbank clean-up, games, cultural exchange and reflection, reporting participation by 100+ children across 3+ schools and villages.",
  },
] as const;

function PhotoSet({
  name,
  ariaLabel,
  photos,
  dark = false,
}: {
  name: "b-schools" | "historical" | "india";
  ariaLabel: string;
  photos: readonly PathwayPhoto[];
  dark?: boolean;
}) {
  return (
    <div
      data-photo-set={name}
      role="group"
      aria-label={ariaLabel}
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

export function KarmaYogaBranchNav({ current }: { current: "b-schools" | "india" }) {
  return (
    <Container className="max-w-6xl">
      <nav
        aria-label="Karma Yoga pathways"
        className="nav-glass my-6 flex flex-wrap items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold lg:my-8"
      >
        <Link
          href="/teaching/karma-yoga"
          className="rounded-lg px-3 py-2 transition hover:bg-blue-600/8 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Karma Yoga hub
        </Link>
        <span className="text-ink-300 dark:text-ink-600" aria-hidden="true">
          /
        </span>
        <Link
          href="/teaching/karma-yoga/b-schools"
          aria-current={current === "b-schools" ? "page" : undefined}
          className="aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-800 dark:aria-[current=page]:bg-brand-950 rounded-lg px-3 py-2 transition hover:bg-blue-600/8 hover:text-blue-700 dark:hover:text-blue-300"
        >
          For B-Schools
        </Link>
        <Link
          href="/teaching/karma-yoga/india"
          aria-current={current === "india" ? "page" : undefined}
          className="aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-800 dark:aria-[current=page]:bg-brand-950 rounded-lg px-3 py-2 transition hover:bg-blue-600/8 hover:text-blue-700 dark:hover:text-blue-300"
        >
          For India · Mehalchauri
        </Link>
      </nav>
    </Container>
  );
}

export function KarmaYogaBschoolsStory() {
  return (
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
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">{description}</p>
            </article>
          ))}
        </div>

        <PhotoSet
          name="b-schools"
          ariaLabel="Karma Yoga for B-Schools photographs"
          photos={bSchoolPhotos}
        />

        <a
          href="#learning-loop"
          className="text-brand-700 dark:text-brand-300 mt-8 inline-flex items-center gap-2 text-sm font-bold hover:underline"
        >
          Explore the complete B-school learning architecture
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}

export function KarmaYogaIndiaStory() {
  return (
    <section
      id="mehalchauri-story"
      aria-labelledby="mehalchauri-story-title"
      className="scroll-mt-24 bg-slate-950 py-16 text-white sm:py-24"
    >
      <Container className="max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <span className="block h-1 w-14 rounded-full bg-emerald-300" />
            <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-200 uppercase">
              Mehalchauri · Chamoli district, Uttarakhand
            </p>
            <h2
              id="mehalchauri-story-title"
              className="mt-4 font-serif text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl"
            >
              A relationship measured in returns, not visits.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              Mehalchauri is not a one-visit story. In the Himalayan foothills of Chamoli district,
              Uttarakhand—roughly a 12-hour road journey from Delhi and about 1,750 metres above sea
              level—the relationship described in the programme record began around 2009–10 and grew
              through education, local participation, sport, environmental stewardship and
              livelihood experiments.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
              The partnership principle
            </p>
            <h3 className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-4xl">
              Begin with local relationships. Stay long enough to learn.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              The Indus Quality Foundation extended its work beyond Delhi through Heera Singh Negi’s
              connection to his home village. Over time, local schools, Panchayat members, teachers,
              children and volunteers became partners in a wider programme to connect learning,
              confidence, community capability and care for place.
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

        <section aria-labelledby="mehalchauri-archive-title" className="mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
              Historical programme archive · Before April 2026
            </p>
            <h3
              id="mehalchauri-archive-title"
              className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-5xl"
            >
              Science, sport and village dialogue in the field.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              These photographs come from the historical programme deck. They document earlier
              activity in and around the Mehalchauri relationship; the Panchayat image is from
              neighbouring Silanga and is identified accordingly.
            </p>
          </div>

          <PhotoSet
            name="historical"
            ariaLabel="Historical Mehalchauri programme photographs"
            photos={historicalPhotos}
            dark
          />
        </section>

        <section aria-labelledby="mehalchauri-work-title" className="mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
              Work in Mehalchauri · Historical programme record
            </p>
            <h3
              id="mehalchauri-work-title"
              className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-5xl"
            >
              A village partnership built through many small, connected acts.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              Across the 2010s, the supplied programme record documents work spanning learning,
              sport, energy, environment, livelihoods and community institutions. These are
              historical programme activities and reported outcomes—not claims about present-day
              conditions.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mehalchauriWorkstreams.map(({ number, title, description }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-mono text-[10px] font-bold text-emerald-200">{number}</span>
                <h4 className="mt-4 font-serif text-xl font-semibold">{title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="mehalchauri-connected-title"
          className="mt-10 overflow-hidden rounded-3xl border border-emerald-300/20 bg-emerald-300/8 p-6 sm:p-9"
        >
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
                Connected experiments · Historical case record
              </p>
              <h3
                id="mehalchauri-connected-title"
                className="mt-4 font-serif text-3xl font-semibold text-balance"
              >
                One action was designed to unlock another.
              </h3>
              <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                The historical case describes practical exchanges that linked education, energy,
                agriculture and collective environmental action.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [
                  "Light + fodder",
                  "Two LED lamps per household were tied to planting ten mulberry trees, linking energy access with cattle fodder.",
                ],
                [
                  "Technology + trees",
                  "A village could earn a computer by planting 100 oak trees, making school technology depend on collective action.",
                ],
                [
                  "Planting + practice",
                  "The case exhibit records 117 walnut trees planted; later agricultural advice broadened the cultivation experiments.",
                ],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-5"
                >
                  <h4 className="font-serif text-lg font-semibold text-emerald-50">{title}</h4>
                  <p className="mt-3 text-xs leading-6 text-slate-300">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="mehalchauri-timeline-title" className="mt-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
              The relationship over time
            </p>
            <h3
              id="mehalchauri-timeline-title"
              className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-4xl"
            >
              From invitation to a documented return.
            </h3>
          </div>

          <ol className="mt-8 grid gap-4 lg:grid-cols-5">
            {mehalchauriTimeline.map(({ date, title, description }) => (
              <li key={date} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-mono text-[10px] font-bold text-emerald-200">{date}</span>
                <h4 className="mt-4 font-serif text-xl font-semibold">{title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 max-w-2xl">
          <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
            The April 2026 return · In pictures
          </p>
          <h3 className="mt-4 font-serif text-3xl font-semibold text-balance sm:text-4xl">
            Learning, welcome and creative exchange.
          </h3>
        </div>

        <PhotoSet
          name="india"
          ariaLabel="April 2026 Mehalchauri return photographs"
          photos={indiaPhotos}
          dark
        />

        <section
          aria-labelledby="mehalchauri-reuse-title"
          className="mt-10 overflow-hidden rounded-3xl border border-emerald-300/20 bg-emerald-300/8 p-6 sm:p-9"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-200 uppercase">
                Documented April 2026 activity
              </p>
              <h3
                id="mehalchauri-reuse-title"
                className="mt-4 font-serif text-2xl font-semibold text-balance sm:text-3xl"
              >
                Over 500 hostel bedsheets became carry bags.
              </h3>
              <p className="mt-4 text-sm leading-7 text-emerald-50/80 sm:text-base">
                Used hostel bedsheets were repurposed into durable carry bags and distributed to
                residents of Salinga and Mehalchauri alongside saplings during the return visit,
                cutting textile waste while offering a practical, reusable alternative to
                single-use plastic.
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/gallery/karma-yoga-salinga-mehalchauri-bag-reuse.jpg"
                alt="Residents of Salinga and Mehalchauri holding saplings and repurposed cloth carry bags"
                width={1600}
                height={1600}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="bg-slate-950/60 px-4 py-3 text-xs text-emerald-50/70">
                Saplings and repurposed bags handed to residents of Salinga and Mehalchauri.
              </figcaption>
            </figure>
          </div>
        </section>

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
              This account draws on the April 2026 post-visit deck, the pre-visit planning note and
              the historical case supplied for this page. Planned activities are not described as
              completed unless the post-visit deck records them; historical outcomes are labelled as
              historical.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
