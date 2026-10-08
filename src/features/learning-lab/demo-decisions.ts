import type { LabProgrammeSlug } from "./types";

type Decision = {
  question: string;
  choices: { title: string; feedback: string }[];
};

export const demoDecisions: Record<LabProgrammeSlug, Decision[]> = {
  "ai-for-managers": [
    {
      question: "What will you ask the assistant to do first?",
      choices: [
        {
          title: "Draft a reply for a human to check",
          feedback:
            "This keeps the pilot bounded. Supply an approved policy and de-identified message, then measure drafting, review and correction time together. The reviewer owns the refund decision and sending.",
        },
        {
          title: "Send replies and approve refunds automatically",
          feedback:
            "This commits to higher-consequence decisions before the trial has evidence. Split drafting from approval, test policy exceptions and name the person who can pause the process.",
        },
        {
          title: "Summarise de-identified enquiry themes only",
          feedback:
            "This is a plausible lower-consequence alternative. Its value would be better insight, rather than faster individual replies. Test whether summaries preserve minority and exception themes and lead to a useful decision.",
        },
      ],
    },
    {
      question: "What will count as useful pilot evidence?",
      choices: [
        {
          title: "How quickly the first draft appears",
          feedback:
            "Draft speed omits review, correction and exceptions. Paperlane's stated four-minute assisted process must be compared with the six-minute complete baseline, while checking policy quality.",
        },
        {
          title: "Net time, quality and escalation on varied examples",
          feedback:
            "A stronger test covers ordinary enquiries, missing information and refund exceptions. Record total handling time and predefined error categories; agree who reviews failures and when to stop.",
        },
        {
          title: "Whether the replies sound professional",
          feedback:
            "Tone matters, but a polished message can still contain an unsupported policy claim. Define tone alongside factual and policy checks, and measure the complete workflow rather than confidence alone.",
        },
      ],
    },
  ],
  "strategy-case-thinking": [
    {
      question: "Which customer promise will you examine?",
      choices: [
        {
          title: "Reliable fixed-menu office lunches",
          feedback:
            "This choice fits planned batch preparation and stable routes. Declining individual customisation makes the promise more feasible. Test repeat demand, route costs and on-time delivery before committing.",
        },
        {
          title: "Premium individually customised meals",
          feedback:
            "This could work if demand covers coordination and capacity costs. The ₹90 contribution is before those additional costs. Test actual prep and delivery time, and design activities around customisation.",
        },
        {
          title: "Both promises with the existing team",
          feedback:
            "The case states a capacity and coordination conflict. Promising both requires new evidence and an operating design that resolves it. Name the extra resources and costs rather than assume the conflict disappears.",
        },
      ],
    },
    {
      question: "Which missing evidence will you collect next?",
      choices: [
        {
          title: "Demand and contribution after coordination costs",
          feedback:
            "This examines an assumption that can reverse the choice. Trial each offer on a bounded sample and record demand, waste, preparation and routing cost. The most useful evidence depends on the chosen customer promise.",
        },
        {
          title: "A long list of competitors without a decision question",
          feedback:
            "Competitor facts can matter, but an unfocused list does not resolve Noonbox's choice. Ask which alternatives the target customer uses and how they affect demand, price and the service promise.",
        },
        {
          title: "Only the ₹90 per-order figure",
          feedback:
            "At 120 orders, ₹90 gives ₹10,800 before extra coordination and fixed costs. That arithmetic is correct, but it is conditional on demand and delivery capacity. Test the omitted assumptions.",
        },
      ],
    },
  ],
  "entrepreneurship-under-constraint": [
    {
      question: "What is your first commitment?",
      choices: [
        {
          title: "Buy the ₹35,000 equipment kit",
          feedback:
            "That exceeds the stated ₹5,000 affordable-loss limit and commits before customer evidence. Begin with discovery and a smaller authorised test; do not treat uncertain demand as a reason to borrow more.",
        },
        {
          title: "Interview residents and test appointment interest",
          feedback:
            "This can reveal recent problems and current alternatives within the time limit. Ask permission, avoid leading questions and distinguish a concrete appointment request from a compliment. A later real service needs suitable equipment and arrangements.",
        },
        {
          title: "Spend ₹5,000 on branding before discovery",
          feedback:
            "This stays within the money limit but tests little about demand. Preserve resources for the uncertain customer behaviour. A loss boundary is a ceiling, not a spending target.",
        },
      ],
    },
    {
      question: "What would guide the next commitment?",
      choices: [
        {
          title: "Three appointment requests plus a feasible service trial",
          feedback:
            "This is a testable illustrative threshold. Also examine time, costs, safety and whether requests become authorised bookings. Review the evidence before increasing the commitment; three requests do not establish profitable demand.",
        },
        {
          title: "Ten people say the idea sounds interesting",
          feedback:
            "Interest can help you choose whom to interview, but praise does not show a recent problem or willingness to book. Ask about past behaviour and a concrete next action without pressuring participants.",
        },
        {
          title: "Continue regardless so the launch feels successful",
          feedback:
            "A test needs a possible stop or revision outcome. Set the decision rule before results arrive and record counterevidence. Stopping an unsupported idea can be a valuable learning result.",
        },
      ],
    },
  ],
};
