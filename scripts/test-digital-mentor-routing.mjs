import assert from "node:assert/strict";
import { getGuidedReply } from "../src/features/digital-avatar/knowledge.ts";

const hrefs = (question) => getGuidedReply(question).links.map(({ href }) => href);
const routesTo = (question, fragment) =>
  assert.ok(
    hrefs(question).some((href) => href.includes(fragment)),
    `${question} -> expected ${fragment}, got ${hrefs(question).join(", ")}`
  );

// Existing prepared answers keep their grounded links (mirrors scripts/test-digital-guide.mjs).
const existing = [
  ["Help me write an AI task brief", "write-an-ai-task-brief"],
  ["How do I evaluate an AI workflow?", "test-ai-before-adoption"],
  ["Help me make a strategic trade-off", "make-a-strategic-tradeoff"],
  ["How do I calculate unit economics?", "read-your-unit-economics"],
  ["How do I set an affordable loss?", "set-an-affordable-loss"],
  ["How do I interview customers?", "ask-better-customer-questions"],
  ["Show me the 13-session MBA course", "/teaching/1-year-mba#course-map"],
  ["Are paid courses open?", "/learning-lab/programmes"],
  ["Is a payment QR available?", "/learning-lab/support#donate"],
  ["What is the weather on Mars?", "/learning-lab/contact"],
];
for (const [question, fragment] of existing) routesTo(question, fragment);

// Real first-time founder questions now reach the toolkit instead of admin answers.
const student = [
  ["I want to sell homemade snacks in my college. How do I start?", "/toolkit/test-playbooks"],
  ["I am scared to talk to strangers", "/toolkit/talk-to-customers"],
  ["How do I price my snacks?", "read-your-unit-economics"],
  ["How can I save money while testing my idea?", "/toolkit/test-playbooks"],
  ["Should I sell through a local store?", "/toolkit/test-playbooks"],
  ["Should I build an app first?", "do-it-by-hand"],
  ["My friends said they love my idea. Is that enough?", "#signals"],
  ["Nobody replied to my messages. What now?", "#giving-up"],
  ["Is my idea good?", "/toolkit/idea-filter"],
  ["What free tools can I use?", "/toolkit/free-tools"],
  ["How do I run this in my E-Cell?", "/toolkit/facilitator-kit"],
  ["Business idea kaise test karu?", "#hindi"],
  ["मुझे बिज़नेस शुरू करना है", "#hindi"],
  ["Do you have templates or scripts?", "/learning-lab/toolkit"],
];
for (const [question, fragment] of student) routesTo(question, fragment);

// Admin questions that legitimately contain those words still reach their answers.
routesTo("What are the fees for the programme?", "/learning-lab/programmes");
routesTo("Do you store my conversation?", "/policies/privacy");
routesTo("How do I test a business idea?", "/learning-lab/venture-experiment");
routesTo("Who is Dr. Swapnil Sahoo?", "/learning-lab/founder");

// Lab products reach the Products page; a student's own "products" questions still reach the toolkit.
const products = [
  "What products does the Lab have?",
  "Show me the AI Viva Bot",
  "Can I try the oral exam tool?",
];
for (const question of products) routesTo(question, "/learning-lab/products");
for (const question of [
  "What products should I sell in my hostel?",
  "How should I price my product?",
])
  assert.ok(
    !hrefs(question).some((href) => href.includes("/learning-lab/products")),
    `${question} should not reach the Lab products page`
  );

// The seven-module journey answers questions about the journey itself, without taking over
// "How do I test a business idea?" (asserted above) or the student questions.
const journey = [
  "What are the seven modules?",
  "Show me the entrepreneurship journey",
  "Is there a startup curriculum?",
  "Tell me about From Startup Idea to Venture Growth",
  "What is the knowing-doing gap?",
  "What is in module 5 of the journey?",
];
// The dedicated journey answer leads with the journey; the general entrepreneurship answer also
// links it, but second.
for (const question of journey)
  assert.equal(
    hrefs(question)[0],
    "/learning-lab/entrepreneurship",
    `${question} -> dedicated journey answer`
  );
for (const question of ["How do I test a business idea?", "Is my idea good?"])
  assert.ok(
    !hrefs(question).some((href) => href.startsWith("/learning-lab/entrepreneurship")),
    `${question} should keep its own answer`
  );
// Other pages with their own modules, pathways or journeys keep their answers.
for (const question of [
  "What was Dr. Sahoo's founder journey?",
  "What are the modules in Entrepreneurship Under Constraint?",
  "What does module 3 of Hiring Your First Five People cover?",
  "Tell me about the Research & Entrepreneurship pathway",
])
  assert.notEqual(
    hrefs(question)[0],
    "/learning-lab/entrepreneurship",
    `${question} should not get the journey answer`
  );
routesTo("What was Dr. Sahoo's founder journey?", "/learning-lab/founder");
routesTo(
  "What are the modules in Entrepreneurship Under Constraint?",
  "entrepreneurship-under-constraint"
);
routesTo("I want to become an entrepreneur", "/learning-lab/entrepreneurship");

// The company's services and purpose; a student's own "services" or "purpose" questions stay out.
const company = [
  "What services do you offer?",
  "What does the Lab offer?",
  "Show me your services",
  "What is the purpose of the Learning Lab?",
  "What is your company's mission?",
  "Why does the Lab exist?",
];
for (const question of company)
  assert.equal(
    hrefs(question)[0],
    "/learning-lab/services",
    `${question} -> dedicated services answer`
  );
for (const question of [
  "What services should I offer to customers?",
  "How do I improve my customer service?",
  "What is the purpose of my business?",
])
  assert.ok(
    !hrefs(question).some((href) => href.startsWith("/learning-lab/services")),
    `${question} should not reach the Lab services page`
  );

console.log(
  `PASS mentor routing: ${existing.length} existing answers unchanged, ${student.length} student questions reach the founder toolkit, ${products.length} product questions reach AI Viva Bot, ${journey.length} journey questions reach the seven-module journey, ${company.length} company questions reach the services and purpose.`
);
