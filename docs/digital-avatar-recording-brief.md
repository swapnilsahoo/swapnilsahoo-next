# Create Swapnil’s speaking audio/video avatar

Updated 9 October 2026. The small floating popup now contains an AI-created animated likeness of Swapnil, optional browser voice questions and spoken prepared answers, and a prerecorded speaking welcome video with captions and a transcript. The welcome uses a stock synthetic voice. No cloned founder voice or trained live conversational video replica is connected. See [the creation handover](digital-avatar-created.md) for the delivered assets and tests.

The remaining target is a trained conversational replica with Swapnil’s own voice and synchronised video. Recording is only necessary for that personal voice/face training; it is not required to use the animated guide already created. Once an approved provider is connected, the popup opens in video mode and waits for the visitor to start.

## Recommended creation path

Use a fresh recording to create the face and voice together. Tavus’s current [video training guide](https://docs.tavus.io/sections/faces/phoenix-45-video-requirements) says Phoenix-4.5 creates the default voice from the video audio. This matches the requested personal audio/video avatar. The website already contains a disabled Tavus conversation adapter and a separate 1mind embed option.

The existing website portrait is 480 × 321 pixels. It supplied the identity reference for the generated likeness, but falls below Tavus’s [512 × 512 photo-training minimum](https://docs.tavus.io/sections/faces/phoenix-45-image-requirements). The current [Create Face API](https://docs.tavus.io/api-reference/faces/create-face) offers `auto_fix_training_image` for preparation; this is a provider option, not a guarantee that the existing photograph will train well. A higher-resolution original remains preferable. A photo-based avatar also needs an attached stock or trained voice; a photograph cannot supply Swapnil’s own voice. Preview any result before enabling it.

## One recording to prepare

Record one continuous 60-second clip: speak naturally for 30 seconds, then remain facing the camera quietly for 30 seconds with lips closed. Use a stable, eye-level camera with head, shoulders and upper chest visible, even lighting and clear audio. Avoid gestures and sudden movements. Capture at least 1080p/25 FPS, preferably with a desktop recording app. The provider accepts MP4 (H.264/AAC) or WebM; the current maximum is 750 MB. These requirements come from the linked video guide and should be rechecked at upload.

Original speaking script, approximately 30 seconds at a conversational pace:

> Hello, I’m Swapnil Sahoo. I teach strategy and entrepreneurship, and I explore how artificial intelligence can support management learning. A useful lesson begins with a clear question. We examine the evidence, make a decision and explain the trade-off. Then we test what we assumed and improve the next attempt. My Learning Lab helps people practise these skills through short lessons and realistic business problems.

Read in your normal voice. If you finish early, continue naturally on the same topic until 30 seconds; then keep still and silent for 30 seconds. Watch the clip and listen before accepting it. Avoid other people, background music and confidential information. Complete any identity or likeness/voice verification shown by the provider yourself; this sample is not a substitute for provider verification or a consent recording.

## First generated avatar message

Original script for the generated avatar, after the real face/voice has been trained and approved:

> Hello. I’m Swapnil’s AI learning guide, a digital avatar rather than Swapnil speaking live. What would you like to practise today: using AI, making a strategic choice, or testing a business idea? You can start with a free lesson, work through a decision and keep your worksheet. Ask me to help you find a starting point.

Keep the visible AI label throughout the conversation. The guide’s job is course orientation and brief learning practice. Human teaching, assessments, certificate decisions and personal replies remain with Swapnil.

## Inputs still required

1. The local path to the new speaking/listening recording, or a higher-resolution headshot if a stock voice is acceptable initially.
2. An owner-controlled avatar provider account with custom-face/voice creation available. The user has confirmed there is currently no 1mind deployment. Tavus custom Faces require an eligible plan; confirm the actual account offering and cost before authorising training. No plan was purchased.
3. Owner-completed provider verification and privately configured credentials. Do not paste secrets into chat or commit them. Upload training footage through the provider’s private account or use a short-lived authorised download URL; do not put it in this repository’s public assets.

After training: preview the face, voice, name pronunciation and lip synchronisation; review the course knowledge and AI identity; connect the resulting Face/PAL or 1mind deployment; test microphone start/end, mobile layout and actual provider limits; then enable live video. Account setup, paid training and real audiovisual verification have not occurred.

See [the implementation handover](digital-avatar-provider.md) for environment settings and the distinction between tested website behaviour and untested provider behaviour.
