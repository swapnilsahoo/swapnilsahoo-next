# Swapnil's digitally created speaking guide

Created 9 October 2026 at the owner's request, using his existing portrait with permission. This handover distinguishes the delivered animation and prerecorded video from the still-unconnected trained conversational replica.

## Delivered

- An original six-expression likeness in `public/images/digital-avatar/swapnil-speaking-sprites.png`, generated with the built-in image generation tool from `public/images/profile_pic.jpg`. The reference portrait remains unchanged.
- A short speaking welcome in `public/videos/digital-avatar/welcome.mp4` and `welcome.webm`. MP4 uses H.264/AAC, 512 × 576, 25 FPS; its container duration is approximately 35 seconds. The voice is **Microsoft David Desktop**, a stock synthetic voice, not Swapnil's voice.
- Default English captions in `captions.vtt`, a downloadable `transcript.txt`, and an HTML transcript in the popup. The video contains a persistent AI/synthetic/prerecorded label.
- A small nonmodal popup with Voice, Video and text choices. The welcome waits for Play. Voice questions require opt-in; prepared replies animate the likeness only during speech playback. The light theme remains the document default.
- Speech, microphone recognition and video stop on close, reset, mode change, page navigation, hidden tab or unmount. Reduced-motion preferences keep the interactive likeness still.

The welcome is a real generated audiovisual file. It is prerecorded, cannot answer questions and does not start a provider conversation. Interactive responses are browser-side prepared website guidance spoken by a standard device voice, with simple mouth animation rather than phoneme synchronisation. A personal live video replica, unrestricted generative answers and cloned founder voice are not connected.

## Reproduction

On Windows with the stock Microsoft David Desktop voice installed:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/create-avatar-introduction.ps1
# Optional: supply a separately reviewed FFmpeg executable for seekable WebM and MP4.
$env:AVATAR_FFMPEG_PATH = 'C:\path\to\reviewed\ffmpeg.exe'
node scripts/render-avatar-introduction.mjs
```

The command-scoped execution policy does not change the machine policy. The speech helper writes a 16 kHz PCM WAV, mouth cues and word timestamps under ignored `artifacts/learning-lab/digital-avatar-build`. The renderer uses a loopback server, Playwright Chromium, Canvas and WebAudio; it does not request a microphone or upload audio. Narration includes the synthetic-identity disclosure and the six free courses. Captions derive from captured word timestamps. Re-rendered output can differ slightly in duration and file hash.

FFmpeg was reviewed from the [ffmpeg-static b6.1.1 release](https://github.com/eugeneware/ffmpeg-static/releases/tag/b6.1.1) for local conversion only. The executable is ignored and is not distributed with the website. Its SHA-256 was `04e1307997530f9cf2fe35cba2ca7e8875ca91da02f89d6c7243df819c94ad00`.

## Image provenance and exact generation prompt

Generated sprite: 1536 × 1024 PNG, SHA-256 `1bd97094eebb012b07b35f856f19e3071da2c31652997400f5b9ba7ea96fd21b`. Its explicit approval is recorded in `scripts/check-media-provenance.mjs`. Generation was performed using the built-in image tool, not a replacement portrait found online.

Exact final prompt, with the authentic portrait supplied as the reference:

> Use case: stylized-concept. Asset type: a single production animation sprite sheet for Dr. Swapnil Sahoo's own website digital avatar, made with his explicit request and the attached authentic portrait as identity reference. Create a polished, recognisable stylised 3D editorial bust of the SAME man: preserve his face shape, brown skin, black swept-up hair, brows, eyes, clean-shaven appearance and navy suit/light blue shirt/dark tie. Warm, thoughtful instructor expression, looking directly toward viewer. This is visibly a digitally illustrated likeness, not a real recording. ONE sprite sheet in an exact 3-column by 2-row equal-square-cell grid, no gutters, no borders, no text or labels. Six copies of precisely the same centred head-and-shoulders bust, same scale, head position, shoulders, camera, lighting, soft warm cream background (#fffdf8) in EVERY cell; only mouths/eyelids differ. Every cell shows the full hair to upper chest, centered with generous headroom. Grid states in reading order: top-left neutral friendly closed lips; top-middle small gently open speaking mouth; top-right medium open 'ah' speaking mouth; bottom-left rounded 'oh' lips; bottom-middle slightly wide 'ee' speaking mouth with subtle upper teeth; bottom-right the same neutral closed-lip expression with both eyes naturally closed for a blink. Keep speaking mouths tasteful and subtle, no exaggerated cartoon surprise. Precise tile alignment is essential for smooth switching, same silhouette and head centre in all six cells. Restrained premium academy styling, natural soft studio light, no accessories beyond the suit and tie, no props, no logos, no watermark text.

## Verification and remaining access

The production build and scoped ESLint passed. Eight targeted browser checks passed for speech-driven animation, pause/resume/end, stale callbacks, cleanup, 320-pixel layout and reduced motion. Sixteen existing mocked voice checks also passed. The full public guide suite passed its 16 route/viewport combinations, keyboard access, grounded answers, reset/privacy, private-page suppression and all 13 MBA entry links. These voice tests used mocked speech services; they do not establish real microphone accuracy, founder pronunciation or personal voice quality.

Actual native-media checks passed in installed Chrome (MP4 H.264/AAC) and bundled Chromium (WebM VP9/Opus fallback): opt-in controls, decoded playback, all nine default caption cues, finite 34.76-second duration, seeking/end, close/pause/reset, both-source failure feedback, a pointer-operable close button at 320 × 600, transcript/caption endpoints, free-course links and the donation image. No browser errors or HTTP writes occurred. FFmpeg independently decoded the MP4 and found a nonsilent AAC audio track. Sample video frames were visually reviewed. This establishes local playback and media content, not human verification of the stock voice's pronunciation. The browser checks mute playback and never use a real microphone.

Re-run `node scripts/test-digital-guide-video.mjs` against a local production preview. Set `GUIDE_TEST_BROWSER_CHANNEL=chrome` to check an installed Chrome's H.264 path. Optional `GUIDE_TEST_BASE_URL` and `GUIDE_TEST_PROFILE` select the deployed origin and artifact prefix. Results and screenshots are ignored under `artifacts/learning-lab/digital-avatar-build`.

Owner-controlled avatar-provider access is still required for a trained conversational video replica. HeyGen was offered as an available connection but was not connected in this session. Tavus and 1mind adapters remain disabled pending the owner's approved deployment and private configuration. See [the provider handover](digital-avatar-provider.md) and [personal-voice recording brief](digital-avatar-recording-brief.md).

Persistent production enquiries and learner/admin accounts are a separate access-dependent item. A tested, read-only-by-default [activation helper and guide](learning-lab/activation.md) are supplied. No owner Vercel session or hosted libSQL credentials were available, so real production activation, account access and learner workflows are not claimed as completed. The six free courses, approved email route and voluntary donation QR remain independent of that setup.
