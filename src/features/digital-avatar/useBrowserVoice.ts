"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type RecognitionResult = { isFinal: boolean; 0?: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};
type RecognitionConstructor = new () => Recognition;

function recognitionConstructor(): RecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  const browser = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return browser.SpeechRecognition || browser.webkitSpeechRecognition;
}
const subscribe = () => () => {};
const supportedInBrowser = () => Boolean(recognitionConstructor());
const unsupportedOnServer = () => false;

// One question per explicit start. Audio belongs to the browser's speech
// service; this hook receives text only and never uploads or stores audio.
export function useBrowserVoice(onQuestion: (question: string) => void) {
  const supported = useSyncExternalStore(subscribe, supportedInBrowser, unsupportedOnServer);
  const [phase, setPhase] = useState<"idle" | "starting" | "listening">("idle");
  const [message, setMessage] = useState("");
  const active = useRef<Recognition | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const callback = useRef(onQuestion);

  useEffect(() => {
    callback.current = onQuestion;
  }, [onQuestion]);

  const release = useCallback(() => {
    const recognition = active.current;
    active.current = null;
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
    if (recognition) {
      recognition.onstart = recognition.onresult = recognition.onerror = recognition.onend = null;
      try {
        recognition.abort();
      } catch {
        /* The browser may already have ended it. */
      }
    }
  }, []);

  const stop = useCallback(
    (updateUI = true) => {
      const wasActive = Boolean(active.current);
      release();
      if (updateUI && mounted.current) {
        setPhase("idle");
        if (wasActive) setMessage("Microphone stopped. Tap Ask by voice for another question.");
      }
    },
    [release]
  );

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      stop(false);
    };
  }, [stop]);

  const start = useCallback(
    (consent: boolean) => {
      if (!consent || active.current) return;
      const Constructor = recognitionConstructor();
      if (!Constructor) {
        setMessage("Voice input is not supported in this browser. Use text instead.");
        return;
      }
      let recognition: Recognition;
      try {
        recognition = new Constructor();
      } catch {
        setMessage("Voice input could not start. Use text instead.");
        return;
      }
      active.current = recognition;
      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      setPhase("starting");
      setMessage("Waiting for microphone access…");
      const endAfter = (milliseconds: number) => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          if (active.current !== recognition) return;
          release();
          if (mounted.current) {
            setPhase("idle");
            setMessage("Listening timed out. Tap Ask by voice to try again, or use text.");
          }
        }, milliseconds);
      };
      endAfter(30000);
      recognition.onstart = () => {
        if (active.current !== recognition || !mounted.current) return;
        setPhase("listening");
        setMessage("Listening. Ask one question in English.");
        endAfter(20000);
      };
      recognition.onresult = (event) => {
        if (active.current !== recognition || !mounted.current) return;
        let text = "";
        for (let index = event.resultIndex || 0; index < event.results.length; index++) {
          const result = event.results[index];
          if (result?.isFinal) {
            text = result[0]?.transcript?.trim().slice(0, 500) || "";
            break;
          }
        }
        if (!text) return;
        // Detach callbacks and release capture before any spoken answer begins.
        release();
        setPhase("idle");
        setMessage("Question received. The microphone is off.");
        callback.current(text);
      };
      recognition.onerror = (event) => {
        if (active.current !== recognition || !mounted.current) return;
        release();
        setPhase("idle");
        const explanation = ["not-allowed", "service-not-allowed"].includes(event.error)
          ? "Microphone permission was denied. You can use text instead."
          : event.error === "no-speech"
            ? "I didn’t hear a question. Try again or use text instead."
            : event.error === "audio-capture"
              ? "No microphone is available. You can use text instead."
              : "The browser’s voice service could not respond. Try again or use text instead.";
        setMessage(explanation);
      };
      recognition.onend = () => {
        if (active.current !== recognition || !mounted.current) return;
        release();
        setPhase("idle");
        setMessage("Listening ended. Tap Ask by voice to try again, or use text.");
      };
      try {
        recognition.start();
      } catch {
        release();
        setPhase("idle");
        setMessage("Voice input could not start. Check microphone permission or use text instead.");
      }
    },
    [release]
  );

  return { supported, phase, message, start, stop };
}
