"use client";

import { useId, useRef, useState } from "react";
import { useLabHydrated } from "./useLabHydrated";
import "./toolkit.css";

/** Copyable text with an optional "send to myself on WhatsApp" link. Nothing is sent to the Lab. */
export function CopyBlock({
  id,
  title,
  note,
  text,
  whatsapp = false,
  downloadName,
  lang,
}: {
  id?: string;
  title?: string;
  note?: string;
  text: string;
  whatsapp?: boolean;
  downloadName?: string;
  lang?: string;
}) {
  const hydrated = useLabHydrated();
  const textId = useId();
  const textRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied. Paste it wherever you need it.");
    } catch {
      const node = textRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("Text selected. Press Ctrl+C (or ⌘C) to copy.");
    }
  }

  function download() {
    if (!downloadName) return;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Download prepared. It stays on your device.");
  }

  return (
    <div className="lab-copy" id={id}>
      {title && <h3 lang={lang}>{title}</h3>}
      {note && <p className="lab-small">{note}</p>}
      <pre className="lab-copy-text" id={textId} ref={textRef} lang={lang}>
        {text}
      </pre>
      <div className="lab-copy-actions">
        <button
          type="button"
          className="lab-button lab-button-secondary"
          onClick={copy}
          disabled={!hydrated}
          aria-describedby={textId}
        >
          Copy
        </button>
        {whatsapp && (
          <a
            className="lab-text-link"
            href={`https://wa.me/?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in WhatsApp ↗<span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
        )}
        {downloadName && (
          <button type="button" className="lab-text-link" onClick={download} disabled={!hydrated}>
            Download .txt
          </button>
        )}
        <span role="status" className="lab-copy-status">
          {status}
        </span>
      </div>
    </div>
  );
}
