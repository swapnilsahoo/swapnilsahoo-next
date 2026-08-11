import { ArrowRightIcon, MailIcon } from "@/components/icons/LineIcons";
import { researchCollaborationHref } from "@/features/research/data/researchAgenda";
import { profile } from "@/features/profile/data/profile";

export function CollaborationInvite({
  subject,
  description,
}: {
  subject: string;
  description: string;
}) {
  return (
    <section
      id="collaborate"
      aria-labelledby="collaborate-title"
      className="overflow-hidden rounded-2xl bg-[#111827] p-6 text-white sm:p-9 lg:p-11"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.14em] text-blue-200 uppercase">
            Build the next study together
          </p>
          <h2 id="collaborate-title" className="display mt-3 text-3xl font-semibold sm:text-5xl">
            A useful collaboration starts with a precise question.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={researchCollaborationHref(subject)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
          >
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            Propose a collaboration
          </a>
          <a
            href={profile.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Book a conversation
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
