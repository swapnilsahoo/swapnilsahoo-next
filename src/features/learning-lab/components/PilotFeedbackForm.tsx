"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { pilotFeedbackSchema, pilotLessons } from "../pilot";
import { useLabHydrated } from "./useLabHydrated";

export function PilotFeedbackForm({
  available,
  contactEmail,
  learningNotesAvailable,
}: {
  available: boolean;
  contactEmail: string;
  learningNotesAvailable: boolean;
}) {
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const hydrated = useLabHydrated();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<{ message: string; id: string } | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (pending) return;
    const name = Object.keys(errors)[0];
    if (!name) return;
    const input = form.current?.elements.namedItem(name);
    if (input instanceof HTMLElement) input.focus();
  }, [errors, pending]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const values = new FormData(event.currentTarget);
    const campaign = new URLSearchParams();
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
      const value = params.get(key);
      if (value) campaign.set(key, value.slice(0, 100));
    }
    const result = pilotFeedbackSchema.safeParse({
      ...Object.fromEntries(values),
      name: String(values.get("name") || "").trim(),
      email: String(values.get("email") || "").trim(),
      adultConfirmed: values.has("adultConfirmed"),
      voluntaryConfirmed: values.has("voluntaryConfirmed"),
      privacyAccepted: values.has("privacyAccepted"),
      followUpConsent: values.has("followUpConsent"),
      learningNotesConsent: learningNotesAvailable && values.has("learningNotesConsent"),
      startedAt: startedAt.current,
      source: `/learning-lab/pilot${campaign.size ? `?${campaign}` : ""}`.slice(0, 300),
    });
    setError("");
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [
            issue.path.join("."),
            "Please complete this field with a valid response.",
          ])
        )
      );
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/learning-lab/pilot-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data: {
        ok?: boolean;
        id?: string;
        message?: string;
        error?: string;
        fields?: Record<string, string>;
      } = await response.json();
      if (!response.ok || !data.ok || !data.id) {
        if (data.fields) setErrors(data.fields);
        setError(
          data.error ||
            "Your feedback could not be saved. Your entries are still here; please try again."
        );
        return;
      }
      setSaved({
        id: data.id,
        message: data.message || "Your volunteer feedback has been saved. No email has been sent.",
      });
    } catch {
      setError(
        "Your feedback could not be saved. Check your connection and try again; your entries are still here."
      );
    } finally {
      setPending(false);
    }
  }

  if (!available)
    return (
      <aside className="lab-callout">
        <h3>Online feedback is temporarily unavailable.</h3>
        <p>
          You can still try every lesson. To share feedback,{" "}
          <a
            className="lab-text-link"
            href={`mailto:${contactEmail}?subject=Learning%20Lab%20volunteer%20feedback`}
          >
            email the Lab
          </a>
          . This opens your email app; the website does not save or send it.
        </p>
      </aside>
    );

  if (saved)
    return (
      <div className="lab-status" role="status">
        <h3>Volunteer feedback saved</h3>
        <p>{saved.message}</p>
        <p className="lab-small">
          Reference: <span style={{ overflowWrap: "anywhere" }}>{saved.id}</span>. Keep this
          reference if you request a correction or deletion at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <p className="lab-small">
          Your response remains private. Your most recent pilot response controls the optional email
          choices across all pilot lessons, subject to any STOP reply. A personal reply is not
          guaranteed.
        </p>
        <Link className="lab-text-link" href="/learning-lab/free-courses">
          Return to free lessons →
        </Link>
      </div>
    );

  const field = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `pilot-${name}-error` : undefined,
  });
  const fieldError = (name: string) =>
    errors[name] ? (
      <span className="lab-error" id={`pilot-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  return (
    <form
      ref={form}
      className="lab-form"
      aria-label="Volunteer lesson feedback"
      method="post"
      noValidate
      onSubmit={submit}
    >
      <h3>Share one attempt</h3>
      <p className="lab-small">
        Fields marked * are required. Use your name or an alias and a real email so a correction or
        withdrawal request can be matched to your response. No general mailing-list signup is
        created; pilot practice notes are a separate optional choice.
      </p>
      {error && (
        <p className="lab-status lab-status-error" role="alert">
          {error}
        </p>
      )}
      <fieldset disabled={!hydrated || pending} className="lab-form-fieldset">
        <legend className="sr-only">Your voluntary trial and feedback</legend>
        <div className="lab-form-grid">
          <div className="lab-field">
            <label htmlFor="pilot-name">Name or alias *</label>
            <input
              id="pilot-name"
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              {...field("name")}
            />
            {fieldError("name")}
          </div>
          <div className="lab-field">
            <label htmlFor="pilot-email">Email *</label>
            <input
              id="pilot-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              {...field("email")}
            />
            {fieldError("email")}
          </div>
        </div>
        <div className="lab-field">
          <label htmlFor="pilot-lessonSlug">Lesson you tried *</label>
          <select
            id="pilot-lessonSlug"
            name="lessonSlug"
            defaultValue=""
            required
            {...field("lessonSlug")}
          >
            <option value="">Choose your lesson</option>
            {pilotLessons.map((lesson) => (
              <option key={lesson.slug} value={lesson.slug}>
                {lesson.title}
              </option>
            ))}
          </select>
          {fieldError("lessonSlug")}
        </div>
        <div className="lab-form-grid">
          <div className="lab-field">
            <label htmlFor="pilot-attempt">How far did you get? *</label>
            <select
              id="pilot-attempt"
              name="attempt"
              defaultValue=""
              required
              {...field("attempt")}
            >
              <option value="">Choose an answer</option>
              <option value="completed">I completed the task</option>
              <option value="stopped">I stopped before completing it</option>
            </select>
            {fieldError("attempt")}
          </div>
          <div className="lab-field">
            <label htmlFor="pilot-clarity">How clear were the instructions? *</label>
            <select
              id="pilot-clarity"
              name="clarity"
              defaultValue=""
              required
              {...field("clarity")}
            >
              <option value="">Choose an answer</option>
              <option value="clear">Clear enough to use independently</option>
              <option value="some-confusion">Some parts were unclear</option>
              <option value="blocked">I could not work out how to continue</option>
            </select>
            {fieldError("clarity")}
          </div>
        </div>
        <div className="lab-field">
          <label htmlFor="pilot-answer">Your reasoning, or where you stopped *</label>
          <textarea
            id="pilot-answer"
            name="answer"
            minLength={10}
            maxLength={600}
            rows={5}
            required
            {...field("answer")}
          />
          <span className="lab-small">
            Use the output prompt above. If you stopped, explain what you tried and where you got
            stuck. 10–600 characters; use only fictional information.
          </span>
          {fieldError("answer")}
        </div>
        <div className="lab-field">
          <label htmlFor="pilot-friction">
            What was difficult, or what should change? (optional)
          </label>
          <textarea
            id="pilot-friction"
            name="friction"
            maxLength={350}
            rows={3}
            {...field("friction")}
          />
          {fieldError("friction")}
        </div>
        <div className="lab-field">
          <label htmlFor="pilot-nextAction">What would you do or test next? (optional)</label>
          <textarea
            id="pilot-nextAction"
            name="nextAction"
            maxLength={250}
            rows={2}
            {...field("nextAction")}
          />
          {fieldError("nextAction")}
        </div>
        <div className="lab-honeypot" aria-hidden="true">
          <label htmlFor="pilot-website">Leave this empty</label>
          <input id="pilot-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="lab-form-check" htmlFor="pilot-adultConfirmed">
          <input
            id="pilot-adultConfirmed"
            name="adultConfirmed"
            type="checkbox"
            required
            {...field("adultConfirmed")}
          />
          <span>I am aged 18 or over. * {fieldError("adultConfirmed")}</span>
        </label>
        <label className="lab-form-check" htmlFor="pilot-voluntaryConfirmed">
          <input
            id="pilot-voluntaryConfirmed"
            name="voluntaryConfirmed"
            type="checkbox"
            required
            {...field("voluntaryConfirmed")}
          />
          <span>
            I am choosing freely to share this trial. It has no effect on grades, admissions,
            references or access to free lessons. * {fieldError("voluntaryConfirmed")}
          </span>
        </label>
        <label className="lab-form-check" htmlFor="pilot-privacyAccepted">
          <input
            id="pilot-privacyAccepted"
            name="privacyAccepted"
            type="checkbox"
            required
            {...field("privacyAccepted")}
          />
          <span>
            I have read the <Link href="/learning-lab/policies/privacy">privacy notice</Link> and
            acknowledge that these details will be stored to review and improve the lesson. *{" "}
            {fieldError("privacyAccepted")}
          </span>
        </label>
        <label className="lab-form-check" htmlFor="pilot-followUpConsent">
          <input id="pilot-followUpConsent" name="followUpConsent" type="checkbox" />
          <span>
            Optional: the Lab may email me about this pilot response or a revised version of the
            lesson. This is not permission for marketing or publication.
          </span>
        </label>
        {learningNotesAvailable ? (
          <label className="lab-form-check" htmlFor="pilot-learningNotesConsent">
            <input id="pilot-learningNotesConsent" name="learningNotesConsent" type="checkbox" />
            <span>
              Optional: email me the four short pilot practice notes, through 13 November 2026, from
              swapnil.s@greatlakes.edu.in using Google Mail. This is separate from a personal pilot
              follow-up. I can reply STOP to cancel; no immediate welcome email is promised.
            </span>
          </label>
        ) : (
          <p className="lab-small">
            Practice-note email signup ended on 13 November 2026. Submitting feedback now does not
            sign you up for these emails. You can still{" "}
            <Link className="lab-text-link" href="/learning-lab/weekly-notes">
              read the free practice notes
            </Link>
            .
          </p>
        )}
        <p className="lab-small">
          Your most recent pilot response controls both optional email choices across all pilot
          lessons. Leave a choice unticked to withdraw it when updating your response. A STOP reply
          overrides form choices. To restart these pilot notes after STOP, reply RESUBSCRIBE from
          the same email.
        </p>
        <p className="lab-small">
          A saved response reaches the Lab’s private feedback workflow. Submitting sends no
          immediate email. If you opt in while the email window is open, the pilot runner can send
          the four scheduled practice notes. No observation call is booked and no certificate is
          awarded. Please do not include personal, student or employer records.
        </p>
        <button type="submit" className="lab-button" aria-busy={pending}>
          {pending ? "Saving feedback…" : "Save volunteer feedback"}
        </button>
      </fieldset>
    </form>
  );
}
