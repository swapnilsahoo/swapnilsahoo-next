"use client";
import Link from "next/link";
export default function LabError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="lab-container lab-section">
      <h2>This page could not load.</h2>
      <p className="lab-muted" role="alert">
        No submission or change has been confirmed. Try loading the page again; keep a local copy of
        any unsaved work.
      </p>
      <div className="lab-actions">
        <button type="button" onClick={() => retry()} className="lab-button">
          Try again
        </button>
        <Link href="/learning-lab" className="lab-button lab-button-secondary">
          Return to the Lab
        </Link>
      </div>
    </section>
  );
}
