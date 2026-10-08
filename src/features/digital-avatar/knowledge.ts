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
const support = { label: "Support the Lab", href: `${lab}/support` };

export const starters = [
  "What can I learn for free?",
  "Help me write an AI task brief",
  "Show me the 13-session MBA course",
  "How do I test a business idea?",
  "Are paid courses open?",
  "Who is Dr. Swapnil Sahoo?",
];

function answer(
  text: string,
  links: AvatarReply["links"],
  suggestions: string[],
): AvatarReply {
  return {
    text: `Guided answer from the published website: ${text}`,
    links,
    suggestions,
  };
}

// Prepared website guidance only. This module has no network, storage, account,
// assessment or payment actions and does not generate answers with a language model.
const topics: GuidedTopic[] = [
  {
    matches:
      /\b(donat\w*|voluntary (support|contribution\w*|assistance)|volunteer\w*|non[- ]?profit|not[- ]for[- ]profit|(learning lab|lab|initiative) (run |operated |a )?for[- ]profit|is (this|it) for[- ]profit|financial support|support (the |your |this )?(learning lab|lab|initiative)|contribut\w* (to|towards?|for) (the |your |this )?(learning lab|lab|initiative|infrastructure|content)|help (improve|build|fund|develop|create) (the |your |lab )?(learning )?(content|infrastructure))\b/i,
    reply: answer(
      "The Learning Lab is currently run on a not-for-profit basis. Voluntary assistance and donations are welcome to help improve learning content and infrastructure. The free courses remain free, and a contribution does not purchase enrolment, assessment or a certificate. Visit Support the Lab to discuss content, accessibility, technical or financial assistance by email. No donation payment route is currently published, and this guide cannot take funds or verify a transfer.",
      [support, freeLibrary, contact],
      ["How can I support the Lab?", "What can I learn for free?", "Contact the Lab"],
    ),
  },
  {
    matches:
      /\b(who are you|are you (a human|human|real|ai|dr\.?|professor|swapnil|sahoo|the founder)|is this (a human|human|ai|dr\.?|professor|swapnil|sahoo)|live (person|teacher|professor)|digital avatar|chat ?bot|guided answers?|how (does|do) (this|you) work)\b/i,
    reply: answer(
      "This is a website guide with prepared answers about Dr. Swapnil Sahoo’s published teaching and Learning Lab resources. The portrait identifies whose website you are visiting; replies are not a live conversation with Dr. Sahoo or a human instructor. Choose a topic below to find a useful next page.",
      [freeLibrary, { label: "Meet the founder", href: `${lab}/founder` }, contact],
      ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"],
    ),
  },
  {
    matches:
      /\b(privacy|private|personal data|confidential|store|stored|storage|save|saved|remember|retain|retention|delete|clear chat|conversation history|browser|tracking|send my (message|data)|ai provider)\b/i,
    reply: answer(
      "Guided answers are selected in your browser, and this assistant does not save conversations. Optional read-aloud uses your browser or device voice service; speech processing depends on the selected service. Avoid entering personal, student, employer or confidential information. Free-course notes have a separate, optional ‘Save in this browser’ control; those notes can be read by someone using the same browser profile and can be cleared there. Opening an email link uses your own email app, where you decide whether to send the message. Read the published privacy notice for the wider Learning Lab service.",
      [{ label: "Read the Lab privacy notice", href: `${lab}/policies/privacy` }, freeLibrary],
      ["What can I learn for free?", "How do the certificates work?", "Contact the Lab"],
    ),
  },
  {
    matches: /\b(qr|upi|payment code|scan to pay|payee|bank details|account number)\b/i,
    reply: answer(
      "Payment instructions are not currently published. Check programme availability or contact Dr. Swapnil Sahoo before making any payment. This guide cannot create a payment code, confirm a payee or verify a transfer. No payment or place reservation is created here.",
      [contact],
      ["Are paid courses open?", "What can I learn for free?", "Contact the Lab"],
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
      ["Help me make a strategic trade-off", "What can I learn for free?", "Who is Dr. Swapnil Sahoo?"],
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
      ["What can I learn for free?", "Are paid courses open?", "Contact the Lab"],
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
      ["How do I evaluate an AI workflow?", "What can I learn for free?", "How do the certificates work?"],
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
      ["Help me write an AI task brief", "What can I learn for free?", "Are paid courses open?"],
    ),
  },
  {
    matches:
      /\b(unit[- ]?economics?|break[- ]?even|contribution|margins?|variable costs?|fixed costs?|discount\w*|profit\w*|pricing decision)\b/i,
    reply: answer(
      "Use ‘Read your unit economics before you grow’. Define a unit and period, subtract variable cost from price to find contribution and compare break-even volume with feasible capacity. In the fictional lunch case, ₹150 price minus ₹90 variable cost leaves ₹60 contribution; ₹12,000 fixed costs require 200 lunches. A ₹120 price leaves ₹30 contribution and requires 400 lunches, above the stated 300-lunch capacity. These are simplified educational inputs, not a price recommendation or complete accounting result.",
      [
        { label: "Start the free unit-economics course", href: `${free}/read-your-unit-economics` },
        { label: "Explore Strategy and Case Thinking", href: `${programmes}/strategy-case-thinking` },
      ],
      ["Help me make a strategic trade-off", "How do I test a business idea?", "What can I learn for free?"],
    ),
  },
  {
    matches:
      /\b(affordable[- ]?loss|effectuat\w*|cash (limit|ceiling)|time limit|limited resources|resource constraints?|bounded experiment|first experiment)\b/i,
    reply: answer(
      "Try ‘Set an affordable loss for your first experiment’. List the means you already have, set cash and time limits and divide the experiment into stages. Each stage should answer a specific uncertainty before you commit more. The fictional plant-care founder tests conversations and a few scoped appointments instead of buying a full launch kit. Write stop and continue rules based on observed behaviour; spending the budget or receiving compliments is not evidence to expand.",
      [
        { label: "Start the free affordable-loss course", href: `${free}/set-an-affordable-loss` },
        { label: "Explore Entrepreneurship Under Constraint", href: `${programmes}/entrepreneurship-under-constraint` },
      ],
      ["How do I interview customers?", "How do I calculate unit economics?", "What can I learn for free?"],
    ),
  },
  {
    matches:
      /\b(customer\w*|discovery|interview\w*|validat\w*|demand|willingness to pay|business idea|startup idea|problem interviews?)\b/i,
    reply: answer(
      "Start with ‘Ask customer questions that reveal behaviour’. Ask about the last time the problem occurred, what the person did, the alternative used and the actual effort or cost. The free course provides a five-question guide and an evidence log. Keep reported behaviour, your interpretation and contrary evidence separate. Interest in receiving details, a booking, attendance, payment and repeat use are different events. The next test should examine one remaining uncertainty with people who voluntarily opt in.",
      [
        { label: "Start the free customer-discovery course", href: `${free}/ask-better-customer-questions` },
        { label: "Set an affordable-loss limit", href: `${free}/set-an-affordable-loss` },
        { label: "Explore Entrepreneurship Under Constraint", href: `${programmes}/entrepreneurship-under-constraint` },
      ],
      ["How do I set an affordable loss?", "How do I calculate unit economics?", "What can I learn for free?"],
    ),
  },
  {
    matches:
      /\b(trade[- ]?offs?|strateg\w*|positioning|competitive advantage|case[- ]thinking|case analysis|customer promise)\b/i,
    reply: answer(
      "For strategy, begin with ‘Make a strategic choice you can defend’, then try the unit-economics course. Choose a specific customer promise, connect it to supporting activities and name a request you will decline to protect that promise. The fictional delivery case makes the capacity conflict visible. Write the uncertain assumption that could reverse your choice and a bounded test of it. Strategy and Case Thinking is the proposed deeper programme, with a published capstone and rubric.",
      [
        { label: "Start the free strategic-choice course", href: `${free}/make-a-strategic-tradeoff` },
        { label: "Check the unit economics", href: `${free}/read-your-unit-economics` },
        { label: "Explore Strategy and Case Thinking", href: `${programmes}/strategy-case-thinking` },
      ],
      ["Show me the 13-session MBA course", "How do I calculate unit economics?", "Are paid courses open?"],
    ),
  },
  {
    matches:
      /\b(fees?|price|pricing|paid|purchase|pay|payments?|checkout|refund\w*|enrol\w*|enroll\w*|register|registration|cohort|start date|dates?|schedule|timetable|rupees?)\b|₹|\brs\.?\s*\d+/i,
    reply: answer(
      "The free mini-courses cost ₹0 and require no account. Full Learning Lab programmes remain proposed: payable fees, dates and places are unconfirmed, and checkout is not ready. This guide cannot take payment, reserve a place or confirm enrolment. Email the Lab to ask about a programme; opening the email link does not send it automatically. Rely on the published offer and applicable terms once a specific paid programme is available.",
      [freeLibrary, { label: "Check programme availability", href: programmes }, contact],
      ["What can I learn for free?", "Is a payment QR available?", "How do the certificates work?"],
    ),
  },
  {
    matches: /\b(contact|email|speak|talk to|support|college\w*|institution\w*|team training|book a call|booking)\b/i,
    reply: answer(
      "The approved published contact is swapnil.s@greatlakes.edu.in. Use the Lab’s contact page for a programme question or the college page to discuss an online institutional pilot. The email route opens your own email app; you must review and send the message. This assistant does not send an enquiry, make a booking or promise a response time. Academic affiliations describe the founder’s background and do not imply sponsorship of the Lab.",
      [
        contact,
        { label: "Discuss an institutional pilot", href: `${lab}/for-colleges` },
        { label: "Open an email to the Lab", href: "mailto:swapnil.s@greatlakes.edu.in" },
      ],
      ["Who is Dr. Swapnil Sahoo?", "Are paid courses open?", "What can I learn for free?"],
    ),
  },
  {
    matches: /\b(swapnil|sahoo|founder|profile|biograph\w*|xlri|ximb|great lakes|faculty|corporate experience|qualifications?|credentials?)\b/i,
    reply: answer(
      "Dr. Swapnil Sahoo holds a Ph.D. from XLRI Jamshedpur in Entrepreneurship and Innovation, an MBA from XIMB and a B.Tech from Utkal University. His published founder page describes 17 years of corporate experience in strategic and partnership roles. His teaching focuses on strategy, entrepreneurship and applied AI in management. The Learning Lab is an independent initiative; prior affiliations do not establish institutional sponsorship or Lab learner outcomes.",
      [
        { label: "Read the founder’s background", href: `${lab}/founder` },
        { label: "Open the academic profile", href: "/#about" },
        { label: "Explore academic teaching", href: "/teaching" },
      ],
      ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"],
    ),
  },
  {
    matches: /\b(ai|artificial intelligence|generative ai|automation|machine learning|ai for managers)\b/i,
    reply: answer(
      "For applied AI, start with two free courses: write a task brief, then evaluate the whole workflow. You will practise permitted inputs, output checks, human review and a small synthetic test set. No paid software or coding is required for these exercises. AI for Managers is the proposed deeper learning path, built around a workflow pilot, evaluation evidence and a human-owned adoption decision.",
      [
        { label: "Write an AI task brief", href: `${free}/write-an-ai-task-brief` },
        { label: "Evaluate an AI workflow", href: `${free}/test-ai-before-adoption` },
        { label: "Explore AI for Managers", href: `${programmes}/ai-for-managers` },
      ],
      ["Help me write an AI task brief", "How do I evaluate an AI workflow?", "Are paid courses open?"],
    ),
  },
  {
    matches: /\b(entrepreneur\w*|startup\w*|start[- ]up|venture\w*|start a business|start my business|budget|constraints?)\b/i,
    reply: answer(
      "For entrepreneurship, combine the free affordable-loss and customer-discovery courses. Bound the money, time and promises of your first test, then ask about recent customer behaviour before committing to a solution. Keep observations distinct from forecasts and compliments. Entrepreneurship Under Constraint is the proposed deeper programme, with a published capstone and rubric focused on evidence, resource commitments and the next decision.",
      [
        { label: "Set an affordable-loss limit", href: `${free}/set-an-affordable-loss` },
        { label: "Ask better customer questions", href: `${free}/ask-better-customer-questions` },
        { label: "Explore Entrepreneurship Under Constraint", href: `${programmes}/entrepreneurship-under-constraint` },
      ],
      ["How do I set an affordable loss?", "How do I interview customers?", "How do I calculate unit economics?"],
    ),
  },
  {
    matches:
      /\b(free|mini[- ]?courses?|self[- ]paced|self[- ]study|learning paths?|learn|learning|teaching|courses?|programmes?|programs?|library|resources?|start|help|hello|hi|hey)\b/i,
    reply: answer(
      "Choose one of six free, self-paced mini-courses in applied AI, strategy and entrepreneurship. Each has three short lessons, a fictional decision exercise with written feedback, a checkpoint and a downloadable worksheet. Most take about 20–25 minutes; no account, payment or paid AI tool is required. Start with the skill you need today, keep your work and use the related programme page to explore a deeper path.",
      [freeLibrary, { label: "Explore the proposed full programmes", href: programmes }],
      ["Help me write an AI task brief", "Help me make a strategic trade-off", "How do I test a business idea?"],
    ),
  },
];

export function getGuidedReply(message: string): AvatarReply {
  const query = message.trim().normalize("NFKC").slice(0, 1200);
  const topic = topics.find((item) => item.matches.test(query));
  const reply = topic?.reply ?? answer(
    "I can point you to the published learning resources and explain their stated availability. Which would help: an AI task brief, AI evaluation, a strategic trade-off, unit economics, an affordable-loss experiment, customer discovery or the 13-session MBA course? For a personal, programme-specific or unsupported question, contact the Lab directly. This guided mode does not invent an answer or contact anyone on your behalf.",
    [freeLibrary, contact],
    ["What can I learn for free?", "Show me the 13-session MBA course", "Contact the Lab"],
  );

  // Return fresh arrays so a caller cannot change the shared prepared replies.
  return {
    text: reply.text,
    links: reply.links.map((link) => ({ ...link })),
    suggestions: [...reply.suggestions],
  };
}
