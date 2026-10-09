import { chromium } from "playwright";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const work = path.join(root, "artifacts/learning-lab/digital-avatar-build");
const output = path.join(root, "public/videos/digital-avatar");
const narration = JSON.parse((await readFile(path.join(work, "narration.json"), "utf8")).replace(/^\uFEFF/, ""));
const files = new Map([
  ["/sprite.png", [path.join(root, "public/images/digital-avatar/swapnil-speaking-sprites.png"), "image/png"]],
  ["/welcome.wav", [path.join(work, "welcome.wav"), "audio/wav"]],
]);
const server = createServer(async (request, response) => {
  const file = files.get(request.url);
  if (!file) {
    response.writeHead(request.url === "/" ? 200 : 404, { "Content-Type": "text/html" });
    response.end(request.url === "/" ? '<!doctype html><html lang="en"><title>Local avatar render</title><canvas width="512" height="576"></canvas></html>' : "Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": file[1] });
  response.end(await readFile(file[0]));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({ headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  const result = await page.evaluate(async ({ mouth }) => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "/sprite.png";
    await image.decode();
    const audio = new AudioContext();
    const buffer = await audio.decodeAudioData(await (await fetch("/welcome.wav")).arrayBuffer());
    await audio.resume();
    const destination = audio.createMediaStreamDestination();
    const source = audio.createBufferSource();
    source.buffer = buffer;
    source.connect(destination);
    const stream = canvas.captureStream(25);
    destination.stream.getAudioTracks().forEach((track) => stream.addTrack(track));
    const mime = "video/webm;codecs=vp9,opus";
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 900000 });
    const chunks = [];
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    const finished = new Promise((resolve) => { recorder.onstop = resolve; });
    const frameFor = (viseme) => {
      if ([0, 21].includes(viseme)) return 0;
      if ([3, 7, 8, 9, 10].includes(viseme)) return 3;
      if ([1, 2, 11].includes(viseme)) return 2;
      if ([4, 6, 15, 18].includes(viseme)) return 4;
      return 1;
    };
    let cursor = 0;
    let frame = 0;
    let running = true;
    const starts = audio.currentTime + 0.25;
    function draw() {
      const time = audio.currentTime - starts;
      while (cursor < mouth.length && mouth[cursor].Seconds <= time) frame = frameFor(mouth[cursor++].Viseme);
      const silent = time < 0 || time >= buffer.duration;
      const blink = (silent || frame === 0) && time > 0 && time % 4.1 > 3.94;
      const tile = blink ? 5 : silent ? 0 : frame;
      context.fillStyle = "#fffdf8";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (tile % 3) * 512, Math.floor(tile / 3) * 512, 512, 512, 0, 0, 512, 512);
      context.fillStyle = "#202b40";
      context.fillRect(0, 512, 512, 64);
      context.fillStyle = "#fffdf8";
      context.font = "600 17px sans-serif";
      context.textAlign = "center";
      context.fillText("Swapnil’s digital learning guide", 256, 538);
      context.font = "13px sans-serif";
      context.fillText("AI-generated likeness · Synthetic voice · Recorded introduction", 256, 560);
      if (running) requestAnimationFrame(draw);
    }
    draw();
    recorder.start();
    source.start(starts);
    await new Promise((resolve) => { source.onended = resolve; });
    await new Promise((resolve) => setTimeout(resolve, 250));
    running = false;
    recorder.stop();
    await finished;
    stream.getTracks().forEach((track) => track.stop());
    await audio.close();
    const blob = new Blob(chunks, { type: mime });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { base64: btoa(binary), duration: buffer.duration + 0.5, mime, width: canvas.width, height: canvas.height };
  }, narration);
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, "welcome.webm"), Buffer.from(result.base64, "base64"));
  // Optional local FFmpeg export adds seekable WebM metadata and an H.264/AAC
  // MP4 fallback. Supply a reviewed executable privately; none is downloaded here.
  if (process.env.AVATAR_FFMPEG_PATH) {
    const run = promisify(execFile);
    const finalized = path.join(work, "welcome-seekable.webm");
    await run(process.env.AVATAR_FFMPEG_PATH, [
      "-hide_banner", "-loglevel", "error", "-y", "-i", path.join(output, "welcome.webm"),
      "-c", "copy", finalized,
    ]);
    await writeFile(path.join(output, "welcome.webm"), await readFile(finalized));
    await run(process.env.AVATAR_FFMPEG_PATH, [
      "-hide_banner", "-loglevel", "error", "-y", "-i", path.join(output, "welcome.webm"),
      "-vf", "fps=25", "-c:v", "libx264", "-crf", "22", "-preset", "medium", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", path.join(output, "welcome.mp4"),
    ]);
  }
  const sentences = [...narration.script.matchAll(/[^.!?]+[.!?]/g)];
  const time = (seconds) => new Date(Math.max(0, seconds) * 1000).toISOString().slice(11, 23);
  const cues = sentences.map((sentence, index) => {
    const start = narration.words.find((word) => word.CharacterPosition >= sentence.index && word.CharacterPosition < sentence.index + sentence[0].length);
    const next = sentences[index + 1];
    const end = next && narration.words.find((word) => word.CharacterPosition >= next.index);
    return `${index + 1}\n${time((start?.Seconds || 0) + 0.25)} --> ${time(end ? end.Seconds + 0.25 : result.duration)}\n${sentence[0].trim()}\n`;
  });
  await writeFile(path.join(output, "captions.vtt"), "WEBVTT\n\n" + cues.join("\n"));
  await writeFile(path.join(output, "transcript.txt"), "Swapnil's digital learning guide\nAI-generated likeness. Stock synthetic voice. Prerecorded introduction.\n\n" + narration.script + "\n");
  await writeFile(path.join(work, "render.json"), JSON.stringify({ ...result, base64: undefined, bytes: Buffer.from(result.base64, "base64").length, voice: narration.voice }, null, 2));
  console.log(JSON.stringify({ output, duration: result.duration, bytes: Buffer.from(result.base64, "base64").length, mime: result.mime, captions: cues.length }));
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
