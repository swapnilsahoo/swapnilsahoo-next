import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { OpenGuideButton } from "@/features/digital-avatar/OpenGuideButton";
import { AnimatedAvatar } from "@/features/digital-avatar/AnimatedAvatar";

export const metadata: Metadata = {
  title: "Dr. Swapnil Sahoo AI Mentor",
  description:
    "Find a learning path, explain a concept, practise a case and review your reasoning with prepared guidance and optional device voice.",
  alternates: { canonical: "/digital-guide" },
  openGraph: {
    title: "Dr. Swapnil Sahoo AI Mentor",
    description: "A personal starting point for your next learning decision.",
    images: ["/images/profile_pic.jpg"],
  },
};

const routes = [
  {
    number: "01",
    title: "Put AI to work carefully",
    question: "Where should I start with AI?",
    description: "Write a clear task brief, then test a workflow before adopting it.",
  },
  {
    number: "02",
    title: "Make a strategic choice",
    question: "Help me learn strategy",
    description: "Explore trade-offs, unit economics and the 13-session MBA course map.",
  },
  {
    number: "03",
    title: "Test an entrepreneurial idea",
    question: "Help me test a business idea",
    description: "Set an affordable loss and ask better questions before investing.",
  },
];

export default function DigitalGuidePage() {
  return (
    <main id="main-content" tabIndex={-1} className="pt-24 pb-12 md:pt-32">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-indigo-950/10 bg-[#f4f1ea] p-6 md:grid-cols-[1.05fr_1fr] md:p-12 dark:border-white/10 dark:bg-[#131a27]">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-indigo-800 uppercase dark:text-indigo-300">
              A little direction. A useful next step.
            </p>
            <h1 className="font-serif text-4xl leading-tight text-slate-950 md:text-6xl dark:text-slate-50">
              Meet Swapnil’s
              <br />
              <span className="text-indigo-800 italic dark:text-indigo-300">AI learning mentor.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Meet my digitally created likeness in a small popup beside the page. Watch the
              welcome video, then find a learning path, explain a concept, practise a case or
              review your reasoning. Start with a free lesson and try a decision one step at a time.
            </p>
            <div className="mt-7">
              <OpenGuideButton>Open my AI mentor</OpenGuideButton>
            </div>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              The likeness is AI-created from Swapnil’s portrait. Prepared answers use a standard
              device voice with simple mouth animation. The welcome video is prerecorded; a
              trained conversational video replica is not connected.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-indigo-950/10 bg-white dark:border-white/10 dark:bg-slate-900">
            <div className="avatar-guide avatar-guide-avatar-hero">
              <AnimatedAvatar active={false} />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <div>
                <p className="font-serif text-xl text-slate-950 dark:text-white">
                  Dr. Swapnil Sahoo
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Strategy · Entrepreneurship · Applied AI
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
                Animated likeness
              </span>
            </div>
          </div>
        </div>
        <section className="py-14" aria-labelledby="guide-start">
          <p className="text-xs font-semibold tracking-[0.18em] text-indigo-800 uppercase dark:text-indigo-300">
            Choose a starting point
          </p>
          <h2 id="guide-start" className="mt-3 font-serif text-3xl text-slate-950 dark:text-white">
            What would you like to work on?
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {routes.map((route) => (
              <article
                key={route.number}
                className="flex flex-col items-start rounded-2xl border border-slate-900/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900"
              >
                <span className="font-mono text-xs text-indigo-800 dark:text-indigo-300">
                  {route.number} / Start here
                </span>
                <h3 className="mt-5 font-serif text-2xl text-slate-950 dark:text-white">
                  {route.title}
                </h3>
                <p className="mt-3 mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {route.description}
                </p>
                <OpenGuideButton question={route.question}>Ask the guide</OpenGuideButton>
              </article>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="guide-about"
          className="grid gap-8 border-t border-slate-900/10 pt-10 md:grid-cols-2 dark:border-white/10"
        >
          <div>
            <h2 id="guide-about" className="font-serif text-2xl text-slate-950 dark:text-white">
              A clear place to begin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The mentor connects you to published lessons and programme information. Prepared
              practice tools check arithmetic and help you review a reasoning checklist; they do
              not grade your prose or certify learning. It cannot issue a certificate, confirm a payment or make a booking. Follow the
              linked pages for current availability and contact Swapnil for a personal reply.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/learning-lab/free-courses" className="underline underline-offset-4">
                Browse all six free courses
              </Link>
              <span aria-hidden="true"> · </span>
              <Link href="/learning-lab/catalogue" className="underline underline-offset-4">
                Explore learning paths
              </Link>
              <span aria-hidden="true"> · </span>
              <a href="mailto:swapnil.s@greatlakes.edu.in" className="underline underline-offset-4">
                Email Swapnil
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-slate-950 dark:text-white">
              Your conversation, your choice
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              You choose whether to enable the microphone and start each spoken question. Browser
              voice may send audio to its speech service. Replies use a standard device voice, not a
              clone of Swapnil’s voice. Voice support depends on your browser; text is always
              available. Listening and playback stop when you close the popup, switch modes, change
              pages or leave this tab.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Prepared answers run in your browser. This website does not save your audio or
              conversation; closing, resetting or navigating clears practice attempts, and
              refreshing clears the text. The welcome video uses a
              synthetic voice and plays only when you start it. Live AI video is a separate mode
              that requires your choice before connecting to a provider, once available. Keep
              private, student and employer information out of your questions.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
