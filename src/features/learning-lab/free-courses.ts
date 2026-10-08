import type { LabProgramme } from "./types";

export type FreeCourse = {
  slug: string;
  title: string;
  category: "Applied AI" | "Strategy" | "Entrepreneurship";
  minutes: number;
  intro: string;
  output: string;
  programmeSlug: LabProgramme["slug"];
  lessons: { title: string; body: string; example: string; tryIt: string }[];
  demo: LabProgramme["demo"];
  sources: LabProgramme["sources"];
};

const aiSources: LabProgramme["sources"] = [
  {
    title: "NIST (2023), AI Risk Management Framework 1.0 — voluntary guidance",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
  },
  {
    title: "NIST (2024), Generative Artificial Intelligence Profile",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
  },
];

export const freeCourses: FreeCourse[] = [
  {
    slug: "write-an-ai-task-brief",
    title: "Give your AI task a clear brief",
    category: "Applied AI",
    minutes: 20,
    intro:
      "Turn a vague request into a task another person can check. Practise defining the input, expected output, evidence and human decision before choosing an AI tool.",
    output: "A reusable task brief with a five-point reviewer checklist.",
    programmeSlug: "ai-for-managers",
    lessons: [
      {
        title: "1. Name the task and its boundary",
        body:
          "A useful brief starts with a person and a decision. Specify the work the assistant may prepare and what remains outside its authority. ‘Help with customers’ leaves both unclear. ‘Draft a room-booking reply for a receptionist to check’ defines a smaller task. Then identify the only permitted inputs. Start this exercise with the invented information below; an AI account is optional. You can test the brief by swapping it with a classmate and asking what they would produce.",
        example:
          "Hypothetical business: Sahaj Desk rents meeting rooms. Its receptionist receives: ‘Can six of us book Friday after 5 pm?’ The supplied policy says rooms close at 6 pm and capacity is eight. There is no dated availability sheet. A draft can explain the policy and request a date and duration; it cannot confirm a booking.",
        tryIt:
          "Write one sentence beginning ‘Prepare…’ and a second beginning ‘Do not…’. Separate drafting from confirming availability or taking payment.",
      },
      {
        title: "2. Make the output inspectable",
        body:
          "An instruction such as ‘be accurate’ gives the reviewer little to inspect. Specify an output structure and a rule for missing information. Require a short draft, a list of facts used and a list of unresolved questions. Ask the assistant to distinguish the supplied policy from its own suggestion. If an essential fact is absent, the draft should say what is missing rather than fill the gap. A tidy format helps review; it does not prove that the content is correct.",
        example:
          "Output contract: at most 100 words; use only the supplied enquiry and policy; list the policy facts separately; flag missing date, duration and room availability; never invent a slot, price or booking confirmation. ‘Friday at 5 pm is available’ fails even if the sentence sounds helpful.",
        tryIt:
          "Add three output checks that a second person could mark pass or revise without guessing your intention.",
      },
      {
        title: "3. Give the reviewer a decision",
        body:
          "Name who checks the draft and what they check before it is sent. Include policy consistency, unsupported facts, unnecessary personal information, missing questions and tone. Choose at least one difficult example, such as a request that extends beyond closing time. The first trial should reveal whether the brief works, not merely whether a draft can be produced. Record what you changed after review. This is a practical exercise in the context, evaluation and responsibility emphasised by NIST’s voluntary risk guidance.",
        example:
          "A second enquiry asks for 5:30–7 pm. The receptionist must catch the conflict with the 6 pm closing time. A suitable draft explains that limit and asks whether an earlier slot would work, without asserting that an earlier slot is available.",
        tryIt:
          "Name the reviewer, write five checks and create one enquiry that could expose a weakness in your brief.",
      },
    ],
    demo: {
      title: "Can this draft be sent?",
      scenario:
        "Original hypothetical exercise: Sahaj Desk has an eight-person meeting room that closes at 6 pm. A customer asks for a six-person booking on Friday from 5:30–7 pm. You have the room policy but no dated availability or price sheet. An assistant writes: ‘Confirmed for Friday, 5:30–7 pm, at ₹800.’ The business, message and amount are invented learning inputs.",
      lesson: [
        "The draft invents a booking and price and conflicts with closing time.",
        "A better brief permits a draft explanation and clarifying questions while reserving booking approval for the receptionist.",
        "Check policy consistency and evidence before judging tone or speed.",
      ],
      task: "Rewrite the task brief and decide how the receptionist should handle the draft.",
      decisions: [
        {
          question: "What will your brief authorise?",
          choices: [
            {
              title: "Draft a reply and identify missing information",
              feedback:
                "This fits the available evidence. The assistant can explain the closing-time limit and ask about an earlier end time. The receptionist must check actual availability and prices before offering a confirmed booking.",
            },
            {
              title: "Confirm any booking that fits the room capacity",
              feedback:
                "Capacity is only one constraint. This request also conflicts with closing time, and no availability sheet is supplied. Add the missing checks and keep confirmation with an authorised person.",
            },
            {
              title: "Choose a likely price and available slot",
              feedback:
                "A plausible number is still unsupported. Require the draft to flag missing price and availability information; provide verified facts or ask the receptionist to obtain them.",
            },
          ],
        },
        {
          question: "Which reviewer check would catch the most serious problem here?",
          choices: [
            {
              title: "Does every claim match an authorised source?",
              feedback:
                "This exposes the invented price and confirmation, as well as the closing-time conflict. Add checks for missing questions and respectful tone after those substantive issues are resolved.",
            },
            {
              title: "Is the reply friendly and under 100 words?",
              feedback:
                "Those are useful presentation checks, but a short, friendly message can make an impossible commitment. Put evidence and policy checks before approval to send.",
            },
            {
              title: "Did the assistant answer without asking a question?",
              feedback:
                "Missing information sometimes makes a question the correct response. Rewarding certainty can encourage invented answers. State which missing facts must be escalated or clarified.",
            },
          ],
        },
      ],
      prompts: [
        "What are the permitted inputs, task boundary and required output?",
        "Which missing facts must the draft flag rather than invent?",
        "Who reviews the reply, and what five checks must pass before sending?",
      ],
      modelAnswer: [
        "Prepare a short reply using only the enquiry and supplied room policy. Explain the 6 pm limit and ask whether a shorter or earlier meeting would work. Do not confirm a booking or quote a price.",
        "Flag the exact date, acceptable duration, current availability and authorised price as unresolved. Include policy facts and open questions separately from the draft.",
        "The receptionist checks evidence, closing time and capacity, unnecessary personal details, unresolved questions and tone. They verify the missing operational facts before making any commitment.",
      ],
      checkpoint: {
        question: "Which addition makes an AI task brief easiest to evaluate?",
        options: [
          "A request to act like the world’s best receptionist.",
          "An output format, permitted evidence, missing-information rule and named reviewer.",
          "A requirement to sound certain in every sentence.",
        ],
        answer: 1,
        explanation:
          "These details turn a broad instruction into observable checks. A role or confident tone does not establish accuracy, authority or a suitable response to missing information.",
      },
    },
    sources: aiSources,
  },
  {
    slug: "test-ai-before-adoption",
    title: "Test AI before you trust the workflow",
    category: "Applied AI",
    minutes: 25,
    intro:
      "Build a small evaluation that reveals errors as well as speed. Compare the whole workflow and write a decision that respects what ten examples can tell you.",
    output: "A ten-case evaluation plan and a short pilot decision.",
    programmeSlug: "ai-for-managers",
    lessons: [
      {
        title: "1. Define success before the trial",
        body:
          "Start with the decision the test must inform: should a team trial AI-assisted purchase-request summaries? Define acceptable output before seeing results. The summary must preserve the requested item, quantity and deadline, identify missing approval and contain no invented supplier commitment. Distinguish an editable omission from a critical error that could authorise spending or expose restricted information. Agree who labels a case and how disagreements are resolved. Otherwise, an attractive result can quietly change the meaning of success.",
        example:
          "Hypothetical team: Ledgerleaf currently spends 12 minutes per purchase request. A reviewer marks each summary ‘acceptable’, ‘needs correction’ or ‘critical failure’. Inventing a supplier’s approval is a critical failure, even when the item description is correct.",
        tryIt:
          "Write two acceptance checks and one critical-failure definition before you read the test results below.",
      },
      {
        title: "2. Include the awkward cases",
        body:
          "A small set is useful when it exercises the task’s boundaries. Build ten synthetic cases: four routine requests, two with a missing field, two with contradictory quantities, one containing irrelevant personal details and one asking the assistant to ignore the approval rule. Record the expected handling before running the test. Keep the same cases and criteria for the baseline and assisted workflow. Ten deliberately selected cases can expose weaknesses; they cannot establish a dependable error rate for every future request.",
        example:
          "Evaluation columns: case ID, case type, expected handling, observed output, error category, draft time, review/correction time and reviewer note. For a contradictory quantity, the expected handling is ‘flag for clarification’, not ‘pick the most recent-looking number’.",
        tryIt:
          "Draft the ten row labels for your evaluation and write the expected handling for the hardest two.",
      },
      {
        title: "3. Count review time and failures",
        body:
          "Measure from the start of the task to a reviewed result. Fast drafting can shift work into correction and exception handling. Compare total time, output quality and escalation together. In the invented result below, 25 minutes are saved across ten cases, but a critical failure blocks unsupervised use. A proportionate next step might be to revise the brief and rerun a fresh, varied set under human review. Adoption is a decision about the complete process and its remaining risks, not a reward for using a tool.",
        example:
          "Invented result: baseline 120 minutes; assisted drafting 20 minutes, review/correction 60 and escalation 15, for 95 minutes total. Six outputs are acceptable, three need correction and one invents approval. The 25-minute difference is a test result within this fictional exercise, not a productivity benchmark.",
        tryIt:
          "Write a two-sentence recommendation that includes both the time comparison and the critical failure.",
      },
    ],
    demo: {
      title: "Would you approve this pilot?",
      scenario:
        "Original hypothetical exercise: Ledgerleaf tests purchase-request summaries on ten synthetic cases. Human-only work totals 120 minutes. Assisted work takes 20 minutes to draft, 60 to review/correct and 15 to escalate. Six cases are acceptable, three need correction and one invents supplier approval. The team had defined invented approval as a critical failure. All numbers and results are fictional.",
      lesson: [
        "The assisted total is 95 minutes, not 20. The stated time difference is 25 minutes across ten cases.",
        "A critical failure remains material even when most outputs are acceptable and net time falls.",
        "A ten-case exercise supports investigation and revision; it does not prove performance across the future workload.",
      ],
      task: "Choose the next action and write the evidence needed before expanding the pilot.",
      decisions: [
        {
          question: "How will you report the time result?",
          choices: [
            {
              title: "95 minutes assisted versus 120 minutes baseline",
              feedback:
                "This includes drafting, correction and escalation. Report the 25-minute difference alongside case quality and note that the set is small and synthetic. Record any preparation or training time separately.",
            },
            {
              title: "20 minutes assisted versus 120 minutes baseline",
              feedback:
                "This compares drafting with complete human work and omits 75 minutes of review and escalation. Compare equivalent boundaries: the assisted total is 20 + 60 + 15 = 95 minutes.",
            },
            {
              title: "The trial proves a permanent 25-minute saving",
              feedback:
                "The arithmetic describes these ten invented cases. Different requests, reviewer experience and additional costs can change the result. State the boundary and test again before making a wider claim.",
            },
          ],
        },
        {
          question: "What is the most defensible next step?",
          choices: [
            {
              title: "Send summaries without review because most passed",
              feedback:
                "The critical failure violates the team’s rule and could create an unauthorised spending commitment. A majority pass rate does not override that rule. Keep review and investigate the failure.",
            },
            {
              title: "Revise, investigate the failure and retest under review",
              feedback:
                "This follows the predefined boundary. Examine why approval was invented, strengthen the brief or process, test new difficult cases and keep an authorised reviewer before any summary is used.",
            },
            {
              title: "Delete the failed case and report nine successes",
              feedback:
                "Removing inconvenient evidence changes the test after the fact. Keep the failure in the record, explain its cause and show separately whether a revised process handles it and fresh cases better.",
            },
          ],
        },
      ],
      prompts: [
        "What ten case types will you test, and what does acceptable handling look like?",
        "Which times and error categories belong in the comparison?",
        "What is your decision now, and what evidence would change it?",
      ],
      modelAnswer: [
        "Use four routine, two missing-field, two contradictory, one irrelevant-personal-detail and one approval-rule challenge case. Label expected handling before running the trial and record every result.",
        "Compare complete handling time: 120 minutes baseline with 95 assisted. Record acceptable, correctable and critical outcomes, including the invented approval, rather than reporting speed alone.",
        "Do not allow unsupervised use. Investigate the critical failure, revise the brief and controls, and retest a fresh varied set with human review. Any later expansion needs evidence from representative permitted work and an explicit stopping rule.",
      ],
      checkpoint: {
        question: "What does a small, carefully designed evaluation establish?",
        options: [
          "That every future output will be accurate.",
          "That the fastest draft creates the best workflow.",
          "How the tested process handled the selected cases, including weaknesses to investigate.",
        ],
        answer: 2,
        explanation:
          "A bounded evaluation makes particular behaviour visible. Generalising beyond those cases requires more evidence, and total handling time must include human review and exceptions.",
      },
    },
    sources: aiSources,
  },
  {
    slug: "make-a-strategic-tradeoff",
    title: "Make a strategic choice you can defend",
    category: "Strategy",
    minutes: 20,
    intro:
      "Choose a customer promise, identify the request you will decline and connect the choice to daily activities. Practise a decision under a real capacity constraint.",
    output: "A one-page choice map with a trade-off and a reversal condition.",
    programmeSlug: "strategy-case-thinking",
    lessons: [
      {
        title: "1. Pick the promise before the slogan",
        body:
          "‘Better service for everyone’ does not tell a team how to allocate limited time. State which customer problem the business will solve and what dependable experience it promises. In the case below, scheduled collections for local shops and urgent one-off deliveries require different operating patterns. Neither is inherently the best strategy. The useful question is which promise this team can serve distinctively and economically. Porter’s strategy reading offers a lens for examining positioning, trade-offs and fit among activities; the case still needs evidence and judgement.",
        example:
          "Hypothetical business: Routewise has two riders. Local shops want predictable twice-daily parcel collections. Individual customers want pickup within 20 minutes anywhere in the city. Routewise cannot currently guarantee both; urgent detours make its scheduled rounds late.",
        tryIt:
          "Complete: ‘For [specific customer], we promise [specific benefit] through [operating choice].’ Avoid ‘everyone’ and ‘best’.",
      },
      {
        title: "2. Show what the choice requires",
        body:
          "Translate the promise into three activities and one boundary. A scheduled shop service might use fixed collection windows, a compact service area and repeat weekly accounts. Declining urgent cross-city requests protects those activities. A premium urgent service might instead keep spare rider capacity and charge for unpredictable routing. A trade-off is the commitment you knowingly limit to make another commitment feasible. An irritating inconvenience is not automatically a strategy; explain why the boundary supports customer value and the operating model.",
        example:
          "Scheduled option: two fixed rounds, one neighbourhood, standard parcel limits and weekly billing. Boundary: no guaranteed 20-minute pickup. Urgent option: a smaller booking queue, reserved rider availability and explicit coverage limits. Boundary: no low-priced scheduled volume promise using the same committed capacity.",
        tryIt:
          "List three activities that reinforce your chosen promise. Then write a polite refusal for one request that conflicts with it.",
      },
      {
        title: "3. Name the assumption that could overturn it",
        body:
          "A defensible choice can be provisional. Identify the uncertain fact most likely to reverse it: sufficient repeat demand, route density, contribution after waiting time or customer acceptance of the service window. Design a bounded test that measures that fact. Comparing headline prices alone misses travel, idle time and reliability. Before the test, specify what would make you continue, revise the boundary or choose a different model. A competitor list becomes useful when it explains the customer’s actual alternative and its implications for your choice.",
        example:
          "Routewise trials one scheduled round with four consenting shops for five operating days. It records parcels, riding and waiting minutes, on-time completion, contribution after delivery costs and whether shops want another week. Five days cannot establish year-round demand, but can expose a badly designed route.",
        tryIt:
          "Write one assumption, one observation that would challenge it and the decision you would revisit.",
      },
    ],
    demo: {
      title: "The tempting urgent order",
      scenario:
        "Original hypothetical exercise: Routewise’s two riders are committed to a scheduled collection round for four shops. A customer offers a higher fee for an immediate cross-city pickup. Accepting would make two shop collections late. There is no spare rider. Routewise is testing whether reliable scheduled service creates repeat business. No actual company or market outcome is described.",
      lesson: [
        "The urgent fee has an opportunity cost: reliability for the customers the trial is intended to serve.",
        "A strategic boundary should follow from the chosen promise and activities, rather than a desire to reject work for its own sake.",
        "The model can be revisited if evidence undermines repeat demand or route economics; exceptions should be assessed explicitly.",
      ],
      task: "Choose a response to the urgent request and state what evidence could change the strategy.",
      decisions: [
        {
          question: "What will you do with this urgent request?",
          choices: [
            {
              title: "Decline immediate pickup and offer a feasible later slot",
              feedback:
                "This protects the promise being tested. Explain the actual service window and offer a later slot only if the team can deliver it. Record declined demand so the opportunity is assessed rather than forgotten.",
            },
            {
              title: "Accept and quietly let the shop round run late",
              feedback:
                "That changes the promised service and contaminates the reliability trial. Compare the extra contribution with the cost of broken commitments; do not treat the higher fee as the whole decision.",
            },
            {
              title: "Promise both by asking the same riders to work faster",
              feedback:
                "The case says accepting makes two collections late. A motivational instruction does not create spare capacity. Name a feasible change in routing or resources and include its costs before offering both.",
            },
          ],
        },
        {
          question: "Which evidence could justify revisiting the scheduled model?",
          choices: [
            {
              title: "One urgent customer offers an impressive fee",
              feedback:
                "This signals a possible alternative, but one request does not establish repeat demand or an urgent-service operating model. Record it and test the economics and capacity of that alternative separately.",
            },
            {
              title: "Repeat demand and route contribution remain too low",
              feedback:
                "This challenges the chosen model directly. Investigate route density, pricing and customer need, then compare a revised scheduled model or a bounded urgent-service test using consistent cost assumptions.",
            },
            {
              title: "A competitor describes itself as customer obsessed",
              feedback:
                "A slogan does not reveal the activities or economics behind a rival service. Examine the alternative customers actually use, the promised time window and the cost of delivering it.",
            },
          ],
        },
      ],
      prompts: [
        "Which customer and promise will Routewise prioritise?",
        "Which three activities and one refusal make that promise feasible?",
        "What uncertain assumption could reverse your choice, and how will you test it?",
      ],
      modelAnswer: [
        "Prioritise predictable collections for nearby shops during the bounded trial, with fixed windows and honest coverage limits. This is a choice to test, not a claim that scheduled delivery always wins.",
        "Use compact routes, fixed rounds and repeat accounts. Decline guaranteed urgent cross-city pickup when it conflicts with the round; offer a feasible later collection if appropriate.",
        "Test repeat demand and contribution after riding, waiting and delivery costs. If those remain inadequate, revise route density or the offer and compare a separately scoped urgent-service model before committing further.",
      ],
      checkpoint: {
        question: "Which statement expresses a strategic trade-off most clearly?",
        options: [
          "We will satisfy every possible customer request.",
          "We will use more technology and improve efficiency.",
          "We decline guaranteed urgent detours to protect fixed collection windows for nearby shops.",
        ],
        answer: 2,
        explanation:
          "The statement connects a deliberate boundary to a specific customer promise and operating constraint. A technology investment or broad ambition needs further choices to explain the strategy.",
      },
    },
    sources: [
      {
        title:
          "Michael E. Porter (1996), What Is Strategy? — publisher information; full reading may require purchase",
        url: "https://store.hbr.org/product/what-is-strategy/96608",
      },
    ],
  },
  {
    slug: "read-your-unit-economics",
    title: "Read your unit economics before you grow",
    category: "Strategy",
    minutes: 25,
    intro:
      "Separate sales from contribution, find a simple break-even point and test a discount against capacity. Use transparent arithmetic to improve a business decision.",
    output: "A contribution calculation, break-even check and pricing decision memo.",
    programmeSlug: "strategy-case-thinking",
    lessons: [
      {
        title: "1. Follow one sale through the costs",
        body:
          "Define a unit and a time period before calculating. Revenue per unit is the selling price in this simplified exercise. Subtract costs that change with that unit to obtain contribution per unit. Contribution then helps cover the period’s fixed costs; it is not automatically profit. Include time and delivery work rather than treating founder effort as free. These educational figures exclude tax, financing and other unlisted costs, so they are a bounded operating calculation rather than a full set of accounts or a pricing recommendation.",
        example:
          "Hypothetical business: Tiffin Trail sells one lunch for ₹150. Ingredients cost ₹70, packaging ₹10 and delivery ₹10 per lunch. Variable cost is ₹90 and contribution is ₹60. Monthly fixed costs are ₹12,000, including ₹8,000 kitchen costs and a ₹4,000 allowance for founder administration time.",
        tryIt:
          "Write ‘unit’, ‘period’, ‘price’, ‘variable cost’ and ‘contribution’ on five lines. Check that the first four make the fifth reproducible.",
      },
      {
        title: "2. Compare break-even with capacity",
        body:
          "For one product with constant price and variable cost within the relevant capacity, break-even units equal fixed costs divided by contribution per unit. Round up when the result is not a whole sale. If contribution is zero or negative, selling more cannot cover positive fixed costs under that model. Next compare the required sales with realistic demand and delivery capacity. A mathematically correct break-even figure is not a forecast that those sales will occur. Fixed costs can also step up when capacity expands.",
        example:
          "At ₹60 contribution, ₹12,000 ÷ ₹60 = 200 lunches per month to break even on the stated costs. At 250 lunches, contribution is ₹15,000 and the remaining amount is ₹3,000. The kitchen can currently deliver at most 300 lunches a month. Neither 250 sales nor full capacity is established demand.",
        tryIt:
          "Calculate the remaining amount at 150 lunches. Then name one capacity or demand assumption the formula does not test.",
      },
      {
        title: "3. Test the tempting discount",
        body:
          "A discount changes contribution before it changes demand. Work out how much extra volume would be needed and whether the team could serve it. In this case, cutting price by ₹30 halves contribution from ₹60 to ₹30. Even reaching the existing 300-lunch capacity would not cover the stated fixed costs at that price. A discount might still have a bounded purpose, such as a limited acquisition experiment, but its cost and evidence target must be explicit. Higher sales volume alone does not settle the decision.",
        example:
          "Discounted price ₹120 minus ₹90 variable cost leaves ₹30 contribution. Break-even becomes 400 lunches, above 300 capacity. At 250 lunches, ₹7,500 contribution less ₹12,000 fixed costs leaves −₹4,500 on the listed costs. At 300 lunches it leaves −₹3,000.",
        tryIt:
          "Write a recommendation that includes the discounted break-even quantity, the capacity limit and one alternative to a blanket discount.",
      },
    ],
    demo: {
      title: "Will cheaper lunches fix the business?",
      scenario:
        "Original hypothetical exercise: Tiffin Trail charges ₹150 per lunch, with ₹90 variable cost and ₹12,000 monthly fixed costs. Capacity is 300 lunches monthly. A proposed ₹120 price is expected to attract more orders, but no demand test has been run. All figures are invented and exclude tax, financing and other unlisted costs. Use the same cost assumptions for both prices.",
      lesson: [
        "Original contribution is ₹60 per lunch and stated-cost break-even is 200 lunches.",
        "Discounted contribution is ₹30 and stated-cost break-even is 400 lunches, exceeding existing capacity.",
        "A forecast of more sales needs evidence and must be evaluated against costs and feasible capacity.",
      ],
      task: "Evaluate the discount and choose a next step using the stated numbers.",
      decisions: [
        {
          question: "How will you judge the proposed ₹120 price?",
          choices: [
            {
              title: "More orders must mean more profit",
              feedback:
                "Orders do not account for contribution or fixed costs. The discount halves contribution to ₹30. At the 300-lunch capacity, only ₹9,000 is available against ₹12,000 fixed costs, leaving a ₹3,000 shortfall on the stated model.",
            },
            {
              title: "Compare ₹30 contribution and 400 break-even lunches with capacity",
              feedback:
                "This exposes the constraint: the proposed price cannot cover the listed fixed costs within current 300-lunch capacity. Demand, cost changes and any new capacity costs still need examination.",
            },
            {
              title: "Use ₹120 minus ingredients as profit per lunch",
              feedback:
                "That omits packaging, delivery and fixed costs. Subtract all ₹90 variable costs to get ₹30 contribution, then account for the period’s ₹12,000 fixed costs. Contribution is not final profit.",
            },
          ],
        },
        {
          question: "What is a useful next experiment?",
          choices: [
            {
              title: "Launch the discount without a limit or measurement",
              feedback:
                "An unlimited discount commits to weak economics before demand is known. If a discount is tested, bound its duration and loss and specify the behaviour it must reveal, including repeat purchase at a sustainable price.",
            },
            {
              title: "Ignore founder time to make the result look positive",
              feedback:
                "Removing a real delivery cost does not improve the underlying business. You can show cash expenditure and a separate time allowance, but explain both rather than silently excluding founder work.",
            },
            {
              title: "Test customer value and feasible cost changes before repricing",
              feedback:
                "Examine why customers choose or decline the lunch, then evaluate a better offer, denser delivery route or bounded promotion. Recalculate contribution with explicit changed assumptions and include any cost of expanding capacity.",
            },
          ],
        },
      ],
      prompts: [
        "What are contribution per lunch and break-even volume at each price?",
        "What remains at 250 lunches under each price using the stated costs?",
        "What will you recommend, and which missing evidence would matter next?",
      ],
      modelAnswer: [
        "At ₹150, contribution is ₹60 and break-even is 200 lunches. At ₹120, contribution is ₹30 and break-even is 400 lunches, which exceeds the existing 300-lunch capacity.",
        "At 250 lunches, the original model leaves ₹3,000 after listed fixed costs. The discounted model leaves −₹4,500. These are simplified operating results before tax, financing and unlisted costs, not full accounting profit.",
        "Do not make the blanket discount on these assumptions. Test the customer’s reason for buying, delivery cost and repeat demand. Consider a bounded promotion only with an explicit cost limit and a plausible path to contribution that covers the relevant costs.",
      ],
      checkpoint: {
        question: "At ₹120 price, ₹90 variable cost and ₹12,000 fixed cost, how many lunches cover the stated costs?",
        options: ["100 lunches", "200 lunches", "400 lunches"],
        answer: 2,
        explanation:
          "Contribution per lunch is ₹120 − ₹90 = ₹30. Break-even is ₹12,000 ÷ ₹30 = 400 lunches. That is a model requirement, not evidence of demand, and it exceeds the stated 300-lunch capacity.",
      },
    },
    sources: [
      {
        title: "US Small Business Administration, Plan your business — break-even point and cost definitions",
        url: "https://www.sba.gov/counseling/plan-your-business/",
      },
    ],
  },
  {
    slug: "set-an-affordable-loss",
    title: "Set an affordable loss for your first experiment",
    category: "Entrepreneurship",
    minutes: 20,
    intro:
      "Turn an uncertain idea into a commitment you can manage. Set limits on money and time, use what you already have and decide what would justify another step.",
    output: "An experiment card with a budget, time limit and stop/continue rule.",
    programmeSlug: "entrepreneurship-under-constraint",
    lessons: [
      {
        title: "1. Start with your means and limits",
        body:
          "When demand is unknown, a detailed revenue forecast can look more certain than its evidence. Begin with the skills, time, relationships and resources actually available. Then state what you can afford to commit if the experiment teaches you that the idea should stop. Sarasvathy’s effectuation research develops affordable loss as an alternative decision logic under uncertainty. An affordable-loss limit is personal and context dependent; it is not an instruction to spend the maximum or a guarantee that a venture is safe.",
        example:
          "Hypothetical founder: Meera knows basic balcony-plant care, has six hours over two weekends and can commit up to ₹2,000 without affecting essential expenses. She wants to test a plant-check service. A branded starter kit and advertising package would cost ₹12,000, before any customer has booked.",
        tryIt:
          "List three available means, your maximum cash commitment and your time limit. Name one commitment you cannot responsibly make yet.",
      },
      {
        title: "2. Buy learning in small steps",
        body:
          "Choose the least commitment that can reveal the next important uncertainty. Meera can first ask residents about recent plant problems and test a simple booking offer, using her existing tools for work within her competence. Break the commitment into stages so later spending depends on observed behaviour. Include cash, time, customer promises and any borrowed resource in the card. A cheap test that measures the wrong question is still wasteful; specify what the activity is intended to teach.",
        example:
          "Stage one: spend no more than two hours on five voluntary problem interviews. If a clear problem recurs, offer at most three scoped plant-check appointments. Proposed test budget: ₹500 travel, ₹300 consumables and ₹200 contingency, for ₹1,000; up to four more hours. No full kit, paid advertising or guaranteed plant recovery.",
        tryIt:
          "Split the test into two stages. For each, write its question, cost, time and the evidence required before moving on.",
      },
      {
        title: "3. Decide before enthusiasm takes over",
        body:
          "Write stop and continue conditions before inviting participants. A booking is stronger evidence of intent than praise, but it is still not a completed paid service or repeat demand. Track who acts, why others decline, effort per appointment and whether the promise was delivered. Stop when the agreed loss or time limit is reached; you can then make a new, explicit decision based on what was learned. Avoid expanding the budget merely because the previous spending would otherwise feel wasted.",
        example:
          "An illustrative rule: proceed from interviews only if at least three people describe a recent relevant problem. Run the appointment stage only within the ₹1,000 test budget and six total hours. Consider another small test if two people book and attend and the visits are deliverable within scope. These are learning rules for this case, not universal business benchmarks.",
        tryIt:
          "Write one stop rule, one evidence-based continue rule and the question you would still have after a successful first test.",
      },
    ],
    demo: {
      title: "A small test or a full launch?",
      scenario:
        "Original hypothetical exercise: Meera has basic balcony-plant knowledge, existing tools, six available hours and a ₹2,000 affordable-loss ceiling. A supplier offers a ₹12,000 kit with a ‘launch discount’. No customer has yet booked. A smaller two-stage interview and appointment test could cost ₹1,000. The person, supplier and figures are invented; no real purchase is recommended.",
      lesson: [
        "A discount does not make an unaffordable commitment affordable.",
        "The next test should answer a customer or delivery question with limited cash, time and promises.",
        "A predefined decision rule makes it easier to stop, revise or commit again using evidence.",
      ],
      task: "Choose the next commitment and define when Meera should stop or continue.",
      decisions: [
        {
          question: "Which commitment best fits the stated uncertainty and limits?",
          choices: [
            {
              title: "Buy the kit now because the discount expires",
              feedback:
                "The ₹12,000 purchase exceeds the ₹2,000 ceiling and does not establish customer demand. An expiring offer changes the sales pressure, not the founder’s available means or the next learning question.",
            },
            {
              title: "Interview first, then test at most three scoped appointments",
              feedback:
                "This can fit the stated limits if each stage has a budget and evidence gate. Use existing tools, make only deliverable promises, record actual bookings and attendance, and stop at the time or cash boundary.",
            },
            {
              title: "Borrow the difference and treat the forecast as confirmed sales",
              feedback:
                "Borrowing does not turn an untested forecast into demand. It adds a commitment beyond the stated loss boundary. Gather customer and delivery evidence before considering a larger, explicitly assessed commitment.",
            },
          ],
        },
        {
          question: "What should trigger another small test?",
          choices: [
            {
              title: "Friends say the logo looks professional",
              feedback:
                "That is feedback on presentation, not the problem, booking behaviour or delivery effort. Ask what happened recently and observe whether an appropriate customer takes the next voluntary step.",
            },
            {
              title: "The original budget is almost spent",
              feedback:
                "Previous spending is not evidence that the next commitment will work. Pause at the limit, review observations and decide whether any new commitment is affordable and answers an unresolved question.",
            },
            {
              title: "Customers book and attend a service deliverable within the limits",
              feedback:
                "That can support another bounded experiment if the predefined threshold is met. It still leaves price, repeat demand and broader economics uncertain. State the next question instead of calling the venture validated.",
            },
          ],
        },
      ],
      prompts: [
        "What are Meera’s available means, cash ceiling and time limit?",
        "What does each experiment stage test, and what does it cost?",
        "What will cause her to stop, revise or make another bounded commitment?",
      ],
      modelAnswer: [
        "Use existing plant-care knowledge, tools and voluntary local conversations. Keep the overall ceiling at ₹2,000 and six hours; do not buy the ₹12,000 kit or promise outcomes beyond the service scope.",
        "Spend up to two hours interviewing five people about recent problems. If the relevant problem recurs, offer at most three appointments within four further hours and a ₹1,000 cash test budget. Record bookings, attendance, effort and reasons for declining.",
        "Stop when the time or cash boundary is reached, or if the scoped service cannot be delivered. Another small test needs the agreed behavioural evidence and a newly stated learning question; compliments or money already spent do not meet that rule.",
      ],
      checkpoint: {
        question: "What does an affordable-loss limit help a founder decide?",
        options: [
          "The maximum commitment they can accept for the next uncertain step.",
          "The exact revenue the business will earn next year.",
          "How much they must spend to prove commitment to the idea.",
        ],
        answer: 0,
        explanation:
          "Affordable loss bounds the next commitment using the founder’s circumstances and available means. It neither predicts revenue nor requires spending the entire limit.",
      },
    },
    sources: [
      {
        title: "Saras D. Sarasvathy (2001), Causation and Effectuation — research publication",
        url: "https://effectuation.org/publications-library/causation-and-effectuation-toward-a-theoretical-shift-from-economic-inevitability-to-entrepreneurial-contingency",
      },
    ],
  },
  {
    slug: "ask-better-customer-questions",
    title: "Ask customer questions that reveal behaviour",
    category: "Entrepreneurship",
    minutes: 20,
    intro:
      "Move from ‘Do you like my idea?’ to a useful conversation about a recent problem. Build a short interview guide and separate observations from assumptions.",
    output: "A five-question interview guide and an evidence log for the next test.",
    programmeSlug: "entrepreneurship-under-constraint",
    lessons: [
      {
        title: "1. Ask about the last time",
        body:
          "People can be encouraging about an attractive future idea without facing the problem or intending to buy. Start with a specific recent event. Ask what happened, what the person did, what alternative they used and what effort or cost resulted. Listen for the sequence before presenting your solution. Customer discovery, including the approach used in NSF I-Corps, treats direct customer learning as a way to examine assumptions. This exercise adapts that learning habit; it is not an NSF programme or endorsement.",
        example:
          "Hypothetical idea: MendMeet would collect clothes for local tailoring repairs. ‘Would you use a convenient repair app?’ invites an easy yes. ‘Tell me about the last item you needed repaired. What did you do next?’ can reveal whether finding a tailor, making the trip, the price or something else was difficult.",
        tryIt:
          "Replace three ‘Would you…?’ questions with questions about a recent event, action and consequence.",
      },
      {
        title: "2. Follow the decision and the alternative",
        body:
          "Ask one question at a time and follow the answer. A useful five-question guide covers the recent event, current workaround, difficulty, decision-maker and actual commitment of money or time. Avoid implying that your preferred problem is the important one. Ask permission to take brief notes, record only what is needed and do not request sensitive details. If someone has not experienced the problem, record that too. Their answer may indicate a poor segment rather than a poorly explained pitch.",
        example:
          "Guide: What happened the last time you needed a clothing repair? How did you handle it? What was hardest, if anything? Who decided where to take it? What time or money did you actually spend? Follow with ‘What happened next?’ when the sequence is unclear. Ask for approximate amounts if exact figures are unnecessary.",
        tryIt:
          "Write your five-question guide. Underline any phrase that tells the customer what answer you hope to hear, then rewrite it.",
      },
      {
        title: "3. Turn notes into a testable next step",
        body:
          "Separate what the person reported, what you infer and what remains unknown. A small convenience sample helps form or challenge hypotheses; it does not measure a whole market. Look for repeated behaviour and contradictions, then choose a modest next test. An opt-in booking for a clearly scoped trial is stronger evidence of action than praise, but a booking, attendance, payment and repeat use are different events. Report the denominator and how participants were selected rather than declaring that customers want the solution.",
        example:
          "Invented interview notes: six people spoke voluntarily; three report a repair in the last month; two of those describe travel as inconvenient; one says price was the problem. Two agree to hear about a trial pickup. That suggests a travel-related hypothesis for a narrow group, not two customers acquired or a proven business.",
        tryIt:
          "Create four columns: reported behaviour, your interpretation, contrary evidence and next test. Write one conclusion that includes a limitation.",
      },
    ],
    demo: {
      title: "Six conversations, two interested people",
      scenario:
        "Original hypothetical exercise: a MendMeet founder interviews six volunteers. Three report a clothing repair in the last month. Two of those found travel inconvenient; the third cared mainly about price. Two people agree to receive trial details, but nobody has booked, attended or paid. One friend says the app is a brilliant idea. These are invented notes, not actual demand or conversion data.",
      lesson: [
        "Interest in receiving information is distinct from booking, payment and repeat demand.",
        "Recent actions and current alternatives are more informative than praise alone, but this small self-selected sample remains limited.",
        "The next step should examine a specific uncertainty for the people who experienced it.",
      ],
      task: "Choose the next interview question and write an honest summary of the evidence.",
      decisions: [
        {
          question: "What will you ask someone who reports an inconvenient repair trip?",
          choices: [
            {
              title: "You would pay for our convenient app, right?",
              feedback:
                "The question suggests an answer and moves straight to your solution. Ask what happened on the last trip, the alternative considered and the actual effort or cost before testing a particular offer.",
            },
            {
              title: "Walk me through the last repair trip and what made it difficult",
              feedback:
                "This invites a concrete sequence and leaves room for an unexpected problem. Follow with what they did, which alternative they considered and what time or money was spent, using only necessary details.",
            },
            {
              title: "Which colour should our app use?",
              feedback:
                "This tests a design preference rather than whether repair pickup solves an important problem. Resolve the customer problem and willingness to take a relevant next step before investing in interface choices.",
            },
          ],
        },
        {
          question: "Which summary matches the evidence?",
          choices: [
            {
              title: "Two paying customers validate the business",
              feedback:
                "Nobody has booked or paid. The two people agreed only to receive details. Label that event accurately and test a voluntary booking for a real, scoped trial before making a stronger claim.",
            },
            {
              title: "All customers want a pickup app",
              feedback:
                "Six volunteers are not all customers, and only two described the travel problem. Record the price-related contrary evidence and the sample’s selection limits instead of generalising to a market.",
            },
            {
              title: "Two recent repair customers report travel friction; test a scoped offer",
              feedback:
                "This separates observation from the next hypothesis. Invite only people who opted in, make the scope clear and record booking, attendance and payment separately. A small test still leaves repeat demand and economics unresolved.",
            },
          ],
        },
      ],
      prompts: [
        "What five questions will uncover recent behaviour and current alternatives?",
        "Which observations support the travel-friction hypothesis, and which challenge it?",
        "What next action would provide stronger evidence, and what would it still not prove?",
      ],
      modelAnswer: [
        "Ask about the last repair, how it was handled, the hardest part, who chose the provider and the actual time or money spent. Use neutral follow-ups and ask permission for concise, necessary notes.",
        "Of six volunteers, three describe a recent repair and two report travel friction. One recent repair customer focuses on price instead. Two people opted to receive information; none booked or paid. The sample is small and self-selected.",
        "Offer a clearly scoped, deliverable trial to those who opted in and observe actual voluntary bookings and follow-through. Even a completed paid trial would leave repeat demand, broader customer fit and delivery economics to test.",
      ],
      checkpoint: {
        question: "Which interview question is most likely to uncover useful behavioural evidence?",
        options: [
          "Would you buy my amazing new service?",
          "Tell me about the last time this problem occurred and what you did.",
          "Do you agree that convenience is important?",
        ],
        answer: 1,
        explanation:
          "A recent-event question can reveal a concrete problem, workaround and consequence. It still relies on what the person reports, but offers more to investigate than a compliment or a broad statement of preference.",
      },
    },
    sources: [
      {
        title: "US National Science Foundation, I-Corps — customer-discovery learning approach",
        url: "https://www.nsf.gov/funding/initiatives/i-corps/about-teams",
      },
    ],
  },
];

export function getFreeCourse(slug: string): FreeCourse | undefined {
  return freeCourses.find((course) => course.slug === slug);
}
