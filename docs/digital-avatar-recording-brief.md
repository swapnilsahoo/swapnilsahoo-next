# Create Swapnil’s speaking audio/video avatar

Updated 10 October 2026. The small floating Dr. Swapnil Sahoo AI Mentor popup contains an AI-created animated likeness, optional browser voice questions and spoken prepared answers, and a prerecorded speaking welcome video with captions and a transcript. It also offers prepared learning-path suggestions, explanations, progressive unit-economics practice and a reasoning self-check. The welcome uses a stock synthetic voice. No cloned founder voice or trained live conversational video replica is connected. See [the creation handover](digital-avatar-created.md) for the delivered assets and [the lesson-aware mentor handover](learning-lab/mentor-and-catalogue.md) for the new teaching behaviour.

The remaining target is a trained conversational replica with Swapnil’s own voice and synchronised video. Recording is only necessary for that personal voice/face training; it is not required to use the animated guide already created. Once an approved provider is connected, the popup opens in video mode and waits for the visitor to start.

The owner confirmed on 10 October that the Tavus account is created but the personal avatar is not trained. One recent Camera Roll recording was supplied and reviewed locally, as described below. Production environment metadata now shows a sensitive, write-only `TAVUS_API_KEY` secret; its value, validity, account quota and API operation have not been verified. `TAVUS_FACE_ID` and `TAVUS_PAL_ID` are absent, so live video remains disabled. The owner's plan selection and custom-training eligibility are still unconfirmed. Turso's production connection was verified separately; database readiness does not create a face or voice.

## Recommended creation path

Use a fresh recording to create the face and voice together. Tavus’s current [video training guide](https://docs.tavus.io/sections/faces/phoenix-45-video-requirements) says Phoenix-4.5 creates the default voice from the video audio. This matches the requested personal audio/video avatar. The website already contains a disabled Tavus conversation adapter and a separate 1mind embed option.

The existing website portrait is 480 × 321 pixels. It supplied the identity reference for the generated likeness, but falls below Tavus’s [512 × 512 photo-training minimum](https://docs.tavus.io/sections/faces/phoenix-45-image-requirements). The current [Create Face API](https://docs.tavus.io/api-reference/faces/create-face) offers `auto_fix_training_image` for preparation; this is a provider option, not a guarantee that the existing photograph will train well. A higher-resolution original remains preferable. A photo-based avatar also needs an attached stock or trained voice; a photograph cannot supply Swapnil’s own voice. Preview any result before enabling it.

## Local recording review — 10 October 2026

The supplied `WIN_20261010_21_06_38_Pro.mp4` was inspected locally without upload, trimming or modification. It is 91.54 seconds and 130.9 MB, with 1920 × 1080 H.264 video and AAC-LC stereo audio at 48 kHz. These container, codec, resolution and size properties fit the recording brief.

The capture uses variable frame timing: approximately 14.92 FPS for the first 36.2 seconds, 14.93 FPS for the following 30.6-second quiet section, and 29.35 FPS for the final 24.7 seconds. The overall average is 18.82 FPS. Audio signal analysis finds an active section around 2.28–36.22 seconds followed by quiet around 36.22–66.83 seconds; this does not establish speech intelligibility, personal voice quality or lip synchronisation.

Sparse frames show a low camera angle and soft, uneven lighting in the first section. During the audio-quiet window, one frame shows a tooth-showing smile and another shows a strong sideways turn with changed camera framing. The review therefore did not establish a stable, front-facing, closed-lip 30-second listening segment. The near-30 FPS final section is too short for the complete speaking/listening recording. Private diagnostic stills and logs remain in an ignored directory with owner-only access; no raw footage or location metadata is published.

Use a fresh recording for personal training. Trimming this clip or exporting it at 25 FPS would not restore genuinely captured frames or correct the quiet-section posture and camera change. Provider acceptance remains unverified; this review does not claim the clip is training-ready.

## One fresh recording to prepare

Record one uninterrupted 60-second clip: speak naturally for 30 seconds, then remain front-facing and still for 30 seconds with lips closed. Use a stable, eye-level camera with head, shoulders and upper chest visible, even lighting and clear audio. Keep the same camera position throughout; avoid gestures, turning away and sudden movements. Capture at least 1080p and genuinely recorded 25 FPS, preferably with a desktop recording app. Check the saved file's actual frame rate rather than relying on the selected camera setting. The provider accepts MP4 (H.264/AAC) or WebM; the current maximum is 750 MB. These requirements come from the linked video guide and should be rechecked at upload.

Original speaking script, approximately 30 seconds at a conversational pace:

> Hello, I’m Swapnil Sahoo. I teach strategy and entrepreneurship, and I explore how artificial intelligence can support management learning. A useful lesson begins with a clear question. We examine the evidence, make a decision and explain the trade-off. Then we test what we assumed and improve the next attempt. My Learning Lab helps people practise these skills through short lessons and realistic business problems.

Read in your normal voice. If you finish early, continue naturally on the same topic until 30 seconds; then keep still and silent for 30 seconds. Watch the clip and listen before accepting it. Avoid other people, background music and confidential information. Complete any identity or likeness/voice verification shown by the provider yourself; this sample is not a substitute for provider verification or a consent recording.

## First generated avatar message

Original script for the generated avatar, after the real face/voice has been trained and approved:

> Hello. I’m an AI learning mentor based on Dr. Swapnil Sahoo’s teaching materials, rather than Swapnil speaking live. Would you like to find a learning path, understand a concept, practise a case or review your reasoning? Start with a free lesson, try a decision and ask for a hint when you need one.

Keep the visible AI label throughout the conversation. The guide’s job is course orientation and brief learning practice. Human teaching, assessments, certificate decisions and personal replies remain with Swapnil.

## Inputs still required

1. A fresh qualifying speaking/listening recording, supplied privately. The recording already reviewed does not establish the required capture rate and stable listening posture. A higher-resolution headshot remains an option if a separately attached stock voice is acceptable initially.
2. Confirmed custom-face/voice training eligibility and the owner's actual plan choice. The Tavus account exists; its plan, cost and quota have not been verified. The user has confirmed there is currently no 1mind deployment. No plan was purchased by this build.
3. Owner-completed provider verification, a reviewed trained Face and live PAL, and privately configured Face/PAL IDs and session settings. Production metadata shows the API-key secret exists, but that alone does not validate it or authorise a connected state. Do not paste secrets into chat or commit them. Upload approved training footage through the provider’s private account or use a short-lived authorised download URL; do not put it in this repository’s public assets.

After training: preview the face, voice, name pronunciation and lip synchronisation; review the course knowledge and AI identity; connect the resulting Face/PAL or 1mind deployment; test microphone start/end, mobile layout and actual provider limits; then enable live video. The owner created the account, but personal training, provider API readiness, paid eligibility and real audiovisual verification remain incomplete.

See [the implementation handover](digital-avatar-provider.md) for environment settings and the distinction between tested website behaviour and untested provider behaviour.
