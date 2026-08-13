import type {
  AffirmationCategory,
  AssessmentItem,
  CriticalRule,
  DeepDiveSection,
  Milestone,
  ReferenceGroup,
  ScheduleRow,
  WeekPhase,
} from "@/features/wellbeing/types";

export const crisisResources = [
  { region: "India", contact: "iCall — 9152987821" },
  { region: "United States", contact: "988 Suicide & Crisis Lifeline, or 1-800-799-7233" },
  { region: "Anywhere", contact: "findahelpline.com" },
] as const;

export const seekHelpCriteria = [
  "After four weeks of consistently doing the practices, your anxiety hasn't dropped by at least 20%.",
  "You're experiencing persistent, severe low mood — hopelessness, loss of all pleasure, or trouble functioning at work or daily life.",
  "You have thoughts of harming yourself or someone else. If this is true right now, please contact a crisis line immediately — see the numbers above.",
  "The pattern looks rooted in childhood trauma or abuse — trauma-specific approaches (EMDR, somatic therapy) will likely be needed alongside self-directed work.",
  "You keep hitting the same relationship difficulty across different relationships, with no improvement over time.",
  "You're using substances, self-harm, or other self-destructive behaviour to manage the pain.",
] as const;

export const professionalModalities = [
  { name: "CBT or Schema Therapy", use: "For deeply ingrained beliefs about yourself and others." },
  { name: "EMDR", use: "For attachment-related trauma." },
  { name: "Emotionally Focused Therapy (EFT)", use: "Built specifically for attachment patterns." },
  { name: "Somatic Experiencing", use: "For trauma that's stored in the body, not just the story." },
  { name: "DBT skills group", use: "Structured training in all four DBT skill areas." },
] as const;

export const assessmentItems: AssessmentItem[] = [
  { id: "intrusive-thoughts", prompt: "Intrusive thoughts about them, on an average hour" },
  { id: "urge-to-contact", prompt: "The urge to reach out to them" },
  { id: "fear-moving-on", prompt: "Anxiety about them moving on with someone else" },
  { id: "physical-symptoms", prompt: "Physical symptoms — chest tightness, restlessness, trouble breathing" },
  { id: "sleep-disruption", prompt: "Sleep disrupted by thoughts about them" },
  { id: "concentration", prompt: "Trouble concentrating on work or tasks" },
  { id: "pleasure", prompt: "Difficulty feeling pleasure in things you used to enjoy" },
  { id: "uncertainty-tolerance", prompt: "Difficulty tolerating uncertainty about the future" },
  { id: "self-worth", prompt: "Sense that your worth depends on them" },
  { id: "checking", prompt: "How often you check their social media" },
  { id: "distress", prompt: "Overall emotional distress" },
  { id: "identity-loss", prompt: "Sense that your identity and meaning depend on this relationship" },
] as const;

export const weekPhases: WeekPhase[] = [
  {
    slug: "weeks-1-2",
    weeks: "Weeks 1–2",
    title: "Regulate your nervous system",
    goal: "Move from fight-or-flight to a baseline where the rest of the work is even possible.",
    rationale:
      "When you're in acute anxiety — checking your phone, replaying conversations, the urge to text — your prefrontal cortex is measurably impaired by stress hormones. Trying to “think your way out” of that state first is like debugging code while the fire alarm is going off. These two weeks lower the alarm so the later, more cognitive work can actually land.",
    practices: [
      {
        slug: "morning-vagal-activation",
        number: "01",
        title: "Morning Vagal Activation",
        framework: "Polyvagal theory · breathing research",
        why: "The vagus nerve is the body's main brake pedal. A slow, extended exhale stimulates it directly, and doing this before you touch your phone means you're not starting the day already flooded.",
        evidence:
          "Breathing at roughly 6 breaths a minute — close to the 4-4-6 count below — reliably raises heart-rate variability, a solid marker of how well you recover from stress (Lehrer & Gevirtz, 2014).",
        steps: [
          { step: "1", action: "Get into position", detail: "Sit or lie down. Eyes closed or a soft gaze down. Phone timer for 10 minutes, phone face-down in another room if you can manage it.", duration: "1 min" },
          { step: "2", action: "Hand on heart", detail: "Dominant hand on your chest, other hand on top. Just feel the warmth of your own hand for a moment.", duration: "30 sec" },
          { step: "3", action: "Extended-exhale breathing", detail: "Inhale through the nose for 4 counts. Hold for 4. Exhale through the mouth — slow, like fogging a mirror — for 6 counts.", duration: "5 min" },
          { step: "4", action: "A short phrase, timed to the breath", detail: "Inhale: “My safety.” Hold: “comes from.” Exhale: “inside me.”", duration: "2 min" },
          { step: "5", action: "Arrive in the body", detail: "Last few breaths: just notice your weight, the air temperature, your heartbeat under your hand.", duration: "1.5 min" },
          { step: "6", action: "One intention", detail: "Before opening your eyes, name one thing you'll do today for your own recovery.", duration: "30 sec" },
        ],
      },
      {
        slug: "body-scan",
        number: "02",
        title: "The Body Scan",
        framework: "Mindfulness-based stress reduction",
        why: "This isn't about relaxing — relaxation is a side effect. It's about training the skill of noticing what's happening in your body without immediately reacting to it, which is the foundation every other practice here builds on.",
        steps: [
          { step: "1", action: "Setup", detail: "Right after your breathing practice. Eyes closed. Lying down is fine.", duration: "30 sec" },
          { step: "2", action: "Scalp & forehead", detail: "Notice tension or temperature. Don't change anything, just notice.", duration: "30 sec" },
          { step: "3", action: "Jaw, mouth, throat", detail: "Clenched teeth? Tongue pressed to the roof of the mouth? Let the jaw float open slightly.", duration: "30 sec" },
          { step: "4", action: "Neck & shoulders", detail: "Shoulders creeping toward your ears? Let them drop, even a millimetre.", duration: "30 sec" },
          { step: "5", action: "Chest & heart", detail: "Notice any tightness or ache here. If it's there, name it kindly: “This is grief. It's allowed.”", duration: "45 sec" },
          { step: "6", action: "Solar plexus & belly", detail: "This area is densely wired to your gut-brain connection and picks up attachment anxiety fast. Notice, breathe into it.", duration: "30 sec" },
          { step: "7", action: "Lower back & hips", detail: "Feel the contact with the chair or floor. Feel the weight.", duration: "30 sec" },
          { step: "8", action: "Legs & feet", detail: "Move through thighs, knees, calves, feet. Feet on the ground is one of the simplest ways to feel grounded.", duration: "30 sec" },
          { step: "9", action: "Whole body", detail: "Three final breaths, feeling the body as one connected thing rather than separate parts.", duration: "30 sec" },
        ],
      },
      {
        slug: "opposite-action",
        number: "03",
        title: "Opposite Action, for the urge to contact",
        framework: "DBT emotion regulation",
        why: "Every urge has a job it's trying to do. The urge to text, check, or call is trying to lower anxiety fast — and it works, for about ten minutes, which is exactly the problem: it reinforces the loop. Doing something physically incompatible with the urge breaks the loop instead.",
        evidence:
          "A single bout of vigorous exercise reduces anxiety about as much as a fast-acting anti-anxiety medication, without the come-down (Stubbs et al., 2017).",
        steps: [
          { step: "1", action: "Name the urge", detail: "“There's the urge to text.” Naming it — out loud or in your head — measurably lowers the intensity.", duration: "30 sec" },
          { step: "2", action: "Rate it, 0–10", detail: "Write the number down. You're building a track record that urges pass.", duration: "15 sec" },
          { step: "3", action: "Get away from the phone", detail: "Another room, another person, a locked drawer. Don't rely on willpower when a five-second structural fix is available.", duration: "1 min" },
          { step: "4", action: "Move, hard, for 15–20 minutes", detail: "Fast walk, push-ups, a run — enough to be out of breath. This is what actually metabolises the stress chemicals fuelling the urge.", duration: "15–20 min" },
          { step: "5", action: "Rate it again", detail: "Write the new number next to the old one. That gap is evidence.", duration: "2 min" },
          { step: "6", action: "One sentence", detail: "“By not acting on this, I chose ___ over anxiety.”", duration: "2 min" },
        ],
      },
      {
        slug: "thought-record",
        number: "04",
        title: "The Evening Thought Record",
        framework: "Cognitive behavioural therapy",
        why: "This is the core CBT skill: catching the automatic, distorted thought behind the worst moment of your day and testing it against the actual evidence, rather than accepting it as fact.",
        steps: [
          { step: "1", action: "Situation", detail: "Only what a camera would have recorded. “They didn't reply to my morning message,” not “they ignored me.”", duration: "1 min" },
          { step: "2", action: "Emotions, rated", detail: "List each one with a percentage: Anxious 85%, Sad 70%, Ashamed 40%.", duration: "1 min" },
          { step: "3", action: "The hot thought", detail: "The single most distressing interpretation, written exactly as it occurred to you.", duration: "1 min" },
          { step: "4", action: "Evidence for it", detail: "Only facts you could defend in court. Not feelings.", duration: "2 min" },
          { step: "5", action: "Evidence against it", detail: "The pivotal column. Times this thought was proven wrong, other explanations, things you're leaving out.", duration: "3 min" },
          { step: "6", action: "Name the distortion", detail: "Mind-reading? Catastrophising? All-or-nothing? Naming it strips it of authority.", duration: "1 min" },
          { step: "7", action: "A balanced thought", detail: "Must use both columns above. It just needs to be 40% believable — not cheerful, accurate.", duration: "2 min" },
          { step: "8", action: "Re-rate", detail: "Rate the same emotions again. The drop is the proof this works.", duration: "1 min" },
        ],
      },
    ],
  },
  {
    slug: "weeks-3-4",
    weeks: "Weeks 3–4",
    title: "Understand your pattern",
    goal: "See the shape of what's actually driving this — not just this relationship, but the deeper architecture.",
    rationale:
      "By now your baseline is calmer, so you can look at the pattern without being swept away by it. This is where you find out what this relationship was actually carrying for you — and start building those things elsewhere, deliberately.",
    practices: [
      {
        slug: "values-clarification",
        number: "05",
        title: "Values Clarification",
        framework: "Acceptance & commitment therapy",
        why: "Anxious attachment makes someone else's mood the centre of your world, and your own interests quietly shrink. If you can't easily answer “who am I when no one is validating me,” this is why.",
        evidence: "Connecting to your own values under stress measurably lowers cortisol reactivity (Creswell et al., 2005) — it's not a motivational exercise, it's a physiological one.",
        steps: [
          { step: "1", action: "Circle what resonates", detail: "From a long list — courage, creativity, family, integrity, growth, service, and so on — circle everything that feels like you. Go fast, first instinct.", duration: "5 min" },
          { step: "2", action: "Narrow to five", detail: "For each: “This matters to me because ___. When I live it, I feel ___. When I don't, I notice ___.”", duration: "10 min" },
          { step: "3", action: "Rate the gap", detail: "For each value: how important (0–10), and how fully are you actually living it (0–10)? The gap is where energy needs to go.", duration: "5 min" },
          { step: "4", action: "Morning values question", detail: "“What's one concrete action today that moves me toward my values, regardless of what they do or don't do?”", duration: "3 min" },
          { step: "5", action: "Evening review", detail: "“Did I take that action? What did I notice? How did it feel to act from values instead of anxiety?”", duration: "3 min" },
        ],
      },
      {
        slug: "needs-audit",
        number: "06",
        title: "The Needs Audit",
        framework: "Attachment theory · self-determination theory",
        why: "When one person becomes your entire source of security, worth, identity, company, and validation, losing them costs you all five at once. This maps which needs were bottlenecked in them, so you can start spreading the load.",
        steps: [
          { step: "Security", action: "How it shows up", detail: "Terror of uncertainty without them. Fix: daily routine, exercise, two or three close friendships, financial independence.", duration: "Ongoing" },
          { step: "Worthiness", action: "How it shows up", detail: "Feel valuable only with their approval. Fix: track your own accomplishments daily; get feedback from more than one person.", duration: "Ongoing" },
          { step: "Identity", action: "How it shows up", detail: "Lost sense of who you are outside the relationship. Fix: solo hobbies, time alone on purpose, reconnect with friends who knew you before.", duration: "Ongoing" },
          { step: "Fear of abandonment", action: "How it shows up", detail: "Expecting everyone you love to eventually leave. Fix: this one often needs a therapist alongside self-work — attachment-based therapy or EMDR.", duration: "Ongoing" },
          { step: "Fear of being alone", action: "How it shows up", detail: "Can't self-soothe without someone present. Fix: graduated solitude — 30-minute solo outings building up to solo travel.", duration: "Ongoing" },
          { step: "Connection", action: "How it shows up", detail: "Grieving the intimacy they specifically gave you. Fix: deliberately deepen two or three existing friendships.", duration: "Ongoing" },
        ],
      },
    ],
  },
  {
    slug: "weeks-5-6",
    weeks: "Weeks 5–6",
    title: "Build your tolerance for the spikes",
    goal: "Get through the acute waves — panic, longing, despair — without acting on them.",
    rationale:
      "You're regulated and you understand the pattern, but the spikes still come. That's not a sign the program isn't working; it's a normal part of grief. These weeks give you tools built specifically for the moment intensity peaks.",
    practices: [
      {
        slug: "tipp",
        number: "07",
        title: "TIPP, for when anxiety hits 7 or higher",
        framework: "DBT distress tolerance",
        why: "TIPP works at the physiological level, which matters because at this intensity your thinking brain is partly offline — cognitive techniques alone won't reach you yet.",
        steps: [
          { step: "T", action: "Temperature", detail: "Cold water on the face, or ice against cheeks and forehead, for 30 seconds. Triggers the dive reflex — heart rate drops fast. (Skip if you have a cardiac condition; check with your doctor first.)", duration: "30 sec" },
          { step: "I", action: "Intense exercise", detail: "60–90 seconds as hard as you can go — burpees, sprinting, jumping jacks — then 10–15 minutes moderate.", duration: "10–15 min" },
          { step: "P", action: "Paced breathing", detail: "4 in, 4 hold, 4 out, 4 hold — or 4 in, 6 out for a stronger calming effect.", duration: "5 min" },
          { step: "P", action: "Paired muscle relaxation", detail: "Tense every muscle at once for 5 seconds, then release completely for 10. Repeat 5–7 times.", duration: "5–7 cycles" },
        ],
      },
      {
        slug: "rain",
        number: "08",
        title: "RAIN, for processing the feeling itself",
        framework: "Mindfulness · self-compassion research",
        why: "RAIN isn't about feeling better — it's about getting better at feeling. Fighting an emotion usually makes it louder; RAIN lets it move through instead of getting stuck.",
        steps: [
          { step: "R", action: "Recognize", detail: "Name it precisely: “This is acute longing.” “This is the old fear of not being enough, again.” Naming activates the part of the brain that calms the amygdala down.", duration: "2 min" },
          { step: "A", action: "Allow", detail: "“This is allowed to be here. I don't have to fix it right now.” You're not agreeing the situation is fine — you're just not fighting the feeling.", duration: "2 min" },
          { step: "I", action: "Investigate", detail: "Where in your body? What quality — tight, hollow, sharp? What does this feeling believe about you?", duration: "3 min" },
          { step: "N", action: "Nurture", detail: "Hand on chest. Speak to yourself the way you'd speak to a close friend in real pain.", duration: "3 min" },
        ],
      },
    ],
  },
  {
    slug: "weeks-7-8",
    weeks: "Weeks 7–8",
    title: "Build the secure self",
    goal: "Take real action toward the person you're becoming — not once you feel ready, but now.",
    rationale:
      "You now have the internal resources — a regulated nervous system, self-understanding, and tolerance for hard feelings — to do the deepest work: building an identity and a life that need this pattern less.",
    practices: [
      {
        slug: "committed-action",
        number: "09",
        title: "Committed Action Planning",
        framework: "Acceptance & commitment therapy",
        why: "You don't have to resolve the pain before you act. You can feel grief and still take a values-aligned step — the action itself is what generates evidence of your own capacity, which is what actually shifts the underlying belief.",
        steps: [
          { step: "1", action: "Define your compass", detail: "“In five years, looking back at how I navigated this, what do I want to be true?”", duration: "10 min" },
          { step: "2", action: "Write an identity statement", detail: "“I am the kind of person who ___, even when it's difficult” — using your top three values.", duration: "5 min" },
          { step: "3", action: "Schedule three actions weekly", detail: "One physical, one creative or intellectual, one social. Day, time, and place — vague intentions don't happen.", duration: "5 min" },
          { step: "4", action: "Before/after emotional record", detail: "Rate your state before and after each action. This is the evidence that action changes your internal state.", duration: "5 min per activity" },
        ],
      },
      {
        slug: "grief-journaling",
        number: "10",
        title: "Grief Journaling",
        framework: "Expressive writing research",
        why: "Rumination replays the story and increases anxiety. Grief journaling gives it a container — structured, time-bound, and completion-oriented — so the loss gets processed rather than looped.",
        evidence: "Structured expressive writing, three to four times a week, produces sustained drops in anxiety and rumination across dozens of controlled trials (Pennebaker, 1997).",
        steps: [
          { step: "1", action: "Set a container", detail: "20–25 minutes, timer on. Outside this window, when rumination shows up: “I have time set aside for this — not now.”", duration: "1 min" },
          { step: "2", action: "Open honestly", detail: "“Right now, what's most present for me is...” — write without editing.", duration: "3 min" },
          { step: "3", action: "Use a deep prompt", detail: "“What I'm grieving that isn't just them is...” / “What this is teaching me about what I need is...”", duration: "15 min" },
          { step: "4", action: "The unsent letter (alternate sessions)", detail: "Say everything — love, anger, gratitude, regret. You'll never send it; the point is complete expression.", duration: "20 min" },
          { step: "5", action: "Close with self-compassion", detail: "“I was willing to feel this today. That takes courage.” Then do something grounding — tea, a short walk.", duration: "2 min" },
        ],
      },
    ],
  },
];

export const criticalRules: CriticalRule[] = [
  {
    title: "No contact, minimum 90 days",
    summary: "The single biggest lever in this whole program.",
    detail:
      "Even a brief, friendly message re-activates the craving circuit at close to full intensity — it's the same as giving someone recovering from a substance a small dose every few days “to stay friends” with it.",
    actions: [
      "Mute or block on every platform — this isn't a verdict on their character, it's neurological self-protection.",
      "Tell one trusted person about the 90-day commitment and ask them to be available when urges spike.",
      "If circumstances force contact: keep it brief and prepare what you'll say in advance.",
      "If you break it: don't catastrophise. Acknowledge it, note the trigger, and recommit.",
    ],
  },
  {
    title: "Daily movement, no exceptions",
    summary: "A stronger anxiety intervention than most people expect.",
    detail:
      "Exercise raises BDNF, burns off cortisol and adrenaline, and produces natural anxiolytics — mechanisms that are directly relevant to recovering from this specific kind of anxiety, not just “good for you” in general.",
    actions: [
      "Minimum: 20 minutes that raises your heart rate. Walking counts.",
      "Better: 30–45 minutes, 5–7 days a week.",
      "Outdoors adds circadian and nervous-system benefits indoor exercise doesn't.",
    ],
  },
  {
    title: "Diversify where meaning comes from",
    summary: "No affirmation carries the weight that lived experience does.",
    detail:
      "Your nervous system won't believe your life has value independent of this relationship until you give it evidence — through action, not through repeating a nicer thought.",
    actions: [
      "One physical activity a week that's entirely yours.",
      "One creative or intellectual one.",
      "One social one — with people who aren't them.",
    ],
  },
];

export const dailySchedule: ScheduleRow[] = [
  { time: "6:00 AM, before your phone", practice: "Vagal breathing: hand on heart, 4-4-6 breath", why: "Calms the nervous system before any stimulus reaches it", duration: "10 min" },
  { time: "6:10 AM", practice: "Body scan", why: "Builds the skill of noticing without reacting", duration: "5 min" },
  { time: "6:15 AM", practice: "Values + today's action", why: "Anchors the day in meaning, not anxiety", duration: "5 min" },
  { time: "Morning", practice: "One thought record", why: "Catches and rewires one distorted thought", duration: "10 min" },
  { time: "When an urge hits", practice: "Opposite Action", why: "Breaks the contact-seeking loop", duration: "15–20 min" },
  { time: "When a spike hits", practice: "TIPP", why: "Emergency regulation above 7/10", duration: "5–15 min" },
  { time: "Afternoon", practice: "RAIN, as needed", why: "Processes emotion without suppressing it", duration: "10 min" },
  { time: "Evening", practice: "One values-aligned activity", why: "Builds evidence of a life beyond this", duration: "30 min" },
  { time: "Evening, 3–4×/week", practice: "Grief journaling", why: "Processes loss instead of looping it", duration: "20–25 min" },
  { time: "Weekly, Sunday", practice: "Full review", why: "Keeps momentum, adjusts the plan", duration: "20 min" },
] as const;

export const milestones: Milestone[] = [
  { weeks: "Wk 1–2", expectedShifts: "Acute panic eases slightly. Urges still strong (7–9/10) but you have tools.", focus: "Morning breathing + body scan + Opposite Action", marker: "You complete the morning routine at least 5 of 7 days.", watchFor: "Urges stay at 10/10 with no movement at all — worth a professional check-in." },
  { weeks: "Wk 3–4", expectedShifts: "Urges down to 5–7/10. You can name your pattern and at least two unmet needs.", focus: "Values + Needs Audit + Thought Records", marker: "Thought records show some emotional drop after restructuring.", watchFor: "No shift at all — check whether no-contact is genuinely being kept." },
  { weeks: "Wk 5–6", expectedShifts: "Urges 3–5/10 most days. TIPP is working reliably. Real windows of absorption in other things.", focus: "RAIN + TIPP + Grief Journaling", marker: "You can sit with a hard feeling for 5+ minutes without acting on it.", watchFor: "Depression — not grief — deepening. Speak with a professional." },
  { weeks: "Wk 7–8", expectedShifts: "Urges 1–3/10 most days. Committed actions feel genuinely satisfying.", focus: "Committed Action + Integration", marker: "Moments of real contentment that don't depend on them.", watchFor: "Rushing into a new relationship to avoid finishing this work." },
  { weeks: "Post-8", expectedShifts: "Anxious behaviours measurably reduced. Capacity for earned security emerging.", focus: "Maintenance: 20 min/day minimum", marker: "Re-rate your original triggers against your week-1 baseline.", watchFor: "The “I'm healed” trap — keep a maintenance practice even after symptoms ease." },
];

export const affirmationCategories: AffirmationCategory[] = [
  {
    slug: "safety",
    title: "Safety & nervous system",
    useWhen: "During morning breathing",
    affirmations: [
      "My body is safe right now, in this moment.",
      "My safety does not depend on their response.",
      "I am the source of my own calm.",
      "Right now, I am breathing. Right now, I am whole.",
      "My nervous system is learning to regulate itself.",
      "I can feel discomfort and still be okay.",
      "This wave of feeling will pass. It always does.",
    ],
  },
  {
    slug: "releasing",
    title: "Releasing the attachment",
    useWhen: "When the urge to contact hits",
    affirmations: [
      "I breathe in stability. I breathe out what I cannot control.",
      "I release what I cannot hold.",
      "Contacting them will not heal me. Only I can heal me.",
      "The urge I feel is a signal, not a command.",
      "I choose my recovery over the temporary relief of contact.",
      "They are living their life. I am reclaiming mine.",
      "Every moment I don't reach out, I am healing.",
    ],
  },
  {
    slug: "self-worth",
    title: "Self-worth & identity",
    useWhen: "When shame or “not enough” shows up",
    affirmations: [
      "I am worthy of love that doesn't require me to beg for it.",
      "My value does not decrease because they couldn't see it.",
      "I am enough, exactly as I am, right now.",
      "I am not too much. I am precisely enough for the right connection.",
      "I bring genuine value to every relationship I enter.",
      "My past does not determine my worth. My choices today do.",
      "I am learning to love myself the way I've tried to love others.",
    ],
  },
  {
    slug: "grief",
    title: "Grief & loss",
    useWhen: "During journaling, or when sadness rises",
    affirmations: [
      "I am allowed to grieve what was real and beautiful.",
      "My grief is the measure of my love. I honour both.",
      "I don't have to understand everything right now.",
      "I release them from the role of completing me. I am already complete.",
      "This pain is not permanent. I have outlasted every hard feeling before.",
      "I grieve what was. I remain open to what will be.",
    ],
  },
  {
    slug: "growth",
    title: "Building the future",
    useWhen: "Weekly review, or when you need direction",
    affirmations: [
      "I choose to act from my values, not from my fear.",
      "Every day I invest in myself, I'm becoming someone I'm proud of.",
      "My anxious attachment is not who I am — it's a pattern I'm changing.",
      "I attract healthier love as I become healthier myself.",
      "I'm learning to sit with myself and find that I'm good company.",
      "I am not waiting to be chosen. I am choosing myself, every day.",
    ],
  },
];

export const quickReferenceCard = [
  { category: "Safety", moment: "Breathing practice", line: "My safety does not depend on their response. Right now, I am breathing. Right now, I am whole." },
  { category: "Releasing", moment: "When the urge to contact hits", line: "The urge I feel is a signal, not a command. Every moment I don't contact them, I am healing." },
  { category: "Self-worth", moment: "When “not enough” activates", line: "I am enough, exactly as I am, right now. My value does not decrease because they couldn't see it." },
  { category: "Grief", moment: "When sadness and longing arise", line: "My grief is the measure of my love. I honour both. This pain is not permanent." },
  { category: "Growth", moment: "Daily identity and direction", line: "I am not waiting to be chosen. I am choosing myself, every day." },
] as const;

export const deepDives: DeepDiveSection[] = [
  {
    slug: "trauma-bonding",
    eyebrow: "When it isn't just heartbreak",
    title: "Trauma bonding: when you can't let go of someone who hurts you",
    summary:
      "A specific, well-documented pattern — not weakness, not poor judgment. If any of this describes your situation, the practices above still apply, but they aren't enough on their own.",
    body: [
      {
        kind: "callout",
        tone: "warning",
        text: "If your situation involves physical harm, threats, or controlling behaviour, or you feel unsafe, contact a domestic violence resource in your country now. India: iCall, 9152987821. US: National DV Hotline, 1-800-799-7233. Elsewhere: findahelpline.com.",
      },
      {
        kind: "text",
        heading: "The seven signs",
        text: "You know they don't treat you well, but you can't let go. You've conformed to their standards and lost track of your own identity. The relationship has extreme highs and extreme lows. You feel addicted to them, even when they hurt you. You've started doubting your own memory and perception. You feel emotionally unstable in a way that's new. You keep going back, even knowing it's damaging — which research shows is the norm, not a personal failing: people return an average of seven times before leaving for good.",
      },
      {
        kind: "text",
        heading: "Why the good times feel so good",
        text: "Trauma bonds run on a four-phase cycle: tension building, an incident of harm, a honeymoon phase of reconciliation, and a calm that never quite settles before tension starts building again. The honeymoon phase floods the brain with dopamine and oxytocin — a bigger hit than most healthy relationships produce, because it's relief from real pain, not just affection. The brain logs that intensity as love. It isn't. It's neurochemical relief, and to your nervous system the two feel identical.",
      },
      {
        kind: "list",
        heading: "What recovery adds, on top of the eight-week program",
        items: [
          "The Reality Anchor Journal — a running, factual record of what actually happened, to counter the self-doubt gaslighting produces.",
          "Treating no-contact as non-negotiable, not just recommended — for a trauma bond it's the equivalent of stopping an addictive substance, not a boundary.",
          "Actively rebuilding dopamine and oxytocin through other channels — exercise, safe touch, creative work — rather than waiting for the craving to fade on its own.",
          "Identity reconstruction: listing what you gave up to accommodate them, and deliberately reclaiming it, starting with the smallest and safest items.",
          "Grounding techniques (5-4-3-2-1 senses; noticing the body's response before the mind decides) for the moments confusion or self-doubt spikes.",
        ],
      },
    ],
  },
  {
    slug: "anger-sleep-inheritance",
    eyebrow: "Beyond the eight weeks",
    title: "Anger, sleep, and patterns older than this relationship",
    summary: "Three things that often travel with anxious attachment, each with its own evidence-based recovery path.",
    body: [
      {
        kind: "text",
        heading: "Explosive anger isn't a character flaw",
        text: "Anger is a normal signal that a boundary was crossed. Explosive anger — the kind that feels out of control and leaves shame behind — is usually suppressed anger breaking through, not a personality problem. One counterintuitive but well-replicated finding: venting anger (yelling, hitting something) makes subsequent anger worse, not better, because it rehearses the pathway rather than releasing it.",
      },
      {
        kind: "steps",
        heading: "STOP-DROP-DELAY-MOVE-PROCESS, for anger rising in real time",
        steps: [
          { step: "STOP", action: "Physical halt", detail: "The moment you notice heat, a tightening jaw, or a raised voice — stop moving or speaking.", duration: "Immediate" },
          { step: "DROP", action: "Lower the arousal", detail: "Full exhale. Unclench jaw and fists. Feel your feet on the floor.", duration: "60–90 sec" },
          { step: "DELAY", action: "Wait 20 minutes minimum", detail: "Adrenaline and cortisol take 20–30 minutes to metabolise. This isn't avoidance — it's chemistry.", duration: "20 min" },
          { step: "MOVE", action: "Discharge physically", detail: "Brisk walk, push-ups, a run — this is what actually burns off the chemical fuel.", duration: "15–20 min" },
          { step: "PROCESS", action: "Return regulated", detail: "“What is this anger actually about, underneath?” Write the answer before re-engaging.", duration: "10 min" },
        ],
      },
      {
        kind: "list",
        heading: "Sleep: the fastest lever on next-day anxiety and anger",
        items: [
          "A fixed wake time, seven days a week, is the single most effective sleep fix — it's the wake time, not the bedtime, that sets your body clock.",
          "10–15 minutes of natural light within 30 minutes of waking speeds up sleep onset over the following weeks.",
          "90 minutes before bed: dim lights, cut screens (blue light suppresses melatonin), cool the room.",
          "If you're awake in bed for 20 minutes, get up. Do something quiet and dim elsewhere, come back when sleepy — this breaks the brain's habit of pairing your bed with wakefulness.",
        ],
      },
      {
        kind: "text",
        heading: "Patterns older than you",
        text: "Some of what shows up here didn't start with you. Trauma and attachment patterns can pass down a family line — through parenting behaviour a parent didn't choose to repeat, and, the newer finding, through measurable changes in how stress-related genes are expressed. None of this removes your responsibility for the work now. It does mean the work you do isn't just for you: naming the pattern and doing the work is, in a very literal sense, where the chain can stop.",
      },
    ],
  },
  {
    slug: "body-mind-science",
    eyebrow: "Ancient practice, modern evidence",
    title: "The gut, the vagus nerve, and why the body comes first",
    summary:
      "Ayurveda and Yogic tradition placed the navel at the centre of emotional life thousands of years ago. Modern neuroscience has independently arrived at almost the same map.",
    body: [
      {
        kind: "text",
        text: "The gut contains around 500 million neurons — more than the spinal cord — and makes 95% of the body's serotonin. Roughly 90% of the signal traffic on the vagus nerve, the body's main gut-brain highway, travels upward from gut to brain, not the other way round. “Gut feeling” turns out to be closer to literal than metaphorical. Ayurveda calls the same territory the Nabhi — the seat of Agni, the digestive-and-emotional fire — and the Manipura Chakra governs almost exactly the same functions the celiac plexus and vagus nerve carry out anatomically. Two vocabularies, describing the same convergence point, roughly two thousand years apart.",
      },
      {
        kind: "list",
        heading: "Five ways to raise vagal tone, starting today",
        items: [
          "Extended-exhale breathing, 10 minutes, morning and whenever anxious — the single best-evidenced practice here.",
          "Humming or chanting for a few minutes — the vibration directly stimulates a vagal branch in the throat.",
          "Cold water on the face, or a cold 30–60 seconds at the end of a shower.",
          "Gargling vigorously for 60–90 seconds, morning and evening — simple, and underused.",
          "Real social connection and laughter — polyvagal theory identifies this as a direct vagal-toning input, not just an emotional nice-to-have.",
        ],
      },
      {
        kind: "list",
        heading: "Feeding the gut-brain axis",
        items: [
          "Aim for 30+ different plant foods a week — diversity, not just quantity, predicts a healthier microbiome.",
          "Fermented foods (yoghurt, kefir, idli, dosa, kimchi) supply live bacteria with real anxiety-reducing effects in trials.",
          "Prebiotic fibre — garlic, onions, oats, bananas — feeds the bacteria you already have.",
          "Ultra-processed food and alcohol measurably damage the gut lining and the microbiome that regulates mood.",
        ],
      },
    ],
  },
];

export const referenceGroups: ReferenceGroup[] = [
  {
    heading: "Attachment theory",
    entries: [
      "Bowlby, J. (1969, 1973, 1980). Attachment and Loss (Vols. 1–3). New York: Basic Books.",
      "Ainsworth, M.D.S. et al. (1978). Patterns of Attachment. Hillsdale, NJ: Lawrence Erlbaum.",
      "Mikulincer, M., & Shaver, P.R. (2007). Attachment in Adulthood. New York: Guilford Press.",
      "Main, M., & Goldwyn, R. (1985). Adult Attachment Interview scoring system. UC Berkeley.",
    ],
  },
  {
    heading: "Neuroscience & the nervous system",
    entries: [
      "Porges, S.W. (2011). The Polyvagal Theory. New York: W.W. Norton.",
      "Fisher, H.E. et al. (2010). Reward, addiction, and emotion regulation systems associated with rejection in love. Journal of Neurophysiology, 104(1).",
      "Arnsten, A.F.T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10(6).",
      "Van der Kolk, B. (2014). The Body Keeps the Score. New York: Viking.",
    ],
  },
  {
    heading: "CBT, DBT, ACT",
    entries: [
      "Beck, A.T. (1979). Cognitive Therapy of Depression. New York: Guilford Press.",
      "Linehan, M.M. (1993). Skills Training Manual for Treating Borderline Personality Disorder. New York: Guilford Press.",
      "Hayes, S.C. et al. (2012). Acceptance and Commitment Therapy (2nd ed.). New York: Guilford Press.",
      "Hofmann, S.G. et al. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5).",
    ],
  },
  {
    heading: "Trauma bonding & recovery",
    entries: [
      "Carnes, P. (1997). The Betrayal Bond. Deerfield Beach, FL: Health Communications.",
      "Herman, J.L. (1992). Trauma and Recovery. New York: Basic Books.",
      "Walker, L.E. (2009). The Battered Woman Syndrome (3rd ed.). New York: Springer.",
      "Stern, R. (2007). The Gaslight Effect. New York: Morgan Road Books.",
    ],
  },
  {
    heading: "Gut-brain axis & Ayurveda",
    entries: [
      "Gershon, M.D. (1998). The Second Brain. New York: HarperCollins.",
      "Cryan, J.F., & Dinan, T.G. (2012). Mind-altering microorganisms. Nature Reviews Neuroscience, 13(10).",
      "Charaka Samhita (c. 600 BCE); Sushruta Samhita (c. 600 BCE) — primary Ayurvedic texts, trans. Sharma / Bhishagratna.",
      "Yoga Sutras of Patanjali (c. 400 CE), trans. Iyengar, B.K.S. (1993). Light on the Yoga Sutras of Patanjali.",
    ],
  },
  {
    heading: "Sleep & expressive writing",
    entries: [
      "Walker, M.P. (2017). Why We Sleep. New York: Scribner.",
      "Morin, C.M. (1993). Insomnia: Psychological Assessment and Management. New York: Guilford Press.",
      "Pennebaker, J.W. (1997). Opening Up: The Healing Power of Expressing Emotions. New York: Guilford Press.",
    ],
  },
];
