"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export function CourseFollowUp({ slug, title }: { slug: string; title: string }) {
  const url = `https://www.swapnilsahoo.com/learning-lab/free-courses/${slug}`;
  const field = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [busy, setBusy] = useState(false);

  async function share() {
    setBusy(true);
    setMessage("");
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setMessage("Share options completed.");
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Lesson link copied. Paste it wherever you want to keep or share it.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setManualCopy(true);
      setMessage("Copy the lesson link from the field below.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside
      className="lab-callout"
      aria-label="Keep learning and share this lesson"
      style={{ marginTop: "2rem" }}
    >
      <h3>Keep this lesson. Share a useful exercise.</h3>
      <p>You can return to this page anytime. Your downloaded worksheet stays with you.</p>
      <p>
        <Link className="lab-text-link" href="/learning-lab/pilot">
          Help improve a lesson: try the voluntary adult pilot →
        </Link>
      </p>
      <div className="lab-actions">
        <button
          className="lab-button lab-button-secondary"
          type="button"
          onClick={share}
          disabled={busy}
        >
          {busy ? "Opening share options…" : "Share or copy lesson link"}
        </button>
        <a className="lab-text-link" href="https://swapnilsahoo.substack.com/subscribe">
          Explore optional email updates →
        </a>
      </div>
      {manualCopy && (
        <label className="lab-small" style={{ display: "block", marginTop: "1rem" }}>
          Lesson link
          <input
            ref={field}
            className="lab-field"
            type="text"
            value={url}
            readOnly
            onFocus={() => field.current?.select()}
            style={{ display: "block", width: "100%", marginTop: ".5rem" }}
          />
        </label>
      )}
      <p className="lab-small" role="status" aria-live="polite" style={{ minHeight: "1.5rem" }}>
        {message}
      </p>
      <p className="lab-small">
        Email subscriptions are handled on Swapnil’s Substack, where you can review the options.
        This page does not subscribe you. Programme enquiries and subscriptions are separate.
      </p>
    </aside>
  );
}
