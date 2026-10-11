import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

// All recognition, microphone access, media playback and synthesis are replaced before the
// application loads. These checks exercise UI lifecycle, never real audio,
// browser speech services, provider sessions, accounts or payments.
const base = (process.env.GUIDE_TEST_BASE_URL || "http://localhost:3112").replace(/\/$/, "");
const profile = (process.env.GUIDE_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const dir = "artifacts/learning-lab/digital-guide";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [],
  errors = [],
  blockedWrites = [];
const report = { base, profile, runAt: new Date().toISOString(), checks, errors, blockedWrites };
const assert = (value, message) => {
  if (!value) throw new Error(message);
};
let currentPage;

async function withVoice(name, mode, test) {
  const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
  await context.addInitScript(
    ({ mode }) => {
      const check = (window.guideVoiceCheck = {
        starts: 0,
        stops: 0,
        aborts: 0,
        cancelled: 0,
        microphoneCalls: 0,
        spoken: [],
        settings: [],
        instances: [],
        activeUtterance: null,
        startError: false,
        savedResult: null,
        videoPlays: 0,
        videoPauses: 0,
      });
      const event = (type, properties = {}) => Object.assign(new Event(type), properties);
      const media = new WeakMap();
      const mediaState = (element) => {
        if (!media.has(element)) {
          const state = { paused: true };
          media.set(element, state);
          Object.defineProperty(element, "paused", { configurable: true, get: () => state.paused });
        }
        return media.get(element);
      };
      HTMLMediaElement.prototype.play = function () {
        check.videoPlays++;
        mediaState(this).paused = false;
        this.dispatchEvent(event("play"));
        return Promise.resolve();
      };
      HTMLMediaElement.prototype.pause = function () {
        check.videoPauses++;
        mediaState(this).paused = true;
        this.dispatchEvent(event("pause"));
      };
      class Recognition extends EventTarget {
        constructor() {
          super();
          check.instances.push(this);
        }
        emit(type, properties = {}) {
          const value = event(type, properties);
          this[`on${type}`]?.(value);
          this.dispatchEvent(value);
        }
        start() {
          check.starts++;
          check.settings.push({
            continuous: this.continuous,
            interimResults: this.interimResults,
            maxAlternatives: this.maxAlternatives,
            lang: this.lang,
          });
          if (check.startError)
            throw new DOMException("Microphone permission was denied.", "NotAllowedError");
          check.savedResult = this.onresult;
          this.emit("start");
        }
        stop() {
          check.stops++;
          queueMicrotask(() => this.emit("end"));
        }
        abort() {
          check.aborts++;
          queueMicrotask(() => this.emit("end"));
        }
      }
      Object.defineProperty(window, "SpeechRecognition", {
        configurable: true,
        value: mode === "standard" ? Recognition : undefined,
      });
      Object.defineProperty(window, "webkitSpeechRecognition", {
        configurable: true,
        value: mode === "webkit" ? Recognition : undefined,
      });
      Object.defineProperty(window, "SpeechSynthesisUtterance", {
        configurable: true,
        value: class {
          constructor(text) {
            this.text = text;
          }
        },
      });
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: {
          speak(utterance) {
            check.spoken.push(utterance.text);
            check.activeUtterance = utterance;
            queueMicrotask(() => utterance.onstart?.(event("start")));
          },
          cancel() {
            check.cancelled++;
            check.activeUtterance = null;
          },
          getVoices: () => [
            { name: "Local test voice", lang: "en-IN", localService: true, default: true },
          ],
          addEventListener() {},
          removeEventListener() {},
          resume() {},
        },
      });
      if (navigator.mediaDevices)
        Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
          configurable: true,
          value: () => {
            check.microphoneCalls++;
            return Promise.reject(new Error("Real microphone access is prohibited in this test."));
          },
        });
      const result = (text) => ({
        resultIndex: 0,
        results: [Object.assign([{ transcript: text, confidence: 1 }], { isFinal: true })],
      });
      check.final = (text) => check.instances.at(-1)?.emit("result", result(text));
      check.lateFinal = (text) => check.savedResult?.(event("result", result(text)));
      check.error = (error) => {
        const recognition = check.instances.at(-1);
        recognition?.emit("error", { error });
        recognition?.emit("end");
      };
      check.finishSpeech = () => {
        const utterance = check.activeUtterance;
        check.activeUtterance = null;
        utterance?.onend?.(event("end"));
      };
    },
    { mode }
  );
  await context.route("**/*", (route) => {
    const request = route.request();
    const resource = new URL(request.url());
    if (
      request.resourceType() === "document" &&
      request.frame().parentFrame() &&
      resource.origin !== new URL(base).origin
    )
      return route.abort("blockedbyclient");
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      blockedWrites.push(`${resource.origin}${resource.pathname}`);
      return route.abort("blockedbyclient");
    }
    return route.continue();
  });
  const page = (currentPage = await context.newPage());
  page.on("pageerror", (error) => errors.push(`${name}: ${error.message}`));
  const id = (suffix) => page.getByTestId(`digital-guide-${suffix}`);
  const state = () =>
    page.evaluate(() => {
      const value = window.guideVoiceCheck;
      return {
        starts: value.starts,
        stops: value.stops,
        aborts: value.aborts,
        cancelled: value.cancelled,
        microphoneCalls: value.microphoneCalls,
        spoken: value.spoken,
        settings: value.settings,
        videoPlays: value.videoPlays,
        videoPauses: value.videoPauses,
      };
    });
  const start = async () => {
    const previousStarts = (await state()).starts;
    if (!(await id("voice-consent").isVisible())) await id("voice-start").click();
    assert(
      (await state()).starts === previousStarts,
      "Opening voice options must not request capture"
    );
    await id("voice-consent").check();
    await id("voice-start").click();
    await page.waitForFunction(
      (previous) => window.guideVoiceCheck.starts > previous,
      previousStarts
    );
  };
  try {
    assert(
      (await page.goto(`${base}/learning-lab`, { waitUntil: "networkidle" }))?.status() === 200,
      "Lab did not render"
    );
    await page.waitForLoadState("load");
    await id("launcher").click();
    await id("dialog").waitFor({ state: "visible" });
    assert((await state()).starts === 0, `${name}: capture started on opening`);
    assert((await state()).spoken.length === 0, `${name}: audio played on opening`);
    assert((await state()).videoPlays === 0, `${name}: welcome video played automatically`);
    assert(await id("welcome-video").isVisible(), `${name}: video was not the default view`);
    assert(
      (await id("input").isVisible()) && (await id("voice-start").isVisible()),
      `${name}: text/voice controls are not integrated`
    );
    assert(
      (await id("dialog").locator("iframe").count()) === 0,
      `${name}: unconfigured provider frame loaded`
    );
    await test({ page, id, state, start });
    assert((await state()).microphoneCalls === 0, `${name}: application tried a real microphone`);
    checks.push(name);
  } catch (error) {
    await page.screenshot({ path: `${dir}/${profile}-voice-failure.png` }).catch(() => {});
    throw error;
  } finally {
    await context.close();
  }
}

try {
  await withVoice(
    "Explicit consent, final answer, bounded transcript and no automatic loop",
    "standard",
    async ({ page, id, state, start }) => {
      assert(
        await id("voice-start").isEnabled(),
        "Enable voice must open the separate consent options"
      );
      await start();
      const settings = (await state()).settings[0];
      assert(
        settings.continuous === false &&
          settings.interimResults === false &&
          settings.maxAlternatives === 1,
        "Voice recognition must capture one final utterance"
      );
      assert(settings.lang === "en-IN", "Expected the configured Indian English language");
      assert(/listening/i.test(await id("voice-state").innerText()), "Listening is not visible");
      const question = `How do I calculate unit economics? ${"x".repeat(800)}`;
      await page.evaluate((value) => window.guideVoiceCheck.final(value), question);
      await page.waitForFunction(() => window.guideVoiceCheck.spoken.length > 0);
      const result = await state();
      assert(
        result.stops + result.aborts > 0,
        "Recognition was not stopped before answer playback"
      );
      assert(
        /unit economics/i.test(result.spoken.at(-1)),
        "Spoken answer was not the prepared course guidance"
      );
      await page.evaluate(() => window.guideVoiceCheck.finishSpeech());
      await page.waitForTimeout(150);
      assert((await state()).starts === 1, "Recognition restarted without a visitor action");
      const visitor = id("messages")
        .locator(".avatar-guide-message-visitor .avatar-guide-message-text")
        .last();
      assert(
        (await visitor.innerText()).trim() === question.slice(0, 500),
        "Spoken transcript was not bounded to 500 characters"
      );
      assert(
        (await id("messages").locator('a[href*="read-your-unit-economics"]').count()) > 0,
        "Voice answer lost its published source"
      );
    }
  );

  await withVoice(
    "Prefixed recognition and explicit stop",
    "webkit",
    async ({ id, state, start }) => {
      await start();
      await id("voice-stop").click();
      assert(
        (await state()).stops + (await state()).aborts > 0,
        "Stop listening did not stop recognition"
      );
      assert((await state()).spoken.length === 0, "Stopping without a question played an answer");
    }
  );

  await withVoice(
    "Welcome playback stops before explicit voice capture",
    "standard",
    async ({ id, state, start }) => {
      await id("welcome-video").evaluate((video) => video.play());
      const previous = (await state()).videoPauses;
      await start();
      assert(
        (await state()).videoPauses > previous,
        "Voice capture did not pause the welcome video"
      );
      assert(
        await id("welcome-video").evaluate((video) => video.paused),
        "Video remained playing during capture"
      );
      assert(
        await id("animated-avatar").isVisible(),
        "The same video area should show the listening likeness"
      );
    }
  );

  await withVoice(
    "Welcome playback cancels listening and rejects late recognition",
    "standard",
    async ({ page, id, state, start }) => {
      await start();
      await id("welcome-video").evaluate((video) => video.play());
      await page.waitForFunction(
        () => window.guideVoiceCheck.aborts + window.guideVoiceCheck.stops > 0
      );
      await page.evaluate(() =>
        window.guideVoiceCheck.lateFinal("How do I calculate unit economics?")
      );
      await page.waitForTimeout(100);
      assert(
        (await state()).spoken.length === 0,
        "Welcome playback accepted a stale microphone result"
      );
      assert(
        await id("welcome-video").isVisible(),
        "Welcome playback did not restore the video area"
      );
    }
  );

  await withVoice(
    "Welcome playback cancels a spoken answer without restarting capture",
    "standard",
    async ({ page, id, state, start }) => {
      await start();
      await page.evaluate(() => window.guideVoiceCheck.final("How do I interview customers?"));
      await page.waitForFunction(() => window.guideVoiceCheck.spoken.length > 0);
      const previous = (await state()).cancelled;
      await id("welcome-video").evaluate((video) => video.play());
      await page.waitForFunction((value) => window.guideVoiceCheck.cancelled > value, previous);
      assert((await state()).starts === 1, "Welcome playback restarted capture");
      assert(await id("welcome-video").isVisible(), "Video did not replace the speaking likeness");
    }
  );

  await withVoice(
    "Integrated text submission pauses welcome playback",
    "standard",
    async ({ id, state }) => {
      await id("welcome-video").evaluate((video) => video.play());
      const previous = (await state()).videoPauses;
      await id("input").fill("Where should I start with AI?");
      await id("send").click();
      assert((await state()).videoPauses > previous, "Text submission did not pause the welcome");
      assert(
        await id("welcome-video").evaluate((video) => video.paused),
        "Video kept playing after text submission"
      );
      assert(
        (await state()).spoken.length === 0 && (await state()).starts === 0,
        "Text submission unexpectedly started audio or capture"
      );
    }
  );

  await withVoice(
    "Unsupported browser retains an honest text alternative",
    "unsupported",
    async ({ id, state }) => {
      await id("dialog").getByText("Voice input and privacy", { exact: true }).click();
      assert(
        /not (?:available|supported)|unavailable|does not support|unsupported/i.test(
          await id("dialog").innerText()
        ),
        "Unsupported speech is not explained"
      );
      assert((await state()).starts === 0, "Unsupported browser attempted recognition");
      assert(
        await id("voice-start").isDisabled(),
        "Unsupported recognition must disable capture, not text"
      );
      await id("input").fill("Where should I start with AI?");
      await id("send").click();
      assert(
        (await id("messages").locator('a[href*="free-courses"]').count()) > 0,
        "Text fallback could not answer"
      );
    }
  );

  for (const error of ["not-allowed", "network", "no-speech"]) {
    await withVoice(
      `Recognition ${error} error is honest and does not loop`,
      "standard",
      async ({ page, id, state, start }) => {
        await start();
        await page.evaluate((value) => window.guideVoiceCheck.error(value), error);
        await id("voice-state")
          .filter({
            hasText:
              /permission|allow|denied|network|connect|speech|hear|try|unavailable|could not/i,
          })
          .waitFor({ state: "visible" });
        assert((await state()).spoken.length === 0, `${error}: failure fabricated a spoken answer`);
        assert((await state()).starts === 1, `${error}: failed recognition restarted`);
      }
    );
  }

  await withVoice(
    "Synchronous microphone denial resets the start state",
    "standard",
    async ({ page, id, state, start }) => {
      await page.evaluate(() => {
        window.guideVoiceCheck.startError = true;
      });
      await start();
      assert(
        /permission|denied|could not|unable|unavailable|failed|not.*start/i.test(
          await id("voice-state").innerText()
        ),
        "Thrown start error was hidden"
      );
      assert((await state()).spoken.length === 0, "Thrown start error fabricated an answer");
      assert(
        !(await id("voice-start").isDisabled()),
        "Thrown start error left the start button stuck"
      );
    }
  );

  for (const action of ["close", "reset", "text", "route", "hidden"]) {
    await withVoice(
      `Listening cleanup on ${action} rejects late results`,
      "standard",
      async ({ page, id, state, start }) => {
        await start();
        if (action === "close") await id("close").click();
        if (action === "reset") await id("reset").click();
        if (action === "text") {
          await id("input").fill("Where should I start with AI?");
          await id("send").click();
          assert(
            (await id("messages").locator('a[href*="free-courses"]').count()) > 0,
            "Integrated text submission did not answer"
          );
        }
        if (action === "route")
          await page.evaluate(() => history.pushState(null, "", "/learning-lab/free-courses"));
        if (action === "hidden")
          await page.evaluate(() => {
            Object.defineProperty(document, "hidden", { configurable: true, value: true });
            Object.defineProperty(document, "visibilityState", {
              configurable: true,
              value: "hidden",
            });
            document.dispatchEvent(new Event("visibilitychange"));
          });
        await page.waitForFunction(
          () => window.guideVoiceCheck.aborts + window.guideVoiceCheck.stops > 0
        );
        await page.evaluate(() => window.guideVoiceCheck.lateFinal("What is the weather on Mars?"));
        await page.waitForTimeout(100);
        assert(
          (await state()).spoken.length === 0,
          `${action}: a late recognition result played audio`
        );
        assert((await state()).starts === 1, `${action}: recognition restarted after cleanup`);
        if (action === "close")
          assert(!(await id("dialog").isVisible()), "Close left the popup visible");
      }
    );
  }

  for (const action of ["close", "reset", "route", "hidden"]) {
    await withVoice(
      `Spoken answer cleanup on ${action}`,
      "standard",
      async ({ page, id, state, start }) => {
        await start();
        await page.evaluate(() => window.guideVoiceCheck.final("How do I interview customers?"));
        await page.waitForFunction(() => window.guideVoiceCheck.spoken.length > 0);
        const previous = (await state()).cancelled;
        if (action === "close") await id("close").click();
        if (action === "reset") await id("reset").click();
        if (action === "route")
          await page.evaluate(() => history.pushState(null, "", "/learning-lab/free-courses"));
        if (action === "hidden")
          await page.evaluate(() => {
            Object.defineProperty(document, "hidden", { configurable: true, value: true });
            Object.defineProperty(document, "visibilityState", {
              configurable: true,
              value: "hidden",
            });
            document.dispatchEvent(new Event("visibilitychange"));
          });
        await page.waitForFunction((value) => window.guideVoiceCheck.cancelled > value, previous);
        assert(
          (await state()).starts === 1,
          `${action}: recognition restarted after playback cleanup`
        );
      }
    );
  }
  assert(errors.length === 0, `Browser errors: ${errors.join("; ")}`);
  assert(
    blockedWrites.length === 0,
    `Voice mode attempted HTTP writes: ${blockedWrites.join("; ")}`
  );
  report.status = "PASS";
  console.log(
    `PASS ${checks.length} mocked voice checks: consent, support/failure states, final answers and cleanup; no real audio or HTTP writes`
  );
} catch (error) {
  report.status = "FAIL";
  report.failure = error.message;
  if (currentPage && !currentPage.isClosed())
    await currentPage.screenshot({ path: `${dir}/${profile}-voice-failure.png` }).catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  await writeFile(`${dir}/${profile}-voice-results.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
