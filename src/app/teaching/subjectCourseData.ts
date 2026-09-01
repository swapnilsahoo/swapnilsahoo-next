import type { SubjectCourseConfig } from "./_components/SubjectCoursePage";

export const karmaYogaCourse = {
  hero: {
    eyebrow: "Experiential leadership · B-school field pedagogy",
    title: "Karma Yoga for B-Schools",
    accent: "service becomes a rigorous management laboratory.",
    description:
      "A field-learning architecture for management education, where student teams listen, frame, co-design, deliver, measure, hand over and reflect with community partners.",
    image: {
      src: "/images/teaching/karma-yoga/b-schools/student-connection.webp",
      alt: "Management students learning with schoolchildren in the field",
      objectPosition: "center 40%",
    },
    actions: [
      { label: "See field practice", href: "#karma-yoga-b-schools" },
      { label: "Explore the learning loop", href: "#learning-loop" },
    ],
  },
  metadata: [
    { label: "Programme", value: "Karma Yoga" },
    { label: "Pathway", value: "For B-Schools" },
    { label: "Learning mode", value: "Field immersion · Community co-design" },
    { label: "Faculty", value: "Prof. S. K. Palhan · Dr. Swapnil Sahoo" },
  ],
  inquiry: {
    title: "Before serving, question the meaning of help.",
    questions: [
      "Who defined this problem—you, or the community living it?",
      "If it photographs well but changes nothing, is it still help?",
      "Who keeps it running after your team leaves the village?",
    ],
  },
  promise: {
    title: "Learn to lead with communities—not merely for them.",
    description:
      "Karma Yoga treats the field as a serious management laboratory. Learners move from empathy to diagnosis, from co-design to disciplined execution, and from visible activity to defensible evidence of value.",
  },
  principles: [
    {
      title: "Dignity before solution",
      description:
        "Community members are partners with agency and knowledge. Listening, informed consent and local priorities come before the team’s preferred idea.",
      citations: [1, 2],
    },
    {
      title: "Evidence before narrative",
      description:
        "Teams distinguish outputs from outcomes and pair stories with baseline signals, observation, participation data and stakeholder feedback.",
      citations: [2, 3, 4],
    },
    {
      title: "Handover before exit",
      description:
        "A responsible intervention must be safe, maintainable and locally owned after the student team leaves the field.",
      citations: [1, 3, 4],
    },
  ],
  learningLoop: {
    name: "Field learning loop",
    title: "Listen. Co-design. Deliver. Learn.",
    description:
      "The work is deliberately iterative. What students hear on any visit may reopen the problem, change the intervention or stop an idea that is unsafe, unwanted or unlikely to last.",
    steps: [
      {
        label: "Prepare",
        title: "Orient",
        description: "Understand purpose, partners, roles, safeguarding and the field covenant.",
      },
      {
        label: "Discover",
        title: "Listen",
        description:
          "Observe assets and constraints; hear stakeholder priorities without prescribing.",
      },
      {
        label: "Diagnose",
        title: "Frame",
        description: "Convert observations into a precise, evidence-backed problem worth solving.",
      },
      {
        label: "Create",
        title: "Co-design",
        description:
          "Generate alternatives with users and select against need, feasibility and dignity.",
      },
      {
        label: "Prototype",
        title: "Build",
        description:
          "Make the smallest safe version that can reveal what the team still does not know.",
      },
      {
        label: "Act",
        title: "Deliver",
        description:
          "Coordinate people, resources and partner expectations through self-managed teams.",
      },
      {
        label: "Assure",
        title: "Measure",
        description:
          "Compare baseline and endline signals; invite feedback and document limitations.",
      },
      {
        label: "Transfer",
        title: "Reflect",
        description:
          "Hand over ownership, defend the evidence and translate field learning into leadership practice.",
      },
    ],
  },
  learningOutcomes: [
    "Demonstrate stakeholder empathy by listening, observing and reframing a societal challenge with—not for—the people affected.",
    "Apply structured problem solving to generate, compare and adapt feasible interventions under real resource constraints.",
    "Lead a self-managed team through role clarity, ethical decisions, partner coordination, execution and course correction.",
    "Evaluate outputs, outcomes and limitations using multiple forms of evidence, then give an honest account of what the team learned.",
  ],
  sessions: [
    {
      number: "01",
      phase: "Prepare · Orientation",
      title: "Service, dignity and the field covenant",
      question: "What must responsible leaders understand before they attempt to help?",
      topics: [
        "Karma Yoga as experiential leadership",
        "Community assets, power and reciprocity",
        "Roles, conduct, consent and safeguarding",
      ],
      activities: [
        "Interpret the partner and Karmabhoomi brief",
        "Map team strengths, assumptions and risks",
        "Draft a shared field charter and escalation protocol",
      ],
      artifact: "Signed team charter, role map and ethical field protocol.",
      citations: [1, 2],
    },
    {
      number: "02",
      phase: "Discover · First field visit",
      title: "Listen before solving",
      question: "What is the community already doing—and what does it say matters most?",
      topics: [
        "Asset-based observation",
        "Stakeholder and influence mapping",
        "Baseline signals and respectful inquiry",
      ],
      activities: [
        "Use an observation and listening guide",
        "Separate statements, observations and interpretations",
        "Validate the emerging need with the partner",
      ],
      artifact: "Field note, asset map, stakeholder map and provisional baseline.",
      citations: [1, 3, 4],
    },
    {
      number: "03",
      phase: "Diagnose · Problem framing",
      title: "From symptoms to a solvable challenge",
      question:
        "Which problem is consequential, evidenced and within the team’s responsible reach?",
      topics: [
        "Root causes versus visible symptoms",
        "Flowering of Ideas and mind mapping",
        "Problem boundaries, assumptions and success signals",
      ],
      activities: [
        "Build a cause-and-effect map",
        "Write and stress-test alternative problem statements",
        "Define what the team will not claim or attempt",
      ],
      artifact: "Approved problem frame with evidence, assumptions and success criteria.",
      citations: [2],
    },
    {
      number: "04",
      phase: "Create · Project approval",
      title: "Co-design the intervention",
      question:
        "Which option best balances user voice, impact, feasibility, safety and continuity?",
      topics: [
        "Divergent and convergent idea generation",
        "Feasibility, desirability and responsibility",
        "Partner ownership and implementation risk",
      ],
      activities: [
        "Generate multiple alternatives before selecting",
        "Score options with community-informed criteria",
        "Run a pre-mortem and agree a stop/change rule",
      ],
      artifact: "Project canvas, option matrix, risk register and partner-approved action plan.",
      citations: [1, 2],
    },
    {
      number: "05",
      phase: "Prototype · Frugal Play Lab",
      title: "Build for inclusion under constraint",
      question: "Can a low-cost learning aid be useful, joyful, safe, repairable and dignified?",
      topics: [
        "Learner need for ages 6–14",
        "Inclusive play, material safety and repairability",
        "Prototype economics: ₹250 ceiling; pathway to ₹100 per unit at scale",
      ],
      activities: [
        "Generate ten ideas and shortlist three",
        "Build a minimum viable prototype and safety-check it",
        "Test responsibly, iterate and design the handover",
      ],
      artifact:
        "Working prototype, build guide, cost sheet, safety gate and ethical implementation plan.",
      citations: [5, 6],
    },
    {
      number: "06",
      phase: "Act · Field implementation",
      title: "Execute through a self-managed team",
      question: "How will the team protect intent while adapting to what happens in the field?",
      topics: [
        "Role clarity and partner coordination",
        "Resource, time and expectation management",
        "Decision logs, course correction and escalation",
      ],
      activities: [
        "Deliver the approved intervention with partner participation",
        "Record decisions, deviations and reasons",
        "Conduct an end-of-visit team and partner check-in",
      ],
      artifact: "Implementation log, resource record and consent-compliant evidence pack.",
      citations: [1, 2],
    },
    {
      number: "07",
      phase: "Assure · Impact and continuity",
      title: "Measure what changed; design what remains",
      question: "What changed, for whom, how do we know—and who owns the next step?",
      topics: [
        "Outputs, outcomes and contribution",
        "Baseline/endline, engagement and stakeholder feedback",
        "Maintenance, ownership and responsible exit",
      ],
      activities: [
        "Triangulate observations with simple quantitative and qualitative signals",
        "Invite partner critique and document unintended effects",
        "Run a handover and maintenance readiness review",
      ],
      artifact: "Impact dashboard, limitations note and signed handover/continuity plan.",
      citations: [2, 3, 4],
    },
    {
      number: "08",
      phase: "Transfer · Reflection",
      title: "Turn field evidence into leadership learning",
      question: "How did the experience change the team’s judgment, behaviour and view of impact?",
      topics: [
        "Evidence-based storytelling",
        "Team, peer and faculty feedback",
        "Empathy, ethical judgment and responsible leadership",
      ],
      activities: [
        "Present the intervention, results, limitations and next questions",
        "Conduct a structured after-action review",
        "Write an individual reflection linking field choices to managerial practice",
      ],
      artifact: "Final evidence deck, partner feedback, peer review and individual reflection log.",
      citations: [2],
    },
  ],
  studios: [
    {
      title: "Community listening lab",
      description:
        "Teams practise observation, stakeholder interviews and asset mapping before any intervention is approved.",
      evidence: "Field note + validated problem frame",
    },
    {
      title: "Frugal Play Lab",
      description:
        "A low-cost inclusive toy challenge makes safety, dignity, unit economics and repairability visible design constraints.",
      evidence: "Prototype + safety gate + build guide",
    },
    {
      title: "Field delivery room",
      description:
        "Self-managed teams coordinate partners, resources and changing conditions while maintaining a decision trail.",
      evidence: "Implementation log + partner check-in",
    },
    {
      title: "Impact & handover clinic",
      description:
        "Teams triangulate results, surface limitations and transfer ownership rather than treating the final visit as an exit.",
      evidence: "Impact dashboard + continuity plan",
    },
  ],
  assessments: [
    {
      weight: "10%",
      title: "Understanding the problem",
      description:
        "Depth of listening, stakeholder insight, evidence quality and precision of the approved problem frame.",
      method: "Field note + problem brief",
    },
    {
      weight: "10%",
      title: "Creativity",
      description:
        "Range and originality of alternatives, fit with user need and intelligent use of constraints.",
      method: "Option set + prototype",
    },
    {
      weight: "10%",
      title: "Planning",
      description:
        "Role clarity, feasibility, risk management, measurement logic and partner-approved implementation plan.",
      method: "Project canvas + risk register",
    },
    {
      weight: "70%",
      title: "Execution",
      description:
        "Quality and ethics of delivery, adaptability, teamwork, field evidence, partner feedback, handover and reflective learning.",
      method: "Evidence bundle + presentation",
    },
  ],
  safeguards: [
    {
      title: "Consent and child safeguarding",
      description:
        "No learner testing, personal data, photography or identifiable storytelling without appropriate permission and faculty/partner safeguards.",
      citations: [5],
    },
    {
      title: "Safety gate before field use",
      description:
        "Any toy, device or physical activity must pass a documented risk review; unsafe prototypes do not proceed to community testing.",
      citations: [6],
    },
    {
      title: "Data minimisation",
      description:
        "Collect only evidence needed for learning and impact review; protect identities and separate observation from interpretation.",
      citations: [],
    },
    {
      title: "Partner voice and honest attribution",
      description:
        "Name contributions accurately, report limits and unintended effects, and never turn community engagement into performative content.",
      citations: [2],
    },
    {
      title: "Responsible use of AI",
      description:
        "AI may support synthesis and ideation, but it cannot replace field listening, fabricate evidence or author an unexamined reflection.",
      citations: [2],
    },
    {
      title: "Handover, repair and ownership",
      description:
        "Every intervention must identify who can operate, maintain, repair or discontinue it after the team’s final visit.",
      citations: [1],
    },
  ],
  evidenceNote: {
    title: "How the evidence is assembled",
    description:
      "The course architecture follows the approved 2025–27 outline, executive note, current field-operation briefs and Frugal Play Lab instructions held in the teaching source pack. Public programme statistics are shown as statistics—not promises of causal impact—and learner/community identifiers remain private.",
    indicators: [
      "Published programme statistic · 32 Karmabhoomis",
      "Published programme statistic · 27 village schools assisted",
      "Published programme statistic · 2,500+ lives changed",
      "Community evidence · baseline/endline, participation, observation and partner feedback",
      "Learner evidence · pre/post self-assessment, faculty rubric and peer feedback",
      "Reflection evidence · decision logs, debriefs, limitations and individual learning",
    ],
  },
  references: [
    {
      id: 1,
      author: "Great Lakes Institute of Management, Gurgaon",
      year: "n.d.",
      title: "Karma Yoga: Experiential Learning Through Service",
      publisher: "Great Lakes Institute of Management",
      href: "https://www.greatlakes.edu.in/gurgaon/about-us/karma-yoga",
    },
    {
      id: 2,
      author: "AACSB International",
      year: "2026",
      title: "Global Standards for Business Education",
      publisher: "AACSB International",
      href: "https://www.aacsb.edu/-/media/documents/accreditation/2026/2026-global-standards.pdf",
    },
    {
      id: 3,
      author: "United Nations",
      year: "2015",
      title: "Sustainable Development Goal 4: Quality Education",
      publisher: "United Nations Department of Economic and Social Affairs",
      href: "https://sdgs.un.org/goals/goal4",
    },
    {
      id: 4,
      author: "United Nations",
      year: "2015",
      title: "Sustainable Development Goal 11: Sustainable Cities and Communities",
      publisher: "United Nations Department of Economic and Social Affairs",
      href: "https://sdgs.un.org/goals/goal11",
    },
    {
      id: 5,
      author: "UNICEF and the LEGO Foundation",
      year: "n.d.",
      title: "Learning Through Play",
      publisher: "UNICEF",
      href: "https://www.unicef.org/southsudan/reports/learning-through-play",
    },
    {
      id: 6,
      author: "Bureau of Indian Standards",
      year: "2019",
      title:
        "IS 9873 (Part 1): Safety of Toys—Safety Aspects Related to Mechanical and Physical Properties",
      publisher: "Bureau of Indian Standards",
      href: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/standard_review/Standard_review/Isdetails?ID=MTczMDI%3D",
    },
  ],
  siblingHref: "/teaching/karma-yoga/india",
  siblingLabel: "Karma Yoga for India · Mehalchauri",
} satisfies SubjectCourseConfig;

export const businessSimulationCourse = {
  hero: {
    eyebrow: "Strategy capstone · MBA & eMBA Term 4",
    title: "Business Simulation",
    accent: "strategy under pressure, with consequences.",
    description:
      "A 20-session executive decision laboratory in which teams run a global technology company across Asia, Europe and the United States—integrating strategy, marketing, R&D, production, people, finance, tax and ESG while rivals move at the same time.",
    image: {
      src: "/images/gallery/winter-conference-2025-classroom.jpg",
      alt: "Students at laptops during a workshop at Great Lakes Gurgaon",
      objectPosition: "center 40%",
    },
  },
  metadata: [
    { label: "Course", value: "MBA & eMBA · Term 4" },
    { label: "Format", value: "20 sessions · 90 minutes each" },
    { label: "Decision unit", value: "5–7 member management teams" },
  ],
  inquiry: {
    title: "Before the first round, make the logic visible.",
    questions: [
      "Did your team win, or did a rival just lose?",
      "If a number surprises you, was it bad luck—or a hidden assumption?",
      "Would you make the same call if the ESG cost hit this quarter, not year five?",
    ],
  },
  promise: {
    title: "Run the whole business and defend every trade-off.",
    description:
      "The simulation makes interdependence unavoidable. A product launch can be strategically attractive and financially impossible; a stockout can validate demand and destroy value; an ESG choice can reshape both operating performance and stakeholder outcomes.",
  },
  roundArc: {
    eyebrow: "How the rounds compound",
    title: "Each round removes an excuse.",
    description:
      "The simulation is not a set of isolated contests. Every round inherits the last round's decisions, and every debrief raises the bar for what counts as a defensible choice.",
    rounds: [
      {
        round: "Round 1",
        focus: "Commit to a thesis",
        shift:
          "Teams choose price, product mix and capacity with the least evidence they will ever have in the course.",
        question: "Did your team buy growth, earn it, or gamble on it?",
      },
      {
        round: "Round 2",
        focus: "Meet the causal chain",
        shift:
          "Forecasts meet results. Teams must trace which numbers were caused by their own strategy, by a rival's move, or by a hidden assumption.",
        question: "Which number is an outcome, and which one was the cause?",
      },
      {
        round: "Round 3",
        focus: "Defend coherence",
        shift:
          "Growth, margin, cash, risk and sustainability choices are now read as one connected system—winning on one axis while breaking another no longer counts as winning.",
        question: "Would this decision survive being read back to you as a single, connected story?",
      },
      {
        round: "Round 4",
        focus: "Compress to a decision rule",
        shift:
          "Cumulative returns across teams compress sharply by the final round. The debrief stops accepting a rank as the answer and asks for the one rule that would have prevented the round's worst reversal.",
        question:
          "What is the one rule that would have prevented your team's worst reversal this round?",
      },
    ],
  },
  resources: {
    eyebrow: "From the live sections · Round-by-round materials",
    title: "The actual decks and results, ready to study.",
    description:
      "These are the debrief decks and results workbooks from the sections as they actually ran—not illustrative examples. Download them, compare your own team's line against the cohort, and come to the next round with a sharper thesis.",
    rounds: [
      {
        round: "Round 1",
        headline:
          "The opening round already separated the field sharply, with one team in nearly every group posting a deep loss while the leaders were decided by only a few points of TSR.",
        groups: [
          {
            label: "Section C",
            summary:
              "Section C ran only Universe 1 in the opening round. Grey took the early lead on cumulative TSR (35.5%), narrowly ahead of Pink and Akatsuki, even though Pink actually closed the round with the strongest cumulative earnings of the seven teams. Green's aggressive early spend produced the round's only loss and the field's weakest return, at -49.5% TSR. Universe 2 had not yet joined Section C, so there is no cross-universe comparison for Round 1.",
            files: [
              {
                label: "Universe 1 debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-1/section-c/section-c-round1-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-1/section-c/section-c-round1-universe1-results.xls",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Section D ran both universes from the very first round. Universe 1's Ochre took the early lead by combining market-share strength with credible future value, narrowly ahead of Orange and Red Rangers—Red Rangers actually posted the round's highest profit without topping TSR—while Green fell to the weakest market capitalisation of the six teams despite issuing fresh equity. Universe 2 was calmer at the top, with Grey leading on cumulative TSR (32.1%) ahead of Blue and Green, while Orange brought up the rear.",
            files: [
              {
                label: "Universe 1 debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-1/section-d/section-d-round1-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-1/section-d/section-d-round1-universe1-results.xls",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-1/section-d/section-d-round1-universe2-results.xls",
              },
            ],
          },
        ],
      },
      {
        round: "Round 2",
        headline:
          "Leadership changed hands in three of the four groups, and both sections' Universe 2 closed the round with the stronger economics.",
        groups: [
          {
            label: "Section C",
            summary:
              "Universe 1 changed hands at the top as Harshad Mehta Gang (Round 1's Red, renamed) surged to the Round 2 lead on TSR (39.8%) and became the universe's global market-share leader, while Green clawed back roughly $833m from Round 1's loss without yet reaching the leaders and Lakshmi Chit Fund posted the steepest profit decline of the round. Universe 2 stayed with Lehman Bros. in front (48.2%), but SEBI's Watchlist emerged as the profit leader on sales up 68% and profit up over 220%, Vijay Mallya captured the universe's biggest market-share gain, and Blues Clues' position collapsed to a CCC+ credit rating. Universe 2 closed Round 2 with both the higher TSR leader and the stronger average return of the two universes.",
            files: [
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-2/section-c/section-c-round2-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-2/section-c/section-c-round2-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-2/section-c/section-c-round2-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-2/section-c/section-c-round2-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-2/section-c/section-c-round2-universe2-results.xls",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Universe 1 saw its first change at the top: Orange overtook Ochre for the Round 2 lead even though Red Rangers held the higher current profit and Ochre the better ROCE, and no team outside the leading three broke into contention. Green's operating picture improved sharply, moving from deeply negative returns to positive ROS and ROCE and becoming the universe's volume leader, though it remained well behind the leaders on value. Universe 2 stayed with Grey in front (28.6%) ahead of Green and Blue, while Ochre's cumulative TSR turned negative (-2.9%) for the round.",
            files: [
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-2/section-d/section-d-round2-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-2/section-d/section-d-round2-universe1-results.xls",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-2/section-d/section-d-round2-universe2-results.xls",
              },
            ],
          },
        ],
      },
      {
        round: "Round 3",
        headline:
          "Two of the four groups saw their Round 1 leader retake the top spot, while Section D's Universe 1 produced the biggest single rank jump of the series so far.",
        groups: [
          {
            label: "Section C",
            summary:
              "Universe 1's leadership changed hands again as Grey reclaimed the top spot it held in Round 1, becoming what the debrief calls the round's \"coherent leader\" on the strength of the highest profit and an AA credit rating, even as Harshad Mehta Gang kept the higher market capitalisation. The universe's profit pool turned negative overall, swinging from +$1.00bn in Round 2 to -$0.61bn in Round 3, with Lakshmi Chit Fund posting the steepest loss. Universe 2 changed leaders too: Satyam 2.0 (Round 3's successor to Vijay Mallya) took over as TSR and profit leader from Round 2's Lehman Bros., which slipped to third, while SEBI's Watchlist held second. Universe-wide, sales grew from $11.1bn to $13.9bn even as aggregate profit fell from $3.38bn to $2.08bn.",
            files: [
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-c/section-c-round3-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-c/section-c-round3-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-3/section-c/section-c-round3-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-c/section-c-round3-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-3/section-c/section-c-round3-universe2-results.xls",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Universe 1 saw Ochre regain the lead it held in Round 1 and lost in Round 2, while Grey produced the section's largest rank climb of the series, rising from fifth in each of the first two rounds to second on the back of strong profit, ROS, ROCE and an AAA credit rating. Universe 2 stayed settled at the top: Grey held first across all three rounds even as its TSR level declined, while The Godfathers recovered to second place and Red fell from a middle rank to last.",
            files: [
              {
                label: "Team flow map, Round 1 → Round 3",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-team-flow-map.pptx",
              },
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-universe1-results.xls",
              },
              {
                label: "Universe 2 debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-3/section-d/section-d-round3-universe2-results.xls",
              },
            ],
          },
        ],
      },
      {
        round: "Round 4",
        headline: "Universe leadership changed hands in both sections; compression continued everywhere.",
        groups: [
          {
            label: "Section C",
            summary:
              "Universe 1's Big Bulls climbed from fifth to first as Green staged a sharp recovery, while Harshad Mehta Gang and Grey both slid down the table. Universe 2 saw Lehman Bros. retake the lead as Blues Clues rose from sixth to second. Both universes show cumulative TSR compressing hard by the final round, with Universe 2 still holding the stronger aggregate profit and market value of the two.",
            files: [
              {
                label: "Team flow map, Round 1 → Round 4",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-team-flow-map.pptx",
              },
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-4/section-c/section-c-round4-universe2-results.xls",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Universe 1's Red Rangers took over the lead in the final round after three rounds sitting third, while Ochre and Orange both lost ground. Universe 2 stayed calmer: Grey held first from Round 1 through Round 4, and Ochre made the section's biggest late climb, from fourth to third. Read the flow-map deck alongside the results workbook to see exactly which decisions moved each line.",
            files: [
              {
                label: "Team flow map, Round 1 → Round 4",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-team-flow-map.pptx",
              },
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-4/section-d/section-d-round4-universe2-results.xls",
              },
            ],
          },
        ],
      },
      {
        round: "Round 5",
        headline:
          "Leadership turned over in one universe of each section while the other stayed settled at the top.",
        groups: [
          {
            label: "Section C",
            summary:
              "Universe 1's Lakshmi Chit Fund made the round's biggest jump, climbing from seventh to fourth, while Green took over the lead from Big Bulls, which slipped to second. Universe 2 stayed calmer at the top—Lehman Bros. and Blues Clues held first and second—with SEBI's Watchlist climbing one place to fourth as T5S fell to fifth. Universe 2 closed Round 5 with the stronger economics of the two: a positive aggregate profit and average TSR against Universe 1's negative figures on both counts.",
            files: [
              {
                label: "Team flow map, Round 1 → Round 5",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-team-flow-map.pptx",
              },
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-universe2-results.xls",
              },
              {
                label: "Integrated final workshop deck",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-integrated-final-workshop.pptx",
              },
              {
                label: "Final reflection & participation toolkit",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-final-reflection-toolkit.pptx",
              },
              {
                label: "Team reflection questions",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-c/section-c-round5-team-reflection-questions.pptx",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Universe 1 changed hands at the top: Orange climbed from third to first as Red Rangers, the Round 4 leader, slipped to second and Ochre fell to third. Universe 2 was calmer at the summit—Grey held first from Round 4 into Round 5—but HallaBol produced the round's largest swing anywhere in Section D, climbing from last place to second, while The Godfathers and Ochre both lost ground. The two universes split on quality this round: Universe 1 closed with the stronger total profit and a positive average TSR, while Universe 2's leader posted the higher individual TSR even as the universe's average TSR stayed negative.",
            files: [
              {
                label: "Team flow map, Round 1 → Round 5",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-team-flow-map.pptx",
              },
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-universe1-results.xls",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-universe2-results.xls",
              },
              {
                label: "Integrated final workshop deck",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-integrated-final-workshop.pptx",
              },
              {
                label: "Final reflection & participation toolkit",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-final-reflection-toolkit.pptx",
              },
              {
                label: "Team reflection questions",
                format: "Slides",
                href: "/documents/business-simulation/round-5/section-d/section-d-round5-team-reflection-questions.pptx",
              },
            ],
          },
        ],
      },
      {
        round: "Round 6",
        headline:
          "Both of Section C's universes changed leaders this round, while Section D's stayed exactly as Round 5 left them.",
        groups: [
          {
            label: "Section C",
            summary:
              "Universe 1's leadership changed hands again: Lakshmi Chit Fund, fourth after Round 5, took over the Round 6 lead as Green slipped to second and Big Bulls fell from second all the way to fifth; Grey closed the round in last place. Universe 2 saw Blues Clues overtake Lehman Bros. for the lead, with SEBI's Watchlist climbing two places to second and Lehman Bros. dropping to third, while T5S's TSR collapsed to -24.1%, the round's sharpest reversal. On aggregate economics, Universe 1 closed Round 6 with a positive average TSR (+2.6%) against Universe 2's negative average (-2.1%), even though Universe 2's aggregate profit pool—over $11bn—dwarfed Universe 1's $3.4bn.",
            files: [
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-c/section-c-round6-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-c/section-c-round6-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-6/section-c/section-c-round6-universe1-results.xlsx",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-c/section-c-round6-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-6/section-c/section-c-round6-universe2-results.xlsx",
              },
            ],
          },
          {
            label: "Section D",
            summary:
              "Universe 1 was the calmest group anywhere in the course this round: Orange, Red Rangers and Ochre held exactly the same 1-2-3 order they closed Round 5 in, with Orange's and Red Rangers' TSRs separated by just 0.03 points. Universe 2 stayed with Grey in the lead for a third straight round, while Red posted the group's weakest score, closing at -15.7% TSR. Universe 1 closed with the stronger economics of the two universes this round: a higher aggregate profit ($7.4bn vs $4.7bn) and a higher average TSR (+4.1% vs +2.5%).",
            files: [
              {
                label: "Universe 1 vs Universe 2 insights",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-d/section-d-round6-u1-vs-u2-insights-debrief.pptx",
              },
              {
                label: "Universe 1 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-d/section-d-round6-universe1-debrief.pptx",
              },
              {
                label: "Universe 1 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-6/section-d/section-d-round6-universe1-results.xlsx",
              },
              {
                label: "Universe 2 comparative debrief",
                format: "Slides",
                href: "/documents/business-simulation/round-6/section-d/section-d-round6-universe2-debrief.pptx",
              },
              {
                label: "Universe 2 results workbook",
                format: "Workbook",
                href: "/documents/business-simulation/round-6/section-d/section-d-round6-universe2-results.xlsx",
              },
            ],
          },
        ],
      },
    ],
  },
  teachingMoment: {
    eyebrow: "Decision debrief",
    title: "The learning happens when the logic is made visible.",
    description:
      "Teams must explain what they expected, what they chose and why the result differed. A live debrief turns performance into evidence, surfaces cross-functional contradictions and gives the next round a sharper strategic thesis.",
    image: {
      src: "/images/teaching/business-simulation/decision-debrief.jpg",
      alt: "Dr Swapnil Sahoo facilitating a live decision debrief with management learners.",
      width: 960,
      height: 1280,
      objectPosition: "center 68%",
    },
    caption:
      "Facilitated debrief · forecast, decision, result, variance and the next adaptive move.",
  },
  principles: [
    {
      title: "Make the functions cohere",
      description:
        "Marketing, R&D, operations, finance, people and ESG decisions are judged as one mutually reinforcing system—not as six functional answers.",
      citations: [1, 2],
    },
    {
      title: "Preserve the forecast",
      description:
        "Teams must forecast before submitting, preserve their decision logic and compare intent with the operational and financial results that follow.",
      citations: [1, 5],
    },
    {
      title: "Change course deliberately",
      description:
        "A strategy is a testable set of choices. Strong teams distinguish a weak execution signal from a broken strategic assumption and adapt deliberately.",
      citations: [2, 3, 4],
    },
  ],
  learningLoop: {
    name: "Competitive decision loop",
    title: "Decide. Observe. Diagnose. Adapt.",
    description:
      "Each round is both a competitive event and a learning experiment. The quality of the course comes from the disciplined loop around submission—not from the leaderboard alone.",
    steps: [
      {
        label: "Orient",
        title: "Frame",
        description:
          "State the strategic thesis, winning aspiration and assumptions for the round.",
      },
      {
        label: "Anticipate",
        title: "Forecast",
        description: "Estimate demand, rival moves, capacity, cash and material downside.",
      },
      {
        label: "Integrate",
        title: "Decide",
        description:
          "Align product, price, promotion, R&D, production, funding, tax, people and ESG.",
      },
      {
        label: "Commit",
        title: "Submit",
        description: "Run cross-checks, record rationale and complete a rotating team sign-off.",
      },
      {
        label: "Read",
        title: "Observe",
        description: "Separate market outcomes, operating outcomes and financial consequences.",
      },
      {
        label: "Explain",
        title: "Diagnose",
        description:
          "Trace variance to assumptions, choices, execution, competitors or system effects.",
      },
      {
        label: "Renew",
        title: "Adapt",
        description:
          "Protect coherent choices, correct errors and revise the thesis when evidence demands it.",
      },
      {
        label: "Own",
        title: "Defend",
        description:
          "Explain the decision trail, trade-offs, learning and next move under questioning.",
      },
    ],
  },
  learningOutcomes: [
    "Formulate and adapt competitive strategy under uncertainty while anticipating rival moves and market evolution.",
    "Integrate cross-functional decisions and explain their operational, financial and stakeholder consequences.",
    "Develop a glocal strategy across regions with different preferences, economics, taxes, tariffs and constraints.",
    "Lead an accountable management team, preserve a decision trail and convert round evidence into individual learning.",
  ],
  sessions: [
    {
      number: "01",
      phase: "Foundation · Practice Round 1",
      title: "Enter the decision arena",
      question: "What does a coherent strategy look like before the first number is entered?",
      topics: [
        "Three Horizons, positioning and industry logic",
        "Simulation interface, company history and market outlook",
        "Winning aspiration, where to play and how to win",
      ],
      activities: [
        "Read the competitive arena and identify critical uncertainties",
        "Translate strategy into a first-round decision hypothesis",
        "Assign team roles and complete Practice Round 1",
      ],
      artifact: "One-page strategy thesis, team operating charter and Practice Round 1 submission.",
      citations: [1, 2, 3],
    },
    {
      number: "02",
      phase: "Foundation · Cross-functional nexus",
      title: "See the whole enterprise",
      question: "Where do individually sensible functional decisions collide?",
      topics: [
        "Demand, pricing, promotion and product features",
        "R&D, licensing, production and inventory",
        "Liquidity, capital structure, tax and transfer pricing",
      ],
      activities: [
        "Map causal links across the decision set",
        "Find two likely trade-offs and one hidden constraint",
        "Run a cross-functional coherence review",
      ],
      artifact: "Enterprise decision map and pre-submission coherence checklist.",
      citations: [1],
    },
    {
      number: "03",
      phase: "Foundation · Practice 1 debrief",
      title: "Read results without making excuses",
      question: "Which outcomes came from strategy, execution, rivals or an incorrect assumption?",
      topics: [
        "SWOT as an evidence summary",
        "GE–McKinsey portfolio logic",
        "Variance, stockouts, idle capacity and emergency debt",
      ],
      activities: [
        "Compare forecast, decision and realised result",
        "Trace one success and one failure through the system",
        "Identify the next round’s highest-value learning question",
      ],
      artifact: "Practice Round 1 variance bridge and after-action review.",
      citations: [1, 4],
    },
    {
      number: "04",
      phase: "Foundation · Practice 2 preparation",
      title: "Build the dashboard",
      question: "Which few indicators reveal whether the strategy is working—and why?",
      topics: [
        "Leading and lagging indicators",
        "Demand and cash forecasting",
        "Decision journal and assumption ledger",
      ],
      activities: [
        "Design a team dashboard",
        "Create base, upside and downside forecasts",
        "Write explicit assumptions before Practice Round 2",
      ],
      artifact: "Forecast model, dashboard and assumption ledger.",
      citations: [1, 5],
    },
    {
      number: "05",
      phase: "Foundation · Practice Round 2",
      title: "Challenge the plan before submitting",
      question: "Can the team improve its thesis without overreacting to one practice result?",
      topics: [
        "Benchmarking and forecast revision",
        "Strategic fit and recurring decision errors",
        "Quiz 1: concepts, rules and interpretation",
      ],
      activities: [
        "Complete a red-team review of the proposed decisions",
        "Submit Practice Round 2 with rotating sign-off",
        "Complete Quiz 1 and log the final rationale",
      ],
      artifact: "Signed Practice Round 2 decision packet and Quiz 1.",
      citations: [1, 2],
    },
    {
      number: "06",
      phase: "Diagnosis · Financial and portfolio logic",
      title: "Find the profit—and the fragility",
      question: "Where is value actually created, consumed and exposed?",
      topics: [
        "Common-size financial statements",
        "SWOT, BCG and GE–McKinsey comparisons",
        "Product, region and technology economics",
      ],
      activities: [
        "Decompose margin, capital and cash drivers",
        "Compare portfolio tools against simulation evidence",
        "Identify one growth engine and one value leak",
      ],
      artifact: "Profit-pool map and portfolio decision memo.",
      citations: [1, 4],
    },
    {
      number: "07",
      phase: "Competition · Round 1",
      title: "Make the first consequential move",
      question: "Which choices deserve scarce capital when every team is now a rival?",
      topics: [
        "Regional demand and price response",
        "Product roadmap and capacity commitment",
        "Liquidity resilience and competitive anticipation",
      ],
      activities: [
        "Forecast by region and technology",
        "Allocate capital against the strategy thesis",
        "Run the full input-validation checklist and submit",
      ],
      artifact: "Competitive Round 1 board paper and submitted decision set.",
      citations: [1, 2],
    },
    {
      number: "08",
      phase: "Competition · Market evolution",
      title: "Manage the product life cycle",
      question: "When should the team harvest, migrate, accelerate or abandon a technology?",
      topics: [
        "Technology and product life cycles",
        "Adoption, substitution and cannibalisation",
        "Industry evolution and timing advantage",
      ],
      activities: [
        "Build a technology migration map",
        "Stress-test price and feature choices by region",
        "Write explicit launch and exit triggers",
      ],
      artifact: "Technology roadmap with launch, migration and exit gates.",
      citations: [1, 3],
    },
    {
      number: "09",
      phase: "Competition · Round 1 debrief",
      title: "Turn feedback into strategy",
      question: "What should change after Round 1—and what must remain coherent?",
      topics: [
        "Competitive benchmarking",
        "Strategy versus operational effectiveness",
        "Reflection and Round 2 thesis revision",
      ],
      activities: [
        "Compare team position with named competitor archetypes",
        "Run a keep/change/stop review",
        "Rewrite only the assumptions invalidated by evidence",
      ],
      artifact: "Round 1 learning memo and revised Round 2 thesis.",
      citations: [1, 2],
    },
    {
      number: "10",
      phase: "Competition · Round 2",
      title: "Use the evidence to sharpen Round 2",
      question: "How will the team create advantage rather than merely repair last round?",
      topics: [
        "Positioning and capability commitment",
        "Capacity, inventory and fulfilment",
        "Funding growth without hidden fragility",
      ],
      activities: [
        "Update demand and cash scenarios",
        "Challenge the decision set against strategic fit",
        "Submit Round 2 with rationale and sign-off",
      ],
      artifact: "Round 2 strategy-on-a-page and decision packet.",
      citations: [1, 2, 4],
    },
    {
      number: "11",
      phase: "Competition · Round 2 debrief / Round 3",
      title: "Scale what works without scaling the error",
      question: "Which performance pattern is repeatable—and which is temporary?",
      topics: [
        "Repeatability, commitments and capabilities",
        "R&D scale, manufacturing and route-to-market",
        "Round 3 implementation discipline",
      ],
      activities: [
        "Separate structural advantage from one-round luck",
        "Audit bottlenecks before committing scale",
        "Implement and submit Round 3",
      ],
      artifact: "Capability audit, scale thesis and Round 3 submission.",
      citations: [1, 4],
    },
    {
      number: "12",
      phase: "Responsibility · ESG integration",
      title: "Put ESG inside the value chain",
      question:
        "How do environmental, social and governance choices change strategy—not decorate it?",
      topics: [
        "CO₂, energy and water efficiency",
        "Labour policy and governance",
        "Stakeholder value, investment and trade-offs",
      ],
      activities: [
        "Trace ESG choices through operations and financial outcomes",
        "Compare short-run cost with long-run risk and capability",
        "Define a material ESG position for the company",
      ],
      artifact: "ESG value-driver map and materiality-backed decision statement.",
      citations: [1, 5],
    },
    {
      number: "13",
      phase: "Competition · Round 3 debrief / Round 4",
      title: "Explain performance to the board",
      question: "Can the team explain performance with evidence—and choose the next move?",
      topics: [
        "Board reporting and causal explanation",
        "Round 3 debrief",
        "Round 4 decision integration",
      ],
      activities: [
        "Build a concise performance bridge",
        "Defend one underperforming decision under questioning",
        "Submit Round 4 with an explicit counterfactual",
      ],
      artifact: "Board dashboard, causal narrative and Round 4 submission.",
      citations: [1, 5],
    },
    {
      number: "14",
      phase: "Integration · Strategy reset",
      title: "Reconnect choices to the growth horizon",
      question: "Is the portfolio balancing today’s engine, emerging growth and future options?",
      topics: [
        "Three Horizons review",
        "Industry logic and positioning",
        "Quiz 2: integration and application",
      ],
      activities: [
        "Allocate initiatives across the three horizons",
        "Test the portfolio against the winning aspiration",
        "Complete Quiz 2 and document the reset",
      ],
      artifact: "Three-horizon portfolio map, strategy reset and Quiz 2.",
      citations: [2, 3],
    },
    {
      number: "15",
      phase: "Competition · Round 4 debrief / Round 5",
      title: "Choose under accumulated consequences",
      question: "What becomes possible—or impossible—because of the choices already made?",
      topics: [
        "Path dependence and strategic commitment",
        "Cumulative shareholder return and ROCE",
        "Round 5 capital allocation",
      ],
      activities: [
        "Audit inherited constraints and remaining degrees of freedom",
        "Prioritise value creation over leaderboard chasing",
        "Submit Round 5 with board-level sign-off",
      ],
      artifact: "Commitment map, capital allocation memo and Round 5 submission.",
      citations: [1, 4],
    },
    {
      number: "16",
      phase: "Diagnosis · Decision quality",
      title: "Correct recurring forecast errors",
      question: "Which recurring error is the team now equipped to eliminate?",
      topics: [
        "Benchmarking and forecast calibration",
        "Stockout and inventory mirror errors",
        "Funding, transfer pricing and input validation",
      ],
      activities: [
        "Run a forecast accuracy review",
        "Conduct a pre-mortem on the next decision set",
        "Upgrade the team checklist from observed failures",
      ],
      artifact: "Decision-quality audit and revised submission checklist.",
      citations: [1, 5],
    },
    {
      number: "17",
      phase: "Competition · Round 5 debrief / Round 6",
      title: "Make the final competitive commitment",
      question:
        "What is the strongest defensible move given the team’s position and remaining time?",
      topics: [
        "Endgame strategy and competitor response",
        "Profit, ROCE, TSR and ESG balance",
        "Round 6 execution",
      ],
      activities: [
        "Define endgame priorities and non-negotiables",
        "Red-team downside and liquidity",
        "Submit Round 6 with complete decision trace",
      ],
      artifact: "Endgame board memo and Round 6 submission.",
      citations: [1, 2],
    },
    {
      number: "18",
      phase: "Synthesis · Final round debrief",
      title: "Audit the strategy across time",
      question: "Which causal story best explains the firm’s cumulative performance?",
      topics: [
        "Round 6 and total-course performance",
        "Strategic consistency and adaptation",
        "Counterfactuals and subsequent-cycle decisions",
      ],
      activities: [
        "Build a six-round strategy timeline",
        "Identify pivotal choices and plausible counterfactuals",
        "Re-run one future cycle as a disciplined thought experiment",
      ],
      artifact: "Cumulative performance bridge and strategy timeline.",
      citations: [1, 5],
    },
    {
      number: "19",
      phase: "Synthesis · Reflective review",
      title: "Separate team performance from personal learning",
      question: "What did the firm learn—and what did each manager learn about their own judgment?",
      topics: [
        "Shareholder value and stakeholder value",
        "Team process, conflict and leadership",
        "Decision habits and transferable insight",
      ],
      activities: [
        "Conduct a structured team after-action review",
        "Compare peer evidence with self-assessment",
        "Draft the reflective report with claims tied to decisions",
      ],
      artifact: "Team after-action review and individual evidence-backed reflection.",
      citations: [5],
    },
    {
      number: "20",
      phase: "Synthesis · Individual viva",
      title: "Defend the decision trail",
      question:
        "Can each learner explain the firm’s choices, consequences and next move without hiding behind the team?",
      topics: [
        "Strategic synthesis",
        "Individual accountability",
        "Transfer to managerial practice",
      ],
      activities: [
        "Present the firm’s strategic arc in a concise close",
        "Complete an individual viva using live decision evidence",
        "State one durable practice and one unresolved question",
      ],
      artifact: "Final reflective report, viva record and personal transfer commitment.",
      citations: [2, 5],
    },
  ],
  studios: [
    {
      title: "Global decision room",
      description:
        "Teams integrate regional forecasts, product choices, R&D, production, logistics, funding, tax, people and ESG before every submission.",
      evidence: "Signed decision packet + assumption ledger",
    },
    {
      title: "Round debrief lab",
      description:
        "Forecast-to-actual bridges reveal whether variance came from an assumption, a choice, execution, rivals or the simulated system.",
      evidence: "Variance bridge + after-action review",
    },
    {
      title: "Board challenge",
      description:
        "A board-style review forces concise causal explanation, visible trade-offs and a defensible allocation of scarce capital.",
      evidence: "Dashboard + board memo",
    },
    {
      title: "Individual decision defence",
      description:
        "The viva tests whether every learner can reconstruct the strategy and reason independently from team evidence.",
      evidence: "Decision trace + viva",
    },
  ],
  assessments: [
    {
      weight: "10%",
      title: "Participation & peer evaluation",
      description:
        "Prepared contribution, functional ownership, constructive challenge, reliability and evidence of team citizenship.",
      method: "Observation + confidential peer evidence",
    },
    {
      weight: "15%",
      title: "Quiz 1",
      description:
        "Simulation rules, foundational strategy, cross-functional logic and interpretation of practice-round evidence.",
      method: "Closed-book individual quiz",
    },
    {
      weight: "15%",
      title: "Quiz 2",
      description:
        "Integrated application of growth, positioning, portfolio, forecasting and competitive decision logic.",
      method: "Closed-book individual quiz",
    },
    {
      weight: "35%",
      title: "Simulation performance",
      description:
        "Cumulative shareholder return 15%, ROCE 10%, final-round profit 5% and ESG performance 5%.",
      method: "Objective platform metrics · group",
    },
    {
      weight: "10%",
      title: "Reflective report",
      description:
        "A causal, evidence-backed account of strategy, pivotal choices, team learning, limitations and counterfactuals.",
      method: "Written synthesis",
    },
    {
      weight: "15%",
      title: "Individual viva",
      description:
        "Independent defence of decisions, results, rules, cross-functional implications and transfer to practice.",
      method: "Oral examination using live evidence",
    },
  ],
  safeguards: [
    {
      title: "No collusion across firms",
      description:
        "Teams may learn from public results but may not share confidential decisions, coordinate market moves or misrepresent submissions.",
      citations: [],
    },
    {
      title: "Saved-decision verification",
      description:
        "Every round ends with input validation, saved-submission confirmation and a rotating sign-off so participation is auditable.",
      citations: [1],
    },
    {
      title: "AI must remain source-bounded",
      description:
        "AI may interrogate authorised course rules and team data; it may not invent platform logic, fabricate causal evidence or replace individual judgment.",
      citations: [5],
    },
    {
      title: "Use more than the leaderboard",
      description:
        "Performance metrics are combined with quizzes, logs, peer evidence, reflection and viva so polished narrative or a lucky round cannot stand alone.",
      citations: [5],
    },
    {
      title: "Trace every recommendation",
      description:
        "Reports distinguish facts, calculations, assumptions and counterfactuals; causal claims must point back to decisions and results.",
      citations: [],
    },
    {
      title: "Individual accountability",
      description:
        "Every manager must understand the whole firm, not only a functional silo, and be ready to defend the integrated decision set.",
      citations: [1],
    },
  ],
  evidenceNote: {
    title: "Practice Round 1: a diagnostic, not a universal claim",
    description:
      "The architecture follows the approved 2025–27 course outline, faculty session plan, current round checklist and reflective-assessment review held in the teaching source pack. The figures below are explicitly labelled statistics from one practice-round simulation universe; they illustrate decision consequences, not real-market benchmarks.",
    indicators: [
      "Practice Round 1 statistic · TSR spread: +31.4% to −32.1%",
      "Practice Round 1 statistic · emergency-debt rate: 13.2%",
      "Practice Round 1 statistic · estimated stockout loss: approximately $310m",
      "Decision evidence · strategy thesis, forecast and assumption ledger",
      "Performance evidence · market, operating, financial and ESG dashboards",
      "Learning evidence · quizzes, peer review, reflection and individual viva",
    ],
  },
  references: [
    {
      id: 1,
      author: "Cesim",
      year: "n.d.",
      title: "Cesim Global Challenge: Strategy and International Business Simulation",
      publisher: "Cesim Oy",
      href: "https://www.cesim.com/simulations/cesim-global-challenge-international-business-strategy-simulation-game",
    },
    {
      id: 2,
      author: "Lafley, A. G., & Martin, R. L.",
      year: "2013",
      title: "Playing to Win: How Strategy Really Works",
      publisher: "Harvard Business Review Press",
      href: "https://hbr.org/books/playing-to-win",
    },
    {
      id: 3,
      author: "Baghai, M., Coley, S., & White, D.",
      year: "1999",
      title: "The Three Horizons of Growth",
      publisher: "McKinsey & Company",
      href: "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/enduring-ideas-the-three-horizons-of-growth",
    },
    {
      id: 4,
      author: "Ghemawat, P., & Rivkin, J. W.",
      year: "1998",
      title: "Creating Competitive Advantage",
      publisher: "Harvard Business School",
      href: "https://www.hbs.edu/ris/Profile%20Files/Rivkin_Jan_CV_2025_11776012-4c21-4518-9a08-7aa1b9dda44e.pdf",
    },
    {
      id: 5,
      author: "AACSB International",
      year: "2026",
      title: "Global Standards for Business Education",
      publisher: "AACSB International",
      href: "https://www.aacsb.edu/-/media/documents/accreditation/2026/2026-global-standards.pdf",
    },
  ],
  siblingHref: "/teaching/karma-yoga",
  siblingLabel: "Karma Yoga",
} satisfies SubjectCourseConfig;
