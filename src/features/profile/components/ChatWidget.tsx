"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const GRADIO_SPACE_URL = "https://swapnilsahoo118514-personal.hf.space";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const closeChat = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeChat();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChat, open]);

  return (
    <>
      {open && (
        <Script
          type="module"
          src="https://gradio.s3-us-west-2.amazonaws.com/4.25.0/gradio.js"
          strategy="lazyOnload"
        />
      )}

      <div
        id="chat-container"
        role="dialog"
        aria-modal="true"
        aria-label="Ask Dr. Swapnil Sahoo"
        aria-hidden={!open}
        inert={!open}
        className={open ? "visible" : undefined}
      >
        <button
          ref={closeButtonRef}
          id="close-chat-btn"
          aria-label="Close chat"
          onClick={closeChat}
        >
          &times;
        </button>
        {open && (
          <>
            {/* @ts-expect-error -- gradio-app is a web component with no React type definitions */}
            <gradio-app src={GRADIO_SPACE_URL} />
          </>
        )}
      </div>

      <button
        ref={triggerButtonRef}
        id="chat-icon-btn"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-controls="chat-container"
        aria-expanded={open}
        onClick={() => (open ? closeChat() : setOpen(true))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="26"
          height="26"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </button>
    </>
  );
}
