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
  { region: "India", contact: "Tele-MANAS — 14416 or 1-800-891-4416; emergency services — 112" },
  { region: "United States", contact: "Call or text 988; emergency services — 911" },
  { region: "Anywhere", contact: "findahelpline.com" },
] as const;

export const seekHelpCriteria = [
  "Distress is persistent, worsening, or the things you're trying are not helping. You do not need to wait for a set number of weeks or a particular score before asking for care.",
  "You're experiencing persistent, severe low mood — hopelessness, loss of all pleasure, or trouble functioning at work or daily life.",
  "You have thoughts of harming yourself or someone else. If this is true right now, please contact a crisis line immediately — see the numbers above.",
  "Past trauma or abuse may be involved, or an exercise here brings up memories or reactions that feel difficult to manage alone.",
  "You keep hitting the same relationship difficulty across different relationships, with no improvement over time.",
  "You're using substances, self-harm, or other self-destructive behaviour to manage the pain.",
] as const;

export const professionalModalities = [
  { name: "CBT or Schema Therapy", use: "A clinician may discuss these for recurring thought, belief, or relationship patterns." },
  { name: "EMDR", use: "A clinician may consider this for some trauma-related symptoms after assessment." },
  { name: "Emotionally Focused Therapy (EFT)", use: "A structured approach sometimes used for relationship and attachment concerns." },
  { name: "Trauma-informed therapy", use: "An umbrella term; the appropriate approach depends on the person, history, and clinician." },
  { name: "DBT skills training", use: "Structured practice in mindfulness, distress tolerance, emotion regulation, and interpersonal skills." },
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
    title: "Notice and settle activation",
    goal: "Experiment with grounding and attention practices before moving into deeper reflection.",
    rationale:
      "Acute anxiety can make reflection difficult. Some people find it easier to begin with a brief sensory, breathing, or movement practice. This is a suggested order, not a claim that every person's body or mind will respond the same way.",
    practices: [
      {
        slug: "morning-vagal-activation",
        number: "01",
        title: "Morning Paced Breathing",
        framework: "Slow breathing · self-observation",
        why: "A slower breath with a comfortable exhale can feel settling for some people. It should remain easy: skip the hold, shorten the count, or stop if you feel dizzy, breathless, or more distressed.",
        evidence:
          "Slow-paced breathing has been studied in relation to perceived stress and heart-rate variability, but responses vary and heart-rate variability is not a diagnosis or a measure of personal recovery (Lehrer & Gevirtz, 2014).",
        steps: [
          { step: "1", action: "Get into position", detail: "Sit or lie down. Eyes closed or a soft gaze down. Phone timer for 10 minutes, phone face-down in another room if you can manage it.", duration: "1 min" },
          { step: "2", action: "Hand on heart", detail: "Dominant hand on your chest, other hand on top. Just feel the warmth of your own hand for a moment.", duration: "30 sec" },
          { step: "3", action: "Comfortable paced breathing", detail: "If comfortable, inhale gently for 4 counts and exhale for 6. A breath hold is optional. Return to ordinary breathing if you feel light-headed or uncomfortable.", duration: "Up to 5 min" },
          { step: "4", action: "A short phrase, timed to the breath", detail: "Inhale: “My safety.” Hold: “comes from.” Exhale: “inside me.”", duration: "2 min" },
          { step: "5", action: "Arrive in the body", detail: "Last few breaths: just notice your weight, the air temperature, your heartbeat under your hand.", duration: "1.5 min" },
          { step: "6", action: "One intention", detail: "Before opening your eyes, name one manageable thing you'll do today for your wellbeing.", duration: "30 sec" },
        ],
      },
      {
        slug: "body-scan",
        number: "02",
        title: "The Body Scan",
        framework: "Mindfulness-based stress reduction",
        why: "The aim is simply to notice sensations without immediately reacting to them. Some people find that useful; others find body-focused attention uncomfortable or activating and should shorten or skip it.",
        steps: [
          { step: "1", action: "Setup", detail: "Right after your breathing practice. Eyes closed. Lying down is fine.", duration: "30 sec" },
          { step: "2", action: "Scalp & forehead", detail: "Notice tension or temperature. Don't change anything, just notice.", duration: "30 sec" },
          { step: "3", action: "Jaw, mouth, throat", detail: "Clenched teeth? Tongue pressed to the roof of the mouth? Let the jaw float open slightly.", duration: "30 sec" },
          { step: "4", action: "Neck & shoulders", detail: "Shoulders creeping toward your ears? Let them drop, even a millimetre.", duration: "30 sec" },
          { step: "5", action: "Chest & heart", detail: "Notice any tightness or ache here. If it's there, name it kindly: “This is grief. It's allowed.”", duration: "45 sec" },
          { step: "6", action: "Belly", detail: "Notice sensation here without assigning it a cause. Let the breath stay natural and comfortable.", duration: "30 sec" },
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
        why: "An urge to text, check, or call may be an attempt to reduce uncertainty or distress. Adding a pause and trying another action can create room to choose, although it may not change the feeling immediately.",
        evidence:
          "Physical activity can reduce anxiety symptoms for some people, but it is not equivalent to medication and the safe type and intensity depend on health, ability, and preference (Stubbs et al., 2017).",
        steps: [
          { step: "1", action: "Name the urge", detail: "“There's the urge to text.” Naming it may create a little distance; it does not have to lower the intensity.", duration: "30 sec" },
          { step: "2", action: "Rate it, 0–10", detail: "Write the number down if tracking feels useful. The number is personal, not a clinical measure.", duration: "15 sec" },
          { step: "3", action: "Create a little distance from the phone", detail: "Another room, another person, or a temporary app limit can add a pause. Choose only what is safe and workable in your circumstances.", duration: "1 min" },
          { step: "4", action: "Move if it is safe for you", detail: "A walk, stretching, or another familiar activity may shift attention and arousal. Choose an intensity appropriate for your health and stop if you feel unwell.", duration: "Optional" },
          { step: "5", action: "Rate it again", detail: "Write the new number next to the old one and note any change—including no change—without treating it as proof of a mechanism.", duration: "2 min" },
          { step: "6", action: "One sentence", detail: "“By not acting on this, I chose ___ over anxiety.”", duration: "2 min" },
        ],
      },
      {
        slug: "thought-record",
        number: "04",
        title: "The Evening Thought Record",
        framework: "Cognitive behavioural therapy",
        why: "This exercise is adapted from CBT thought records: write down an automatic interpretation and compare it with the information available, rather than assuming the first thought is the only possible account.",
        steps: [
          { step: "1", action: "Situation", detail: "Only what a camera would have recorded. “They didn't reply to my morning message,” not “they ignored me.”", duration: "1 min" },
          { step: "2", action: "Emotions, rated", detail: "List each one with a percentage: Anxious 85%, Sad 70%, Ashamed 40%.", duration: "1 min" },
          { step: "3", action: "The hot thought", detail: "The single most distressing interpretation, written exactly as it occurred to you.", duration: "1 min" },
          { step: "4", action: "Evidence for it", detail: "Only facts you could defend in court. Not feelings.", duration: "2 min" },
          { step: "5", action: "Evidence against it", detail: "The pivotal column. Times this thought was proven wrong, other explanations, things you're leaving out.", duration: "3 min" },
          { step: "6", action: "Notice a thought habit", detail: "Mind-reading? Catastrophising? All-or-nothing? A label can help you examine the thought, but it does not automatically make it false.", duration: "1 min" },
          { step: "7", action: "A balanced thought", detail: "Try to use both columns above. Aim for language that is accurate and believable rather than forced positivity.", duration: "2 min" },
          { step: "8", action: "Re-rate", detail: "Rate the same emotions again and simply note whether anything changed.", duration: "1 min" },
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
        why: "Relationship anxiety can sometimes narrow attention toward another person's responses. Values questions offer one way to remember interests and commitments that also matter to you.",
        evidence: "Values reflection is used in acceptance and commitment therapy to connect choices with what matters. This exercise is offered as a reflective prompt, not as a physiological treatment or a promise of reduced distress.",
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
          { step: "Security", action: "What you might notice", detail: "Uncertainty feels hard to tolerate. Possible experiment: identify routines, people, or practical supports that make the week feel more predictable.", duration: "At your pace" },
          { step: "Worthiness", action: "What you might notice", detail: "Approval from one person carries most of the weight. Possible experiment: record your own efforts and seek perspective from more than one trusted source.", duration: "At your pace" },
          { step: "Identity", action: "What you might notice", detail: "It is hard to name interests outside the relationship. Possible experiment: revisit one activity or friendship that feels like your own.", duration: "At your pace" },
          { step: "Fear of abandonment", action: "What you might notice", detail: "You expect important people to leave. A licensed therapist can help explore this carefully if it is recurring or distressing.", duration: "At your pace" },
          { step: "Fear of being alone", action: "What you might notice", detail: "Time alone feels difficult. If safe, try a short, chosen solo activity rather than a forced escalation; a clinician can help tailor this.", duration: "At your pace" },
          { step: "Connection", action: "What you might notice", detail: "You miss a particular kind of intimacy. Possible experiment: name the kind of connection you need and consider where else it can be cultivated safely.", duration: "At your pace" },
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
      "Strong feelings can still arrive after useful reflection. These practices offer possible ways to pause and observe what is happening; they are not expected to work for everyone or replace care during a crisis.",
    practices: [
      {
        slug: "tipp",
        number: "07",
        title: "TIPP, for when anxiety hits 7 or higher",
        framework: "DBT distress tolerance",
        why: "TIPP is a set of DBT distress-tolerance skills. Some elements involve cold or exercise and are not suitable for everyone; adapt them with a licensed clinician if you have a medical condition, a trauma history, or uncertainty about safety.",
        steps: [
          { step: "T", action: "Temperature", detail: "Some DBT materials use cool water on the face. Cold exposure can be unsafe for some medical conditions; omit it unless you know it is appropriate for you, and never use extreme cold.", duration: "Optional" },
          { step: "I", action: "Brief movement", detail: "If medically safe, try a familiar form of brisk movement. Do not exercise at maximum effort; omit this step if it is unsafe or unfamiliar.", duration: "Optional" },
          { step: "P", action: "Paced breathing", detail: "Use a gentle count that does not create air hunger; for example, 4 in and 6 out without a hold. Stop if you feel dizzy or uncomfortable.", duration: "Up to 5 min" },
          { step: "P", action: "Paired muscle relaxation", detail: "Gently tense and release one muscle group at a time. Skip painful or injured areas and stop if discomfort increases.", duration: "A few cycles" },
        ],
      },
      {
        slug: "rain",
        number: "08",
        title: "RAIN, for processing the feeling itself",
        framework: "Mindfulness · self-compassion research",
        why: "RAIN provides a sequence for noticing and responding to a feeling with curiosity. It may help some people and may be too activating for others; stop and ground yourself if that happens.",
        steps: [
          { step: "R", action: "Recognize", detail: "Name it as precisely as you can: “This is acute longing.” “This is the old fear of not being enough, again.” The aim is to create a little distance, not to force the feeling away.", duration: "2 min" },
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
      "If these reflections have felt manageable, you might now explore values, identity, and supportive routines. There is no assumption that eight weeks produces a particular level of readiness.",
    practices: [
      {
        slug: "committed-action",
        number: "09",
        title: "Committed Action Planning",
        framework: "Acceptance & commitment therapy",
        why: "You do not have to resolve every feeling before taking a small values-aligned step. Recording what happens may help you notice your capacity without requiring a particular emotional result.",
        steps: [
          { step: "1", action: "Define your compass", detail: "“In five years, looking back at how I navigated this, what do I want to be true?”", duration: "10 min" },
          { step: "2", action: "Write an identity statement", detail: "“I am the kind of person who ___, even when it's difficult” — using your top three values.", duration: "5 min" },
          { step: "3", action: "Schedule one manageable action", detail: "Choose a physical, creative, intellectual, social, or restful action that fits your values and circumstances. Add a day and place if that helps.", duration: "5 min" },
          { step: "4", action: "Before/after reflection", detail: "If useful, rate your state before and after. Record any result—including no change—without treating it as proof that the action works generally.", duration: "A few minutes" },
        ],
      },
      {
        slug: "grief-journaling",
        number: "10",
        title: "Grief Journaling",
        framework: "Expressive writing research",
        why: "A time-limited journal can give repetitive thoughts a defined place for some people. It does not guarantee that grief will be processed, and it is reasonable to stop if writing intensifies rumination or distress.",
        evidence: "Expressive-writing studies report mixed and generally modest effects. Writing helps some people and can intensify distress for others; shorten or stop the exercise if it leaves you feeling worse, and seek support if difficult material surfaces.",
        steps: [
          { step: "1", action: "Set a container", detail: "20–25 minutes, timer on. Outside this window, when rumination shows up: “I have time set aside for this — not now.”", duration: "1 min" },
          { step: "2", action: "Open honestly", detail: "“Right now, what's most present for me is...” — write without editing.", duration: "3 min" },
          { step: "3", action: "Use a deep prompt", detail: "“What I'm grieving that isn't just them is...” / “What this is teaching me about what I need is...”", duration: "15 min" },
          { step: "4", action: "An unsent letter (optional)", detail: "Write what feels important without sending it impulsively. If contact or disclosure has safety implications, discuss it with a qualified professional or trusted support person.", duration: "Up to 20 min" },
          { step: "5", action: "Close with self-compassion", detail: "“I was willing to feel this today. That takes courage.” Then do something grounding — tea, a short walk.", duration: "2 min" },
        ],
      },
    ],
  },
];

export const criticalRules: CriticalRule[] = [
  {
    title: "Consider a contact boundary",
    summary: "There is no universal 90-day prescription.",
    detail:
      "A temporary boundary can create space after a difficult relationship, but the right form depends on safety, shared responsibilities, work, legal arrangements, and personal goals. It should not be framed as addiction treatment.",
    actions: [
      "Mute, unfollow, or block only if it feels safe and appropriate; keep necessary channels available for children, work, legal, or safety needs.",
      "Tell a trusted person what boundary you are considering and ask for practical support.",
      "For required contact, consider a clear topic, channel, and time window.",
      "If coercion, threats, stalking, or violence are present, make a safety plan with a domestic-violence service rather than relying on a generic boundary rule.",
    ],
  },
  {
    title: "Use movement if it is safe for you",
    summary: "Small, adaptable amounts can still count.",
    detail:
      "Regular physical activity supports general health and may help mood or anxiety for some people. It is not a cure for relationship distress, and disability, illness, medication, pregnancy, and fitness all affect what is appropriate.",
    actions: [
      "Choose a familiar form of movement you can do safely; a few minutes can be a valid starting point.",
      "Increase duration or intensity gradually, if desired, rather than treating a target as mandatory.",
      "Ask a health professional for individualized advice if you have symptoms, health conditions, or concerns about exercise.",
    ],
  },
  {
    title: "Diversify where meaning comes from",
    summary: "No affirmation carries the weight that lived experience does.",
    detail:
      "Small experiences outside one relationship can help you notice other sources of identity, support, and meaning. That is an invitation to explore, not a claim about what your nervous system must believe.",
    actions: [
      "One physical activity a week that's entirely yours.",
      "One creative or intellectual one.",
      "One social one — with people who aren't them.",
    ],
  },
];

export const dailySchedule: ScheduleRow[] = [
  { time: "After waking, if useful", practice: "Comfortable paced breathing", why: "Creates a short pause to notice how you feel", duration: "Up to 5 min" },
  { time: "Afterward or later", practice: "Body scan", why: "Practises noticing sensation without immediately reacting", duration: "Up to 5 min" },
  { time: "At the start of the day", practice: "Values + one manageable action", why: "Connects a choice with something that matters to you", duration: "5 min" },
  { time: "When a thought repeats", practice: "One thought record", why: "Tests an interpretation against other available information", duration: "Up to 10 min" },
  { time: "When an urge appears", practice: "Pause and choose an alternative action", why: "Adds time between an urge and a decision", duration: "As needed" },
  { time: "During high distress", practice: "A safe, familiar distress-tolerance skill", why: "Offers something concrete while you seek support if needed", duration: "As needed" },
  { time: "When reflection feels manageable", practice: "RAIN", why: "Provides a structure for noticing an emotion", duration: "Up to 10 min" },
  { time: "When scheduling allows", practice: "One values-aligned activity", why: "Makes space for identity and meaning beyond the relationship", duration: "Flexible" },
  { time: "Occasionally, if helpful", practice: "Grief journaling", why: "Gives reflection a time boundary; stop if it increases distress", duration: "Up to 20 min" },
  { time: "At a useful interval", practice: "Review", why: "Helps you decide what to keep, change, or discuss with a professional", duration: "Flexible" },
] as const;

export const milestones: Milestone[] = [
  { weeks: "Wk 1–2", expectedShifts: "Notice which grounding practices feel neutral, useful, unhelpful, or activating; no improvement is promised.", focus: "Paced breathing, body scan, and adding a pause before action", marker: "Which exercise, if any, made the next choice easier?", watchFor: "Severe or worsening distress, inability to function, or any safety concern—seek qualified help rather than waiting." },
  { weeks: "Wk 3–4", expectedShifts: "You may have more language for recurring thoughts, needs, and values, even if the feelings remain difficult.", focus: "Values, needs, and thought records", marker: "Can you describe one pattern with more nuance than before?", watchFor: "An exercise repeatedly increases shame, fear, or rumination—pause it and consider professional guidance." },
  { weeks: "Wk 5–6", expectedShifts: "Observe whether any pause or distress-tolerance skill is usable when emotion rises.", focus: "RAIN and safe, familiar distress-tolerance skills", marker: "What support would make difficult moments safer or less isolating?", watchFor: "Deepening low mood, escalating anger, or unsafe behaviour—contact a licensed professional or crisis service as appropriate." },
  { weeks: "Wk 7–8", expectedShifts: "Notice whether values-aligned activities make room for identity, connection, or meaning outside the relationship.", focus: "Committed action and reflection", marker: "Which small action felt genuinely yours?", watchFor: "Pressure to prove you are 'over it' on a schedule; there is no required endpoint here." },
  { weeks: "After week 8", expectedShifts: "Choose whether to continue, revise, stop, or take selected notes to a professional.", focus: "Keep only what is safe and useful", marker: "What have you learned about the kind of support you need?", watchFor: "Using this guide to postpone care that you want or need." },
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
      "This feeling can change, even if I cannot predict when.",
    ],
  },
  {
    slug: "releasing",
    title: "Releasing the attachment",
    useWhen: "When the urge to contact hits",
    affirmations: [
      "I breathe in stability. I breathe out what I cannot control.",
      "I release what I cannot hold.",
      "Contact may not give me the steadiness I need. I can pause before deciding.",
      "The urge I feel is a signal, not a command.",
      "I can choose care over the temporary relief of an impulsive action.",
      "They are living their life. I am reclaiming mine.",
      "Each pause gives me time to choose what fits my situation and values.",
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
      "I can practise choices and boundaries that support healthier relationships.",
      "I'm learning to sit with myself and find that I'm good company.",
      "I am not waiting to be chosen. I am choosing myself, every day.",
    ],
  },
];

export const quickReferenceCard = [
  { category: "Safety", moment: "Breathing practice", line: "My safety does not depend on their response. Right now, I am breathing. Right now, I am whole." },
  { category: "Releasing", moment: "When the urge to contact hits", line: "The urge I feel is a signal, not a command. I can pause before I decide." },
  { category: "Self-worth", moment: "When “not enough” activates", line: "I am enough, exactly as I am, right now. My value does not decrease because they couldn't see it." },
  { category: "Grief", moment: "When sadness and longing arise", line: "My grief is the measure of my love. I honour both. This pain is not permanent." },
  { category: "Growth", moment: "Daily identity and direction", line: "I am not waiting to be chosen. I am choosing myself, every day." },
] as const;

export const deepDives: DeepDiveSection[] = [
  {
    slug: "trauma-bonding",
    eyebrow: "When a relationship may be unsafe or coercive",
    title: "Harmful relationship patterns need more than a self-help label",
    summary:
      "“Trauma bonding” is an informal term, not a diagnosis. If harm, coercion, fear, or control is present, prioritize individualized safety planning and qualified support over trying to explain the relationship through this page.",
    body: [
      {
        kind: "callout",
        tone: "warning",
        text: "If your situation involves physical harm, threats, stalking, controlling behaviour, or you feel unsafe, contact an appropriate domestic-violence or emergency service. India: emergency services, 112; mental-health support, Tele-MANAS 14416. US: National Domestic Violence Hotline, 1-800-799-SAFE (7233); emergency services, 911. Elsewhere: use a verified local service or findahelpline.com.",
      },
      {
        kind: "text",
        heading: "Patterns worth taking seriously",
        text: "You may feel afraid, controlled, isolated, repeatedly harmed, unsure of your own memory, or unable to leave safely. Returning to a harmful relationship can happen for many practical, emotional, financial, cultural, and safety-related reasons; it is not evidence of weakness. A trained advocate can help without requiring you to adopt a particular label.",
      },
      {
        kind: "text",
        heading: "Why leaving can be complicated",
        text: "Periods of fear or harm may alternate with apology, affection, practical dependence, or hope that things will change. That unpredictability can make decisions difficult, but a web page cannot infer a person's brain chemistry or tell them what the relationship means. Safety, housing, finances, children, immigration, and social support can all matter.",
      },
      {
        kind: "list",
        heading: "What may help alongside professional safety planning",
        items: [
          "A factual record of events, stored only where it is safe, if a qualified advocate recommends it.",
          "A contact or separation plan tailored to safety and unavoidable responsibilities—not a universal no-contact rule.",
          "Trusted people, practical services, legal advice, housing support, or a domestic-violence advocate, depending on the situation.",
          "Small, safe ways to reconnect with activities and relationships that matter to you.",
          "Grounding techniques (5-4-3-2-1 senses; noticing the body's response before the mind decides) for the moments confusion or self-doubt spikes.",
        ],
      },
    ],
  },
  {
    slug: "anger-sleep-inheritance",
    eyebrow: "Other concerns deserve their own assessment",
    title: "Anger, sleep, and patterns older than this relationship",
    summary: "General reflection prompts—not a claim that these concerns share one cause or one treatment path.",
    body: [
      {
        kind: "text",
        heading: "Explosive anger isn't a character flaw",
        text: "Anger can carry useful information, but intense or explosive anger has many possible contributors and cannot be explained from a page. Aggressive venting can increase arousal for some people. If you fear you may hurt yourself or someone else, create distance, use emergency support, and seek professional help rather than relying on this exercise.",
      },
      {
        kind: "steps",
        heading: "STOP-DROP-DELAY-MOVE-PROCESS, for anger rising in real time",
        steps: [
          { step: "STOP", action: "Physical halt", detail: "The moment you notice heat, a tightening jaw, or a raised voice — stop moving or speaking.", duration: "Immediate" },
          { step: "DROP", action: "Lower the arousal", detail: "Full exhale. Unclench jaw and fists. Feel your feet on the floor.", duration: "60–90 sec" },
          { step: "DELAY", action: "Take a safe pause", detail: "Use as much time as you need and agree on when to return if another person is involved. This is a boundary, not a fixed biochemical countdown.", duration: "Flexible" },
          { step: "MOVE", action: "Move if safe", detail: "A familiar walk or stretch may help some people shift attention. Avoid aggressive or unsafe exertion.", duration: "Optional" },
          { step: "PROCESS", action: "Reflect before re-engaging", detail: "Ask what the anger may be signalling and what a safe, respectful next step would be. A professional can help with recurring or frightening anger.", duration: "Flexible" },
        ],
      },
      {
        kind: "list",
        heading: "Sleep: general habits and when to seek care",
        items: [
          "A reasonably consistent sleep and wake schedule helps some people; work, caregiving, health, and medication can change what is realistic.",
          "Daylight and daytime movement may support sleep timing, but there is no required minute-by-minute prescription here.",
          "A quieter wind-down and less stimulating screen use may help; observe your own response rather than treating blue light as the only cause of poor sleep.",
          "Stimulus-control techniques are part of CBT for insomnia, but persistent insomnia or major daytime impairment deserves individualized medical or psychological care.",
        ],
      },
      {
        kind: "text",
        heading: "Patterns older than you",
        text: "Family experiences and learned relationship patterns can shape how people respond to stress. Research on intergenerational biology and epigenetics is complex and does not establish a personal cause, destiny, or diagnosis. Reflection may help you notice patterns, while a qualified professional can help explore them without over-interpreting family history.",
      },
    ],
  },
  {
    slug: "body-mind-science",
    eyebrow: "Tradition and science, kept distinct",
    title: "Body awareness, breathing, and gut-brain research",
    summary:
      "Ayurveda and Yoga offer historical, cultural frameworks for embodied experience. Modern anatomy and neuroscience ask different questions; similarities in metaphor do not establish scientific equivalence.",
    body: [
      {
        kind: "text",
        text: "The digestive and nervous systems communicate through neural, endocrine, immune, and metabolic pathways, and this remains an active area of research. Nabhi, Agni, and Manipura belong to Ayurvedic and Yogic traditions; they are not anatomical structures and should not be presented as the celiac plexus, vagus nerve, or a neuroscience finding under another name.",
      },
      {
        kind: "list",
        heading: "Body-based options to explore gently",
        items: [
          "Comfortable slow breathing for a few minutes; return to ordinary breathing if you feel dizzy or uncomfortable.",
          "Humming, chanting, or listening to music if it feels calming or meaningful—without claiming a measured vagal effect.",
          "A brief sensory grounding exercise using sights, sounds, touch, smell, and taste.",
          "Gentle, familiar movement suited to your health and ability.",
          "Supportive social contact when it is available and safe.",
        ],
      },
      {
        kind: "list",
        heading: "Food and wellbeing",
        items: [
          "A varied, adequate diet can support general health, but no food plan here treats anxiety or relationship distress.",
          "Fermented foods suit some people and not others; they are not a substitute for mental-health care.",
          "Fibre-rich foods can be part of a balanced diet, with changes adapted for allergies, digestive conditions, access, and culture.",
          "Seek individualized advice from a qualified health professional for restrictive eating, digestive symptoms, alcohol concerns, or major dietary changes.",
        ],
      },
    ],
  },
];

export const referenceGroups: ReferenceGroup[] = [
  {
    heading: "Public-health boundaries and help",
    entries: [
      "National Institute of Mental Health. Caring for Your Mental Health; My Mental Health: Do I Need Help? nimh.nih.gov.",
      "World Health Organization. Self-care for health and well-being: self-care complements, rather than replaces, health systems and health workers. who.int.",
      "NHS. Anxiety, fear and panic: self-help may help, and medical support is appropriate when distress affects life or self-help is not helping. nhs.uk.",
      "Government of India, Directorate General of Health Services. Tele-MANAS: 14416 or 1-800-891-4416. dghs.mohfw.gov.in.",
    ],
  },
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
    heading: "Trauma, abuse, and relationship safety",
    entries: [
      "Carnes, P. (1997). The Betrayal Bond. Deerfield Beach, FL: Health Communications.",
      "Herman, J.L. (1992). Trauma and Recovery. New York: Basic Books.",
      "Walker, L.E. (2009). The Battered Woman Syndrome (3rd ed.). New York: Springer.",
      "Stern, R. (2007). The Gaslight Effect. New York: Morgan Road Books.",
    ],
  },
  {
    heading: "Gut-brain research & historical traditions",
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
