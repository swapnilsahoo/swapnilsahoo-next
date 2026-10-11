"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { getGuidedReply, starters } from "./knowledge";
import { useBrowserVoice } from "./useBrowserVoice";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { MentorPanel } from "./MentorPanel";
import { getMentorLessonForPath, type MentorMode } from "./lesson-manifest";
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
  text: "Hello. Watch my welcome, type a question or enable voice below. I offer prepared guidance from Dr. Swapnil Sahoo’s published materials. Learning tools help you find a path, explain a lesson or practise a decision.",
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
  const currentLesson = getMentorLessonForPath(pathname);
  const privatePage = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const hideLauncher = pathname === "/digital-guide";
  const uniqueId = useId();
  const dialogId = `digital-guide-${uniqueId}`;
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(false);
  const openRef = useRef(false);
  const messageCounter = useRef(0);
  const lastMentorActionRef = useRef<MentorMode | null>(null);
  const mountedRef = useRef(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const welcomeVideoRef = useRef<HTMLVideoElement | null>(null);
  const voiceOptionsRef = useRef<HTMLDetailsElement | null>(null);
  const welcomeSourceFailuresRef = useRef(new Set<EventTarget>());
  const videoRef = useRef<VideoSession | null>(null);
  const videoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestGeneration = useRef(0);
  const requestInFlightRef = useRef(false);
  const pendingCleanupRef = useRef<Promise<Response> | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<GuideMessage[]>([welcome]);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [readingId, setReadingId] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [video, setVideo] = useState<VideoSession | null>(null);
  const [videoConsent, setVideoConsent] = useState(false);
  const [startingVideo, setStartingVideo] = useState(false);
  const [welcomeVideoFailed, setWelcomeVideoFailed] = useState(false);
  const [mentorAction, setMentorAction] = useState<MentorMode | null>(null);

  const pauseWelcome = useCallback((reset = false) => {
    const player = welcomeVideoRef.current;
    if (player) {
      player.pause();
      if (reset) player.currentTime = 0;
    }
  }, []);

  const cancelSpeech = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
      speechRef.current.onstart = null;
      speechRef.current.onpause = null;
      speechRef.current.onresume = null;
      speechRef.current = null;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
    if (mountedRef.current) {
      setReadingId(null);
      setSpeaking(false);
    }
  }, []);

  const playMessage = useCallback(
    (message: GuideMessage) => {
      pauseWelcome();
      cancelSpeech();
      if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        setStatus("Read aloud is not available in this browser. The full answer is shown here.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.onstart = utterance.onresume = () => {
        if (mountedRef.current && speechRef.current === utterance) setSpeaking(true);
      };
      utterance.onpause = () => {
        if (mountedRef.current && speechRef.current === utterance) setSpeaking(false);
      };
      utterance.onend = () => {
        if (speechRef.current !== utterance) return;
        speechRef.current = null;
        if (mountedRef.current) {
          setReadingId(null);
          setSpeaking(false);
          setStatus("Read aloud finished.");
        }
      };
      utterance.onerror = () => {
        if (speechRef.current !== utterance) return;
        speechRef.current = null;
        if (mountedRef.current) {
          setReadingId(null);
          setSpeaking(false);
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
    [cancelSpeech, pauseWelcome]
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
      pauseWelcome(true);
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
    [endOwnedVideoSession, pauseWelcome]
  );

  const askQuestion = useCallback(
    (value: string): GuideMessage | null => {
      const text = value.trim().slice(0, 500);
      if (!text) return null;
      const answer = getGuidedReply(text, currentLesson);
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
      setMentorAction(null);
      setStatus("");
      return reply;
    },
    [currentLesson]
  );

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

  const stopLocalMedia = useCallback(() => {
    pauseWelcome();
    cancelSpeech();
    stopListening();
  }, [cancelSpeech, pauseWelcome, stopListening]);

  const handleClose = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    stopLocalMedia();
    stopVideo();
    setOpen(false);
    setMentorAction(null);
    lastMentorActionRef.current = null;
    setVoiceConsent(false);
    if (restoreFocusRef.current) {
      const target = returnFocusRef.current || launcherRef.current;
      queueMicrotask(() => {
        if (target?.isConnected) target.focus({ preventScroll: true });
      });
    }
    restoreFocusRef.current = false;
  }, [stopLocalMedia, stopVideo]);

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
      stopLocalMedia();
      stopVideo();
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
    [askQuestion, stopLocalMedia, stopVideo]
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
      stopLocalMedia();
      stopVideo();
      setOpen(false);
      setVoiceConsent(false);
    };
  }, [pathname, stopLocalMedia, stopVideo]);

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
      stopLocalMedia();
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
  }, [stopLocalMedia, stopVideo]);

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
    const answer = transcript?.querySelector(".avatar-guide-message-guide:last-of-type");
    if (transcript && answer)
      transcript.scrollTop +=
        answer.getBoundingClientRect().top - transcript.getBoundingClientRect().top;
  }, [messages, mentorAction]);

  function resetGuide() {
    stopLocalMedia();
    stopVideo();
    setVoiceConsent(false);
    setMessages([welcome]);
    setQuestion("");
    setStatus("Conversation cleared. No chat history has been saved.");
    setMentorAction(null);
    lastMentorActionRef.current = null;
    if (voiceOptionsRef.current) voiceOptionsRef.current.open = false;
    queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function readAnswer(message: GuideMessage) {
    stopListening();
    if (readingId === message.id) {
      cancelSpeech();
      setStatus("Read aloud stopped.");
    } else playMessage(message);
  }

  function chooseMentorAction(action: MentorMode) {
    stopLocalMedia();
    setStatus("");
    setMentorAction(action);
    lastMentorActionRef.current = action;
  }

  function readMentorText(text: string) {
    stopListening();
    playMessage({
      id: `mentor-${++messageCounter.current}`,
      role: "guide",
      text,
      links: [],
      suggestions: [],
    });
  }

  async function startVideo() {
    if (!liveVideoAvailable || !videoConsent || startingVideo || videoRef.current) return;
    if (requestInFlightRef.current || pendingCleanupRef.current) {
      setStatus("The previous connection is still finishing. Please try again in a moment.");
      return;
    }
    stopLocalMedia();
    setMentorAction(null);
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
        body: JSON.stringify({
          consent: true,
          ...(currentLesson ? { lessonId: currentLesson.lessonId } : {}),
          ...(lastMentorActionRef.current ? { mode: lastMentorActionRef.current } : {}),
        }),
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
    stopLocalMedia();
    askQuestion(question);
    inputRef.current?.focus({ preventScroll: true });
  }

  function chooseQuestion(value: string) {
    stopLocalMedia();
    askQuestion(value);
  }

  const latestReply =
    [...messages].reverse().find((message) => message.role === "guide") || welcome;
  const suggestions = (latestReply.suggestions.length ? latestReply.suggestions : starters).slice(
    0,
    3
  );
  const localControlsDisabled = Boolean(video) || startingVideo;
  const localVoiceActive = speaking || voicePhase !== "idle";
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
          disabled={localControlsDisabled}
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
            <strong>Dr. Swapnil Sahoo AI Mentor</strong>
            <span className="avatar-guide-launcher-hint">
              Video · voice · text <span aria-hidden="true">↗</span>
            </span>
          </span>
        </button>
      )}
      <dialog
        data-testid="digital-guide-dialog"
        className="avatar-guide-dialog"
        data-mentor={Boolean(mentorAction)}
        data-live-video={Boolean(video)}
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={handleClose}
      >
        <div className="avatar-guide-topbar">
          <div>
            <h2 id={titleId}>Dr. Swapnil Sahoo AI Mentor</h2>
            <p className="avatar-guide-mode" id={descriptionId}>
              {video
                ? "AI video · not Dr. Sahoo speaking live"
                : localVoiceActive
                  ? "Prepared answers · standard device voice"
                  : "Prerecorded welcome · synthetic voice"}
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
          <div className="avatar-guide-media" aria-label="Digital avatar video">
            {video ? (
              <iframe
                src={video.conversationUrl}
                title={`AI video avatar conversation powered by ${providerLabel}`}
                allow="microphone; autoplay; fullscreen"
                referrerPolicy="no-referrer"
              />
            ) : (
              <>
                <video
                  data-testid="digital-guide-welcome-video"
                  ref={welcomeVideoRef}
                  controls
                  playsInline
                  preload="none"
                  hidden={localVoiceActive || welcomeVideoFailed}
                  poster="/images/profile_pic.jpg"
                  aria-label="Prerecorded animated welcome with a standard synthetic voice"
                  onError={(event) => {
                    if (event.target instanceof HTMLSourceElement) {
                      welcomeSourceFailuresRef.current.add(event.target);
                      if (
                        welcomeSourceFailuresRef.current.size >=
                        event.currentTarget.querySelectorAll("source").length
                      )
                        setWelcomeVideoFailed(true);
                    } else if (event.target === event.currentTarget && event.currentTarget.error)
                      setWelcomeVideoFailed(true);
                  }}
                  onLoadStart={() => {
                    welcomeSourceFailuresRef.current.clear();
                    setWelcomeVideoFailed(false);
                  }}
                  onLoadedData={() => {
                    welcomeSourceFailuresRef.current.clear();
                    setWelcomeVideoFailed(false);
                  }}
                  onPlay={() => {
                    cancelSpeech();
                    stopListening();
                  }}
                >
                  <source src="/videos/digital-avatar/welcome.mp4" type="video/mp4" />
                  <source src="/videos/digital-avatar/welcome.webm" type="video/webm" />
                  <track
                    default
                    kind="captions"
                    src="/videos/digital-avatar/captions.vtt"
                    srcLang="en"
                    label="English"
                  />
                  Your browser cannot play the welcome. Voice and text remain available below.
                </video>
                {(localVoiceActive || welcomeVideoFailed) && (
                  <AnimatedAvatar
                    active={open}
                    speaking={speaking}
                    listening={voicePhase !== "idle"}
                  />
                )}
              </>
            )}
          </div>
          <div className="avatar-guide-context">
            {welcomeVideoFailed && (
              <p role="status">
                Welcome video unavailable. Voice, text and the transcript are still ready.
              </p>
            )}
            <details className="avatar-guide-media-info">
              <summary>About this video</summary>
              <p>
                The welcome is prerecorded, with an AI-created likeness and a stock synthetic voice.
                It does not answer questions. Replies below are prepared website guidance; a trained
                personal live replica is not connected unless explicitly offered.
              </p>
              <p>
                <a href="/videos/digital-avatar/transcript.txt">Welcome transcript</a>
                {" · "}
                <a href="/videos/digital-avatar/captions.vtt" download>
                  Download captions
                </a>
              </p>
            </details>
            {liveVideoAvailable && (
              <details className="avatar-guide-provider-options" open={Boolean(video) || undefined}>
                <summary>
                  {video ? "Live conversation controls" : "Start a live AI video conversation"}
                </summary>
                {video ? (
                  <>
                    <button
                      className="avatar-guide-primary"
                      type="button"
                      onClick={() => stopVideo()}
                    >
                      End video conversation
                    </button>
                    <p>
                      This view closes when its session limit is reached. End it to return to
                      prepared voice and text answers.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {providerLabel} will process your microphone audio and conversation. Camera
                      access is blocked. Review{" "}
                      <a
                        href={
                          oneMindEmbedUrl
                            ? "https://www.1mind.com/privacy-policy"
                            : "https://www.tavus.io/privacy-policy"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        provider privacy
                      </a>{" "}
                      and{" "}
                      <Link href="/digital-guide" onClick={closeGuide}>
                        how this guide works
                      </Link>
                      .
                    </p>
                    <label className="avatar-guide-consent">
                      <input
                        type="checkbox"
                        checked={videoConsent}
                        onChange={(event) => setVideoConsent(event.target.checked)}
                        disabled={startingVideo}
                      />
                      <span>I agree to {providerLabel} processing my audio and conversation.</span>
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
                  </>
                )}
              </details>
            )}
          </div>
          <div className="avatar-guide-conversation">
            <div className="avatar-guide-toolbar">
              <select
                className="avatar-guide-tools"
                aria-label="Learning tools"
                value={mentorAction || ""}
                disabled={localControlsDisabled}
                onChange={(event) => {
                  if (event.target.value) chooseMentorAction(event.target.value as MentorMode);
                  else {
                    stopLocalMedia();
                    setMentorAction(null);
                  }
                }}
              >
                <option value="">Ask a website question</option>
                <option value="find-path">Find my path</option>
                <option value="explain">Explain this lesson</option>
                <option value="practice">Practise a case</option>
                <option value="review">Review my reasoning</option>
              </select>
              <button
                data-testid="digital-guide-reset"
                className="avatar-guide-reset"
                type="button"
                onClick={resetGuide}
              >
                Reset
              </button>
            </div>
            {mentorAction ? (
              <MentorPanel
                key={`${pathname}-${mentorAction}`}
                action={mentorAction}
                lesson={currentLesson}
                onRead={readMentorText}
                onStopAudio={stopLocalMedia}
                onNavigate={closeGuide}
              />
            ) : (
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
                <div className="avatar-guide-starters" aria-label="Suggested questions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => chooseQuestion(suggestion)}
                      disabled={localControlsDisabled}
                    >
                      {suggestion}
                      <span aria-hidden="true"> ↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <form
              className="avatar-guide-composer"
              onSubmit={submitQuestion}
              aria-label="Ask the digital guide"
            >
              <label className="avatar-guide-input-label" htmlFor={`${dialogId}-question`}>
                Your question
              </label>
              <div className="avatar-guide-input-row">
                <input
                  data-testid="digital-guide-input"
                  ref={inputRef}
                  id={`${dialogId}-question`}
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  maxLength={500}
                  autoComplete="off"
                  placeholder="Ask a question…"
                  disabled={localControlsDisabled}
                />
                <button
                  data-testid="digital-guide-send"
                  type="submit"
                  disabled={!question.trim() || localControlsDisabled}
                >
                  Send <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
            <div className="avatar-guide-voice-actions">
              {voicePhase === "idle" ? (
                <button
                  data-testid="digital-guide-voice-start"
                  className="avatar-guide-listen"
                  type="button"
                  disabled={!voiceSupported || localControlsDisabled}
                  onClick={() => {
                    if (!voiceConsent) {
                      if (voiceOptionsRef.current) voiceOptionsRef.current.open = true;
                      return;
                    }
                    stopLocalMedia();
                    startListening(voiceConsent);
                  }}
                >
                  {voiceConsent ? "Ask by voice" : "Enable voice"}
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
            <details className="avatar-guide-voice-options" ref={voiceOptionsRef}>
              <summary>Voice input and privacy</summary>
              <p>
                Browser voice may send audio to its speech service. Spoken replies use a standard
                device voice, not Dr. Sahoo’s voice. This website does not save your conversation.
              </p>
              <label className="avatar-guide-consent">
                <input
                  data-testid="digital-guide-voice-consent"
                  type="checkbox"
                  checked={voiceConsent}
                  onChange={(event) => setVoiceConsent(event.target.checked)}
                  disabled={!voiceSupported || voicePhase !== "idle" || localControlsDisabled}
                />
                <span>I agree to browser voice for my questions.</span>
              </label>
              <p data-testid="digital-guide-voice-state" role="status" aria-live="polite">
                {!voiceSupported
                  ? "Voice input is not supported here. Type your question instead."
                  : voiceMessage || "Microphone off. You choose when to speak."}
              </p>
            </details>
            <p className="avatar-guide-status" role="status" aria-live="polite" aria-atomic="true">
              {status}
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
