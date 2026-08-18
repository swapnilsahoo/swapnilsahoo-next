import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Entrepreneurship Shelf",
  description:
    "A first-person reading and watching list for entrepreneurship: books, films, series and documentaries I actually point students to, each with why it earns a place on the shelf.",
  keywords: [
    "entrepreneurship books",
    "entrepreneurship movies",
    "startup documentaries",
    "MBA reading list",
    "Zero to One",
    "The Social Network",
    "effectuation",
    "business simulation reading list",
  ],
  alternates: { canonical: "/teaching/reading-and-watching-list" },
  openGraph: {
    type: "article",
    title: "The Entrepreneurship Shelf",
    description:
      "Books, films, series and documentaries I actually point students to — starting with entrepreneurship.",
    url: "/teaching/reading-and-watching-list",
    images: ["/images/profile_pic.jpg"],
  },
};

type ShelfItem = {
  title: string;
  creator: string;
  year: string;
  why: string;
};

const books: ShelfItem[] = [
  {
    title: "Zero to One",
    creator: "Peter Thiel, with Blake Masters",
    year: "2014",
    why: "The book I'd hand a student who thinks ‘disruption’ means ‘slightly cheaper.’ Thiel's real argument is uncomfortable: competition destroys value, and the businesses worth building escape it entirely by doing something so different it isn't competing with anyone yet. Read it looking for the argument you disagree with — that's usually the more useful read.",
  },
  {
    title: "The Lean Startup",
    creator: "Eric Ries",
    year: "2011",
    why: "Build-measure-learn has become such standard vocabulary that it's worth returning to where it came from. Ries's real contribution isn't the MVP — it's the discipline of treating a business plan as a set of falsifiable assumptions, not a forecast to defend.",
  },
  {
    title: "Effectuation: Elements of Entrepreneurial Expertise",
    creator: "Saras D. Sarasvathy",
    year: "2008",
    why: "This is the book behind a good portion of my own doctoral work, and I still remember the slightly surreal feeling of meeting Prof. Sarasvathy in person at AOM 2026. Effectuation flips the plan-then-execute model of strategy on its head: expert entrepreneurs start from means, not goals, and build toward whatever becomes possible along the way.",
  },
  {
    title: "The Innovator's Dilemma",
    creator: "Clayton M. Christensen",
    year: "1997",
    why: "Christensen's core puzzle: why do well-run, well-resourced, customer-obsessed companies keep losing to upstarts building worse products? The answer — that the metrics of good management can blind a firm to a market it hasn't been asked to serve yet — is one of the few genuinely counter-intuitive ideas in management that has held up for three decades.",
  },
  {
    title: "Shoe Dog",
    creator: "Phil Knight",
    year: "2016",
    why: "A memoir, not a management book, and better for it. What comes through page after page is how much of Nike's early survival was pure resourcefulness under constraint — bank credit lines called in, currency crises, a company perpetually one bad quarter from insolvency. It's the most honest account I know of what ‘bootstrapped’ actually feels like from the inside.",
  },
  {
    title: "The Hard Thing About Hard Things",
    creator: "Ben Horowitz",
    year: "2014",
    why: "Most entrepreneurship books tell you what to do when things are going well. This one is almost entirely about what to do when they aren't — layoffs, a co-founder who has to go, a product that quietly stopped working. Read it for the operating discipline, not the war stories.",
  },
  {
    title: "Bad Blood",
    creator: "John Carreyrou",
    year: "2018",
    why: "Every entrepreneurship reading list needs at least one cautionary tale, and this is the sharpest one written this century. Carreyrou's reporting on Theranos is a genuinely useful case study in exactly where conviction curdles into fraud — and how much of it was enabled by people who wanted to believe.",
  },
  {
    title: "Crossing the Chasm",
    creator: "Geoffrey A. Moore",
    year: "1991",
    why: "Old enough that some of the examples feel dated, and the core idea hasn't aged a day: the customers who love your product first are not the customers who will make it a business. The gap between early adopters and the mainstream market is where most genuinely good products go to die.",
  },
];

const movies: ShelfItem[] = [
  {
    title: "The Social Network",
    creator: "dir. David Fincher",
    year: "2010",
    why: "Less a Facebook origin story than a case study in what founding-team equity conflict actually looks like once lawyers get involved. Watch it for the deposition structure alone — it's a masterclass in how the same eight weeks can be narrated as heroism or betrayal depending on who's telling it.",
  },
  {
    title: "The Founder",
    creator: "dir. John Lee Hancock",
    year: "2016",
    why: "Ray Kroc didn't invent a better hamburger — he saw that McDonald's was really a real-estate and franchising system wearing a fast-food costume. The uncomfortable lesson is that the business-model insight beat the product insight, and the film doesn't let Kroc, or the audience, off easily for how that played out.",
  },
  {
    title: "Steve Jobs",
    creator: "dir. Danny Boyle",
    year: "2015",
    why: "Structured around three product launches instead of a life story, which turns out to be the right choice — it isolates exactly the moments where Jobs's obsession with taste and control produced both his best work and his worst behaviour toward the people who made it possible.",
  },
  {
    title: "Joy",
    creator: "dir. David O. Russell",
    year: "2015",
    why: "Loosely based on Joy Mangano, inventor of the Miracle Mop, and one of the few films on this list where the founder is a woman navigating family financing, patent disputes and shopping-channel pitch meetings rather than venture capital. Worth it for the invention-to-market mechanics alone.",
  },
  {
    title: "Moneyball",
    creator: "dir. Bennett Miller",
    year: "2011",
    why: "It's about baseball the way Zero to One is about search engines — not really. Billy Beane's Oakland A's are a small-budget competitor systematically out-thinking bigger-resourced rivals by trusting a different measurement system than everyone else in the room. That's a strategy case, not a sports story.",
  },
  {
    title: "BlackBerry",
    creator: "dir. Matt Johnson",
    year: "2023",
    why: "The most useful recent addition to this list. BlackBerry doesn't just show a company losing to the iPhone — it shows an engineering-led culture that built the wrong kind of moat, defended it well past the point it mattered, and never let go of certainty long enough to notice the market had already moved.",
  },
  {
    title: "Rocket Singh: Salesman of the Year",
    creator: "dir. Shimit Amin",
    year: "2009",
    why: "An underdog-builds-a-company story set in Delhi's IT sales world rather than Silicon Valley, which makes it more useful for this classroom than most of the Hollywood entries here — the financing, the moonlighting risk and the customer-trust problem all read as immediately familiar to an Indian cohort.",
  },
];

const series: ShelfItem[] = [
  {
    title: "Silicon Valley",
    creator: "HBO",
    year: "2014–2019",
    why: "Played for comedy, but the term sheets, cap-table fights, accelerator politics and pivot conversations are closer to accurate than almost anything else scripted television has done with startup life. Watch an episode after we cover valuation or dilution in class — the jokes land differently.",
  },
  {
    title: "Super Pumped: The Battle for Uber",
    creator: "Showtime",
    year: "2022",
    why: "A study in what ‘growth at all costs’ costs. Travis Kalanick's Uber is presented as neither pure villain nor misunderstood genius — the more useful read is watching exactly which early decisions, made under real competitive pressure, calcified into a culture nobody could later walk back.",
  },
  {
    title: "WeCrashed",
    creator: "Apple TV+",
    year: "2022",
    why: "Adam Neumann's WeWork is the cleanest recent example of a founder's personal charisma substituting for a business model long after investors should have asked harder questions. Good pairing with Bad Blood for a conversation about why boards let this happen twice in one decade.",
  },
  {
    title: "Shark Tank India",
    creator: "Sony LIV",
    year: "2021–present",
    why: "The pitch format is the pedagogy here — watch a handful of episodes back to back and you'll see the same handful of valuation, unit-economics and market-size arguments recur across completely different products. Good homework before any student pitches an idea to me.",
  },
];

const documentaries: ShelfItem[] = [
  {
    title: "Inside Bill's Brain: Decoding Bill Gates",
    creator: "dir. Davis Guggenheim · Netflix",
    year: "2019",
    why: "Less about Microsoft than about what happens after the company-building is largely done — how a famously technical, obsessive mind reallocates itself toward philanthropy at the scale of a nation-state's public health budget. Useful for a conversation about what founders owe the world once they've won.",
  },
  {
    title: "The Social Dilemma",
    creator: "dir. Jeff Orlowski · Netflix",
    year: "2020",
    why: "The entrepreneurs and engineers who built the attention economy, on camera, explaining what they built and why they've stopped letting their own children use it. I don't agree with every conclusion the film reaches, but the discomfort of the people being interviewed is real and worth sitting with.",
  },
  {
    title: "General Magic",
    creator: "dir. Sarah Kerruish & Matt Maude",
    year: "2018",
    why: "The best documentary on this list that almost nobody has heard of. General Magic invented most of what became the smartphone years before the iPhone, inside a company almost nobody remembers, staffed by people who went on to build the products that made them famous elsewhere. It's the best case study I know for what it costs to be right too early.",
  },
  {
    title: "Startup.com",
    creator: "dir. Jehane Noujaim & Chris Hegedus",
    year: "2001",
    why: "Filmed in real time during the dot-com collapse, following govWorks.com's two co-founders as their friendship and their company fail together. There's no hindsight narration softening it — you watch the actual decisions get made, in the actual room, without knowing yet how badly they'll turn out.",
  },
];

function ShelfCard({ item, index }: { item: ShelfItem; index: number }) {
  const isSarasvathy = item.title.startsWith("Effectuation");

  return (
    <article className="glass-card h-full p-6">
      <span className="text-ink-400 font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 font-serif text-xl font-semibold">{item.title}</h3>
      <p className="text-ink-500 dark:text-ink-400 mt-1 text-xs font-semibold tracking-wide uppercase">
        {item.creator} · {item.year}
      </p>
      <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">{item.why}</p>
      {isSarasvathy ? (
        <Link
          href="/press#linkedin-title"
          className="text-brand-700 dark:text-brand-300 link-underline mt-4 inline-flex items-center gap-1 text-xs font-semibold"
        >
          Read the AOM 2026 post
          <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
        </Link>
      ) : null}
    </article>
  );
}

export default function ReadingAndWatchingListPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/#teaching"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Teaching
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              The Entrepreneurship Shelf
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  Teaching · Entrepreneurship · Reading channel · Video channel
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  The <span className="text-brand-200 font-normal italic">shelf.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  Not a syllabus — a shelf. Books, films, series and documentaries I actually
                  point students to, each with a reason it earns the recommendation rather than
                  just a synopsis. Starting with entrepreneurship; more topics will join as the
                  shelf grows.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#reading-channel"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the reading channel
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#video-channel"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the video channel
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Topic
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">Entrepreneurship</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    On the shelf
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">23 recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="shelf-questions"
        eyebrow="Before you add one to your list"
        title="Ask this before you pick the next one up."
        questions={[
          "Would you have picked this up without an assignment attached to it?",
          "What's the one scene, chapter or episode you'd actually defend in a debrief?",
          "Does this change what you'd do in your own venture, or just what you'd say about it?",
        ]}
      />

      <section id="reading-channel" aria-labelledby="reading-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / Reading channel</p>
            <h2 id="reading-title" className="display text-4xl font-semibold md:text-5xl">
              Eight books worth actually finishing.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Not the twenty everyone lists. Eight I&apos;d defend one at a time, from the
              founding theory to the cautionary tale.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((item, index) => (
              <Reveal key={item.title} delay={(index % 4) * 0.05}>
                <ShelfCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="video-channel" aria-labelledby="video-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Video channel</p>
            <h2 id="video-title" className="display text-4xl font-semibold md:text-5xl">
              Films, series and documentaries that hold up as case studies.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Entertainment first, but every title here survives being asked a serious question
              afterward.
            </p>
          </div>

          <div className="mb-4">
            <p className="eyebrow mb-4">Movies</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {movies.map((item, index) => (
                <Reveal key={item.title} delay={(index % 4) * 0.05}>
                  <ShelfCard item={item} index={index} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow mb-4">Series</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {series.map((item, index) => (
                <Reveal key={item.title} delay={(index % 4) * 0.05}>
                  <ShelfCard item={item} index={index} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow mb-4">Documentaries</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {documentaries.map((item, index) => (
                <Reveal key={item.title} delay={(index % 4) * 0.05}>
                  <ShelfCard item={item} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-to-use-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 rounded-[28px] bg-gradient-to-br p-8 text-white shadow-xl shadow-blue-950/15 sm:p-12">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              How I&apos;d actually use this
            </p>
            <h2
              id="how-to-use-title"
              className="mt-3 max-w-2xl font-serif text-3xl font-semibold sm:text-4xl"
            >
              One a month, with a question attached, beats the whole shelf in a weekend.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-blue-100">
              Pick one title, finish it, and come to office hours with the one thing in it
              you&apos;d argue with. That conversation teaches more than reading the whole shelf
              without stopping to disagree with any of it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/teaching/business-simulation"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Back to Business Simulation
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/teaching/consulting-interviews"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Cracking Consulting Interviews
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
