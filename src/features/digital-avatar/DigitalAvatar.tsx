"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { getGuidedReply, starters } from "./knowledge";
import { useBrowserVoice } from "./useBrowserVoice";
import "./digital-avatar.css";

type Mode = "voice" | "video" | "guided";
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
  text: "Hello. I’m Swapnil’s website guide. I can help you find courses, explore his teaching and Learning Lab, or find the right way to get in touch. What would you like to explore?",
  links: [],
  suggestions: [],
};
const privatePaths = [
  "/learning-lab/admin",
  "/learning-lab/learn",
  "/learning-lab/learner",
  "/learning-lab/login",
];

function deleteVideoSession() {
  return fetch("/api/digital-avatar/session", { method: "DELETE", keepalive: true });
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
  const restoreFocusRef = useRef(false);
  const openRef = useRef(false);
  const messageCounter = useRef(0);
  const mountedRef = useRef(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const videoRef = useRef<VideoSession | null>(null);
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestGeneration = useRef(0);
  const requestInFlightRef = useRef(false);
  const pendingCleanupRef = useRef<Promise<Response> | null>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(liveVideoAvailable ? "video" : "voice");
  const [messages, setMessages] = useState<GuideMessage[]>([welcome]);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [readingId, setReadingId] = useState<string | null>(null);
  const [voiceConsent, setVoiceConsent] = useState(false);
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
    if (mountedRef.current) setReadingId(null);
  }, []);

  const playMessage = useCallback(
    (message: GuideMessage) => {
      cancelSpeech();
      if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        setStatus("Read aloud is not available in this browser. The full answer is shown here.");
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
          setStatus("Read aloud could not play. The full answer is shown here.");
        }
      };
      speechRef.current = utterance;
      setReadingId(message.id);
      setStatus("Reading with a standard device voice, not Dr. Sahoo’s voice.");
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        cancelSpeech();
        setStatus("Read aloud could not play. The full answer is shown here.");
      }
    },
    [cancelSpeech]
  );

  const endOwnedVideoSession = useCallback(() => {
    if (pendingCleanupRef.current) return pendingCleanupRef.current;
    const cleanup = deleteVideoSession().finally(() => {
      if (pendingCleanupRef.current === cleanup) pendingCleanupRef.current = null;
    });
    pendingCleanupRef.current = cleanup;
    return cleanup;
  }, []);

  const stopVideo = useCallback(
    (updateUI = true) => {
      const generation = ++requestGeneration.current;
      const active = videoRef.current;
      videoRef.current = null;
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
      videoTimerRef.current = null;
      if (updateUI && mountedRef.current) {
        setVideo(null);
        setStartingVideo(false);
        setVideoConsent(false);
        if (active) setStatus("Video view closed. Voice and website answers are still available.");
      }
      if (active && active.provider !== "1mind") {
        void endOwnedVideoSession()
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
    },
    [endOwnedVideoSession]
  );

  const askQuestion = useCallback((value: string): GuideMessage | null => {
    const text = value.trim().slice(0, 500);
    if (!text) return null;
    const answer = getGuidedReply(text);
    const id = ++messageCounter.current;
    const reply: GuideMessage = {
      id: `guide-${id}`,
      role: "guide",
      text: answer.text,
      links: answer.links,
      suggestions: answer.suggestions,
    };
    setMessages((previous) => [
      ...previous.slice(-28),
      { id: `visitor-${id}`, role: "visitor", text, links: [], suggestions: [] },
      reply,
    ]);
    setQuestion("");
    setStatus("");
    return reply;
  }, []);

  const onVoiceQuestion = useCallback(
    (text: string) => {
      const reply = askQuestion(text);
      if (reply) playMessage(reply);
    },
    [askQuestion, playMessage]
  );
  const {
    supported: voiceSupported,
    phase: voicePhase,
    message: voiceMessage,
    start: startListening,
    stop: stopListening,
  } = useBrowserVoice(onVoiceQuestion);

  const handleClose = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    cancelSpeech();
    stopListening();
    stopVideo();
    setOpen(false);
    setVoiceConsent(false);
    if (restoreFocusRef.current) {
      const target = returnFocusRef.current || launcherRef.current;
      queueMicrotask(() => {
        if (target?.isConnected) target.focus({ preventScroll: true });
      });
    }
    restoreFocusRef.current = false;
  }, [cancelSpeech, stopListening, stopVideo]);

  const closeGuide = useCallback(() => {
    restoreFocusRef.current = Boolean(dialogRef.current?.contains(document.activeElement));
    dialogRef.current?.close();
    handleClose();
  }, [handleClose]);

  const openGuide = useCallback(
    (initialQuestion?: string) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (!dialog.open) {
        returnFocusRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.show();
      }
      openRef.current = true;
      stopListening();
      stopVideo();
      cancelSpeech();
      setMode(initialQuestion ? "voice" : liveVideoAvailable ? "video" : "voice");
      setOpen(true);
      setVoiceConsent(false);
      setStatus("");
      if (initialQuestion) askQuestion(initialQuestion);
      queueMicrotask(() =>
        dialog
          .querySelector<HTMLButtonElement>('[data-testid="digital-guide-close"]')
          ?.focus({ preventScroll: true })
      );
    },
    [askQuestion, cancelSpeech, liveVideoAvailable, stopListening, stopVideo]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelSpeech();
      stopListening(false);
      stopVideo(false);
    };
  }, [cancelSpeech, stopListening, stopVideo]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      restoreFocusRef.current = false;
      openRef.current = false;
      dialog?.close();
      cancelSpeech();
      stopListening();
      stopVideo();
      setOpen(false);
      setVoiceConsent(false);
    };
  }, [pathname, cancelSpeech, stopListening, stopVideo]);

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
    const stopMedia = () => {
      cancelSpeech();
      stopListening();
      stopVideo();
    };
    const onVisibility = () => {
      if (document.hidden) stopMedia();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", stopMedia);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", stopMedia);
    };
  }, [cancelSpeech, stopListening, stopVideo]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog:modal")) {
        event.preventDefault();
        closeGuide();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, closeGuide]);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [messages, mode]);

  function resetGuide() {
    cancelSpeech();
    stopListening();
    stopVideo();
    setVoiceConsent(false);
    setMessages([welcome]);
    setQuestion("");
    setStatus("Conversation cleared. No chat history has been saved.");
    if (mode === "guided") queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function readAnswer(message: GuideMessage) {
    stopListening();
    if (readingId === message.id) {
      cancelSpeech();
      setStatus("Read aloud stopped.");
    } else playMessage(message);
  }

  function changeMode(next: Mode) {
    cancelSpeech();
    stopListening();
    stopVideo();
    setMode(next);
    setVoiceConsent(false);
    setStatus("");
    if (next === "guided")
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }

  async function startVideo() {
    if (!liveVideoAvailable || !videoConsent || startingVideo || videoRef.current) return;
    if (requestInFlightRef.current || pendingCleanupRef.current) {
      setStatus("The previous connection is still finishing. Please try again in a moment.");
      return;
    }
    cancelSpeech();
    stopListening();
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
    let needsCleanup = false;
    try {
      const response = await fetch("/api/digital-avatar/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true }),
      });
      needsCleanup = response.ok;
      const result: Partial<VideoSession> = await response.json();
      if (!response.ok || !result.conversationId || !result.conversationUrl || !result.expiresAt)
        throw new Error("The video conversation could not start. Please try again or use voice.");
      const conversationUrl = new URL(result.conversationUrl);
      const expires =
        typeof result.expiresAt === "number" ? result.expiresAt : Date.parse(result.expiresAt);
      if (
        conversationUrl.origin !== "https://tavus.daily.co" ||
        !Number.isFinite(expires) ||
        expires <= Date.now()
      ) {
        throw new Error(
          "The video conversation was not available. Website answers are still ready."
        );
      }
      if (!mountedRef.current || generation !== requestGeneration.current) {
        await endOwnedVideoSession().catch(() => {});
        needsCleanup = false;
        return;
      }
      const session: VideoSession = {
        conversationId: result.conversationId,
        conversationUrl: conversationUrl.href,
        expiresAt: result.expiresAt,
      };
      videoRef.current = session;
      needsCleanup = false;
      setVideo(session);
      setStatus("Video conversation ready. Your browser will ask for microphone permission.");
      videoTimerRef.current = setTimeout(
        () => {
          if (videoRef.current?.conversationId === session.conversationId) stopVideo();
        },
        Math.min(expires - Date.now(), 2147483647)
      );
    } catch (error) {
      if (needsCleanup) await endOwnedVideoSession().catch(() => {});
      if (mountedRef.current && generation === requestGeneration.current)
        setStatus(
          error instanceof Error
            ? error.message
            : "Video could not start. Website answers are still available."
        );
    } finally {
      requestInFlightRef.current = false;
      if (mountedRef.current && generation === requestGeneration.current) setStartingVideo(false);
    }
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    cancelSpeech();
    askQuestion(question);
    inputRef.current?.focus({ preventScroll: true });
  }

  function chooseQuestion(value: string) {
    cancelSpeech();
    stopListening();
    askQuestion(value);
  }

  const latestReply =
    [...messages].reverse().find((message) => message.role === "guide") || welcome;
  const suggestions = (latestReply.suggestions.length ? latestReply.suggestions : starters).slice(
    0,
    3
  );
  function answerContents(message: GuideMessage) {
    return (
      <>
        <p className="avatar-guide-message-text">{message.text}</p>
        {message.links.length > 0 && (
          <ul className="avatar-guide-sources" aria-label="Website sources">
            {message.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeGuide}>
                  {link.label}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
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
          {readingId === message.id ? "Stop reading" : "Read answer"}
        </button>
      </>
    );
  }
  if (privatePage) return null;

  return (
    <div className="avatar-guide">
      {!hideLauncher && (
        <button
          data-testid="digital-guide-launcher"
          className="avatar-guide-launcher"
          ref={launcherRef}
          type="button"
          onClick={() => (open ? closeGuide() : openGuide())}
          aria-label="Open Swapnil's digital guide"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          aria-expanded={open}
        >
          <span className="avatar-guide-launcher-photo">
            <Image src="/images/profile_pic.jpg" alt="" width={48} height={48} />
          </span>
          <span>
            <strong>Swapnil’s digital assistant</strong>
            <span className="avatar-guide-launcher-hint">
              Voice · courses · teaching <span aria-hidden="true">↗</span>
            </span>
          </span>
        </button>
      )}
      <dialog
        data-testid="digital-guide-dialog"
        className="avatar-guide-dialog"
        data-mode={mode}
        data-live-video={Boolean(video)}
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={modeId}
        onClose={handleClose}
      >
        <div className="avatar-guide-topbar">
          <div>
            <p className="avatar-guide-eyebrow">Your website companion</p>
            <h2 id={titleId}>Swapnil’s digital assistant</h2>
            <p className="avatar-guide-mode" id={modeId}>
              {mode === "voice"
                ? "Browser voice · website guidance"
                : mode === "guided"
                  ? "Prepared website answers"
                  : "AI video · not Dr. Sahoo speaking live"}
            </p>
          </div>
          <button
            data-testid="digital-guide-close"
            className="avatar-guide-close"
            type="button"
            onClick={closeGuide}
            aria-label="Close digital assistant"
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
              <span className="avatar-guide-portrait-label">Dr. Swapnil Sahoo · portrait</span>
            </div>
          </aside>
          <div className="avatar-guide-conversation">
            <div className="avatar-guide-toolbar">
              <div className="avatar-guide-tabs" role="group" aria-label="Conversation mode">
                {(
                  [
                    { value: "voice", label: "Voice" },
                    { value: "video", label: "Video" },
                    { value: "guided", label: "Use text instead" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={mode === item.value}
                    onClick={() => changeMode(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                data-testid="digital-guide-reset"
                className="avatar-guide-reset"
                type="button"
                onClick={resetGuide}
              >
                Reset
              </button>
            </div>
            {mode === "voice" ? (
              <div className="avatar-guide-voice-panel">
                <p>Ask about courses, MBA sessions or the Learning Lab.</p>
                <div
                  data-testid="digital-guide-voice-state"
                  className="avatar-guide-voice-state"
                  role="status"
                  aria-live="polite"
                >
                  {!voiceSupported
                    ? "Voice input is not supported in this browser. Use text instead."
                    : voiceMessage || "Microphone off. You choose when to speak."}
                </div>
                <p>
                  Browser voice may send your audio to its speech service. Replies use a standard
                  device voice, not Dr. Sahoo’s voice. This portrait is not talking video.
                </p>
                <label className="avatar-guide-consent">
                  <input
                    data-testid="digital-guide-voice-consent"
                    type="checkbox"
                    checked={voiceConsent}
                    onChange={(event) => setVoiceConsent(event.target.checked)}
                    disabled={!voiceSupported || voicePhase !== "idle"}
                  />
                  <span>I agree to use browser voice for my questions.</span>
                </label>
                <div className="avatar-guide-voice-actions">
                  {voicePhase === "idle" ? (
                    <button
                      data-testid="digital-guide-voice-start"
                      className="avatar-guide-listen"
                      type="button"
                      disabled={!voiceSupported || !voiceConsent}
                      onClick={() => {
                        cancelSpeech();
                        startListening(voiceConsent);
                      }}
                    >
                      Ask by voice
                    </button>
                  ) : (
                    <button
                      data-testid="digital-guide-voice-stop"
                      className="avatar-guide-listen"
                      type="button"
                      aria-pressed="true"
                      onClick={() => stopListening()}
                    >
                      Stop listening
                    </button>
                  )}
                  {readingId && (
                    <button className="avatar-guide-secondary" type="button" onClick={cancelSpeech}>
                      Stop audio
                    </button>
                  )}
                </div>
                {latestReply.id !== "welcome" && (
                  <article
                    data-testid="digital-guide-voice-answer"
                    className="avatar-guide-answer avatar-guide-message-guide"
                    aria-live="polite"
                  >
                    {answerContents(latestReply)}
                  </article>
                )}
                <div className="avatar-guide-starters" aria-label="Suggested questions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => chooseQuestion(suggestion)}
                    >
                      {suggestion}
                      <span aria-hidden="true"> ↗</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : mode === "guided" ? (
              <div className="avatar-guide-guided-panel">
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
                      {message.role === "guide" ? (
                        answerContents(message)
                      ) : (
                        <p className="avatar-guide-message-text">{message.text}</p>
                      )}
                    </article>
                  ))}
                </div>
                <div className="avatar-guide-starters" aria-label="Suggested questions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => chooseQuestion(suggestion)}
                    >
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
                  Prepared replies use published website information. This website does not save
                  your conversation. Read aloud uses a standard device voice.
                </p>
              </div>
            ) : (
              <div className="avatar-guide-video-panel">
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
                      This video view closes after five minutes. You can return to voice or text at
                      any time.
                    </p>
                  </>
                ) : !liveVideoAvailable ? (
                  <div className="avatar-guide-video-intro">
                    <h3>Video conversations are coming soon.</h3>
                    <p>
                      The personal talking avatar isn’t available yet. The voice guide can help you
                      explore this website now.
                    </p>
                    <button
                      className="avatar-guide-secondary"
                      type="button"
                      onClick={() => changeMode("voice")}
                    >
                      Use voice guide
                    </button>
                  </div>
                ) : (
                  <div className="avatar-guide-video-intro">
                    <h3>Meet the video avatar.</h3>
                    <p>
                      This optional AI avatar is powered by {providerLabel}. It is not a call with
                      Dr. Sahoo.
                    </p>
                    <p>
                      Starting lets {providerLabel} process your microphone audio and conversation.
                      Camera access is blocked by this site. Review{" "}
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
                      <Link href="/digital-guide" onClick={closeGuide}>
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
