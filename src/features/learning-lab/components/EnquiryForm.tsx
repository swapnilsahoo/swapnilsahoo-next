"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLabHydrated } from "./useLabHydrated";

type FieldErrors = Record<string, string>;
type ProgrammeOption = { slug: string; title: string };

export function EnquiryForm({
  kind = "learner",
  programmes,
  programmeSlug = "",
  available = true,
  contactEmail = null,
}: {
  kind?: "learner" | "institution";
  programmes: ProgrammeOption[];
  programmeSlug?: string;
  available?: boolean;
  contactEmail?: string | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useLabHydrated();
  const startedAt = useRef(0);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const prefix = `enquiry-${kind}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function focusFirstInvalid(fields: FieldErrors) {
    requestAnimationFrame(() => {
      const name = Object.keys(fields)[0];
      const input = formRef.current?.elements.namedItem(name);
      if (input instanceof HTMLElement) input.focus();
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const selectedProgramme = String(data.get("programmeSlug") ?? "");
    const organisation = String(data.get("organisation") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const learnerCountInput = String(data.get("learnerCount") ?? "").trim();
    const learnerCount = learnerCountInput ? Number(learnerCountInput) : null;
    const preferredTimetable = String(data.get("preferredTimetable") ?? "").trim();
    const fields: FieldErrors = {};
    if (name.length < 2 || name.length > 100) fields.name = "Enter your name (2–100 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      fields.email = "Enter a valid email address.";
    if (!programmes.some((p) => p.slug === selectedProgramme))
      fields.programmeSlug = "Choose a programme.";
    if (kind === "institution" && (organisation.length < 2 || organisation.length > 160))
      fields.organisation = "Enter your institution or organisation name.";
    if (kind === "institution") {
      if (role.length > 120) fields.role = "Keep your role to 120 characters or fewer.";
      if (
        learnerCount !== null &&
        (!Number.isInteger(learnerCount) || learnerCount < 1 || learnerCount > 10000)
      )
        fields.learnerCount = "Enter a whole number of adult learners between 1 and 10,000.";
      if (preferredTimetable.length > 500)
        fields.preferredTimetable = "Keep your preferred timetable to 500 characters or fewer.";
    }
    if (!data.has("adultConfirmed"))
      fields.adultConfirmed = "Please confirm that you are aged 18 or over.";
    if (!data.has("privacyAccepted"))
      fields.privacyAccepted = "Please read the privacy notice and acknowledge enquiry processing.";
    setErrors(fields);
    setError("");
    if (Object.keys(fields).length) {
      focusFirstInvalid(fields);
      return;
    }
    setPending(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const sourceParams = new URLSearchParams();
      for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
        const value = params.get(key);
        if (value) sourceParams.set(key, value.slice(0, 100));
      }
      const source = (
        window.location.pathname + (sourceParams.size ? `?${sourceParams}` : "")
      ).slice(0, 300);
      const response = await fetch("/api/learning-lab/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name,
          email,
          programmeSlug: selectedProgramme,
          organisation: kind === "institution" ? organisation : undefined,
          role: kind === "institution" ? role || null : null,
          learnerCount: kind === "institution" ? learnerCount : null,
          preferredTimetable: kind === "institution" ? preferredTimetable || null : null,
          message: String(data.get("message") ?? "").trim(),
          adultConfirmed: true,
          privacyAccepted: true,
          marketingConsent: data.has("marketingConsent"),
          website: String(data.get("website") ?? ""),
          startedAt: startedAt.current,
          source,
        }),
      });
      const result: { ok?: boolean; message?: string; error?: string; fields?: FieldErrors } =
        await response.json();
      if (!response.ok || !result.ok) {
        setErrors(result.fields ?? {});
        setError(result.error ?? "Your enquiry could not be saved. Please try again.");
        if (result.fields) focusFirstInvalid(result.fields);
        return;
      }
      setSavedMessage(
        result.message ??
          "Your enquiry has been saved. No payment or place reservation has been made."
      );
    } catch {
      setError(
        "Your enquiry could not be saved. Check your connection and try again; your entries are still here."
      );
    } finally {
      setPending(false);
    }
  }

  if (!available)
    return (
      <aside className="lab-callout" aria-label="Enquiry availability">
        <h3>{contactEmail ? "Email the Lab" : "Enquiries opening soon"}</h3>
        <p>
          Online forms will open after secure service setup. You can explore the public lessons and
          email a question about a programme or an institutional pilot now.
        </p>
        {contactEmail && (
          <p>
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(kind === "institution" ? "Learning Lab: institutional pilot discussion" : `Learning Lab: ${programmeSlug || "programme"} enquiry`)}`}
              className="lab-text-link"
            >
              Email {contactEmail} →
            </a>
          </p>
        )}
        <p className="lab-small">
          This opens your email app; the website does not save or send a form. Include only your
          question and programme choice, and avoid sensitive or confidential information.
        </p>
        <Link href="/learning-lab/programmes" className="lab-text-link">
          Explore the demonstration lessons →
        </Link>
      </aside>
    );

  if (savedMessage)
    return (
      <div className="lab-status" role="status">
        <h3>Enquiry saved</h3>
        <p>{savedMessage}</p>
        <p className="lab-small">
          No fee has been charged. An enquiry does not confirm enrolment, a date or a place.
        </p>
        <button
          type="button"
          className="lab-button lab-button-secondary"
          onClick={() => {
            setSavedMessage("");
            startedAt.current = Date.now();
          }}
        >
          Send another enquiry
        </button>
      </div>
    );

  const fieldProps = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${prefix}-${name}-error` : undefined,
  });
  const fieldError = (name: string) =>
    errors[name] ? (
      <span id={`${prefix}-${name}-error`} className="lab-error">
        {errors[name]}
      </span>
    ) : null;

  return (
    <form
      method="post"
      ref={formRef}
      className="lab-form"
      onSubmit={submit}
      noValidate
      aria-label={
        kind === "institution" ? "Institutional pilot enquiry" : "Programme interest enquiry"
      }
    >
      <h3>
        {kind === "institution" ? "Discuss an institutional pilot" : "Register your interest"}
      </h3>
      <p className="lab-small">
        Proposed programmes. Dates, fees and places will be shared only after approval. Required
        fields are marked *.
      </p>
      {error && (
        <div className="lab-status lab-status-error" role="alert">
          <p>{error}</p>
        </div>
      )}
      <fieldset disabled={pending || !hydrated} className="lab-form-fieldset">
        <legend className="sr-only">Your enquiry details</legend>
        <div className="lab-form-grid">
          <div className="lab-field">
            <label htmlFor={`${prefix}-name`}>Your name *</label>
            <input
              id={`${prefix}-name`}
              name="name"
              autoComplete="name"
              maxLength={100}
              required
              {...fieldProps("name")}
            />
            {fieldError("name")}
          </div>
          <div className="lab-field">
            <label htmlFor={`${prefix}-email`}>Email address *</label>
            <input
              id={`${prefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              {...fieldProps("email")}
            />
            {fieldError("email")}
          </div>
        </div>
        {kind === "institution" && (
          <>
            <div className="lab-field">
              <label htmlFor={`${prefix}-organisation`}>Institution / organisation *</label>
              <input
                id={`${prefix}-organisation`}
                name="organisation"
                autoComplete="organization"
                maxLength={160}
                required
                {...fieldProps("organisation")}
              />
              {fieldError("organisation")}
            </div>
            <div className="lab-form-grid">
              <div className="lab-field">
                <label htmlFor={`${prefix}-role`}>Your role (optional)</label>
                <input
                  id={`${prefix}-role`}
                  name="role"
                  autoComplete="organization-title"
                  maxLength={120}
                  {...fieldProps("role")}
                />
                {fieldError("role")}
              </div>
              <div className="lab-field">
                <label htmlFor={`${prefix}-learnerCount`}>
                  Approximate adult learners (optional)
                </label>
                <input
                  id={`${prefix}-learnerCount`}
                  name="learnerCount"
                  type="number"
                  min={1}
                  max={10000}
                  step={1}
                  inputMode="numeric"
                  {...fieldProps("learnerCount")}
                />
                {fieldError("learnerCount")}
              </div>
            </div>
            <div className="lab-field">
              <label htmlFor={`${prefix}-preferredTimetable`}>Preferred timetable (optional)</label>
              <textarea
                id={`${prefix}-preferredTimetable`}
                name="preferredTimetable"
                maxLength={500}
                rows={2}
                placeholder="For example: weekday evenings, IST, during November."
                {...fieldProps("preferredTimetable")}
              />
              {fieldError("preferredTimetable")}
            </div>
          </>
        )}
        <div className="lab-field">
          <label htmlFor={`${prefix}-programmeSlug`}>Programme of interest *</label>
          <select
            id={`${prefix}-programmeSlug`}
            name="programmeSlug"
            defaultValue={programmeSlug}
            required
            {...fieldProps("programmeSlug")}
          >
            <option value="">Choose a programme</option>
            {programmes.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
          {fieldError("programmeSlug")}
        </div>
        <div className="lab-field">
          <label htmlFor={`${prefix}-message`}>
            {kind === "institution"
              ? "What would you like a pilot to address? (optional)"
              : "What would you like to learn? (optional)"}
          </label>
          <textarea id={`${prefix}-message`} name="message" maxLength={2000} rows={4} />
          <span className="lab-small">
            Please do not include sensitive personal, student or employer information.
          </span>
        </div>
        <div className="lab-honeypot" aria-hidden="true">
          <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
          <input id={`${prefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="lab-form-check" htmlFor={`${prefix}-adultConfirmed`}>
          <input
            id={`${prefix}-adultConfirmed`}
            name="adultConfirmed"
            type="checkbox"
            required
            {...fieldProps("adultConfirmed")}
          />
          <span>I confirm that I am aged 18 or over. * {fieldError("adultConfirmed")}</span>
        </label>
        <label className="lab-form-check" htmlFor={`${prefix}-privacyAccepted`}>
          <input
            id={`${prefix}-privacyAccepted`}
            name="privacyAccepted"
            type="checkbox"
            required
            {...fieldProps("privacyAccepted")}
          />
          <span>
            I have read the <Link href="/learning-lab/policies/privacy">privacy notice</Link> and
            acknowledge that my details will be processed to handle this enquiry. *{" "}
            {fieldError("privacyAccepted")}
          </span>
        </label>
        <label className="lab-form-check" htmlFor={`${prefix}-marketingConsent`}>
          <input id={`${prefix}-marketingConsent`} name="marketingConsent" type="checkbox" />
          <span>
            Optional: I would like to receive Learning Lab programme updates. I can withdraw this
            permission later.
          </span>
        </label>
        <p className="lab-small">
          A saved confirmation means your enquiry reached the Lab. Follow-up is handled separately;
          the website sends no confirmation email and creates no enrolment or booking.
        </p>
        <button type="submit" className="lab-button" aria-busy={pending}>
          {pending ? "Saving enquiry…" : "Save my enquiry"}
          <span aria-hidden="true">→</span>
        </button>
      </fieldset>
    </form>
  );
}
