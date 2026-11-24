import type { MentorLesson } from "./lesson-manifest";
import { lessonExplanation } from "./mentor";

export type AvatarReply = {
  text: string;
  links: { label: string; href: string }[];
  suggestions: string[];
};

type GuidedTopic = {
  matches: RegExp;
  reply: AvatarReply;
};

const lab = "/learning-lab";
const free = `${lab}/free-courses`;
const programmes = `${lab}/programmes`;
const contact = { label: "Contact the Learning Lab", href: `${lab}/contact` };
const freeLibrary = { label: "Explore all six free courses", href: free };
const venture = {
  label: "Start the free 14-day venture experiment",
  href: `${lab}/venture-experiment`,
};
const support = { label: "Support the Lab", href: `${lab}/support` };
const donationQr = { label: "View the optional donation QR", href: `${lab}/support#donate` };
const toolkit = `${lab}/toolkit`;
const toolkitHub = { label: "Open the free founder toolkit", href: toolkit };
const conversationKit = { label: "Customer conversation kit", href: `${toolkit}/talk-to-customers` };
const playbooks = { label: "₹0–₹500 test playbooks", href: `${toolkit}/test-playbooks` };
const ideaFilter = { label: "One-page idea filter", href: `${toolkit}/idea-filter` };

export const starters = [
  "What can I learn for free?",
  "Help me write an AI task brief",
  "Show me the 13-session MBA course",
  "How do I test a business idea?",
  "Are paid courses open?",
  "Who is Dr. Swapnil Sahoo?",
];

function answer(text: string, links: AvatarReply["links"], suggestions: string[]): AvatarReply {
  return {
    text: `Guided answer from the published website: ${text}`,
    links,
    suggestions,
  };
}

// Prepared website guidance only. This module has no network, storage, account,
// assessment or payment actions and does not generate answers with a language model.
const topics: GuidedTopic[] = [
  // Real first-time founder questions. Listed first so that words such as "college",
  // "save", "store" or "price" in a student's question reach the toolkit, not Lab admin answers.
  {
    matches:
      /\b(scared|afraid|nervous|shy|fear\w*|anxious|anxiety|hesitat\w*|introvert\w*)\b|\b(talk|talking|speak|speaking) to (strangers|people|customers)\b|\b(approach|message|text|dm) (people|strangers|customers|someone)\b|\bwhat (do|should) i say\b|\bcold (message|messaging|outreach)\b/i,
    reply: answer(
      "Feeling nervous is normal. Use the free customer conversation kit: copy a ready-made message for WhatsApp, Instagram, a group post or in person (in English, Hinglish or Hindi), and start with people you already know who have the problem, then friends of friends. Ask five questions about the last time the problem happened; you are not selling anything. Rehearse once with a friend or the free AI role-play prompt first. Three conversations are enough to start.",
      [
        { label: "Copy a ready-made first message", href: `${toolkit}/talk-to-customers#messages` },
        { label: "Rehearse with a free AI prompt", href: `${toolkit}/ai-practice-prompts#rehearse` },
        venture,
      ],
      [
        "Should I build an app first?",
        "My friends love my idea. Is that enough?",
        "How do I test my idea with no money?",
      ]
    ),
  },
  {
    matches:
      /\b(build|make|develop|code|create)\b.{0,20}\b(app|website|platform|software)\b|\bapp first\b|\bneed (an?|my) (app|website)\b/i,
    reply: answer(
      "Not yet. Do the job by hand for three to five people first, using WhatsApp and a spreadsheet. If they ask you to do it again, that is your sign to build. The do-it-by-hand playbook has the steps and a pass mark, and the mistakes list explains why building first usually wastes weeks.",
      [
        { label: "Do it by hand for five people", href: `${toolkit}/test-playbooks#do-it-by-hand` },
        { label: "Beginner mistakes to dodge", href: `${toolkit}/mistakes` },
        ideaFilter,
      ],
      ["How do I test my idea with no money?", "I am scared to talk to customers", "Is my idea good?"]
    ),
  },
  {
    matches:
      /\b(friends?|family|parents|people) (said|say|says|told|like|liked|love|loved|think)\b|\b(love|like)d? my idea\b|\bis (that|this|it) enough\b|\bcompliments?\b|\b(likes|followers|views)\b/i,
    reply: answer(
      "Kind words are a start, but they cost people nothing, so they are not evidence. Count what people do: reservations, bookings, turning up, coming back. Set a pass mark before you test, such as at least 5 of 25 reserve by Friday, and count close friends and family separately. The signal ladder shows how strong each kind of response is.",
      [
        { label: "See the signal ladder", href: `${toolkit}/test-playbooks#signals` },
        { label: "Fill in a test card", href: `${toolkit}/test-playbooks#cards` },
        { label: "Why asking friends misleads", href: `${toolkit}/mistakes#asking-friends` },
      ],
      [
        "How do I test my idea with no money?",
        "Nobody replied to my messages",
        "I am scared to talk to customers",
      ]
    ),
  },
  {
    matches:
      /\b(nobody|no one|no-one|none)\b.{0,15}\b(repl\w*|respond\w*|answer\w*|came|signed|bought|interested)\b|\bno repl(y|ies)\b|\b(ignored|ghosted|rejected)\b|\b(everyone|they all|people) said no\b/i,
    reply: answer(
      "That is data, not failure. Most people are busy rather than rude. Send at least ten short, honest messages before judging, and try a warmer route: a friend of a friend, a group admin or a senior. If a real offer still gets zero after a fair try, write it down as 0 of N and decide whether to change or stop. An honest stop is a good result.",
      [
        { label: "Try a warmer first message", href: `${toolkit}/talk-to-customers#messages` },
        { label: "Do not quit after two noes", href: `${toolkit}/mistakes#giving-up` },
        { label: "Where to go after Day 14", href: `${venture.href}#next` },
      ],
      ["I am scared to talk to customers", "How do I test my idea with no money?", "Is my idea good?"]
    ),
  },
  {
    matches:
      /\b(price|pricing|charge)\b.{0,25}\b(my|our|the) (product|snacks?|food|service|items?|session|tuition|class|idea)\b|\bhow much (should|do|can) i charge\b|\bwhat (price|should i charge)\b|\bset (a|my|the) price\b|\bprice my\b/i,
    reply: answer(
      "Start from what people spend today on their current fix: ask about it in your conversations. Then test one clear price in a real offer, such as a reservation at ₹40, and see how many people act. Check your cost per unit with the free unit-economics course before you discount; a discount to get traction often hides a weak offer.",
      [
        { label: "Read your unit economics (free course)", href: `${free}/read-your-unit-economics` },
        playbooks,
        conversationKit,
      ],
      [
        "How do I test my idea with no money?",
        "My friends love my idea. Is that enough?",
        "What free tools can I use?",
      ]
    ),
  },
  {
    matches:
      /\b(is (my|this) idea (good|any good|worth\w*|viable)|my idea (is )?(good|worth\w*)|idea (worth|viable)|evaluate (my|this|an) idea|filter (my )?idea|no idea what to (do|start|build)|(find|get|need) (an? |good )?(business |startup )?ideas?)\b/i,
    reply: answer(
      "No tool can tell you that in advance; only real people's actions can. Spend 15 minutes on the free idea filter: name one specific person, one problem, what they do today and how you will reach five of them. It tells you the riskiest guess to check first. No idea yet? It also has eight prompts for spotting problems around you.",
      [ideaFilter, { label: "No idea yet? Start here", href: `${toolkit}/idea-filter#no-idea` }, venture],
      [
        "I am scared to talk to customers",
        "Should I build an app first?",
        "How do I test my idea with no money?",
      ]
    ),
  },
  {
    matches:
      /\b(no money|without money|zero budget|zero rupees|little money|low[- ]cost|cheap(ly)?|small budget|save money|tight budget)\b|\b(test|validate|check)\b.{0,12}\b(my|this|an|the) idea\b|\b(sell|selling)\b|\bhomemade\b|\bside hustle\b|\bfirst (customer|sale)s?\b|\blocal (shop|store)s?\b/i,
    reply: answer(
      "Start with a ₹0 test. Pick one of six playbooks, such as a WhatsApp reserve-by-Friday offer, a sign-up sheet with real time slots or doing the service by hand for five people. Write your pass mark first, then count what people actually do out of how many you asked. If you sell food regularly, check FSSAI registration first. The 14-day plan walks you through it day by day.",
      [playbooks, ideaFilter, venture],
      ["I am scared to talk to customers", "How should I price my product?", "What free tools can I use?"]
    ),
  },
  {
    matches:
      /\b(free tools?|which (app|apps|tool|tools|software)|what (app|apps|tools?|software) (should|can|do)|google forms?|canva|landing page|website builder)\b/i,
    reply: answer(
      "You never need paid software for a first test. A WhatsApp message and a Google Sheet are enough for most tests. The free tools list covers forms, posters, notes, calls and simple pages, with each tool's free plan checked.",
      [{ label: "Free tools list", href: `${toolkit}/free-tools` }, playbooks, toolkitHub],
      ["How do I test my idea with no money?", "I am scared to talk to customers", "Is my idea good?"]
    ),
  },
  {
    matches:
      /\b(e-?cells?|iic|innovation council|facilitat\w*|session plan|run (this|a) (session|workshop)|my (class|students)|student club)\b/i,
    reply: answer(
      "There is a free kit for running this with a group: a 75-minute customer-test workshop plan, an eight-slide outline, an activity report template you can adapt, and a grading rubric for faculty. No registration with the Lab is needed.",
      [
        { label: "Open the facilitator kit", href: `${toolkit}/facilitator-kit` },
        toolkitHub,
        { label: "Discuss an institutional pilot", href: `${lab}/for-colleges` },
      ],
      ["What can I learn for free?", "How do I test a business idea?", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(kaise|karu|karun|karoon|karna|karni|shuru|dhandha|dhanda|vyapar|vyapaar|baat|bechna|bechu|paise)\b|[ऀ-ॿ]/i,
    reply: answer(
      "Hindi aur Hinglish mein bhi madad hai. The customer conversation kit has ready-made messages and the full interview script in Hinglish and Hindi. Start with the idea filter, talk to three people who have the problem, then run one ₹0 test from the playbooks.",
      [
        { label: "Hinglish and Hindi messages", href: `${toolkit}/talk-to-customers#hindi` },
        toolkitHub,
        venture,
      ],
      [
        "I am scared to talk to customers",
        "How do I test my idea with no money?",
        "What can I learn for free?",
      ]
    ),
  },
  {
    matches: /\b(toolkit|templates?|scripts?|worksheets?|checklists?)\b/i,
    reply: answer(
      "The free founder toolkit has copy-ready tools for every stage: an idea filter, customer messages and a script, a question checker, six ₹0–₹500 test playbooks with test cards, a mistakes list, free AI practice prompts and a free tools list. No sign-up or payment.",
      [toolkitHub, conversationKit, playbooks],
      ["I am scared to talk to customers", "Is my idea good?", "How do I test my idea with no money?"]
    ),
  },
  {
    matches:
      /\b(donat\w*|voluntary (support|contribution\w*|assistance)|volunteer\w*|non[- ]?profit|not[- ]for[- ]profit|(learning lab|lab|initiative) (run |operated |a )?for[- ]profit|is (this|it) for[- ]profit|financial support|support (the |your |this )?(learning lab|lab|initiative)|contribut\w* (to|towards?|for) (the |your |this )?(learning lab|lab|initiative|infrastructure|content)|help (improve|build|fund|develop|create) (the |your |lab )?(learning )?(content|infrastructure))\b/i,
    reply: answer(
      "The Learning Lab is currently run on a not-for-profit basis. Voluntary assistance and donations help improve learning content and infrastructure. Visit Support the Lab to offer expertise or use the original PhonePe QR to donate any amount. The image prints SWAPNIL SAHOO; check the recipient in your payment app before sending. All six free courses remain ₹0. A donation does not purchase enrolment, assessment or a certificate. This website cannot verify a transfer or issue an automatic confirmation; paid course checkout remains closed.",
      [support, donationQr, freeLibrary],
      ["How can I support the Lab?", "What can I learn for free?", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(who are you|are you (a human|human|real|ai|dr\.?|professor|swapnil|sahoo|the founder)|is this (a human|human|ai|dr\.?|professor|swapnil|sahoo)|live (person|teacher|professor)|digital avatar|ai mentor|chat ?bot|guided answers?|how (does|do) (this|you) work)\b/i,
    reply: answer(
      "This is an AI Mentor with prepared guidance based on Dr. Swapnil Sahoo’s published teaching materials. Open Learning tools to find a path, explain a lesson, practise a case or review reasoning. Arithmetic checks and checklist feedback are automated practice support, not formal grading. The popup opens with a prerecorded synthetic-voice welcome; voice and text share the conversation below it. Spoken prepared answers animate an AI-created likeness with a standard device voice. This is not Dr. Sahoo speaking live or a trained conversational video replica; no founder voice has been cloned.",
      [freeLibrary, { label: "Meet the founder", href: `${lab}/founder` }, contact],
      ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(privacy|private|personal data|confidential|store|stored|storage|save|saved|remember|retain|retention|delete|clear chat|conversation history|browser|tracking|send my (message|data)|ai provider)\b/i,
    reply: answer(
      "Guided answers are selected in your browser, and this assistant does not save conversations. Optional read-aloud uses your browser or device voice service; speech processing depends on the selected service. Avoid entering personal, student, employer or confidential information. Free-course notes have a separate, optional ‘Save in this browser’ control; those notes can be read by someone using the same browser profile and can be cleared there. Opening an email link uses your own email app, where you decide whether to send the message. Read the published privacy notice for the wider Learning Lab service.",
      [{ label: "Read the Lab privacy notice", href: `${lab}/policies/privacy` }, freeLibrary],
      ["What can I learn for free?", "How do the certificates work?", "Contact the Lab"]
    ),
  },
  {
    matches: /\b(qr|upi|payment code|scan to pay|payee|bank details|account number)\b/i,
    reply: answer(
      "The Support the Lab page displays Dr. Swapnil Sahoo’s original PhonePe QR for optional donations of any amount. The image prints the payee name SWAPNIL SAHOO; check the recipient shown in your payment app before sending. Your payment app handles the transfer. This website has no donation checkout or transaction verification, and it cannot confirm receipt automatically. Donations support infrastructure and content, not course enrolment or certificates. Paid course checkout remains closed, and the six free courses remain ₹0.",
      [donationQr, support, contact],
      ["How can I support the Lab?", "What can I learn for free?", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(mba|pgpm|13[ -]?sessions?|thirteen sessions?|session\s*\d+|course[- ]map|course outline|revised outline|one[- ]year course|1[- ]year course)\b/i,
    reply: answer(
      "The one-year MBA strategy course has a 13-session course map on the academic teaching website. Start with that map to see the sequence and open the session pages. Session 1 provides the introduction and starting activities. These academic teaching pages are separate from the Learning Lab’s free mini-courses and proposed full programmes; the assistant does not record attendance, assess work or enrol you in the MBA course.",
      [
        { label: "Open the 13-session MBA course map", href: "/teaching/1-year-mba#course-map" },
        { label: "Start with MBA Session 1", href: "/teaching/1-year-mba/session1.html" },
        { label: "Academic teaching resources", href: "/teaching" },
      ],
      [
        "Help me make a strategic trade-off",
        "What can I learn for free?",
        "Who is Dr. Swapnil Sahoo?",
      ]
    ),
  },
  {
    matches:
      /\b(certificat\w*|accredit\w*|degree|recognised qualification|recognized qualification|completion|attendance|assessment|rubric|marks|grades?)\b|80\s*%|60\s*\/\s*100/i,
    reply: answer(
      "The six free mini-courses are open self-practice: they do not include individual assessment or a certificate. The proposed full Lab programmes publish different requirements: complete all six assigned lessons, attend at least 80% of scheduled live learning time and earn an instructor-approved capstone score of at least 60/100, with human approval. An enquiry, payment or completed demonstration does not establish eligibility. A Lab completion certificate is not a degree, recognised qualification or claim of accreditation. Check the programme and draft certificate policy for the applicable details.",
      [
        { label: "Read the proposed certificate policy", href: `${lab}/policies/certificates` },
        { label: "Explore programme rubrics", href: programmes },
        freeLibrary,
      ],
      ["What can I learn for free?", "Are paid courses open?", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(task[- ]?brief|ai brief|prompt\w*|instruction contract|output contract|permitted inputs?|missing information)\b/i,
    reply: answer(
      "Start with ‘Give your AI task a clear brief’. The free course helps you define the permitted inputs, task boundary, output checks and named human reviewer. Its fictional room-booking example asks you to flag missing information instead of inventing a price or confirming availability. You leave with a reusable brief and a five-point checklist. It takes about 20 minutes and needs no AI account or paid software.",
      [
        { label: "Start the free AI task-brief course", href: `${free}/write-an-ai-task-brief` },
        { label: "Explore AI for Managers", href: `${programmes}/ai-for-managers` },
      ],
      [
        "How do I evaluate an AI workflow?",
        "What can I learn for free?",
        "How do the certificates work?",
      ]
    ),
  },
  {
    matches:
      /\b(evaluat\w*|hallucinat\w*|accuracy|benchmark\w*|human review|critical failure)\b|\b(test|trust|check)\b.{0,35}\bai\b|\bai\b.{0,35}\b(test|trust|check|reliab\w*)\b/i,
    reply: answer(
      "Try ‘Test AI before you trust the workflow’. Define acceptable handling and a critical failure before testing ten varied synthetic cases. Compare complete handling time, including review, correction and escalation, alongside output quality. The fictional result saves time but includes invented approval, so it supports investigation and revision under review rather than unsupervised adoption. A small evaluation reveals behaviour on the cases tested; it does not guarantee future accuracy.",
      [
        { label: "Start the free AI evaluation course", href: `${free}/test-ai-before-adoption` },
        { label: "Explore AI for Managers", href: `${programmes}/ai-for-managers` },
      ],
      ["Help me write an AI task brief", "What can I learn for free?", "Are paid courses open?"]
    ),
  },
  {
    matches:
      /\b(unit[- ]?economics?|break[- ]?even|contribution|margins?|variable costs?|fixed costs?|discount\w*|profit\w*|pricing decision)\b/i,
    reply: answer(
      "Use ‘Read your unit economics before you grow’. Define a unit and period, subtract variable cost from price to find contribution and compare break-even volume with feasible capacity. In the fictional lunch case, ₹150 price minus ₹90 variable cost leaves ₹60 contribution; ₹12,000 fixed costs require 200 lunches. A ₹120 price leaves ₹30 contribution and requires 400 lunches, above the stated 300-lunch capacity. These are simplified educational inputs, not a price recommendation or complete accounting result.",
      [
        { label: "Start the free unit-economics course", href: `${free}/read-your-unit-economics` },
        {
          label: "Explore Strategy and Case Thinking",
          href: `${programmes}/strategy-case-thinking`,
        },
      ],
      [
        "Help me make a strategic trade-off",
        "How do I test a business idea?",
        "What can I learn for free?",
      ]
    ),
  },
  {
    matches:
      /\b(affordable[- ]?loss|effectuat\w*|cash (limit|ceiling)|time limit|limited resources|resource constraints?|bounded experiment|first experiment)\b/i,
    reply: answer(
      "Try ‘Set an affordable loss for your first experiment’. List the means you already have, set cash and time limits and divide the experiment into stages. Each stage should answer a specific uncertainty before you commit more. The fictional plant-care founder tests conversations and a few scoped appointments instead of buying a full launch kit. Write stop and continue rules based on observed behaviour; spending the budget or receiving compliments is not evidence to expand.",
      [
        { label: "Start the free affordable-loss course", href: `${free}/set-an-affordable-loss` },
        {
          label: "Explore Entrepreneurship Under Constraint",
          href: `${programmes}/entrepreneurship-under-constraint`,
        },
      ],
      [
        "How do I interview customers?",
        "How do I calculate unit economics?",
        "What can I learn for free?",
      ]
    ),
  },
  {
    matches:
      /\b(14[- ]?day|fourteen[- ]?day|student entrepreneur\w*|business idea|startup idea|venture experiment|founder feedback)\b/i,
    reply: answer(
      "The Lab's current focus is a free 14-day venture experiment for first-time college entrepreneurs aged 18 or over. Set a time and money boundary, investigate recent customer behaviour, run one small offer test, and use the evidence to continue, change or stop. Zero spending is valid. The public planner adapts the next task to your constraints; it does not assess your work. An optional pilot has up to 20 active places for written feedback from Dr. Sahoo in a private workspace. Registration and a saved submission are not a completed experiment or an instant review. This assistant cannot enrol you or give the founder's personal feedback.",
      [venture, { label: "Read all 14 daily tasks", href: `${venture.href}#plan` }, toolkitHub],
      [
        "How do I set an affordable loss?",
        "How do I interview customers?",
        "What can I learn for free?",
      ]
    ),
  },
  {
    matches:
      /\b(customer\w*|discovery|interview\w*|validat\w*|demand|willingness to pay|business idea|startup idea|problem interviews?)\b/i,
    reply: answer(
      "Start with ‘Ask customer questions that reveal behaviour’. Ask about the last time the problem occurred, what the person did, the alternative used and the actual effort or cost. The free course provides a five-question guide and an evidence log. Keep reported behaviour, your interpretation and contrary evidence separate. Interest in receiving details, a booking, attendance, payment and repeat use are different events. The next test should examine one remaining uncertainty with people who voluntarily opt in.",
      [
        {
          label: "Start the free customer-discovery course",
          href: `${free}/ask-better-customer-questions`,
        },
        { label: "Copy word-for-word customer scripts", href: `${toolkit}/talk-to-customers` },
        { label: "Set an affordable-loss limit", href: `${free}/set-an-affordable-loss` },
      ],
      [
        "How do I set an affordable loss?",
        "How do I calculate unit economics?",
        "What can I learn for free?",
      ]
    ),
  },
  {
    matches:
      /\b(trade[- ]?offs?|strateg\w*|positioning|competitive advantage|case[- ]thinking|case analysis|customer promise)\b/i,
    reply: answer(
      "For strategy, begin with ‘Make a strategic choice you can defend’, then try the unit-economics course. Choose a specific customer promise, connect it to supporting activities and name a request you will decline to protect that promise. The fictional delivery case makes the capacity conflict visible. Write the uncertain assumption that could reverse your choice and a bounded test of it. Strategy and Case Thinking is the proposed deeper programme, with a published capstone and rubric.",
      [
        {
          label: "Start the free strategic-choice course",
          href: `${free}/make-a-strategic-tradeoff`,
        },
        { label: "Check the unit economics", href: `${free}/read-your-unit-economics` },
        {
          label: "Explore Strategy and Case Thinking",
          href: `${programmes}/strategy-case-thinking`,
        },
      ],
      [
        "Show me the 13-session MBA course",
        "How do I calculate unit economics?",
        "Are paid courses open?",
      ]
    ),
  },
  {
    matches:
      /\b(fees?|price|pricing|paid|purchase|pay|payments?|checkout|refund\w*|enrol\w*|enroll\w*|register|registration|cohort|start date|dates?|schedule|timetable|rupees?)\b|₹|\brs\.?\s*\d+/i,
    reply: answer(
      "The six free mini-courses cost ₹0 and require no account. Full Learning Lab programmes remain proposed: payable fees, dates and places are unconfirmed, and paid course checkout remains closed. Optional donations through the Support the Lab QR are separate from course fees and do not reserve a place or confirm enrolment. This guide cannot take payment or verify a transfer. Visit Contact for current enquiry options, or email the Lab to ask about a programme; opening the email link does not send it automatically.",
      [freeLibrary, { label: "Check programme availability", href: programmes }, support, contact],
      ["What can I learn for free?", "Is a payment QR available?", "How do the certificates work?"]
    ),
  },
  {
    matches:
      /\b(contact|email|speak|talk to|support|college\w*|institution\w*|team training|book a call|booking)\b/i,
    reply: answer(
      "The approved published contact is swapnil.s@greatlakes.edu.in. Use the Lab’s contact page for a programme question or the college page to discuss an online institutional pilot. The email route opens your own email app; you must review and send the message. This assistant does not send an enquiry, make a booking or promise a response time. Academic affiliations describe the founder’s background and do not imply sponsorship of the Lab.",
      [
        contact,
        { label: "Discuss an institutional pilot", href: `${lab}/for-colleges` },
        { label: "Open an email to the Lab", href: "mailto:swapnil.s@greatlakes.edu.in" },
      ],
      ["Who is Dr. Swapnil Sahoo?", "Are paid courses open?", "What can I learn for free?"]
    ),
  },
  {
    matches:
      /\b(swapnil|sahoo|founder|profile|biograph\w*|xlri|ximb|great lakes|faculty|corporate experience|qualifications?|credentials?)\b/i,
    reply: answer(
      "Dr. Swapnil Sahoo holds a Ph.D. from XLRI Jamshedpur in Entrepreneurship and Innovation, an MBA from XIMB and a B.Tech from Utkal University. His published founder page describes 17 years of corporate experience in strategic and partnership roles. His teaching focuses on strategy, entrepreneurship and applied AI in management. The Learning Lab is an independent initiative; prior affiliations do not establish institutional sponsorship or Lab learner outcomes.",
      [
        { label: "Read the founder’s background", href: `${lab}/founder` },
        { label: "Open the academic profile", href: "/#about" },
        { label: "Explore academic teaching", href: "/teaching" },
      ],
      ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"]
    ),
  },
  {
    matches:
      /\b(ai|artificial intelligence|generative ai|automation|machine learning|ai for managers)\b/i,
    reply: answer(
      "For applied AI, start with two free courses: write a task brief, then evaluate the whole workflow. You will practise permitted inputs, output checks, human review and a small synthetic test set. No paid software or coding is required for these exercises. AI for Managers is the proposed deeper learning path, built around a workflow pilot, evaluation evidence and a human-owned adoption decision.",
      [
        { label: "Write an AI task brief", href: `${free}/write-an-ai-task-brief` },
        { label: "Evaluate an AI workflow", href: `${free}/test-ai-before-adoption` },
        { label: "Explore AI for Managers", href: `${programmes}/ai-for-managers` },
      ],
      [
        "Help me write an AI task brief",
        "How do I evaluate an AI workflow?",
        "Are paid courses open?",
      ]
    ),
  },
  {
    matches:
      /\b(entrepreneur\w*|startup\w*|start[- ]up|venture\w*|start a business|start my business|budget|constraints?)\b/i,
    reply: answer(
      "For entrepreneurship, start the free 14-day venture experiment for adult college students with an idea and limited money. Bound your commitment, investigate recent customer behaviour, run a small test and make an evidence-based decision. Stopping can be a successful outcome. The public planner is open without registration; the optional founder-feedback pilot has up to 20 active places. The affordable-loss and customer-question mini-courses offer extra practice. The separate full Entrepreneurship Under Constraint programme remains proposed.",
      [
        venture,
        { label: "Set an affordable-loss limit", href: `${free}/set-an-affordable-loss` },
        { label: "Ask better customer questions", href: `${free}/ask-better-customer-questions` },
        {
          label: "Explore Entrepreneurship Under Constraint",
          href: `${programmes}/entrepreneurship-under-constraint`,
        },
      ],
      [
        "How do I set an affordable loss?",
        "How do I interview customers?",
        "How do I calculate unit economics?",
      ]
    ),
  },
  {
    matches:
      /\b(free|mini[- ]?courses?|self[- ]paced|self[- ]study|learning paths?|learn|learning|teaching|courses?|programmes?|programs?|library|resources?|start|help|hello|hi|hey)\b/i,
    reply: answer(
      "The Lab's current focus is a free 14-day customer experiment for first-time adult college entrepreneurs. Its public planner requires no registration; optional private founder feedback has up to 20 active places. You can also choose six free mini-courses in applied AI, strategy and entrepreneurship, each with short lessons, a fictional decision exercise, a checkpoint and a downloadable worksheet. Most mini-courses take about 20–25 minutes and need no account, payment or paid AI tool.",
      [venture, freeLibrary, { label: "Explore the proposed full programmes", href: programmes }],
      [
        "Help me write an AI task brief",
        "Help me make a strategic trade-off",
        "How do I test a business idea?",
      ]
    ),
  },
];

export function getGuidedReply(message: string, lesson?: MentorLesson): AvatarReply {
  const query = message.trim().normalize("NFKC").slice(0, 1200);
  if (
    lesson &&
    /\b(explain|summari[sz]e|what (is|does)|help me understand)\b.*\b(this|current|the) lesson\b|\bexplain this\b/i.test(
      query
    )
  ) {
    return answer(
      lessonExplanation(lesson),
      [{ label: `Source: ${lesson.title}`, href: new URL(lesson.canonicalUrl).pathname }],
      ["What can I learn for free?", "Who are you?", "Contact the Lab"]
    );
  }
  const topic = topics.find((item) => item.matches.test(query));
  const reply =
    topic?.reply ??
    answer(
      "I can point you to the published learning resources and explain their stated availability. Which would help: an AI task brief, AI evaluation, a strategic trade-off, unit economics, an affordable-loss experiment, customer discovery or the 13-session MBA course? For a personal, programme-specific or unsupported question, contact the Lab directly. This guided mode does not invent an answer or contact anyone on your behalf.",
      [freeLibrary, contact],
      ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"]
    );

  // Return fresh arrays so a caller cannot change the shared prepared replies.
  return {
    text: reply.text,
    links: reply.links.map((link) => ({ ...link })),
    suggestions: [...reply.suggestions],
  };
}
