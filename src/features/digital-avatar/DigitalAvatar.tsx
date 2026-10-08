"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { getGuidedReply, starters } from "./knowledge";
import "./digital-avatar.css";

type GuideMessage = {
  id: string;
  role: "guide" | "visitor";
  text: string;
  links: ReturnType<typeof getGuidedReply>["links"];
  suggestions: string[];
};
type VideoSession = {
  conversationId: string;
  conversationUrl: string;
  expiresAt: string | number;
  provider?: "1mind" | "Tavus";
};
const welcome: GuideMessage = {
  id: "welcome",
  role: "guide",
  text: "Hello. I’m the website’s digital guide. I can help you find courses, explore Dr. Sahoo’s teaching and research, or find the right way to get in touch. What would you like to explore?",
  links: [],
  suggestions: [],
};
const privatePaths = ["/learning-lab/admin", "/learning-lab/learn", "/learning-lab/learner", "/learning-lab/login"];

function deleteVideoSession() {
  return fetch("/api/digital-avatar/session", {
    method: "DELETE",
    keepalive: true,
  });
}

export function DigitalAvatar({
  liveVideoAvailable = false,
  oneMindEmbedUrl = null,
}: {
  liveVideoAvailable?: boolean;
  oneMindEmbedUrl?: string | null;
}) {
  const providerLabel = oneMindEmbedUrl ? "1mind" : "Tavus";
  const pathname = usePathname();
  const privatePage = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const hideLauncher = pathname === "/digital-guide";
  const uniqueId = useId();
  const dialogId = `digital-guide-${uniqueId}`;
  const titleId = `${dialogId}-title`;
  const modeId = `${dialogId}-mode`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const messageCounter = useRef(0);
  const mountedRef = useRef(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const videoRef = useRef<VideoSession | null>(null);
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestGeneration = useRef(0);
  const requestInFlightRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"guided" | "video">("guided");
  const [messages, setMessages] = useState<GuideMessage[]>([welcome]);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [readingId, setReadingId] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoSession | null>(null);
  const [videoConsent, setVideoConsent] = useState(false);
  const [startingVideo, setStartingVideo] = useState(false);

  const cancelSpeech = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
      speechRef.current = null;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  }, []);

  const stopVideo = useCallback((updateUI = true) => {
    const generation = ++requestGeneration.current;
    const active = videoRef.current;
    videoRef.current = null;
    if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    videoTimerRef.current = null;
    if (updateUI && mountedRef.current) {
      setVideo(null);
      setStartingVideo(false);
      setVideoConsent(false);
      if (active) setStatus("Video view closed. Guided website answers are still available.");
    }
    if (active && active.provider !== "1mind") {
      void deleteVideoSession()
        .then((response) => {
          if (
            !response.ok &&
            updateUI &&
            mountedRef.current &&
            generation === requestGeneration.current
          )
            setStatus(
              "The video view is closed, but provider session cleanup could not be confirmed."
            );
        })
        .catch(() => {
          if (updateUI && mountedRef.current && generation === requestGeneration.current)
            setStatus(
              "The video view is closed, but provider session cleanup could not be confirmed."
            );
        });
    }
  }, []);

  const askQuestion = useCallback((value: string) => {
    const text = value.trim().slice(0, 500);
    if (!text) return;
    const reply = getGuidedReply(text);
    const id = ++messageCounter.current;
    setMessages((previous) => [
      ...previous.slice(-28),
      { id: `visitor-${id}`, role: "visitor", text, links: [], suggestions: [] },
      {
        id: `guide-${id}`,
        role: "guide",
        text: reply.text,
        links: reply.links,
        suggestions: reply.suggestions,
      },
    ]);
    setQuestion("");
    setStatus("");
    queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  const openGuide = useCallback(
    (initialQuestion?: string) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (!dialog.open) {
        returnFocusRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.showModal();
      }
      stopVideo();
      cancelSpeech();
      setReadingId(null);
      setMode("guided");
      setOpen(true);
      if (initialQuestion) askQuestion(initialQuestion);
      queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
    },
    [askQuestion, cancelSpeech, stopVideo]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelSpeech();
      stopVideo(false);
    };
  }, [cancelSpeech, stopVideo]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      dialog?.close();
      cancelSpeech();
      stopVideo(false);
    };
  }, [pathname, cancelSpeech, stopVideo]);

  useEffect(() => {
    if (privatePage) return;
    const onOpen = (event: Event) => {
      const detail: unknown = event instanceof CustomEvent ? event.detail : null;
      const initialQuestion =
        detail &&
        typeof detail === "object" &&
        "question" in detail &&
        typeof detail.question === "string"
          ? detail.question
          : undefined;
      openGuide(initialQuestion);
    };
    window.addEventListener("open-digital-guide", onOpen);
    return () => window.removeEventListener("open-digital-guide", onOpen);
  }, [privatePage, openGuide]);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [messages]);

  function handleClose() {
    cancelSpeech();
    stopVideo();
    setReadingId(null);
    setOpen(false);
    const target = returnFocusRef.current || launcherRef.current;
    queueMicrotask(() => {
      if (target?.isConnected) target.focus({ preventScroll: true });
    });
  }

  function resetGuide() {
    cancelSpeech();
    stopVideo();
    setReadingId(null);
    setMode("guided");
    setMessages([welcome]);
    setQuestion("");
    setStatus("Conversation cleared. No chat history has been saved.");
    queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function readAnswer(message: GuideMessage) {
    const wasReading = readingId === message.id;
    cancelSpeech();
    setReadingId(null);
    if (wasReading) {
      setStatus("Read aloud stopped.");
      return;
    }
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setStatus("Read aloud is not available in this browser. The full answer is shown above.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.onend = () => {
      speechRef.current = null;
      if (mountedRef.current) {
        setReadingId(null);
        setStatus("Read aloud finished.");
      }
    };
    utterance.onerror = () => {
      speechRef.current = null;
      if (mountedRef.current) {
        setReadingId(null);
        setStatus("Read aloud could not play. The full answer is shown above.");
      }
    };
    speechRef.current = utterance;
    setReadingId(message.id);
    setStatus("Reading with a standard device voice, not Dr. Sahoo’s voice.");
    window.speechSynthesis.speak(utterance);
  }

  function changeMode(next: "guided" | "video") {
    cancelSpeech();
    setReadingId(null);
    if (next === "guided") stopVideo();
    setMode(next);
    setStatus("");
  }

  async function startVideo() {
    if (!liveVideoAvailable || !videoConsent || startingVideo || videoRef.current) return;
    if (requestInFlightRef.current) {
      setStatus("The previous connection is still finishing. Please try again in a moment.");
      return;
    }
    const generation = ++requestGeneration.current;
    if (oneMindEmbedUrl) {
      const session: VideoSession = {
        conversationId: "hosted",
        conversationUrl: oneMindEmbedUrl,
        expiresAt: Date.now() + 300000,
        provider: "1mind",
      };
      videoRef.current = session;
      setVideo(session);
      setStatus("1mind view opened. Follow the provider’s prompts to start a conversation.");
      videoTimerRef.current = setTimeout(() => stopVideo(), 300000);
      return;
    }
    requestInFlightRef.current = true;
    setStartingVideo(true);
    setStatus("Connecting to the video conversation…");
    try {
      const response = await fetch("/api/digital-avatar/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true }),
      });
      const result: Partial<VideoSession> & { error?: string } = await response.json();
      if (!response.ok || !result.conversationId || !result.conversationUrl || !result.expiresAt)
        throw new Error(
          "The video conversation could not start. Please try again or use guided answers."
        );
      const conversationUrl = new URL(result.conversationUrl);
      const expires =
        typeof result.expiresAt === "number" ? result.expiresAt : Date.parse(result.expiresAt);
      if (
        conversationUrl.protocol !== "https:" ||
        !Number.isFinite(expires) ||
        expires <= Date.now()
      ) {
        void deleteVideoSession().catch(() => {});
        throw new Error(
          "The video conversation was not available. Guided answers are still ready."
        );
      }
      if (!mountedRef.current || generation !== requestGeneration.current) {
        void deleteVideoSession().catch(() => {});
        return;
      }
      const session = {
        conversationId: result.conversationId,
        conversationUrl: conversationUrl.href,
        expiresAt: result.expiresAt,
      };
      videoRef.current = session;
      setVideo(session);
      setStatus("Video conversation ready. Your browser will ask for microphone permission.");
      videoTimerRef.current = setTimeout(
        () => {
          if (videoRef.current?.conversationId === session.conversationId) stopVideo();
        },
        Math.min(expires - Date.now(), 2147483647)
      );
    } catch (error) {
      if (mountedRef.current && generation === requestGeneration.current)
        setStatus(
          error instanceof Error
            ? error.message
            : "Video could not start. Guided answers are still available."
        );
    } finally {
      requestInFlightRef.current = false;
      if (mountedRef.current && generation === requestGeneration.current) setStartingVideo(false);
    }
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askQuestion(question);
  }
  const latestReply = [...messages].reverse().find((message) => message.role === "guide");
  const suggestions = (latestReply?.suggestions.length ? latestReply.suggestions : starters).slice(
    0,
    4
  );
  if (privatePage) return null;

  return (
    <div className="avatar-guide">
      {!hideLauncher && (
        <button
          data-testid="digital-guide-launcher"
          className="avatar-guide-launcher"
          ref={launcherRef}
          type="button"
          onClick={() => openGuide()}
          aria-label="Open Swapnil's digital guide"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          aria-expanded={open}
        >
          <span className="avatar-guide-launcher-photo">
            <Image src="/images/profile_pic.jpg" alt="" width={48} height={48} />
          </span>
          <span>
            <strong>Swapnil’s digital guide</strong>
            <span className="avatar-guide-launcher-hint">
              A useful place to start <span aria-hidden="true">↗</span>
            </span>
          </span>
        </button>
      )}
      <dialog
        data-testid="digital-guide-dialog"
        className="avatar-guide-dialog"
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={modeId}
        onClose={handleClose}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const dialog = event.currentTarget;
          const controls = [...dialog.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), iframe, [tabindex="0"]'
          )].filter((element) => element.getClientRects().length > 0);
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first?.focus();
          }
        }}
      >
        <div className="avatar-guide-topbar">
          <div>
            <p className="avatar-guide-eyebrow">A conversation with the website</p>
            <h2 id={titleId}>Swapnil’s digital guide</h2>
            <p className="avatar-guide-mode" id={modeId}>
              {mode === "guided"
                ? "Guided website answers · not a live call"
                : "AI video avatar · not a call with Dr. Sahoo"}
            </p>
          </div>
          <button
            data-testid="digital-guide-close"
            className="avatar-guide-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close digital guide"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="avatar-guide-body">
          <aside className="avatar-guide-stage" aria-label="About your digital guide">
            <div className="avatar-guide-portrait">
              <Image
                src="/images/profile_pic.jpg"
                alt="Dr. Swapnil Sahoo"
                width={480}
                height={321}
              />
              <span className="avatar-guide-portrait-label">Dr. Swapnil Sahoo</span>
            </div>
            <p className="avatar-guide-eyebrow">Curiosity starts here</p>
            <h3>
              A question.
              <br />
              <em>A useful next step.</em>
            </h3>
            <p>Find a course, explore an idea, or discover the work behind the website.</p>
            <div className="avatar-guide-stage-foot">
              <span aria-hidden="true">↗</span>
              <Link href="/digital-guide" onClick={() => dialogRef.current?.close()}>
                About this guide
              </Link>
            </div>
          </aside>
          <div className="avatar-guide-conversation">
            <div className="avatar-guide-toolbar">
              {liveVideoAvailable ? (
                <div className="avatar-guide-tabs" role="tablist" aria-label="Conversation mode">
                  {(["guided", "video"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      id={`${dialogId}-${tab}-tab`}
                      aria-selected={mode === tab}
                      aria-controls={`${dialogId}-${tab}-panel`}
                      tabIndex={mode === tab ? 0 : -1}
                      onClick={() => changeMode(tab)}
                      onKeyDown={(event) => {
                        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                          event.preventDefault();
                          const next =
                            event.key === "Home"
                              ? "guided"
                              : event.key === "End"
                                ? "video"
                                : tab === "guided"
                                  ? "video"
                                  : "guided";
                          changeMode(next);
                          document.getElementById(`${dialogId}-${next}-tab`)?.focus();
                        }
                      }}
                    >
                      {tab === "guided" ? "Guided answers" : "Video avatar"}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="avatar-guide-toolbar-label">Your website companion</span>
              )}
              <button
                data-testid="digital-guide-reset"
                className="avatar-guide-reset"
                type="button"
                onClick={resetGuide}
              >
                Reset
              </button>
            </div>
            {mode === "guided" ? (
              <div
                className="avatar-guide-guided-panel"
                id={`${dialogId}-guided-panel`}
                role={liveVideoAvailable ? "tabpanel" : undefined}
                aria-labelledby={liveVideoAvailable ? `${dialogId}-guided-tab` : undefined}
              >
                <div
                  data-testid="digital-guide-messages"
                  className="avatar-guide-transcript"
                  ref={transcriptRef}
                  role="log"
                  aria-label="Guided conversation"
                  aria-live="polite"
                  aria-relevant="additions text"
                >
                  {messages.map((message) => (
                    <article
                      className={`avatar-guide-message avatar-guide-message-${message.role}`}
                      key={message.id}
                    >
                      <p className="avatar-guide-message-label">
                        {message.role === "guide" ? "Digital guide" : "You"}
                      </p>
                      <p className="avatar-guide-message-text">{message.text}</p>
                      {message.links.length > 0 && (
                        <ul className="avatar-guide-sources" aria-label="Website sources">
                          {message.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} onClick={() => dialogRef.current?.close()}>
                                {link.label}
                                <span aria-hidden="true"> ↗</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {message.role === "guide" && (
                        <button
                          className="avatar-guide-read"
                          type="button"
                          onClick={() => readAnswer(message)}
                          aria-label={
                            readingId === message.id
                              ? "Stop reading answer"
                              : "Read answer using standard device voice"
                          }
                        >
                          <span aria-hidden="true">{readingId === message.id ? "■" : "◖"}</span>{" "}
                          {readingId === message.id ? "Stop reading" : "Read answer"}
                        </button>
                      )}
                    </article>
                  ))}
                </div>
                <div className="avatar-guide-starters" aria-label="Suggested questions">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => askQuestion(suggestion)}>
                      {suggestion}
                      <span aria-hidden="true"> ↗</span>
                    </button>
                  ))}
                </div>
                <form
                  className="avatar-guide-composer"
                  onSubmit={submitQuestion}
                  aria-label="Ask the digital guide"
                >
                  <label className="avatar-guide-input-label" htmlFor={`${dialogId}-question`}>
                    Your question
                  </label>
                  <div>
                    <input
                      data-testid="digital-guide-input"
                      ref={inputRef}
                      id={`${dialogId}-question`}
                      type="text"
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      maxLength={500}
                      autoComplete="off"
                      placeholder="What would you like to explore?"
                    />
                    <button
                      data-testid="digital-guide-send"
                      type="submit"
                      disabled={!question.trim()}
                    >
                      Send <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </form>
                <p className="avatar-guide-disclosure">
                  Guided replies use published website information. Chat is not saved. Read aloud
                  uses a standard device voice, not Dr. Sahoo’s voice.
                </p>
              </div>
            ) : (
              <div
                className="avatar-guide-video-panel"
                id={`${dialogId}-video-panel`}
                role="tabpanel"
                aria-labelledby={`${dialogId}-video-tab`}
              >
                {video ? (
                  <>
                    <iframe
                      src={video.conversationUrl}
                      title={`AI video avatar conversation powered by ${providerLabel}`}
                      allow="microphone; autoplay; fullscreen"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      className="avatar-guide-primary"
                      type="button"
                      onClick={() => stopVideo()}
                    >
                      End video conversation
                    </button>
                    <p>
                      This video view closes after five minutes. You can return to guided answers at
                      any time.
                    </p>
                  </>
                ) : (
                  <div className="avatar-guide-video-intro">
                    <span className="avatar-guide-video-icon" aria-hidden="true">
                      ↗
                    </span>
                    <h3>Meet the video avatar.</h3>
                    <p>
                      This optional AI avatar is powered by {providerLabel}. It is not a call with
                      Dr. Sahoo.
                    </p>
                    <p>
                      Starting a conversation lets {providerLabel} process your microphone audio and
                      conversation. Camera access is blocked by this site. Review{" "}
                      <a
                        href={
                          oneMindEmbedUrl
                            ? "https://www.1mind.com/privacy-policy"
                            : "https://www.tavus.io/privacy-policy"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        the provider’s privacy notice
                      </a>{" "}
                      and{" "}
                      <Link href="/digital-guide" onClick={() => dialogRef.current?.close()}>
                        how this guide works
                      </Link>{" "}
                      before starting.
                    </p>
                    <label className="avatar-guide-consent">
                      <input
                        type="checkbox"
                        checked={videoConsent}
                        onChange={(event) => setVideoConsent(event.target.checked)}
                        disabled={startingVideo}
                      />
                      <span>
                        I agree to let {providerLabel} process my microphone audio and conversation.
                      </span>
                    </label>
                    <button
                      className="avatar-guide-primary"
                      type="button"
                      onClick={startVideo}
                      disabled={!videoConsent || startingVideo}
                      aria-busy={startingVideo}
                    >
                      {startingVideo ? "Connecting…" : "Start video conversation"}
                    </button>
                  </div>
                )}
              </div>
            )}
            <p className="avatar-guide-status" role="status" aria-live="polite" aria-atomic="true">
              {status}
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
