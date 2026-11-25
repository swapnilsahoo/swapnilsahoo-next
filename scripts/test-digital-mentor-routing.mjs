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

console.log(
  `PASS mentor routing: ${existing.length} existing answers unchanged, ${student.length} student questions reach the founder toolkit, ${products.length} product questions reach AI Viva Bot.`
);
