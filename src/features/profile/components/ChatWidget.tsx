"use client";

import Script from "next/script";
import { useState } from "react";

const GRADIO_SPACE_URL = "https://swapnilsahoo118514-personal.hf.space";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/4.25.0/gradio.js"
        strategy="lazyOnload"
      />

      <div id="chat-container" className={open ? "visible" : undefined}>
        <button id="close-chat-btn" aria-label="Close chat" onClick={() => setOpen(false)}>
          &times;
        </button>
        {/* @ts-expect-error -- gradio-app is a web component with no React type definitions */}
        <gradio-app src={GRADIO_SPACE_URL} />
      </div>

      <button
        id="chat-icon-btn"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((value) => !value)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </button>
    </>
  );
}
