import type {
  Assumption,
  CalcLine,
  Difficulty,
  Probe,
  RouteChoice,
  Scope,
  Sensitivity,
  Trap,
  Triangulation,
  TreeNode,
} from "@/features/placements/data/case-primitives";

/**
 * GENERATED FILE - do not edit by hand.
 * Source: content/guesstimates/*.json, emitted by scripts/generate-guesstimates.py.
 *
 * Every `expr` in `calculation` and `triangulation.lines` is evaluated by
 * scripts/check-guesstimates.mjs at build time and asserted against `result`,
 * so a wrong sum fails the build instead of reaching a student.
 */

export type GuesstimateArchetype =
  | "population-funnel"
  | "household-ownership-stock"
  | "installed-base-replacement"
  | "capacity-bottleneck"
  | "single-asset-revenue"
  | "network-price-mix"
  | "penetration-cascade"
  | "unit-chain-infrastructure"
  | "physical-proxy-consumable"
  | "funnel-conversion-fmcg"
  | "revenue-pool-take-rate"
  | "closed-population"
  | "occupational-cohort"
  | "expected-value";

export interface Guesstimate {
  id: string;
  number: string;
  question: string;
  /** Short label for tabs and cards - the full question is too long. */
  tabLabel: string;
  archetype: GuesstimateArchetype;
  difficulty: Difficulty;
  timeboxMinutes: number;
  /** The one transferable idea this question exists to teach. */
  teachingPoint: string;
  scope: Scope;
  routeChoice: RouteChoice;
  tree: { root: string; rootFormula?: string; value?: string; branches: readonly TreeNode[] };
  assumptions: readonly Assumption[];
  calculation: readonly CalcLine[];
  finalAnswer: string;
  finalAnswerNumeric: number;
  /** An honest band, not false precision. */
  answerBand: string;
  /** Being right to the power of ten is the real test. */
  orderOfMagnitude: string;
  triangulation: Triangulation;
  sensitivity: Sensitivity;
  sanityChecks: readonly string[];
  traps: readonly Trap[];
  probes: readonly Probe[];
}

export const guesstimates: readonly Guesstimate[] = [
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "a-autoshare",
      "whyThisLever": "It is the only number in the chain nobody in the room can source, and it enters as a direct multiplier — double it and the fleet doubles. Everything else is either a census anchor or bounded by something physical: a paid trip cannot average five minutes, a driver cannot work twenty hours, a third of trips will always be walked. The auto share has no such floor or ceiling, which is why it is where the argument actually happens.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "7% — buses and the metro carrying more of the city than you assumed",
          "answer": "≈ 57,000 vehicles",
          "deltaVsBase": "−30%"
        },
        {
          "scenario": "Base",
          "leverValue": "10% — autos as the residual after two-wheelers, public transport and cars",
          "answer": "≈ 82,000 vehicles",
          "deltaVsBase": "—"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "15% — the number a commuter waiting outside a metro station would give you",
          "answer": "≈ 1.23 lakh vehicles",
          "deltaVsBase": "+50%"
        }
      ],
      "breakpoint": "To drop the answer below 50,000 you need the auto share under 6%; to clear 1.5 lakh you need it above 19%. Both are arguable over a coffee and neither survives thirty seconds with a mode-share table. That bracket — 50,000 to 1.5 lakh — is the honest precision of this estimate, and the order of magnitude holds right across it. Saying that is a stronger answer than defending 82,000.",
      "oneLiner": "If there is no time for the grid, say this: the auto share of motorised trips is doing most of the work here, I have used 10%, the defensible range is 7 to 15, and the fleet moves roughly in proportion — so treat the answer as 'under a lakh, and nowhere near ten thousand'."
    },
    "number": "01",
    "difficulty": "Medium",
    "id": "auto-rickshaws",
    "archetype": "unit-chain-infrastructure",
    "routeChoice": {
      "chosen": "Hybrid",
      "why": "The demand half comes from population, which you can anchor, and the supply half comes from what one vehicle can physically absorb in a day, which you can reason out from trip length and waiting time. Neither half is an answer on its own — trips are not vehicles, and a vehicle's capacity means nothing until you know how much work is queued for it. Take the trip pool top-down, take throughput bottom-up, divide, and say out loud that the units cancel to vehicles.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "The pure top-down move is to take India's registered three-wheeler fleet and scale it by Bengaluru's share of urban population. It fails twice over. It rests on a national registration base you cannot source in the room and could not defend if you could, and it scales by headcount when auto density is actually set by metro coverage, road width and the municipal permit cap — Bengaluru and Kolkata do not carry the same autos per lakh of people, and nothing inside a population ratio knows that. Worse, it delivers registrations, which is a different quantity from the one the question asked for. Keep it as a cross-check, not as the spine."
    },
    "sanityChecks": [
      "Spread 82,000 vehicles over Bengaluru's roughly 14,000 km of city roads and you get about six autos per kilometre of road — and only a fraction of those are on a main road at any one moment. Stand at a busy junction for a minute and that is roughly what passes. Had the chain produced 8 lakh, the street outside would look nothing like the city a resident actually walks through, and that gut check matters as much as the arithmetic.",
      "A quarter of the fleet running two shifts means about 1.02 lakh drivers, so roughly a lakh households — under 1% of the city's population living directly off the trade. That is the right order for a large informal occupation that is nonetheless not the city's biggest employer. A figure implying 5% of Bengaluru drives an auto would be self-evidently wrong.",
      "At 15.5 trips a day and an average fare around ₹90, a vehicle grosses roughly ₹1,400. Take out fuel and the daily rent and the driver keeps something in the ₹700 to ₹900 range. That is a plausible Bengaluru day. If the chain had implied ₹4,000 of gross fares per vehicle, either the trip count or the fare is wrong, and the trip count is the one to check first.",
      "Whatever you believe about permits — 1.5 lakh is the figure usually quoted — the active count has to sit below it, and comfortably below it, because permits are held through repairs, illness and outright abandonment. An estimate that lands above the permit base has counted something other than vehicles, almost always trips or drivers."
    ],
    "answerBand": "50,000 to 1.5 lakh — and the width of that band is set almost entirely by one lever, the auto share of motorised trips",
    "tree": {
      "root": "Auto-rickshaws working a typical Bengaluru weekday",
      "rootFormula": "= Daily auto trips ÷ Paid trips per vehicle per day",
      "value": "≈ 82,000 vehicles",
      "branches": [
        {
          "label": "Daily auto-rickshaw trips",
          "formula": "= Population × Trips per person × Motorised share × Auto share",
          "value": "≈ 12.7 lakh trips per day",
          "note": "The demand the fleet has to absorb. Three of these four levers sit close to anchors; the fourth carries the whole argument.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "City population, BBMP area",
              "formula": "Census anchor",
              "value": "1.3 crore",
              "note": "The municipal city, not the 1.4 crore metropolitan region. Say which one you are using in the same breath as the number."
            },
            {
              "label": "Trips per person per day, all modes",
              "formula": "× 1.5",
              "value": "≈ 1.95 crore trips",
              "note": "A commuter makes two, a school child two, and a long tail of the elderly and the housebound makes none."
            },
            {
              "label": "Motorised share of trips",
              "formula": "× 65%",
              "value": "≈ 1.27 crore motorised trips",
              "note": "About a third of urban trips are walked or cycled — the kirana, the school gate, the bus stop — and never touch a vehicle."
            },
            {
              "label": "Auto share of motorised trips",
              "formula": "= 1 − 45% two-wheelers − 33% bus and metro − 12% cars",
              "value": "10%, giving ≈ 12.7 lakh auto trips",
              "note": "Built as a residual rather than felt. The shakiest number on the page even so — flag it before the interviewer finds it."
            }
          ]
        },
        {
          "label": "Paid trips per vehicle per day",
          "formula": "= 75% of the fleet × 13.5 trips + 25% × 21.6 trips",
          "value": "≈ 15.5 trips",
          "note": "Not the critical path, but not the optional half either — it divides. A two-fold error here costs precisely what a two-fold error in the auto share costs, and candidates spend nine-tenths of their time on the other branch.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Paid trips per on-road hour",
              "formula": "= (60 ÷ 20-minute trip) × 45% of road time paid",
              "value": "1.35",
              "note": "Throughput after waiting at the stand, running back empty from a drop and stopping for lunch. Three paid trips every two hours, not four."
            },
            {
              "label": "Single-shift vehicle, 10 h on the road",
              "formula": "= 10 × 1.35",
              "value": "13.5 trips a day",
              "note": "One owner-driver, school run through to the evening peak, and the vehicle goes home with him at night."
            },
            {
              "label": "Double-shift vehicle, 16 h on the road",
              "formula": "= 16 × 1.35",
              "value": "21.6 trips a day",
              "note": "Rented to two drivers in succession — sixty per cent more output from the same vehicle, which is precisely why vehicles and drivers are different counts."
            },
            {
              "label": "Share of the fleet run on two shifts",
              "formula": "25%",
              "value": "≈ 15.5 weighted trips",
              "note": "The weighting is where the fleet stops being homogeneous. Skip it, assume everyone does 13.5, and you overcount vehicles by about a seventh."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Supply-side cross-check · the registration roll, stripped down",
      "route": "Top-down",
      "premise": "Approach the fleet as a permitted asset base rather than as answered demand. Start from the vehicles Bengaluru carries on its registration roll, take the auto slice of it, then strip out what is not roadworthy and what is not out today. This route never touches trips, trip length or mode share, so it fails in completely different places from the spine — which is the only reason it is worth running.",
      "lines": [
        {
          "id": "t1",
          "label": "Registered vehicles of every type in Bengaluru",
          "expr": "13000000 * 0.85",
          "display": "1.3 crore people × 0.85 registered vehicles per person",
          "result": 11050000,
          "unit": "vehicles",
          "carriedForward": "≈ 1.1 crore vehicles on the roll",
          "uses": [
            "a-pop",
            "a-vehreg"
          ],
          "soWhat": "A city with nearly one registered vehicle per resident is the anchor everyone has read. It is also cumulative, which matters far more by the last line of this route than it does here."
        },
        {
          "id": "t2",
          "label": "Passenger three-wheelers on the roll",
          "expr": "11050000 * 0.015",
          "display": "1.1 crore vehicles × 1.5% passenger autos",
          "result": 165750,
          "unit": "vehicles",
          "carriedForward": "≈ 1.65 lakh registrations",
          "uses": [
            "a-autoreg"
          ],
          "soWhat": "This is the permit-and-registration figure a candidate might half-remember and offer as the answer. It is an upper bound, and mistaking it for the answer is the most common single failure on this question."
        },
        {
          "id": "t3",
          "label": "Still roadworthy and genuinely in service",
          "expr": "165750 * 0.6",
          "display": "1.65 lakh registrations × 60% still a working vehicle",
          "result": 99450,
          "unit": "vehicles",
          "carriedForward": "≈ 1 lakh in service",
          "uses": [
            "a-inservice"
          ],
          "soWhat": "Two registrations in five are scrapped, cannibalised or parked for good. This line does all the work in this route and rests on the shakiest number in it — which is exactly why the cross-check is a bound, not a second answer."
        },
        {
          "id": "t4",
          "label": "Out on the road on a named weekday",
          "expr": "99450 * 0.9",
          "display": "1 lakh in service × 90% working today",
          "result": 89505,
          "unit": "vehicles",
          "carriedForward": "≈ 90,000 vehicles",
          "uses": [
            "a-worktoday"
          ],
          "soWhat": "Rest days, illness and servicing take the last tenth. Only now is the quantity the same as the one the spine produced, and matching the quantity before comparing the numbers is the discipline this whole cross-check exists to teach."
        },
        {
          "id": "t5",
          "label": "Trips per vehicle the supply route implies",
          "expr": "1267500 / 89505",
          "display": "12.7 lakh auto trips a day ÷ 90,000 vehicles",
          "result": 14.161,
          "tolerance": 0.0002,
          "unit": "trips per vehicle per day",
          "carriedForward": "not carried forward — it reads the gap",
          "uses": [],
          "soWhat": "Turn the discrepancy into a statement about a lever rather than a shrug. If the supply route is right, the average vehicle does 14.2 trips a day instead of 15.5 — about nine per cent, comfortably inside the error on a 45% utilisation figure. The two routes are not disagreeing about how big Bengaluru's auto trade is; they are disagreeing about how hard one vehicle works, which is a far smaller claim and a far better thing to say aloud."
        }
      ],
      "answer": "≈ 90,000 auto-rickshaws working a typical weekday",
      "verdict": "The demand route gives about 82,000 and the supply route about 90,000 — roughly a tenth apart, both sitting at 10^5. Resist calling that confirmation. The two chains share the same 1.3 crore population anchor, so they are not independent, and an error in that anchor moves both by the same proportion in the same direction. The gap that does exist runs the way you would predict: a registration roll is cumulative and a working fleet is not, because vehicles get scrapped far more readily than they get de-registered, so the supply route should sit high. Report the pair as a band — 80,000 to 1,00,000 — and say which way you think the error runs. A candidate who narrates the direction of a discrepancy is doing something a candidate who averages the two numbers is not."
    },
    "probes": [
      {
        "question": "Which of your numbers would you most want to check before you commit to this?",
        "intent": "Whether you can rank your own uncertainty rather than defending every figure with the same conviction.",
        "goodAnswer": "The auto share of motorised trips, at 10%. It is a direct multiplier, I built it as a residual rather than from a source, and the defensible range of 7 to 15% takes the answer from about 57,000 to about 1.23 lakh. Everything else is either anchored or bounded — a paid trip cannot average five minutes and a driver cannot work twenty hours — so those levers cannot hurt me the same way.",
        "weakAnswer": "All of them are assumptions, so ideally I would want real data on all of them."
      },
      {
        "question": "Bike taxis and app cabs have grown fast in Bengaluru. Does that change your answer?",
        "intent": "Whether you can move one lever in the right direction without rebuilding the chain, and whether you notice the second-order effect.",
        "goodAnswer": "It compresses the auto share, not the trip pool — the journeys still happen, they change mode. Take three points of motorised share off autos and the fleet falls about a third, into the high 50,000s. The second-order effect runs the other way: displaced drivers attach to aggregator platforms, which lifts paid utilisation above 45% and lets a smaller fleet serve the same trips. Both effects point down, so I would revise the answer down rather than sideways.",
        "weakAnswer": "Yes, the market is changing, so the number would probably be lower today."
      },
      {
        "question": "Your answer is well under what the city's permit count suggests. Are you wrong?",
        "intent": "Whether you can hold a discrepancy open and explain its direction instead of retrofitting the chain to close it.",
        "goodAnswer": "Probably not wrong, but incomplete. A permit roll is cumulative and a working fleet is not, so the gap is mostly vehicles that are scrapped, parked or long off the road — a real wedge, and it runs in the direction you would predict. If you want me to close it, I would raise the in-service share, because that is the number the registration route is silent on. I would not raise the auto trip share to make the two agree, because that is fitting the assumption to the answer.",
        "weakAnswer": "Then I would revise my assumptions upward until the two numbers match."
      },
      {
        "question": "How would this look on a Sunday?",
        "intent": "Whether you registered that the weekday basis was a choice you made, not a default you inherited.",
        "goodAnswer": "The trip pool falls — no school run, no office peak — but not as far as you would expect, because leisure, market and restaurant trips substitute, and those favour autos over buses. So the share rises while the pool falls. Fewer vehicles work, perhaps 15% fewer as drivers take their rest day, and each does somewhat fewer trips. I would take the fleet down about a fifth. The weekday was a deliberate choice of a typical day rather than an average one, and I would say which basis I was using before quoting any number.",
        "weakAnswer": "It would be lower, because fewer people travel at the weekend."
      },
      {
        "question": "Estimate it a completely different way. Ninety seconds.",
        "intent": "Whether a second route is already in reserve, and whether you can tell the difference between agreement and confirmation.",
        "goodAnswer": "Supply side. Bengaluru's registration roll runs close to one vehicle per resident — about 1.1 crore. Passenger autos are roughly 1.5% of that, so about 1.65 lakh registrations. Take 60% as still roadworthy and in service, and 90% of those as out on a given weekday: about 90,000. That lands within a tenth of my first answer, which is closer than either route deserves, because both start from the same population anchor. I would report a band of 80,000 to 1,00,000 rather than treat the agreement as proof.",
        "weakAnswer": "I would run the same method again with more accurate numbers at each step."
      }
    ],
    "finalAnswerNumeric": 82000,
    "tabLabel": "Auto-rickshaws, Bengaluru",
    "finalAnswer": "≈ 82,000 auto-rickshaws out earning on a typical Bengaluru weekday — say 'a bit over 80,000' aloud, and never 81,774.",
    "scope": {
      "countingWhat": "Individual passenger auto-rickshaws that complete at least one paid trip on a typical non-holiday weekday inside Bengaluru's municipal limits.",
      "unit": "auto-rickshaws (vehicles, not drivers, not permits)",
      "timeBasis": "stock (point in time)",
      "geography": "Bengaluru, BBMP municipal area (roughly 740 sq km) — not the wider metropolitan region",
      "included": [
        "Passenger autos completing at least one paid trip on the day — street-hailed, stand-based or app-booked",
        "CNG and electric three-wheelers carrying passengers, since the question is about work done, not about fuel",
        "Autos on fixed school and office shuttle contracts, which never wait at a stand but are on the road all morning",
        "Vehicles registered elsewhere in Karnataka that work inside the city on the day"
      ],
      "excluded": [
        "Goods-carrier three-wheelers — same chassis, none of the demand",
        "Registered but not working today: scrapped, cannibalised, under repair, or parked while the permit is held",
        "Drivers. One vehicle can carry two of them across a day and a night shift, and the question asked for vehicles",
        "Trips. Roughly 12.7 lakh of them happen; that is the input to the chain, not the answer",
        "The region beyond BBMP — Anekal, Nelamangala, Devanahalli and the airport corridor"
      ],
      "boundaryTrap": "Four numbers hide behind the phrase 'on the road': permits issued, vehicles on the registration roll, vehicles physically working today, and drivers. End to end they differ by something like a factor of two — much of the roll is scrapped or long parked, and a quarter of the working fleet carries two drivers. There is a second boundary underneath that one. The answer is a stock of vehicles, but every number you can actually estimate is a daily flow of trips; dividing a flow by a flow-per-vehicle is what converts one into the other. If your units do not cancel to 'vehicles', you have built the wrong chain, and no amount of careful arithmetic downstream will rescue it."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Trips of every kind made in Bengaluru each day",
        "expr": "13000000 * 1.5",
        "display": "1.3 crore people × 1.5 trips per person per day",
        "result": 19500000,
        "unit": "trips per day",
        "carriedForward": "≈ 1.95 crore trips a day",
        "uses": [
          "a-pop",
          "a-triprate"
        ],
        "soWhat": "This is every journey in the city, including the walk to the bus stop. Most of it gets filtered out in the next two lines, and saying so as you write it stops the interviewer assuming you have confused total trips with auto trips."
      },
      {
        "id": "c2",
        "label": "Motorised trips a day",
        "expr": "19500000 * 0.65",
        "display": "1.95 crore trips × 65% motorised",
        "result": 12675000,
        "unit": "trips per day",
        "carriedForward": "≈ 1.27 crore motorised trips",
        "uses": [
          "a-motorised"
        ],
        "soWhat": "Walking and cycling leave the pool here. From this line onward every trip is one somebody paid a fare for or burned fuel on, which is the only pool an auto can compete in."
      },
      {
        "id": "c3",
        "label": "Auto share of motorised trips, built as a residual",
        "expr": "1 - 0.45 - 0.33 - 0.12",
        "display": "100% − 45% two-wheelers − 33% bus and metro − 12% cars",
        "result": 0.1,
        "unit": "share",
        "carriedForward": "10%",
        "uses": [
          "a-modesplit"
        ],
        "soWhat": "Derive the share, do not feel it. Assigning the three big modes first and handing autos the remainder gives you something you can defend line by line, and it protects you from the commonest failure on this question — a candidate reporting their own commute as a city statistic."
      },
      {
        "id": "c4",
        "label": "Auto-rickshaw trips a day",
        "expr": "12675000 * 0.1",
        "display": "1.27 crore motorised trips × 10% auto share",
        "result": 1267500,
        "unit": "trips per day",
        "carriedForward": "≈ 12.7 lakh auto trips",
        "uses": [
          "a-autoshare"
        ],
        "soWhat": "The demand the fleet has to absorb, and still the weakest number in the chain even after deriving it. Name it as such now — a candidate who volunteers the soft lever is trusted with the hard ones."
      },
      {
        "id": "c5",
        "label": "Paid trips one vehicle completes per on-road hour",
        "expr": "60 / 20 * 0.45",
        "display": "(60 min ÷ 20-minute trip) × 45% of road time paid",
        "result": 1.35,
        "unit": "paid trips per on-road hour",
        "uses": [
          "a-triplen",
          "a-util"
        ],
        "soWhat": "Throughput, not effort, sets the denominator. Three paid trips every two hours is the honest rate once waiting at a stand and running back empty are counted, and it sits well below what a candidate reasoning from trip length alone will assume."
      },
      {
        "id": "c6",
        "label": "Road-minutes one paid trip actually costs the vehicle",
        "expr": "20 / 0.45",
        "display": "20-minute fare ÷ 45% of road time paid",
        "result": 44.444,
        "tolerance": 0.0001,
        "unit": "minutes per completed trip",
        "carriedForward": "not carried forward — an intuition check",
        "uses": [
          "a-triplen",
          "a-util"
        ],
        "soWhat": "A twenty-minute fare consumes about forty-five minutes of the vehicle's day once the empty return and the wait at the stand are charged against it. That gap, not the length of the fare, is why a ten-hour day yields thirteen trips rather than thirty — and it is the number most candidates never compute at all."
      },
      {
        "id": "c7",
        "label": "Output of a single-shift vehicle",
        "expr": "10 * 1.35",
        "display": "10 on-road hours × 1.35 paid trips per hour",
        "result": 13.5,
        "unit": "trips per vehicle per day",
        "uses": [
          "a-singlehrs"
        ],
        "soWhat": "The owner-driven majority. One driver, one long day, and the vehicle parked at night — this is the number a candidate who ignores shift patterns applies to the entire fleet."
      },
      {
        "id": "c8",
        "label": "Output of a double-shift vehicle",
        "expr": "16 * 1.35",
        "display": "16 on-road hours × 1.35 paid trips per hour",
        "result": 21.6,
        "unit": "trips per vehicle per day",
        "uses": [
          "a-doublehrs"
        ],
        "soWhat": "Sixty per cent more work out of the same asset, because a second driver takes it over rather than buying another one. Put the two shift patterns side by side and the gap between counting vehicles and counting drivers becomes visible instead of theoretical."
      },
      {
        "id": "c9",
        "label": "Fleet-average paid trips per vehicle per day",
        "expr": "0.75 * 13.5 + 0.25 * 21.6",
        "display": "75% of the fleet × 13.5 trips + 25% × 21.6 trips",
        "result": 15.525,
        "unit": "trips per vehicle per day",
        "carriedForward": "≈ 15.5 trips",
        "uses": [
          "a-doubleshare"
        ],
        "soWhat": "Round to 15.5 before dividing — carrying 15.525 forward would be pretending to a precision the 45% utilisation figure cannot support. Note what the weighting bought: apply 13.5 to the whole fleet instead and the answer inflates by about a seventh, silently."
      },
      {
        "id": "c10",
        "label": "Auto-rickshaws working a typical weekday",
        "expr": "1267500 / 15.5",
        "display": "12.7 lakh auto trips a day ÷ 15.5 trips per vehicle per day",
        "result": 81774.19,
        "tolerance": 0.0001,
        "unit": "vehicles",
        "carriedForward": "≈ 82,000 vehicles",
        "uses": [],
        "soWhat": "Trips per day divided by trips per vehicle per day leaves vehicles — a flow divided by a flow-per-unit gives the stock. Say that out loud. It is how you show the chain is an identity rather than four numbers multiplied in hope, and it is the moment the interviewer decides whether you understood the question or only answered it."
      }
    ],
    "orderOfMagnitude": "10^5",
    "assumptions": [
      {
        "id": "a-pop",
        "lever": "Bengaluru city population, BBMP area",
        "value": "1.3 crore",
        "numeric": 13000000,
        "unit": "people",
        "basis": "census-anchor",
        "defence": "The municipal area runs to roughly 1.3 crore; the wider metropolitan region is nearer 1.4 crore, and naming which one you mean is half the scope work done in a single sentence.",
        "confidence": "anchor",
        "contestedBy": "An interviewer who wants the metropolitan region pushes you to 1.4 crore — about 8% straight through the chain, which is inside the rounding you are already doing."
      },
      {
        "id": "a-triprate",
        "lever": "Trips per person per day, all modes and purposes",
        "value": "1.5",
        "numeric": 1.5,
        "unit": "trips per person per day",
        "basis": "structural-logic",
        "defence": "A working adult makes two trips and a school child two, while the elderly, the unemployed and those who work where they live make none — averaged across every resident, one and a half is what the identity forces.",
        "confidence": "defensible",
        "contestedBy": "Mobility surveys in dense Indian metros run between 1.2 and 1.8; that band alone moves the answer roughly a fifth in either direction."
      },
      {
        "id": "a-motorised",
        "lever": "Motorised share of all trips",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share",
        "basis": "observed-behaviour",
        "defence": "Roughly a third of urban Indian trips are walked or cycled — short hops to a shop, a school or a bus stop — and a trip that ends on foot can never become an auto fare.",
        "confidence": "defensible",
        "contestedBy": "Bengaluru's sprawl and poor footpaths argue for a higher motorised share, perhaps 70%; a denser core city would argue for 60%."
      },
      {
        "id": "a-autoshare",
        "lever": "Auto share of motorised trips",
        "value": "10%",
        "numeric": 0.1,
        "unit": "share",
        "basis": "declared-judgement",
        "defence": "Assign the fleet first and take autos as the remainder: two-wheelers carry close to half of Bengaluru's motorised trips, buses and metro roughly a third between them, cars most of what is left, and autos take the residual tenth as a short-hop, price-sensitive mode rather than anybody's default.",
        "confidence": "shaky",
        "contestedBy": "Anyone who has waited for an auto outside a metro station will argue 15%; anyone who starts from BMTC's daily ridership will argue 7%. That single lever is worth a factor of two on the answer, and it is the one number in this chain nobody in the room can source."
      },
      {
        "id": "a-modesplit",
        "lever": "Motorised mode split assigned ahead of autos",
        "value": "two-wheelers 45%, bus and metro 33%, cars 12%",
        "numeric": 0.9,
        "unit": "share of motorised trips claimed before autos",
        "basis": "observed-behaviour",
        "defence": "Bengaluru is a two-wheeler city first and a bus city second — BMTC and the metro together move a third of motorised trips, private cars take a shade over a tenth despite dominating the road space, and what is left is the auto's market.",
        "confidence": "judgement",
        "contestedBy": "Shift five points from two-wheelers to buses and the residual does not move at all, which is the point of building it this way: the auto share is only exposed to errors in the total, not to how the other three split among themselves."
      },
      {
        "id": "a-triplen",
        "lever": "Average duration of a paid auto trip",
        "value": "20 minutes",
        "numeric": 20,
        "unit": "minutes",
        "basis": "observed-behaviour",
        "defence": "An auto fare is a four to five kilometre hop and Bengaluru's traffic moves at about 15 km/h through most of the working day, so twenty minutes is what the meter actually runs for.",
        "confidence": "defensible",
        "contestedBy": "Airport and long-haul fares stretch this; the last-mile metro feeder trip, which is growing, compresses it to eight or ten minutes and lifts the trip count per vehicle."
      },
      {
        "id": "a-util",
        "lever": "Share of on-road time that is a paid trip",
        "value": "45%",
        "numeric": 0.45,
        "unit": "share",
        "basis": "observed-behaviour",
        "defence": "Stand at any auto stand for an hour: the vehicle spends more of its day waiting for a fare, running back empty from a drop or parked over lunch than it does with a passenger in it, so a little under half its road time is metered.",
        "confidence": "judgement",
        "contestedBy": "A driver attached to an aggregator runs higher, perhaps 55%, because the app fills the gap between fares; a street-hailing driver on a quiet stretch runs well below 40%."
      },
      {
        "id": "a-singlehrs",
        "lever": "On-road hours, single-shift vehicle",
        "value": "10 hours",
        "numeric": 10,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "One driver, one owner-driven vehicle, a day that opens with the school run and closes after the evening peak — ten hours on the road is a long shift already, and the driver still has to get the vehicle home.",
        "confidence": "defensible"
      },
      {
        "id": "a-doublehrs",
        "lever": "On-road hours, double-shift vehicle",
        "value": "16 hours",
        "numeric": 16,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "A vehicle rented to two drivers on a day and a night shift is off the road only for the handover, refuelling and the dead hours before dawn, which caps it near sixteen rather than twenty-four.",
        "confidence": "judgement",
        "contestedBy": "Push this to 18 and the fleet shrinks about 6% — small, and that is the useful finding: the shift length matters far less than the share of the fleet that runs two shifts at all."
      },
      {
        "id": "a-doubleshare",
        "lever": "Share of the working fleet run on two shifts",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share",
        "basis": "declared-judgement",
        "defence": "Financed and rented autos are worked hardest because the daily rent has to be earned twice over, and those are the minority; the majority are owner-driven and go home at night with their driver.",
        "confidence": "judgement",
        "contestedBy": "Rising vehicle finance penetration argues for a third of the fleet, which would cut the vehicle count about 5% while raising the driver count."
      },
      {
        "id": "a-vehreg",
        "lever": "Registered vehicles per resident, Bengaluru",
        "value": "0.85",
        "numeric": 0.85,
        "unit": "vehicles per person",
        "basis": "published-benchmark",
        "defence": "Bengaluru's registration roll is routinely reported as close to one vehicle per resident — roughly 1.1 crore vehicles against 1.3 crore people — which is exactly why the city gets discussed as a congestion problem rather than a traffic problem.",
        "confidence": "defensible",
        "contestedBy": "The roll is cumulative and rarely purged, so this ratio overstates what is physically on the road. Note the direction: it inflates the supply-side cross-check, not the demand-side spine."
      },
      {
        "id": "a-autoreg",
        "lever": "Passenger three-wheeler share of the registration roll",
        "value": "1.5%",
        "numeric": 0.015,
        "unit": "share",
        "basis": "structural-logic",
        "defence": "Two-wheelers take around 70% of the roll and cars around 20%; autos, goods carriers, buses, taxis and tractors share the last tenth, and passenger autos are the larger part of a small slice.",
        "confidence": "judgement"
      },
      {
        "id": "a-inservice",
        "lever": "Share of registrations still roadworthy and in service",
        "value": "60%",
        "numeric": 0.6,
        "unit": "share",
        "basis": "declared-judgement",
        "defence": "An auto is scrapped, cannibalised for parts or parked for good long before anyone tells the transport office, so two registrations in five on the roll are not a working vehicle.",
        "confidence": "shaky",
        "contestedBy": "This is the number the registration route is silent on, and it is doing all the work in that route — anything from 50% to 75% is arguable, which is why the cross-check is a bound and not a second answer."
      },
      {
        "id": "a-worktoday",
        "lever": "Share of in-service vehicles out on a named weekday",
        "value": "90%",
        "numeric": 0.9,
        "unit": "share",
        "basis": "structural-logic",
        "defence": "Drivers take a rest day, fall ill, or lose a day to servicing and paperwork, so about a tenth of a genuinely working fleet is off the road on any particular Tuesday.",
        "confidence": "defensible"
      }
    ],
    "question": "How many auto-rickshaws are actually out earning a living on Bengaluru's roads on a typical weekday?",
    "traps": [
      {
        "trap": "Answering the question with the registration figure",
        "whyItHappens": "Registrations are the only auto-rickshaw number anyone has ever read, so the mind reaches for it under time pressure and dresses it up as recall. The roll is cumulative: the transport office adds vehicles and almost never removes them, so it still carries autos that were scrapped years ago. The two quantities are not close, and they drift further apart every year.",
        "fix": "State which quantity you are producing before you compute anything — vehicles working today — and treat any registration figure you half-remember as an upper bound to triangulate against, never as the answer itself."
      },
      {
        "trap": "Counting drivers and calling them vehicles",
        "whyItHappens": "The question says autos and you picture drivers, because the driver is the part of the transaction you actually interact with. About a quarter of the fleet carries two drivers across a day and a night shift, so the two counts differ by roughly 25% before a single arithmetic error has been made — and the error is invisible, because both numbers look equally reasonable.",
        "fix": "Fix the unit in your scope sentence — vehicles, not drivers, not permits, not trips — and split the fleet by shift pattern so the difference sits on the page where you and the interviewer can both see it."
      },
      {
        "trap": "Setting the auto share of motorised trips from your own habits",
        "whyItHappens": "A candidate who takes autos daily reaches for 30 or 40%; a candidate who rides a two-wheeler reaches for 3%. Neither is estimating — both are reporting a personal routine as a city statistic, and neither can tell the difference from the inside. An earlier version of this very answer used 40%, and one glance at a mode-share table would have killed it.",
        "fix": "Build the share as a residual. Assign two-wheelers, then buses and metro, then cars, and give autos what is left. A share you derived can be defended line by line; a share you felt collapses at the first push."
      },
      {
        "trap": "Working the demand numerator hard and waving at the denominator",
        "whyItHappens": "The population funnel feels like the real analysis, so it takes four minutes, and trips-per-vehicle gets a round number pulled from nowhere in the last thirty seconds. But the denominator divides: a two-fold error in trips per vehicle costs exactly what a two-fold error in the auto share costs, and it is far less likely to be challenged, because it sounds operational rather than assumed.",
        "fix": "Give the denominator its own small tree — hours on the road, share of those hours paid, minutes per paid trip. Three numbers you can each defend beat one confident number nobody asked about."
      },
      {
        "trap": "Reporting 81,774",
        "whyItHappens": "The arithmetic produced it and the digits feel like precision you earned. They are precision borrowed from levers you called judgement two minutes earlier — a 45% utilisation figure and a 10% mode share cannot support five significant figures between them, and quoting them tells the interviewer you do not know what an estimate is.",
        "fix": "Round hard, to two significant figures at most, state the band, and name the one lever that would have to move to break it."
      }
    ],
    "teachingPoint": "Any 'how many vehicles are out there' question is a flow of work divided by how much work one unit absorbs in a day — and the denominator, which candidates wave at in the last thirty seconds, divides the answer exactly as hard as the numerator multiplies it. The second lesson sits underneath: a fleet is not homogeneous, and the shift pattern is where vehicles and drivers stop being the same number."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "a-occ-weekday",
      "whyThisLever": "It is the only number in the chain with no anchor behind it — seats can be counted, hours are the mall's, dwell time can be timed, tickets are on the board. Weekday occupancy is a judgement, and it sets five of the week's seven days, so it carries more of the answer than any other term. Every other assumption can be argued from something; this one can only be declared.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "20% — the room is busy for two and a half hours in twelve",
          "answer": "≈ ₹74,000 a day (₹22 lakh a month)",
          "deltaVsBase": "−19%"
        },
        {
          "scenario": "Base",
          "leverValue": "30% — four busy hours in twelve, shaded down",
          "answer": "≈ ₹90,000 a day (₹27 lakh a month)",
          "deltaVsBase": "—"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "40% — the shoulder hours fill as well as the peaks",
          "answer": "≈ ₹1.07 lakh a day (₹32 lakh a month)",
          "deltaVsBase": "+19%"
        }
      ],
      "breakpoint": "The answer only leaves the ₹70,000 to ₹1.2 lakh band if weekday occupancy drops under about 15% or climbs past about 50%. Fifteen per cent means fewer than five of thirty seats filled averaged across the whole trading day, which anyone standing there would notice; fifty per cent means the outlet is half full at four o'clock on a Tuesday, which they would also notice. The lever is uncertain, but it is not unbounded — and that is what makes it safe to declare out loud rather than bury.",
      "oneLiner": "If there is no time for the grid, say this: weekday occupancy is my shakiest number, it sets five of the week's seven days, and every ten points on it moves the answer about ₹17,000 a day either way."
    },
    "number": "02",
    "difficulty": "Easy",
    "id": "mall-outlet-revenue",
    "archetype": "single-asset-revenue",
    "routeChoice": {
      "chosen": "Bottom-up",
      "why": "The asset is physical and its limits are visible — a fixed number of seats, a fixed number of trading hours, a table that can only be turned so often. Build revenue up from what the box can serve and every assumption is something you could verify by standing in the mall for ten minutes with a notebook. It also puts a ceiling on the answer, which is the property a bottom-up route has and a top-down one does not.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "Mall footfall × share who walk past the frontage × conversion × average bill looks tidy on the whiteboard, but two of its four terms are unobservable and neither is bounded. Nobody can defend 'what share of mall visitors pass this door' or 'what share of those buy', and a wrong guess on either runs away with the answer because nothing stops it. Keep the footfall route for the cross-check, where its independence is worth something — do not build the spine on two terms you cannot see."
    },
    "sanityChecks": [
      "Against its own ceiling. The model has about 278 dine-in covers on an average day against a physical ceiling of 720 — the seats run 39% full across the trading day. An estimate that puts an outlet above its own ceiling is dead on arrival; one that puts it at 5% would not pay a Mumbai mall rent for a single month.",
      "Against the queue. About 417 people served across twelve hours is roughly 35 an hour, or one every hundred seconds. One till manages that off-peak and two are needed at lunch, which is the staffing a mall outlet actually runs. Had the arithmetic demanded 200 an hour, the counter in the picture could not physically have handed the food over.",
      "Against the rent. ₹27 lakh a month on a 1,000 sq ft unit leased at ₹400 to ₹500 a square foot puts rent near a sixth of sales. Mall food leases are written at 15% to 20% of revenue precisely because that is what the format can carry — a daily answer that pushed rent to 40% of sales would be describing an outlet that should already have closed.",
      "Against the brand. ₹3.3 crore a year sits at the strong end of Indian mall quick-service, which is what 'busy Mumbai mall' was doing in the question. Asked about a Tier-2 mall you should land near a third of this, and saying so unprompted shows you read the qualifier rather than skipped past it.",
      "Against the calendar. Two days carry 44% of the week. If the model has Saturday equal to Tuesday, it describes a shop that does not exist — and it has also thrown away the only operating insight the estimate contained."
    ],
    "answerBand": "₹70,000 to ₹1.2 lakh a day — ₹21 lakh to ₹36 lakh a month. The band is wide because occupancy is a judgement, and a narrower band here would be a false one.",
    "tree": {
      "root": "Daily revenue, one outlet",
      "rootFormula": "= (Dine-in covers × dine-in ticket + Takeaway orders × takeaway ticket) for a week ÷ 7 days",
      "value": "≈ ₹90,000 per day",
      "branches": [
        {
          "label": "Dine-in covers per week",
          "formula": "= Seat-hours × Occupancy × Covers per occupied seat-hour, weekdays and weekend days summed",
          "value": "1,944 covers",
          "note": "Where the answer lives. Three-quarters of the week's money comes through these seats, and every term below is a number you could count on site.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Seat-hours per day",
              "formula": "= 30 seats × 12 trading hours",
              "value": "360 seat-hours",
              "note": "The box. Fixed the day the lease was signed, and the one term in this estimate nobody will argue with."
            },
            {
              "label": "Turnover",
              "formula": "= 60 minutes ÷ 30-minute dwell",
              "value": "2 covers per occupied seat-hour",
              "note": "The term candidates drop. It is the whole reason a quick-service room out-earns a sit-down restaurant on the same floor plate."
            },
            {
              "label": "Weekday occupancy",
              "formula": "= four busy hours in twelve, discounted for the shoulder",
              "value": "30% → 216 covers",
              "note": "The shakiest number here, and it sets five of the week's seven days. Declare it before the interviewer finds it."
            },
            {
              "label": "Weekend occupancy",
              "formula": "= double the weekday rate",
              "value": "60% → 432 covers",
              "note": "Two days carrying 44% of the week's revenue. This is the operating fact the estimate is really for."
            }
          ]
        },
        {
          "label": "Dine-in ticket",
          "formula": "= middle of the menu board, per head",
          "value": "₹250 per cover",
          "note": "Per person seated, not per bill — a mall bill covers two or three people, and mixing the two is a quiet way to be wrong by a factor of two and a half.",
          "isCriticalPath": true,
          "children": []
        },
        {
          "label": "Takeaway stream",
          "formula": "= 0.5 takeaway orders per dine-in cover",
          "value": "972 orders per week",
          "note": "Counter sales to shoppers who never sit down. Pegged to dine-in because the same footfall drives both — say that it is a peg rather than a measurement.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Takeaway ticket",
              "formula": "= one person, no sides",
              "value": "₹150 per order",
              "note": "Below the seated ticket by design. It is the mix, not the blended average, that an interviewer will reach for."
            }
          ]
        },
        {
          "label": "Days in the week",
          "formula": "= 5 weekdays + 2 weekend days",
          "value": "7 days",
          "note": "The divisor that turns a week into an average day. Leave it out and you have answered a different question from the one asked.",
          "isCriticalPath": false,
          "children": []
        }
      ]
    },
    "triangulation": {
      "label": "Demand-side cross-check — what the mall sends, not what the box can serve",
      "route": "Top-down",
      "premise": "Forget the seats. Start at the mall doors, take the share of visitors who buy food anywhere in the building, take this outlet's share of those, and price it. The two routes share no volume assumption at all — one counts the room, the other counts the crowd — so where they disagree, the disagreement means something.",
      "lines": [
        {
          "id": "t1",
          "label": "Mall footfall in a week",
          "expr": "15000 * 5 + 35000 * 2",
          "display": "15,000 × 5 weekdays + 35,000 × 2 weekend days",
          "result": 145000,
          "unit": "visitors per week",
          "uses": [
            "a-mall-footfall-weekday",
            "a-mall-footfall-weekend",
            "a-calendar-week"
          ],
          "soWhat": "Same weekday-versus-weekend discipline as the primary route. The mall's weekend skew is the reason both routes must be built on a week."
        },
        {
          "id": "t2",
          "label": "Mall footfall on an average day",
          "expr": "145000 / 7",
          "display": "1,45,000 ÷ 7 days",
          "result": 20714.285714285714,
          "tolerance": 1e-06,
          "unit": "visitors per day",
          "carriedForward": "≈ 20,700 visitors",
          "uses": [
            "a-calendar-week"
          ],
          "soWhat": "Roughly 20,700 people a day through the doors — about 29 a minute across twelve hours, which is what a busy entrance looks like."
        },
        {
          "id": "t3",
          "label": "Visitors who buy food or a drink somewhere in the mall",
          "expr": "145000 * 0.35 / 7",
          "display": "20,700 visitors × 35% who eat or drink",
          "result": 7250,
          "unit": "food buyers per day",
          "uses": [
            "a-fnb-share",
            "a-calendar-week"
          ],
          "soWhat": "7,250 food buyers is the pool every outlet in the building is competing for. Sizing the pool before splitting it stops you from claiming a share of a number you never wrote down."
        },
        {
          "id": "t4",
          "label": "Food buyers captured by this outlet",
          "expr": "7250 * 0.05",
          "display": "7,250 food buyers × 5% captured",
          "result": 362.5,
          "unit": "customers per day",
          "uses": [
            "a-capture-share"
          ],
          "soWhat": "About 363 people. The primary route had the outlet serving about 417 — hold both figures, because the gap between them is the finding."
        },
        {
          "id": "t5",
          "label": "Daily revenue, demand-side",
          "expr": "362.5 * 215",
          "display": "363 customers × ₹215 a head",
          "result": 77937.5,
          "unit": "₹ per day",
          "carriedForward": "≈ ₹78,000",
          "uses": [
            "a-spend-per-head"
          ],
          "soWhat": "₹78,000 against ₹90,000 from the capacity route — near enough to believe, far enough apart to be worth reading."
        }
      ],
      "answer": "≈ ₹78,000 a day",
      "verdict": "The two routes land about 14% apart, and the capacity route is the higher one. That is the sign you want. The box can serve rather more people than the mall is currently sending it, which is exactly what an outlet that is not full looks like — and the model already says the seats run 39% full. Had the footfall route come out above the capacity route, one of them would have to be thrown away, because an outlet cannot sell more meals than its room can seat and its counter can hand over. Do not average the two into ₹84,000; that throws away the only information the gap contained. Read it instead: either weekday occupancy is a shade generous at 30% or the 5% capture share is a shade mean, and both of those are honest positions. One limit to state plainly — both routes price a head at the same rupees, so this cross-check tests the count and not the price."
    },
    "probes": [
      {
        "question": "Which of your numbers would you most want to check before staking anything on this?",
        "intent": "Whether you can rank your own uncertainty instead of defending every assumption with equal energy. It is also a test of whether you know which term the answer structurally hangs on, as opposed to which one you feel least sure about.",
        "goodAnswer": "Names weekday occupancy, says why — it has no anchor behind it and it sets five of the week's seven days — and quantifies the swing: ten points either way moves the answer about ₹17,000 a day. Then offers the cheapest way to close it: stand in the mall at three o'clock on a Tuesday and count filled seats for ten minutes.",
        "weakAnswer": "'They're all assumptions, so any of them could be wrong.' True, useless, and it says you never looked at which term the answer actually hangs on. It also passes up the chance to show that you know how to price your own uncertainty."
      },
      {
        "question": "The outlet also does delivery. What does that do to your number?",
        "intent": "Whether you can extend a model rather than rebuild it, and whether you notice that delivery eats kitchen capacity but not seats — so it attaches to a different constraint from everything you have built.",
        "goodAnswer": "Adds it as a third stream on the same kitchen and says why it is not bounded by the dining floor. Sixty orders a day at a ₹350 ticket, net of a 20% aggregator commission, is about ₹17,000 a day — roughly a fifth on top. Then states the real constraint plainly: at the lunch peak, delivery and dine-in queue for the same fryer, so the incremental orders are not free.",
        "weakAnswer": "'It would increase revenue.' Says nothing about how much, and misses all three things that make delivery different — a higher ticket, a lower realisation after commission, and a constraint that is the kitchen rather than the room."
      },
      {
        "question": "Your two routes are 14% apart. Which one do you believe?",
        "intent": "Whether you can read a gap rather than average it away. Triangulation is only worth the time it costs if the disagreement is treated as information.",
        "goodAnswer": "Says the capacity route measures what the box can serve and the footfall route measures what the mall sends, so the capacity route sitting higher is the expected sign — the outlet is not full, and the model already puts the seats at 39%. Points at the two terms that would close the gap, weekday occupancy being a shade generous or the 5% capture share a shade mean, and declines to split the difference without a reason to.",
        "weakAnswer": "'I'd take the average of the two, so about ₹84,000.' Averaging two estimates is not triangulation. It discards the only thing the exercise produced, which was the direction and size of the disagreement."
      },
      {
        "question": "The mall wants to raise this outlet's rent by ₹1 lakh a month. Take it or leave it?",
        "intent": "Whether a sizing number can be turned into a decision, which is the only reason a consultant sizes anything.",
        "goodAnswer": "Converts first: ₹1 lakh a month is about ₹3,300 a day, near 4% of sales, and standing still would need roughly 10 more covers a day or two more points of weekday occupancy. Then asks the question that decides it — what does the mall give back for the money? A better frontage, longer hours, a bigger catchment on the same floor. Rent is worth paying for traffic and not for nothing.",
        "weakAnswer": "'Rent is a fixed cost, so it doesn't change revenue.' Correct, and beside the point. You were asked for a decision, and the decision turns entirely on how much extra volume the extra rent buys."
      },
      {
        "question": "You assumed thirty seats. Suppose I tell you it is fifty.",
        "intent": "Whether you know which of your terms are linear and which only look linear, and whether you will volunteer the thing the arithmetic hides.",
        "goodAnswer": "Scales it — dine-in moves with seats, and takeaway is pegged to dine-in in this model, so the whole answer goes with it: fifty over thirty is two-thirds more, about ₹1.5 lakh a day. Then flags what the scaling conceals: a bigger room in the same mall draws on the same footfall, so occupancy falls and the honest answer sits below the linear one.",
        "weakAnswer": "'Revenue goes up by 67%.' Right arithmetic, no judgement. The interviewer asked the question to find out whether you would notice that demand did not change when the room did."
      }
    ],
    "finalAnswerNumeric": 90000,
    "tabLabel": "Mall food outlet, Mumbai",
    "finalAnswer": "≈ ₹90,000 a day on an average day — roughly ₹27 lakh a month, or ₹3.3 crore a year. The figures are illustrative, built to show the method rather than asserted as verified trade data.",
    "scope": {
      "countingWhat": "Money billed at one outlet's till in a day — dine-in plus counter takeaway, net of GST, before rent, food cost or anything else comes out. Revenue, not profit. One outlet, not the brand.",
      "unit": "₹ per day",
      "timeBasis": "flow (per day)",
      "geography": "One standalone quick-service unit inside a busy suburban Mumbai mall — mid-market, trading seven days, not a luxury mall and not a Tier-2 one.",
      "included": [
        "Dine-in covers — every person who sits down and eats, counted as a person and not as a bill.",
        "Counter takeaway — bags that walk out of the same door, rung up at the same till.",
        "Beverages, sides and desserts where they sit on the same bill.",
        "A unit with its own dining floor — roughly 1,000 sq ft, seats inside its own frontage.",
        "Weekdays and weekend days both, averaged across a full week."
      ],
      "excluded": [
        "GST — the tax collected passes through and is not the outlet's revenue.",
        "Delivery through the aggregators — a different ticket, a different realisation after commission, a different constraint. Named and set aside, not forgotten; one of the probes adds it back.",
        "Bulk and catering orders placed off the menu.",
        "A food-court counter sharing the common seating hall — physically a different asset, and the route below does not apply to it.",
        "The mall's other food outlets, and this brand's other stores in the city."
      ],
      "boundaryTrap": "'Average day' is not 'a typical weekday'. A Mumbai mall runs Saturday and Sunday at roughly double a Tuesday, and two of every seven days are weekend days — so the average day sits about 29% above the weekday you are almost certainly picturing. Decide which one the question is asking for, say so in the first thirty seconds, and if it is the average, compute a week and divide by seven. That divisor is the cheapest line in the whole estimate and the one most often skipped."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Seat-hours available in a trading day",
        "expr": "30 * 12",
        "display": "30 seats × 12 trading hours",
        "result": 360,
        "unit": "seat-hours per day",
        "uses": [
          "a-seats",
          "a-hours"
        ],
        "soWhat": "This is the whole of the outlet's physical supply. Everything after this line is a question about how much of it gets used, and at what price."
      },
      {
        "id": "c2",
        "label": "Covers one seat can turn in an hour",
        "expr": "60 / 30",
        "display": "60 minutes ÷ 30-minute dwell",
        "result": 2,
        "unit": "covers per occupied seat-hour",
        "uses": [
          "a-dwell"
        ],
        "soWhat": "The term most candidates never write. A seat is not a sale — it is a sale every half hour that it is occupied, and this line is the whole difference between a quick-service room and a restaurant with the same floor plate."
      },
      {
        "id": "c3",
        "label": "Dine-in covers on a weekday",
        "expr": "360 * 0.30 * 2",
        "display": "360 seat-hours × 30% occupied × 2 covers each",
        "result": 216,
        "unit": "covers",
        "uses": [
          "a-seats",
          "a-hours",
          "a-occ-weekday",
          "a-dwell"
        ],
        "soWhat": "216 people through 30 seats in 12 hours is 18 an hour — one table of three every ten minutes. Picture that before accepting it; if the picture looks wrong, the number is wrong."
      },
      {
        "id": "c4",
        "label": "Dine-in covers on a weekend day",
        "expr": "360 * 0.60 * 2",
        "display": "360 seat-hours × 60% occupied × 2 covers each",
        "result": 432,
        "unit": "covers",
        "uses": [
          "a-seats",
          "a-hours",
          "a-occ-weekend",
          "a-dwell"
        ],
        "soWhat": "Double the weekday, and not because weekend shoppers eat more. They arrive across more of the day and stay longer in the mall, so more of the twelve hours are busy ones."
      },
      {
        "id": "c5",
        "label": "Dine-in covers in a full week",
        "expr": "216 * 5 + 432 * 2",
        "display": "216 × 5 weekdays + 432 × 2 weekend days",
        "result": 1944,
        "unit": "covers per week",
        "uses": [
          "a-calendar-week"
        ],
        "soWhat": "864 of these 1,944 covers — 44% — land on two days. That is why the outlet staffs and stocks to the weekend and bleeds on Tuesday, and it is the operating point worth saying out loud even though the question only asked for a number."
      },
      {
        "id": "c6",
        "label": "Dine-in revenue in a week",
        "expr": "1944 * 250",
        "display": "1,944 covers × ₹250 a head",
        "result": 486000,
        "unit": "₹ per week",
        "uses": [
          "a-ticket-dinein"
        ],
        "soWhat": "₹4.86 lakh a week from the seats alone. Hold it apart from takeaway — the two move on different levers, and the mix is the first thing an interviewer will push on."
      },
      {
        "id": "c7",
        "label": "Takeaway orders in a week",
        "expr": "1944 * 0.5",
        "display": "1,944 dine-in covers × 0.5 takeaway orders each",
        "result": 972,
        "unit": "orders per week",
        "uses": [
          "a-takeaway-ratio"
        ],
        "soWhat": "Pegged to dine-in because the same footfall drives both. Call it a peg rather than a measurement — it is the weakest structural link in the model even though it is not the biggest lever."
      },
      {
        "id": "c8",
        "label": "Takeaway revenue in a week",
        "expr": "972 * 150",
        "display": "972 orders × ₹150",
        "result": 145800,
        "unit": "₹ per week",
        "uses": [
          "a-ticket-takeaway"
        ],
        "soWhat": "Takeaway is 23% of the week's money on 33% of the transactions. The counter is busier than it is valuable — which is the argument for a second till rather than more seats."
      },
      {
        "id": "c9",
        "label": "Total revenue in a week",
        "expr": "486000 + 145800",
        "display": "₹4,86,000 dine-in + ₹1,45,800 takeaway",
        "result": 631800,
        "unit": "₹ per week",
        "uses": [],
        "soWhat": "Work the week, not the day. The week is the unit the outlet actually plans in, and it is the only way to stop the weekend disappearing into a single averaged figure."
      },
      {
        "id": "c10",
        "label": "Revenue on an average day",
        "expr": "631800 / 7",
        "display": "₹6,31,800 ÷ 7 days",
        "result": 90257.14285714286,
        "tolerance": 1e-06,
        "unit": "₹ per day",
        "carriedForward": "≈ ₹90,000",
        "uses": [
          "a-calendar-week"
        ],
        "soWhat": "Round once, here, and say ₹90,000. A candidate who reports ₹90,257 has told the interviewer they do not understand what an estimate is — the digits were never real."
      }
    ],
    "orderOfMagnitude": "10^5 rupees per day",
    "assumptions": [
      {
        "id": "a-seats",
        "lever": "Seats in the outlet",
        "value": "30 seats",
        "numeric": 30,
        "unit": "seats",
        "basis": "observed-behaviour",
        "defence": "A mall quick-service unit runs about 1,000 sq ft; roughly 600 of that is dining floor once the kitchen, counter and store are out, and at 20 sq ft a seat with gangways that is thirty covers.",
        "confidence": "defensible",
        "contestedBy": "An anchor-brand unit with 50 seats scales the whole answer by two-thirds, to about ₹1.5 lakh a day. A food-court counter owns no seats at all and needs a counter-throughput route instead."
      },
      {
        "id": "a-hours",
        "lever": "Trading hours per day",
        "value": "12 hours (11:00 to 23:00)",
        "numeric": 12,
        "unit": "hours per day",
        "basis": "physical-constant",
        "defence": "The outlet opens with the mall and stops taking orders when the mall closes — Mumbai malls trade 11:00 to 23:00, which is twelve hours.",
        "confidence": "anchor",
        "contestedBy": "Some malls run 10:00 to 22:00 — the same twelve hours against a different clock, so the answer does not move."
      },
      {
        "id": "a-dwell",
        "lever": "Dwell time per cover",
        "value": "30 minutes",
        "numeric": 30,
        "unit": "minutes",
        "basis": "observed-behaviour",
        "defence": "Order at the counter, eat, leave — half an hour is what a tray takes at a quick-service table, and you can time it on your own last mall lunch.",
        "confidence": "defensible",
        "contestedBy": "Push dwell to 45 minutes and covers per seat-hour fall from 2 to 1.33 — a third off the answer without touching a single seat. It is the fastest way to shrink this outlet and the one candidates never see coming."
      },
      {
        "id": "a-occ-weekday",
        "lever": "Weekday seat occupancy, averaged across the trading day",
        "value": "30%",
        "numeric": 0.3,
        "unit": "share of seat-hours filled",
        "basis": "declared-judgement",
        "defence": "The room is full for about two lunch hours and two evening hours and close to empty the rest — four busy hours in twelve is a third, and I have shaded it down for the dead shoulder either side.",
        "confidence": "shaky",
        "contestedBy": "An interviewer who thinks mall weekdays are dead will push for 20%, which takes roughly ₹17,000 a day off the answer. Give the number before being asked for it."
      },
      {
        "id": "a-occ-weekend",
        "lever": "Weekend seat occupancy",
        "value": "60%",
        "numeric": 0.6,
        "unit": "share of seat-hours filled",
        "basis": "declared-judgement",
        "defence": "On a Saturday afternoon there is a queue at the counter and no free table; double the weekday rate is the mildest version of what anyone standing there can see.",
        "confidence": "judgement",
        "contestedBy": "Cap it at 50% on the argument that no room stays full for twelve straight hours and the answer drops about 8%. The weekend matters to the split more than to the average."
      },
      {
        "id": "a-ticket-dinein",
        "lever": "Dine-in spend per head",
        "value": "₹250 per cover",
        "numeric": 250,
        "unit": "₹ per cover",
        "basis": "observed-behaviour",
        "defence": "A combo meal on a mall quick-service board sits between ₹200 and ₹280 before add-ons; ₹250 is the middle of the board, and a cover is one person rather than one bill.",
        "confidence": "defensible",
        "contestedBy": "A premium brand at ₹400 a head lifts the answer by roughly half — but then the 30% weekday occupancy has to be defended at that price, and usually it cannot be."
      },
      {
        "id": "a-takeaway-ratio",
        "lever": "Takeaway orders per dine-in cover",
        "value": "0.5",
        "numeric": 0.5,
        "unit": "orders per cover",
        "basis": "observed-behaviour",
        "defence": "Stand at the counter and count: for every two trays carried to a table, about one bag walks out — mall outlets sell heavily to people who are shopping rather than sitting.",
        "confidence": "judgement",
        "contestedBy": "A coffee-and-snack format inverts this to 2 takeaway orders per cover and changes the shape of the business entirely. The ratio is the weakest structural link here even though it is not the biggest lever."
      },
      {
        "id": "a-ticket-takeaway",
        "lever": "Takeaway spend per order",
        "value": "₹150 per order",
        "numeric": 150,
        "unit": "₹ per order",
        "basis": "observed-behaviour",
        "defence": "A takeaway order is usually one person with no sides — a wrap and a drink — so it lands below the ₹250 a seated customer spends.",
        "confidence": "defensible",
        "contestedBy": "Family takeaway on a Sunday runs ₹500 a bag. Blending the two into a single ticket is exactly the move this split exists to avoid."
      },
      {
        "id": "a-calendar-week",
        "lever": "Composition of a week",
        "value": "5 weekdays + 2 weekend days",
        "numeric": 7,
        "unit": "days per week",
        "basis": "physical-constant",
        "defence": "Seven days, two of them weekend. This is not an assumption so much as the term candidates silently drop when they estimate 'a typical day' and then call it the average.",
        "confidence": "anchor",
        "contestedBy": "Friday evening behaves like a weekend in a Mumbai mall. Counting it as 2.5 weekend days lifts the answer about 6% and is a fair point to concede."
      },
      {
        "id": "a-mall-footfall-weekday",
        "lever": "Mall footfall, weekday",
        "value": "15,000 visitors",
        "numeric": 15000,
        "unit": "visitors per day",
        "basis": "declared-judgement",
        "defence": "A busy suburban Mumbai mall runs weekday footfall in the low tens of thousands; 15,000 over a twelve-hour day is about twenty people a minute through the doors, which matches what an entrance actually looks like on a Tuesday.",
        "confidence": "judgement",
        "contestedBy": "A top-three Mumbai mall does 30,000 on a weekday, which lifts the cross-check by half to about ₹1.2 lakh — above the capacity route, at which point the capacity route wins, because the seats do not multiply."
      },
      {
        "id": "a-mall-footfall-weekend",
        "lever": "Mall footfall, weekend day",
        "value": "35,000 visitors",
        "numeric": 35000,
        "unit": "visitors per day",
        "basis": "declared-judgement",
        "defence": "Saturday and Sunday run a little over double — full car park, queue at the entrance, and every seating area occupied — so a shade above twice the weekday figure.",
        "confidence": "judgement",
        "contestedBy": "Three times the weekday figure is defensible in a mall with a multiplex, and it lifts the cross-check about 14%."
      },
      {
        "id": "a-fnb-share",
        "lever": "Share of mall visitors who buy food or a drink",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of visitors",
        "basis": "observed-behaviour",
        "defence": "A mall trip runs two to three hours and crosses a mealtime or a coffee break for about a third of visitors; the rest shop and leave without buying anything to eat.",
        "confidence": "judgement",
        "contestedBy": "Malls with a multiplex push this past 50%, because a film almost guarantees a purchase. Say which kind of mall you are in before fixing this number."
      },
      {
        "id": "a-capture-share",
        "lever": "Share of the mall's food buyers captured by this outlet",
        "value": "5%",
        "numeric": 0.05,
        "unit": "share of food buyers",
        "basis": "structural-logic",
        "defence": "The mall has roughly 25 places to eat, so an even split is 4%; this unit sits on the main circulation route under a known brand, so call it 5% — and say out loud that the even split is the floor, not the estimate.",
        "confidence": "judgement",
        "contestedBy": "An anchor brand next to the multiplex entrance takes 10% and the cross-check doubles. The honest position is that this term carries most of the cross-check's uncertainty."
      },
      {
        "id": "a-spend-per-head",
        "lever": "Blended spend per person at this outlet",
        "value": "₹215 per person",
        "numeric": 215,
        "unit": "₹ per person",
        "basis": "structural-logic",
        "defence": "Two seated customers at ₹250 for every one takeaway at ₹150 gives ₹217 a head; ₹215 is that rounded. It is deliberately imported from the primary route — the two routes differ in how they count heads, not in what a head spends, and pretending otherwise would make the cross-check look more independent than it is.",
        "confidence": "defensible",
        "contestedBy": "Nothing worth arguing about. The limit of this term is that it is shared, which is stated in the verdict rather than hidden."
      }
    ],
    "question": "What does one quick-service food outlet in a busy Mumbai mall take in on an average day?",
    "traps": [
      {
        "trap": "Sizing the box and forgetting that it empties.",
        "whyItHappens": "Seats are a stock and covers are a flow, and the bridge between them is dwell time. Dwell time is invisible — you cannot see it in the room, only in a stopwatch — so it drops out of the chain and the candidate ends up implicitly assuming each seat sells one meal a day. The error is silent because the arithmetic still works; it just describes a different, far worse restaurant.",
        "fix": "Never write seats × hours without dividing by how long one customer sits. Say the turnover term out loud as its own line: sixty minutes over a thirty-minute dwell is two covers per occupied seat-hour. That single line is what separates a quick-service unit from a fine-dining room with the same floor plate and the same rent."
      },
      {
        "trap": "Calling a weekday the average day.",
        "whyItHappens": "You estimate by picturing a scene, and the scene you picture is the one you have been in most — a Tuesday. Two of seven days are weekend days and they run at roughly double, so the true average sits about 29% above the weekday you imagined. Nothing in the arithmetic flags the substitution, because the wrong day is computed perfectly.",
        "fix": "Compute a week and divide by seven. It costs one extra line and it makes the weekend split visible, which is worth more than the accuracy it buys. If the interviewer actually wanted a weekday, you can hand them that figure too, from the same working."
      },
      {
        "trap": "One blended ticket for two different purchases.",
        "whyItHappens": "An 'average bill' feels like a simplification and is really a concealment. Dine-in and takeaway are different products, bought by different people, in different quantities, at different prices — and the mix is precisely what an interviewer will move when they want to see whether the model bends or breaks. A single average has nowhere to absorb the push.",
        "fix": "Carry two tickets and one ratio between them. It costs two lines, it survives a challenge on either, and it gives you something structured to say when the interviewer adds delivery as a third stream."
      },
      {
        "trap": "Confusing a cover with a bill.",
        "whyItHappens": "The words are used interchangeably in conversation and mean different things on a P&L. A cover is one person eating; a bill covers the two or three people who came together. Apply a per-head ticket to a count of bills, or a per-bill ticket to a count of covers, and the answer is out by the group size — a factor of two and a half, quietly, with no arithmetic error anywhere.",
        "fix": "Say which one you are counting when you first write the term, and keep the units on the page. Here it is covers and a per-head ticket throughout; if you switch to bills, the ticket has to switch with it."
      },
      {
        "trap": "Treating a food-court counter as though it owned seats.",
        "whyItHappens": "'A quick-service outlet in a mall' covers two physically different assets — a standalone unit with its own dining floor, and a counter in a food court that shares a common seating hall with twenty others. The seat-hours route works on the first and is meaningless on the second, but the phrase does not distinguish them, so the candidate picks whichever one their framework already fits.",
        "fix": "Ask which one before starting, and take thirty seconds over it. For a food-court counter, drive off counter throughput instead — orders served per minute at the till × trading minutes × the share of those minutes that are genuinely busy — and the seats never enter the model at all."
      },
      {
        "trap": "Answering ₹90,257.",
        "whyItHappens": "The arithmetic in your head produces every digit and the digits feel like rigour, so they get reported. They are not rigour. Every one of them descends from a 30% that was declared rather than measured, and reporting them tells the interviewer you have not understood the difference between a calculation and an estimate.",
        "fix": "Carry full precision through the working, then round once, deliberately, at the end, and say the rounding out loud: 'call it ₹90,000 a day'. The rounding is not modesty — it is a statement about how much the number can bear."
      }
    ],
    "teachingPoint": "Revenue from a fixed asset is capacity × turnover × price, and turnover is the term that gets dropped. Thirty seats do not sell thirty meals a day — they sell as many as dwell time and trading hours allow. How fast the room turns matters as much as how big it is, and a candidate who writes seats × hours without dividing by dwell time has sized the box and forgotten that it empties."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "a-price-jar",
      "whyThisLever": "One number prices 85% of the litres, and it is the number a candidate is most likely to replace by accident. The jar price is not the shakiest input in the tree — the workplace cooler share is — but it is the one whose misuse changes the answer by a factor rather than a fraction, and that is what earns it the grid. Run the defensible spread first, then show what happens if the two channels are blended, because blending is the error this question exists to catch.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "₹1.50 per litre (₹30 local unbranded jar)",
          "answer": "≈ ₹23,200 crore",
          "deltaVsBase": "−9%"
        },
        {
          "scenario": "Base",
          "leverValue": "₹2.00 per litre (₹40 delivered jar)",
          "answer": "≈ ₹25,600 crore",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "₹3.00 per litre (₹60 branded metro jar)",
          "answer": "≈ ₹30,300 crore",
          "deltaVsBase": "+18%"
        }
      ],
      "breakpoint": "The jar channel only carries half the market's value at about ₹3.44 a litre — a ₹69 jar. That is a branded metro price, not a national average, so under every defensible jar price the bottled channel stays the value leader and the jar channel stays the volume leader. The conclusion is robust; the number is not. The one thing that does break it is blending: price all 47 bn jar litres at the ₹20 bottled rate and the answer goes to about ₹1.1 lakh crore, four times the base and outside any published estimate by a wide margin.",
      "oneLiner": "With no time for the grid, say this: jars are 85% of the litres and about a third of the rupees, so halving or trebling the jar price moves the answer by under a fifth — but pricing jars like bottles multiplies the whole market by four."
    },
    "number": "03",
    "difficulty": "Medium",
    "id": "bottled-water-urban",
    "archetype": "population-funnel",
    "routeChoice": {
      "chosen": "Top-down",
      "why": "Start from the urban population because it is the one number the interviewer will concede without argument, and because every gate below it — income band, purchase frequency, pack size, price — is a claim you can defend or revise on its own without disturbing the rest. A funnel is also the only route that lets at-home and out-of-home behaviour be modelled as genuinely different things, and that separation is where this answer actually lives.",
      "rejectedRoute": "Bottom-up",
      "rejectedWhyNot": "Counting retail outlets and multiplying by bottles sold a day looks concrete and is not. You would need a national kirana count, a per-outlet daily rate, and separate treatment of every non-kirana channel — stations, restaurants, cinemas, offices — each a guess of the same quality as the ones above but with nothing to check it against. Worse, the jar channel never crosses a shop counter, so an outlet-based route silently deletes 85% of the litres. The supply-side version of bottom-up is worth running here, but as the cross-check, not as the primary."
    },
    "sanityChecks": [
      "₹25,570 crore across 49 crore urban people is ₹522 a year, or about ₹44 a month each. That is two 1-litre bottles a month plus a share of a household jar subscription — close to what you can watch people actually buy. Had it come out at ₹5,000 a year you would have sized mineral water for Geneva, not packaged water for Ghaziabad.",
      "Fifty-five bn litres over 49 crore people is about 0.3 litres a day each, roughly a seventh of what a person drinks. Packaged water supplements the tap and the filter; it never replaces them. A figure near 2 litres a day means you have sized total water consumption and dropped the word packaged.",
      "About 1,080 crore bottles a year is 22 bottles per urban person, one every seventeen days. Since a minority buys one on most days, that average should feel low rather than high. If it lands above 100, the middle-band frequency is the line to revisit.",
      "Twenty Mn of 120 Mn urban households on a jar subscription is one in six. Walk through a mid-income apartment block and count the blue jars on the landings — if you cannot see roughly that density, revise the penetration rate rather than the price.",
      "At ₹25,570 crore the category is about 4% of a roughly ₹6 lakh crore urban FMCG pool. That is plausible for a real but low-value-per-litre category. Much above 10% and packaged water would be outselling categories you know from the shelf to be larger.",
      "The numbers here are illustrative — chosen to be defensible under questioning and round enough to run in your head, not asserted as verified market data. The structure is the deliverable; the number is an order of magnitude."
    ],
    "answerBand": "₹18,000 – ₹35,000 crore a year, on 40 – 70 bn litres. The band is wide because it inherits a ±50% swing on the jar price and a ±40% swing on how often the middle band buys a bottle — and because the workplace cooler gate is an open guess.",
    "tree": {
      "root": "Urban packaged drinking water, retail value, one year",
      "rootFormula": "= (Bottled litres × bottled ₹/litre) + (Jar litres × jar ₹/litre)",
      "value": "≈ ₹25,000 crore on ≈ 55 bn litres",
      "branches": [
        {
          "label": "Bottled channel — PET, 250 ml to 2 litres",
          "formula": "Urban people by income band × bottles a year × 0.75 L per pack × ₹20 per litre",
          "value": "8.1 bn litres · ₹16,170 crore",
          "note": "15% of the litres and nearly two-thirds of the rupees. This is an out-of-home occasion business — travel, eating out, a workday away from a cooler — not a hydration business.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Top band — 10% of urban people",
              "formula": "49 Mn × 100 bottles a year",
              "value": "4,900 Mn bottles",
              "note": "Buys on most days it leaves the house. Small base, heavy frequency."
            },
            {
              "label": "Middle band — 40% of urban people",
              "formula": "196 Mn × 25 bottles a year",
              "value": "4,900 Mn bottles",
              "note": "Four times the people buying a quarter as often lands on the identical number. Say that out loud — it is the most useful sentence in the tree."
            },
            {
              "label": "Low band — 50% of urban people",
              "formula": "245 Mn × 4 bottles a year",
              "value": "980 Mn bottles",
              "note": "Half of urban India, 9% of the bottles. Water is bought here only when there is no alternative — a long journey, a hospital visit."
            }
          ]
        },
        {
          "label": "Jar channel — 20-litre bubble-top, homes",
          "formula": "Urban households × jar penetration by band × 80 jars a year × 20 L × ₹2 per litre",
          "value": "32.0 bn litres · ₹6,400 crore",
          "note": "A subscription, not a purchase. Once a household starts, the litres are near-constant and the decision is renewed monthly rather than at the shelf.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Top band — 12 Mn households",
              "formula": "× 25% on a jar",
              "value": "3.0 Mn households",
              "note": "Penetration dips at the top: an RO unit under the sink is the competing product, and it is already installed."
            },
            {
              "label": "Middle band — 48 Mn households",
              "formula": "× 30% on a jar",
              "value": "14.4 Mn households",
              "note": "The peak. Apartment living, distrust of the building tank, and no capital outlay for a filter."
            },
            {
              "label": "Low band — 60 Mn households",
              "formula": "× 5% on a jar",
              "value": "3.0 Mn households",
              "note": "Municipal supply and public taps do this job. ₹40 a jar set against a daily wage is the whole explanation."
            }
          ]
        },
        {
          "label": "Jar channel — 20-litre bubble-top, workplaces",
          "formula": "Urban workers × jar-served share × 300 L a year × ₹2 per litre",
          "value": "15.0 bn litres · ₹3,000 crore",
          "note": "The stream candidates forget, and a quarter of the total volume. Every office cooler, clinic waiting room and coaching centre is a standing order nobody at home ever sees.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Urban workers",
              "formula": "490 Mn × 40% participation",
              "value": "≈ 200 Mn",
              "note": "Low by international standards, and low for a nameable reason — urban female labour-force participation runs near a quarter."
            },
            {
              "label": "Served by a jar cooler at work",
              "formula": "200 Mn × 25%",
              "value": "50 Mn",
              "note": "The shakiest gate in the whole tree. A construction site, a street cart and a factory floor are all workplaces, and none of them has a cooler."
            },
            {
              "label": "Litres drawn",
              "formula": "50 Mn × 1 L × 300 working days",
              "value": "15.0 bn litres",
              "note": "A litre across a working day is a cup roughly every two hours. Test it against your own desk before you defend it."
            }
          ]
        },
        {
          "label": "Price ladder — held apart on purpose",
          "formula": "Bottled ₹20 per litre · Jar ₹2 per litre",
          "value": "A tenfold gap inside one category",
          "note": "These two numbers are never averaged into one. A blended ₹/litre is the single most abusable figure in this question, and the tree is built the way it is to make blending impossible.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Bottled",
              "formula": "₹20 for a 1-litre bottle",
              "value": "₹20 per litre",
              "note": "The 2-litre family pack pulls this down towards ₹17; a chilled 250 ml at a cinema pushes it to ₹40. ₹20 is the volume-weighted middle."
            },
            {
              "label": "Jar",
              "formula": "₹40 for a 20-litre jar, delivered",
              "value": "₹2 per litre",
              "note": "Branded metro jars reach ₹60. Local unbranded jars sell at ₹30. The delivery sits inside the price, not on top of it."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Supply-side cross-check — can the country physically fill this much?",
      "route": "Bottom-up",
      "premise": "If urban India drinks 55 bn packaged litres a year, somebody has to fill them. Count the filling capacity in two tiers — organised PET plants behind the bottled channel, small local units behind the jar channel — run each at a realistic utilisation, then scale the national output back to urban with a sales-share gate. The route is independent of the population funnel on volume, which is the comparison worth making. Say in advance that it reuses the same two prices, so agreement on value is partly circular.",
      "lines": [
        {
          "id": "t1",
          "label": "Nameplate output of organised bottling plants",
          "expr": "2000 * 3000 * 4800",
          "display": "2,000 plants × 3,000 L an hour × 4,800 hours a year",
          "result": 28800000000,
          "tolerance": 0,
          "unit": "litres a year",
          "carriedForward": "≈ 29 bn litres of nameplate",
          "uses": [
            "a-plants",
            "a-line-rate",
            "a-plant-hours"
          ],
          "soWhat": "Nameplate is not output. Quote it only as the ceiling you are about to knock down."
        },
        {
          "id": "t2",
          "label": "Effective bottled output",
          "expr": "28800000000 * 0.4",
          "display": "29 bn L nameplate × 40% utilisation",
          "result": 11520000000,
          "tolerance": 0,
          "unit": "litres a year",
          "carriedForward": "≈ 11.5 bn litres",
          "uses": [
            "a-utilisation"
          ],
          "soWhat": "Packaged water peaks between March and June, so plants are built for summer and idle for much of the year. Skipping the utilisation gate is how supply-side routes overstate by two or three times."
        },
        {
          "id": "t3",
          "label": "Output of the local jar units",
          "expr": "30000 * 75000 * 20",
          "display": "30,000 units × 75,000 jars a year × 20 L",
          "result": 45000000000,
          "tolerance": 0,
          "unit": "litres a year",
          "carriedForward": "≈ 45 bn litres",
          "uses": [
            "a-jar-units",
            "a-jar-unit-output",
            "a-jar-size"
          ],
          "soWhat": "This tier is almost entirely unregistered, which is precisely why a demand-side route reaches it more reliably than a supply-side one does."
        },
        {
          "id": "t4",
          "label": "Total national packaged litres",
          "expr": "11520000000 + 45000000000",
          "display": "11.5 bn bottled + 45 bn jar",
          "result": 56520000000,
          "tolerance": 0,
          "unit": "litres a year",
          "carriedForward": "≈ 57 bn litres, all-India",
          "uses": [],
          "soWhat": "All-India, not urban. The demand route counted urban only, so these two figures are not yet comparable — that gate comes below."
        },
        {
          "id": "t5",
          "label": "National retail value at the same two prices",
          "expr": "(11520000000 * 20) + (45000000000 * 2)",
          "display": "11.5 bn L × ₹20 + 45 bn L × ₹2",
          "result": 320400000000,
          "tolerance": 0,
          "unit": "₹ a year",
          "carriedForward": "₹320,400 Mn, all-India",
          "uses": [
            "a-price-bottle",
            "a-price-jar"
          ],
          "soWhat": "Reusing the demand route's prices is deliberate and must be declared. It makes the value comparison weak evidence and the volume comparison the real test."
        },
        {
          "id": "t6",
          "label": "National value in crore",
          "expr": "320400000000 / 10000000",
          "display": "₹320,400 Mn ÷ 1 crore",
          "result": 32040,
          "tolerance": 0,
          "unit": "₹ crore a year",
          "carriedForward": "≈ ₹32,000 crore, all-India",
          "uses": [],
          "soWhat": "Before comparing anything, check that the geographies match. They do not yet."
        },
        {
          "id": "t7",
          "label": "Urban share of that value",
          "expr": "32040 * 0.85",
          "display": "₹32,040 crore × 85% urban",
          "result": 27234,
          "tolerance": 0,
          "unit": "₹ crore a year",
          "carriedForward": "≈ ₹27,000 crore, urban",
          "uses": [
            "a-urban-sales-share"
          ],
          "soWhat": "Now the two routes describe the same thing, and only now is the gap between them worth reading."
        }
      ],
      "answer": "≈ ₹27,000 crore a year of urban retail value, on about 48 bn urban litres out of 57 bn filled nationally.",
      "verdict": "The supply route lands 6% above the demand route on value and about 13% below it on volume — inside the ±25% you can honestly claim at this level of precision. Do not oversell the agreement. Both routes use the same ₹20 and ₹2 prices, so the value match is partly circular; the volume comparison is the genuinely independent one, and it is the looser of the two. The gap that does exist runs the right way for a nameable reason: the supply route rests on a plant count and a utilisation rate, both open guesses, while the demand route rests on a population anchor and behaviours you can watch. When two routes disagree, say which one you would bet on and why — here it is the demand route, because its weakest input is a behaviour you can observe and the supply route's weakest input is a plant count nobody publishes."
    },
    "probes": [
      {
        "question": "Your jar channel is 85% of the litres and about a third of the rupees. If you were advising a national bottled-water brand, what does that tell you?",
        "intent": "Whether the candidate can read a commercial implication off a sizing answer, or whether producing the number was the whole exercise.",
        "goodAnswer": "That volume share and profit pool are different markets wearing one category label. The jar channel is large in litres, locally supplied, unbranded and priced at a tenth of the bottle, so entering it means competing on route density and delivery trust rather than on brand or shelf presence. I would treat it as a separate business with its own economics, and I would want per-litre contribution rather than price before recommending it at all.",
        "weakAnswer": "The jar market is huge, so the brand should launch 20-litre jars to capture the volume. This reads share of litres as share of opportunity and never asks what a litre earns."
      },
      {
        "question": "I do not accept 35% urban. Use 40%. Redo it.",
        "intent": "Whether the candidate can propagate a change through the structure without rebuilding it, and whether they know which conclusions survive a changed input.",
        "goodAnswer": "Every line below the urban base is linear in it, so the whole answer scales by 40 over 35 — about ₹29,000 crore, up 14%. The structure is untouched and so is the finding: bottles still carry roughly two-thirds of the rupees on 15% of the litres, because that split does not depend on the base at all.",
        "weakAnswer": "Starting again from the top and re-deriving all fifteen lines, which burns four minutes to reach a number the candidate could have scaled in ten seconds, and signals they do not know their own model is linear."
      },
      {
        "question": "Which single number here would you most want to check before this went into a deck?",
        "intent": "Calibration — whether the candidate can rank their own uncertainty instead of defending every row with equal conviction.",
        "goodAnswer": "The share of urban workers drinking from a jar cooler at work. It is a declared guess with nothing behind it and it carries 15 bn litres, a quarter of the total volume. The jar price moves the rupee answer more, but I can defend ₹40 for a jar from what I pay for one — I cannot defend 25% from anything.",
        "weakAnswer": "The population figure, which is the one number in the chain that is actually published and the one nobody at the table will contest."
      },
      {
        "question": "Suppose PET packs under one litre were banned tomorrow. What happens to your answer?",
        "intent": "Whether the structure survives a shock, or whether it was a chain of multiplications with no behavioural logic underneath it.",
        "goodAnswer": "The bottled channel is an out-of-home occasion business, so demand migrates rather than disappears. Average pack size rises towards a litre, which lifts litres per purchase while cutting rupees per litre, so value falls by less than the pack-mix change suggests. I would rebuild only the pack-size and price lines and hold the frequency lines fixed, then flag the occasions with no one-litre substitute — a station platform, a cinema seat — as genuinely lost.",
        "weakAnswer": "Revenue falls by the share of sub-litre packs, which quietly assumes the buyer vanishes along with the pack."
      },
      {
        "question": "Is this market growing, and where?",
        "intent": "Whether the candidate separates volume growth from mix shift — the distinction that turns a sizing answer into something a client can act on.",
        "goodAnswer": "Litres grow with urbanisation and with the workplace channel, which tracks formal employment. Rupees grow faster, because the growth sits disproportionately on the bottled side as middle-band frequency drifts from 25 a year towards the top band's 100. One category, two growth stories — and a jar-heavy player captures almost all of the volume growth and almost none of the value growth.",
        "weakAnswer": "Yes, around 15% a year, quoted without saying which of the two answers, litres or rupees, the figure applies to."
      }
    ],
    "finalAnswerNumeric": 25000,
    "tabLabel": "Packaged water, urban India",
    "finalAnswer": "≈ ₹25,000 crore a year at retail in urban India, on roughly 55 bn litres (5,500 crore litres). Bottles are 15% of the litres and about two-thirds of the rupees; 20-litre jars are the rest.",
    "scope": {
      "countingWhat": "Rupees paid at retail, over one year, for sealed packaged drinking water — PET bottles and 20-litre bubble-top jars — by people living in urban India. Litres are computed first and reported alongside, because volume and value behave differently in this category.",
      "unit": "₹ crore a year, with litres a year reported alongside",
      "timeBasis": "flow (per year)",
      "geography": "Urban India — roughly 49 crore people across Tier-1, Tier-2 and Tier-3 towns. Rural India is out.",
      "included": [
        "Sealed PET bottles from 250 ml to 2 litres, bought anywhere — kirana, station platform, restaurant, cinema, aircraft",
        "20-litre bubble-top jars delivered to homes on a standing subscription",
        "20-litre jars supplied to urban offices, shops, clinics, salons and coaching centres",
        "Unbranded and locally licensed jar water, which is most of the jar channel by volume",
        "The price the final buyer pays, inclusive of tax and of any delivery charge already bundled into the jar rate"
      ],
      "excluded": [
        "Municipal tap water and borewell water — billed by a different mechanism entirely, or not billed at all",
        "Water produced by a home or office RO unit, which is the substitute for this market rather than part of it",
        "Flavoured water, soda, packaged coconut water, and anything carrying a taste claim",
        "Imported and premium mineral water, left inside the blended bottled price rather than given its own line — it is a rounding error in litres",
        "Bulk tanker water for construction, washing and society supply, which is neither packaged nor drinking-grade",
        "Rural India, and exports of Indian packaged water"
      ],
      "boundaryTrap": "The 20-litre jar. It is about 85% of the litres and about a third of the rupees, so the two ways of mishandling it pull in opposite directions. Drop it and your volume collapses by nearly seven times while your value falls by only a third. Keep it but price it like a bottle and the market inflates past ₹1 lakh crore. Say out loud, before a single multiplication, that jars are in and that they carry their own price."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Urban population",
        "expr": "1400000000 * 0.35",
        "display": "1,400 Mn × 35% urban",
        "result": 490000000,
        "tolerance": 0,
        "unit": "people",
        "carriedForward": "490 Mn (49 crore)",
        "uses": [
          "a-pop",
          "a-urban-share"
        ],
        "soWhat": "Every line below is linear in this one figure. Box it, and derive households and workers from the boxed number rather than reaching back to the national population out of habit."
      },
      {
        "id": "c2",
        "label": "Bottles bought in the bottled channel, a year",
        "expr": "(490000000 * 0.10 * 100) + (490000000 * 0.40 * 25) + (490000000 * 0.50 * 4)",
        "display": "49 Mn top × 100 + 196 Mn middle × 25 + 245 Mn low × 4",
        "result": 10780000000,
        "tolerance": 0,
        "unit": "bottles a year",
        "carriedForward": "≈ 1,080 crore bottles",
        "uses": [
          "a-income-bands",
          "a-bottles-top",
          "a-bottles-mid",
          "a-bottles-low"
        ],
        "soWhat": "The top and middle bands land on the same 4,900 Mn. A small base buying often and a large base buying rarely are worth the same to a brand, which means losing the light middle costs as much as losing the heavy top."
      },
      {
        "id": "c3",
        "label": "Bottled-channel litres",
        "expr": "10780000000 * 0.75",
        "display": "1,080 crore bottles × 0.75 L average pack",
        "result": 8085000000,
        "tolerance": 0,
        "unit": "litres a year",
        "carriedForward": "≈ 8.1 bn litres",
        "uses": [
          "a-pack-size"
        ],
        "soWhat": "Pack size is where a 500 ml habit and a 2-litre habit stop being the same purchase. Weight it by litres sold, not by how many of each you can picture on a shelf."
      },
      {
        "id": "c4",
        "label": "Bottled-channel retail value",
        "expr": "8085000000 * 20",
        "display": "8.085 bn litres × ₹20 per litre",
        "result": 161700000000,
        "tolerance": 0,
        "unit": "₹ a year",
        "carriedForward": "≈ ₹16,170 crore",
        "uses": [
          "a-price-bottle"
        ],
        "soWhat": "This price belongs to this channel and nowhere else. The instant it touches a litres figure that includes jars, the answer is out by a factor rather than a margin."
      },
      {
        "id": "c5",
        "label": "Urban households",
        "expr": "490000000 / 4",
        "display": "490 Mn urban people ÷ 4 per urban household",
        "result": 122500000,
        "tolerance": 0,
        "unit": "households",
        "carriedForward": "≈ 120 Mn households",
        "uses": [
          "a-hh-size"
        ],
        "soWhat": "Switch units deliberately here. Bottles are bought by people and jars are bought by households, and a candidate who counts both in people has counted the family twice."
      },
      {
        "id": "c6",
        "label": "Households on a jar subscription",
        "expr": "(120000000 * 0.10 * 0.25) + (120000000 * 0.40 * 0.30) + (120000000 * 0.50 * 0.05)",
        "display": "12 Mn top × 25% + 48 Mn middle × 30% + 60 Mn low × 5%",
        "result": 20400000,
        "tolerance": 0,
        "unit": "households",
        "carriedForward": "≈ 20 Mn households",
        "uses": [
          "a-income-bands",
          "a-jar-pen"
        ],
        "soWhat": "Penetration peaks in the middle, not at the top. Assuming every consumption rate rises with income is the reflex that gets this question wrong, and the reason it fails here is that the top band already owns the substitute."
      },
      {
        "id": "c7",
        "label": "Home jar litres",
        "expr": "20000000 * 80 * 20",
        "display": "20 Mn households × 80 jars a year × 20 L",
        "result": 32000000000,
        "tolerance": 0,
        "unit": "litres a year",
        "carriedForward": "≈ 32 bn litres",
        "uses": [
          "a-jars-per-hh",
          "a-jar-size"
        ],
        "soWhat": "Four times the bottled channel's litres, out of a sixth of urban households. Volume in this category is a standing order, not a shelf decision."
      },
      {
        "id": "c8",
        "label": "Urban workers",
        "expr": "490000000 * 0.40",
        "display": "490 Mn × 40% labour-force participation",
        "result": 196000000,
        "tolerance": 0,
        "unit": "workers",
        "carriedForward": "≈ 200 Mn workers",
        "uses": [
          "a-lfpr"
        ],
        "soWhat": "The workplace stream is the one candidates skip, and it is a quarter of the volume. Anywhere a person spends nine hours a day is a consumption site."
      },
      {
        "id": "c9",
        "label": "Workers served by a jar cooler",
        "expr": "200000000 * 0.25",
        "display": "200 Mn workers × 25% with a cooler at work",
        "result": 50000000,
        "tolerance": 0,
        "unit": "workers",
        "carriedForward": "50 Mn",
        "uses": [
          "a-work-jar-share"
        ],
        "soWhat": "Flag this line as your weakest while you are writing it, not after you are challenged on it."
      },
      {
        "id": "c10",
        "label": "Workplace jar litres",
        "expr": "50000000 * 300",
        "display": "50 Mn workers × 300 L a year (1 L × 300 working days)",
        "result": 15000000000,
        "tolerance": 0,
        "unit": "litres a year",
        "carriedForward": "≈ 15 bn litres",
        "uses": [
          "a-work-litres"
        ],
        "soWhat": "Nearly twice the entire bottled channel, from a stream most answers never open."
      },
      {
        "id": "c11",
        "label": "Total jar-channel litres",
        "expr": "32000000000 + 15000000000",
        "display": "32 bn home + 15 bn workplace",
        "result": 47000000000,
        "tolerance": 0,
        "unit": "litres a year",
        "carriedForward": "≈ 47 bn litres",
        "uses": [],
        "soWhat": "Eighty-five per cent of the litres in this question sit on this line, priced at a tenth of the bottled rate. Hold that before quoting any per-litre figure."
      },
      {
        "id": "c12",
        "label": "Jar-channel retail value",
        "expr": "47000000000 * 2",
        "display": "47 bn litres × ₹2 per litre",
        "result": 94000000000,
        "tolerance": 0,
        "unit": "₹ a year",
        "carriedForward": "≈ ₹9,400 crore",
        "uses": [
          "a-price-jar"
        ],
        "soWhat": "Six times the bottled volume converts into rather less than the bottled value. Volume leadership and value leadership sit in different channels of the same category."
      },
      {
        "id": "c13",
        "label": "Total packaged litres, urban India",
        "expr": "8085000000 + 47000000000",
        "display": "8.1 bn bottled + 47 bn jar",
        "result": 55085000000,
        "tolerance": 0,
        "unit": "litres a year",
        "carriedForward": "≈ 55 bn litres (5,500 crore litres)",
        "uses": [],
        "soWhat": "This is the first of the two answers, and the only one a supply-side check can genuinely test. Report it before the rupee figure, not after."
      },
      {
        "id": "c14",
        "label": "Total retail value, urban India",
        "expr": "161700000000 + 94000000000",
        "display": "₹16,170 crore bottled + ₹9,400 crore jar",
        "result": 255700000000,
        "tolerance": 0,
        "unit": "₹ a year",
        "carriedForward": "₹255,700 Mn, before converting",
        "uses": [],
        "soWhat": "Keep both components visible in the answer. A single blended total hides the finding that 15% of the litres carry nearly two-thirds of the rupees."
      },
      {
        "id": "c15",
        "label": "Total retail value in crore",
        "expr": "255700000000 / 10000000",
        "display": "₹255,700 Mn ÷ 1 crore",
        "result": 25570,
        "tolerance": 0,
        "unit": "₹ crore a year",
        "carriedForward": "≈ ₹25,000 crore — round it before you say it",
        "uses": [],
        "soWhat": "Say ₹25,000 crore. A guesstimate answered as ₹25,570 crore claims a precision your inputs cannot support, and the interviewer hears the claim before the number."
      }
    ],
    "orderOfMagnitude": "10^11 rupees (₹25,000 crore ≈ ₹2.6 × 10^11); 10^10 litres",
    "assumptions": [
      {
        "id": "a-pop",
        "lever": "Population of India",
        "value": "1.4 bn (140 crore)",
        "numeric": 1400000000,
        "unit": "people",
        "basis": "census-anchor",
        "defence": "The working anchor in every Indian sizing question; the published figure sits a little above it, and rounding down buys arithmetic you can run in your head.",
        "confidence": "anchor",
        "contestedBy": "Some datasheets use 1.45 bn. Every figure below rises about 4% — not enough to change any conclusion here."
      },
      {
        "id": "a-urban-share",
        "lever": "Urban share of population",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share",
        "basis": "census-anchor",
        "defence": "Census 2011 recorded 31% and the trend has run upward for over a decade, so 35% is the defensible midpoint between the last count and the current estimates.",
        "confidence": "anchor",
        "contestedBy": "An interviewer preferring 40% raises the whole answer by 14% and changes nothing structural — the bottled-versus-jar split is untouched by the base."
      },
      {
        "id": "a-income-bands",
        "lever": "Urban income-band split",
        "value": "Top 10% / Middle 40% / Low 50%",
        "unit": "share of urban base",
        "basis": "published-benchmark",
        "defence": "The standard consumer-pyramid split used across Indian consumer sizing, and the one an interviewer will recognise without needing a source named.",
        "confidence": "defensible",
        "contestedBy": "The split is measured over households but applied to people in the bottle lines. Low-income urban households are larger, so at the people level the low band is nearer 55% and the middle 35% — which cuts bottle volume by about 5%, because that band buys four bottles a year."
      },
      {
        "id": "a-bottles-top",
        "lever": "Bottles a year, top band",
        "value": "100",
        "numeric": 100,
        "unit": "bottles per person per year",
        "basis": "observed-behaviour",
        "defence": "Two a week — a commute, a meal out, a flight, a gym bag — which is what you can watch happen outside any Tier-1 office building.",
        "confidence": "judgement",
        "contestedBy": "A genuinely daily buyer sits at 300. Pushing the top band to 200 lifts the total answer by nearly 30% on its own."
      },
      {
        "id": "a-bottles-mid",
        "lever": "Bottles a year, middle band",
        "value": "25",
        "numeric": 25,
        "unit": "bottles per person per year",
        "basis": "observed-behaviour",
        "defence": "One a fortnight — this band carries water from home on most days and buys only when travelling or eating out.",
        "confidence": "judgement",
        "contestedBy": "This is the largest single lever on bottle volume because the base under it is 196 Mn. Moving it to 40 lifts total value by about 17%."
      },
      {
        "id": "a-bottles-low",
        "lever": "Bottles a year, low band",
        "value": "4",
        "numeric": 4,
        "unit": "bottles per person per year",
        "basis": "observed-behaviour",
        "defence": "A long train journey, a hospital visit, a wedding — occasions where there is genuinely no tap, and nothing else.",
        "confidence": "judgement",
        "contestedBy": "Even doubling it moves the total answer by under 6%. This is the row to stop arguing about first."
      },
      {
        "id": "a-pack-size",
        "lever": "Average bottled pack size",
        "value": "0.75 litre",
        "numeric": 0.75,
        "unit": "litres per bottle",
        "basis": "physical-constant",
        "defence": "The 1-litre bottle dominates volume, the 500 ml dominates count, and the 2-litre home pack sits above both — volume-weighted, the blend lands just under a litre.",
        "confidence": "defensible",
        "contestedBy": "Weight it by number of packs sold rather than by litres and you land near 0.6 L, cutting bottled volume by a fifth."
      },
      {
        "id": "a-price-bottle",
        "lever": "Realised retail price, bottled channel",
        "value": "₹20 per litre",
        "numeric": 20,
        "unit": "₹ per litre",
        "basis": "published-benchmark",
        "defence": "The printed MRP on a 1-litre bottle is ₹20 and has been for years; the 2-litre pack pulls the blend down and restaurant-sold small packs pull it up, roughly cancelling.",
        "confidence": "defensible",
        "contestedBy": "Chilled 250 ml at a cinema is ₹40 a litre. If out-of-home small packs are a larger share than assumed, this should be ₹24 and the answer rises about 13%."
      },
      {
        "id": "a-hh-size",
        "lever": "Urban household size",
        "value": "4 people",
        "numeric": 4,
        "unit": "people per household",
        "basis": "census-anchor",
        "defence": "The national average is about 4.4 and urban households are consistently smaller than rural ones, so 4 is the right urban figure rather than a convenient one.",
        "confidence": "anchor",
        "contestedBy": "Using the national 4.4 would cut urban households by about a tenth, and the jar answer with it."
      },
      {
        "id": "a-jar-pen",
        "lever": "Household jar penetration by income band",
        "value": "Top 25% / Middle 30% / Low 5%",
        "unit": "share of households in band",
        "basis": "observed-behaviour",
        "defence": "Penetration peaks in the middle rather than at the top, because the competing product at the top is an RO unit already bolted under the sink, and at the bottom it is a municipal tap that costs nothing.",
        "confidence": "judgement",
        "contestedBy": "An interviewer who insists penetration must rise with income will put the top band at 40%; that adds 1.8 Mn households and about 2% to the answer, so the argument is not worth having."
      },
      {
        "id": "a-jars-per-hh",
        "lever": "Jars a subscribing household takes",
        "value": "80 a year (about 1.5 a week)",
        "numeric": 80,
        "unit": "jars per household per year",
        "basis": "observed-behaviour",
        "defence": "Thirty litres a week for a family of four is roughly a litre a head a day for drinking and cooking, which is what the water is actually used for once a filter is out of the picture.",
        "confidence": "judgement",
        "contestedBy": "Households that also cook with jar water take three a week. Doubling this lever adds 25% to the total answer, so it matters more than the penetration rate sitting next to it."
      },
      {
        "id": "a-jar-size",
        "lever": "Jar volume",
        "value": "20 litres",
        "numeric": 20,
        "unit": "litres per jar",
        "basis": "physical-constant",
        "defence": "The bubble-top format is standardised at 20 litres nationally, which is why this channel can be counted in jars and converted to litres at the end.",
        "confidence": "anchor"
      },
      {
        "id": "a-price-jar",
        "lever": "Realised retail price, jar channel",
        "value": "₹2 per litre (₹40 for a 20-litre jar, delivered)",
        "numeric": 2,
        "unit": "₹ per litre",
        "basis": "observed-behaviour",
        "defence": "₹40 delivered is what a jar costs in most urban neighbourhoods, and the delivery sits inside that price rather than being charged on top of it.",
        "confidence": "defensible",
        "contestedBy": "A branded metro jar reaches ₹60 (₹3 a litre) and a local unbranded one sells at ₹30 (₹1.50 a litre). That spread is the sensitivity grid below."
      },
      {
        "id": "a-lfpr",
        "lever": "Urban labour-force participation",
        "value": "40%",
        "numeric": 0.4,
        "unit": "share of urban population",
        "basis": "published-benchmark",
        "defence": "Low by international standards for an identifiable reason — urban female participation runs near a quarter — and it is the figure that reconciles a 490 Mn urban base with a roughly 200 Mn urban workforce.",
        "confidence": "defensible",
        "contestedBy": "Counting informal and part-time work fully would push this to 45%, adding barely 1% to the total answer — which is why the cooler share below, not this row, is the one to defend."
      },
      {
        "id": "a-work-jar-share",
        "lever": "Urban workers drinking from a jar cooler at work",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of urban workers",
        "basis": "declared-judgement",
        "defence": "Offices, clinics, shops and coaching centres have coolers; construction sites, street vending and most factory floors do not, and those employ the larger share.",
        "confidence": "shaky",
        "contestedBy": "Nothing anchors this number. At 15% it removes 6 bn litres; at 35% it adds 6 bn. Name it as your weakest row before the interviewer does."
      },
      {
        "id": "a-work-litres",
        "lever": "Litres a jar-served worker draws",
        "value": "300 a year (1 litre a working day × 300 days)",
        "numeric": 300,
        "unit": "litres per worker per year",
        "basis": "structural-logic",
        "defence": "A litre across a working day is a cup roughly every two hours, and Indian establishments run a six-day week, which lands near 300 days once festivals and holidays come out.",
        "confidence": "defensible",
        "contestedBy": "A five-day corporate week gives 250 days and cuts this stream by a sixth."
      },
      {
        "id": "a-plants",
        "lever": "Organised packaged-water bottling plants in India",
        "value": "2,000",
        "numeric": 2000,
        "unit": "plants",
        "basis": "declared-judgement",
        "defence": "National and regional brands run licensed plants in the low thousands — a few hundred for the national names across their franchise networks, and the balance regional.",
        "confidence": "judgement",
        "contestedBy": "Counting every licensed unit including the smallest regional bottlers could double this. It is the loosest number in the supply route and should be said to be."
      },
      {
        "id": "a-line-rate",
        "lever": "Filling-line throughput",
        "value": "3,000 litres an hour",
        "numeric": 3000,
        "unit": "litres per hour",
        "basis": "physical-constant",
        "defence": "A mid-speed PET line fills roughly 100 bottles a minute, which at a litre a bottle is 6,000 an hour before changeovers — halved to 3,000 for realistic mixed-pack running.",
        "confidence": "judgement"
      },
      {
        "id": "a-plant-hours",
        "lever": "Plant operating time",
        "value": "4,800 hours a year (16 hours × 300 days)",
        "numeric": 4800,
        "unit": "hours per year",
        "basis": "structural-logic",
        "defence": "Two shifts rather than three, because packaged water is seasonal and the third shift is what the summer peak exists to justify.",
        "confidence": "defensible"
      },
      {
        "id": "a-utilisation",
        "lever": "Effective capacity utilisation",
        "value": "40%",
        "numeric": 0.4,
        "unit": "share of nameplate",
        "basis": "structural-logic",
        "defence": "The category peaks hard between March and June, so plants are sized for summer and idle for much of the year — a nameplate figure taken at face value would overstate output by more than double.",
        "confidence": "judgement",
        "contestedBy": "Sixty per cent is defensible for the national brands taken alone, and would lift the supply-side value by about a third."
      },
      {
        "id": "a-jar-units",
        "lever": "Local jar-filling units across urban India",
        "value": "30,000",
        "numeric": 30000,
        "unit": "units",
        "basis": "declared-judgement",
        "defence": "Build it rather than assert it — the top 100 cities support roughly 100 units each and the remaining 7,900 towns two or three, which sums to about 30,000.",
        "confidence": "judgement",
        "contestedBy": "This channel is largely unregistered, so the true figure is unknowable. Treat it as an order-of-magnitude claim and say so."
      },
      {
        "id": "a-jar-unit-output",
        "lever": "Output of one jar-filling unit",
        "value": "75,000 jars a year (250 a day × 300 days)",
        "numeric": 75000,
        "unit": "jars per unit per year",
        "basis": "observed-behaviour",
        "defence": "A unit with one filling bay and two delivery vehicles turns about 250 jars a day, which is what that bay and a pair of drivers can physically move.",
        "confidence": "judgement"
      },
      {
        "id": "a-urban-sales-share",
        "lever": "Urban share of national packaged-water sales",
        "value": "85%",
        "numeric": 0.85,
        "unit": "share of national value",
        "basis": "published-benchmark",
        "defence": "Urban India is about 65% of FMCG sales, and packaged water skews further urban than FMCG as a whole because the jar channel and the out-of-home occasions barely exist in villages.",
        "confidence": "defensible",
        "contestedBy": "At 75% the supply route lands 6% below the demand route rather than 6% above. The two stay inside any honest band either way."
      }
    ],
    "question": "What is a year of packaged drinking water worth at retail in urban India — and how many litres is that?",
    "traps": [
      {
        "trap": "Carrying one blended price per litre across both channels.",
        "whyItHappens": "The funnel produces a single total volume, and the mind reaches for a single price to multiply it by. The ₹20 bottle MRP is the only water price most candidates can recall on demand, so it wins by availability and the 47 bn jar litres get priced at ten times their worth.",
        "fix": "Split volume by channel before you price anything. Make it a rule that no price line may touch a litres line spanning more than one channel, and state the rule out loud as you set up the tree."
      },
      {
        "trap": "Sizing the water people drink rather than the water people buy in a pack.",
        "whyItHappens": "Two to three litres a day is a familiar physiological figure and it slips into the funnel unchallenged because it sounds like data. Multiplied by 490 Mn people and 365 days it produces about 450 bn litres, eight times the real answer.",
        "fix": "The gate in this funnel is a purchase occasion, not thirst. Ask what makes someone pay for water they could otherwise get free, and count only those moments."
      },
      {
        "trap": "Using the national population and calling the answer urban.",
        "whyItHappens": "You set up 1.4 bn, apply the 35% gate once, then reach back to the 1.4 bn out of habit when computing households or workers. Nothing in the arithmetic flags it, and the branch where it happened comes out roughly three times too large.",
        "fix": "Write the urban base once, box it on the page, and derive every subsequent base from the boxed number. If a line uses 1,400 it should be the first line and nothing else."
      },
      {
        "trap": "Dropping the 20-litre jar because it feels like the informal sector.",
        "whyItHappens": "Jar water is unbranded, paid in cash, locally filled and never appears in a retail audit, so it does not feel like 'the market' the question is asking about. Candidates quietly exclude it and never say they have.",
        "fix": "It is 85% of the litres. Excluding it is a legitimate scoping choice, but declare it before computing and then stop calling the answer the packaged drinking water market — call it the bottled water market, which is a different and smaller question."
      },
      {
        "trap": "Reporting ₹25,570 crore.",
        "whyItHappens": "The arithmetic produced five digits and the candidate reads out what is on the page, mistaking the precision of the calculation for the precision of the inputs.",
        "fix": "Round to ₹25,000 crore and hand over a band of ₹18,000 to ₹35,000 crore. The precision you claim is a claim about your data, and here you have none."
      },
      {
        "trap": "Giving one answer when the question has two.",
        "whyItHappens": "Sizing questions are rehearsed as rupee questions, so volume gets computed as an intermediate and then discarded. The candidate hands over a value and loses the only finding in the analysis.",
        "fix": "Report litres and rupees side by side. The sentence that earns the marks is that 15% of the litres carry nearly two-thirds of the rupees, and you cannot say it if you kept only one number."
      }
    ],
    "teachingPoint": "A blended price per litre is the most abusable number in a sizing chain. The same litre costs about ₹20 in a chilled 1-litre bottle and about ₹2 in a 20-litre jar, so one average price laid across one total volume can be wrong by a factor rather than a margin. Split the volume by channel before you price anything, and hand back two answers — litres and rupees — because they point in different directions."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "fans_blend",
      "whyThisLever": "Penetration can neither save you nor sink you: it already sits at or near its ceiling in four of the five bands, and even taking the weakest band's penetration to zero moves the answer by a fifth. Fans per owning household behaves completely differently — the total is exactly this figure multiplied by 23.6 crore owning households, so a 25% error in your picture of how many wired ceiling points a home has is a 25% error in the answer, with nothing to damp it. And the five band figures are not five independent guesses that might cancel; they come from one mental image of Indian rooms, so they fail together. This is the lever candidates spend the least time on and the one that decides the answer.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "1.5 fans per owning household",
          "answer": "≈ 35 crore (353 Mn)",
          "deltaVsBase": "−24%"
        },
        {
          "scenario": "Base",
          "leverValue": "1.96 fans per owning household (implied by the five bands)",
          "answer": "≈ 46 crore (463 Mn)",
          "deltaVsBase": "—"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "2.5 fans per owning household",
          "answer": "≈ 59 crore (589 Mn)",
          "deltaVsBase": "+27%"
        }
      ],
      "breakpoint": "The answer leaves the stated 40-55 crore band below 1.70 or above 2.33 fans per owning household — so the band survives roughly a 15% error in this lever and nothing more. The two routes reconcile exactly at 1.67, which is five fans for every three fan-owning homes. That is the real question underneath the arithmetic: do the Indian homes you have actually been inside average two fans, or five across three? Answer that and you have answered the guesstimate.",
      "oneLiner": "With no time for the grid: 'The answer scales one-for-one on fans per owning household. Mine implies about two. Take it to 1.5 and the answer is 35 crore; take it to 2.5 and it is 59 crore. Everything else in the chain is a census anchor and cannot move the answer that far.'"
    },
    "number": "04",
    "difficulty": "Medium",
    "id": "ceiling-fans-stock",
    "archetype": "household-ownership-stock",
    "routeChoice": {
      "chosen": "Top-down",
      "why": "The unit being counted lives inside a household, and households are the one denominator in India that is genuinely well measured — population and household size are census anchors, not guesses. Start from 140 crore people, divide into households, split on the variable that actually drives fan count, and the only things left to assume are ownership rates and fans per home. State the split you are using before you touch a number.",
      "rejectedRoute": "Bottom-up",
      "rejectedWhyNot": "A bottom-up route would build from supply — units manufactured and imported, less exports, accumulated across the life of a fan. It is weaker here for two specific reasons. First, it needs a scrappage assumption, and scrappage is the hardest thing to observe in a category where a dead fan often stays on its hook for years; the very ambiguity the scope section had to resolve reappears as an unanchorable number. Second, it counts every fan in the country, so it needs a residential-share split bolted on at the end — a split you would have to assume anyway. The bottom-up route therefore inherits the top-down route's weakest step without shedding any of its own. It is kept below as the triangulation, where a rough answer is useful and a wrong one is cheap."
    },
    "sanityChecks": [
      "46 crore fans across roughly 30 crore households is about 1.5 fans per household nationally. Picture the country honestly: a rural one-room home with one fan and an urban flat with three, in roughly a three-to-two household ratio. The average lands where it should.",
      "One fan for every three Indians. If the answer had come out at one per person you would be claiming a fan in every bedroom of every home in the country, rural included — visibly false to anyone who has travelled outside a metro.",
      "Load test: a ceiling fan draws about 70 watts. On a May evening with half the installed base running, that is 46 crore × 0.5 × 70 W ≈ 16 GW against a national peak of roughly 240 GW — about 7% of peak, and around a quarter of residential load. Fans are routinely described as the largest residential load after lighting, so this sits in the right neighbourhood. An answer of 5 crore fans would put them under 1% of peak, which nobody who has seen a summer load curve would accept.",
      "Bracket before you trust. 5 crore fans would mean one fan per six households; 500 crore would mean sixteen per household. Both fail in under a second, which places the answer in the tens of crores — and that bracketing is most of what the interviewer is actually testing.",
      "Replacement implication: 46 crore fans on a 15-year life means about 3 crore replaced in homes every year. The supply-side route allowed 2.6 crore. The same 15% gap turns up in the same place rather than in a new one, which is what makes the two routes reassuring rather than merely different.",
      "Penetration check: the model implies 78% of Indian households own at least one ceiling fan. That is high but not universal, which is the right shape for a category that is cheap, near-essential in most of the country, and still blocked by kutcha roofs and unreliable supply at the bottom. If your model had produced 95%, you would have forgotten the bottom of the distribution."
    ],
    "answerBand": "40-55 crore (400-550 Mn). Say the band out loud. A point estimate here is a claim the assumptions cannot carry, and a guesstimate answered as '46.28 crore' signals you do not understand what an estimate is.",
    "tree": {
      "root": "Ceiling fans hanging in Indian homes",
      "rootFormula": "= Urban fans + Rural fans",
      "value": "≈ 46 crore (463 Mn)",
      "branches": [
        {
          "label": "Urban fans",
          "formula": "Urban households × Band share × Penetration × Fans per owning household",
          "value": "≈ 27 crore (273 Mn)",
          "note": "12 crore households carrying 59% of the national fan stock. Urban is the smaller population and the larger pool — say that out loud before the interviewer asks why.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Affluent urban (20% — 2.4 crore homes)",
              "formula": "2.4 crore × 100% × 4.0 fans",
              "value": "≈ 9.6 crore (96 Mn)",
              "note": "Air conditioning does not remove the fan; it hangs beside it and runs when the AC does not."
            },
            {
              "label": "Middle urban (50% — 6 crore homes)",
              "formula": "6 crore × 95% × 2.5 fans",
              "value": "≈ 14.3 crore (143 Mn)",
              "note": "The largest single block in the tree and the softest fans-per-home figure on the page — a mix of 1BHK and 2BHK stock, not a measured average."
            },
            {
              "label": "Low-income urban (30% — 3.6 crore homes)",
              "formula": "3.6 crore × 80% × 1.2 fans",
              "value": "≈ 3.5 crore (35 Mn)",
              "note": "One room, one hook. Three in ten urban households, about one in eight of the urban fans."
            }
          ]
        },
        {
          "label": "Rural fans",
          "formula": "Rural households × Electrified × Band share × Penetration × Fans per owning household",
          "value": "≈ 19 crore (190 Mn)",
          "note": "18 crore households — half again as many as urban — producing two-thirds as many fans. The gap is rooms, not people.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Electrification gate (95%)",
              "formula": "18 crore × 95%",
              "value": "≈ 17 crore homes",
              "note": "Connections are near-universal on paper. Holding 95% rather than 99% costs about 1 crore fans — size the step first, then decide it is small."
            },
            {
              "label": "Better-off rural (30% — 5.1 crore homes)",
              "formula": "5.1 crore × 95% × 2.0 fans",
              "value": "≈ 9.7 crore (97 Mn)",
              "note": "Pucca, multi-room, some non-farm income. Two wired ceiling points: the main room and one bedroom."
            },
            {
              "label": "Basic rural (70% — 11.9 crore homes)",
              "formula": "11.9 crore × 65% × 1.2 fans",
              "value": "≈ 9.3 crore (93 Mn)",
              "note": "The shakiest penetration figure here. A kutcha house may have no ceiling to hang a fan from — that is a physical constraint, not an affordability one, and they bite differently."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Supply-side cross-check — annual sales × fan life",
      "route": "Bottom-up",
      "premise": "If the installed base were stable, every fan sold to a household would be replacing one that died, so the base would simply be annual replacement sales multiplied by how long a fan lasts. The base is not stable — it is still growing — so strip out the sales that add new hanging points and keep only the replacement flow. This route shares nothing with the household build: no population figure, no household size, no penetration rate, no rooms. That independence is what makes the comparison worth anything.",
      "lines": [
        {
          "id": "t1",
          "label": "Ceiling fans sold in India in a year",
          "expr": "100000000000 / 2000",
          "display": "₹10,000 crore market ÷ ₹2,000 average realised price",
          "result": 50000000,
          "unit": "fans per year",
          "carriedForward": "≈ 5 crore units a year",
          "uses": [
            "fan_market_value",
            "fan_price"
          ],
          "soWhat": "Deriving units from value rather than quoting a unit figure forces the price assumption into the open, where it can be challenged. Quoting '5 crore fans a year' from memory hides it."
        },
        {
          "id": "t2",
          "label": "Units bought by households",
          "expr": "50000000 * 0.75",
          "display": "5 crore × 75% residential",
          "result": 37500000,
          "tolerance": 1e-06,
          "unit": "fans per year",
          "carriedForward": "≈ 3.75 crore",
          "uses": [
            "household_share_sales"
          ],
          "soWhat": "The same residential boundary the scope section drew, now applied to a flow instead of a stock. Applying a boundary consistently across two routes is more of the grade than either route's arithmetic."
        },
        {
          "id": "t3",
          "label": "Replacement units per year",
          "expr": "37500000 * 0.7",
          "display": "3.75 crore × 70% replacing a dead fan",
          "result": 26250000,
          "tolerance": 1e-06,
          "unit": "fans per year",
          "carriedForward": "≈ 2.6 crore",
          "uses": [
            "replacement_share"
          ],
          "soWhat": "Only replacement sales measure the installed base. New installations grow the base rather than revealing its size, and multiplying total sales by fan life is the error that makes this route over-count by a third."
        },
        {
          "id": "t4",
          "label": "Installed residential base",
          "expr": "26250000 * 15",
          "display": "2.6 crore a year × 15-year fan life",
          "result": 393750000,
          "unit": "fans",
          "carriedForward": "≈ 39 crore",
          "uses": [
            "fan_life"
          ],
          "soWhat": "The cross-check answer. Compare it to the household build before deciding which you believe — and have a reason ready that is not 'they are close enough'."
        }
      ],
      "answer": "≈ 39 crore ceiling fans (roughly 394 million)",
      "verdict": "46 crore against 39 crore — about 15% apart, and the same order of magnitude, which is as close as two genuinely independent routes usually get. Do not average them. The gap has a direction you can name: the household build counts every fan on a hook, dead ones included, while the replacement route only sees fans inside an active replacement cycle and therefore misses the ones nobody has got round to replacing. That asymmetry runs one way, so the true figure sits nearer the higher number. It also shows up again in the sanity checks — the household build implies about 3 crore home replacements a year against this route's 2.6 crore, the same 15% gap appearing in the same place. Two routes disagreeing about one thing rather than four is a good sign, not a bad one. Report 40-55 crore."
    },
    "probes": [
      {
        "question": "Your fans-per-household figures range from 1.2 to 4. Where did those come from?",
        "intent": "Whether the ratio was reasoned from something physical or assigned by feel and then defended after the fact.",
        "goodAnswer": "Names the physical driver first — wired ceiling points, which track room count — then gives the rooms behind each band: one for the urban poor and the basic rural home, two for a pucca rural house, three or four for an urban flat. Concedes without prompting that the middle-urban 2.5 is a 1BHK-to-2BHK mix and is the softest of the five.",
        "weakAnswer": "'It felt about right for that segment.' Or, more commonly, a confident defence of the penetration rates instead — because those are the numbers the candidate prepared, and answering the question you rehearsed for is the most visible tell there is."
      },
      {
        "question": "The supply-side cross-check gives 39 crore. Which of your two answers do you believe?",
        "intent": "Whether the candidate can reason about the direction of a gap rather than splitting the difference.",
        "goodAnswer": "States what each route counts and what it therefore misses. The household build counts fans on hooks, dead ones included; the replacement route counts fans inside an active replacement cycle and so misses every fan nobody has bothered to replace. That asymmetry runs one way only, so the truth sits nearer the higher figure. Reports 40-55 crore rather than picking one.",
        "weakAnswer": "'I'd take the average, so about 42 crore.' Averaging two estimates without asking why they differ throws away the only thing the second route was built to produce."
      },
      {
        "question": "How would this change for all ceiling fans in India, not only homes?",
        "intent": "Whether the residential boundary was a deliberate choice or an accident of where the candidate happened to stop.",
        "goodAnswer": "Reaches for the split already used in the cross-check: homes take about 75% of annual units, so non-residential is roughly a third again on top, taking the total towards 60 crore. Then flags what breaks — commercial fans run far longer hours and are replaced faster, so the 15-year life would have to fall, and the two adjustments push in opposite directions.",
        "weakAnswer": "'It would be somewhat higher.' A boundary you cannot size is a boundary you did not set."
      },
      {
        "question": "One number, an afternoon and a data subscription. Which do you check?",
        "intent": "Whether the candidate can rank uncertainty by impact on the answer rather than by personal discomfort with the number.",
        "goodAnswer": "The blended fans per owning household, because the answer scales one-for-one on it and the five band figures are not independent errors — they come from a single mental model of Indian rooms and move together. Adds that penetration is already near its ceiling in four of five bands and structurally cannot move the answer far, so checking it would be time spent on the wrong lever.",
        "weakAnswer": "'The population figure' or 'the urban share' — the two best-documented numbers in the whole chain and the two least in need of checking. Candidates pick them because they are checkable, not because they matter."
      },
      {
        "question": "Rural has 18 crore households against urban's 12, yet you give rural fewer fans. Explain.",
        "intent": "Whether the candidate can read their own ledger and attribute a result to the step that produced it.",
        "goodAnswer": "Points straight at the two multipliers doing the work: penetration is lower in rural, and fans per owning household is much lower again, because a rural home has more floor area than an urban flat and fewer wired ceiling points. Notes that the two compound, and that this inversion is the model's main finding rather than an embarrassment in it.",
        "weakAnswer": "Re-reads the arithmetic aloud, correctly, without ever naming which multiplier caused the inversion. Getting the sum right is not the same as understanding what the sum says."
      },
      {
        "question": "Suppose rural penetration in the bottom band is 45%, not 65%. Does your answer change?",
        "intent": "Whether the candidate can size a challenge instead of either capitulating or digging in.",
        "goodAnswer": "Works it on the spot — that band contributes about 9.3 crore fans, so cutting penetration by roughly a third takes about 3 crore off, landing near 43 crore. Still inside the 40-55 crore band, so the answer stands and only the point estimate moves. Then adds the honest caveat: if the same pessimism applied to rural fans per home as well, the two would compound and the answer would leave the band.",
        "weakAnswer": "'Yes, that's fair' followed by a recomputation of the whole tree from the top — or a flat refusal. Neither tells the interviewer whether the challenge actually mattered, which is the only thing the question was asking."
      }
    ],
    "finalAnswerNumeric": 460000000,
    "tabLabel": "Ceiling fans, India",
    "finalAnswer": "≈ 46 crore ceiling fans (roughly 460 million) hanging in Indian homes — about 1.5 per household, and about two per fan-owning household",
    "scope": {
      "countingWhat": "Ceiling fans physically installed on a hook in a residential dwelling in India — hanging, whether or not anyone switches them on, and whether or not they still turn.",
      "unit": "ceiling fans",
      "timeBasis": "stock (point in time)",
      "geography": "India, urban and rural",
      "included": [
        "Fans in occupied homes, owned and rented alike",
        "Fans in second homes and in flats standing empty between tenants — they are still hanging",
        "Dead and disconnected fans still bolted to the hook, because the question asks what is hanging, not what is working",
        "Unbranded and locally assembled fans, which are a large share of the rural base and invisible in most published market data"
      ],
      "excluded": [
        "Table, pedestal, wall-mounted and exhaust fans — different product, different install, different count",
        "Fans in offices, shops, godowns, factories, schools, hospitals, hotels and places of worship",
        "Fans in railway coaches and buses",
        "Unsold stock in warehouses, dealer godowns and on retail shelves",
        "Fans bought this season but still in the box, not yet on a hook"
      ],
      "boundaryTrap": "'Hanging' is not 'working', and neither is 'sold'. Three different numbers sit inside this question: fans sold in a year (a flow, roughly 5 crore), fans hanging (a stock, the answer), and fans hanging and functional (a smaller stock). A candidate who does not choose one out loud will drift between them mid-calculation — usually building a stock structure and then defending it with a sales figure. Choose 'hanging' and say why: it is the only one of the three you can count from households rather than from records nobody keeps."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Urban population",
        "expr": "1400000000 * 0.35",
        "display": "140 crore × 35% urban",
        "result": 490000000,
        "tolerance": 1e-06,
        "unit": "people",
        "carriedForward": "≈ 49 crore",
        "uses": [
          "pop_india",
          "urban_share"
        ],
        "soWhat": "Urban and rural have to be separated before anything else, because every multiplier downstream differs between them — household size, penetration and fans per home all break at this line."
      },
      {
        "id": "c2",
        "label": "Rural population",
        "expr": "1400000000 * 0.65",
        "display": "140 crore × 65% rural",
        "result": 910000000,
        "tolerance": 1e-06,
        "unit": "people",
        "carriedForward": "≈ 91 crore",
        "uses": [
          "pop_india",
          "urban_share"
        ],
        "soWhat": "Rural is nearly two-thirds of the population. If your structure treats it as a footnote, the answer will be wrong by more than any single assumption error could make it."
      },
      {
        "id": "c3",
        "label": "Urban households",
        "expr": "490000000 / 4",
        "display": "49 crore ÷ 4.0 people per urban household",
        "result": 122500000,
        "unit": "households",
        "carriedForward": "≈ 12 crore (120 Mn) — round here and keep the rest of the arithmetic in your head",
        "uses": [
          "hh_size_urban"
        ],
        "soWhat": "The household, not the person, is the unit that owns a fan. Switching denominator here is the whole move in this archetype."
      },
      {
        "id": "c4",
        "label": "Rural households",
        "expr": "910000000 / 5",
        "display": "91 crore ÷ 5.0 people per rural household",
        "result": 182000000,
        "unit": "households",
        "carriedForward": "≈ 18 crore (180 Mn)",
        "uses": [
          "hh_size_rural"
        ],
        "soWhat": "Rural has half again as many households as urban. Hold that number in mind — the final answer inverts it, and you will be asked why."
      },
      {
        "id": "c5",
        "label": "Rural households with a working connection",
        "expr": "180000000 * 0.95",
        "display": "18 crore × 95% electrified",
        "result": 171000000,
        "tolerance": 1e-06,
        "unit": "households",
        "carriedForward": "≈ 17 crore (170 Mn)",
        "uses": [
          "rural_electrified"
        ],
        "soWhat": "The gate that stops you counting fans in homes that cannot run one. It costs about 1 crore fans — name it, size it, then say it is small. A step you considered and dismissed reads completely differently from a step you never had."
      },
      {
        "id": "c6",
        "label": "Fans in affluent urban homes",
        "expr": "120000000 * 0.2 * 1 * 4",
        "display": "12 crore urban homes × 20% affluent × 100% own × 4.0 fans",
        "result": 96000000,
        "unit": "fans",
        "carriedForward": "≈ 9.6 crore",
        "uses": [
          "urban_band_split",
          "pen_urban_aff",
          "fans_urban_aff"
        ],
        "soWhat": "One in five urban households produces more than a third of urban fans. That concentration is the reason the band split exists at all."
      },
      {
        "id": "c7",
        "label": "Fans in middle urban homes",
        "expr": "120000000 * 0.5 * 0.95 * 2.5",
        "display": "12 crore urban homes × 50% middle × 95% own × 2.5 fans",
        "result": 142500000,
        "tolerance": 1e-06,
        "unit": "fans",
        "carriedForward": "≈ 14.3 crore",
        "uses": [
          "urban_band_split",
          "pen_urban_mid",
          "fans_urban_mid"
        ],
        "soWhat": "The largest block in the model — 31% of the whole answer rests on one figure, the 2.5, and that figure is a judgement about the 1BHK-to-2BHK mix. Say so before the interviewer finds it."
      },
      {
        "id": "c8",
        "label": "Fans in low-income urban homes",
        "expr": "120000000 * 0.3 * 0.8 * 1.2",
        "display": "12 crore urban homes × 30% low-income × 80% own × 1.2 fans",
        "result": 34560000,
        "tolerance": 1e-06,
        "unit": "fans",
        "carriedForward": "≈ 3.5 crore",
        "uses": [
          "urban_band_split",
          "pen_urban_low",
          "fans_urban_low"
        ],
        "soWhat": "Three in ten urban households, about an eighth of urban fans. Both multipliers cut the same way here, which is what makes banded models worth building."
      },
      {
        "id": "c9",
        "label": "Urban fans, total",
        "expr": "96000000 + 142500000 + 34560000",
        "display": "9.6 crore + 14.3 crore + 3.5 crore",
        "result": 273060000,
        "unit": "fans",
        "carriedForward": "≈ 27 crore",
        "uses": [],
        "soWhat": "Sub-total before moving to rural. Announce sub-totals as you go — an interviewer who stops you at minute eight should still have a number."
      },
      {
        "id": "c10",
        "label": "Fans in better-off rural homes",
        "expr": "170000000 * 0.3 * 0.95 * 2",
        "display": "17 crore electrified rural homes × 30% pucca × 95% own × 2.0 fans",
        "result": 96900000,
        "tolerance": 1e-06,
        "unit": "fans",
        "carriedForward": "≈ 9.7 crore",
        "uses": [
          "rural_band_split",
          "pen_rural_hi",
          "fans_rural_hi"
        ],
        "soWhat": "Three in ten rural homes produce over half the rural fans — the same concentration pattern as urban, which is a check that the model is behaving."
      },
      {
        "id": "c11",
        "label": "Fans in basic rural homes",
        "expr": "170000000 * 0.7 * 0.65 * 1.2",
        "display": "17 crore electrified rural homes × 70% basic × 65% own × 1.2 fans",
        "result": 92820000,
        "tolerance": 1e-06,
        "unit": "fans",
        "carriedForward": "≈ 9.3 crore",
        "uses": [
          "rural_band_split",
          "pen_rural_lo",
          "fans_rural_lo"
        ],
        "soWhat": "11.9 crore households — the single largest block of homes in the country — and it yields fewer fans than 5.1 crore better-off rural homes. Two low multipliers compound, and compounding is the thing candidates underestimate."
      },
      {
        "id": "c12",
        "label": "Rural fans, total",
        "expr": "96900000 + 92820000",
        "display": "9.7 crore + 9.3 crore",
        "result": 189720000,
        "unit": "fans",
        "carriedForward": "≈ 19 crore",
        "uses": [],
        "soWhat": "Rural has 1.5 times urban's households and two-thirds of its fans. The inversion is the model's main finding, and you should be able to attribute it to the two multipliers on sight."
      },
      {
        "id": "c13",
        "label": "Households owning at least one fan",
        "expr": "24000000 + 60000000 * 0.95 + 36000000 * 0.8 + 51000000 * 0.95 + 119000000 * 0.65",
        "display": "2.4 cr + (6 cr × 95%) + (3.6 cr × 80%) + (5.1 cr × 95%) + (11.9 cr × 65%)",
        "result": 235600000,
        "tolerance": 1e-06,
        "unit": "households",
        "carriedForward": "≈ 23.6 crore fan-owning homes",
        "uses": [
          "pen_urban_aff",
          "pen_urban_mid",
          "pen_urban_low",
          "pen_rural_hi",
          "pen_rural_lo"
        ],
        "soWhat": "Before announcing a total, collapse the model to a denominator you can defend in a sentence. 23.6 crore of roughly 30 crore households own a fan — 78% national penetration, which is a claim an interviewer can sanity-check instantly."
      },
      {
        "id": "c14",
        "label": "Implied blended fans per owning household",
        "expr": "(273060000 + 189720000) / 235600000",
        "display": "(27.3 crore + 19.0 crore fans) ÷ 23.6 crore owning homes",
        "result": 1.9643,
        "tolerance": 0.0001,
        "unit": "fans per owning household",
        "carriedForward": "≈ 2.0",
        "uses": [
          "fans_blend"
        ],
        "soWhat": "The whole five-band model reduces to this. It is the number to defend, the number to run sensitivity on, and the number to say aloud: 'a fan-owning Indian home has about two fans.' If that sentence sounds wrong, stop and rebuild — not after the total, but here."
      },
      {
        "id": "c15",
        "label": "Ceiling fans hanging in Indian homes",
        "expr": "273060000 + 189720000",
        "display": "27.3 crore urban + 19.0 crore rural",
        "result": 462780000,
        "unit": "fans",
        "carriedForward": "≈ 46 crore — report this, not 46.3",
        "uses": [],
        "soWhat": "The answer. Round to two significant figures, give the band, and name the lever the band comes from before anyone asks."
      }
    ],
    "orderOfMagnitude": "10^8 — hundreds of millions. Being right to the power of ten is the actual test; anything between 30 and 70 crore passes it.",
    "assumptions": [
      {
        "id": "pop_india",
        "lever": "Population of India",
        "value": "≈ 140 crore (1.4 bn)",
        "numeric": 1400000000,
        "unit": "people",
        "basis": "census-anchor",
        "defence": "The 2011 Census counted 121 crore; roughly 1% a year over the decade and a half since lands at 140 crore, which is also where the widely cited international estimates sit.",
        "confidence": "anchor",
        "contestedBy": "Nobody serious contests this. If an interviewer pushes, they are testing whether you will abandon a good number under pressure."
      },
      {
        "id": "urban_share",
        "lever": "Urban share of population",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of population",
        "basis": "census-anchor",
        "defence": "The 2011 Census put it at 31% and urbanisation has run roughly half a point a year since, so 35% is the defensible current figure and the one most published estimates cluster around.",
        "confidence": "anchor",
        "contestedBy": "An interviewer who prefers a 'functional urban' definition will push you to 40%. That adds roughly 3 crore fans — about 7% — because urban households are both more numerous per head and better equipped, but the rural loss offsets most of the urban gain."
      },
      {
        "id": "hh_size_urban",
        "lever": "Average urban household size",
        "value": "4.0 people",
        "numeric": 4,
        "unit": "people per household",
        "basis": "census-anchor",
        "defence": "Census 2011 recorded 4.6 for urban India and the figure has fallen with later marriage, smaller flats and migrant single-person households; 4.0 is the current working number and it keeps the division clean.",
        "confidence": "defensible",
        "contestedBy": "Hold it at 4.5 and urban households fall from 12 crore to under 11 crore, taking about 2.5 crore fans off the answer — roughly 5%."
      },
      {
        "id": "hh_size_rural",
        "lever": "Average rural household size",
        "value": "5.0 people",
        "numeric": 5,
        "unit": "people per household",
        "basis": "census-anchor",
        "defence": "Rural households run about one person larger than urban ones in every Census round — more children, more co-resident generations — and Census 2011's rural average of 5.0 supports the round figure directly.",
        "confidence": "anchor",
        "contestedBy": "Arguing for 4.5 adds 2 crore rural households and about 2 crore fans. It also breaks the urban-rural gap that every round of the Census records, which is a hard position to hold."
      },
      {
        "id": "rural_electrified",
        "lever": "Rural households with a working grid connection",
        "value": "95%",
        "numeric": 0.95,
        "unit": "share of rural households",
        "basis": "published-benchmark",
        "defence": "Household electrification was declared near-universal after the last connection drive, but 'connected' is not 'supplied for enough hours to run a fan', so 95% is the deliberately conservative read of a 99% claim.",
        "confidence": "defensible",
        "contestedBy": "Insisting on 99% adds only about 1 crore fans — roughly 2%. This gate is a scope statement, not a swing factor, and showing you know that is the point of including it."
      },
      {
        "id": "urban_band_split",
        "lever": "Urban income-band split",
        "value": "20% affluent / 50% middle / 30% low-income",
        "numeric": 0.5,
        "unit": "share of urban households (middle band shown)",
        "basis": "published-benchmark",
        "defence": "Roughly a fifth of urban households sit in the car-owning, multi-room-flat band, about half in the salaried two-room middle, and the remaining third in chawls, informal settlements and single-room rentals — the shape every urban consumption survey shows.",
        "confidence": "judgement",
        "contestedBy": "Push the low-income band to 40% at the middle band's expense and the answer drops about 2 crore. The bands are ordered correctly, which matters more than their exact widths."
      },
      {
        "id": "pen_urban_aff",
        "lever": "Fan penetration, affluent urban",
        "value": "100%",
        "numeric": 1,
        "unit": "share of band owning at least one fan",
        "basis": "structural-logic",
        "defence": "A household that can afford an air conditioner still hangs fans in every room, because fans run through power cuts and through the eight months nobody switches the AC on. Penetration here is not in question.",
        "confidence": "anchor",
        "contestedBy": "None worth arguing. If someone proposes 95%, take it — it moves the answer by half a crore."
      },
      {
        "id": "fans_urban_aff",
        "lever": "Fans per owning household, affluent urban",
        "value": "4.0",
        "numeric": 4,
        "unit": "fans per owning household",
        "basis": "observed-behaviour",
        "defence": "Count the hooks in a 3BHK: one in the living room, one in each bedroom, and usually one in the kitchen or on the balcony.",
        "confidence": "defensible",
        "contestedBy": "Some will argue an AC-fitted bedroom loses its fan. In practice the fan stays bolted to the hook — which is precisely what this question counts, and why the scope had to be settled first."
      },
      {
        "id": "pen_urban_mid",
        "lever": "Fan penetration, middle urban",
        "value": "95%",
        "numeric": 0.95,
        "unit": "share of band owning at least one fan",
        "basis": "structural-logic",
        "defence": "A ceiling fan is the cheapest durable an Indian household buys and typically the first one it buys; the 5% shortfall is recent migrants in bare rentals, not a real ownership gap.",
        "confidence": "defensible",
        "contestedBy": "Arguing for 100% adds under a crore. Penetration in this band has nowhere to go, which is exactly why it is the wrong lever to spend structure time on."
      },
      {
        "id": "fans_urban_mid",
        "lever": "Fans per owning household, middle urban",
        "value": "2.5",
        "numeric": 2.5,
        "unit": "fans per owning household",
        "basis": "observed-behaviour",
        "defence": "A 2BHK has three hooks and a 1BHK has two, and the urban middle is a mix of both — 2.5 is the mix, stated as a mix, not a fudge dressed as a decimal.",
        "confidence": "judgement",
        "contestedBy": "Move it to 2.0 and the answer drops 3 crore; move it to 3.0 and it gains 3 crore. This single figure carries 31% of the answer — more than any other number on the page."
      },
      {
        "id": "pen_urban_low",
        "lever": "Fan penetration, low-income urban",
        "value": "80%",
        "numeric": 0.8,
        "unit": "share of band owning at least one fan",
        "basis": "observed-behaviour",
        "defence": "In a single-room tenement the fan competes with rent and a metered connection; four in five have one and the rest run a table fan or nothing.",
        "confidence": "judgement",
        "contestedBy": "A range of 70% to 90% is arguable and moves the answer under a crore either way. The band is too small for penetration here to matter."
      },
      {
        "id": "fans_urban_low",
        "lever": "Fans per owning household, low-income urban",
        "value": "1.2",
        "numeric": 1.2,
        "unit": "fans per owning household",
        "basis": "observed-behaviour",
        "defence": "One room, one hook. The 0.2 is the minority with a second room or a separate kitchen.",
        "confidence": "defensible",
        "contestedBy": "Almost nobody argues this one, which is a signal: the assumptions that go unchallenged are usually the ones physically constrained rather than economically chosen."
      },
      {
        "id": "rural_band_split",
        "lever": "Rural housing-quality split",
        "value": "30% pucca / better-off, 70% basic",
        "numeric": 0.3,
        "unit": "share of electrified rural households (better-off band shown)",
        "basis": "published-benchmark",
        "defence": "Roughly three in ten rural households live in a fully pucca multi-room house with some non-farm income; the rest are one- and two-room kutcha or semi-pucca homes. Housing quality is the right split here because it sets wired ceiling points directly, where income only sets them through housing.",
        "confidence": "judgement",
        "contestedBy": "Push the better-off band to 40% and the answer gains about 2 crore. The split is worth naming, not worth arguing over."
      },
      {
        "id": "pen_rural_hi",
        "lever": "Fan penetration, better-off rural",
        "value": "95%",
        "numeric": 0.95,
        "unit": "share of band owning at least one fan",
        "basis": "observed-behaviour",
        "defence": "Same logic as the urban middle — a pucca house with a working connection has a fan; the shortfall is a rounding allowance, not a segment with a story.",
        "confidence": "defensible",
        "contestedBy": "100% is defensible and adds half a crore. Nothing turns on it."
      },
      {
        "id": "fans_rural_hi",
        "lever": "Fans per owning household, better-off rural",
        "value": "2.0",
        "numeric": 2,
        "unit": "fans per owning household",
        "basis": "observed-behaviour",
        "defence": "Two hooks: the main room and one bedroom. A rural house has more floor area than an urban flat and far fewer wired ceiling points — floor area is not the driver, wiring is.",
        "confidence": "defensible",
        "contestedBy": "An interviewer from a rural background may argue for 2.5 in this band, worth about 2.5 crore. Concede it and note that it pushes the answer towards the top of your band, not out of it."
      },
      {
        "id": "pen_rural_lo",
        "lever": "Fan penetration, basic rural",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share of band owning at least one fan",
        "basis": "declared-judgement",
        "defence": "Declare this one as a judgement rather than dressing it up: a connected but poor household in a kutcha house may simply have no ceiling to hang a fan from, so 65% allows for affordability and the physical constraint at the same time.",
        "confidence": "shaky",
        "contestedBy": "A range of 50% to 80% is genuinely arguable and moves the answer by roughly 2 crore in either direction. It is the weakest number on the page — and still not the lever the answer is most sensitive to, which is the lesson."
      },
      {
        "id": "fans_rural_lo",
        "lever": "Fans per owning household, basic rural",
        "value": "1.2",
        "numeric": 1.2,
        "unit": "fans per owning household",
        "basis": "observed-behaviour",
        "defence": "One- and two-room homes with a single wired ceiling point. The same 1.2 as the urban poor, and deliberately so — the binding constraint is identical in both, which is rooms with wiring rather than income.",
        "confidence": "defensible",
        "contestedBy": "Someone may argue rural homes with a verandah hang a second fan there, taking it to 1.5. That is 2.3 crore, and it is a fair point."
      },
      {
        "id": "fans_blend",
        "lever": "Blended fans per owning household, implied across all five bands",
        "value": "≈ 2.0 (1.96 exactly)",
        "numeric": 1.96,
        "unit": "fans per owning household",
        "basis": "declared-judgement",
        "defence": "Not assumed directly — it falls out of the five band figures, and it is the one number to say out loud, because the five are not five independent estimates but a single mental model of how many wired ceiling points an Indian home has.",
        "confidence": "shaky",
        "contestedBy": "This is the lever the sensitivity grid runs on. Anyone who has spent time in homes different from the ones you pictured will move it, and every band moves with it."
      },
      {
        "id": "fan_market_value",
        "lever": "Annual retail value of the Indian ceiling-fan market",
        "value": "≈ ₹10,000 crore",
        "numeric": 100000000000,
        "unit": "₹ per year",
        "basis": "published-benchmark",
        "defence": "Trade estimates place the whole domestic fan market in the ₹10,000-12,000 crore range with ceiling fans the dominant share; ₹10,000 crore is the round, conservative read. Illustrative — used to demonstrate the method, not asserted as verified market data.",
        "confidence": "judgement",
        "contestedBy": "A candidate citing ₹12,000 crore lands the cross-check at 47 crore fans, which would close the gap with the primary route almost exactly. Do not reach for that number because it is convenient — note that the cross-check is sensitive to it and move on."
      },
      {
        "id": "fan_price",
        "lever": "Average realised retail price per ceiling fan",
        "value": "₹2,000",
        "numeric": 2000,
        "unit": "₹ per unit",
        "basis": "published-benchmark",
        "defence": "Branded fans retail from roughly ₹1,800 to ₹3,500 and unorganised local assembly sells well below ₹1,500; ₹2,000 is a fair blend in a market where the unorganised tail is large and rural.",
        "confidence": "judgement",
        "contestedBy": "Quote ₹2,500 because that is what you last paid and units fall to 4 crore a year, dragging the cross-check to 31 crore fans. A price blended from what you personally bought is the most common way this route goes wrong."
      },
      {
        "id": "household_share_sales",
        "lever": "Share of fan units bought by households",
        "value": "75%",
        "numeric": 0.75,
        "unit": "share of annual units",
        "basis": "declared-judgement",
        "defence": "Offices, shops, godowns, schools, workshops and places of worship buy fans too, and they buy in bulk; a quarter of units is the conservative allowance for everything that is not a home.",
        "confidence": "judgement",
        "contestedBy": "Move it to 85% and the cross-check rises to 45 crore, landing on top of the primary route. That agreement would be manufactured, not earned — which is why this figure is set before the comparison, not after it."
      },
      {
        "id": "replacement_share",
        "lever": "Share of household fan sales replacing a dead fan",
        "value": "70%",
        "numeric": 0.7,
        "unit": "share of household units",
        "basis": "structural-logic",
        "defence": "In a category already near-universal, most demand has to be replacement; the remaining 30% is new households forming and new rooms being wired, which is roughly the rate at which Indian households are being added.",
        "confidence": "judgement",
        "contestedBy": "An interviewer who thinks the base is still growing fast will argue 60%, cutting the cross-check to 34 crore. That is the correct instinct in a young category and the wrong one here."
      },
      {
        "id": "fan_life",
        "lever": "Average years a fan stays on its hook",
        "value": "15 years",
        "numeric": 15,
        "unit": "years",
        "basis": "observed-behaviour",
        "defence": "A ceiling fan has one moving part and no consumables; households replace them when the bearing goes or the room is being repainted, not on any schedule. Fifteen years is long by durable-goods standards and still short of what you see hanging in older homes.",
        "confidence": "judgement",
        "contestedBy": "Ten years takes the cross-check to 26 crore and twenty years takes it to 53 crore. This is the cross-check's weakest lever, and it is why the cross-check is a cross-check rather than the primary route."
      }
    ],
    "question": "Right now, how many ceiling fans are hanging in India's homes?",
    "traps": [
      {
        "trap": "Answering with fans sold in a year instead of fans hanging.",
        "whyItHappens": "Market-sizing practice is overwhelmingly annual-flow practice, so the moment a candidate hears 'India' and 'fans' the trained reflex reaches for a sales number. 'Right now' and 'hanging' are the whole question and they go past unheard, because the reflex fires before the prompt finishes.",
        "fix": "Say the time basis aloud before drawing anything: 'This is a stock at a point in time, not an annual flow.' If you cannot state which of the two you are computing, you are not ready to compute either."
      },
      {
        "trap": "Multiplying households by a single national fans-per-household figure.",
        "whyItHappens": "One average is faster and feels like it reaches the same place. It does not: fans per household is set by wired ceiling points, which track room count, which tracks income and housing quality. A single average silently asserts that the poorest household has as many ceiling points as the richest — and because the poorest are the majority of households, that error is large and one-directional.",
        "fix": "Split on the variable the ratio actually depends on. Two urban bands and two rural bands is enough; the point is that the bands genuinely differ, not that there are five of them."
      },
      {
        "trap": "Spending the structure time on penetration and none on fans per household.",
        "whyItHappens": "Penetration is the number candidates have rehearsed and it sits between zero and one, which makes it feel safely bounded — you cannot be wrong by much. Fans per household is unbounded upward, nobody has a rehearsed figure, so it gets assigned in two seconds and never revisited. It is also the only number in the chain the answer scales linearly on across every band at once.",
        "fix": "Give units-per-household the airtime you were about to give penetration, and say what physically sets it: wired ceiling points, not income and not floor area. Then state the blended figure the bands imply and defend that single number."
      },
      {
        "trap": "Skipping the rural electrification gate because electrification is now near-universal.",
        "whyItHappens": "The connection figure is reported at 99%, so the step looks like one that can be dropped without cost. Dropping it is indeed almost harmless here — about 1 crore fans. But the candidate who dropped it did not weigh it, and an interviewer cannot tell the difference between a step you sized and dismissed and a step you never saw.",
        "fix": "Name the gate, apply 95%, and say out loud that it moves the answer by roughly 2%. Showing that you sized a step before deciding it was small is worth more than the step."
      },
      {
        "trap": "Reporting the answer as 46.28 crore.",
        "whyItHappens": "The arithmetic produces 462,780,000 and the candidate reads it out, because reading out what you computed feels like rigour. Every digit after the first two was manufactured by assumptions carrying ±25% error, so the precision is an artefact of the calculator, not a property of the estimate.",
        "fix": "Round to the precision your weakest assumption supports, give a band, and name the lever the band comes from. 'About 46 crore, call it 40 to 55, and it turns almost entirely on fans per home.'"
      },
      {
        "trap": "Averaging the two routes when they disagree.",
        "whyItHappens": "Two numbers and no rule to choose between them feels like a tie, and averaging looks even-handed. It is the opposite: it discards the only information the second route produced, which is the direction and the cause of the gap.",
        "fix": "Ask what each route counts that the other does not, and check whether the difference explains the gap's size and sign. Here it does — dead fans left hanging — so lean towards the higher figure and say why."
      }
    ],
    "teachingPoint": "In a household-ownership stock count the answer scales one-for-one on units per owning household — and that is the assumption candidates give the least thought to. Penetration is bounded between zero and one and, in a near-universal category, already sits near its ceiling in most bands, so it can barely move the answer. Units per household is unbounded, is set by something physical rather than economic — wired ceiling points, not income — and the band-level figures are not independent estimates but one mental model of Indian rooms wearing five hats. Get that model wrong and every band moves the same way at once."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "a-helmet-life",
      "whyThisLever": "Every other input in the chain has something behind it — a published registration figure, a census town count, a fleet-growth identity, a behaviour you can observe at a traffic signal. The replacement cycle has none of that. Nobody publishes how long an Indian helmet lasts in use, the blend spans a certified shell rated for five years and a roadside one that cracks in eighteen months, and the number sits directly under three quarters of the answer. It is the lever an interviewer will push on, and the one you should push on first yourself.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "4-year life",
          "answer": "≈ 4.5 crore a year",
          "deltaVsBase": "−19%"
        },
        {
          "scenario": "Base",
          "leverValue": "3-year life",
          "answer": "≈ 5.5 crore a year",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "2-year life",
          "answer": "≈ 7.7 crore a year",
          "deltaVsBase": "+38%"
        }
      ],
      "breakpoint": "Across the entire plausible range — two years to four — the answer stays inside 4.5 to 7.7 crore, so the order of magnitude never leaves 10^7 and the conclusion does not flip. To drag the answer below 3 crore you would need a blended life of eight years or more, and no helmet in daily Indian use survives eight years of sun, dust and theft. That is worth saying explicitly: the lever you are least sure of turns out not to threaten the finding, only its second digit.",
      "oneLiner": "About 5.5 crore helmets a year. It hangs on a three-year replacement cycle — stretch that to four and it falls to 4.5 crore, pull it to two and it rises to 7.7 crore. The order of magnitude holds either way, and I would want that cycle tested before I would defend the digit."
    },
    "number": "05",
    "difficulty": "Medium",
    "id": "helmets-annual-sales",
    "archetype": "installed-base-replacement",
    "routeChoice": {
      "chosen": "Hybrid",
      "why": "Size the installed base top-down from the two-wheeler parc, then build annual demand bottom-up on top of it as two separate terms — replacement on the helmets already in use, plus first fit for riders new to the road. The hybrid is not a hedge here. The base can only be reached top-down, because nobody counts helmets; the flow can only be reached bottom-up, because replacement and first fit have different drivers and different sizes.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "A clean top-down — population, times riders per head, times helmets per rider, times a replacement rate — puts the entire answer on one undefended ownership figure and drops first-fit demand altogether. In a market still adding roughly 90 lakh two-wheelers to the running fleet every year, the riders arriving for the first time carry about a quarter of annual sales, and they are structurally invisible in any stock-divided-by-life calculation. You would also be counting people when the thing sold is a unit."
    },
    "sanityChecks": [
      "Five and a half crore helmets against 17.5 crore running two-wheelers is roughly one helmet bought per three vehicles a year. Picture thirty two-wheelers waiting at a signal: ten new helmets among them over twelve months. Neither absurdly many nor implausibly few.",
      "Put a price on it. At a blended ₹700 — cheap roadside shells pulling down the ₹2,000 certified ones — the category is worth about ₹3,900 crore at retail. For an accessory that almost every motorised household owns at least one of, a market under ₹5,000 crore feels right: far smaller than tyres, far larger than number plates.",
      "First-fit demand of 1.35 crore must sit below the 2.25 crore of helmets dealers hand over in total, because some of those go to buyers who already rode. It does. If your first-fit figure ever exceeds bundled supply, you have double-counted the showroom.",
      "Per household: 5.5 crore helmets against roughly 31 crore households is one helmet per household every five to six years. In a country where fewer than half of households own a two-wheeler at all, that is the right kind of number — and if it came out at one a year, you would know the model had broken.",
      "Every figure here is illustrative — built to show the method clearly, not asserted as verified market data. What you defend in the room is the structure and the order of magnitude, never the second digit."
    ],
    "answerBand": "4 crore to 7 crore units a year",
    "tree": {
      "root": "Helmets bought in India in a year",
      "rootFormula": "= Replacement demand on helmets already in use + First-fit demand from riders new to the road",
      "value": "≈ 5.5 crore (55 million) units a year",
      "branches": [
        {
          "label": "Replacement demand",
          "formula": "= Helmets in regular use ÷ Effective helmet life",
          "value": "≈ 4.2 crore a year",
          "note": "Three quarters of the answer sits in this branch, and it rests on a product life nobody can observe directly.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Running two-wheeler fleet",
              "formula": "= Registered parc × Share still on the road",
              "value": "≈ 17.5 crore vehicles",
              "note": "Registration is cumulative and dead vehicles are almost never struck off — the register is part fleet, part graveyard."
            },
            {
              "label": "Urban fleet and its helmets",
              "formula": "= 40% of fleet × 1.2 helmets in use per vehicle",
              "value": "≈ 8.4 crore helmets",
              "note": "Rider almost always, pillion about one time in four. Not two helmets a vehicle — look at a signal, not at the rulebook."
            },
            {
              "label": "Rural fleet and its helmets",
              "formula": "= 60% of fleet × 0.4 helmets in use per vehicle",
              "value": "≈ 4.2 crore helmets",
              "note": "The larger fleet carries the smaller helmet base. What differs between town and district road is enforcement, not affordability."
            },
            {
              "label": "Effective helmet life",
              "formula": "= 3 years, blended across certified and roadside units",
              "value": "3 years",
              "note": "The shakiest number in the question, and the one the sensitivity grid is built on."
            }
          ]
        },
        {
          "label": "First-fit demand",
          "formula": "= New two-wheelers going to first-time owners × Helmets supplied per vehicle",
          "value": "≈ 1.35 crore a year",
          "note": "A quarter of the answer, and the part a stock-only method drops without noticing.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "New two-wheelers sold",
              "formula": "≈ 1.5 crore a year",
              "value": "1.5 crore vehicles",
              "note": "A flow. Do not let it drift into the same sentence as the 25 crore parc without saying which is which."
            },
            {
              "label": "Share adding a vehicle rather than replacing one",
              "formula": "= 60% of new sales",
              "value": "≈ 0.9 crore vehicles",
              "note": "Forced by arithmetic, not assumed: the running fleet is still growing about 5% a year, and that growth can only come from buyers who did not own one before."
            },
            {
              "label": "Helmets handed over per new vehicle",
              "formula": "= 1.5",
              "value": "≈ 1.35 crore helmets",
              "note": "The rule asks dealers for two. The realistic average across organised and marginal dealers is lower."
            }
          ]
        },
        {
          "label": "Channel split — the same units, cut a second way",
          "formula": "= Dealership-bundled + Aftermarket",
          "value": "≈ 2.25 crore bundled · ≈ 3.3 crore aftermarket",
          "note": "This branch does not add to the total; it re-partitions it. Bundled helmets going to buyers who already rode displace an aftermarket purchase rather than adding one, which is why the split must reconcile back to 5.5 crore and not exceed it.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Dealership-bundled",
              "formula": "= 1.5 crore vehicles × 1.5 helmets",
              "value": "≈ 2.25 crore",
              "note": "Bundled into the on-road price, so invisible as a helmet purchase to the buyer and highly visible to the helmet brand."
            },
            {
              "label": "Aftermarket",
              "formula": "= Total − Bundled",
              "value": "≈ 3.3 crore",
              "note": "The accessory shop, the roadside stall, the online order. Where the uncertified volume lives."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Retail-throughput cross-check",
      "route": "Bottom-up",
      "premise": "Every helmet sold passes over a counter somewhere. Count the counters and ask what one moves in a month. This route shares no input with the primary one — no parc, no product life, no vehicle sales — so if the two land close, the agreement is evidence rather than an echo of the same anchors. Anchor the outlet count on settlements, not on dealerships per vehicle sold, or the independence quietly disappears.",
      "lines": [
        {
          "id": "t1",
          "label": "Helmet-selling points in urban settlements",
          "expr": "8000 * 15",
          "display": "8,000 towns and cities × 15 selling points each",
          "result": 120000,
          "tolerance": 0,
          "unit": "outlets",
          "carriedForward": "≈ 1.2 lakh",
          "uses": [
            "a-urban-settlements",
            "a-outlets-per-settlement"
          ],
          "soWhat": "Weight by the number of settlements, which is dominated by small towns — not by the metro you happen to live in."
        },
        {
          "id": "t2",
          "label": "Rural and highway selling points",
          "expr": "120000 * 0.5",
          "display": "1.2 lakh urban points × 50% rural uplift",
          "result": 60000,
          "tolerance": 0,
          "unit": "outlets",
          "carriedForward": "≈ 60,000",
          "uses": [
            "a-rural-outlet-uplift"
          ],
          "soWhat": "Thin per location, wide in spread. Leave this block out and you have priced a rural fleet through urban shops."
        },
        {
          "id": "t3",
          "label": "Organised dealerships and branded stores",
          "expr": "8000 * 2.5",
          "display": "8,000 towns × 2.5 organised points each",
          "result": 20000,
          "tolerance": 0,
          "unit": "outlets",
          "carriedForward": "≈ 20,000",
          "uses": [
            "a-urban-settlements",
            "a-organised-points"
          ],
          "soWhat": "Derived from settlements rather than from vehicle sales, deliberately, so this route stays genuinely independent of the primary one."
        },
        {
          "id": "t4",
          "label": "Total helmet-selling points nationally",
          "expr": "120000 + 60000 + 20000",
          "display": "1.2 lakh urban + 60,000 rural + 20,000 organised",
          "result": 200000,
          "tolerance": 0,
          "unit": "outlets",
          "carriedForward": "≈ 2 lakh",
          "uses": [],
          "soWhat": "Two lakh points across 8,000 towns is about 25 per town all in. Hold that against a district market street before moving on."
        },
        {
          "id": "t5",
          "label": "Helmets sold per outlet per year",
          "expr": "25 * 12",
          "display": "25 helmets a month × 12 months",
          "result": 300,
          "tolerance": 0,
          "unit": "helmets per outlet per year",
          "carriedForward": "≈ 300",
          "uses": [
            "a-outlet-throughput",
            "a-months"
          ],
          "soWhat": "About one a day in a shop that mostly sells other things. This is the load-bearing number of the whole cross-check and it deserves to be named as such."
        },
        {
          "id": "t6",
          "label": "Annual helmet sales, retail route",
          "expr": "200000 * 300",
          "display": "2 lakh outlets × 300 helmets a year",
          "result": 60000000,
          "tolerance": 0,
          "unit": "helmets per year",
          "carriedForward": "≈ 6 crore a year",
          "uses": [],
          "soWhat": "Built from counters and throughput, with no parc and no product life anywhere in it."
        }
      ],
      "answer": "≈ 6 crore helmets a year",
      "verdict": "Six crore against the primary route's 5.5 crore — a gap of under a tenth, which is closer than a method like this deserves. Read it as confirmation of the order of magnitude and nothing finer; two routes that agree on the second digit have usually done so by luck. The useful part is the direction of the gap: the retail route runs slightly high, which is what you would expect, because a count of selling points tends to include the mechanic who keeps three helmets on a shelf and sells one a fortnight. Had the two routes differed by a factor of three, the place to look first would be the rural helmet rate in the primary route and the outlets-per-town figure in this one — the two softest numbers on either side."
    },
    "probes": [
      {
        "question": "You assumed a three-year helmet life. Where does that come from?",
        "intent": "Whether the shakiest number in the chain has a defence, or whether it was chosen because it made the arithmetic tidy.",
        "goodAnswer": "Names the two populations inside the blend — a certified helmet rated for about five years and a cheap shell that cracks, fades or is stolen within two — says which dominates by volume and why, then offers the four-year alternative and its effect on the answer before being asked for it.",
        "weakAnswer": "'Three years felt reasonable.' Honest and completely undefended — it concedes the lever without offering any way to test it, and the interviewer now owns the rest of the conversation."
      },
      {
        "question": "Your answer is 5.5 crore. Suppose the real figure is 4 crore. What broke?",
        "intent": "Whether you can run your own model backwards and locate the failure, rather than restating the arithmetic more slowly.",
        "goodAnswer": "Goes straight to the two levers that actually move the answer: takes the live share of the parc down to 60% and the helmet life out to four years, and the model lands at about 4 crore. Neither move is extreme. Then names which of the two it would rather surrender and why.",
        "weakAnswer": "Re-reads the calculation from the top to show it was done correctly. The arithmetic was never in question — the inputs were."
      },
      {
        "question": "Should the helmets a dealer gives away with a new bike count at all?",
        "intent": "Whether you understand that scope decides the answer, and whether you will commit to one reading instead of hedging across both.",
        "goodAnswer": "Says they count as units sold into the market — someone paid, even if it was folded into the on-road price — but that they cannot be added on top of replacement demand for buyers who already owned a helmet. States the reading, then shows the channel split adding back to the total as proof there is no double-count.",
        "weakAnswer": "'It depends on how you define it', offered as a conclusion rather than as the opening half of a sentence that then chooses a definition."
      },
      {
        "question": "Is this market growing or shrinking?",
        "intent": "Whether you can read a rate of change off a stock-and-flow model you have just built, rather than reaching for a growth percentage from memory.",
        "goodAnswer": "Separates the three drivers already sitting inside the model: the running fleet is growing about 5% a year, enforcement is slowly lifting the rural helmet rate off a very low base, and a shift towards certified helmets would lengthen the replacement cycle and cut unit volume while raising value. Notes that the third pulls against the first two, so units and value may not move together.",
        "weakAnswer": "'Growing, because India is growing.' True and useless — it names no mechanism inside the estimate and would have been said without doing the work."
      },
      {
        "question": "Thirty seconds and one phone call to tighten this. Whom do you call, and what do you ask?",
        "intent": "Whether you know which input actually carries the uncertainty, and can tell it apart from the input that is merely the most visible.",
        "goodAnswer": "Calls a large helmet distributor and asks what blended replacement interval their reorder data implies, and what share of volume is uncertified. Explains the choice: the parc is published and lookupable, the replacement cycle is published nowhere and moves the answer by a third.",
        "weakAnswer": "Asks someone for the market size. That returns the answer instead of testing the method, and is the one thing no interviewer will accept in place of your own estimate."
      },
      {
        "question": "Your rural helmet rate is 0.4 and your urban rate is 1.2. Convince me the gap is really three-fold.",
        "intent": "Whether a segmentation was made because the segments genuinely behave differently, or because splitting things in two looks like structure.",
        "goodAnswer": "Grounds the gap in enforcement rather than income — checking is routine at city junctions and rare on district roads — and concedes the direction of error: if enforcement is spreading faster than assumed, 0.4 is too low and the answer is understated. Offers the 0.6 case and its roughly 70 lakh effect.",
        "weakAnswer": "'Rural people are poorer.' It picks the wrong mechanism — a helmet costs less than a tank of petrol — and it cannot be tested by anything the candidate has seen."
      }
    ],
    "finalAnswerNumeric": 55500000,
    "tabLabel": "Helmets, annual sales",
    "finalAnswer": "≈ 5.5 crore (55 million) helmets bought in India in a year — roughly 3.3 crore through the aftermarket and 2.25 crore bundled at dealerships, with replacement carrying about three quarters of the volume",
    "scope": {
      "countingWhat": "New helmets bought for two-wheeler riders and pillions in India over one year — units that leave a shop counter or a dealership floor, whether paid for separately or bundled into the price of a new vehicle.",
      "unit": "helmets purchased per year",
      "timeBasis": "flow (per year)",
      "geography": "India, national — urban and rural fleets counted separately because they behave differently",
      "included": [
        "Aftermarket replacement helmets bought by riders already on the road",
        "Helmets handed over with a new two-wheeler at the dealership",
        "Pillion helmets bought separately from the rider's own",
        "Uncertified roadside helmets — they are the volume, not the exception",
        "Replacements forced by theft, breakage and a cracked visor, not only by age"
      ],
      "excluded": [
        "Bicycle helmets, industrial hard hats and motorsport helmets",
        "Export production — the question asks what India buys, not what India makes",
        "Second-hand resale, which moves a helmet without creating a sale into the market",
        "Helmets sitting unsold in the channel — this counts purchases, not shipments"
      ],
      "boundaryTrap": "Units, not riders. The question sounds demographic, so the reflex is to funnel population down to riders and stop. But one vehicle can generate two purchases in a year — rider and pillion — while a rider who never owns a helmet generates none, and a helmet bought in January and stolen in June generates two. Say in your first sentence that you are counting purchase events, and the rest of the structure follows."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Two-wheelers actually running",
        "expr": "250000000 * 0.7",
        "display": "25 crore registered × 70% still on the road",
        "result": 175000000,
        "tolerance": 0,
        "unit": "vehicles",
        "carriedForward": "≈ 17.5 crore",
        "uses": [
          "a-parc",
          "a-live-share"
        ],
        "soWhat": "Take the haircut before anything else. Computing helmet demand on a cumulative register credits the market with vehicles that have not moved in a decade."
      },
      {
        "id": "c2",
        "label": "Urban running fleet",
        "expr": "175000000 * 0.4",
        "display": "17.5 crore × 40% urban",
        "result": 70000000,
        "tolerance": 0,
        "unit": "vehicles",
        "carriedForward": "≈ 7 crore",
        "uses": [
          "a-urban-fleet-share"
        ],
        "soWhat": "The split has to happen before any behavioural rate is applied, because helmet use is the one thing that differs sharply between the two halves."
      },
      {
        "id": "c3",
        "label": "Rural running fleet",
        "expr": "175000000 * 0.6",
        "display": "17.5 crore × 60% rural",
        "result": 105000000,
        "tolerance": 0,
        "unit": "vehicles",
        "carriedForward": "≈ 10.5 crore",
        "uses": [
          "a-urban-fleet-share"
        ],
        "soWhat": "The bigger half. Any candidate who applies a city helmet rate to this block inflates the answer by roughly half."
      },
      {
        "id": "c4",
        "label": "Helmets in regular use, urban",
        "expr": "70000000 * 1.2",
        "display": "7 crore urban vehicles × 1.2 helmets in use",
        "result": 84000000,
        "tolerance": 0,
        "unit": "helmets",
        "carriedForward": "≈ 8.4 crore",
        "uses": [
          "a-helmets-urban"
        ],
        "soWhat": "Helmets in use, not helmets owned. A helmet in a cupboard does not wear out and does not get replaced."
      },
      {
        "id": "c5",
        "label": "Helmets in regular use, rural",
        "expr": "105000000 * 0.4",
        "display": "10.5 crore rural vehicles × 0.4 helmets in use",
        "result": 42000000,
        "tolerance": 0,
        "unit": "helmets",
        "carriedForward": "≈ 4.2 crore",
        "uses": [
          "a-helmets-rural"
        ],
        "soWhat": "Sixty per cent of the fleet produces a third of the helmet base. That asymmetry is the whole reason for splitting."
      },
      {
        "id": "c6",
        "label": "Installed helmet base",
        "expr": "84000000 + 42000000",
        "display": "8.4 crore urban + 4.2 crore rural",
        "result": 126000000,
        "tolerance": 0,
        "unit": "helmets",
        "carriedForward": "≈ 12.6 crore",
        "uses": [],
        "soWhat": "This is the stock. It is not the answer, and the single most common failure in this question is stopping here and calling it one."
      },
      {
        "id": "c7",
        "label": "Annual replacement demand",
        "expr": "126000000 / 3",
        "display": "12.6 crore helmets ÷ 3-year effective life",
        "result": 42000000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 4.2 crore a year",
        "uses": [
          "a-helmet-life"
        ],
        "soWhat": "Stock becomes flow here, and the divisor is the least defensible number in the chain. Flag it as you write it, not when challenged."
      },
      {
        "id": "c8",
        "label": "New two-wheelers going to first-time owners",
        "expr": "15000000 * 0.6",
        "display": "1.5 crore new vehicles × 60% adding rather than replacing",
        "result": 9000000,
        "tolerance": 0,
        "unit": "vehicles per year",
        "carriedForward": "≈ 90 lakh",
        "uses": [
          "a-new-sales",
          "a-new-rider-share"
        ],
        "soWhat": "Cross-check it against the fleet: 90 lakh on 17.5 crore is about 5% growth a year, which is what a still-motorising market looks like."
      },
      {
        "id": "c9",
        "label": "First-fit helmet demand",
        "expr": "9000000 * 1.5",
        "display": "90 lakh first-time riders × 1.5 helmets supplied",
        "result": 13500000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 1.35 crore a year",
        "uses": [
          "a-bundle-rate"
        ],
        "soWhat": "These are net additions to the installed base, so they cannot overlap with replacement demand. That is what makes them safe to add."
      },
      {
        "id": "c10",
        "label": "Total helmets bought in a year",
        "expr": "42000000 + 13500000",
        "display": "4.2 crore replacement + 1.35 crore first fit",
        "result": 55500000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 5.5 crore a year",
        "uses": [],
        "soWhat": "Replacement carries roughly three quarters, first fit one quarter. Say the split, because it is the finding — the single number is not."
      },
      {
        "id": "c11",
        "label": "Units moving through dealerships",
        "expr": "15000000 * 1.5",
        "display": "1.5 crore new vehicles × 1.5 helmets bundled",
        "result": 22500000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 2.25 crore a year",
        "uses": [
          "a-new-sales",
          "a-bundle-rate"
        ],
        "soWhat": "Every new vehicle carries a bundled helmet, not only those going to first-time riders — which is precisely where the double-count enters if you are not careful."
      },
      {
        "id": "c12",
        "label": "Units moving through the aftermarket",
        "expr": "55500000 - 22500000",
        "display": "5.55 crore total − 2.25 crore bundled",
        "result": 33000000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 3.3 crore a year",
        "uses": [
          "a-bundle-substitution"
        ],
        "soWhat": "Bundled units going to buyers who already rode are met out of the same replacement pool, so the aftermarket is the residual rather than a second addition."
      },
      {
        "id": "c13",
        "label": "Reconciliation — the two channels must add back",
        "expr": "22500000 + 33000000",
        "display": "2.25 crore bundled + 3.3 crore aftermarket",
        "result": 55500000,
        "tolerance": 0,
        "unit": "helmets per year",
        "carriedForward": "≈ 5.5 crore a year",
        "uses": [],
        "soWhat": "If your channel split does not add back to your total, you have counted the dealership bundle twice. Run this line out loud — it costs five seconds and it is the error an interviewer is watching for."
      }
    ],
    "orderOfMagnitude": "10^7",
    "assumptions": [
      {
        "id": "a-parc",
        "lever": "Registered two-wheeler parc in India",
        "value": "25 crore (250 Mn)",
        "numeric": 250000000,
        "unit": "vehicles",
        "basis": "published-benchmark",
        "defence": "India has registered 1.5 to 1.8 crore two-wheelers a year for over a decade, and the register is cumulative — 25 crore is the round figure transport-ministry data supports and the one to say aloud.",
        "confidence": "anchor",
        "contestedBy": "An interviewer who prefers 20 crore takes the installed base down by a fifth and the answer to about 4.7 crore — first-fit demand is untouched, which is why the total falls by 15% and not 20%."
      },
      {
        "id": "a-live-share",
        "lever": "Share of registered two-wheelers still actually running",
        "value": "70%",
        "numeric": 0.7,
        "unit": "share",
        "basis": "structural-logic",
        "defence": "Vehicles are almost never deregistered when they die, so the register always overstates the fleet; against an effective life near fifteen years on a fleet that has roughly doubled in a decade, about seven in ten of the registered units can still be on the road.",
        "confidence": "defensible",
        "contestedBy": "60% is a fair challenge given informal scrappage and it takes the answer to roughly 5 crore."
      },
      {
        "id": "a-urban-fleet-share",
        "lever": "Urban share of the running two-wheeler fleet",
        "value": "40%",
        "numeric": 0.4,
        "unit": "share",
        "basis": "structural-logic",
        "defence": "India is about 35% urban, and two-wheeler ownership per household runs higher in towns, but rural India is not a small two-wheeler market — it is where the vehicle is the only motorised option — so a modest tilt above the population share, not a reversal of it.",
        "confidence": "defensible",
        "contestedBy": "50/50 is arguable and raises the answer by roughly 8%, or about half a crore units, because it moves fleet from a low-helmet segment to a high one."
      },
      {
        "id": "a-helmets-urban",
        "lever": "Helmets in regular use per urban two-wheeler",
        "value": "1.2",
        "numeric": 1.2,
        "unit": "helmets per vehicle",
        "basis": "observed-behaviour",
        "defence": "Stand at a city signal and count: nearly every rider is wearing one, perhaps one pillion in four is — that is about 1.2 helmets a vehicle in actual use, which is what wears out, rather than the two the rule asks for.",
        "confidence": "defensible",
        "contestedBy": "1.5 if you believe pillion compliance has genuinely moved; adds roughly 70 lakh helmets a year."
      },
      {
        "id": "a-helmets-rural",
        "lever": "Helmets in regular use per rural two-wheeler",
        "value": "0.4",
        "numeric": 0.4,
        "unit": "helmets per vehicle",
        "basis": "observed-behaviour",
        "defence": "On a district road helmet use is the exception rather than the rule, and two riders in five owning one they actually use is a generous reading rather than a harsh one.",
        "confidence": "judgement",
        "contestedBy": "0.6 if you think enforcement has reached the blocks; that adds about 70 lakh helmets a year."
      },
      {
        "id": "a-helmet-life",
        "lever": "Effective replacement cycle for a helmet in use",
        "value": "3 years",
        "numeric": 3,
        "unit": "years",
        "basis": "declared-judgement",
        "defence": "A certified helmet is rated for about five years, but the cheap shell that carries most of this market's volume cracks, fades, loses its strap or is stolen well before that — three years is the blend across both, and it is openly a judgement.",
        "confidence": "shaky",
        "contestedBy": "Four years is defensible for a certified-only reading of the market and cuts replacement demand by a quarter."
      },
      {
        "id": "a-new-sales",
        "lever": "New two-wheelers sold domestically per year",
        "value": "1.5 crore (15 Mn)",
        "numeric": 15000000,
        "unit": "vehicles per year",
        "basis": "published-benchmark",
        "defence": "Domestic two-wheeler sales have run in the 1.5 to 1.8 crore range for years; 1.5 crore is the conservative round number and it is a flow figure, not to be confused with the parc.",
        "confidence": "anchor",
        "contestedBy": "1.8 crore lifts first-fit demand to about 1.6 crore and the total to roughly 5.8 crore."
      },
      {
        "id": "a-new-rider-share",
        "lever": "Share of new two-wheeler buyers adding a vehicle rather than replacing one",
        "value": "60%",
        "numeric": 0.6,
        "unit": "share",
        "basis": "structural-logic",
        "defence": "The running fleet is still growing at roughly 5% a year — about 90 lakh vehicles — and that net addition can only come from buyers who did not previously own one, which forces the split rather than leaving it to taste.",
        "confidence": "defensible",
        "contestedBy": "A maturing market argues for 50%, trimming first-fit demand by about 22 lakh units."
      },
      {
        "id": "a-bundle-rate",
        "lever": "Helmets supplied with a new two-wheeler at the dealership",
        "value": "1.5",
        "numeric": 1.5,
        "unit": "helmets per vehicle",
        "basis": "published-benchmark",
        "defence": "Indian rules require a dealer to supply certified helmets with a new two-wheeler; organised dealerships comply, smaller ones supply one or let the buyer decline, so 1.5 is the realistic average rather than the rule's figure.",
        "confidence": "judgement",
        "contestedBy": "Full compliance at 2.0 raises bundled volume to 3 crore and the total to about 6 crore. Check the current rule before quoting it as a number in the room."
      },
      {
        "id": "a-bundle-substitution",
        "lever": "Whether a bundled helmet displaces an aftermarket purchase",
        "value": "Full displacement for buyers who already rode",
        "numeric": 1,
        "unit": "share displaced",
        "basis": "declared-judgement",
        "defence": "A rider handed a new helmet at the showroom does not walk into an accessory shop the same year, so bundled units going to replacement-vehicle buyers substitute for aftermarket demand instead of adding to it — a simplification that slightly understates the total, and worth saying so.",
        "confidence": "judgement",
        "contestedBy": "Assume no displacement and you add about 90 lakh units, which is exactly the double-count this assumption exists to prevent."
      },
      {
        "id": "a-urban-settlements",
        "lever": "Urban settlements in India with a market street",
        "value": "8,000",
        "numeric": 8000,
        "unit": "towns and cities",
        "basis": "census-anchor",
        "defence": "The census counts roughly 4,000 statutory towns and a similar number of census towns, so 8,000 is the working figure for places that carry a retail market of any kind.",
        "confidence": "anchor",
        "contestedBy": "Count only statutory towns and the outlet base halves, dropping the cross-check to about 3 crore."
      },
      {
        "id": "a-outlets-per-settlement",
        "lever": "Helmet-selling retail points per urban settlement",
        "value": "15",
        "numeric": 15,
        "unit": "outlets per town",
        "basis": "observed-behaviour",
        "defence": "A metro carries several hundred accessory shops, a district town perhaps a dozen, a small municipality three or four — and because the count of settlements is dominated by small ones, the weighted average sits near 15, not near the metro figure.",
        "confidence": "judgement",
        "contestedBy": "25 is arguable if you count every mechanic who keeps a rack; it would push the cross-check above 9 crore and break the agreement with the primary route."
      },
      {
        "id": "a-rural-outlet-uplift",
        "lever": "Rural and highway selling points as a share of urban ones",
        "value": "50%",
        "numeric": 0.5,
        "unit": "share",
        "basis": "declared-judgement",
        "defence": "Rural helmet retail is thin per location but spread across highway stalls and block-town markets; half the urban outlet count is a deliberately restrained figure for a fleet that is 60% rural.",
        "confidence": "judgement",
        "contestedBy": "Parity with urban outlets adds 60,000 points and about 1.8 crore units to the cross-check."
      },
      {
        "id": "a-organised-points",
        "lever": "Organised dealerships and branded helmet stores per urban settlement",
        "value": "2.5",
        "numeric": 2.5,
        "unit": "outlets per town",
        "basis": "structural-logic",
        "defence": "Across every two-wheeler make and helmet brand the organised network runs to roughly 20,000 points nationally, which spread over 8,000 towns is about two and a half each — anchored on settlements, deliberately, so this route stays independent of the vehicle-sales figure.",
        "confidence": "judgement"
      },
      {
        "id": "a-outlet-throughput",
        "lever": "Helmets sold per outlet per month",
        "value": "25",
        "numeric": 25,
        "unit": "helmets per outlet per month",
        "basis": "declared-judgement",
        "defence": "Roughly one helmet a day in a shop that also sells mirrors, seat covers and oil — a highway dealership does four times that and a village stall a fifth, and 25 is the blend across a base dominated by the small ones.",
        "confidence": "shaky",
        "contestedBy": "This is the load-bearing number of the cross-check; at 20 a month the route lands on 4.8 crore, which still agrees on order of magnitude."
      },
      {
        "id": "a-months",
        "lever": "Months in a year",
        "value": "12",
        "numeric": 12,
        "unit": "months",
        "basis": "physical-constant",
        "defence": "Not in dispute — listed so every number in the chain has a stated origin.",
        "confidence": "anchor"
      }
    ],
    "question": "How many two-wheeler helmets does India buy in a year?",
    "traps": [
      {
        "trap": "Counting the parc, dividing by a life, and calling that the market.",
        "whyItHappens": "The parc is the number a candidate can remember, and stock-divided-by-life feels like a complete method because it produces a flow from a stock. It is half the method. In a market still adding about 90 lakh vehicles to the running fleet each year, riders arriving for the first time carry roughly a quarter of annual demand, and they are structurally invisible to a calculation that only looks at what is already out there.",
        "fix": "Write the root as two terms before you compute anything — replacement on the existing base, plus first fit for new riders — and say both out loud. The interviewer is listening for the second term."
      },
      {
        "trap": "Treating registered vehicles as running vehicles.",
        "whyItHappens": "Registration data is cumulative and vehicles are almost never struck off when they stop running, so the register is a graveyard as much as a fleet. The 25 crore figure is easy to recall and carries no visible warning, so candidates compute on all of it and inflate the base by nearly half.",
        "fix": "Apply a live-share haircut and defend it from vehicle life rather than from taste: a fleet with an effective life near fifteen years that has roughly doubled in a decade cannot be much more than 70% alive."
      },
      {
        "trap": "Counting riders instead of units.",
        "whyItHappens": "The question sounds demographic, so the reflex is a population funnel down to riders and a stop there. But the thing sold is a unit — one vehicle can generate two purchases in a year through rider and pillion, a rider who never buys generates none, and a stolen helmet generates a second purchase from the same person.",
        "fix": "Fix the unit in the first sentence of your scope: helmets purchased, not people wearing them. Every later choice follows from that one."
      },
      {
        "trap": "Double-counting the dealership bundle.",
        "whyItHappens": "Compute replacement on the full installed base, then add every helmet a dealer hands over, and you have counted the same replacement twice for the four in ten new-vehicle buyers who already owned one. The error is invisible because both blocks are individually correct — it is only the addition that is wrong.",
        "fix": "Decide explicitly whether a bundled helmet adds demand or displaces an aftermarket purchase, then make your channel split add back to your total. If bundled plus aftermarket does not equal your headline, you have found the double-count."
      },
      {
        "trap": "Projecting urban helmet behaviour onto the whole country.",
        "whyItHappens": "The candidate's own evidence is a city signal where nearly every rider has one on. That single honest observation gets applied to a fleet that is 60% rural, where enforcement is thin and helmet use is the exception — and the answer comes out roughly half again too high.",
        "fix": "Split the fleet before applying any behavioural rate, and say plainly which half you have actually observed and which half you are inferring."
      },
      {
        "trap": "Blending helmet prices to get a value answer without saying what went into the blend.",
        "whyItHappens": "Once a unit answer exists, converting to rupees looks like a free extra. But this category spans a ₹400 roadside shell and a ₹4,000 certified one, and a blended price is the most abusable number in the chain — move it from ₹700 to ₹1,200 and the market grows by 70% with no change to a single physical assumption.",
        "fix": "If you go to value, state the mix that produced the blend — what share is uncertified — and offer the value as a band rather than a figure."
      }
    ],
    "teachingPoint": "A stock is not a flow. Annual sales of a durable good come from two populations that behave nothing alike — the base already out there cycling through replacement, and the riders arriving on the road for the first time. Divide a parc by a product life and you have answered half the question, confidently."
  },
  {
    "timeboxMinutes": 15,
    "sensitivity": {
      "assumptionId": "a_peak_rate",
      "whyThisLever": "It is the rate of the binding resource, so it is the only assumption that moves the answer proportionally — everything else in the chain is a conversion factor applied after the ceiling is already set. Scale it and the shoulder scales with it, because a runway whose geometry limits it to 36 an hour at peak cannot manage 30 in the shoulder either; the same taxiway layout, exit spacing and fleet mix govern both. That gives it more leverage than any other row in the table. The mix, the seat counts and the load factors each move the answer by a tenth at most; this one moves it by nearly a fifth, and it is the number an experienced interviewer will push on first because it is the only one that is genuinely about airports rather than about arithmetic.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "36 at peak, 24 in the shoulder — limited rapid-exit taxiways, mixed light and heavy traffic",
          "answer": "≈ 51,000 departing passengers",
          "deltaVsBase": "−18%"
        },
        {
          "scenario": "Base",
          "leverValue": "45 at peak, 30 in the shoulder",
          "answer": "≈ 63,000 departing passengers",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "54 at peak, 36 in the shoulder — full rapid-exit taxiways, segregated flows, homogeneous jet fleet",
          "answer": "≈ 74,000 departing passengers",
          "deltaVsBase": "+18%"
        }
      ],
      "breakpoint": "The answer leaves the 50,000 to 75,000 band only below about 35 movements an hour or above about 55. Below 35 you are describing a runway without rapid-exit taxiways, where every landing aircraft rolls to the end before vacating — a real condition, but a different airport from the one in the prompt. Above 55 you are describing either two runways or a segregated-mode operation, which is also a different airport. The interesting breakpoint is elsewhere, though, and it is the one to volunteer: the recommendation flips when the runway ceiling passes the stand ceiling of 420 departures, which happens at about 49 movements an hour at peak. Push past that and the binding constraint changes from concrete to apron, the answer stops rising, and every rupee of runway investment beyond it is wasted until stands are added. Notice what that means — a 9% improvement in runway rate delivers 9% more passengers, and a 30% improvement delivers 8%.",
      "oneLiner": "Call it 63,000 departing passengers, and it hangs almost entirely on 45 movements an hour on the runway — 36 takes it to 51,000, 54 takes it to 74,000, and nothing else I have assumed moves it by more than a tenth."
    },
    "number": "06",
    "difficulty": "Hard",
    "id": "airport-runway-throughput",
    "archetype": "capacity-bottleneck",
    "routeChoice": {
      "chosen": "Bottom-up",
      "why": "The question asks what the airport can do, not what it does. That is a supply question, and supply is a chain of physical rates: how often an aircraft can use the runway, how much of the day that rate holds, what fraction of movements are departures, how many seats leave on each and how full they are. Every link is either a physical constant or a benchmark you could defend, and the chain has the property that matters here — it names the resource. A route that never names a resource cannot answer the second half of the question.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "The top-down route is national air passenger traffic divided across the major airports, or this airport's annual throughput divided by 365. It is faster and it is the wrong quantity. Observed traffic is demand realised; the question asked for supply available, and the two differ by every hour the runway sat idle because nobody wanted to fly at two in the afternoon. Worse, a top-down number cannot be interrogated: when the interviewer asks what would raise it, you have nothing to point at, because you never decomposed the airport into resources. Use the observed annual figure where it belongs — as the back-check at the end, not as the answer."
    },
    "sanityChecks": [
      "The cadence test, and the one to run first: 780 movements over 24 hours is one every 110 seconds averaged across the day, and one every 80 seconds through the peak. Stand at the fence of a busy single-runway airport and that is exactly what you see — a continuous stream with no idle gaps in the morning bank. If your movement figure implied one every four minutes, you have described a quiet regional field; one every 40 seconds and you have described something no single runway has ever sustained.",
      "Per departure: 62,556 across 390 departures is 160 passengers on the average flight. That is an A320 at about 89%, blended with the occasional wide-body and the occasional turboprop. Hold it against the last flight you took. Two hundred and fifty would mean a long-haul hub, ninety would mean a regional network, and either would tell you the fleet mix was wrong long before anyone challenged the total.",
      "The annual back-check, which is where the rejected top-down route earns its keep: 62,556 departing plus a near-equal number arriving is about 1.25 lakh passengers through the airport on a busy day. Derate to roughly 85% for an ordinary day across the year and multiply by 365 — about 3.9 crore (39 million) passengers a year. The busiest single-runway airports in the world run in the 40 to 50 million range, so this sits just under them. Right order, right side. Had the arithmetic implied 10 crore, the peak rate would have been the place to look.",
      "The terminal consistency test: the peak hour holds 22.5 departures at 160 passengers each, so about 3,600 people need screening in that hour. At 160 per lane per hour that is 23 lanes, against the 28 assumed. The terminal is sized about 20% above the runway's peak demand — which is precisely how terminals are actually designed, and finding that your two independently-assumed figures agree is a stronger check than either number alone.",
      "The doubling test: if your answer is close to what the airport publishes as passengers handled, you have answered the wrong question. Their figure counts both directions and counts a transferring passenger twice; yours counts one boarding each. Expect to be a little under half of theirs, and be suspicious if you are not.",
      "The slack test: name what you did not spend the answer on. Check-in desks, immigration counters, the car park and the baggage system all have more headroom than the runway, and none of them appears in the arithmetic. If every resource in your model turned out to be binding simultaneously, you have not estimated an airport — you have assumed the answer."
    ],
    "answerBand": "50,000 – 75,000 departing passengers per day",
    "tree": {
      "root": "Departing passengers on a busy day at a single-runway airport",
      "rootFormula": "= Runway movements per day × departure share × seats per departure × load factor, subject to no other resource binding first",
      "value": "≈ 63,000 departing passengers",
      "branches": [
        {
          "label": "Runway movements per day — the binding resource",
          "formula": "= (Peak hours × peak rate) + (Shoulder hours × shoulder rate) + (Night hours × night rate)",
          "value": "780 movements",
          "note": "The whole answer lives here. Everything downstream is a conversion factor; this is the only line that is a capacity. Split the day into three shapes — a flat 24 hours at the peak rate overstates it by nearly 40%.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Peak — 10 hours",
              "formula": "10 hours × 45 movements per hour",
              "value": "450 movements — 58% of the day",
              "note": "Two banks, morning and evening. Forty-five an hour is one movement every 80 seconds, which is what separation minima and a single runway worked in mixed mode allow before you leave anything for a go-around."
            },
            {
              "label": "Shoulder — 9 hours",
              "formula": "9 hours × 30 movements per hour",
              "value": "270 movements",
              "note": "Midday and late evening. The runway could take 45 here too; nobody wants to fly at two in the afternoon. This is the one stretch of the day that is demand-shaped rather than physics-shaped, and it is where a second runway would first show up as waste."
            },
            {
              "label": "Night — 5 hours",
              "formula": "5 hours × 12 movements per hour",
              "value": "60 movements",
              "note": "Midnight to five, carrying the long-haul departure bank and the freighters. Thin, but not zero — an Indian metro airport without a curfew genuinely works these hours, and a candidate who zeroes them loses 8% of the answer for no reason."
            }
          ]
        },
        {
          "label": "Departure share of movements",
          "formula": "780 movements ÷ 2",
          "value": "390 departures",
          "note": "Forced, not assumed. Over a full day every aircraft that departs has arrived, so arrivals equal departures to within the handful parked overnight. Halving is the single step candidates most often skip, and skipping it doubles the answer.",
          "isCriticalPath": true
        },
        {
          "label": "Seats offered per departure",
          "formula": "= (Domestic departures × domestic seats) + (International departures × international seats)",
          "value": "74,880 seats — a blend of 192 per departure",
          "note": "Two fleets, not one average. A single blended seat count gets to a similar total by cancelling errors and then cannot answer the obvious follow-up about the international mix.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Domestic — 80% of departures",
              "formula": "312 departures × 170 seats",
              "value": "53,040 seats",
              "note": "The A320 family at 180 to 186 seats does most of the flying; regional turboprops at around 70 pull the blend down to roughly 170."
            },
            {
              "label": "International — 20% of departures",
              "formula": "78 departures × 280 seats",
              "value": "21,840 seats",
              "note": "A fifth of the departures carrying 29% of the seats. Gulf and South-East Asia fly narrow-bodies; Europe and North America fly wide-bodies at 300 to 400. Two hundred and eighty is the blend."
            }
          ]
        },
        {
          "label": "Load factor",
          "formula": "= (53,040 × 85%) + (21,840 × 80%)",
          "value": "62,556 passengers",
          "note": "The gap between a seat and a passenger. Indian domestic load factors sit in the mid-80s on a busy day; international runs a few points lower because of one-way seasonal flows.",
          "isCriticalPath": true
        },
        {
          "label": "Resources that do not bind — the slack",
          "formula": "= Priced in the same unit, then set aside",
          "value": "Stands 420 departures · security 80,640 passengers",
          "note": "Named, sized and rejected. That sentence is the answer to the second half of the question, and it is worth more than the 63,000.",
          "children": [
            {
              "label": "Aircraft stands",
              "formula": "70 stands × 6 turnarounds",
              "value": "420 departures — 8% of headroom",
              "note": "The next-tightest resource, and close enough that it becomes the constraint the moment the runway is relieved. This is what makes a second runway cost more than a second runway."
            },
            {
              "label": "Departure security screening",
              "formula": "28 lanes × 160 passengers per hour × 18 hours",
              "value": "80,640 passengers — 29% of headroom",
              "note": "Feels binding because it is the queue you have stood in. It is not. A terminal is designed with margin against a runway that cannot move."
            },
            {
              "label": "Check-in desks, immigration, car park, apron roads",
              "value": "Not priced",
              "note": "Say why you are not pricing them: each is cheap and quick to add, so none of them stays the constraint for long even if it briefly is. Spend your fifteen minutes on the resource that takes a decade to build."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Constraint audit — price the other candidates and take the smallest",
      "route": "Bottom-up",
      "premise": "The first route assumed the runway binds. That is the claim the question is really testing, so do not leave it as an assumption — price the next two candidate constraints in the same unit and see which number is smallest. This is not a second estimate of the same quantity; it is a different quantity that happens to share a ceiling, and it is the only honest way to answer 'what is the binding constraint'. If a stand or a security lane came out lower than the runway, the primary answer would be wrong and the recommendation would change completely.",
      "lines": [
        {
          "id": "t1",
          "label": "Passengers per departure implied by the primary route",
          "expr": "62556 / 390",
          "display": "62,556 passengers ÷ 390 departures",
          "result": 160.4,
          "tolerance": 0.0001,
          "unit": "passengers per departure",
          "carriedForward": "≈ 160 passengers per departure",
          "uses": [],
          "soWhat": "Convert the seat-and-load-factor chain into one number so each candidate constraint can be priced in passengers without rebuilding the fleet mix three times. One hundred and sixty is a three-quarters-full A320 with the occasional wide-body — picture it, and if you cannot, the fleet assumptions need revisiting before you go on."
        },
        {
          "id": "t2",
          "label": "Departures the stands would allow",
          "expr": "70 * 6",
          "display": "70 stands × 6 usable turnarounds per day",
          "result": 420,
          "unit": "departures per day",
          "uses": [
            "a_stands",
            "a_stand_turns"
          ],
          "soWhat": "Four hundred and twenty against the runway's 390. The stands are the next-tightest resource and they are close — which is the reason a second runway on its own does not double an airport."
        },
        {
          "id": "t3",
          "label": "Passengers the stands would allow",
          "expr": "420 * 160.4",
          "display": "420 departures × 160 passengers per departure",
          "result": 67368,
          "tolerance": 0.0001,
          "unit": "departing passengers per day",
          "carriedForward": "≈ 67,000 passengers",
          "uses": [],
          "soWhat": "Higher than 63,000, so the stands do not bind — today. Say 'today', because the margin is a single-digit percentage and one busier season closes it."
        },
        {
          "id": "t4",
          "label": "Passengers departure security screening would allow",
          "expr": "28 * 160 * 18",
          "display": "28 lanes × 160 passengers per hour × 18 effective hours",
          "result": 80640,
          "unit": "departing passengers per day",
          "carriedForward": "≈ 81,000 passengers",
          "uses": [
            "a_sec_lanes",
            "a_lane_rate",
            "a_terminal_hours"
          ],
          "soWhat": "Twenty-nine per cent above the runway ceiling. The queue you have personally stood in is not the constraint — it is a peak-hour queue inside a resource with a quarter of a day's headroom, which is a scheduling problem, not a capacity one."
        },
        {
          "id": "t5",
          "label": "Headroom in the next-tightest resource",
          "expr": "(67368 - 62556) / 62556",
          "display": "(67,368 stand-limited − 62,556 runway-limited) ÷ 62,556",
          "result": 0.07692307692307693,
          "tolerance": 1e-06,
          "unit": "share above the binding ceiling",
          "carriedForward": "≈ 8%",
          "uses": [],
          "soWhat": "This is the number that turns an estimate into a recommendation. Eight per cent of slack means relieving the runway buys you 8% before the stands take over, so anyone proposing a runway project must fund an apron project in the same breath or spend a great deal of money for very little."
        }
      ],
      "answer": "Runway 62,556 · stands 67,368 · security 80,640 — the runway binds at ≈ 63,000 departing passengers a day",
      "verdict": "The three numbers rank cleanly, so the conclusion is not close and you can say so without hedging: the runway binds, and it binds by a margin comfortably larger than the error in any single assumption. What deserves the hedge is the gap, not the ranking. Eight per cent of headroom in the stands is inside the noise of my own turnaround assumption — argue 8 turns instead of 6 and the stand ceiling jumps to 560 departures, while the headline answer does not move at all, because the runway still binds. That asymmetry is the point of the whole exercise. A non-binding constraint can be badly estimated and cost you nothing; the binding one is the only number that has to be right. Had the security line come out at 55,000 instead of 80,640, the answer would have been 55,000 and the recommendation would have been to open lanes rather than to build concrete — so run the audit even when you are confident, because it is cheap and the alternative is confidently sizing the wrong resource."
    },
    "probes": [
      {
        "question": "What is actually stopping this airport doing more?",
        "intent": "The whole question in one line. It tests whether you identified a resource and a rate, or only produced a number. A candidate who multiplied their way to 63,000 without ever asking what binds cannot answer this, because the arithmetic never told them.",
        "goodAnswer": "The runway, specifically the separation minimum between successive movements — about 80 seconds, which caps it near 45 an hour and 780 a day. The next-tightest resource is the apron: 70 stands at six usable turnarounds is 420 departures against the runway's 390, so 8% of headroom. Security screening has 29%. Which means the runway binds, but only just ahead of the stands — and that ordering is what I would build a recommendation on, not the 63,000.",
        "weakAnswer": "'The terminal gets very congested' — which reports a peak-hour queue as though it were a daily capacity limit, and names the one resource in the airport that has a quarter of a day's spare throughput."
      },
      {
        "question": "The airport authority has ₹4,000 crore to spend. Where does it go?",
        "intent": "Whether the estimate converts into a decision. This is the only reason anyone sizes capacity in practice, and it is where a candidate who understood the constraint logic separates sharply from one who ran the arithmetic correctly.",
        "goodAnswer": "Not on a terminal, and I would say that first because it is where the money usually goes. Terminal screening runs 29% above the runway ceiling, so an extra hall adds zero passengers. Spend it on the runway's rate — rapid-exit taxiways, a full-length parallel taxiway, better approach aids so the rate holds in monsoon visibility. That lifts 45 an hour towards the low 50s and is worth roughly 15%. But I would ring-fence part of it for apron: the stands are only 8% above the runway and they become binding at about 49 movements an hour, so a runway project without an apron project buys about half of what it promises.",
        "weakAnswer": "'Build a new terminal, since passenger experience is poor' — which solves a queueing problem with a capacity budget, and adds nothing to the number that was asked about."
      },
      {
        "question": "Suppose they build a second runway 400 metres from the first. Does the answer double?",
        "intent": "Whether you know that relieving a constraint moves it rather than removes it — the single most transferable idea in the question, and the one that transfers directly into every operations and capital-allocation case you will see later.",
        "goodAnswer": "No, on two counts. Parallel runways closer than about a kilometre cannot be worked independently in poor visibility, so in monsoon conditions you have one runway with a spare, not two runways — the wet-weather answer barely moves. And even in clear weather the ceiling stops being the runway almost immediately: the stands cap departures at 420, which is 8% above where I am now. So the realistic gain is 8% until the apron is expanded, and then the next thing binds after that. The honest answer is that capacity moves to the next constraint, and the project only makes sense as a programme that funds all of them together.",
        "weakAnswer": "'Yes, roughly double, since you have twice the runway' — which treats the runway as the only resource in the airport and assumes a constraint can be removed rather than relocated."
      },
      {
        "question": "Which of your numbers is doing the most work?",
        "intent": "Whether you know where your own answer comes from. Candidates working from a template cannot answer this, because a template tells you what to compute and never which input carries the result.",
        "goodAnswer": "The peak movement rate, because it is the rate of the binding resource — everything after it is a conversion factor. Thirty-six an hour takes the answer to 51,000 and 54 takes it to 74,000, roughly ±18%. Nothing else moves it by more than a tenth: the international mix is worth about 5%, the domestic seat blend about 12%. And the stand assumptions move it by nothing at all while the runway binds, which is worth stating, because it tells you which of my numbers you should not bother challenging.",
        "weakAnswer": "Naming the load factor or the number of stands — the first is the best-anchored figure in the table, and the second currently has no effect on the answer whatsoever."
      },
      {
        "question": "The airport publishes 1.4 lakh passengers a day. You said 63,000. Are you wrong?",
        "intent": "Whether an external figure makes you abandon your method or interrogate your boundary. This is the probe that separates a candidate who owns the model from one who was reciting it.",
        "goodAnswer": "Probably not wrong, probably answering a different question, and the boundary is where I would look before I moved a single assumption. Their figure is passengers handled — arrivals plus departures, with a transferring passenger appearing in both halves. Double mine and you get 1.25 lakh, which is within 12% of theirs, and transfer double-counting plus a genuinely exceptional peak day closes most of the rest. If they told me it was strictly departures, then I would revise the peak rate upward and say which number I moved.",
        "weakAnswer": "'Then I will use 1.4 lakh' — which discards a worked method for an unexamined figure, and misses that the gap is almost exactly the factor of two the boundary predicts."
      },
      {
        "question": "How would you check this properly in a week?",
        "intent": "Whether you can turn an estimate into a measurement plan, and whether you know which of your inputs is worth measuring. An estimate is only what you do before the data arrives.",
        "goodAnswer": "Two sources, ranked. First the declared capacity in the slot coordination file — airports publish a movements-per-hour figure by season, and that replaces my shakiest assumption with a regulated one in an afternoon. Then count the published departure schedule for a Friday and sum the seat counts by aircraft type, which replaces the mix and the seat blend together and leaves only the load factor assumed. That order matters: I would measure the binding resource first and not spend a day counting stands, because the stand figure cannot change my answer while the runway binds.",
        "weakAnswer": "'Ask the airport for their traffic data' — which returns demand rather than capacity, and answers the question I explicitly set aside at the start."
      }
    ],
    "finalAnswerNumeric": 63000,
    "tabLabel": "Runway capacity, departures",
    "finalAnswer": "≈ 63,000 departing passengers on a busy day — call it 50,000 to 75,000 — and the runway is what stops it going higher, not the terminal. The stands would allow about 8% more and security screening about 29% more, so a rupee spent on either buys nothing until the runway moves.",
    "scope": {
      "countingWhat": "Passengers who physically board a departing scheduled commercial aircraft at this airport during one busy day, when the runway is worked to the limit of its declared capacity for the whole of the day.",
      "unit": "departing passengers per day",
      "timeBasis": "flow (per day)",
      "geography": "One illustrative Indian metro airport with a single operational runway, a mixed domestic and international schedule and no night curfew. The airport is illustrative — built to show the method clearly, not drawn from any named airport or any published traffic figure.",
      "included": [
        "Scheduled commercial departures, domestic and international, across the full 24-hour day",
        "The 01:00 to 04:00 international bank, which is a real part of an Indian metro schedule and not a dead window",
        "Every aircraft size in the schedule, from a 70-seat turboprop to a wide-body",
        "Transfer passengers, counted once — on the flight they board here, not on the one they arrived on"
      ],
      "excluded": [
        "Arriving passengers, who are a separate and roughly equal number",
        "General aviation, charter, training and military movements — a runway worked at declared capacity has no room for them at peak",
        "Freighter movements, which consume runway slots at night and carry no passengers; leaving them out slightly overstates the passenger yield of the night window, and that is worth saying aloud",
        "Crew, ground staff and the people who come only to drop someone off — they fill the terminal and never board",
        "Days the runway is closed for resurfacing, or degraded by monsoon visibility and single-runway diversions"
      ],
      "boundaryTrap": "An airport's own headline figure is passengers handled — arrivals plus departures, with a transferring passenger appearing in both halves. That number is a little over twice this one. So if you quote 63,000 against an authority that publishes 1.4 lakh a day, you have not made an arithmetic error; you have answered a different question, and the only way anyone can tell is if you said which one first. Decide between departing and handled before you multiply anything, and say it in one sentence."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Peak-window movements",
        "expr": "10 * 45",
        "display": "10 peak hours × 45 movements per hour",
        "result": 450,
        "unit": "movements",
        "uses": [
          "a_peak_hours",
          "a_peak_rate"
        ],
        "soWhat": "Fifty-eight per cent of the day's movements from ten of its hours. Every challenge the interviewer makes to your answer will land on one of these two numbers, so state them before anything else and make them easy to swap."
      },
      {
        "id": "c2",
        "label": "Shoulder-window movements",
        "expr": "9 * 30",
        "display": "9 shoulder hours × 30 movements per hour",
        "result": 270,
        "unit": "movements",
        "uses": [
          "a_shoulder_hours",
          "a_shoulder_rate"
        ],
        "soWhat": "The runway could take 45 here as well. It does not, because nobody buys a two o'clock departure — so this is the only window where the answer is set by demand rather than by physics, and it is worth saying which."
      },
      {
        "id": "c3",
        "label": "Night-window movements",
        "expr": "5 * 12",
        "display": "5 night hours × 12 movements per hour",
        "result": 60,
        "unit": "movements",
        "uses": [
          "a_night_hours",
          "a_night_rate"
        ],
        "soWhat": "Thin, and not zero. An Indian metro airport without a curfew flies its long-haul bank through these hours, and writing the window off costs 8% of the answer for no analytical gain."
      },
      {
        "id": "c4",
        "label": "Total runway movements per busy day",
        "expr": "450 + 270 + 60",
        "display": "450 peak + 270 shoulder + 60 night",
        "result": 780,
        "unit": "movements per day",
        "uses": [],
        "soWhat": "This is the capacity. Everything from here to the answer is a unit conversion — no later line can raise this number, and that is what makes the runway the constraint rather than merely the first step."
      },
      {
        "id": "c5",
        "label": "Departures per day",
        "expr": "780 / 2",
        "display": "780 movements ÷ 2, since arrivals equal departures over a full day",
        "result": 390,
        "unit": "departures per day",
        "uses": [
          "a_dep_share"
        ],
        "soWhat": "The step most candidates skip, and skipping it doubles the answer. Say the identity out loud as you write it — every aircraft that leaves had to land first — because that sentence is the difference between an assumption and a constraint."
      },
      {
        "id": "c6",
        "label": "Domestic departures",
        "expr": "390 * 0.8",
        "display": "390 departures × 80% domestic",
        "result": 312,
        "unit": "departures per day",
        "uses": [
          "a_dom_share"
        ],
        "soWhat": "Four movements in five. Fix the mix before you price the seats, so a challenge on the mix does not force you to redo the seat arithmetic as well."
      },
      {
        "id": "c7",
        "label": "International departures",
        "expr": "390 * 0.2",
        "display": "390 departures × 20% international",
        "result": 78,
        "unit": "departures per day",
        "uses": [
          "a_intl_share"
        ],
        "soWhat": "A fifth of the flights. Hold this figure in view — it is about to carry 29% of the seats, and that asymmetry is the entire reason for splitting the fleet."
      },
      {
        "id": "c8",
        "label": "Domestic seats offered",
        "expr": "312 * 170",
        "display": "312 departures × 170 seats",
        "result": 53040,
        "unit": "seats per day",
        "uses": [
          "a_dom_seats"
        ],
        "soWhat": "Seventy-one per cent of the seats from the narrow-body fleet. If your answer is wrong, it is more likely wrong here than anywhere downstream, because 170 is a blend and blends hide their spread."
      },
      {
        "id": "c9",
        "label": "International seats offered",
        "expr": "78 * 280",
        "display": "78 departures × 280 seats",
        "result": 21840,
        "unit": "seats per day",
        "uses": [
          "a_intl_seats"
        ],
        "soWhat": "Twenty per cent of the departures producing 29% of the seats. A single blended aircraft size across the whole schedule would have erased that, and with it your ability to answer what happens if long-haul grows."
      },
      {
        "id": "c10",
        "label": "Total seats offered",
        "expr": "53040 + 21840",
        "display": "53,040 domestic + 21,840 international",
        "result": 74880,
        "unit": "seats per day",
        "carriedForward": "≈ 75,000 seats",
        "uses": [],
        "soWhat": "Seats, not passengers. Quoting this as the answer is the second most common error on this question and it overstates by 20% — an aircraft is not full because the runway is."
      },
      {
        "id": "c11",
        "label": "Reverse check — blended seats per departure",
        "expr": "74880 / 390",
        "display": "74,880 seats ÷ 390 departures",
        "result": 192,
        "unit": "seats per departure",
        "uses": [],
        "soWhat": "Run this before you go further. One hundred and ninety-two is an A320 with a wide-body every fifth departure — a metro airport you would recognise. Had it come out at 300 you would have built a long-haul hub; at 110, a regional field. The fleet mix is the assumption this line is silently testing."
      },
      {
        "id": "c12",
        "label": "Domestic departing passengers",
        "expr": "53040 * 0.85",
        "display": "53,040 seats × 85% load factor",
        "result": 45084,
        "unit": "passengers per day",
        "uses": [
          "a_dom_lf"
        ],
        "soWhat": "The gap between a seat and a passenger is 7,956 people a day on the domestic side alone — larger than most candidates' entire error budget, which is why the load factor cannot be waved through at 100%."
      },
      {
        "id": "c13",
        "label": "International departing passengers",
        "expr": "21840 * 0.8",
        "display": "21,840 seats × 80% load factor",
        "result": 17472,
        "unit": "passengers per day",
        "uses": [
          "a_intl_lf"
        ],
        "soWhat": "Five points below domestic, because long-haul demand is directional and seasonal in a way domestic shuttle traffic is not. A small correction, made explicitly rather than absorbed into a single blended figure."
      },
      {
        "id": "c14",
        "label": "Total departing passengers on a busy day",
        "expr": "45084 + 17472",
        "display": "45,084 domestic + 17,472 international",
        "result": 62556,
        "unit": "departing passengers per day",
        "carriedForward": "≈ 63,000 departing passengers",
        "uses": [],
        "soWhat": "Round it before you say it. Every input was a benchmark or a judgement good to two significant figures, so 62,556 claims a precision the chain cannot carry — and the figure is worthless anyway until you have said which resource produced it."
      }
    ],
    "orderOfMagnitude": "10^4",
    "assumptions": [
      {
        "id": "a_peak_rate",
        "lever": "Runway movements per hour at peak",
        "value": "45 per hour",
        "numeric": 45,
        "unit": "movements per hour",
        "basis": "published-benchmark",
        "defence": "Separation minima put successive movements on a single runway roughly 75 to 90 seconds apart once you allow for wake turbulence behind a heavy aircraft, which is 40 to 48 an hour — 45 is the working middle and it is the number slot coordinators actually declare for a well-equipped single runway.",
        "confidence": "defensible",
        "contestedBy": "An interviewer who has seen a runway with limited rapid-exit taxiways will argue 36; one thinking of a segregated-mode operation with a homogeneous jet fleet will argue 54. That range is ±18% on the final answer and it is the widest band in the model."
      },
      {
        "id": "a_peak_hours",
        "lever": "Hours per day held at the peak rate",
        "value": "10 hours",
        "numeric": 10,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "Two banks — roughly 06:00 to 11:00 and 17:00 to 22:00 — which is when business traffic departs and when long-haul arrivals feed the domestic network.",
        "confidence": "judgement",
        "contestedBy": "Push it to 13 hours and the shoulder shrinks to 6, so the total moves by only about 6% — the day-shape matters far less than the rate, which is not the intuition most candidates arrive with."
      },
      {
        "id": "a_shoulder_rate",
        "lever": "Movements per hour in the shoulder",
        "value": "30 per hour",
        "numeric": 30,
        "unit": "movements per hour",
        "basis": "observed-behaviour",
        "defence": "Two-thirds of peak. The runway is not the limit in these hours — demand is, because very few people buy a two o'clock departure.",
        "confidence": "judgement"
      },
      {
        "id": "a_shoulder_hours",
        "lever": "Shoulder hours per day",
        "value": "9 hours",
        "numeric": 9,
        "unit": "hours per day",
        "basis": "structural-logic",
        "defence": "Forced by the other two windows — the three must sum to 24, which is the reason for declaring the day-shape before pricing any of it.",
        "confidence": "defensible"
      },
      {
        "id": "a_night_rate",
        "lever": "Movements per hour at night",
        "value": "12 per hour",
        "numeric": 12,
        "unit": "movements per hour",
        "basis": "observed-behaviour",
        "defence": "One movement every five minutes through the small hours — the long-haul departure bank to Europe and North America plus overnight freight, which is thin traffic but continuous.",
        "confidence": "judgement"
      },
      {
        "id": "a_night_hours",
        "lever": "Night hours per day",
        "value": "5 hours",
        "numeric": 5,
        "unit": "hours per day",
        "basis": "structural-logic",
        "defence": "Midnight to five. An Indian metro airport with no curfew works them, which is precisely why the window is worth 60 movements rather than zero.",
        "confidence": "defensible",
        "contestedBy": "An airport under a night curfew loses this window entirely — that is 8% of the answer, and it is the first question to ask if the prompt mentions a residential approach path."
      },
      {
        "id": "a_dep_share",
        "lever": "Departure share of runway movements",
        "value": "50%",
        "numeric": 0.5,
        "unit": "share of movements",
        "basis": "structural-logic",
        "defence": "Over a full day every aircraft that departs must first have arrived, so arrivals and departures balance to within the handful that night-stop — this is an identity, not an estimate, and it is the one number here nobody can argue with.",
        "confidence": "anchor"
      },
      {
        "id": "a_dom_share",
        "lever": "Domestic share of departures",
        "value": "80%",
        "numeric": 0.8,
        "unit": "share of departures",
        "basis": "published-benchmark",
        "defence": "At a large Indian metro airport roughly four movements in five are domestic — international traffic is a fifth of the flights but a much larger share of the seats, which is exactly why the two must be split.",
        "confidence": "defensible"
      },
      {
        "id": "a_intl_share",
        "lever": "International share of departures",
        "value": "20%",
        "numeric": 0.2,
        "unit": "share of departures",
        "basis": "structural-logic",
        "defence": "The complement of the domestic share — declare the mix once and let the two halves be forced, rather than assuming each separately and having them fail to sum.",
        "confidence": "defensible",
        "contestedBy": "A gateway airport with a heavier long-haul programme could run 30%, which lifts the answer by about 5%. The mix moves the answer far less than its prominence in the tree suggests, and saying so is worth a mark."
      },
      {
        "id": "a_dom_seats",
        "lever": "Average seats per domestic departure",
        "value": "170 seats",
        "numeric": 170,
        "unit": "seats per departure",
        "basis": "published-benchmark",
        "defence": "The Indian domestic fleet is overwhelmingly A320-family at 180 to 186 seats, with 70-seat turboprops on regional routes pulling the blend to roughly 170.",
        "confidence": "defensible",
        "contestedBy": "A schedule tilted towards the A321 at 220 seats supports 195, which lifts the answer by about 11%; a heavy regional programme supports 140, which cuts it by about 13%."
      },
      {
        "id": "a_intl_seats",
        "lever": "Average seats per international departure",
        "value": "280 seats",
        "numeric": 280,
        "unit": "seats per departure",
        "basis": "published-benchmark",
        "defence": "Gulf and South-East Asia fly narrow-bodies at around 180; Europe and North America fly wide-bodies at 300 to 400. Weighted towards the short-haul end, where most of the frequencies are, 280 is the blend.",
        "confidence": "judgement"
      },
      {
        "id": "a_dom_lf",
        "lever": "Domestic load factor",
        "value": "85%",
        "numeric": 0.85,
        "unit": "share of seats filled",
        "basis": "published-benchmark",
        "defence": "Indian domestic load factors run in the mid-80s across the year and higher on a busy day, because an airline that cannot fill a route stops flying it rather than flying it empty.",
        "confidence": "anchor"
      },
      {
        "id": "a_intl_lf",
        "lever": "International load factor",
        "value": "80%",
        "numeric": 0.8,
        "unit": "share of seats filled",
        "basis": "published-benchmark",
        "defence": "A few points below domestic — long-haul seasonal and directional imbalance means one leg of a rotation routinely flies lighter than the other.",
        "confidence": "defensible"
      },
      {
        "id": "a_stands",
        "lever": "Aircraft parking stands available",
        "value": "70 stands",
        "numeric": 70,
        "unit": "stands",
        "basis": "observed-behaviour",
        "defence": "Contact gates plus remote bays at a metro airport with two terminals — count them from the apron chart or from the satellite view, which takes ninety seconds and is the only way to price this constraint honestly.",
        "confidence": "judgement"
      },
      {
        "id": "a_stand_turns",
        "lever": "Usable departures per stand per day",
        "value": "6 turnarounds",
        "numeric": 6,
        "unit": "departures per stand per day",
        "basis": "structural-logic",
        "defence": "A narrow-body turnaround occupies a stand for about 50 minutes plus manoeuvring, so a stand could take 15 in a day on paper — but stands hold night-stopping aircraft, wide-bodies sit for hours, and the schedule peaks rather than spreading. Six is the realistic usable figure.",
        "confidence": "judgement",
        "contestedBy": "Argue 8 and the stand ceiling rises to 560 departures, which pushes the stands well clear of binding — the headline answer does not move at all, because the runway still binds. That is the cleanest demonstration in the whole question of what a non-binding constraint is."
      },
      {
        "id": "a_sec_lanes",
        "lever": "Departure security screening lanes",
        "value": "28 lanes",
        "numeric": 28,
        "unit": "lanes",
        "basis": "observed-behaviour",
        "defence": "Domestic and international screening halls combined at a metro airport — this is countable by standing in the hall, which is what makes it the easiest of the three constraints to price and the least useful.",
        "confidence": "judgement"
      },
      {
        "id": "a_lane_rate",
        "lever": "Passengers screened per lane per hour",
        "value": "160 per hour",
        "numeric": 160,
        "unit": "passengers per lane per hour",
        "basis": "published-benchmark",
        "defence": "Roughly one passenger every 22 seconds through a staffed lane with a tray return — the standard planning figure sits between 150 and 180, and 160 is the middle.",
        "confidence": "defensible"
      },
      {
        "id": "a_terminal_hours",
        "lever": "Effective terminal processing hours per day",
        "value": "18 hours",
        "numeric": 18,
        "unit": "hours per day",
        "basis": "structural-logic",
        "defence": "Passengers arrive to be screened roughly two hours ahead of a departure, so the screening day is the departure day stretched at the front and thinned at the back — 18 hours of genuine throughput rather than 24.",
        "confidence": "judgement"
      }
    ],
    "question": "An Indian metro airport works a single runway. How many departing passengers can it physically push through on a busy day — and which resource is actually stopping it doing more?",
    "traps": [
      {
        "trap": "Counting every runway movement as a departing flight.",
        "whyItHappens": "Declared runway capacity is published as a single figure — 45 an hour — and it reads like a rate of aircraft leaving, because that is the only half of the operation a departing passenger ever notices. Nothing in the arithmetic objects, and the mistake is invisible in the tree, which is what makes it dangerous rather than merely wrong.",
        "fix": "Halve it, and say the identity out loud as you do: over a full day every aircraft that departs has already arrived. Skipping this step doubles the answer to 1.25 lakh, which lands within a rounding error of the number the airport itself publishes — so the error will feel like confirmation. That is the worst possible property for a mistake to have."
      },
      {
        "trap": "Sizing the terminal instead of the runway.",
        "whyItHappens": "The terminal is the part of the airport a passenger experiences, so it is the part that comes to mind — and the security queue is the only place anyone has ever personally been held up, which makes congestion there feel like evidence of a constraint. It is not. A queue is a peak-hour phenomenon inside a resource that may have a quarter of a day's headroom, and peak queueing tells you nothing about daily capacity.",
        "fix": "Price every candidate constraint in the same unit before you commit to one: runway 62,556, stands 67,368, screening 80,640 passengers a day. Take the smallest and name it. The audit costs two minutes and it is the difference between an answer and the answer to the question actually asked."
      },
      {
        "trap": "Reaching for the airport's observed traffic instead of its capacity.",
        "whyItHappens": "The question sounds like 'how many passengers does this airport handle', and a recalled annual figure feels more rigorous than a chain of assumptions — a cited number sounds like evidence and a derived one sounds like a guess. But observed traffic is demand realised, and it embeds every hour the runway sat idle because nobody wanted a two o'clock departure.",
        "fix": "Say plainly that capacity is a supply question and that the observed figure belongs at the end as a back-check, not at the start as an input. Then actually do it — 3.9 crore a year against the 40 to 50 million the busiest single runways manage is a result you can defend, and it is worth more coming last than the recalled figure would have been coming first."
      },
      {
        "trap": "One average aircraft across the whole schedule.",
        "whyItHappens": "Averaging a 70-seat turboprop and a 350-seat wide-body into '200 seats' is faster to write and reaches a total within a few per cent of the right one, because the two errors cancel. The total survives; the information does not. You can no longer see that a fifth of the departures carry 29% of the seats.",
        "fix": "Split domestic from international and price each. It costs one extra line. The payoff arrives when the interviewer asks what happens if the international programme grows — with the split you answer in ten seconds, and without it you rebuild the model while they watch."
      },
      {
        "trap": "Running the runway at peak rate for all 24 hours.",
        "whyItHappens": "Hours times rate is the obvious multiplication and the day-shape looks like extra work for a second-order correction. It is not second-order: 24 × 45 gives 1,080 movements against 780, overstating the answer by 38%, and it describes an airport with no night and no quiet afternoon — a place nobody has ever flown from.",
        "fix": "Three windows is enough — peak, shoulder, night — and name what governs each. Peak is physics, shoulder is demand, night is the long-haul bank. Three lines, thirty seconds, and the day-shape now survives a challenge instead of collapsing under one."
      },
      {
        "trap": "Quoting 62,556, or stopping at 74,880 seats.",
        "whyItHappens": "The arithmetic produces both figures and after fifteen minutes of work they feel earned. Seats in particular feel like the answer because the chain visibly ends there and the load factor looks like a refinement rather than a step. It is a 20% step.",
        "fix": "Say 'roughly 63,000, call it 50,000 to 75,000', name the lever that sets the width, and make sure the word 'passengers' rather than 'seats' is in the sentence. A guesstimate answered as an exact figure signals that you do not understand what an estimate is, and that impression is expensive to reverse."
      }
    ],
    "teachingPoint": "Capacity is not the sum of what an operation owns. It is the rate of its tightest resource, and every other resource is slack. So a capacity question is not one estimate but three or four estimates run in parallel — price each candidate constraint in the same unit, take the smallest, and name it. The consequence is the part that gets graded: money spent anywhere except the constraint changes the answer by exactly zero. Most candidates size the part of the airport they have personally queued in, which is the terminal, and the terminal is never what binds."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "active-share",
      "whyThisLever": "Two tests decide which lever to stress, and most candidates apply only one. The first is how badly the number is pinned. The second is how much of the answer rides on it. The rural take-up rate is the shakiest figure on this page and moves the answer by under four per cent — leave it alone. The active share is the last multiplication in the chain, so it passes straight through to the answer one-for-one, nothing observable pins it down, and it is the lever the question was built around. Shaky and load-bearing is the pair worth testing.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "40% of cards active in the month",
          "answer": "≈ 4.2 crore cards",
          "deltaVsBase": "−27%"
        },
        {
          "scenario": "Base",
          "leverValue": "55% of cards active in the month",
          "answer": "≈ 5.7 crore cards",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "70% of cards active in the month",
          "answer": "≈ 7.3 crore cards",
          "deltaVsBase": "+27%"
        }
      ],
      "breakpoint": "Above roughly 70% the arithmetic starts claiming something you can check against ordinary life: at 1.8 cards a holder, a 70% active share means the average cardholder puts spend on more than one card every single month, and the two-card habit is a minority habit rather than the norm. Below roughly 35% you are claiming cards in issue run close to three times cards in use, which is more dormancy than a base carrying annual fees and fee-waiver spend targets can sustain — issuers cull those cards. So the honest range on this lever is 35% to 70%, the answer inherits a 3.6 to 7.3 crore range, and the power of ten never moves. That last clause is the one worth saying aloud.",
      "oneLiner": "When there is no time for the grid, say this and move on: 'About half the card base transacts in any given month, so the published issuance figure is roughly double the answer — and if you prefer 45% or 65%, the answer moves by about a quarter either way and stays firmly in the crores.'"
    },
    "number": "07",
    "difficulty": "Medium",
    "id": "active-credit-cards",
    "archetype": "penetration-cascade",
    "routeChoice": {
      "chosen": "Top-down",
      "why": "The population is the one number here nobody will argue with, and every step after it narrows — adults, then adults a bank will actually lend to unsecured, then the ones who took a card, then cards, then cards that move. A cascade fails visibly: if a step is wrong, the interviewer can point at the step rather than at your answer. Start from the biggest defensible number and spend your credibility on the narrowing.",
      "rejectedRoute": "Bottom-up",
      "rejectedWhyNot": "Bottom-up here means starting from the issuers — count the banks, assume a card book each, add them up. It collapses on the first branch. The distribution is brutally skewed: a handful of large issuers carry most of the base and the tail runs to hundreds of small banks and co-brand tie-ups whose portfolios you cannot guess, so your answer ends up decided by a number you have no way to defend. Worse, it hands you cards in issue and tells you nothing about dormancy, so you would have to bolt the activity rate on afterwards anyway. Go bottom-up when the unit is observable and roughly uniform. An issuer's card book is neither."
    },
    "sanityChecks": [
      "Your chain produces about 10.4 crore cards in issue on the way past. Publicly reported counts of the Indian card base are of that order, which says the eligibility and multi-holding levers are roughly right. Check that intermediate out loud — had it come out at 3 crore or 30 crore you want to find the broken step before the last line, not after it.",
      "Multiply the two card-side levers on their own: 1.8 cards a holder × 55% active ≈ 1.0. The arithmetic is quietly asserting that the average cardholder puts spend on almost exactly one card a month. Test that against the wallets you actually know — people who hold three cards run one and keep the others for a specific offer. The shape is right.",
      "5.8 crore holders against 91 crore adults is roughly one adult in sixteen. In a Gurgaon classroom that will feel absurdly low, because everyone in the room has a card. The country is not the room, and the distance between those two intuitions is the single biggest reason campus candidates over-size financial services.",
      "Put it on households: 140 crore people at about 4.5 to a household is roughly 31 crore households, so fewer than one household in five contains a credit-card holder. That is consistent with a category still concentrated in salaried metro India, and flatly inconsistent with the answer you would have reached from bank-account penetration.",
      "Turn the answer into money. 5.7 crore active cards at a plausible ₹25,000 to ₹30,000 of monthly spend each gives ₹1.4 to ₹1.7 lakh crore a month, or of the order of ₹18 lakh crore a year. Reported system-wide card spends run in that range — a third and cruder check that costs fifteen seconds and catches an answer wrong by a factor of five."
    ],
    "answerBand": "4.5 to 7 crore cards. Anything between 4 and 8 crore is defensible on a different but honest set of levers. Outside that band one of your rates is carrying weight it cannot bear, and the interviewer will find it before you do.",
    "tree": {
      "root": "Credit cards transacting in a month",
      "rootFormula": "= Cardholders × Cards per holder × Share of cards active in the month",
      "value": "≈ 5.7 crore",
      "branches": [
        {
          "label": "Cardholders",
          "formula": "Adults × Urban/rural split × Eligibility × Take-up",
          "value": "≈ 5.8 crore people",
          "note": "People, not cards. Everything on this branch is measured in humans and must not be handed back as an answer.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Adults aged 18 and over",
              "formula": "140 crore × 65%",
              "value": "≈ 91 crore",
              "note": "The uncontested base. Do not spend time defending it."
            },
            {
              "label": "Urban adults",
              "formula": "91 crore × 40%",
              "value": "≈ 36.4 crore",
              "note": "Above the 35% urban share of total population, because working-age migration lands in cities and urban households carry fewer children."
            },
            {
              "label": "Urban adults an issuer will underwrite",
              "formula": "36.4 crore × 25%",
              "value": "≈ 9.1 crore",
              "note": "The step that does the real narrowing. A bank account is not a credit line — this gate is documented income plus a bureau record."
            },
            {
              "label": "Urban holders",
              "formula": "9.1 crore × 55% take-up",
              "value": "≈ 5.0 crore",
              "note": "Eligible is not the same as interested. UPI already does the convenience job, so the card has to earn its annual fee on credit and rewards alone."
            },
            {
              "label": "Rural adults",
              "formula": "91 crore × 60%",
              "value": "≈ 54.6 crore",
              "note": "A very large base behind a very narrow gate."
            },
            {
              "label": "Rural holders",
              "formula": "54.6 crore × 4% eligible × 35% take-up",
              "value": "≈ 76 lakh",
              "note": "Thirteen per cent of all holders. Material enough to carry, too small to argue about."
            }
          ]
        },
        {
          "label": "Cards per holder",
          "formula": "Blended multi-holding factor",
          "value": "1.8 cards",
          "note": "The conversion from people to cards. Skip it and the answer is out by the whole factor.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "One card only",
              "formula": "50% of holders × 1",
              "value": "0.50",
              "note": "Usually the salary bank's card, taken because it was pre-approved."
            },
            {
              "label": "Two cards",
              "formula": "35% of holders × 2",
              "value": "0.70",
              "note": "One for general spend, one for a category or a fee waiver."
            },
            {
              "label": "Three or more",
              "formula": "15% of holders × 4",
              "value": "0.60",
              "note": "Rewards optimisers and frequent flyers. A thin tail that pulls the mean up hard."
            },
            {
              "label": "Cards in issue",
              "formula": "5.77 crore × 1.8",
              "value": "≈ 10.4 crore",
              "note": "The number the system publishes. Check it here, out loud, before the last step."
            }
          ]
        },
        {
          "label": "Share active in the month",
          "formula": "Cards with at least one transaction ÷ cards in issue",
          "value": "55%",
          "note": "The lever the question is actually about, and the one nothing observable pins down.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Transacting at least once",
              "formula": "10.38 crore × 55%",
              "value": "≈ 5.7 crore",
              "note": "The answer."
            },
            {
              "label": "Dormant this month",
              "formula": "10.38 crore × 45%",
              "value": "≈ 4.7 crore",
              "note": "Acquired for a joining offer or one EMI purchase, then parked. Issuance is cheap; activation is not."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Merchant-side cross-check",
      "route": "Bottom-up",
      "premise": "Come at it from the terminals rather than the wallets. If you can size the credit-card transactions the country's merchants process in a month, and you know roughly how often one active card is used, the number of active cards falls out of the division. This route shares no lever with the cascade — no population, no eligibility, no take-up — which is what makes it worth the three minutes.",
      "lines": [
        {
          "id": "t1",
          "label": "Card-accepting touchpoints",
          "expr": "9000000 + 1000000",
          "display": "≈ 90 lakh POS terminals + ≈ 10 lakh online merchants",
          "result": 10000000,
          "tolerance": 1e-06,
          "unit": "touchpoints",
          "carriedForward": "≈ 1 crore",
          "uses": [
            "card-touchpoints"
          ],
          "soWhat": "Online merchants are a small count and a large share of credit spend. Counting them as touchpoints keeps the arithmetic clean even though it understates their weight, and saying so costs nothing."
        },
        {
          "id": "t2",
          "label": "Credit-card transactions a day",
          "expr": "10000000 * 1.3",
          "display": "1 crore touchpoints × 1.3 credit transactions a day",
          "result": 13000000,
          "tolerance": 1e-06,
          "unit": "transactions per day",
          "carriedForward": "≈ 1.3 crore a day",
          "uses": [
            "credit-txn-per-touchpoint"
          ],
          "soWhat": "This is a mean over a violently skewed distribution — a handful of travel and e-commerce merchants carry a large share while a neighbourhood terminal may see no credit card for days. Means over skewed distributions are where cross-checks quietly go wrong, so say it before the interviewer does."
        },
        {
          "id": "t3",
          "label": "Credit-card transactions a month",
          "expr": "13000000 * 30",
          "display": "1.3 crore a day × 30 days",
          "result": 390000000,
          "tolerance": 1e-06,
          "unit": "transactions per month",
          "carriedForward": "≈ 39 crore",
          "uses": [
            "days-per-month"
          ],
          "soWhat": "A flow, in transactions. Do not hand this back — the question asked for a count of cards, and 39 crore is the most plausible-sounding wrong answer available."
        },
        {
          "id": "t4",
          "label": "Active cards implied",
          "expr": "390000000 / 7",
          "display": "39 crore transactions ÷ 7 transactions per active card",
          "result": 55714285.71,
          "tolerance": 1e-06,
          "unit": "credit cards",
          "carriedForward": "≈ 5.6 crore",
          "uses": [
            "txn-per-active-card"
          ],
          "soWhat": "Dividing a flow by a rate converts it back into a stock. Naming that out loud is how you show you understood the unit problem rather than survived it."
        }
      ],
      "answer": "≈ 5.6 crore cards transacting in a month, against 5.7 crore from the cascade",
      "verdict": "The two routes land about three per cent apart. Do not celebrate that. On levers this soft, agreement that tight is luck, and reading it as confirmation is a worse error than a visible gap would have been. The routes also share hidden DNA — both are describing the same market, so if the real card base were half what you think, both would be wrong together and wrong in the same direction. What the agreement genuinely buys you is the power of ten and the right to say the answer sits in the mid-to-high five crores rather than in the tens of crores. Say that much and no more. Had the two landed three crore apart, the reconciliation would have been the more useful conversation, and the first place to look would be transactions per active card — a long tail of cards used once a month drags that average well below what a heavy user's own statement suggests."
    },
    "probes": [
      {
        "question": "Your answer is cards. How many Indians hold a credit card?",
        "intent": "Whether you kept units straight and can walk your own chain backwards without rebuilding it.",
        "goodAnswer": "Gives about 5.8 crore people, roughly one adult in sixteen, and notes it is a different number from the 5.7 crore active cards even though the two land close — one holder may carry two cards of which only one moves this month. Names the near-coincidence and explains it rather than pretending it was designed.",
        "weakAnswer": "Repeats the card figure, or divides it by something without saying which lever is being undone."
      },
      {
        "question": "The regulator publishes roughly 10 crore cards in issue. Does that help you or hurt you?",
        "intent": "Whether you can absorb an external anchor without abandoning your own structure.",
        "goodAnswer": "Uses it to validate the intermediate rather than the answer — the cascade produced 10.4 crore in issue, so eligibility and multi-holding hold up, and the published figure now becomes the numerator. Points out that the activity rate is still the candidate's to defend, and that it is the only lever standing between that anchor and the answer.",
        "weakAnswer": "Back-solves from 10 crore and drops the cascade, which feels efficient and leaves nothing to defend on the one lever the question was actually testing."
      },
      {
        "question": "UPI is everywhere. Should that raise or lower your take-up number?",
        "intent": "Whether you can reason about a substitute rather than recite that one exists.",
        "goodAnswer": "Lowers take-up among eligible adults, because UPI removed the convenience reason to carry a card and left only credit and rewards — which is why 55% rather than a developed-market 80%. Adds that it may raise spend per active card, since the people who still bother are the deliberate users, and notices the two effects pull in opposite directions.",
        "weakAnswer": "'UPI is disrupting credit cards' — a true sentence that moves no number and specifies no direction."
      },
      {
        "question": "Which of your numbers are you least willing to defend?",
        "intent": "Calibration. Whether you can rank your own uncertainty instead of flattening it.",
        "goodAnswer": "Names the 55% active share, because nothing observable pins it and it is the last multiplication, so it passes straight into the answer. Shows the 40 to 70 band, notes it moves the answer by about a quarter either way while the power of ten survives, and separately flags that rural take-up is the shakiest figure on the page but moves almost nothing, so it is not the one to test.",
        "weakAnswer": "'They are all estimates,' or naming the population figure — the one number in the chain nobody was going to challenge."
      },
      {
        "question": "Rural is four per cent of a 55-crore adult base. Is that branch even worth carrying?",
        "intent": "Whether you can drop or keep a branch on the evidence rather than out of tidiness or attachment to your own structure.",
        "goodAnswer": "Puts it at about 76 lakh holders, roughly 13% of the total — material enough to keep in the structure, not material enough to argue about — and notes that doubling rural eligibility moves the final answer by about 13%. Says the remaining time is better spent on the active share, and means it.",
        "weakAnswer": "Drops it silently to save time, or defends it at length because it is already drawn on the page."
      }
    ],
    "finalAnswerNumeric": 57117060,
    "tabLabel": "Active credit cards, India",
    "finalAnswer": "≈ 5.7 crore credit cards transact at least once in a typical month — roughly half a base of about 10.4 crore cards in issue. Every rate on this page is illustrative, built to show the method clearly, not asserted as verified market data.",
    "scope": {
      "countingWhat": "Distinct credit cards that record at least one transaction — swiped, tapped or entered online — during a single calendar month. You are counting cards, not swipes: the month is the activity test, not the unit of the answer.",
      "unit": "credit cards",
      "timeBasis": "stock (point in time)",
      "geography": "India, urban and rural, all states",
      "included": [
        "Cards issued to individuals by banks and their co-brand partners",
        "Add-on and supplementary cards, counted as separate cards when used separately",
        "Cards used only online and never presented at a terminal",
        "A card used once in the month for a single ₹200 bill — one transaction is the test"
      ],
      "excluded": [
        "Commercial and corporate cards billed to a company account",
        "Debit cards, prepaid and gift cards, forex travel cards",
        "Buy-now-pay-later and pay-later credit lines that carry no card number",
        "Cards issued but never activated, and cards that sat in a drawer all month"
      ],
      "boundaryTrap": "'Credit cards in India' has two readings and they differ by roughly a factor of two — cards in issue, which is the figure banks report, and cards that actually transact in a month. Dormancy in this category is not a rounding error; it is the whole question. Say in your first sentence which one you are estimating. If the interviewer wanted the other, you have spent thirty seconds, not the question."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Adult population",
        "expr": "1400000000 * 0.65",
        "display": "140 crore × 65% aged 18 and over",
        "result": 910000000,
        "tolerance": 1e-06,
        "unit": "adults",
        "carriedForward": "≈ 91 crore",
        "uses": [
          "population",
          "adult-share"
        ],
        "soWhat": "The only line on this page an interviewer will accept without a defence. Get through it in one breath."
      },
      {
        "id": "c2",
        "label": "Urban adults",
        "expr": "910000000 * 0.40",
        "display": "91 crore adults × 40% urban",
        "result": 364000000,
        "tolerance": 1e-06,
        "unit": "urban adults",
        "carriedForward": "≈ 36.4 crore",
        "uses": [
          "urban-adult-share"
        ],
        "soWhat": "Splitting here rather than later is the point of the cascade — the eligibility gate that follows is five to six times tighter in the villages, and a blended national rate would hide that."
      },
      {
        "id": "c3",
        "label": "Rural adults",
        "expr": "910000000 - 364000000",
        "display": "91 crore adults − 36.4 crore urban",
        "result": 546000000,
        "tolerance": 1e-06,
        "unit": "rural adults",
        "carriedForward": "≈ 54.6 crore",
        "uses": [
          "urban-adult-share"
        ],
        "soWhat": "Subtract rather than multiply again, so the two halves are guaranteed to add back to the adult base."
      },
      {
        "id": "c4",
        "label": "Urban adults an issuer will underwrite",
        "expr": "364000000 * 0.25",
        "display": "36.4 crore urban adults × 25% income-eligible",
        "result": 91000000,
        "tolerance": 1e-06,
        "unit": "eligible urban adults",
        "carriedForward": "≈ 9.1 crore",
        "uses": [
          "urban-eligibility"
        ],
        "soWhat": "This is where the funnel actually narrows, and it is the step candidates replace with bank-account penetration. An account is a deposit relationship the bank cannot lose money on; a card is an unsecured credit line, and the two are underwritten on completely different evidence."
      },
      {
        "id": "c5",
        "label": "Rural adults an issuer will underwrite",
        "expr": "546000000 * 0.04",
        "display": "54.6 crore rural adults × 4% income-eligible",
        "result": 21840000,
        "tolerance": 1e-06,
        "unit": "eligible rural adults",
        "carriedForward": "≈ 2.2 crore",
        "uses": [
          "rural-eligibility"
        ],
        "soWhat": "Sixty per cent of the adult base yields under a fifth of the eligible pool. That asymmetry is the finding, not a detail."
      },
      {
        "id": "c6",
        "label": "Urban cardholders",
        "expr": "91000000 * 0.55",
        "display": "9.1 crore eligible × 55% take-up",
        "result": 50050000,
        "tolerance": 1e-06,
        "unit": "cardholders",
        "carriedForward": "≈ 5.0 crore",
        "uses": [
          "urban-takeup"
        ],
        "soWhat": "Separating eligibility from take-up gives you two levers an interviewer can push on independently, and lets you answer the UPI question without rebuilding the tree."
      },
      {
        "id": "c7",
        "label": "Rural cardholders",
        "expr": "21840000 * 0.35",
        "display": "2.18 crore eligible × 35% take-up",
        "result": 7644000,
        "tolerance": 1e-06,
        "unit": "cardholders",
        "carriedForward": "≈ 76 lakh",
        "uses": [
          "rural-takeup"
        ],
        "soWhat": "Small, and worth saying so before the interviewer does — flagging your own immaterial branch buys more credit than defending it."
      },
      {
        "id": "c8",
        "label": "Total cardholders",
        "expr": "50050000 + 7644000",
        "display": "5.0 crore urban + 76 lakh rural",
        "result": 57694000,
        "tolerance": 1e-06,
        "unit": "cardholders",
        "carriedForward": "≈ 5.8 crore",
        "uses": [],
        "soWhat": "People, not cards. Roughly one adult in sixteen. Anyone who hands this number back as the answer has lost the multi-holding step and is out by nearly a factor of two."
      },
      {
        "id": "c9",
        "label": "Cards per holder",
        "expr": "0.5 * 1 + 0.35 * 2 + 0.15 * 4",
        "display": "50% hold one + 35% hold two + 15% hold three or more (average four)",
        "result": 1.8,
        "tolerance": 1e-06,
        "unit": "cards per holder",
        "uses": [
          "cards-per-holder"
        ],
        "soWhat": "Build the blend rather than asserting it, because the whole factor comes from the thin top tail — say 'about a sixth of holders carry four cards' and 1.8 stops sounding arbitrary."
      },
      {
        "id": "c10",
        "label": "Cards in issue",
        "expr": "57694000 * 1.8",
        "display": "5.77 crore holders × 1.8 cards each",
        "result": 103849200,
        "tolerance": 1e-06,
        "unit": "credit cards",
        "carriedForward": "≈ 10.4 crore",
        "uses": [
          "cards-per-holder"
        ],
        "soWhat": "Pause on this line. It is the one intermediate the interviewer may independently know, so it is your free calibration check — and it is not the answer."
      },
      {
        "id": "c11",
        "label": "Cards transacting in the month",
        "expr": "103849200 * 0.55",
        "display": "10.38 crore cards in issue × 55% active in the month",
        "result": 57117060,
        "tolerance": 1e-06,
        "unit": "credit cards",
        "carriedForward": "≈ 5.7 crore",
        "uses": [
          "active-share"
        ],
        "soWhat": "The last multiplication is the one the question was about. Notice where it lands — almost exactly back at the holder count, which says the average cardholder runs one card a month and keeps the rest for a specific offer."
      }
    ],
    "orderOfMagnitude": "10^7 — tens of millions of cards, not hundreds of millions",
    "assumptions": [
      {
        "id": "population",
        "lever": "India population",
        "value": "140 crore",
        "numeric": 1400000000,
        "unit": "people",
        "basis": "census-anchor",
        "defence": "The 2011 Census counted 121 crore and growth has run under 1% a year since — 140 crore is the figure every Indian interviewer carries and nobody will spend a minute on it.",
        "confidence": "anchor",
        "contestedBy": "Some will prefer 145 crore. It moves the answer by under 4% and is not worth any of your timebox."
      },
      {
        "id": "adult-share",
        "lever": "Share of population aged 18 and over",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share of population",
        "basis": "census-anchor",
        "defence": "India's median age sits close to 28 and roughly a third of the country is under 18, which leaves about two-thirds adult.",
        "confidence": "anchor",
        "contestedBy": "68% on a more recent projection. A three-point move here changes nothing that survives rounding."
      },
      {
        "id": "urban-adult-share",
        "lever": "Urban share of adults",
        "value": "40%",
        "numeric": 0.4,
        "unit": "share of adults",
        "basis": "structural-logic",
        "defence": "The urban share of total population is about 35%, but cities hold a disproportionate share of working-age migrants and fewer children per household, so the urban share of adults sits a few points above the headline.",
        "confidence": "defensible",
        "contestedBy": "Hold it flat at 35% and urban holders fall by an eighth, pulling the final answer to roughly 5.2 crore."
      },
      {
        "id": "urban-eligibility",
        "lever": "Urban adults an issuer will underwrite unsecured",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of urban adults",
        "basis": "structural-logic",
        "defence": "Issuers price off documented income and a credit-bureau record, so the gate is formal salaried employment plus the self-employed who file returns — a minority of urban adults, and a quarter is the generous end of that minority.",
        "confidence": "judgement",
        "contestedBy": "An interviewer who has worked in cards may push to 30-35% on the strength of salaried-account data, which lifts the final answer to between 6.7 and 7.7 crore."
      },
      {
        "id": "rural-eligibility",
        "lever": "Rural adults an issuer will underwrite unsecured",
        "value": "4%",
        "numeric": 0.04,
        "unit": "share of rural adults",
        "basis": "structural-logic",
        "defence": "Outside towns documented income is thin and the cost of underwriting and collecting on a small unsecured line is hard to recover, so issuance is largely confined to government and bank staff and the larger farmers.",
        "confidence": "judgement",
        "contestedBy": "Double it to 8% and the final answer rises by about 13% — real, but smaller than the argument would cost you."
      },
      {
        "id": "urban-takeup",
        "lever": "Eligible urban adults who actually hold a card",
        "value": "55%",
        "numeric": 0.55,
        "unit": "share of eligible",
        "basis": "observed-behaviour",
        "defence": "Eligibility is not ownership. UPI already does the convenience job a card does in most other markets, so the surviving reasons to carry one are credit and rewards, and a little over half of eligible urban adults find that worth an annual fee.",
        "confidence": "judgement",
        "contestedBy": "Benchmarking to a developed-market take-up near 80% is the standard error here — it would put holders above 8 crore and the card base near 15 crore, well outside anything reported."
      },
      {
        "id": "rural-takeup",
        "lever": "Eligible rural adults who hold a card",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of eligible",
        "basis": "declared-judgement",
        "defence": "Lower than urban because branch-led cross-sell is thinner and the merchant acceptance that makes a card useful is concentrated in towns — this is openly a guess, and it is carried as one.",
        "confidence": "shaky",
        "contestedBy": "Anywhere from 25% to 45% is arguable. The branch carries 13% of holders, so the entire range moves the final answer by under 4%."
      },
      {
        "id": "cards-per-holder",
        "lever": "Cards per cardholder (multi-holding factor)",
        "value": "1.8",
        "numeric": 1.8,
        "unit": "cards per holder",
        "basis": "observed-behaviour",
        "defence": "Half of holders run a single card, about a third carry two, and a thin tail of rewards optimisers carries four or more — that mix blends to 1.8, and it is the tail that keeps it above 1.5.",
        "confidence": "defensible",
        "contestedBy": "1.5 is arguable if you think the tail is thinner; it takes cards in issue to 8.7 crore and the answer to 4.8 crore."
      },
      {
        "id": "active-share",
        "lever": "Cards in issue that record a transaction in the month",
        "value": "55%",
        "numeric": 0.55,
        "unit": "share of cards in issue",
        "basis": "published-benchmark",
        "defence": "Dormancy here is structural rather than incidental — a large share of issuance comes from joining offers and one-off EMI conversions, and those cards go quiet within a quarter; activity rates reported for Indian card portfolios cluster around half.",
        "confidence": "judgement",
        "contestedBy": "Issuers usually define 'active' over 90 days rather than 30, which flatters the figure. On a strict 30-day test 45% is equally arguable and takes the answer to 4.7 crore."
      },
      {
        "id": "card-touchpoints",
        "lever": "Card-accepting merchant touchpoints in India",
        "value": "1 crore",
        "numeric": 10000000,
        "unit": "touchpoints",
        "basis": "published-benchmark",
        "defence": "Reported point-of-sale terminal counts run to roughly 90 lakh, and online merchants accepting cards add of the order of another 10 lakh.",
        "confidence": "judgement",
        "contestedBy": "Terminal counts carry a long dormant tail of their own; strip it and the base falls towards 70 lakh, cutting the cross-check by about a third."
      },
      {
        "id": "credit-txn-per-touchpoint",
        "lever": "Credit-card transactions per touchpoint per day",
        "value": "1.3",
        "numeric": 1.3,
        "unit": "transactions per touchpoint per day",
        "basis": "declared-judgement",
        "defence": "Most terminals now see mostly UPI and debit, and credit is a minority rail concentrated in a few large merchants — this is a mean over a violently skewed distribution and is stated as one.",
        "confidence": "shaky",
        "contestedBy": "Anything from 1 to 2 is arguable, which is exactly why this route checks the power of ten and nothing finer."
      },
      {
        "id": "days-per-month",
        "lever": "Days in a month",
        "value": "30",
        "numeric": 30,
        "unit": "days",
        "basis": "physical-constant",
        "defence": "Thirty is the working month for any estimate carried to two significant figures.",
        "confidence": "anchor"
      },
      {
        "id": "txn-per-active-card",
        "lever": "Transactions per active card per month",
        "value": "7",
        "numeric": 7,
        "unit": "transactions per card per month",
        "basis": "observed-behaviour",
        "defence": "Read a statement you have actually seen: one or two large recurring bills, a couple of online orders and a handful of card-present swipes — call it seven, remembering that a card used once still counts as active.",
        "confidence": "defensible",
        "contestedBy": "Ten is defensible if you picture only heavy users; it would cut the cross-check to 3.9 crore and open a real gap worth reconciling."
      }
    ],
    "question": "How many of the credit cards in India actually get used in a given month?",
    "traps": [
      {
        "trap": "Answering 'cards in issue' when the question asked for cards used.",
        "whyItHappens": "The number that surfaces from memory is the one banks publish, because issuance is what gets reported every quarter and dormancy appears in no headline. The candidate reaches the card base, recognises it as something that sounds authoritative, and stops — the chain feels finished because it produced a quotable figure.",
        "fix": "Write the word 'active' at the top of your page before the first multiplication, and make the activity rate the last lever in the chain so the structure cannot finish without it. If it is genuinely the last step you cannot forget it; if it is a caveat you intended to mention, you will."
      },
      {
        "trap": "Handing back cardholders as though they were cards.",
        "whyItHappens": "The cascade naturally produces people, and a person feels like the natural unit of a penetration question, so the instinct is to stop at the human count. But a wallet with three cards is one person and three cards. Skip the multi-holding step and the answer is out by the full factor — here, nearly two.",
        "fix": "Name the unit at every node as you write it: this line is people, this line is cards. The moment the unit changes, announce it — 'now I convert people into cards' — and the interviewer hears a candidate tracking units rather than one multiplying numbers."
      },
      {
        "trap": "Using bank-account penetration as the eligibility gate.",
        "whyItHappens": "Account penetration is the financial-inclusion statistic every candidate has read, it sits comfortably above 75%, and it slots neatly into the funnel shape. The trouble is that it barely narrows anything — you finish with seventy-odd crore 'eligible' adults instead of eleven, and a final answer several times too high. An account is a deposit relationship the bank cannot lose money on; a credit card is an unsecured line underwritten on documented income and a bureau record.",
        "fix": "Replace the account layer with an income-and-documentation layer, and say why you are replacing it. The sentence 'a bank account is not a credit line' is worth more marks than the number that follows it."
      },
      {
        "trap": "Reading the campus wallet as the country.",
        "whyItHappens": "Everyone in an MBA classroom holds a card, so six per cent adult penetration feels wrong by an order of magnitude. The candidate rarely argues with the number openly — they quietly lift the eligibility or take-up rate until the answer stops feeling uncomfortable, and then present it as derived.",
        "fix": "Anchor on formal-sector employment rather than on the people you can see, and state that anchor aloud. If your own intuition is fighting the arithmetic, narrate that too — 'this feels low to me, and I think that is a sampling problem on my side' is a stronger answer than a silently inflated rate."
      },
      {
        "trap": "Letting 'in a month' turn the answer into a flow.",
        "whyItHappens": "The words 'in a given month' pull hard towards a rate, and the merchant-side route in particular produces a beautiful monthly transaction figure — 39 crore — sitting one division short of the answer. It is the most plausible-sounding wrong number on the page, and it is wrong by a factor of seven.",
        "fix": "The month is the activity test, not the denominator. Restate the unit before you speak the number: the answer is a count of cards, and it is roughly 5.7 crore."
      }
    ],
    "teachingPoint": "A penetration cascade fails at the step nobody says out loud. Here that step is the gap between issued and active — roughly half the cards in the country do not move in a given month, so the number banks publish is about twice the number this question asks for. Name the boundary before the first multiplication and carry the activity rate as an explicit lever, not as an afterthought bolted on when the interviewer raises an eyebrow."
  },
  {
    "timeboxMinutes": 15,
    "sensitivity": {
      "assumptionId": "fleet_active",
      "whyThisLever": "Every other number in the chain is a rate applied to something, and rates are bounded by physics or by observation — mileage cannot double, annual kilometres cannot triple, the empty share sits between a fifth and a third whatever you believe, and the idling uplift moves the answer by single digits. The fleet is different in kind. The answer is exactly the fleet multiplied by an average burn rate, so a 25% error in the fleet is a 25% error in the answer with nothing downstream to damp it. Worse, the fleet is not one assumption but three multiplied together — annual sales, working life and a growth haircut — each of which could be out by a fifth, and errors that multiply do not cancel the way errors that average do. This is also the lever candidates spend no time on, because a fleet number feels like a fact rather than a construction.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "24 lakh active trucks — a 12-year working life and a harder 0.67 haircut",
          "answer": "≈ 31 bn litres (3,100 crore litres)",
          "deltaVsBase": "−25%"
        },
        {
          "scenario": "Base",
          "leverValue": "32 lakh active trucks — 3 lakh sales × 15-year life × 0.70 haircut",
          "answer": "≈ 40 bn litres (4,000 crore litres)",
          "deltaVsBase": "—"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "45 lakh active trucks — sales × life with no growth haircut at all",
          "answer": "≈ 57 bn litres (5,700 crore litres)",
          "deltaVsBase": "+41%"
        }
      ],
      "breakpoint": "The answer leaves the stated 32-50 bn litre band below about 26 lakh active trucks or above about 40 lakh — so the band survives roughly a fifth either way on the fleet and no more. The two routes reconcile exactly at about 25 lakh, which is what 3 lakh sales a year and a twelve-year working life produce. So the whole disagreement between an eleven-line build and a two-line cross-check reduces to one empirical question: does the average Indian goods truck work for twelve years or for fifteen? Answer that and you have answered the guesstimate. Notice also that the aggressive case is not a scenario anyone chooses — it is what you get by forgetting the fleet is growing, which makes the most common error on this question a 41% one.",
      "oneLiner": "With no time for the grid: 'The answer scales one-for-one on the active fleet, and my fleet is three soft numbers multiplied together, so call it 32 lakh trucks plus or minus a fifth. That is 40 bn litres, band 32 to 50. Everything downstream is duty-cycle physics bounded by the vehicle, and none of it moves the answer more than about a tenth.'"
    },
    "number": "08",
    "difficulty": "Hard",
    "id": "trucking-diesel",
    "archetype": "physical-proxy-consumable",
    "routeChoice": {
      "chosen": "Hybrid",
      "why": "Neither half of this question can be answered on its own terms. The fleet is a national aggregate and has to come down from one — nobody counts working trucks, so you build the stock from the flow that feeds it: units sold in a year, multiplied by how long a truck stays in service. The fuel is physics and has to come up from one vehicle: kilometres run, divided by kilometres per litre. Vehicle-kilometres is the joint where the two halves meet. Say that out loud before you draw anything — 'I am converting this into vehicle-kilometres, because trucks are counted per vehicle and diesel is burned per kilometre' — because naming the proxy is the step being graded, and the arithmetic after it is a division.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "The pure top-down route is national diesel consumption multiplied by the trucking share of it, and it is weaker here for a reason worth naming: it does not estimate anything. The trucking share of diesel is this question's answer expressed as a fraction, so a candidate who quotes it has recalled the answer rather than built it, and has nothing to say when the interviewer moves an input, because there are only two inputs and neither decomposes. It is also brittle in exactly the wrong place — the share is an attribution from a fuel-use study rather than a measurement, and a candidate quoting '30%' usually cannot say whether it includes light commercial vehicles and buses, which is a factor-of-two ambiguity hiding inside one remembered number. It keeps its place below as the cross-check, where a fast independent figure is worth a great deal and being unable to decompose it costs nothing."
    },
    "sanityChecks": [
      "Share of national diesel. 40 bn litres against a national pool of 107 bn is 38%. Published attributions put heavy goods vehicles nearer 30%. That is not a passing check — it is a failing one, and saying so is the point. Either the fleet is too large, or the attribution studies are stale and heavy freight has taken share since. Name both, say which you lean towards, and report a band rather than pretending the check passed.",
      "Per truck, per day. 12,700 litres a year over 300 working days is about 42 litres a day for the average truck in the fleet. A long-haul truck alone burns 300 km ÷ 4 kmpl = 75 litres a day and needs a 300-litre tank filled every four days. Any driver would recognise both figures, and a model whose per-unit numbers a practitioner would recognise is a model worth reporting.",
      "The fuel bill. 40 bn litres at roughly ₹90 a litre is about ₹3.6 lakh crore a year on truck diesel alone — call it 1% of GDP. Fuel is typically half to three-fifths of an operator's cost on a trip, which implies a road-freight bill somewhere near ₹6-7 lakh crore. That is the right order for a market usually described in the ₹6-10 lakh crore range. Illustrative, not asserted as verified market data.",
      "Freight actually moved. Run the vehicle-kilometres back into tonne-kilometres — 101 bn long-haul vehicle-km at 22 tonnes and 75% loaded, plus 62 bn regional vehicle-km at 9 tonnes and 75% loaded — and the model implies roughly 2,100 bn tonne-km of road freight. Commonly cited estimates sit nearer 2,500-3,000 bn, so this check says the fleet model is about a fifth too small while the diesel-share check says it is a quarter too large. Two checks disagreeing in direction is not a failure of the model; it is a statement that every input carries ±25% and that a point estimate was never available. Report the band and say why it is wide.",
      "Bracket it before you trust it. 4 bn litres would be 1,250 litres a truck a year — a fortnight's running for a long-haul vehicle, and then eleven and a half months parked. 400 bn litres would be four times everything India burns of every petroleum product used for transport. Both fail in under a second, which places the answer in the tens of billions, and that bracketing is most of what the interviewer is testing.",
      "Where the fuel is physically bought. 40 bn litres at a 300-litre fill is about 13 crore truck fills a year, or roughly 3.65 lakh fills a day. Truck fuelling concentrates at highway outlets rather than across all of India's fuel retail; spread over the order of 15,000 such outlets, that is around 24 truck fills a day at each — one an hour, round the clock. That matches what a highway pump actually looks like, and an answer ten times larger would not."
    ],
    "answerBand": "32-50 billion litres (3,200-5,000 crore litres). Say the band out loud and say where it comes from — the fleet count, not the fuel physics. A guesstimate answered as '40.69 billion litres' claims a precision that three soft numbers multiplied together cannot carry, and signals you do not understand what an estimate is.",
    "tree": {
      "root": "Diesel burned by India's goods trucks in a year",
      "rootFormula": "= (Long-haul vehicle-km ÷ long-haul kmpl) + (Regional vehicle-km ÷ regional kmpl), then uplifted for idling",
      "value": "≈ 40 bn litres (4,000 crore litres)",
      "branches": [
        {
          "label": "Active fleet, 7.5 tonnes and above",
          "formula": "Annual sales × working life × fleet-growth haircut",
          "value": "≈ 32 lakh trucks",
          "note": "Nobody maintains a count of trucks that are actually running, so build the stock from the flow. Registered goods vehicles number well past a crore — that register carries light vehicles and trucks that stopped turning a wheel years ago, and it is the wrong denominator for a fuel question.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Annual sales, goods vehicles ≥ 7.5 t",
              "formula": "Mid-cycle, not peak",
              "value": "≈ 3 lakh units a year",
              "note": "Commercial vehicle sales swing hard with the capex cycle. The fleet is fifteen years of sales, not one, so a peak year is the wrong figure to multiply."
            },
            {
              "label": "Working life",
              "formula": "Fitness-renewal threshold",
              "value": "15 years",
              "note": "A truck that stops paying its way on long-haul drops into regional duty rather than being scrapped, so fifteen years is a floor wearing an average's clothes."
            },
            {
              "label": "Fleet-growth haircut",
              "formula": "× 0.70",
              "value": "32 lakh, not 45 lakh",
              "note": "Sales fifteen years ago were roughly 40% of today's. Multiplying current sales by the full life over-counts a growing fleet — always, and by about a third here."
            },
            {
              "label": "Duty-cycle split",
              "formula": "35% long-haul / 65% regional",
              "value": "11.2 lakh / 20.8 lakh",
              "note": "Split the fleet before you touch a kilometre figure. This is the decision the answer turns on, and it is made in the structure, not in the arithmetic."
            }
          ]
        },
        {
          "label": "Long-haul diesel",
          "formula": "Long-haul trucks × annual km ÷ blended kmpl",
          "value": "≈ 25 bn litres (2,520 crore litres)",
          "note": "A third of the fleet burning two-thirds of the fuel. That inversion is the finding of the whole model, and it is why the duty-cycle split had to come before any number.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Long-haul trucks",
              "formula": "32 lakh × 35%",
              "value": "11.2 lakh trucks",
              "note": "National-permit tractor-trailers and multi-axle rigids on trunk routes. The minority of vehicles and the majority of kilometres."
            },
            {
              "label": "Annual kilometres",
              "formula": "300 km a day × 300 working days",
              "value": "90,000 km",
              "note": "Indian long-haul averages 30 to 40 kmph on the whole-journey clock once loading detention, checkposts and single-driver rest are counted. Three hundred kilometres is a full day, not a slow one."
            },
            {
              "label": "Vehicle-kilometres",
              "formula": "11.2 lakh × 90,000",
              "value": "≈ 101 bn vehicle-km",
              "note": "The proxy unit. Everything upstream converts into this and everything downstream divides it."
            },
            {
              "label": "Blended mileage",
              "formula": "3.5 laden × 75% + 5.5 empty × 25%",
              "value": "4.0 km per litre",
              "note": "Empty backhauls burn less per kilometre and still burn. Blending lowers the answer, which is the tell that you performed the step rather than mentioned it."
            }
          ]
        },
        {
          "label": "Regional diesel",
          "formula": "Regional trucks × annual km ÷ blended kmpl",
          "value": "≈ 12.5 bn litres (1,250 crore litres)",
          "note": "Two-thirds of the fleet, a third of the fuel. Smaller vehicles, a third of the annual kilometres and better mileage — three multipliers cutting the same way, and compounding is the thing candidates underestimate.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Regional trucks",
              "formula": "32 lakh × 65%",
              "value": "20.8 lakh trucks",
              "note": "Mandi, port, plant and city-distribution work inside one state, done mostly by 9 to 16 tonne rigid trucks."
            },
            {
              "label": "Annual kilometres",
              "formula": "100 km a day × 300 working days",
              "value": "30,000 km",
              "note": "Two or three short runs with long waits at both ends. Loading and unloading, not driving, is what fills a regional truck's day."
            },
            {
              "label": "Vehicle-kilometres",
              "formula": "20.8 lakh × 30,000",
              "value": "≈ 62 bn vehicle-km",
              "note": "Nearly twice the trucks producing under two-thirds the kilometres. Read that off the ledger before the interviewer asks you to."
            },
            {
              "label": "Blended mileage",
              "formula": "4.5 laden × 75% + 6.5 empty × 25%",
              "value": "5.0 km per litre",
              "note": "Better than long-haul because the vehicle is lighter, not because the roads are kinder. Size beats duty cycle here, which is the opposite of what most candidates guess."
            }
          ]
        },
        {
          "label": "Fuel burned standing still",
          "formula": "Running diesel × 8%",
          "value": "≈ 3 bn litres (300 crore litres)",
          "note": "Toll plazas, mandi queues, checkposts, loading bays and an engine left running overnight for the cabin fan. Name it, size it, keep it — an interviewer cannot tell the difference between a step you weighed and a step you never saw.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Idling hours",
              "formula": "2 hours a day × 300 days",
              "value": "600 engine-hours a year",
              "note": "Detention at loading points is the single biggest block of it, and it is the reason digital load-matching has an economic case at all."
            },
            {
              "label": "Idling burn rate",
              "formula": "≈ 2.5 litres an hour",
              "value": "≈ 1,500 litres a truck a year",
              "note": "Against 22,500 litres of running fuel for a long-haul truck — about 7%. Rounded to 8% to cover cold starts and auxiliary load."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Top-down cross-check — national diesel pool × trucking share",
      "route": "Top-down",
      "premise": "Every litre burned by a truck was first sold as part of India's national diesel consumption, and that total is one of the better-published numbers in the Indian economy. Take it, convert tonnes to litres, and apply the share that fuel-use studies attribute to heavy goods vehicles. This route shares nothing at all with the duty-cycle build — no fleet count, no annual kilometres, no mileage, no idling — which is exactly what makes the comparison worth running. It is also worth noticing before you start that this route is a product of two numbers where the primary is a product of six, so it may well be the tighter of the two.",
      "lines": [
        {
          "id": "t1",
          "label": "India's annual diesel consumption in litres",
          "expr": "90000000 * 1190",
          "display": "9 crore tonnes × 1,190 litres per tonne (density 0.84 kg per litre)",
          "result": 107100000000,
          "unit": "litres per year",
          "carriedForward": "≈ 107 bn litres",
          "uses": [
            "diesel_total",
            "litres_per_tonne"
          ],
          "soWhat": "The trade quotes tonnes and the pump quotes litres. Doing the conversion explicitly rather than reaching for a remembered litre figure keeps the density assumption visible, where it can be challenged."
        },
        {
          "id": "t2",
          "label": "Diesel burned by goods trucks of 7.5 tonnes and above",
          "expr": "107100000000 * 0.3",
          "display": "107 bn litres × 30% attributed to heavy goods vehicles",
          "result": 32130000000,
          "tolerance": 1e-06,
          "unit": "litres per year",
          "carriedForward": "≈ 32 bn litres (3,200 crore litres)",
          "uses": [
            "truck_share_diesel"
          ],
          "soWhat": "The cross-check answer, reached in two lines. Note how little it tells you: it produces a number and no lever, which is why it is a cross-check and not the route you present."
        },
        {
          "id": "t3",
          "label": "Burn per truck implied by the cross-check",
          "expr": "32130000000 / 3200000",
          "display": "32 bn litres ÷ 32 lakh trucks",
          "result": 10040.625,
          "unit": "litres per truck per year",
          "carriedForward": "≈ 10,000 litres a truck a year",
          "uses": [
            "fleet_active"
          ],
          "soWhat": "Ten thousand litres against the duty-cycle model's 12,700. Putting both routes on a per-truck basis is what turns a total disagreement into a located one."
        },
        {
          "id": "t4",
          "label": "Active fleet implied by the cross-check, at the duty-cycle burn rate",
          "expr": "32130000000 / 12717",
          "display": "32 bn litres ÷ 12,717 litres a truck a year",
          "result": 2526539.278131635,
          "tolerance": 1e-06,
          "unit": "trucks",
          "carriedForward": "≈ 25 lakh active trucks",
          "uses": [],
          "soWhat": "Read the cross-check backwards and it stops being a statement about diesel. It says the country has about 25 lakh working trucks, not 32 lakh. The two routes are not arguing about fuel at all — they are arguing about how many trucks are genuinely turning a wheel, and that is a question somebody could go and settle."
        }
      ],
      "answer": "≈ 32 bn litres (3,200 crore litres)",
      "verdict": "40 bn litres against 32 bn — about 27% apart, both firmly at 10^10, which is as close as two genuinely independent routes usually get. Do not average them. First locate the gap: run both through litres per truck and it survives, so the disagreement lives in the fuel model or the fleet, not in a stray multiplication. Then run it backwards, as line t4 does, and it resolves into a single sentence — the cross-check is asserting a 25 lakh working fleet where the duty-cycle build assumed 32 lakh, which is the difference between a twelve-year working life and a fifteen-year one. Now the uncomfortable part, and the reason this cross-check is worth more than most. The primary route multiplies six soft numbers and carries something like ±40%. The cross-check multiplies two, one of which is a genuine anchor, and carries maybe ±25% — so the route you did not build is the tighter one, which inverts the assumption candidates bring into the room. Say that plainly. Keep the built route because it is the only one that tells you which lever to pull, lean on the cross-check when setting the band, and report 32-50 bn litres with 40 as the working figure. And name the one thing that would collapse the whole comparison: if that 30% share includes light commercial vehicles, the comparable figure is nearer 22% and the cross-check drops to 24 bn — a bigger move than anything the two routes are currently disagreeing about."
    },
    "probes": [
      {
        "question": "Where did your 32 lakh trucks come from, and why not the registration figure?",
        "intent": "Whether the candidate knows the difference between a register and a count of what is actually working — and whether they can build a stock out of a flow when no stock is published.",
        "goodAnswer": "Explains the construction in order: about 3 lakh heavy goods vehicles sold a year, a fifteen-year working life, and a haircut because the fleet is the last fifteen years of sales rather than fifteen copies of this year's. Then dismisses the register specifically — it includes light commercial vehicles, nobody deletes a scrapped truck from it, and it is a cumulative record rather than a measurement. Volunteers that this is the softest number in the model and the one the sensitivity runs on.",
        "weakAnswer": "'India has about 1.4 crore registered goods vehicles, so I took a share of that.' The share is then chosen to make the answer look right, which reverses the whole exercise — and the candidate has no way to challenge their own number, because it came from a memory rather than from a construction."
      },
      {
        "question": "Your answer implies trucks take 38% of India's diesel. Published attributions say about 30%. Which one is wrong?",
        "intent": "Whether the candidate can hold their own estimate against a published figure without either capitulating or digging in.",
        "goodAnswer": "Names both possibilities and sizes them. Either the fleet is a fifth too large — plausible, since it rests on three multiplied judgements — or the attribution is stale, since those fuel-use studies are a decade old and heavy freight has grown faster than the diesel pool since. Then adds the point that decides it: whether that 30% includes light commercial vehicles, because if it does the comparable figure is nearer 22% and the published number is the one moving, not mine. Reports 32-50 bn litres either way.",
        "weakAnswer": "'Then I'll take 30%, so about 32 billion litres.' Abandoning a constructed estimate the moment a published number appears means the construction was never load-bearing — and the candidate has not asked the one question that matters, which is what the published number actually counts."
      },
      {
        "question": "Your two routes are 27% apart. Which single number would you go and check?",
        "intent": "Whether the candidate can rank uncertainty by how much it moves the answer rather than by how uncomfortable the number makes them feel.",
        "goodAnswer": "The count of trucks actually working, because the answer scales one-for-one on it and the two routes reconcile at about 25 lakh against my 32 lakh. Adds that the check is tractable — FASTag transaction counts, fitness-certificate renewals or toll-plaza data would all bound the active fleet — and that no amount of checking mileage or annual kilometres could close a 27% gap, because those levers are bounded by the vehicle.",
        "weakAnswer": "'The mileage figure' — the firmest number on the page, set by mass and rolling resistance and barely variable across operators. Candidates reach for it because it is checkable, not because it matters."
      },
      {
        "question": "Defend the 90,000 kilometres. My uncle's truck does two lakh.",
        "intent": "Whether the candidate can size a challenge instead of folding to an anecdote or arguing with it.",
        "goodAnswer": "Concedes the anecdote is real and locates it: a two-driver operation on an expressway corridor, running 500 km a day with minimal detention, which exists and is growing. Then sizes it — those operators are a small share of long-haul today, and if they were half of it the answer would rise about a quarter, still inside the band. Reconstructs the base figure from the clock rather than from memory: 30 to 40 kmph whole-journey average, 300 km a day, 300 working days.",
        "weakAnswer": "Either 'fair enough, let's say 1.5 lakh' — which moves the answer 50% on one anecdote — or a flat refusal. Neither tells the interviewer whether the challenge mattered, which is the only thing the question asked."
      },
      {
        "question": "Expressways are opening and average truck speeds are rising. What happens to your answer?",
        "intent": "Whether the candidate can reason about a change that hits several inputs in different directions, rather than moving one number and stopping.",
        "goodAnswer": "Works through the inputs the change touches. Annual kilometres per truck rise, because a truck covers more ground in the same day. Mileage improves, because steady highway running at constant speed is where a diesel engine is most efficient. The idling uplift falls, because FASTag and fewer checkposts mean less queuing. So fuel per truck goes up while fuel per tonne-kilometre goes down, and the total depends on whether the freight task grows or the same freight is carried by a smaller fleet. Concludes that the question is really about fleet utilisation, not about fuel.",
        "weakAnswer": "'Mileage improves so diesel consumption falls.' One input moved, the rest held frozen, and the largest effect — that faster trucks need fewer trucks, or carry more freight — never considered at all."
      },
      {
        "question": "Now include light commercial vehicles. Does your structure survive?",
        "intent": "Whether the residential of the boundary was a deliberate choice with a size attached, or simply where the candidate happened to stop.",
        "goodAnswer": "Keeps the structure and adds a third duty cycle rather than stretching the existing ones: roughly three times as many vehicles, running perhaps a quarter of the annual kilometres at two to three times the mileage, which lands somewhere near a quarter again on top — call it 10 bn litres and take the total towards 50. Then flags what would break — the fleet construction needs its own sales and life figures, because light commercial vehicles sell in far greater numbers and last fewer years.",
        "weakAnswer": "'It would be a lot higher, since there are many more of them.' A boundary you cannot size is a boundary you did not set, and the answer reveals that the exclusion was an accident rather than a decision."
      }
    ],
    "finalAnswerNumeric": 40000000000,
    "tabLabel": "Truck diesel, India",
    "finalAnswer": "≈ 40 billion litres of diesel a year — 4,000 crore litres, or roughly 3.4 crore tonnes — burned by India's goods trucks of 7.5 tonnes and above",
    "scope": {
      "countingWhat": "Diesel burned in the engines of goods-carrying trucks of 7.5 tonnes gross vehicle weight and above, operating on Indian roads, over one year — including the fuel burned while the vehicle is standing still with the engine running.",
      "unit": "litres of diesel per year",
      "timeBasis": "flow (per year)",
      "geography": "India — national and state highways, plus the city and rural roads at either end of a trip",
      "included": [
        "Rigid trucks from 7.5 tonnes upward and tractor-trailer combinations, hire-and-reward and own-account alike",
        "A cement plant's or a retailer's captive fleet, which is not for hire and burns diesel exactly the same way",
        "Empty return running, which is a quarter of truck-kilometres and produces no freight at all",
        "Fuel burned idling in toll-plaza queues, at mandis, at checkposts and at loading bays, and overnight with the engine on for the cabin",
        "Trucks running on state permits inside one state, not only national-permit long-haul vehicles"
      ],
      "excluded": [
        "Light commercial vehicles below 7.5 tonnes — the Ace-class pickups. They outnumber heavy trucks roughly three to one and would still add maybe a quarter again to the answer, which is exactly why the exclusion has to be stated rather than assumed",
        "Buses and every passenger vehicle, including the diesel cars that used to dominate the segment",
        "Tractors and farm equipment, which are a large diesel user and not trucks",
        "Construction plant and mining dumpers working inside a pit rather than on a road",
        "Railway traction, marine bunkers and standby gensets",
        "Reefer units driven by a separate auxiliary engine — real, and small enough to name and drop",
        "The CNG and LNG truck fleet, which is growing and is currently a low single-digit share of heavy goods vehicles"
      ],
      "boundaryTrap": "'Truck' in Indian usage runs from a one-tonne Ace to a fifty-tonne multi-axle trailer, and the two ends of that range do not belong in the same calculation. Count vehicles and the light end is most of the fleet. Count diesel and it is perhaps a quarter again on top of the heavy fleet — large enough that including it or excluding it changes the answer materially, and quiet enough that nobody notices you never said which you did. Set the boundary by what burns the fuel rather than by what shares the name, say where you drew it, and say roughly what you left outside."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Active goods-truck fleet",
        "expr": "300000 * 15 * 0.7",
        "display": "3 lakh sold a year × 15-year working life × 0.70 fleet-growth haircut",
        "result": 3150000,
        "tolerance": 1e-06,
        "unit": "trucks",
        "carriedForward": "≈ 32 lakh active trucks",
        "uses": [
          "mhcv_sales",
          "truck_life",
          "growth_haircut"
        ],
        "soWhat": "Building a stock from a flow is the move this archetype turns on. There is no census of working trucks, but there is a sales series and a scrappage rule, and those two plus a growth correction give a number you can defend line by line — which the registration total never can."
      },
      {
        "id": "c2",
        "label": "Long-haul trucks",
        "expr": "3200000 * 0.35",
        "display": "32 lakh × 35% long-haul duty",
        "result": 1120000,
        "tolerance": 1e-06,
        "unit": "trucks",
        "carriedForward": "≈ 11.2 lakh",
        "uses": [
          "fleet_active",
          "longhaul_share"
        ],
        "soWhat": "The split has to happen here, before any kilometre figure is applied. Once a single average annual-km number is in the model it cannot be unmixed, and the answer is already wrong by a factor near two."
      },
      {
        "id": "c3",
        "label": "Regional trucks",
        "expr": "3200000 * 0.65",
        "display": "32 lakh × 65% regional duty",
        "result": 2080000,
        "tolerance": 1e-06,
        "unit": "trucks",
        "carriedForward": "≈ 20.8 lakh",
        "uses": [
          "fleet_active",
          "longhaul_share"
        ],
        "soWhat": "Nearly twice as many trucks as the long-haul branch. Hold that ratio in mind, because the fuel total inverts it and you will be asked why."
      },
      {
        "id": "c4",
        "label": "Blended mileage, long-haul",
        "expr": "3.5 * 0.75 + 5.5 * 0.25",
        "display": "3.5 kmpl laden × 75% of km + 5.5 kmpl empty × 25% of km",
        "result": 4,
        "tolerance": 1e-06,
        "unit": "km per litre",
        "carriedForward": "4.0 km per litre",
        "uses": [
          "kmpl_laden_lh",
          "kmpl_empty_lh",
          "empty_share"
        ],
        "soWhat": "Operators quote laden mileage because that is what they negotiate freight rates on, but a quarter of the kilometres in the model are empty ones. Blending raises the mileage and therefore lowers the answer — a correction that moves against the candidate's instinct, which is how you know it was actually applied."
      },
      {
        "id": "c5",
        "label": "Blended mileage, regional",
        "expr": "4.5 * 0.75 + 6.5 * 0.25",
        "display": "4.5 kmpl laden × 75% of km + 6.5 kmpl empty × 25% of km",
        "result": 5,
        "tolerance": 1e-06,
        "unit": "km per litre",
        "carriedForward": "5.0 km per litre",
        "uses": [
          "kmpl_laden_reg",
          "kmpl_empty_reg",
          "empty_share"
        ],
        "soWhat": "Regional trucks get better mileage than long-haul ones despite worse roads and worse traffic, because they weigh a quarter as much. If your model has regional mileage worse than highway mileage, you have reasoned from the road rather than from the vehicle."
      },
      {
        "id": "c6",
        "label": "Long-haul vehicle-kilometres",
        "expr": "1120000 * 90000",
        "display": "11.2 lakh trucks × 90,000 km a year",
        "result": 100800000000,
        "unit": "vehicle-km per year",
        "carriedForward": "≈ 101 bn vehicle-km",
        "uses": [
          "km_longhaul"
        ],
        "soWhat": "The proxy unit finally appears. Everything before this line converts into vehicle-kilometres and everything after it divides them — and that is the whole structural idea being tested."
      },
      {
        "id": "c7",
        "label": "Long-haul running diesel",
        "expr": "100800000000 / 4",
        "display": "101 bn vehicle-km ÷ 4.0 km per litre",
        "result": 25200000000,
        "unit": "litres per year",
        "carriedForward": "≈ 25 bn litres (2,520 crore litres)",
        "uses": [],
        "soWhat": "A third of the fleet has produced two-thirds of the fuel before the regional branch has been touched. Announce sub-totals as you go — an interviewer who stops you at minute nine should still be holding a number."
      },
      {
        "id": "c8",
        "label": "Regional vehicle-kilometres",
        "expr": "2080000 * 30000",
        "display": "20.8 lakh trucks × 30,000 km a year",
        "result": 62400000000,
        "unit": "vehicle-km per year",
        "carriedForward": "≈ 62 bn vehicle-km",
        "uses": [
          "km_regional"
        ],
        "soWhat": "Nearly twice the trucks, under two-thirds the kilometres. The fleet share and the annual-kilometre figure pull against each other, which is precisely why a fleet average of either one is an average of nothing."
      },
      {
        "id": "c9",
        "label": "Regional running diesel",
        "expr": "62400000000 / 5",
        "display": "62 bn vehicle-km ÷ 5.0 km per litre",
        "result": 12480000000,
        "unit": "litres per year",
        "carriedForward": "≈ 12.5 bn litres (1,250 crore litres)",
        "uses": [],
        "soWhat": "Three multipliers all cut the same way in this branch — fewer kilometres, lighter vehicles, better mileage — so two-thirds of the fleet lands at a third of the fuel. Compounding in one direction is the effect candidates consistently under-size."
      },
      {
        "id": "c10",
        "label": "Running diesel, both duty cycles",
        "expr": "25200000000 + 12480000000",
        "display": "25.2 bn litres long-haul + 12.5 bn litres regional",
        "result": 37680000000,
        "unit": "litres per year",
        "carriedForward": "≈ 38 bn litres",
        "uses": [],
        "soWhat": "The fuel burned while actually moving. Keep it separate from the idling uplift so that when the interviewer challenges the idling figure you can show it was a named 8% rather than something smeared through the mileage numbers."
      },
      {
        "id": "c11",
        "label": "Implied annual burn per truck",
        "expr": "37680000000 / 3200000",
        "display": "38 bn litres ÷ 32 lakh trucks",
        "result": 11775,
        "unit": "litres per truck per year",
        "carriedForward": "≈ 11,800 litres, or about 12,700 once idling is added",
        "uses": [
          "fleet_active"
        ],
        "soWhat": "Collapse the model to one defensible sentence before announcing a total: the average Indian goods truck burns around twelve thousand litres of diesel a year, which is roughly forty litres a working day. If that sentence sounds wrong, stop here and rebuild — not after the total."
      },
      {
        "id": "c12",
        "label": "Diesel burned by India's goods trucks in a year",
        "expr": "37680000000 * 1.08",
        "display": "38 bn litres running × 1.08 for idling and auxiliary burn",
        "result": 40694400000,
        "tolerance": 1e-06,
        "unit": "litres per year",
        "carriedForward": "≈ 40 bn litres — report this, not 40.69",
        "uses": [
          "idle_uplift"
        ],
        "soWhat": "The answer. Round to two significant figures, give the band, and name the lever the band comes from before the interviewer has to ask for it."
      }
    ],
    "orderOfMagnitude": "10^10 — tens of billions of litres. Anything between 25 and 60 billion passes the test that actually matters, which is being right to the power of ten.",
    "assumptions": [
      {
        "id": "mhcv_sales",
        "lever": "Annual sales of goods vehicles of 7.5 tonnes and above",
        "value": "≈ 3 lakh units a year",
        "numeric": 300000,
        "unit": "units per year",
        "basis": "published-benchmark",
        "defence": "Medium and heavy commercial vehicle sales are reported monthly by the manufacturers' association and move between roughly 2.5 and 3.5 lakh units across a cycle, with goods vehicles the large majority of that; 3 lakh is the mid-cycle figure, and the mid-cycle figure is the right one because the fleet is fifteen years of sales rather than one.",
        "confidence": "defensible",
        "contestedBy": "An interviewer who remembers a record year will offer 4 lakh, which takes the fleet to 42 lakh and the answer to about 53 bn litres. Concede that the series is cyclical and say you chose mid-cycle deliberately — that is a stronger position than defending the number itself."
      },
      {
        "id": "truck_life",
        "lever": "Years a truck stays in service",
        "value": "15 years",
        "numeric": 15,
        "unit": "years",
        "basis": "published-benchmark",
        "defence": "Commercial vehicles must renew fitness after fifteen years under the scrappage rules, which is the closest thing to a published working life; in practice a truck that stops paying its way on long-haul falls into regional duty rather than being scrapped, so fifteen is conservative as an exit age and generous as an average of useful service.",
        "confidence": "judgement",
        "contestedBy": "Argue 12 years and the fleet falls to 25 lakh and the answer to about 32 bn litres — landing exactly on the diesel-share cross-check. That coincidence is worth noticing out loud and not worth engineering backwards from."
      },
      {
        "id": "growth_haircut",
        "lever": "Fleet-growth haircut on sales × life",
        "value": "0.70",
        "numeric": 0.7,
        "unit": "multiplier",
        "basis": "structural-logic",
        "defence": "The fleet is the last fifteen years of sales, not fifteen copies of this year's. With sales compounding at roughly 6% a year, sales fifteen years ago were about 40% of today's and the fifteen-year average sits near 70% of the current figure.",
        "confidence": "judgement",
        "contestedBy": "A candidate who believes truck sales have been flat drops the haircut altogether, taking the fleet to 45 lakh and the answer to 57 bn litres. The direction of this correction is not arguable for any growing category — only its size is."
      },
      {
        "id": "fleet_active",
        "lever": "Active goods-truck fleet, 7.5 tonnes and above",
        "value": "≈ 32 lakh trucks",
        "numeric": 3200000,
        "unit": "trucks",
        "basis": "declared-judgement",
        "defence": "Not assumed straight — derived from three numbers and then rounded, and called out as a lever in its own right because the answer scales one-for-one on their product, so it carries their errors multiplied rather than averaged. Registered goods vehicles run past a crore; that register includes light vehicles and trucks that stopped running years ago, and nobody deletes a row from it.",
        "confidence": "shaky",
        "contestedBy": "This is the lever the sensitivity grid runs on. Anyone with a view on how many registered trucks are actually turning a wheel this year will move it, and the entire answer moves proportionally with it."
      },
      {
        "id": "longhaul_share",
        "lever": "Share of the fleet in long-haul duty",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of trucks",
        "basis": "observed-behaviour",
        "defence": "National-permit tractor-trailers and multi-axle rigids running trunk routes are a minority of vehicles; the rest of the fleet does mandi, port, plant and city-distribution work inside one state. Roughly a third long-haul is the working split, and the split is visible from any highway dhaba car park.",
        "confidence": "judgement",
        "contestedBy": "Push it to 45% and the answer rises about 14%; drop it to 25% and it falls about the same. The exact split matters less than the fact that the two duty cycles were separated at all — a single blended figure is wrong by a factor of two, not fourteen per cent."
      },
      {
        "id": "km_longhaul",
        "lever": "Annual kilometres, long-haul truck",
        "value": "90,000 km",
        "numeric": 90000,
        "unit": "km per year",
        "basis": "observed-behaviour",
        "defence": "Three hundred kilometres a day for three hundred working days. Indian long-haul averages 30 to 40 kmph on the whole-journey clock once loading detention, checkposts and single-driver rest are counted, so 300 km is a full day's run rather than a slow one.",
        "confidence": "defensible",
        "contestedBy": "Two-driver operations on the new expressway corridors manage 500 km a day and 1.5 lakh km a year. They are a small and growing share; if they were half the long-haul fleet the answer would rise about a quarter."
      },
      {
        "id": "km_regional",
        "lever": "Annual kilometres, regional truck",
        "value": "30,000 km",
        "numeric": 30000,
        "unit": "km per year",
        "basis": "observed-behaviour",
        "defence": "A hundred kilometres a day for three hundred days — two or three short runs with long waits at both ends. What fills a regional truck's day is loading and unloading, not driving, and that is why the figure is a third of long-haul rather than half.",
        "confidence": "defensible",
        "contestedBy": "A range of 25,000 to 40,000 is genuinely arguable and moves the answer by under a tenth, because regional trucks are two-thirds of the fleet and only a third of the fuel."
      },
      {
        "id": "empty_share",
        "lever": "Share of truck-kilometres run empty",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of vehicle-km",
        "basis": "published-benchmark",
        "defence": "Freight flows are directional — a truck carrying cement out of a plant rarely finds a load coming back — and the load-matching that would fix it is only now becoming digital. A quarter of kilometres empty is the conservative read of a problem usually quoted as worse.",
        "confidence": "judgement",
        "contestedBy": "If it is 35%, blended mileage improves and the answer falls about 4%. Empty running is a large industry problem and a small lever in this particular calculation — those two things are easy to confuse, and saying the difference out loud is worth more than the number."
      },
      {
        "id": "kmpl_laden_lh",
        "lever": "Mileage, long-haul truck running laden",
        "value": "3.5 km per litre",
        "numeric": 3.5,
        "unit": "km per litre",
        "basis": "physical-constant",
        "defence": "A forty-tonne combination on a highway at 50 to 60 kmph. This figure is set by mass and rolling resistance rather than by driving style, which is why it varies so little across operators and why it is one of the firmer numbers on the page.",
        "confidence": "defensible",
        "contestedBy": "Newer BS-VI tractors with aerodynamic cabs are claimed at 4.0 to 4.5. They are a minority of the fleet today; if they were half of it the answer would fall about a tenth."
      },
      {
        "id": "kmpl_empty_lh",
        "lever": "Mileage, long-haul truck running empty",
        "value": "5.5 km per litre",
        "numeric": 5.5,
        "unit": "km per litre",
        "basis": "physical-constant",
        "defence": "Take twenty-five tonnes of payload off a forty-tonne combination and fuel burn per kilometre falls by roughly a third — not to zero, because the tractor and trailer still weigh fifteen tonnes and the aerodynamic drag is unchanged.",
        "confidence": "defensible",
        "contestedBy": "Arguing 6.0 moves the blended figure about 3% and the answer by less. What matters about the empty line is that it exists at all, not where exactly it sits."
      },
      {
        "id": "kmpl_laden_reg",
        "lever": "Mileage, regional truck running laden",
        "value": "4.5 km per litre",
        "numeric": 4.5,
        "unit": "km per litre",
        "basis": "physical-constant",
        "defence": "Regional work is done by 9 to 16 tonne rigid trucks rather than forty-tonne combinations, so the vehicle is far lighter even though the stop-start duty cycle is worse. Vehicle size wins over duty cycle here.",
        "confidence": "defensible",
        "contestedBy": "Anyone reasoning only from congestion will argue 3.5 and push the answer up about 8%. Ask them what the truck weighs before conceding — the objection reasons from the road when the binding variable is the vehicle."
      },
      {
        "id": "kmpl_empty_reg",
        "lever": "Mileage, regional truck running empty",
        "value": "6.5 km per litre",
        "numeric": 6.5,
        "unit": "km per litre",
        "basis": "physical-constant",
        "defence": "The same one-third reduction in fuel per kilometre as the long-haul pair, applied to a lighter vehicle. Keeping the two pairs consistent is what makes the duty-cycle comparison mean anything.",
        "confidence": "defensible",
        "contestedBy": "Nothing turns on this one — it moves the answer under 2%. Say so and move on rather than defending it at length, because time spent on an immaterial lever is time the interviewer watches you spend."
      },
      {
        "id": "idle_uplift",
        "lever": "Uplift for fuel burned without moving",
        "value": "+8%",
        "numeric": 1.08,
        "unit": "multiplier",
        "basis": "observed-behaviour",
        "defence": "Two hours a day at roughly two and a half litres an hour is about 1,500 litres a year against 22,500 litres of running fuel for a long-haul truck, which is 7%. Round to 8% to cover cold starts and auxiliary load, and say what the number covers.",
        "confidence": "judgement",
        "contestedBy": "An interviewer may argue that FASTag and the removal of state checkposts have cut this to 4%. That takes about 1.5 bn litres off the answer — worth naming, not worth defending hard, and a good moment to concede cleanly."
      },
      {
        "id": "diesel_total",
        "lever": "India's annual diesel consumption",
        "value": "≈ 9 crore tonnes",
        "numeric": 90000000,
        "unit": "tonnes per year",
        "basis": "published-benchmark",
        "defence": "Diesel is the single largest petroleum product India consumes, at roughly two-fifths of a petroleum basket of around 23 crore tonnes; the petroleum ministry publishes the figure monthly and it has sat near 9 crore tonnes.",
        "confidence": "anchor",
        "contestedBy": "The firmest number in this entry. An interviewer who disputes it is testing whether you will abandon a good figure under pressure, and abandoning it is the wrong answer."
      },
      {
        "id": "litres_per_tonne",
        "lever": "Litres in a tonne of diesel",
        "value": "≈ 1,190 litres",
        "numeric": 1190,
        "unit": "litres per tonne",
        "basis": "physical-constant",
        "defence": "Diesel density is about 0.84 kg per litre, so a tonne is 1,000 ÷ 0.84 ≈ 1,190 litres. Use 1,200 if you are doing it in your head; the difference is under 1%.",
        "confidence": "anchor",
        "contestedBy": "Nothing contests a density. The reason to carry it is that the trade quotes tonnes and the pump quotes litres, so without the conversion no published fuel figure is usable at all."
      },
      {
        "id": "truck_share_diesel",
        "lever": "Share of India's diesel burned by goods trucks of 7.5 tonnes and above",
        "value": "30%",
        "numeric": 0.3,
        "unit": "share of national diesel",
        "basis": "published-benchmark",
        "defence": "Fuel-use attribution studies place commercial goods vehicles near 28 to 30% of diesel, with agriculture, buses, cars, railways, industry and standby gensets taking the rest; 30% is the round figure and deliberately the top of that range, because heavy freight has grown faster than the diesel pool since those studies were run. Illustrative — used here to demonstrate a cross-check, not asserted as verified data.",
        "confidence": "judgement",
        "contestedBy": "The most abusable number on this page is what '30%' includes. If it covers light commercial vehicles as well, the comparable share for heavy trucks alone is nearer 22% and the cross-check falls to 24 bn litres — an ambiguity that swamps every other disagreement between the two routes, and one you should name before you use the figure."
      }
    ],
    "question": "In a year, how much diesel do India's goods trucks burn?",
    "traps": [
      {
        "trap": "Using the registered goods-vehicle count as the fleet.",
        "whyItHappens": "It is the only truck number anyone half-remembers, and it sounds authoritative because it comes from a register. But a vehicle register is a cumulative record with no deletion discipline — trucks that were cut up for scrap a decade ago are still rows in it — and it counts light commercial vehicles alongside forty-tonne trailers. The candidate then applies a heavy-truck duty cycle to a number built mostly from Ace-class pickups, and the error compounds rather than cancels.",
        "fix": "Say 'registered is not running' out loud, then build the stock from a flow you can defend line by line: units sold in a year, a working life, and a correction for the fact that the fleet is growing. Three defensible numbers beat one authoritative-sounding one."
      },
      {
        "trap": "Applying one average annual-kilometre figure to the whole fleet.",
        "whyItHappens": "One average is faster and feels like it arrives in the same place. It does not, because fleet share and annual kilometres are negatively correlated here — the trucks that run the most are the minority — so the fleet average is an average of two populations that share almost nothing. Apply the long-haul figure to everything and the answer roughly doubles; apply the regional figure and it roughly halves. The candidate has made a factor-of-two decision without noticing that a decision was available.",
        "fix": "Split on duty cycle before any kilometre figure enters the model, and say why the split is the structure rather than a refinement. Two duty cycles is enough — the point is that they genuinely differ, not that there are many of them."
      },
      {
        "trap": "Forgetting empty running, or double-counting it.",
        "whyItHappens": "Mileage is quoted laden because laden is what operators negotiate freight rates on, so the number that comes to mind is a laden number. A quarter of Indian truck-kilometres are empty backhauls that burn less per kilometre and still burn. The second half of the trap is subtler: a candidate who remembers empty running sometimes subtracts those kilometres from the annual total and then also improves the mileage, taking credit for the same correction twice.",
        "fix": "Keep every kilometre in the annual figure and put the correction entirely into a blended mileage — laden kmpl weighted by loaded share plus empty kmpl weighted by empty share. State that this makes the answer smaller. A correction that cuts against you is the one an interviewer believes you actually made."
      },
      {
        "trap": "Setting the fleet boundary by vehicle count rather than by fuel burned.",
        "whyItHappens": "Boundaries get drawn where the category name breaks, and 'truck' colloquially includes the one-tonne pickup. Light commercial vehicles outnumber heavy trucks roughly three to one, so a count-driven boundary triples the fleet — and the candidate then runs heavy-truck kilometres and heavy-truck mileage across all of it. The failure is not that the boundary was drawn in the wrong place; it is that it was drawn on the wrong variable.",
        "fix": "Draw every boundary on the quantity being estimated. Ask what each class contributes to litres, not to vehicles, then say what you excluded and roughly what it was worth — here, light commercial vehicles are perhaps a quarter again on top, which is material and must be said."
      },
      {
        "trap": "Treating the cross-check as confirmation because both answers start with a three or a four.",
        "whyItHappens": "Two numbers in the same order of magnitude feel like agreement, and agreement feels like the end of the exercise. But 27% apart is not agreement; it is a located disagreement, and locating it is the most valuable thing the second route produces. Candidates stop because the cross-check was framed in their mind as a formality to be passed rather than an instrument to be read.",
        "fix": "Convert the gap into the single input that would close it — here, a fleet of 25 lakh rather than 32 lakh, which is a twelve-year working life instead of fifteen. Then say which route you trust more and why. A gap you can express as one number you would go and check is a finding; a gap you wave at is an unforced error."
      },
      {
        "trap": "Assuming the route you built yourself is the one to trust.",
        "whyItHappens": "Effort feels like evidence. The duty-cycle build took eleven lines and real structural thought, so it feels more earned than a two-line share calculation. But error compounds with every multiplication: six soft numbers carry far more uncertainty than two, one of which is a genuine published anchor. The candidate defends the route they are proud of instead of the one that is tighter.",
        "fix": "Count the soft multiplications in each route before deciding which sets the band. Present the built route, because it is the only one that identifies a lever — but let the tighter route pull the band, and say out loud that you are doing so."
      },
      {
        "trap": "Reporting the answer in litres, tonnes or rupees without saying which.",
        "whyItHappens": "Diesel is burned in litres, traded in tonnes, taxed per litre and budgeted in rupees, and the three differ by factors of roughly 1,190 and 90. Mid-answer a candidate reaches for whichever unit the last number happened to be in, and a three-order-of-magnitude slip passes without either party noticing until the sanity check fails for a reason nobody can find.",
        "fix": "Declare the unit in the scope statement, carry it on every line, and give the other two as translations at the end: 40 bn litres, about 3.4 crore tonnes, roughly ₹3.6 lakh crore at the pump."
      }
    ],
    "teachingPoint": "A consumable is never counted directly. It is counted through the physical thing that consumes it, and the whole difficulty of this question is choosing that proxy — not trucks, and not tonnes of freight, but vehicle-kilometres, the one unit a fleet number and a fuel rate will both attach to. Once you are in vehicle-kilometres the rest is a division. The second half of the lesson is that the fleet does not have an average duty cycle: long-haul trucks run three times the annual kilometres of regional ones, so applying either figure to the whole fleet moves the answer by roughly a factor of two in a direction most candidates never notice they chose."
  },
  {
    "timeboxMinutes": 12,
    "sensitivity": {
      "assumptionId": "a_var_cost",
      "whyThisLever": "It is the only number here that is simultaneously large, load-bearing and genuinely unknown. The rate is published. The seat count is printed in the tender. The fixed base you can count — forty centres, forty leases. The probabilities are judgements, but the answer barely notices them: halve the win probability from 30% to 15% and the expected value is still positive at about ₹0.34 crore, because the hurdle is only 10%. Variable cost per trainee is different in kind. It is a forecast of your own operating performance three years out, at a volume you have not run, in districts where you have not mobilised, and it enters the model as a subtraction from a price you cannot move. If this answer is wrong, it is wrong here.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "₹10,000 per trainee — mobilisation at ₹3,000 rather than ₹2,000",
          "answer": "−₹0.24 crore — the bid destroys value",
          "deltaVsBase": "−119%"
        },
        {
          "scenario": "Base",
          "leverValue": "₹9,000 per trainee",
          "answer": "+₹1.27 crore",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "₹8,000 per trainee — batches of 30 rather than 25, assessment fees contracted for the full term",
          "answer": "+₹2.78 crore",
          "deltaVsBase": "+119%"
        }
      ],
      "breakpoint": "The bid stops being worth making at a variable cost of about ₹9,840 per trainee — a contribution of ₹5,160 and an overrun of 9% on the ₹9,000 estimate. Nine per cent is well inside the ordinary error of a cost forecast for an operation you have not yet run, so the honest thing to say is that the sign of this answer is not safe. Hold it against the win probability, where the breakpoint is 10% against an assumed 30%: you would have to be wrong there by a factor of three before it changed anything. Two levers, both judgements, and only one of them can break the decision. Say which one, and the interviewer stops testing whether you understand your own model.",
      "oneLiner": "It is worth roughly ₹1.3 crore of expected value, and all of that sits on delivering a trainee for ₹9,000 — at ₹9,850 the bid is worth nothing, and I have never run this volume in these districts."
    },
    "number": "09",
    "difficulty": "Medium",
    "id": "tender-bid-expected-value",
    "archetype": "expected-value",
    "routeChoice": {
      "chosen": "Probabilistic",
      "why": "The question is not how big this contract is, it is whether this bid is worth making, and the two have different answers. The contract earns ₹12 crore if the districts fill and loses ₹2.4 crore if they do not, so no single point estimate of its value can tell you whether to spend ₹60 lakh chasing it. Build the outcomes as branches, put a probability on each, and two things become visible that a point estimate hides: the dispersion, and the fact that one branch is negative. Then the bid cost is subtracted once at the root, because it is spent in every branch. Say the structure out loud before any arithmetic — win or lose, then fill or under-fill — and the interviewer knows in fifteen seconds that you understood the question.",
      "rejectedRoute": "Bottom-up",
      "rejectedWhyNot": "Bottom-up here means building the contract's economics from the ground up — 60,000 trainees, ₹15,000 each, ₹90 crore of revenue, ₹12 crore of profit — and it is what most candidates produce in four minutes. The arithmetic is right and it answers a question nobody asked. It contains no probability, so there is nothing in it to set against the ₹60 lakh you must spend for a 30% shot; it produces one number where the decision turns on two outcomes of opposite sign; and it makes the loss-making branch invisible, because an average of ₹12 crore and −₹2.4 crore never appears anywhere in it. Bottom-up is the right route for sizing the prize. It is the wrong route for pricing the bet, and this question is a bet."
    },
    "sanityChecks": [
      "The estate and the volume must describe the same thing. Forty centres, four classrooms each, thirty seats a room, four batches a year comes to 19,200 seats a year against a target of 20,000. The ₹8 crore of fixed cost and the 20,000 trainees are two views of one physical operation, and if they had not matched, one of them was invented rather than estimated.",
      "Margin shape: ₹12 crore on ₹90 crore is 13% across three years, roughly 4% a year on revenue. Government skills contracts are thin-margin, high-volume, slow-paying businesses and that is what 4% looks like. A model returning a 30% margin would be describing corporate training sold to employers, not a state tender, and the error would be in the price, not the arithmetic.",
      "Bid cost against prize: ₹60 lakh to compete for ₹90 crore is 0.67% of contract value, which is where bid costs on large services tenders sit — somewhere between half a per cent and two per cent. If yours came out near ₹6 crore, you have put the refundable earnest money into it, and the check catches the error in five seconds.",
      "Loss tolerance, which the expected value never tells you: the worst leaf is a ₹2.4 crore operating loss plus ₹60 lakh of bid cost, and it arrives with probability 0.30 × 0.40, about one in eight. Three crore rupees against a firm turning over ₹40 crore a year is most of a year's profit. A one-in-eight chance of that is a board conversation, not an arithmetic result, and a candidate who reports the ₹1.27 crore without reporting the 12% has answered only half the question.",
      "Discounting, named rather than skipped: the surplus arrives across three years and the three-year annuity factor at 12% is about 2.4 against an undiscounted 3. That cuts the high branch from ₹12 crore to roughly ₹9.6 crore and the expected value of the bid from ₹1.27 crore to about ₹0.9 crore. Material, not decisive — and saying so takes ten seconds, while quietly ignoring it costs you the marks whichever way the number lands.",
      "Payment timing, which is what actually kills training companies and appears nowhere in the expected value: the state pays on certification and on verified placement, commonly two to four quarters after the cost is incurred. At 20,000 trainees a year and ₹9,000 of cost each, a two-quarter lag ties up around ₹9 crore of working capital against a ₹1.27 crore expected return. If you say one thing beyond your number, say this one."
    ],
    "answerBand": "−₹0.3 crore to +₹2.8 crore on the cost lever alone — a band that contains zero, and that is the finding rather than a weakness in it. At the price you would have to quote to win, the same contract is worth about −₹1.4 crore.",
    "tree": {
      "root": "Expected value of submitting the bid",
      "rootFormula": "= P(win) × Expected value of the contract if won − Cost of competing, spent either way",
      "value": "≈ +₹1.27 crore",
      "branches": [
        {
          "label": "You win the tender — 30%",
          "formula": "0.30 × ₹6.24 crore",
          "value": "+₹1.87 crore, weighted",
          "note": "The only branch with any value in it, and it splits again immediately. A tree that stops at win-or-lose has one layer too few — the interesting uncertainty is not whether you get the contract, it is whether the contract is any good once you have it.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Enrolment holds — 60% of this branch",
              "formula": "(60,000 trainees × ₹6,000 contribution) − ₹24 crore fixed",
              "value": "+₹12.0 crore",
              "note": "₹36 crore of contribution against a ₹24 crore fixed base. A 13% margin over three years, which is what a well-run government training contract looks like — not a spectacular outcome, the good one."
            },
            {
              "label": "Enrolment disappoints — 40% of this branch",
              "formula": "(36,000 trainees × ₹6,000 contribution) − ₹24 crore fixed",
              "value": "−₹2.4 crore",
              "note": "A 40% shortfall in seats does not cut the profit by 40%. It turns ₹12 crore of profit into ₹2.4 crore of loss, because the fixed base does not shrink when a district under-enrols. This is the branch the question exists to make you find."
            },
            {
              "label": "Probability-weighted value of the contract",
              "formula": "(0.60 × 12.0) + (0.40 × −2.4)",
              "value": "+₹6.24 crore",
              "note": "Just over half the upside. A contract you would describe in a meeting as 'worth ₹12 crore' is worth ₹6.24 crore the moment you price the branch where the seats do not fill."
            }
          ]
        },
        {
          "label": "You lose the tender — 70%",
          "formula": "0.70 × ₹0",
          "value": "₹0 from the contract",
          "note": "Zero, not negative. The bid money has already left and is accounted for at the root, so putting it here as well would charge it twice.",
          "children": [
            {
              "label": "What comes back",
              "value": "₹2 crore of earnest money, in full, within about six months of the award",
              "note": "Refundable. This is the line candidates turn into a ₹2 crore cost, and the error is large enough to reverse the recommendation on its own."
            },
            {
              "label": "What does not come back",
              "value": "₹60 lakh of bid preparation",
              "note": "Seven times in ten this is the entire outcome of the exercise. Any framing in which the bid cost only appears on the winning branch has understated it by a factor of more than three."
            }
          ]
        },
        {
          "label": "Cost of competing — incurred in every branch",
          "formula": "= Proposal team + Centre readiness + Legal + Travel + Earnest-money carry",
          "value": "−₹0.60 crore",
          "note": "Because this money is spent whether you win or lose, it sits outside the probability weighting and is subtracted once at the root. Build it from components rather than asserting a round number — 'bid costs are about ₹50 lakh' is a figure an interviewer cannot argue with and therefore cannot give you credit for.",
          "children": [
            {
              "label": "Proposal team",
              "formula": "6 people × 8 weeks, loaded",
              "value": "₹25 lakh",
              "note": "The largest line, and the one whose true cost is not the salary but what those eight weeks would otherwise have produced."
            },
            {
              "label": "Centre readiness and inspection",
              "value": "₹14 lakh",
              "note": "Forty sites documented, photographed and brought to inspection standard before a rupee of revenue exists."
            },
            {
              "label": "Legal, compliance and due diligence",
              "value": "₹6 lakh",
              "note": "Cheap relative to the penalty clauses it reads."
            },
            {
              "label": "Travel and pre-bid meetings",
              "value": "₹5 lakh",
              "note": "Across the district cluster, over two months."
            },
            {
              "label": "Earnest-money carry",
              "formula": "₹2 crore × 10% a year × 6 months",
              "value": "₹10 lakh",
              "note": "The whole of what the ₹2 crore costs you. Get this line right and the rest of the question becomes arithmetic; get it wrong and no amount of careful weighting downstream will save the answer."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Price-to-win cross-check — can you win at the price you just assumed?",
      "route": "Top-down",
      "premise": "The primary route held the price at the published ceiling and treated a 30% chance of winning as a fact about the world. It is not. In a competitive tender the price and the probability are the same variable: you win when you have bid low, so the branch in which you get the contract is systematically the branch in which you have given margin away. This route runs the question backwards from the market rather than forwards from your own costs — how many firms clear the gate, how far below the ceiling the winning bid has historically landed, and therefore what you would actually be charging. It shares no probability, no cost and no volume with the first route except the ones the tender itself fixes.",
      "lines": [
        {
          "id": "t1",
          "label": "Expected winning discount to the ceiling",
          "expr": "0.14 * 6 / 7",
          "display": "14% top of the observed range × 6 bidders ÷ 7 — the expected largest of six draws spread evenly across a range",
          "result": 0.12,
          "tolerance": 1e-06,
          "unit": "share below ceiling",
          "carriedForward": "≈ 12%",
          "uses": [
            "a_discount_range",
            "a_bidders"
          ],
          "soWhat": "The winner is not the average bidder, it is the most aggressive one. With six bidders the expected winning discount sits six-sevenths of the way up the range, not halfway. That single fraction is the winner's curse in one line, and it is the thing the first route never looked at."
        },
        {
          "id": "t2",
          "label": "Price you would have to quote to win",
          "expr": "15000 * (1 - 0.12)",
          "display": "₹15,000 ceiling × (1 − 12% expected winning discount)",
          "result": 13200,
          "tolerance": 1e-06,
          "unit": "₹ per trainee",
          "carriedForward": "≈ ₹13,200",
          "uses": [
            "a_rate"
          ],
          "soWhat": "This is the price at which a 30% chance of winning is real rather than assumed. The ₹15,000 used in the first route was the ceiling, not a price, and quoting the ceiling in a competitive tender is a decision to lose taken in advance."
        },
        {
          "id": "t3",
          "label": "Contribution per trainee at the winning price",
          "expr": "13200 - 9000",
          "display": "₹13,200 winning price − ₹9,000 variable cost",
          "result": 4200,
          "unit": "₹ per trainee",
          "uses": [
            "a_var_cost"
          ],
          "soWhat": "A 12% cut in price took 30% off the contribution. Discounts come out of margin, never out of cost, so on a thin contract there is no such thing as a small price concession — and that ratio, 12 becoming 30, is worth memorising for every pricing case you will ever see."
        },
        {
          "id": "t4",
          "label": "High-enrolment outcome at the winning price",
          "expr": "60000 * 4200 - 240000000",
          "display": "(60,000 × ₹4,200) − ₹24 crore fixed = ₹25.2 crore − ₹24 crore",
          "result": 12000000,
          "unit": "₹ over three years",
          "carriedForward": "₹1.2 crore",
          "uses": [
            "a_target",
            "a_fixed"
          ],
          "soWhat": "The good branch has gone from ₹12 crore to ₹1.2 crore. Every rupee you were going to earn on this contract was sitting in the 12% you had to give away to get it — three years of forty centres for a margin under 2%."
        },
        {
          "id": "t5",
          "label": "Low-enrolment outcome at the winning price",
          "expr": "36000 * 4200 - 240000000",
          "display": "(36,000 × ₹4,200) − ₹24 crore fixed = ₹15.1 crore − ₹24 crore",
          "result": -88800000,
          "unit": "₹ over three years",
          "carriedForward": "−₹8.9 crore",
          "uses": [
            "a_low_fill",
            "a_fixed"
          ],
          "soWhat": "The bad branch has gone from a ₹2.4 crore loss to an ₹8.9 crore one, larger than two years of the firm's profit. This is the point at which a bid decision stops being an investment appraisal and becomes a question for the board."
        },
        {
          "id": "t6",
          "label": "Expected contract value at the winning price",
          "expr": "0.6 * 12000000 + 0.4 * (-88800000)",
          "display": "(60% × ₹1.2 crore) + (40% × −₹8.9 crore)",
          "result": -28320000,
          "tolerance": 1e-06,
          "unit": "₹ over three years",
          "carriedForward": "−₹2.83 crore",
          "uses": [
            "a_p_high"
          ],
          "soWhat": "Negative before you have spent a rupee on the bid. Same trainees, same costs, same probabilities — one price assumption changed, and the contract you were competing for is now one you should hope to lose."
        },
        {
          "id": "t7",
          "label": "Expected value of the bid at the price to win",
          "expr": "0.3 * (-28320000) - 6000000",
          "display": "(30% × −₹2.83 crore) − ₹60 lakh spent whatever happens",
          "result": -14496000,
          "tolerance": 1e-06,
          "unit": "₹",
          "carriedForward": "≈ −₹1.45 crore",
          "uses": [
            "a_p_win",
            "a_bid_cash"
          ],
          "soWhat": "Put the two answers side by side before you say anything else: +₹1.27 crore and −₹1.45 crore, the same contract, opposite signs, ₹2.7 crore apart."
        }
      ],
      "answer": "≈ −₹1.45 crore at the price that actually wins, against +₹1.27 crore at the ceiling rate — the same contract, opposite signs",
      "verdict": "These two routes do not disagree about arithmetic. They disagree about whether the price is yours to choose, and the whole ₹2.7 crore gap is that one assumption. The first route is what a careful candidate produces when win probability is treated as exogenous — a number sitting on a price you would not get. The second prices the correlation: you win when you have bid low, so the winning branch is structurally the thin-margin branch. Resolve it by solving for the price at which the bid breaks even rather than by splitting the difference. That price is about ₹14,160, a discount of 5.6% to the ceiling. Then ask what that discount buys you against five rivals drawing anywhere up to 14%: the chance all five bid less aggressively is roughly 0.4 to the fifth power, about one in a hundred. There is no price at which both routes are satisfied, and that is the finding — at your price you will not win, and at the winning price you should not want to. The useful move is structural rather than numerical. Convert the fixed base to a variable one: rent classrooms by the batch and contract trainers per cohort instead of holding forty leases for three years, and the ₹24 crore fixed falls to roughly ₹14 crore. Rerun it at the winning price of ₹13,200 and the branches are +₹11.2 crore and +₹1.1 crore — the loss-making branch disappears entirely, the expected value of the bid lands near +₹1.5 crore, and it lands there without assuming you get to charge more than the market will pay. That is the answer: bid, but not with this delivery model."
    },
    "probes": [
      {
        "question": "What would have to be true for you not to bid?",
        "intent": "Whether you know your own breakpoint or only your own answer. A candidate who worked a template cannot answer this, because the template never asked which number was load-bearing.",
        "goodAnswer": "Cost per trainee above about ₹9,840 — a 9% overrun on my ₹9,000, which is well inside the error of a forecast for districts I have not operated in. That is the one lever that flips the sign on its own. The win probability cannot do it: the hurdle is 10% and I have assumed 30%, so I would have to be wrong by a factor of three. The other way not to bid is structural rather than numerical — if the state will not move the enrolment target and I cannot variabilise the delivery base, the price I need to win makes the contract negative whatever my costs do.",
        "weakAnswer": "'If the probability of winning were much lower' — which sounds like sensitivity analysis and is the one lever the answer is robust to, so it tells the interviewer you have not run the grid."
      },
      {
        "question": "Our finance director says the cost of bidding is ₹2.6 crore, not ₹60 lakh. Who is right?",
        "intent": "Whether you can hold a boundary under pressure from a senior person who is wrong, which is most of consulting.",
        "goodAnswer": "The difference is the ₹2 crore of earnest money, and it is refundable — it comes back within about six months whether we win or lose. It is working capital tied up, not money spent, so the cost is the carry: ₹2 crore at 10% for half a year, about ₹10 lakh, which is already inside my ₹60 lakh. It matters because at ₹2.6 crore the expected value is −₹0.73 crore and we walk away from a positive-value bid. If he means the cash has to be arranged, that is a real constraint and a separate question from whether it is a cost.",
        "weakAnswer": "Recomputing with ₹2.6 crore because the finance director said so — or conceding the point without noticing that it reverses the recommendation."
      },
      {
        "question": "Suppose we bid, we lose, and the ₹60 lakh is gone. Was bidding a mistake?",
        "intent": "Whether you can separate a decision from its outcome. This is the probe that most often exposes a candidate who produced the right number without understanding what a probability is.",
        "goodAnswer": "No. Seven times in ten that is exactly what happens, and the decision priced it: I needed a 10% chance to justify ₹60 lakh and I judged 30%. Losing tells me nothing about whether the judgement was sound. What I would review is the inputs, not the result — was the discount we quoted consistent with the 30% we claimed, and did the winning rate land where the cross-check said it would. If the winner came in 18% below ceiling rather than 12%, my range was wrong and the next bid needs a different price, not a different attitude.",
        "weakAnswer": "'In hindsight we should not have bid' — judging a decision by its outcome, which guarantees that the firm stops taking positive-value bets after every ordinary loss."
      },
      {
        "question": "A competitor is expected to quote ₹11,000. Do we match?",
        "intent": "Whether you treat a rival's price as information or as an instruction. Also whether you can say no to winning.",
        "goodAnswer": "No. At ₹11,000 the contribution is ₹2,000 a trainee, so even at full enrolment the contract is ₹12 crore of contribution against ₹24 crore of fixed cost — a ₹12 crore loss in the branch where everything goes right. Matching is not a competitive response, it is buying the loss. The useful question is what they know that I do not. Either their centres are already built because they hold the incumbent contract and their fixed base is sunk, or their variable cost is genuinely lower on batch size, or they have mispriced. The first two are reasons I cannot match. The third is a reason I should not want to.",
        "weakAnswer": "'We match to stay in the game', or matching and then finding savings — which is deciding the price first and discovering the cost afterwards, and it is how training companies fail."
      },
      {
        "question": "The state offers to raise the ceiling to ₹17,000 but halve the contract to 30,000 trainees. Take it?",
        "intent": "Whether the tree is a live model or a finished sum, and whether you know which of your costs are per-centre and which are per-contract.",
        "goodAnswer": "Yes, and for the risk rather than the return. Contribution rises to ₹8,000, so the high branch is 30,000 × ₹8,000, ₹24 crore of contribution. Fixed cost does not halve — twenty centres instead of forty, but the state-level compliance team, MIS and audit are per-contract — so call it ₹5 crore a year rather than ₹8, ₹15 crore across the term. The high branch becomes ₹9 crore and the low branch −₹0.6 crore instead of −₹2.4 crore, giving an expected value near ₹0.95 crore. Lower than ₹1.27 crore, but the worst outcome has shrunk by three-quarters. For a firm turning over ₹40 crore, that trade is worth taking.",
        "weakAnswer": "'Yes, the rate is higher' — or 'no, the contract is smaller'. Both answer on one variable, and both miss that the fixed cost is the thing that does not halve."
      },
      {
        "question": "You are the state. How would you write this tender to get better bids?",
        "intent": "Whether you understood the mechanism you just modelled well enough to run it backwards. The strongest candidates find this easy and it separates them sharply.",
        "goodAnswer": "Three changes, each aimed at a specific thing in my model. Publish block-level demand data, because the 40% chance of under-enrolment is the largest uncertainty in my tree and every bidder is pricing it with a padding factor the state pays for. Split the payment so a mobilisation-linked component carries part of the enrolment risk, which turns my −₹2.4 crore branch into something closer to breakeven and lets me bid lower. And score on quality as well as price rather than awarding to the lowest rate, because a pure price auction selects the bidder who has most underestimated the cost — and that bidder is the one who abandons centres in year two.",
        "weakAnswer": "'Invite more bidders to increase competition' — more draws raises the expected winning discount and sharpens the winner's curse, which lowers the price and lowers the delivery quality the state is actually buying."
      }
    ],
    "finalAnswerNumeric": 12720000,
    "tabLabel": "Tender bid, expected value",
    "finalAnswer": "≈ +₹1.3 crore of expected value at the ceiling rate — positive, and thin. A 9% overrun on the cost per trainee takes it to zero, and at the discount you would need to actually win the tender it is worth about −₹1.4 crore. So the honest recommendation is conditional rather than yes: bid only after converting the fixed delivery base to a variable one, which holds the expected value near +₹1.5 crore even at the winning price.",
    "scope": {
      "countingWhat": "The expected value, in rupees, of the decision to submit one bid — the probability-weighted profit from the three-year contract, net of every rupee spent competing for it, assessed at the moment the decision is taken and before anything is known.",
      "unit": "₹ of expected value on the bid decision",
      "timeBasis": "stock (point in time)",
      "geography": "One district cluster tendered by a state skills mission in India. CohortWorks, the mission and every term of the tender are fictional — written for this question, not drawn from any live procurement. The figures are illustrative, built to show the method clearly, not asserted as market data.",
      "included": [
        "Contribution from the contract across all three years, in both the high-enrolment and the low-enrolment outcome",
        "The fixed delivery base — centres, supervision, compliance — which the contract forces you to carry whether the seats fill or not",
        "Cash spent preparing and submitting the bid, which is gone whichever way the award goes",
        "The carrying cost of the earnest money for the six months it sits with the state"
      ],
      "excluded": [
        "The ₹2 crore earnest money itself, which is refunded — only its carrying cost is a cost",
        "The performance bank guarantee principal, on the same reasoning",
        "The option value of incumbency in the next tender cycle — real, and named rather than guessed at, because a number here would be invented",
        "Contribution forgone on the corporate pipeline while the proposal team is diverted — sized separately at roughly ₹45 lakh, and held outside the base case so the interviewer can see it move",
        "Discounting. The surplus arrives across three years and a 12% rate would cut the answer by about a third — stated here rather than quietly skipped, and checked at the end"
      ],
      "boundaryTrap": "The earnest money. Two crore rupees leaves the firm's account to accompany the bid, and it comes back within about six months whether you win or lose. It is working capital tied up, not money spent. What it costs you is the carry on ₹2 crore for half a year — roughly ₹10 lakh. Candidates who load the full ₹2 crore into the bid cost arrive at ₹2.6 crore of cost, conclude the bid destroys value, and believe they have found something. They have found a cash outflow and called it a cost. The mirror error sits right next to it: the ₹60 lakh that is genuinely spent is gone in all seven cases out of ten where you lose, and a candidate who quietly assumes it is recoverable has removed the only thing making this a decision."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Contract revenue at full enrolment",
        "expr": "60000 * 15000",
        "display": "60,000 trainees × ₹15,000 per certified trainee",
        "result": 900000000,
        "unit": "₹ over three years",
        "carriedForward": "₹90 crore",
        "uses": [
          "a_target",
          "a_rate"
        ],
        "soWhat": "Size the prize before you price the bet. Ninety crore of top line against ₹60 lakh of bid cost is a ratio of 150 to 1, and that ratio already tells you the bid is probably worth making. The real question is not what this contract pays. It is what it costs to deliver."
      },
      {
        "id": "c2",
        "label": "Contribution per trainee",
        "expr": "15000 - 9000",
        "display": "₹15,000 rate − ₹9,000 variable cost",
        "result": 6000,
        "unit": "₹ per trainee",
        "uses": [
          "a_rate",
          "a_var_cost"
        ],
        "soWhat": "This six thousand is the entire model. Everything downstream is this number multiplied by a headcount — and it is also the number with the least evidence behind it, which is an uncomfortable pairing worth naming while you write it."
      },
      {
        "id": "c3",
        "label": "Fixed delivery cost across the term",
        "expr": "80000000 * 3",
        "display": "₹8 crore a year × 3 years",
        "result": 240000000,
        "unit": "₹ over three years",
        "carriedForward": "₹24 crore",
        "uses": [
          "a_fixed",
          "a_years"
        ],
        "soWhat": "Forty centres do not close because a district under-enrols. This is the number that turns a thin contract into a loss-making one, and a bottom-up revenue build never surfaces it at all."
      },
      {
        "id": "c4",
        "label": "Surplus if you win and enrolment holds",
        "expr": "60000 * 6000 - 240000000",
        "display": "(60,000 × ₹6,000) − ₹24 crore fixed = ₹36 crore − ₹24 crore",
        "result": 120000000,
        "unit": "₹ over three years",
        "carriedForward": "₹12 crore",
        "uses": [
          "a_target"
        ],
        "soWhat": "Twelve crore on ₹90 crore of revenue is a 13% margin over three years, or about 4% a year. For a government training contract that is a good outcome rather than a remarkable one — and remember this is the branch where everything went right."
      },
      {
        "id": "c5",
        "label": "Trainees actually enrolled in the low case",
        "expr": "60000 * 0.6",
        "display": "60,000 sanctioned seats × 60% fill",
        "result": 36000,
        "tolerance": 1e-06,
        "unit": "trainees",
        "uses": [
          "a_target",
          "a_low_fill"
        ],
        "soWhat": "The seats are sanctioned by the state; the candidates have to be found, counselled and kept. Separating the two is the point of this line — you are not modelling your own execution here, you are modelling demand in a block you have never operated in."
      },
      {
        "id": "c6",
        "label": "Outcome if you win and enrolment disappoints",
        "expr": "36000 * 6000 - 240000000",
        "display": "(36,000 × ₹6,000) − ₹24 crore fixed = ₹21.6 crore − ₹24 crore",
        "result": -24000000,
        "unit": "₹ over three years",
        "carriedForward": "−₹2.4 crore",
        "uses": [
          "a_low_fill",
          "a_fixed"
        ],
        "soWhat": "Forty per cent fewer trainees does not mean 40% less profit. It means a ₹12 crore profit becomes a ₹2.4 crore loss — a swing of ₹14.4 crore off a revenue shortfall of ₹21.6 crore. That is operating leverage, and it is the whole reason this tree has a second layer."
      },
      {
        "id": "c7",
        "label": "Expected value of the contract, given you win",
        "expr": "0.6 * 120000000 + 0.4 * (-24000000)",
        "display": "(60% × ₹12.0 crore) + (40% × −₹2.4 crore)",
        "result": 62400000,
        "tolerance": 1e-06,
        "unit": "₹ over three years",
        "carriedForward": "₹6.24 crore",
        "uses": [
          "a_p_high"
        ],
        "soWhat": "Say this out loud, because it is the sentence that separates you from the candidate who sized the contract: a contract everyone in the room would call 'a ₹12 crore contract' is worth ₹6.24 crore once the branch where the seats do not fill is priced rather than ignored."
      },
      {
        "id": "c8",
        "label": "Carrying cost of the earnest money",
        "expr": "20000000 * 0.10 * 0.5",
        "display": "₹2 crore earnest money × 10% a year × 6 months",
        "result": 1000000,
        "tolerance": 1e-06,
        "unit": "₹",
        "carriedForward": "₹10 lakh",
        "uses": [
          "a_emd",
          "a_cost_of_funds"
        ],
        "soWhat": "The ₹2 crore is not a cost — it comes back. Ten lakh of carry is the cost. This one line is worth more than any other correction in the question, because the error it prevents is twenty times its own size and points the recommendation the wrong way."
      },
      {
        "id": "c9",
        "label": "Cost of competing, spent whether you win or lose",
        "expr": "2500000 + 1400000 + 600000 + 500000 + 1000000",
        "display": "₹25 lakh proposal team + ₹14 lakh centre readiness + ₹6 lakh legal + ₹5 lakh travel + ₹10 lakh earnest-money carry",
        "result": 6000000,
        "unit": "₹",
        "carriedForward": "₹60 lakh",
        "uses": [
          "a_bid_cash",
          "a_emd",
          "a_cost_of_funds"
        ],
        "soWhat": "Five components, none of them arguable on its own. An asserted round number invites the interviewer to substitute their own; a built one moves the conversation to which line they disagree with, which is a conversation you can win."
      },
      {
        "id": "c10",
        "label": "Breakeven probability of winning",
        "expr": "6000000 / 62400000",
        "display": "₹60 lakh cost of competing ÷ ₹6.24 crore expected contract value",
        "result": 0.0962,
        "tolerance": 0.005,
        "unit": "probability",
        "carriedForward": "≈ 10%",
        "uses": [
          "a_bid_cash"
        ],
        "soWhat": "Compute the hurdle before you compute the answer. You need roughly a one-in-ten chance of winning for the ₹60 lakh to be worth spending, and you have assumed 30% — three times the hurdle. That reframes the whole decision: whether you will win is not the fragile part of this. Whether the contract is worth having if you do is."
      },
      {
        "id": "c11",
        "label": "Expected value of the bid decision",
        "expr": "0.3 * 62400000 - 6000000",
        "display": "(30% × ₹6.24 crore) − ₹60 lakh spent whatever happens",
        "result": 12720000,
        "tolerance": 1e-06,
        "unit": "₹",
        "carriedForward": "≈ +₹1.3 crore",
        "uses": [
          "a_p_win",
          "a_bid_cash"
        ],
        "soWhat": "Positive, so on this arithmetic you bid. Now look at the size rather than the sign: ₹1.27 crore of expected value against ₹90 crore of contract revenue is a 1.4% expected return on the top line, thin enough that one assumption can carry it through zero. Which assumption, and by how much, is the only interesting question left."
      }
    ],
    "orderOfMagnitude": "10^7 — crores, not tens of crores. The bid is worth roughly a tenth of what the contract is worth, and getting that ratio right matters more than the figure.",
    "assumptions": [
      {
        "id": "a_target",
        "lever": "Sanctioned seats across the three-year term",
        "value": "60,000 trainees",
        "numeric": 60000,
        "unit": "trainees over three years",
        "basis": "published-benchmark",
        "defence": "The tender document prints the sanctioned seat count — 20,000 a year for three years — so this is given rather than estimated, and a minute spent defending it is a minute taken from the numbers that are actually contested.",
        "confidence": "anchor"
      },
      {
        "id": "a_rate",
        "lever": "Ceiling rate per certified trainee",
        "value": "₹15,000",
        "numeric": 15000,
        "unit": "₹ per trainee",
        "basis": "published-benchmark",
        "defence": "Government vocational rates are published per training hour by trade category and sit near ₹40 to ₹50 an hour, so a 300 to 350 hour course prices between ₹12,000 and ₹18,000 — ₹15,000 is the middle of the published band.",
        "confidence": "defensible",
        "contestedBy": "An interviewer will point out that this is the ceiling and not the price you will get to charge. That objection is correct, it is the single most important thing anyone can say about this answer, and it is the entire subject of the cross-check below."
      },
      {
        "id": "a_var_cost",
        "lever": "Variable cost per trainee delivered",
        "value": "₹9,000",
        "numeric": 9000,
        "unit": "₹ per trainee",
        "basis": "structural-logic",
        "defence": "Built rather than asserted: ₹4,000 of trainer time spread across a batch of 25, ₹1,500 of assessment and certification fees paid through to the awarding body, ₹1,500 of kit and consumables, and ₹2,000 of mobilisation — the counsellor payment it takes to find a candidate in a rural block and keep them through the course.",
        "confidence": "judgement",
        "contestedBy": "Mobilisation is the contested line. Firms who have actually run these contracts will tell you ₹2,000 is optimistic and the working figure is nearer ₹3,500. That correction alone takes the decision through zero, which is why it is the lever the sensitivity grid runs on."
      },
      {
        "id": "a_fixed",
        "lever": "Fixed delivery cost per year",
        "value": "₹8 crore",
        "numeric": 80000000,
        "unit": "₹ per year",
        "basis": "structural-logic",
        "defence": "Forty centres at roughly ₹12 lakh a year each for rent, utilities and a centre manager comes to ₹4.8 crore, plus ₹3.2 crore of regional supervision, MIS, third-party audit and the state-level compliance team the contract obliges you to staff.",
        "confidence": "defensible",
        "contestedBy": "A franchise-led model pushes most of this into the variable line — you pay partners per certified trainee instead of holding forty leases. It changes the shape of the whole answer and it is the recommendation the cross-check ends on."
      },
      {
        "id": "a_years",
        "lever": "Contract term",
        "value": "3 years",
        "numeric": 3,
        "unit": "years",
        "basis": "structural-logic",
        "defence": "Stated in the tender. It matters for one reason worth saying out loud: the fixed base is carried for all three years whether the seats fill or not, so the term multiplies the downside as faithfully as it multiplies the upside.",
        "confidence": "anchor"
      },
      {
        "id": "a_p_win",
        "lever": "Probability of winning the tender",
        "value": "30%",
        "numeric": 0.3,
        "unit": "probability",
        "basis": "declared-judgement",
        "defence": "Six firms typically clear technical prequalification on a contract this size, which makes the naive prior one in six, or 17%. Lift it to 30% because CohortWorks delivered two districts of the previous cycle and scores near the top of the technical gate, so the real contest is three-way rather than six-way.",
        "confidence": "judgement",
        "contestedBy": "Anyone who has watched these tenders will say 30% is generous for a firm that is not the incumbent. Halve it to 15% and the expected value is still positive at about ₹0.34 crore — that reply is worth more than defending the 30%."
      },
      {
        "id": "a_p_high",
        "lever": "Probability that enrolment holds, given you win",
        "value": "60%",
        "numeric": 0.6,
        "unit": "probability",
        "basis": "declared-judgement",
        "defence": "Two of the previous cycle's three district clusters filled their sanctioned seats and one did not. That is a sample of three, it is openly a sample of three, and it is precisely why this branch carries a probability rather than a forecast.",
        "confidence": "judgement"
      },
      {
        "id": "a_low_fill",
        "lever": "Seat fill in the low-enrolment outcome",
        "value": "60% of target",
        "numeric": 0.6,
        "unit": "share of sanctioned seats",
        "basis": "observed-behaviour",
        "defence": "Under-enrolment in rural vocational programmes is a demand problem in the district, not a delivery problem in your centres — candidates enrol, take the stipend, and leave for wage work when sowing starts. A 40% shortfall is the ordinary bad year, not the disaster.",
        "confidence": "judgement",
        "contestedBy": "The genuine disaster case is 40% fill, which takes the low branch from a ₹2.4 crore loss to a ₹9.6 crore one and makes the bid a solvency question rather than an investment one."
      },
      {
        "id": "a_bid_cash",
        "lever": "Cash cost of preparing and submitting the bid",
        "value": "₹50 lakh",
        "numeric": 5000000,
        "unit": "₹",
        "basis": "declared-judgement",
        "defence": "Four lines, each separately defensible: ₹25 lakh of loaded senior time for a six-person proposal team over eight weeks, ₹14 lakh to get forty centres documented and inspection-ready, ₹6 lakh of legal and due-diligence review, and ₹5 lakh of travel and pre-bid meetings across the districts.",
        "confidence": "judgement",
        "contestedBy": "It excludes what the proposal team would otherwise have done. If those eight weeks would have closed ₹1.5 crore of corporate training at 30% contribution, the true cost of competing is nearer ₹95 lakh and the expected value falls from ₹1.27 crore to about ₹0.82 crore."
      },
      {
        "id": "a_emd",
        "lever": "Earnest money deposited with the bid",
        "value": "₹2 crore, refundable",
        "numeric": 20000000,
        "unit": "₹",
        "basis": "structural-logic",
        "defence": "Earnest money on a services tender runs near 2% of contract value and is returned to unsuccessful bidders once the award is published. It is working capital tied up, not money spent, and that distinction is the whole of this question's boundary.",
        "confidence": "anchor"
      },
      {
        "id": "a_cost_of_funds",
        "lever": "Cost of funds",
        "value": "10% a year",
        "numeric": 0.1,
        "unit": "per year",
        "basis": "published-benchmark",
        "defence": "A mid-sized services firm borrows working capital somewhere near 10 to 12%; take the low end, because the figure is only carrying ₹2 crore for six months and precision here buys nothing.",
        "confidence": "defensible"
      },
      {
        "id": "a_bidders",
        "lever": "Firms clearing the technical gate",
        "value": "6",
        "numeric": 6,
        "unit": "bidders",
        "basis": "observed-behaviour",
        "defence": "Prequalification on a contract this size screens on turnover, prior volume delivered and owned centre infrastructure — a filter that leaves five to eight national and regional players, not the thirty firms who collect the tender document.",
        "confidence": "judgement"
      },
      {
        "id": "a_discount_range",
        "lever": "Top of the discount-to-ceiling range",
        "value": "14%",
        "numeric": 0.14,
        "unit": "share below the ceiling rate",
        "basis": "observed-behaviour",
        "defence": "The previous cycle's published award rates ran from the ceiling down to roughly 14% below it, spread across the range rather than clustered at either end — so treat the spread as flat between zero and 14% and take the expected maximum of six draws, not the average.",
        "confidence": "judgement",
        "contestedBy": "If the spread is wider than 14%, the cross-check gets worse rather than better. There is no version of this in which the winner's curse works in your favour, which is what makes it a curse."
      }
    ],
    "question": "CohortWorks, a vocational training firm, can bid for a three-year state skills contract worth ₹90 crore. The bid costs ₹60 lakh to prepare and is lost if the firm does not win. Is the bid worth making?",
    "traps": [
      {
        "trap": "Putting the ₹2 crore earnest money into the cost of bidding.",
        "whyItHappens": "The money genuinely leaves the account, and the mind does not distinguish a cash outflow from a cost when both look identical on a bank statement. Under time pressure everything that moves out gets subtracted, and the deposit is the largest number on the page, so it dominates whatever it is added to.",
        "fix": "Ask of every outflow whether it comes back. Earnest money does, in full, within about six months. What it costs is the carry — ₹2 crore at 10% for half a year, ₹10 lakh. Get this wrong and your bid cost is ₹2.6 crore rather than ₹60 lakh, the expected value swings from +₹1.27 crore to −₹0.73 crore, and you recommend against a bid on the strength of an accounting error."
      },
      {
        "trap": "Computing what the contract is worth instead of what the bid is worth.",
        "whyItHappens": "Sizing is the reflex every guesstimate has trained, and the contract is the object in the prompt with numbers attached to it. So the candidate builds ₹90 crore of revenue, ₹12 crore of profit, and stops — having produced a correct answer to a question that was not asked.",
        "fix": "Write the decision at the top of the page before any arithmetic: bid, or do not bid. Then every number has to earn its place by changing that decision. The contract's ₹12 crore is an input to the bid's ₹1.27 crore, and the distance between the two is the probability of winning and the branch where you win and wish you had not."
      },
      {
        "trap": "Letting the fixed cost scale with enrolment.",
        "whyItHappens": "Once you have written a cost per trainee, the mind treats all cost as per-trainee, because that is the shape the first calculation established. Then the low-enrolment branch is computed as 60% of the good branch — a smaller profit rather than a loss — and the branch that makes the question interesting quietly disappears.",
        "fix": "Split cost into what the trainee triggers and what the contract commits you to, and do it before you compute either branch. Forty leases, forty centre managers and a compliance team are committed for three years. Here that split is the difference between a ₹7 crore low case and a −₹2.4 crore one, and only one of those is the truth."
      },
      {
        "trap": "Holding your price fixed while treating the win probability as given.",
        "whyItHappens": "The two numbers arrive from different places — the price from the tender document, the probability from a judgement about the field — so they feel independent. They are not. You win when your bid was the aggressive one, which means the winning branch is systematically the branch where you gave margin away. Any model that fixes one and assumes the other has already answered the question wrongly.",
        "fix": "Quote a probability and a price as a pair, never separately: 'a 30% chance at ₹13,200, or a 5% chance at ₹14,900.' Then rerun the tree at the price that earns the probability you claimed. Here that moves the answer from +₹1.27 crore to −₹1.45 crore, and finding it is worth more than the original calculation was."
      },
      {
        "trap": "Subtracting the bid cost only from the winning branch.",
        "whyItHappens": "The tree is drawn win-first and the costs are written into the branch being worked on. The losing branch gets a zero, because nothing happens on it — except that ₹60 lakh has already been spent, and nothing happening is exactly what makes it a loss.",
        "fix": "Charge the bid cost once at the root, outside the probability weighting, because it is incurred in every state of the world. Charging it only on the 30% branch prices it at ₹18 lakh instead of ₹60 lakh and overstates the answer by ₹42 lakh — a third of the whole result, lost to a diagram drawn in the wrong order."
      },
      {
        "trap": "Stopping at 'the expected value is positive, so we bid.'",
        "whyItHappens": "Expected value is what the question appeared to ask for, and once a positive number exists the analysis feels complete. But an expected value is an average over outcomes the firm experiences one at a time, and it says nothing about whether the firm survives the bad one.",
        "fix": "Report the distribution alongside the mean in one sentence: 'Positive expected value of ₹1.27 crore, with a one-in-eight chance of losing ₹3 crore against a firm doing ₹40 crore a year.' Then give the recommendation the risk warrants — bid, with the enrolment target negotiated at the pre-bid meeting and the delivery base variabilised. A number is not a recommendation, and the gap between them is where the marks are."
      }
    ],
    "teachingPoint": "An expected-value question is not a sizing question in disguise, and most candidates fail it by answering the wrong one — asked whether to bid, they compute what the contract is worth. The contract is worth ₹12 crore if it goes well. The bid is worth ₹1.3 crore, because you win it three times in ten and you pay to enter whatever happens. Two moves separate a good answer from a competent one. Put probabilities on branches that differ in sign rather than in size — the branch where you win and cannot fill the seats is the reason this question exists at all. Then refuse to hold your price constant while treating your chance of winning as given: in a competitive tender those are the same variable, and a bet priced without its odds has not been priced."
  },
  {
    "timeboxMinutes": 8,
    "sensitivity": {
      "assumptionId": "a_heavy_rate",
      "whyThisLever": "It is the largest single number in the answer and the least observable one. The heavy tier is a quarter of the cohort carrying 8,400 cups — 37% of the total — and four cups a day is a memory of a canteen, not a count of anything. Every other candidate lever is either steadier or smaller: the staff and faculty rates are tied to a shift roster, the headcounts are structural, and the visitor stream cannot move the total by more than a per cent however hard you push it. If this answer is wrong, this is where it went wrong.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "3 cups per day",
          "answer": "≈ 20,800 cups a week",
          "deltaVsBase": "−9%"
        },
        {
          "scenario": "Base",
          "leverValue": "4 cups per day",
          "answer": "≈ 22,900 cups a week",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "6 cups per day",
          "answer": "≈ 27,100 cups a week",
          "deltaVsBase": "+18%"
        }
      ],
      "breakpoint": "On this lever alone the answer only leaves the 18,000 to 28,000 band if the heavy tier is taking seven or more cups a day — 2,200 cups a day out of 300 people, which describes someone who lives at the counter rather than attends classes. Within any range you could defend out loud, the order of magnitude does not move. That is precisely what multi-stream aggregation buys you, and it is the argument for building it this way: four streams with independent errors, none of which can break the total on its own. A single-average model has no such protection — one wrong number there moves the whole answer proportionally.",
      "oneLiner": "Call it 23,000 a week, and it hangs mainly on four cups a day for the heaviest quarter of the cohort — three takes it to 21,000, six takes it to 27,000, and nothing else I have assumed moves it by more than a tenth."
    },
    "number": "10",
    "difficulty": "Easy",
    "id": "campus-chai",
    "archetype": "closed-population",
    "routeChoice": {
      "chosen": "Bottom-up",
      "why": "The population is closed and countable — 1,200 students in the prompt, a faculty roll, a staff roster — and the whole answer turns on rates that differ sharply between those groups. So build the streams separately, price each at its own rate, and sum. Everything you need is visible by standing in the place for a day, which is precisely the condition under which bottom-up beats every alternative.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "The top-down route is national tea consumption per head — roughly 800 g of leaf a year — scaled to 1,490 people on site and divided by 52. It produces a number, and the number is low by about a factor of three, because the national average is built from a population that includes infants, the coffee-drinking South and rural households brewing weak tea at home. An adult residential campus with a subsidised counter and a night stall does not resemble it. Top-down works when your sub-population looks like the whole; here you would import a constant that describes somebody else and then have no honest way to argue the correction factor. When the population is small, closed and unlike the national average, the national average is not data — it is a distraction."
    },
    "sanityChecks": [
      "Per head, the test that matters: 22,920 cups across the 1,490 people on site is 15 cups a head a week, a shade over two a day. Hold that against your own memory of a campus. Three a day and you have built a teahouse; one a day and you have built an office block.",
      "Physically: 22,920 ÷ 7 is about 3,300 cups a day. At 100 ml a cup that is roughly 330 litres of chai, or one 20-litre urn emptied every hour across a sixteen-hour serving day. A campus with a canteen, a mess counter, a pantry and a night stall clears that without strain. A single kettle could not, and if your answer implied one could, the answer was wrong.",
      "Against procurement: at roughly 3 g of leaf a cup, 22,920 cups is about 69 kg of tea a week — call it 3.6 tonnes a year, or 2.4 kg per person on site. India's per-capita consumption runs near 800 g a year, so this campus is at three times the national rate. For adults, urban, residential and with a subsidised counter, against a national average that includes infants and the coffee-drinking South, three times is the right direction and a defensible size. Thirty times would have told you something was broken.",
      "The vacation test: strip out the students and you are left with 5,070 cups, the campus running on staff alone. If your tree cannot produce that second number in ten seconds, it was not built as a tree — it was built as one long multiplication with headings.",
      "Shape check: students 78%, staff 16%, faculty 6%, visitors under 1%. State the shares, not only the total. An interviewer who disagrees with your answer usually disagrees with one share, and the shares are how they tell you which."
    ],
    "answerBand": "18,000 – 28,000 cups per week",
    "tree": {
      "root": "Cups of chai served on campus in one term-time week",
      "rootFormula": "= Student stream + Support-staff stream + Faculty stream + Visitor stream",
      "value": "≈ 22,900 cups",
      "branches": [
        {
          "label": "Student stream",
          "formula": "= (Tier headcount × cups per day), summed, × 7 days",
          "value": "17,850 cups — 78% of the answer",
          "note": "Segmented by drinking intensity, not by year or section. Demographics do not predict tea; habit does.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Heavy tier — 25% of the cohort",
              "formula": "300 students × 4 cups × 7 days",
              "value": "8,400 cups",
              "note": "Thirty-seven per cent of the whole answer sits in a quarter of the cohort. Every question the interviewer asks about your number will land here."
            },
            {
              "label": "Moderate tier — 50% of the cohort",
              "formula": "600 students × 2 cups × 7 days",
              "value": "8,400 cups",
              "note": "Two cups is the number of times a day tea is put in front of you on an Indian campus without your having to go and look for it."
            },
            {
              "label": "Light and non-drinking tier — 25% of the cohort",
              "formula": "300 students × 0.5 cups × 7 days",
              "value": "1,050 cups",
              "note": "Coffee drinkers and abstainers still take the courtesy cup. Half a cup a day is the honest way to write 'not zero, but close'."
            }
          ]
        },
        {
          "label": "Support-staff stream",
          "formula": "200 staff × 3 cups × 6 days",
          "value": "3,600 cups — 16% of the answer",
          "note": "Bigger than the faculty stream by a factor of nearly three, and the stream candidates are most likely to omit entirely.",
          "children": [
            {
              "label": "Heads on site, not heads on payroll",
              "value": "200 staff",
              "note": "Housekeeping, mess, security, grounds, library, IT and administration. Outsourced staff drink the same tea as direct staff — count the people, not the contracts."
            },
            {
              "label": "Chai as the shift break",
              "value": "3 cups per shift",
              "note": "For staff the cup is the break itself: the morning one, the afternoon one, and the one that marks the end of the shift. That makes this the steadiest rate in the model."
            }
          ]
        },
        {
          "label": "Faculty stream",
          "formula": "90 faculty × 3 cups × 5 days",
          "value": "1,350 cups — 6% of the answer",
          "note": "Small, but it costs ten seconds to include and its absence is visible in your tree.",
          "children": [
            {
              "label": "Faculty headcount at roughly 1:15",
              "value": "90 faculty",
              "note": "A regulated postgraduate management programme runs near a 1:15 ratio, which puts 1,200 students at 80 to 100 faculty."
            },
            {
              "label": "Five-day presence",
              "value": "5 days",
              "note": "Teaching and office hours cluster Monday to Friday. This is the only stream that genuinely runs on a working week."
            }
          ]
        },
        {
          "label": "Visitor stream",
          "formula": "60 visitor-days × 2 cups",
          "value": "120 cups — under 1% of the answer",
          "note": "Named, sized, and then set aside — it sits inside the rounding error on everything above it. Saying that out loud is worth more marks than the cups are worth."
        }
      ]
    },
    "triangulation": {
      "label": "Supply-side cross-check — count the taps, not the drinkers",
      "route": "Bottom-up",
      "premise": "The demand route counted people and asked how much each drinks. This route ignores people entirely and counts serving points: every place on campus where tea is physically poured, its opening hours, and its average throughput. It is genuinely independent — it shares no assumption with the first route except the student headcount, and a candidate who has never met this cohort could still run it by walking the campus once.",
      "lines": [
        {
          "id": "t1",
          "label": "Canteen counter, cups per day",
          "expr": "14 * 80",
          "display": "14 serving hours × 80 cups per hour",
          "result": 1120,
          "unit": "cups per day",
          "uses": [
            "a_canteen_hours",
            "a_canteen_rate"
          ],
          "soWhat": "The hourly rate must be a day-average, not the queue you remember. Estimating throughput from memory is estimating it at peak."
        },
        {
          "id": "t2",
          "label": "Mess tea urns, cups per day",
          "expr": "2 * 750",
          "display": "2 sittings × 750 cups per sitting",
          "result": 1500,
          "unit": "cups per day",
          "uses": [
            "a_mess_sittings",
            "a_mess_cups"
          ],
          "soWhat": "The largest single outlet, and the only one where the tea is pushed at people rather than queued for. Push beats pull on volume."
        },
        {
          "id": "t3",
          "label": "Night stall, cups per day",
          "expr": "5 * 90",
          "display": "5 hours × 90 cups per hour",
          "result": 450,
          "unit": "cups per day",
          "uses": [
            "a_night_hours",
            "a_night_rate"
          ],
          "soWhat": "Fourteen per cent of daily supply from five hours of a twenty-four-hour day. The heavy tier from the first route is standing here."
        },
        {
          "id": "t4",
          "label": "In-room kettles, cups per day",
          "expr": "1200 * 0.15 * 1",
          "display": "1,200 students × 15% brewing in room × 1 cup",
          "result": 180,
          "unit": "cups per day",
          "uses": [
            "a_students",
            "a_kettle_share",
            "a_kettle_rate"
          ],
          "soWhat": "Easy to forget because it has no counter and no queue. A supply route that only counts commercial outlets undercounts a closed residential population."
        },
        {
          "id": "t5",
          "label": "Seven-day outlets, cups per week",
          "expr": "(1120 + 1500 + 450 + 180) * 7",
          "display": "(1,120 + 1,500 + 450 + 180) cups per day × 7 days",
          "result": 22750,
          "unit": "cups per week",
          "carriedForward": "≈ 22,800 cups",
          "uses": [
            "a_outlet_days"
          ],
          "soWhat": "Four outlets that serve residents run every day of the week. Give each stream its own day count or the whole route inherits one wrong calendar."
        },
        {
          "id": "t6",
          "label": "Academic-block pantry, cups per week",
          "expr": "9 * 40 * 6",
          "display": "9 hours × 40 cups per hour × 6 days",
          "result": 2160,
          "unit": "cups per week",
          "uses": [
            "a_pantry_hours",
            "a_pantry_rate",
            "a_pantry_days"
          ],
          "soWhat": "The one outlet on the teaching calendar rather than the hostel calendar — six days, not seven."
        },
        {
          "id": "t7",
          "label": "Supply-side total",
          "expr": "22750 + 2160",
          "display": "22,750 residential outlets + 2,160 academic block",
          "result": 24910,
          "unit": "cups per week",
          "carriedForward": "≈ 25,000 cups a week",
          "uses": [],
          "soWhat": "Compare to 22,920 from the demand route before you decide which one you believe."
        }
      ],
      "answer": "≈ 25,000 cups a week, against ≈ 23,000 from the demand route — about 9% apart",
      "verdict": "Nine per cent apart on a question this soft is agreement, and you should say so rather than pretending either figure is the truth. The supply route runs high, and it runs high for a reason worth naming: an outlet's average hourly throughput is a number you reconstruct from memory of standing in the queue, and you only stand in the queue when there is one. That bias is systematic, not random, so take the demand route as the point estimate. The more useful output of the cross-check is not the second number but the width of the gap — two honest routes differing by a tenth is the evidence for quoting a band of 18,000 to 28,000 rather than a point. If the two routes had differed by a factor of three, the instruction would be the opposite: stop, and go find the stream one of them is missing."
    },
    "probes": [
      {
        "question": "Which of your numbers is doing the most work?",
        "intent": "Whether you know where your own answer comes from, or only how to produce one. Candidates who have followed a template cannot answer this, because the template never told them.",
        "goodAnswer": "The heavy tier's rate. Three hundred students at four cups a day is 8,400 cups, 37% of the total, and four is a judgement rather than an observation. Take it to three and the answer falls 9%; take it to six and it rises 18%. Nothing else I assumed moves the total by more than a tenth, and the visitor stream cannot move it by more than one per cent however hard you push.",
        "weakAnswer": "'All of them matter', or naming the 1,200 — which is the one number handed to you and therefore the only one that cannot be wrong."
      },
      {
        "question": "It is placement week. What changes?",
        "intent": "Whether the tree is a live model or a finished sum. A model answers the second question in seconds; a sum has to be rebuilt.",
        "goodAnswer": "Three things move together. Visitor-days jump from 60 to maybe 200, the night stall runs longer, and the heavy tier widens as the cohort sleeps less. The visitor jump is worth about 280 cups, barely one per cent — it is the behaviour shift that matters. Push the heavy tier to six cups and the week is nearer 27,500. So placement week is the top of my band, not a different question, and that is the useful thing to say.",
        "weakAnswer": "'It goes up a lot' — a direction with no magnitude, and no statement of which stream carries the increase."
      },
      {
        "question": "The campus caterer says they pour 30,000 a week. Are you wrong?",
        "intent": "Whether an external figure makes you abandon your method or interrogate the boundary. This is the probe that separates a candidate who understands their own model from one who was reciting it.",
        "goodAnswer": "Thirty thousand is 31% above me, which is inside the range I would expect two honest counts to differ by — but I would look at the boundary before I moved a single assumption. A caterer counts cups poured, which includes the ones left half-drunk, the urn dregs and every cup at events I scoped out as non-typical. If the same contractor also runs the stall at the gate, that alone closes most of the gap. I would revise to about 26,000 and say precisely which assumption I moved and why.",
        "weakAnswer": "'Then I will use their number', which throws away the method for an unexamined figure — or defending 22,920 as though it had been measured."
      },
      {
        "question": "Size this for a 400-student campus instead.",
        "intent": "Whether the tree scales or has to be rebuilt, and whether you can tell a variable stream from a fixed one. This is the same distinction that decides every cost case you will see later.",
        "goodAnswer": "The student stream scales with headcount — a third of 17,850 is about 5,950. The other streams do not scale linearly, because a campus needs a security roster, a mess and an administration whatever its size: 200 staff might fall to 90, not to 67. Total lands near 9,000 to 10,000, and the per-head rate rises, because the fixed streams are now spread across fewer people. That last point is the interesting one — smaller campus, more cups per head.",
        "weakAnswer": "'Divide everything by three', which assumes every stream is proportional to student count when none of the non-student ones is."
      },
      {
        "question": "How would you check this in an afternoon?",
        "intent": "Whether you can convert an estimate into a measurement plan. In practice this is what a client is paying for — the estimate is only what you do before the data arrives.",
        "goodAnswer": "Two routes and I would rank them. Read the procurement ledger first: one week of tea-leaf and milk purchases gives the total with no behavioural assumption in it at all, and it takes twenty minutes. If that is not available, count from the supply side — stand at the canteen counter for three fifteen-minute blocks at different times of day and scale, which tests the throughput assumption directly and tells me whether my 80 cups an hour was a peak figure in disguise.",
        "weakAnswer": "'Run a survey' — self-reported cup counts are the least reliable input available and the slowest to collect, and nobody remembers how many cups they had on Tuesday."
      },
      {
        "question": "Your two routes are 9% apart. Which do you believe?",
        "intent": "Whether you can reason about the direction of your own error rather than splitting the difference, which is the reflex answer and the wrong one.",
        "goodAnswer": "The demand route, and for a stated reason: the supply route's error is systematic and upward. Hourly throughput at an outlet is reconstructed from memory, and you only remember the counter when there was a queue, so 80 cups an hour is a peak dressed up as an average. The demand route's errors are more symmetric — I could be wrong about the tier mix in either direction. So I take 23,000 as the point and use the gap to set the band.",
        "weakAnswer": "'I would average them to 24,000' — which treats a known directional bias as though it were random noise, and quietly bakes the bias into the answer instead of correcting for it."
      }
    ],
    "finalAnswerNumeric": 23000,
    "tabLabel": "Campus chai, weekly",
    "finalAnswer": "≈ 23,000 cups of chai a week on an ordinary term-time week — call it 18,000 to 28,000, or roughly 3,300 cups a day",
    "scope": {
      "countingWhat": "Individual cups of chai — tea brewed with milk, served hot — poured by campus outlets to anyone on site during one ordinary term-time week.",
      "unit": "cups per week",
      "timeBasis": "flow (per week)",
      "geography": "A single residential postgraduate campus in India, 1,200 students living on site, one academic block, one mess, a canteen and a late-night stall. The campus is illustrative — built to show the method clearly, not drawn from any named institution.",
      "included": [
        "Students, faculty, support staff and day visitors — everyone physically on site",
        "The canteen counter, the mess tea urns, the academic-block pantry and the late-night stall",
        "Tea brewed in hostel rooms on personal kettles",
        "Tea poured at meetings, guest lectures and recruiter visits in an ordinary week"
      ],
      "excluded": [
        "Chai bought at the stalls outside the gate, even when the drinker lives on campus",
        "Coffee, green tea, black tea without milk, and packaged cold tea",
        "Exam week, placement week and festival week — this is a typical week, and the answer says so",
        "Vacation weeks, when the student stream collapses and the question becomes a different one"
      ],
      "boundaryTrap": "The question asks what the campus gets through — that is cups served on campus, not cups drunk by people who belong to the campus. The stall fifty metres outside the gate serves this population all day and falls outside the boundary; the tea poured for a visiting recruiter falls inside it, though the recruiter belongs to nobody here. The two readings differ by something like a fifth. Either is defensible. Answering without naming which one you took is not."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Heavy-tier students",
        "expr": "1200 * 0.25",
        "display": "1,200 students × 25% heavy tier",
        "result": 300,
        "unit": "students",
        "uses": [
          "a_students",
          "a_heavy_share"
        ],
        "soWhat": "Fix the headcount of each tier before you touch a rate. Doing it in this order means the interviewer's challenge lands on one number rather than on a tangle of two."
      },
      {
        "id": "c2",
        "label": "Moderate-tier students",
        "expr": "1200 * 0.5",
        "display": "1,200 students × 50% moderate tier",
        "result": 600,
        "unit": "students",
        "uses": [
          "a_students",
          "a_mod_share"
        ],
        "soWhat": "The median student sits here. If your mix put the median in the heavy tier, you have described a canteen queue rather than a cohort."
      },
      {
        "id": "c3",
        "label": "Light and non-drinking students",
        "expr": "1200 * 0.25",
        "display": "1,200 students × 25% light tier",
        "result": 300,
        "unit": "students",
        "uses": [
          "a_students",
          "a_light_share"
        ],
        "soWhat": "Do not set this tier to zero. Some of them take the courtesy cup, and writing zero is a claim you cannot defend when it costs nothing to write 0.5."
      },
      {
        "id": "c4",
        "label": "Student cups per day",
        "expr": "300 * 4 + 600 * 2 + 300 * 0.5",
        "display": "(300 × 4) + (600 × 2) + (300 × 0.5) = 1,200 + 1,200 + 150",
        "result": 2550,
        "unit": "cups per day",
        "uses": [
          "a_heavy_rate",
          "a_mod_rate",
          "a_light_rate"
        ],
        "soWhat": "Read the three terms aloud: a quarter of the cohort drinks as much as half of it. That asymmetry is the whole reason for segmenting, and it is invisible the moment you use one blended rate."
      },
      {
        "id": "c5",
        "label": "Reverse check on the dominant stream",
        "expr": "2550 / 1200",
        "display": "2,550 cups ÷ 1,200 students",
        "result": 2.125,
        "unit": "cups per student per day",
        "carriedForward": "≈ 2.1 cups per student per day",
        "uses": [],
        "soWhat": "Run this before you go any further. Two cups a day is a student you can picture. Had the tier mix produced five, you would have built a teahouse with a syllabus attached, and the error would have been buried in the total forever."
      },
      {
        "id": "c6",
        "label": "Student cups per week",
        "expr": "2550 * 7",
        "display": "2,550 cups per day × 7 days",
        "result": 17850,
        "unit": "cups per week",
        "carriedForward": "≈ 17,900 cups",
        "uses": [
          "a_days_student"
        ],
        "soWhat": "Seven, not five. This is the single most common arithmetic slip on a residential question, and it quietly removes 5,100 cups."
      },
      {
        "id": "c7",
        "label": "Faculty cups per week",
        "expr": "90 * 3 * 5",
        "display": "90 faculty × 3 cups × 5 days",
        "result": 1350,
        "unit": "cups per week",
        "uses": [
          "a_faculty",
          "a_faculty_rate",
          "a_faculty_days"
        ],
        "soWhat": "Small in absolute terms. Included because a tree that stops at students is not a tree of the campus, and the interviewer can see the gap."
      },
      {
        "id": "c8",
        "label": "Support-staff cups per week",
        "expr": "200 * 3 * 6",
        "display": "200 staff × 3 cups × 6 days",
        "result": 3600,
        "unit": "cups per week",
        "uses": [
          "a_staff",
          "a_staff_rate",
          "a_staff_days"
        ],
        "soWhat": "Nearly three times the faculty stream, and the one most candidates never write down. The people who make the tea also drink it."
      },
      {
        "id": "c9",
        "label": "Visitor cups per week",
        "expr": "60 * 2",
        "display": "60 visitor-days × 2 cups",
        "result": 120,
        "unit": "cups per week",
        "uses": [
          "a_visitor_days",
          "a_visitor_rate"
        ],
        "soWhat": "Half a per cent of the answer. Size it, say it is inside the rounding error, and move on — that sentence is the point of the line, not the 120."
      },
      {
        "id": "c10",
        "label": "Non-student streams combined",
        "expr": "1350 + 3600 + 120",
        "display": "1,350 faculty + 3,600 staff + 120 visitors",
        "result": 5070,
        "unit": "cups per week",
        "carriedForward": "≈ 5,100 cups",
        "uses": [],
        "soWhat": "Say this number out loud: 5,070 cups, 22% of the answer, from the people the prompt never mentioned. It is also the vacation-week answer, which is a second result for no extra work."
      },
      {
        "id": "c11",
        "label": "Total cups per week",
        "expr": "17850 + 5070",
        "display": "17,850 students + 5,070 everyone else",
        "result": 22920,
        "unit": "cups per week",
        "carriedForward": "≈ 23,000 cups a week",
        "uses": [],
        "soWhat": "Round it before you say it. Every input was a judgement to one significant figure, so quoting 22,920 claims a precision the chain cannot carry."
      }
    ],
    "orderOfMagnitude": "10^4",
    "assumptions": [
      {
        "id": "a_students",
        "lever": "Students living on campus",
        "value": "1,200",
        "numeric": 1200,
        "unit": "students",
        "basis": "structural-logic",
        "defence": "The prompt supplies it — the one number here you do not have to defend, so do not spend a second of your eight minutes on it.",
        "confidence": "anchor"
      },
      {
        "id": "a_heavy_share",
        "lever": "Heavy-drinking share of students",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of students",
        "basis": "observed-behaviour",
        "defence": "Walk past the canteen at any hour of the day and roughly the same quarter of the cohort is standing there — the night-before-submission crowd is a stable minority, not the median student.",
        "confidence": "judgement",
        "contestedBy": "An interviewer may argue the coffee-drinking share is larger and push ten points of the cohort from the heavy tier into the light tier; that cuts about 2,900 cups, or 13%."
      },
      {
        "id": "a_mod_share",
        "lever": "Moderate-drinking share of students",
        "value": "50%",
        "numeric": 0.5,
        "unit": "share of students",
        "basis": "declared-judgement",
        "defence": "Half the cohort takes tea at the two fixed social occasions — the morning one and the evening one — and rarely outside them.",
        "confidence": "judgement"
      },
      {
        "id": "a_light_share",
        "lever": "Light and non-drinking share of students",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of students",
        "basis": "structural-logic",
        "defence": "Forced by the other two shares — the three tiers must sum to the cohort, which is the reason for declaring the mix before pricing any of it.",
        "confidence": "defensible"
      },
      {
        "id": "a_heavy_rate",
        "lever": "Cups per day, heavy tier",
        "value": "4 cups",
        "numeric": 4,
        "unit": "cups per student per day",
        "basis": "observed-behaviour",
        "defence": "One with breakfast, one mid-morning between sessions, one at the four o'clock break, one after dinner — four is the ritual count on a residential campus, not a heroic one.",
        "confidence": "judgement",
        "contestedBy": "Six is defensible in placement season or the week before end-terms, which lifts the total by about 18%."
      },
      {
        "id": "a_mod_rate",
        "lever": "Cups per day, moderate tier",
        "value": "2 cups",
        "numeric": 2,
        "unit": "cups per student per day",
        "basis": "observed-behaviour",
        "defence": "Two is the number of occasions a day on which tea arrives without being sought — the mess at breakfast and the urn at evening tea.",
        "confidence": "defensible"
      },
      {
        "id": "a_light_rate",
        "lever": "Cups per day, light tier",
        "value": "0.5 cups",
        "numeric": 0.5,
        "unit": "cups per student per day",
        "basis": "declared-judgement",
        "defence": "Three or four cups a week for the people who would tell you they do not drink chai — an openly soft number, and it carries under 5% of the answer.",
        "confidence": "judgement"
      },
      {
        "id": "a_days_student",
        "lever": "Student days on campus per week",
        "value": "7 days",
        "numeric": 7,
        "unit": "days per week",
        "basis": "structural-logic",
        "defence": "Residential means residential — the cohort is on site on Sunday too, which is exactly why this stream cannot be run on a five-day working week.",
        "confidence": "anchor"
      },
      {
        "id": "a_faculty",
        "lever": "Faculty headcount",
        "value": "90",
        "numeric": 90,
        "unit": "faculty",
        "basis": "published-benchmark",
        "defence": "A regulated postgraduate management programme runs near a 1:15 faculty-student ratio, which puts 1,200 students at roughly 80 to 100 faculty.",
        "confidence": "defensible"
      },
      {
        "id": "a_faculty_rate",
        "lever": "Cups per faculty member per working day",
        "value": "3 cups",
        "numeric": 3,
        "unit": "cups per person per day",
        "basis": "observed-behaviour",
        "defence": "Faculty tea is meeting-driven — one on arrival, one in the department, one with whoever walks in during office hours.",
        "confidence": "judgement"
      },
      {
        "id": "a_faculty_days",
        "lever": "Faculty days on campus per week",
        "value": "5 days",
        "numeric": 5,
        "unit": "days per week",
        "basis": "observed-behaviour",
        "defence": "Teaching and office hours cluster Monday to Friday; Saturday sessions exist but not for most of the faculty in an ordinary week.",
        "confidence": "defensible"
      },
      {
        "id": "a_staff",
        "lever": "Support staff on site",
        "value": "200",
        "numeric": 200,
        "unit": "staff",
        "basis": "structural-logic",
        "defence": "Housekeeping, mess, security, grounds, library, IT and administration for 1,200 beds and an academic block — roughly one support head per six residents, which is what a residential campus needs to actually run.",
        "confidence": "judgement",
        "contestedBy": "A campus that outsources mess and housekeeping might report 120 staff on its own payroll; the contractor's people still drink the tea, so count heads on site, not heads on payroll — otherwise you lose about 1,400 cups a week."
      },
      {
        "id": "a_staff_rate",
        "lever": "Cups per staff member per shift",
        "value": "3 cups",
        "numeric": 3,
        "unit": "cups per person per shift",
        "basis": "observed-behaviour",
        "defence": "For staff the cup is the break — morning, afternoon, and the one that marks the end of the shift. Rates tied to a roster are the steadiest numbers in this model.",
        "confidence": "judgement"
      },
      {
        "id": "a_staff_days",
        "lever": "Staff days per week",
        "value": "6 days",
        "numeric": 6,
        "unit": "days per week",
        "basis": "observed-behaviour",
        "defence": "A six-day week is the norm for campus support roles, with security and mess rostered across all seven — six is the blended figure.",
        "confidence": "defensible"
      },
      {
        "id": "a_visitor_days",
        "lever": "Visitor-days per week",
        "value": "60",
        "numeric": 60,
        "unit": "visitor-days per week",
        "basis": "declared-judgement",
        "defence": "Recruiters, guest speakers, vendors, auditors and parents — roughly a dozen a day in an ordinary week, and openly a guess.",
        "confidence": "shaky",
        "contestedBy": "Triple it for placement week and the total still moves by about 1% — which is why this stream is worth naming and not worth arguing about."
      },
      {
        "id": "a_visitor_rate",
        "lever": "Cups per visitor-day",
        "value": "2 cups",
        "numeric": 2,
        "unit": "cups per visitor-day",
        "basis": "observed-behaviour",
        "defence": "A visitor is offered tea on arrival and again in the meeting — two is the hospitality default and nobody refuses the first one.",
        "confidence": "defensible"
      },
      {
        "id": "a_canteen_hours",
        "lever": "Canteen counter serving hours per day",
        "value": "14 hours",
        "numeric": 14,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "Seven in the morning to nine at night. The counter is open all day but is not busy all day, which is why the rate paired with it must be an average and not a peak.",
        "confidence": "defensible"
      },
      {
        "id": "a_canteen_rate",
        "lever": "Average cups per hour at the canteen counter",
        "value": "80 cups",
        "numeric": 80,
        "unit": "cups per hour",
        "basis": "observed-behaviour",
        "defence": "Roughly a cup every forty-five seconds averaged across the day — heavy in three short peaks, close to idle for the long stretches between them.",
        "confidence": "judgement",
        "contestedBy": "The honest objection is that you only remember this counter at peak, so 80 is probably generous; that bias is the reason the supply route lands high."
      },
      {
        "id": "a_mess_sittings",
        "lever": "Mess tea sittings per day",
        "value": "2",
        "numeric": 2,
        "unit": "sittings per day",
        "basis": "observed-behaviour",
        "defence": "Breakfast and evening tea — the two occasions when the urn is wheeled out and tea is poured for whoever turns up.",
        "confidence": "defensible"
      },
      {
        "id": "a_mess_cups",
        "lever": "Cups poured per mess sitting",
        "value": "750 cups",
        "numeric": 750,
        "unit": "cups per sitting",
        "basis": "observed-behaviour",
        "defence": "Around six in ten of a 1,200-strong residential cohort attend each fixed sitting, plus the staff who serve it — roughly 750 cups from the urn.",
        "confidence": "judgement"
      },
      {
        "id": "a_night_hours",
        "lever": "Night stall serving hours per day",
        "value": "5 hours",
        "numeric": 5,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "Nine at night to two in the morning — the stall exists because the library closes and the deadline does not.",
        "confidence": "judgement"
      },
      {
        "id": "a_night_rate",
        "lever": "Cups per hour at the night stall",
        "value": "90 cups",
        "numeric": 90,
        "unit": "cups per hour",
        "basis": "observed-behaviour",
        "defence": "Narrower window, denser queue — the night stall is the one outlet that is genuinely busy for the whole of its opening time, so its average and its peak are close together.",
        "confidence": "judgement"
      },
      {
        "id": "a_kettle_share",
        "lever": "Students brewing tea in their rooms",
        "value": "15%",
        "numeric": 0.15,
        "unit": "share of students",
        "basis": "declared-judgement",
        "defence": "About one room in seven keeps a kettle with tea bags or milk sachets; hostel fire rules hold this well below universal.",
        "confidence": "shaky"
      },
      {
        "id": "a_kettle_rate",
        "lever": "In-room cups per brewing student per day",
        "value": "1 cup",
        "numeric": 1,
        "unit": "cups per person per day",
        "basis": "declared-judgement",
        "defence": "The in-room cup is the late-night one and it is a single cup — it supplements the counter rather than replacing it.",
        "confidence": "judgement"
      },
      {
        "id": "a_outlet_days",
        "lever": "Hostel-side outlet days per week",
        "value": "7 days",
        "numeric": 7,
        "unit": "days per week",
        "basis": "structural-logic",
        "defence": "The canteen, the mess and the night stall serve a population that never leaves, so they run on Sunday as well — the outlet week is set by the residents, not by the calendar.",
        "confidence": "defensible"
      },
      {
        "id": "a_pantry_hours",
        "lever": "Academic-block pantry serving hours per day",
        "value": "9 hours",
        "numeric": 9,
        "unit": "hours per day",
        "basis": "observed-behaviour",
        "defence": "Nine in the morning to six in the evening, tracking the teaching day rather than the hostel day.",
        "confidence": "defensible"
      },
      {
        "id": "a_pantry_rate",
        "lever": "Cups per hour from the academic-block pantry",
        "value": "40 cups",
        "numeric": 40,
        "unit": "cups per hour",
        "basis": "declared-judgement",
        "defence": "Class breaks and office hours — steady rather than peaky, serving faculty, staff and whichever students are in the block anyway.",
        "confidence": "judgement"
      },
      {
        "id": "a_pantry_days",
        "lever": "Academic-block pantry days per week",
        "value": "6 days",
        "numeric": 6,
        "unit": "days per week",
        "basis": "structural-logic",
        "defence": "The academic block follows the teaching calendar, not the hostel one — this is the single stream in the supply route that does not run seven days.",
        "confidence": "defensible"
      }
    ],
    "question": "How many cups of chai does a 1,200-student residential campus get through in a week?",
    "traps": [
      {
        "trap": "Counting the students and calling it the campus.",
        "whyItHappens": "The prompt hands you 1,200 and the mind treats a supplied number as the complete population — you anchor on the only figure in the question. Staff and faculty are invisible in exactly the way that permanent fixtures are invisible: they are always there, so they never register as a thing to count.",
        "fix": "Write every headcount line before you write a single rate: students, faculty, staff, visitors. Here the non-students come to 5,070 cups, 22% of the answer. Losing them is not a rounding error, it is a fifth of the number and it is visible in your tree."
      },
      {
        "trap": "One average cup rate across the whole cohort.",
        "whyItHappens": "An average is faster to write and it feels defensible, so the instinct is to pick a middle number — two cups a day — and multiply. It gets to a plausible total by cancelling two errors against each other, and it destroys the information on the way: you can no longer see that a quarter of the cohort carries as much volume as half of it.",
        "fix": "Segment by drinking intensity, not by year or section or gender. Three tiers is enough. Then when the interviewer pushes, the push lands on one tier's rate, you can move that rate and requote in ten seconds, and the answer survives the challenge."
      },
      {
        "trap": "Running the whole campus on a five-day week.",
        "whyItHappens": "Working-week reflex, imported from every other estimation question you have practised. 'Residential' is the word in the prompt doing the work and it is easy to read past, because it looks like scene-setting rather than an instruction.",
        "fix": "Give each stream its own day count and say why out loud: students seven, staff six, faculty five, academic-block pantry six. Four streams, four different weeks. Running students on five days alone removes 5,100 cups."
      },
      {
        "trap": "Quoting 22,920.",
        "whyItHappens": "The arithmetic produces it, and after the effort of getting there the number feels earned. But no chain of judgements each good to one significant figure yields five significant figures of output — the precision is manufactured entirely by the calculator.",
        "fix": "Say 'roughly 23,000 a week, call it 18,000 to 28,000', then name the lever that sets the width of the band. A guesstimate answered as an exact figure signals that you do not understand what an estimate is, and that impression is expensive to reverse."
      },
      {
        "trap": "Letting the boundary drift halfway through.",
        "whyItHappens": "You scope it cleanly as cups served on campus, then three minutes later you remember the stall outside the gate and quietly fold it in, because it is obviously part of campus life. Nothing in the arithmetic objects. The tree is now summing two different quantities and neither of them is the one you defined.",
        "fix": "Fix the boundary in one sentence before the first multiplication, and write it where you can see it. If you want to change it, change it out loud, say what it adds, and restate the answer. Moving a boundary is legitimate; moving it silently is not."
      },
      {
        "trap": "Reaching for a national per-capita figure because it feels more rigorous than looking around.",
        "whyItHappens": "A cited constant sounds like evidence and a personal observation sounds like a guess, so candidates import the national number to seem better prepared. On a closed population of 1,490 adults the national average is the weaker input, not the stronger one — it describes a population that does not resemble this one.",
        "fix": "On a closed-population question, say plainly that local observation is the appropriate data and that you will use the national figure only as a back-check at the end. Then do exactly that: three times the national rate, in the direction you would predict, at a size you can argue."
      }
    ],
    "teachingPoint": "A closed population is the one question where your own eyes are legitimately the data — no national constant helps and nobody expects you to have read a report. What is being tested is whether you split that population into streams that genuinely drink at different rates, and then divide the total back by headcount to see whether you have described a campus you would recognise. Most candidates count the students, multiply by a single average, and stop. The students are only three-quarters of the answer, and the average is the thing hiding all the information."
  },
  {
    "timeboxMinutes": 15,
    "sensitivity": {
      "assumptionId": "a_small_hours",
      "whyThisLever": "It is the largest block of hours on the page and the least observable number on it. Four and a half lakh small operating companies at sixty hours each is 2.7 crore hours, 42% of the total, and sixty is a recollection of how a small audit runs rather than a count of anything. The obvious rival lever is the CA share of team hours, and it is deliberately not the one chosen: it multiplies the whole answer and therefore moves the number without touching the structure, so a grid on it teaches nothing you could not do in your head. This lever is different. It does not only move the size of the answer — it moves the shape, because it decides whether the concentrated top of the register or the long tail is the story. A lever that can change your conclusion is worth more of your fifteen minutes than a lever that can only change your arithmetic.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "30 hours per small audit",
          "answer": "≈ 15,800 practitioners",
          "deltaVsBase": "−21%"
        },
        {
          "scenario": "Base",
          "leverValue": "60 hours per small audit",
          "answer": "≈ 20,000 practitioners",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "100 hours per small audit",
          "answer": "≈ 25,500 practitioners",
          "deltaVsBase": "+28%"
        }
      ],
      "breakpoint": "Two breakpoints, and only one of them is about the number. On size, the answer leaves the 14,000 to 30,000 band below roughly 22 hours or above roughly 120 hours per small audit — and the order of magnitude survives anything from 5 hours to 400, an eightyfold swing, which is the real reason to be confident about 10^4 and not about 20,000. On shape, the breakpoint is exactly 40 hours: below it the top 50,000 companies carry more than half the hours and the concentrated story is right, above it the tail carries more and the story is the opposite. The base case of 60 hours sits on the tail side of that line, which is why the concentration check came back at 43% rather than the 80% the reflex expects. If an interviewer talks you down to 40 hours, do not only requote the number — tell them their assumption has just changed which half of the register your recommendation would be about.",
      "oneLiner": "Call it 20,000, and it hangs mainly on sixty hours to audit a small operating company — thirty takes it to 15,800, a hundred takes it to 25,500, and at forty the long tail stops being the story and the top of the register takes over."
    },
    "number": "11",
    "difficulty": "Hard",
    "id": "audit-capacity-cas",
    "archetype": "occupational-cohort",
    "routeChoice": {
      "chosen": "Hybrid",
      "why": "Take the company population from the top, because the MCA register is a published count and nothing you build from the bottom will beat it. Build the audit hours from the bottom, tier by tier, because the register spans two orders of magnitude in work content and there is no average that survives it. Then convert work into people with a capacity rate. Top for the population, bottom for the workload — say which half of the question you are treating which way, out loud, before you start. That sentence is worth a mark on its own, because it tells the interviewer you chose a route rather than defaulted to one.",
      "rejectedRoute": "Top-down",
      "rejectedWhyNot": "The clean top-down route is the money: take India's statutory audit fee pool, divide by fee revenue per practising CA, and read off practitioners. It fails on both terms. Audit fees run from about ten thousand rupees for a dormant private limited to several crore for a large listed group — four orders of magnitude — so a blended fee per audit describes no company that exists, and the pool is dominated by a few thousand engagements while the headcount is dominated by the tail. Worse, fee and effort have come apart at the bottom: the small-company audit is competitively priced near a floor almost regardless of the work it takes, so dividing by a fee measures pricing power rather than labour. Money is the right currency when money varies smoothly with the thing you want. Here it does not, and using it would hand you a number you could not defend for a single one of its inputs."
    },
    "sanityChecks": [
      "Audits per practitioner, the test that matters most: 15 lakh companies across 20,000 practitioners is 75 a year, about one and a half a week. In a book whose median client is a dormant shell signed off in a morning, that is a practice you would recognise. Five hundred a year would describe a rubber stamp, and five would describe a profession ten times larger than the one that exists.",
      "Against the roll: 20,000 out of roughly 1.4 lakh practising members is one practitioner in seven. Statutory company audit should be a large but not dominant share of what Indian practice does, because tax, GST, certification and ROC work carry more people than audit does. An answer near a lakh would have claimed the profession does almost nothing else, and that claim is visibly false to anyone who has spent a week inside a CA office.",
      "The statutory floor: the Companies Act caps how many company audits one member may sign, with the dormant and small-company tail carved out of the cap. The cap therefore binds on the 50,000 companies in the top two tiers — at twenty apiece that needs at least 2,500 signing partners, and 20,000 clears it comfortably. This is the rare guesstimate where a statute rather than a judgement sets your floor, and an answer below about 3,000 would have been illegal before it was implausible.",
      "Hours per company: 6.5 crore hours over 15 lakh companies averages 43 hours, a little over one working week of team time for the average company on the register. Given that two-thirds of the register files nothing of substance, the average ought to feel low — and a model that had produced 400 hours for the average Indian company would have described a register made entirely of listed groups.",
      "The season test: 20,000 is a full-year equivalent, and the year is not flat. Put half the hours in one quarter, allow that the quarter is worked at a much longer day, and the same work needs roughly 30,000 people in the field in the crunch. Hold that against what a CA firm actually looks like in September. If your tree cannot produce the peak number from the annual one in ten seconds, it was a sum with headings rather than a model.",
      "Direction of the error: three of the four largest levers — the dormant share, the hours per small audit and the CA share of team hours — would each be pushed up by an interviewer who thinks small audits are more work than you assumed, and down by one who thinks most of the tail is signed off with little fieldwork. The band is wide because both of those views of the Indian small-company audit are held by people who know the market. Say which one you have assumed, and the width stops looking like vagueness."
    ],
    "answerBand": "14,000 – 30,000 practising chartered accountants",
    "tree": {
      "root": "Practising chartered accountants required for one year of statutory company audit",
      "rootFormula": "= Audit team-hours demanded ÷ Team-hours one practitioner carries in a year",
      "value": "≈ 20,000 practitioners",
      "branches": [
        {
          "label": "Audit team-hours demanded",
          "formula": "= Σ (companies in tier × hours per audit)",
          "value": "6.5 crore team-hours a year",
          "note": "Four tiers, because the register is not one population. The spread between the top tier and the bottom is 200 to 1 on hours per audit — wider than almost any segmentation you will build in a case, and the reason an average here is not a simplification but an error.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Listed and large unlisted — 5,000 companies",
              "formula": "5,000 companies × 2,000 hours",
              "value": "1.0 crore hours — 15% of the total",
              "note": "The tier average hides a tenfold spread inside itself: a large listed group runs into tens of thousands of hours and a newly listed small-cap into a few hundred. Say that the average is doing rough work here, because the interviewer already knows it."
            },
            {
              "label": "Mid-size operating companies — 45,000",
              "formula": "45,000 companies × 400 hours",
              "value": "1.8 crore hours — 28% of the total",
              "note": "Real operations, statutory thresholds crossed, an engagement team rather than one person with a laptop. Ten weeks of a small team, which is what 400 hours buys."
            },
            {
              "label": "Small operating companies — 4.5 lakh",
              "formula": "450,000 companies × 60 hours",
              "value": "2.7 crore hours — 42% of the total",
              "note": "The largest single block of hours on the page, and the softest number. Sixty hours is a fortnight of one article and a day of the partner. This is the tier the whole answer swings on."
            },
            {
              "label": "Dormant and nil-filing companies — 10 lakh",
              "formula": "1,000,000 companies × 10 hours",
              "value": "1.0 crore hours — 15% of the total",
              "note": "Ten hours for a set of accounts with nothing in it. Individually trivial, collectively a crore of hours — which is the whole argument against writing the tail off at zero because it feels negligible."
            }
          ]
        },
        {
          "label": "Team-hours one practitioner carries in a year",
          "formula": "= (Chargeable hours × audit share of the year) ÷ CA share of team hours",
          "value": "3,250 team-hours per practitioner",
          "note": "Three haircuts in sequence, and candidates typically apply none of them. This branch is small on the page and carries half the answer, because it is the divisor.",
          "children": [
            {
              "label": "Chargeable hours in a year",
              "formula": "250 working days × 7 chargeable hours",
              "value": "1,750 hours",
              "note": "Not 2,000. Two hundred and fifty days is 260 weekdays less about 25 days of leave and holidays, plus the fifteen or so Saturdays the season takes back. Seven chargeable hours is a nine-hour day with the practice management taken out."
            },
            {
              "label": "Share of the chargeable year on statutory audit",
              "formula": "1,750 hours × 65%",
              "value": "1,137.5 CA-hours",
              "note": "Even a practitioner whose practice is built on audit gives a third of the year to tax audit, certification and running the firm. A model that gives them the whole year has quietly invented a person."
            },
            {
              "label": "Leverage — CA share of team hours",
              "formula": "1,137.5 CA-hours ÷ 35%",
              "value": "3,250 team-hours",
              "note": "The distinctively Indian step. Article assistants deliver roughly two-thirds of audit fieldwork hours under a member's signature, so one practitioner's year puts far more team-hours in the field than their own. Ignore this and you need 57,000 CAs and cannot explain where they are."
            }
          ]
        },
        {
          "label": "Season concentration — named, and deliberately not multiplied in",
          "formula": "Peak headcount ≈ FTE × season factor",
          "value": "≈ 30,000 bodies in the July–September crunch",
          "note": "Roughly half the hours fall in one quarter, which is twice the even-spread run rate; the season is also worked at a longer day, so call the headcount multiplier about 1.5 rather than 2. The annual requirement is 20,000 and the peak requirement is near 30,000. Both are correct answers to different questions. Put it in the tree, state it, and leave it out of the headline — folding it in silently would be answering a question nobody asked.",
          "children": []
        }
      ]
    },
    "triangulation": {
      "label": "Supply-side cross-check — count the profession, not the work",
      "route": "Top-down",
      "premise": "The primary route never looked at a chartered accountant. It counted companies, priced their audits in hours and divided by a capacity rate. This route does the opposite and touches none of those inputs: start from the institute's own roll, strip out the members who are not in practice, strip out the practices that hold no company audits, and ask how many are left for whom statutory audit is the business rather than a seasonal sideline. It shares exactly one number with the first route — the 15 lakh companies, used only in the last line as a ratio and never as an input. Everything else is independent, which is what makes the comparison worth running.",
      "lines": [
        {
          "id": "t1",
          "label": "Members holding a Certificate of Practice",
          "expr": "400000 * 0.35",
          "display": "4 lakh members × 35% in practice",
          "result": 140000,
          "unit": "practising members",
          "carriedForward": "≈ 1.4 lakh",
          "uses": [
            "a_icai_members",
            "a_cop_share"
          ],
          "soWhat": "Two-thirds of the profession is in employment and audits nothing. Removing them first is the step that stops the four-lakh figure from anchoring everything after it."
        },
        {
          "id": "t2",
          "label": "Practising members in firms holding statutory audit appointments",
          "expr": "140000 * 0.45",
          "display": "1.4 lakh practising × 45% in audit-holding firms",
          "result": 63000,
          "unit": "practising members",
          "carriedForward": "≈ 63,000",
          "uses": [
            "a_audit_firm_share"
          ],
          "soWhat": "A pure tax and GST practice is a chartered accountancy firm that never signs a company audit report. Separating the two is the distinction this route lives or dies on."
        },
        {
          "id": "t3",
          "label": "Practitioners for whom statutory audit is the core of the year",
          "expr": "63000 / 3",
          "display": "63,000 ÷ 3, taking one in three as audit-led",
          "result": 21000,
          "unit": "practitioners",
          "carriedForward": "≈ 21,000",
          "uses": [
            "a_audit_led_share"
          ],
          "soWhat": "The softest number in the route, and the one to concede before it is challenged. Move it to one in two and this route reads 31,500, which would be a disagreement rather than a match."
        },
        {
          "id": "t4",
          "label": "Audit-led practitioners as a share of the practising profession",
          "expr": "21000 / 140000",
          "display": "21,000 ÷ 1.4 lakh practising members",
          "result": 0.15,
          "unit": "share of practising members",
          "carriedForward": "≈ one in seven",
          "uses": [],
          "soWhat": "One practising member in seven. Statutory company audit is a large part of what Indian practice does and nowhere near the whole of it — a claim you can hold against anything you know about the profession, which is what makes this line the real check rather than the arithmetic above it."
        },
        {
          "id": "t5",
          "label": "Statutory audits per practitioner implied",
          "expr": "1500000 / 21000",
          "display": "15 lakh companies ÷ 21,000 practitioners",
          "result": 71.43,
          "tolerance": 0.001,
          "unit": "audits per practitioner per year",
          "carriedForward": "≈ 71 audits",
          "uses": [
            "a_active"
          ],
          "soWhat": "Seventy-one company audits a year, roughly one and a half a week, in a book whose median client is a dormant shell signed off in a morning. That is a recognisable small practice. Five hundred would have been a rubber stamp and five would have been a fantasy."
        }
      ],
      "answer": "≈ 21,000 practitioners, against ≈ 20,000 from the demand route — about 5% apart",
      "verdict": "Five per cent is closer than either route deserves, and saying so is worth more than claiming the match as confirmation. Neither route is good to better than a factor of two, so the honest reading is not that the answer is 20,500 but that two methods built on almost entirely different inputs failed to contradict each other — a weaker statement and a more useful one. What makes the agreement worth anything is that the routes fail in unrelated ways: the demand route breaks if hours per small audit are wrong, the supply route breaks if the practice mix is wrong, and there is no mechanism by which one of those errors would produce the other. Take 20,000 as the point estimate, because the demand route has more independent terms and therefore averages more of its own error away. Then take the finding the demand route could not produce on its own: 20,000 needed out of roughly 1.4 lakh practising members means the capacity exists with room, so the binding constraint on India's audit system is not the size of the profession. It is the calendar."
    },
    "probes": [
      {
        "question": "India has about four lakh chartered accountants. You say the work needs twenty thousand. Is the rest of the profession doing nothing?",
        "intent": "Whether you can hold a demand-side answer against a supply-side fact without either abandoning your method or dismissing the fact. The question is built so that both reflexes are wrong.",
        "goodAnswer": "The two numbers are not comparable, and the gap is what I would expect. Of four lakh members, roughly a third hold a Certificate of Practice — the other two-thirds are in industry, banking and government and sign nothing. That leaves about 1.4 lakh in practice, of whom my estimate says one in seven is audit-led. The rest run tax, GST, certification, ROC and advisory practices, which is where the volume of Indian professional work actually sits. So the finding is not that the profession is idle. It is that statutory company audit is a smaller part of what chartered accountants do than the public image of the qualification suggests.",
        "weakAnswer": "Revising the estimate upward to close the gap, which mistakes a stock of qualified people for a measure of the work, and throws away the only independent check the answer had."
      },
      {
        "question": "Ten hours to audit a dormant company. Defend it.",
        "intent": "Whether you can defend the softest-looking number without over-claiming or folding, and whether you know which of your numbers is actually fragile. The tier carries a crore of hours, so it is not a throwaway.",
        "goodAnswer": "A dormant company still has a balance sheet carrying share capital, a bank balance and preliminary expenses, and the report still has to be drafted, reviewed and signed. A morning is about right. What matters more is that the tier's weight comes from its count and not its rate — halve it to five hours and the answer falls about 6%, so this is not where my estimate is fragile. If you want to push on something, push on sixty hours for the four and a half lakh small operating companies. That is 42% of my hours and a number I am genuinely less sure of.",
        "weakAnswer": "Dropping the tier to zero because the audits are trivial, which loses a crore of hours — as large as the entire listed tier — on the grounds that each individual piece of it is small."
      },
      {
        "question": "Suppose small companies are exempted from statutory audit. What happens to your number?",
        "intent": "Whether the tree is a live model or a finished sum, and whether you can separate the share of clients lost from the share of work lost. Those come apart sharply here, which is the point of the probe.",
        "goodAnswer": "It depends where the line is drawn, so let me do two. Exempt the dormant tier only and I lose a crore of hours out of 6.5 — the requirement falls to about 17,000, down 15%, while 67% of the clients disappear. Exempt the small operating tier as well and I lose 3.7 crore hours, the requirement falls to about 8,600, down 57%, and 97% of the clients have gone. The asymmetry is the finding: you can take nearly every company out of the audit net and still leave more than 40% of the profession's audit work standing. For a regulator that is the argument for exemption. For the practices in the tail it is close to the whole business, because their revenue tracks client count rather than hours.",
        "weakAnswer": "'It falls a lot' — a direction with no magnitude, and no recognition that the share of companies lost and the share of hours lost differ by a factor of two."
      },
      {
        "question": "Your two routes came out 5% apart. Does that mean you are right?",
        "intent": "Whether you understand what a cross-check can and cannot prove. The reflex is to treat agreement as validation, and the reflex is wrong.",
        "goodAnswer": "No, and I would not claim it. Neither route is good to better than a factor of two, so five per cent apart is closer than they deserve and partly luck. What the agreement does establish is a negative: two methods sharing almost no inputs failed to contradict each other, and they fail for unrelated reasons — mine breaks if hours per small audit are wrong, the supply route breaks if the practice mix is wrong. So I would quote 20,000 with a band of 14,000 to 30,000, take the demand route as the point estimate because it has more independent terms and averages more of its own error away, and be plain that the band comes from the sensitivity grid rather than from the gap between the routes.",
        "weakAnswer": "'The two routes confirm each other, so I am confident in 20,500' — which reads agreement as evidence and manufactures a fifth significant figure out of two rough models."
      },
      {
        "question": "It is 15 September and the filings are due. Which number do you give the ministry?",
        "intent": "Whether you noticed the seasonality you scoped, and whether you can tell which of two correct numbers answers the question actually in front of you.",
        "goodAnswer": "Not the twenty thousand. That is a full-year equivalent and September is not an average month — roughly half the year's hours fall in this quarter, which is twice the even-spread run rate, and even allowing that the season is worked at a much longer day the field needs about 30,000 people in it rather than 20,000. So the answer to a ministry asking whether the deadline is achievable is 30,000, and the sentence worth saying after it is that India's audit capacity problem is a calendar problem rather than a headcount problem. Staggering year-ends would do more for it than qualifying more chartered accountants.",
        "weakAnswer": "Repeating 20,000, which is the right answer to the annual question and the wrong answer to this one — and which suggests the seasonality was scoped as a formality rather than understood."
      },
      {
        "question": "You have a week and access to the ICAI and the MCA. How would you replace this with real data?",
        "intent": "Whether you can turn an estimate into a measurement plan, and whether you can rank that plan by how much uncertainty each step removes. In practice this is what the estimate was for.",
        "goodAnswer": "Three things, ranked by how much of my band they close. First, the MCA filing data gives me the tier counts and the paid-up capital and turnover distribution directly, which replaces my dormant share and my tier sizes with counts and costs a day. Second, time-sheet data from three firms of different sizes — one large, one mid-tier, one proprietorship — gives me hours per audit by tier and the CA share of those hours, which is where 90% of my remaining uncertainty sits and the only step that needs anyone's cooperation. Third, the ICAI firm register gives me the practice mix for the supply route. I would not survey practitioners on how many hours they work: self-reported hours in a profession with a nine-month season are the least reliable input available.",
        "weakAnswer": "'Get the ICAI data', with no statement of which assumption it would replace or how much of the band it would close — a plan to collect data rather than a plan to resolve a specific uncertainty."
      }
    ],
    "finalAnswerNumeric": 20000,
    "tabLabel": "CA audit capacity",
    "finalAnswer": "≈ 20,000 practising chartered accountants carry India's statutory company audit — call it 14,000 to 30,000, and roughly 30,000 bodies in the field during the autumn filing crunch",
    "scope": {
      "countingWhat": "Practising chartered accountants whose working year is consumed by the statutory audit of companies on the MCA register — the headcount the annual workload requires, not the number of members the profession happens to have.",
      "unit": "practising chartered accountants",
      "timeBasis": "flow (per year)",
      "geography": "India — every company on the MCA register, and every practice that audits one, from a Nariman Point partnership to a single-room proprietorship in a district town. The tier counts and hour rates below are illustrative — built to show the method clearly, not asserted as verified market data.",
      "included": [
        "Statutory audit under the Companies Act of every registered company — private and public, listed and unlisted, operating and dormant",
        "Chartered accountant hours at every grade on the engagement, from the senior reviewing a bank reconciliation to the partner who signs",
        "CAs employed inside firms as well as sole practitioners — the work is what is counted, not the shape of the practice",
        "Consolidation, group reporting and the internal financial controls opinion, where the audit carries them"
      ],
      "excluded": [
        "Tax audit under the Income-tax Act, GST annual return certification, internal audit, ROC filings, valuation and advisory — profitable neighbours of the statutory audit, and not it",
        "Audits of entities that are not registered companies: LLPs, partnership firms, trusts, societies and co-operatives",
        "Article assistants and non-CA staff, who appear inside the hours as leverage and never as practitioners",
        "The roughly two-thirds of ICAI members who work in industry and government and sign nothing"
      ],
      "boundaryTrap": "The question sounds like a stock and is a flow divided by a rate — a year of audit work converted into the practitioners it consumes. Two things break here. First, candidates answer with the supply, because four lakh chartered accountants is a number they can recall and the demand is a number they have to build; the supply is precisely what the question is asking you to test, so importing it is assuming the answer. Second, the Indian audit year is not a year. With 31 March year-ends and filing deadlines bunched into the following autumn, roughly half the hours land in a single quarter — so a full-time-equivalent count and a peak-season headcount are different numbers, and you must say which one you are quoting before you quote it."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Dormant and nil-filing companies",
        "expr": "1500000 * 2 / 3",
        "display": "15 lakh active companies × two-thirds dormant or nil-filing",
        "result": 1000000,
        "unit": "companies",
        "carriedForward": "≈ 10 lakh",
        "uses": [
          "a_active",
          "a_dormant_share"
        ],
        "soWhat": "Size the tail first, because it is two-thirds of the register and the temptation is to leave it out. Naming it as ten lakh companies makes it impossible to forget and impossible to zero without saying so out loud."
      },
      {
        "id": "c2",
        "label": "Small operating companies, taken as the residual",
        "expr": "1500000 - 1000000 - 45000 - 5000",
        "display": "15 lakh − 10 lakh dormant − 45,000 mid-size − 5,000 large",
        "result": 450000,
        "unit": "companies",
        "carriedForward": "≈ 4.5 lakh",
        "uses": [
          "a_active",
          "a_dormant_share",
          "a_large_count",
          "a_mid_count"
        ],
        "soWhat": "Take the biggest tier as a residual rather than assuming it directly. The four tiers then sum to the register by construction, which removes one whole class of error and one whole class of interviewer question."
      },
      {
        "id": "c3",
        "label": "Audit hours, listed and large unlisted",
        "expr": "5000 * 2000",
        "display": "5,000 companies × 2,000 hours",
        "result": 10000000,
        "unit": "team-hours per year",
        "carriedForward": "1 crore hours",
        "uses": [
          "a_large_count",
          "a_large_hours"
        ],
        "soWhat": "A third of one per cent of the register producing a crore of hours. Compute this tier first: it is the one whose magnitude is most surprising and the one that decides whether your concentration story holds."
      },
      {
        "id": "c4",
        "label": "Audit hours, mid-size operating companies",
        "expr": "45000 * 400",
        "display": "45,000 companies × 400 hours",
        "result": 18000000,
        "unit": "team-hours per year",
        "carriedForward": "1.8 crore hours",
        "uses": [
          "a_mid_count",
          "a_mid_hours"
        ],
        "soWhat": "Nine times the count of the top tier at a fifth of the hours each — so it lands nearly twice as large. That crossover is the whole reason a tiered model beats an average."
      },
      {
        "id": "c5",
        "label": "Audit hours, small operating companies",
        "expr": "450000 * 60",
        "display": "4.5 lakh companies × 60 hours",
        "result": 27000000,
        "unit": "team-hours per year",
        "carriedForward": "2.7 crore hours",
        "uses": [
          "a_small_hours"
        ],
        "soWhat": "The largest single block on the page, from the tier nobody writes about. Mark it now as the number the sensitivity grid will be run on, because it is both the biggest and the least observable."
      },
      {
        "id": "c6",
        "label": "Audit hours, dormant and nil-filing companies",
        "expr": "1000000 * 10",
        "display": "10 lakh companies × 10 hours",
        "result": 10000000,
        "unit": "team-hours per year",
        "carriedForward": "1 crore hours",
        "uses": [
          "a_dormant_hours"
        ],
        "soWhat": "Equal to the entire listed tier, built out of work that is individually not worth mentioning. This is the line that refutes writing the tail off."
      },
      {
        "id": "c7",
        "label": "Total audit team-hours demanded",
        "expr": "10000000 + 18000000 + 27000000 + 10000000",
        "display": "1.0 + 1.8 + 2.7 + 1.0 crore hours",
        "result": 65000000,
        "unit": "team-hours per year",
        "carriedForward": "≈ 6.5 crore hours",
        "uses": [],
        "soWhat": "The demand side is now closed. Everything after this line is a question about people rather than about companies, and keeping the two halves separate is what lets you defend one while the interviewer attacks the other."
      },
      {
        "id": "c8",
        "label": "Share of hours sitting in the top 50,000 companies",
        "expr": "(10000000 + 18000000) / 65000000",
        "display": "(1.0 + 1.8) crore ÷ 6.5 crore",
        "result": 0.4308,
        "tolerance": 0.001,
        "unit": "share of total hours",
        "carriedForward": "≈ 43%",
        "uses": [],
        "soWhat": "Test the concentration rather than announcing it. Three per cent of the companies carry 43% of the hours — concentrated, and not the 80-20 the reflex expects, because ten lakh dormant shells at ten hours each still come to a crore. Say that out loud; a declaration corrected is worth more than a declaration that quietly did not hold."
      },
      {
        "id": "c9",
        "label": "Hours delivered by qualified chartered accountants",
        "expr": "65000000 * 0.35",
        "display": "6.5 crore team-hours × 35% CA share",
        "result": 22750000,
        "unit": "CA-hours per year",
        "carriedForward": "≈ 2.3 crore CA-hours",
        "uses": [
          "a_ca_hour_share"
        ],
        "soWhat": "The step almost every answer skips. Two-thirds of the fieldwork is done by article assistants under a member's signature, so the profession has to supply a third of the hours, not all of them. Skip this line and the answer comes out near 57,000."
      },
      {
        "id": "c10",
        "label": "Chargeable hours per practitioner per year",
        "expr": "250 * 7",
        "display": "250 working days × 7 chargeable hours",
        "result": 1750,
        "unit": "chargeable hours per year",
        "uses": [
          "a_working_days",
          "a_chargeable_hours"
        ],
        "soWhat": "Build the divisor rather than reaching for 2,000. Two thousand is a gross year for a salaried employee, and using it here imports a person who does not exist in Indian practice."
      },
      {
        "id": "c11",
        "label": "Full-time equivalents on statutory audit",
        "expr": "22750000 / 1750",
        "display": "2.275 crore CA-hours ÷ 1,750 hours a year",
        "result": 13000,
        "unit": "full-time equivalents",
        "carriedForward": "≈ 13,000 FTE",
        "uses": [],
        "soWhat": "This is work expressed in people, and it is not yet a headcount. Quote it as FTE and say so, because the next line is the one candidates leave out and interviewers ask about."
      },
      {
        "id": "c12",
        "label": "Practising chartered accountants required",
        "expr": "13000 / 0.65",
        "display": "13,000 FTE ÷ 65% of the year spent on statutory audit",
        "result": 20000,
        "unit": "practising chartered accountants",
        "carriedForward": "≈ 20,000 practitioners",
        "uses": [
          "a_audit_share_of_year"
        ],
        "soWhat": "Thirteen thousand full-time equivalents need twenty thousand real practitioners, because no practitioner gives the whole year to statutory audit. FTE and headcount differ by a third here — quote the wrong one and you have answered a question the interviewer did not ask."
      }
    ],
    "orderOfMagnitude": "10^4",
    "assumptions": [
      {
        "id": "a_active",
        "lever": "Active companies on the MCA register",
        "value": "15 lakh",
        "numeric": 1500000,
        "unit": "companies",
        "basis": "published-benchmark",
        "defence": "The ministry publishes it monthly — roughly 26 lakh companies have ever been registered and about 15 lakh remain active rather than struck off, dissolved or under liquidation.",
        "confidence": "anchor",
        "contestedBy": "An interviewer may push the active count to 18 lakh on a broader definition of active; that lifts the answer by about a tenth, almost all of it through the dormant tier."
      },
      {
        "id": "a_dormant_share",
        "lever": "Dormant or nil-filing share of active companies",
        "value": "two-thirds",
        "numeric": 0.6667,
        "unit": "share of active companies",
        "basis": "declared-judgement",
        "defence": "Incorporation in India is cheap and winding up is not, so shells accumulate — a large majority of registered companies file returns with nothing of substance in them, and only a minority carry real operations.",
        "confidence": "judgement",
        "contestedBy": "Half rather than two-thirds moves five lakh companies from the dormant tier into the small operating tier and lifts the answer by roughly a third — worth naming, because it is the second most powerful lever on the page."
      },
      {
        "id": "a_large_count",
        "lever": "Listed and large unlisted companies",
        "value": "5,000",
        "numeric": 5000,
        "unit": "companies",
        "basis": "published-benchmark",
        "defence": "The exchanges list a little over five thousand companies between them, and the large unlisted entities that audit like listed ones are a few hundred more — so five thousand is the right anchor and is checkable in a sentence.",
        "confidence": "defensible"
      },
      {
        "id": "a_mid_count",
        "lever": "Mid-size operating companies",
        "value": "45,000",
        "numeric": 45000,
        "unit": "companies",
        "basis": "declared-judgement",
        "defence": "The band between a genuinely small private limited and a public-interest entity — broadly the companies crossing the statutory thresholds that trigger a real engagement team — is an order of magnitude wider than the listed tier and an order below the small tier.",
        "confidence": "judgement"
      },
      {
        "id": "a_large_hours",
        "lever": "Audit hours per listed or large unlisted company",
        "value": "2,000 hours",
        "numeric": 2000,
        "unit": "team-hours per audit",
        "basis": "declared-judgement",
        "defence": "A partner, a manager, two seniors and four articles over roughly ten weeks of fieldwork and reporting comes to about two thousand team-hours — the shape of a mid-cap engagement, not the largest ones.",
        "confidence": "judgement",
        "contestedBy": "Weight the tier toward the very largest groups and 4,000 is arguable, which adds a crore of hours and about 15% to the answer."
      },
      {
        "id": "a_mid_hours",
        "lever": "Audit hours per mid-size company",
        "value": "400 hours",
        "numeric": 400,
        "unit": "team-hours per audit",
        "basis": "declared-judgement",
        "defence": "One senior and two articles for a month, plus partner review — a fifth of a listed engagement, which is about the ratio of the accounting complexity between the two tiers.",
        "confidence": "judgement"
      },
      {
        "id": "a_small_hours",
        "lever": "Audit hours per small operating company",
        "value": "60 hours",
        "numeric": 60,
        "unit": "team-hours per audit",
        "basis": "declared-judgement",
        "defence": "A fortnight of one article on the vouching and a day of the partner on review and signature — the standard shape of a small private limited audit in a proprietorship practice.",
        "confidence": "shaky",
        "contestedBy": "Thirty hours is defensible where the books come off accounting software and the auditor has held the client for years; a hundred is defensible where they do not. That range moves the answer from about 15,800 to about 25,500."
      },
      {
        "id": "a_dormant_hours",
        "lever": "Audit hours per dormant or nil-filing company",
        "value": "10 hours",
        "numeric": 10,
        "unit": "team-hours per audit",
        "basis": "declared-judgement",
        "defence": "A morning's work on a balance sheet carrying share capital, a bank balance and preliminary expenses — small, but not zero, because the report still has to be drafted, reviewed and signed.",
        "confidence": "judgement",
        "contestedBy": "Four hours is arguable and takes about 6% off the answer; this tier matters through its count, not its rate."
      },
      {
        "id": "a_ca_hour_share",
        "lever": "Share of audit team-hours delivered by qualified CAs",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of team-hours",
        "basis": "observed-behaviour",
        "defence": "Walk into any Indian audit fieldwork room in August and count the heads — the majority are article assistants, and the qualified members are reviewing rather than vouching, so roughly a third of the hours are theirs.",
        "confidence": "shaky",
        "contestedBy": "A large-firm practice runs nearer 25% and a sole practitioner with no articles runs near 100%; the blend leans low because the big tiers carry their hours in leveraged firms."
      },
      {
        "id": "a_working_days",
        "lever": "Working days a year",
        "value": "250 days",
        "numeric": 250,
        "unit": "days per year",
        "basis": "structural-logic",
        "defence": "Two hundred and sixty weekdays, less about twenty-five days of leave and public holidays, plus the fifteen or so Saturdays the audit season takes back — and the season is exactly why this is not the usual 220.",
        "confidence": "defensible"
      },
      {
        "id": "a_chargeable_hours",
        "lever": "Chargeable hours per working day",
        "value": "7 hours",
        "numeric": 7,
        "unit": "chargeable hours per day",
        "basis": "observed-behaviour",
        "defence": "A nine-hour day less the practice management, the travel and the client meetings that bill to nothing — seven is the year-average figure, and it is lower in winter and far higher in September.",
        "confidence": "defensible"
      },
      {
        "id": "a_audit_share_of_year",
        "lever": "Statutory company audit as a share of the chargeable year",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share of chargeable hours",
        "basis": "declared-judgement",
        "defence": "Even a practitioner whose practice is built on audit gives the remaining third to tax audit, certification, ROC work and business development — nobody in Indian practice does statutory audit and nothing else.",
        "confidence": "judgement",
        "contestedBy": "Push it to 80% and the requirement falls to about 16,300; drop it to 50% and it rises to 26,000. It is the quietest of the three divisors and the one nobody thinks to challenge."
      },
      {
        "id": "a_icai_members",
        "lever": "Chartered accountants on the ICAI roll",
        "value": "4 lakh",
        "numeric": 400000,
        "unit": "members",
        "basis": "published-benchmark",
        "defence": "The institute reports its membership and crossed four lakh in the last few years — one of the few numbers in this question that is genuinely published and genuinely current.",
        "confidence": "anchor"
      },
      {
        "id": "a_cop_share",
        "lever": "Members holding a Certificate of Practice",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of members",
        "basis": "published-benchmark",
        "defence": "Roughly a third of the profession practises and two-thirds are in employment in industry, banking and government — a split the institute reports and one that has been broadly stable for years.",
        "confidence": "defensible"
      },
      {
        "id": "a_audit_firm_share",
        "lever": "Practising members in firms holding statutory audit appointments",
        "value": "45%",
        "numeric": 0.45,
        "unit": "share of practising members",
        "basis": "declared-judgement",
        "defence": "A large share of practising members runs a pure tax, GST, ROC or consulting practice and holds no company audit at all — under half sit in firms that audit companies as a line of business.",
        "confidence": "judgement"
      },
      {
        "id": "a_audit_led_share",
        "lever": "Audit-led share of members in audit-holding firms",
        "value": "one in three",
        "numeric": 0.3333,
        "unit": "share of that group",
        "basis": "declared-judgement",
        "defence": "Holding a few audits is not the same as being an auditor — for perhaps a third of this group statutory audit is the core of the year rather than a seasonal sideline.",
        "confidence": "shaky",
        "contestedBy": "One in two would put the supply route at 31,500 against the demand route's 20,000, and the honest reading would then be that the routes disagree by half rather than agree."
      }
    ],
    "question": "How many practising chartered accountants does it take to get India's companies through one year of statutory audit?",
    "traps": [
      {
        "trap": "Answering with the supply.",
        "whyItHappens": "Four lakh chartered accountants is a figure the candidate can recall and the audit workload is a figure they would have to build. The mind substitutes the available question for the asked one and rarely notices the swap, because what comes out is a number about chartered accountants and therefore feels responsive. It is not. The question is whether the work needs more or fewer people than the profession has, and you cannot test that with the profession's own headcount as your input.",
        "fix": "Build the demand chain to the end before the roll is allowed anywhere near the model. Then bring the roll in as the triangulation, where it belongs, and let the comparison do the work it was always going to do — 20,000 needed against 1.4 lakh practising is the finding, and it only exists because the two numbers were produced independently."
      },
      {
        "trap": "One average audit across the register.",
        "whyItHappens": "Averaging is the default move and it feels neutral rather than like a choice. But the register spans 200 to 1 in work content between a dormant shell and a listed group, and the error an average makes across a distribution that wide is neither small nor random — anchor on the large end and you overstate by a factor of ten, anchor on the small end and you lose the top tier's crore of hours entirely.",
        "fix": "Four tiers, sized before any of them is priced. It costs ninety seconds of the fifteen minutes and it converts the interviewer's hardest challenge into a challenge against one tier's rate, which you can move and requote without rebuilding anything."
      },
      {
        "trap": "Announcing the 80-20 instead of testing it.",
        "whyItHappens": "Concentration holds so often in business that candidates state it as a finding before they have computed anything, and the statement then quietly shapes the rest of the answer. Here it does not hold in the usual form. The top 3% of companies carry 43% of the hours, because ten lakh dormant companies at ten hours each are still a crore of hours and cannot be dismissed however trivial any one of them is.",
        "fix": "Declare the shape you expect, compute the share, and then say whether it held. Correcting your own declaration out loud is one of the strongest things you can do in a case, because it demonstrates that the number moved you rather than the other way round."
      },
      {
        "trap": "Dividing hours by 2,000.",
        "whyItHappens": "Two thousand hours a year is the most widely repeated figure in professional services, and it is a gross salaried year rather than a chargeable practitioner year. Two separate haircuts go missing behind it: the non-chargeable share of the working day, and the share of the practitioner's year that goes to tax audit, certification and running the firm.",
        "fix": "Build the divisor in two visible lines — 250 days at 7 chargeable hours, then 65% of that year on statutory audit — and say what each haircut is for. Skipping both lands the answer near 11,000 against 20,000, roughly 40% low, and it lands there while looking rigorous."
      },
      {
        "trap": "Converting every audit hour into a chartered accountant hour.",
        "whyItHappens": "The model asks for CAs, so the instinct is to treat audit hours and CA hours as the same quantity. In India they are further apart than in almost any other profession, because articleship puts a large trained-but-unqualified workforce in the field under a member's signature, and most of the fieldwork hours are theirs.",
        "fix": "Put leverage in as its own line. It is the single largest correction on the page — at 35% the answer is 20,000, and at 100% it would be 57,000, a number the profession could not supply and which should therefore have told you a step was missing."
      },
      {
        "trap": "Quoting one number when the year has two.",
        "whyItHappens": "A single figure feels like a finished answer, and the annual full-time equivalent is the one that falls out of the arithmetic. But the Indian audit calendar is bunched into the months before the filing deadlines, so the annual requirement and the peak-season requirement are genuinely different quantities — and for anyone actually deciding something, the peak one is usually the number that matters.",
        "fix": "Quote both in one sentence, with the basis of each stated: about 20,000 across the year and about 30,000 in the crunch. Then say which question each one answers. A candidate who volunteers the second number has understood that the estimate exists to support a decision rather than to close the conversation."
      }
    ],
    "teachingPoint": "An occupational-cohort question is a division wearing a headcount costume — work divided by the work one person does. Both halves go wrong, and neither is the half candidates worry about. The work goes wrong because the units are not comparable: a dormant private limited and a listed group are both 'a company', the audit of one takes two hundred times the audit of the other, and an average across the register therefore describes nothing that exists. The rate goes wrong because a person is not a full year of chargeable hours — a practitioner owes part of the year to work that is not statutory audit, and in India most audit hours are not delivered by chartered accountants at all but by article assistants working under a member's signature. Segment the companies correctly and forget the leverage and you land a factor of three out, which is worse than a rough answer because it is a rough answer that looks carefully built."
  },
  {
    "timeboxMinutes": 15,
    "sensitivity": {
      "assumptionId": "platform-funded-discount",
      "whyThisLever": "Two tests pick the lever, and most candidates run only the first. How badly is the number pinned, and how much of the answer rides on it? The transacting share is softer than it looks, but it moves orders and gross order value together and an interviewer can at least argue about it from her own habits. The platform-funded discount fails both escapes: nothing outside the company reveals it, because the customer sees a discount and never sees who paid for it, and it sits in the last addition before the answer, so it passes straight through one-for-one. It is also the lever that has actually moved in this industry's history — the discount wars swung it by a factor of four while every other number on this page stayed roughly still.",
      "cases": [
        {
          "scenario": "Conservative",
          "leverValue": "₹40 funded per order — a competitive year",
          "answer": "≈ ₹10,300 crore",
          "deltaVsBase": "−18%"
        },
        {
          "scenario": "Base",
          "leverValue": "₹25 funded per order",
          "answer": "≈ ₹12,500 crore",
          "deltaVsBase": "0%"
        },
        {
          "scenario": "Aggressive",
          "leverValue": "₹10 funded per order — a disciplined duopoly",
          "answer": "≈ ₹14,700 crore",
          "deltaVsBase": "+18%"
        }
      ],
      "breakpoint": "Net revenue per order is ₹110 minus the discount, so at about ₹110 funded per order — 27% of the basket — platform revenue from food delivery goes to zero however many orders get delivered. That is not hypothetical; it is roughly where this industry sat during the acquisition war, when growth in orders and growth in losses were the same line. The honest working range is ₹10 to ₹45, the answer inherits a ₹9,600 to ₹14,700 crore range, and the power of ten never moves. Say that last clause and then stop — it is the difference between a candidate who ran a sensitivity and one who understood why.",
      "oneLiner": "When there is no time for the grid: 'The number I would defend least is how much of the discount the platform funds itself — call it six per cent of the basket. Halve it or double it and the answer swings by about a fifth either way, and it stays in the low tens of thousands of crore.'"
    },
    "number": "12",
    "difficulty": "Hard",
    "id": "food-delivery-revenue-pool",
    "archetype": "revenue-pool-take-rate",
    "routeChoice": {
      "chosen": "Top-down",
      "why": "Orders are the engine of this business and orders come from people, so start where the people are and narrow: urban India, then the towns where delivery actually runs, then adults, then adults with a phone and a payment method, then the minority who order in a given month. Every step is a rate you can name and defend separately, which means an interviewer who disagrees can point at one step rather than at the answer. Then do the part the question is really about — convert orders into money twice, once at gross order value and once at platform revenue, and say plainly which is which.",
      "rejectedRoute": "Bottom-up",
      "rejectedWhyNot": "Bottom-up here means starting from the restaurants: count the outlets listed on the apps, assume orders per outlet per day, bill them. It fails on both levers. The listed base is violently skewed — a dark-kitchen brand in Koramangala may take two hundred orders a day while a listed sweet shop on a Tier-2 market street takes two a week — so your answer is decided by a mean over a distribution nobody can see. And it starts at the wrong unit for this question: billing the restaurant gets you commission and advertising but silently drops the customer-side fees, which are close to a third of platform revenue, so the structure cannot reach the right answer even with perfect levers. A supply-side count is too weak to build on here. It is still strong enough to check with, which is exactly what the triangulation does — but from riders, who are visible on the street, rather than from restaurants, whose order books are not."
    },
    "sanityChecks": [
      "Turn the answer back into daily life. 147 crore orders a year is roughly 40 lakh a day nationally, which at thirteen drops a rider needs about three lakh riders out on the road. If you have stood on a Bengaluru arterial at eight in the evening, that is the right order — a few per cent of the two-wheelers going past, not one in ten and not one in five hundred.",
      "Check the transacting user against your own city. About 3.1 crore people ordering in a given month, out of 27 crore living in serviced areas, is roughly one person in nine. In an MBA classroom it would be nine in nine, which is the whole problem with estimating a consumer category from inside the consuming class.",
      "Put the ₹400 basket against the household food budget. A user ordering four times a month is spending about ₹1,600 on delivered food. For an urban household spending ₹12,000 to ₹15,000 a month on food, that is a tenth to an eighth of the food wallet — plausible for the ordering minority, and clearly impossible as a national average, which is another way of seeing why the 25% gate has to be there.",
      "Size it against eating out generally. India's whole food-service market — restaurants, canteens, street food, everything prepared outside the home — is of the order of ₹5 lakh crore. Gross order value of ₹58,900 crore makes delivery about one rupee in eight of that. High but believable, since delivery is concentrated in exactly the organised urban outlets where spend per head is highest.",
      "Split it across the players. Two large platforms carry most of this, so each would be earning of the order of ₹5,000 to ₹6,000 crore a year from food delivery, or roughly ₹1,400 crore a quarter. That is the same order of magnitude as the food-delivery segment figures listed Indian platforms report, which is as much confirmation as an estimate built this way deserves.",
      "Test the answer against the rider bill. Platform revenue of ₹12,500 crore against a rider payout bill of ₹9,100 crore says two-thirds of every rupee earned goes straight back out to the fleet before a single engineer, marketer or support agent is paid. Had your arithmetic produced revenue below the rider bill, the business would be structurally impossible, and you want to find that here rather than in the interviewer's follow-up."
    ],
    "answerBand": "₹9,000 to ₹18,000 crore. Anything in that range is reachable on an honest and different set of levers, mostly depending on what you assume about discounting and about how many people order in a month. Below ₹6,000 crore or above ₹25,000 crore, one of your rates is carrying weight it cannot bear — and if your answer is near ₹60,000 crore you have not made an arithmetic error, you have answered the other question.",
    "tree": {
      "root": "Annual food-delivery platform revenue, India",
      "rootFormula": "= Orders a year × Net platform revenue per order",
      "value": "≈ ₹12,500 crore",
      "branches": [
        {
          "label": "Orders a year",
          "formula": "Monthly transacting users × Orders per user per month × 12",
          "value": "≈ 147 crore orders",
          "note": "The volume engine. Everything on this branch is counted in people and orders — no rupees appear until the branch is finished.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Urban population",
              "formula": "140 crore × 35%",
              "value": "≈ 49 crore",
              "note": "The uncontested base. Rural India is excluded not by snobbery but by rider economics — a delivery needs enough orders inside a few kilometres to keep a rider busy."
            },
            {
              "label": "Living where delivery actually runs",
              "formula": "49 crore × 55%",
              "value": "≈ 27 crore",
              "note": "Platforms list hundreds of towns, but coverage in a small town is a few central pin codes, not the town. Serviceable is a smaller idea than listed."
            },
            {
              "label": "Adults in those cities",
              "formula": "27 crore × 70%",
              "value": "≈ 18.9 crore",
              "note": "Above the national 65% adult share, because cities carry working-age migrants and fewer children per household."
            },
            {
              "label": "With a smartphone and a payment method",
              "formula": "18.9 crore × 65%",
              "value": "≈ 12.3 crore",
              "note": "The gate is not phone ownership alone — it is a handset of one's own plus UPI or a card, which knocks out most of the oldest and the poorest tier."
            },
            {
              "label": "Ordering at least once this month",
              "formula": "12.3 crore × 25%",
              "value": "≈ 3.1 crore",
              "note": "The narrowest gate and the one campus intuition gets most wrong. Capability is not habit."
            },
            {
              "label": "Orders a month",
              "formula": "3.1 crore × 4 orders",
              "value": "≈ 12.3 crore orders",
              "note": "One order a month for every app-capable urban adult in the country, which is a cleaner way to state the pair of levers than either of them alone."
            }
          ]
        },
        {
          "label": "Gross order value",
          "formula": "Orders a year × Average order value",
          "value": "≈ ₹58,900 crore",
          "note": "The number the press prints and the question did not ask for. Compute it anyway — you need it as the denominator of the take rate, and naming it is how you prove you knew the difference.",
          "isCriticalPath": false,
          "children": [
            {
              "label": "Metro basket",
              "formula": "Order for two, main plus sides",
              "value": "≈ ₹450",
              "note": "Higher menu prices and a larger share of two-person orders."
            },
            {
              "label": "Smaller-city basket",
              "formula": "Order for one or two",
              "value": "≈ ₹320",
              "note": "Lower menu prices and more single-person orders placed at work."
            },
            {
              "label": "Blended average order value",
              "formula": "Volume-weighted towards the metros",
              "value": "₹400",
              "note": "Menu value of the food only. Delivery and platform fees are handled on the revenue branch so they cannot be counted twice."
            }
          ]
        },
        {
          "label": "Net platform revenue per order",
          "formula": "Commission + Customer fees + Advertising − Platform-funded discount",
          "value": "₹85, or 21% of the basket",
          "note": "The branch the question exists for. Build the take rate from named components — assert it as a single percentage and you have nothing to defend when it is challenged.",
          "isCriticalPath": true,
          "children": [
            {
              "label": "Commission from the restaurant",
              "formula": "₹400 × 18%",
              "value": "₹72",
              "note": "The largest single line, and the one under permanent negotiation — large chains pay materially less than an independent outlet."
            },
            {
              "label": "Delivery and platform fees from the customer",
              "formula": "Charged per order, waived for subscribers",
              "value": "₹30",
              "note": "Blended across full-fee orders and free-delivery subscribers. Visible on the bill, which is why candidates remember it and forget the commission."
            },
            {
              "label": "Advertising sold to restaurants",
              "formula": "≈ 2% of the basket",
              "value": "₹8",
              "note": "Small per order, high margin, and growing — a restaurant fighting for position on a crowded list will pay to be seen."
            },
            {
              "label": "Discount the platform funds itself",
              "formula": "≈ 6% of the basket",
              "value": "−₹25",
              "note": "The only negative term, invisible from the customer's side, and the reason two structurally identical estimates can differ by a third."
            },
            {
              "label": "Net revenue kept",
              "formula": "72 + 30 + 8 − 25",
              "value": "₹85",
              "note": "Revenue, not margin. The rider has not been paid yet."
            }
          ]
        }
      ]
    },
    "triangulation": {
      "label": "Rider-side cross-check",
      "route": "Bottom-up",
      "premise": "Come at it from the street instead of the wallet. Riders are the one part of this business anyone can count without access to a company — they are visible, branded and clustered at predictable hours. Count the fleet out on a day, multiply by the drops a rider makes, and you have orders. Then convert orders into revenue through the platform's cost structure rather than its take rate: the rider payout bill is the largest line against food-delivery revenue and runs at roughly two-thirds of it, so dividing gets you back to revenue without touching commission, fees, advertising or discounting. That is what makes this a genuine second opinion rather than the same chain walked backwards.",
      "lines": [
        {
          "id": "t1",
          "label": "Orders delivered a day",
          "expr": "320000 * 13",
          "display": "3.2 lakh riders on shift × 13 deliveries each",
          "result": 4160000,
          "tolerance": 1e-06,
          "unit": "orders per day",
          "carriedForward": "≈ 42 lakh a day",
          "uses": [
            "riders-on-shift",
            "deliveries-per-rider-day"
          ],
          "soWhat": "Against the 40 lakh a day the demand route implied at line c7. Two independent counts of the same flow, about three per cent apart — that is the check worth having, and it arrives before any money is involved."
        },
        {
          "id": "t2",
          "label": "Orders a year",
          "expr": "4160000 * 365",
          "display": "42 lakh a day × 365 days",
          "result": 1518400000,
          "tolerance": 1e-06,
          "unit": "orders per year",
          "carriedForward": "≈ 152 crore orders",
          "uses": [
            "days-per-year"
          ],
          "soWhat": "No seasonality adjustment, and say so — the monsoon peak and the summer trough roughly cancel, and pretending to model them at this precision would be theatre."
        },
        {
          "id": "t3",
          "label": "Total rider payout bill",
          "expr": "1518400000 * 60",
          "display": "152 crore deliveries × ₹60 paid to the rider",
          "result": 91104000000,
          "tolerance": 1e-06,
          "unit": "rupees per year",
          "carriedForward": "≈ ₹9,100 crore",
          "uses": [
            "rider-payout-per-delivery"
          ],
          "soWhat": "A cost, not a revenue, and the largest number on this page after gross order value. Note that it is already double the ₹30 the customer pays for delivery — the customer has never funded the ride."
        },
        {
          "id": "t4",
          "label": "Platform revenue implied by the cost structure",
          "expr": "91104000000 / 0.65",
          "display": "₹9,100 crore rider cost ÷ 65% of revenue",
          "result": 140160000000,
          "tolerance": 1e-06,
          "unit": "rupees per year",
          "carriedForward": "≈ ₹14,000 crore",
          "uses": [
            "rider-cost-share-of-revenue"
          ],
          "soWhat": "Inverting a cost ratio to recover revenue is a move worth naming aloud, because it only works when the cost line is genuinely dominant. Try it on marketing spend and you would get nonsense."
        }
      ],
      "answer": "≈ ₹14,000 crore of platform revenue, against ₹12,500 crore from the demand route",
      "verdict": "Twelve per cent apart, which is about the right amount of disagreement — close enough to confirm the power of ten, far enough apart to be informative rather than lucky. Both routes agree on the shape of the business: something near 150 crore orders a year and a revenue pool in the low tens of thousands of crore. The gap is worth one sentence of reconciliation, and the place to look is the rider count. A rider logged into two apps at once is one backpack on the street and two entries in the platforms' fleet numbers, so a street count and a company count are not measuring the same thing — correct for that and this route comes down towards the demand answer. Deliveries per rider pulls the same way: thirteen is a metro number, and riders in smaller cities with thinner order density do fewer. What you must not do is average the two and present ₹13,250 crore. Averaging two soft estimates does not halve the error; it only hides which one you believe."
    },
    "probes": [
      {
        "question": "You said ₹12,500 crore. I have read that Indian food delivery is a ₹60,000 crore market. Which of us is wrong?",
        "intent": "Whether you understand that both numbers are right and describe different things, or whether an external anchor makes you abandon your own structure.",
        "goodAnswer": "Says neither — ₹58,900 crore is gross order value, the money customers spend, and ₹12,500 crore is what the platforms keep, about 21% of it. Points out that the published figure is a useful check on the order count rather than on the answer, so it validates the volume side of the chain and leaves the take rate still to be defended. Asks which reading the interviewer wanted, since the whole question turns on it.",
        "weakAnswer": "Revises the answer upward to match the remembered figure, trading a defensible structure for a number the candidate cannot explain."
      },
      {
        "question": "Take me through one order. Where do the four hundred rupees end up?",
        "intent": "Whether the take rate is a real decomposition in your head or a percentage you asserted.",
        "goodAnswer": "Walks it: about ₹328 to the restaurant after ₹72 of commission, the customer separately paying roughly ₹30 in delivery and platform fees, around ₹8 of advertising attributable to the order, and ₹25 of discount the platform funds — leaving ₹85. Then adds the line that matters: ₹60 of that ₹85 goes to the rider, so the platform keeps about ₹25 to pay for everything else.",
        "weakAnswer": "Restates twenty per cent in different words, or describes the flows qualitatively without ever making them add up to ₹400."
      },
      {
        "question": "Suppose both large platforms stop funding discounts tomorrow. Does your answer go up by eighteen per cent?",
        "intent": "Whether you can see that a lever in your arithmetic is also a lever in the market, and that the two do not move independently.",
        "goodAnswer": "No — revenue per order rises, but the discount was buying orders, so volume falls and the two effects fight. Says which dominates and why: discounting mainly buys the marginal, price-sensitive occasion rather than the habitual dinner order, so the revenue effect probably wins in the short run while the volume effect compounds if a rival keeps discounting. Notes that this is precisely why a disciplined duopoly can hold the line and a fragmented market cannot.",
        "weakAnswer": "Applies the sensitivity grid mechanically and reports plus eighteen per cent, treating a strategic variable as a constant of nature."
      },
      {
        "question": "Commission is your largest revenue line. What stops a big restaurant chain from delisting and running its own delivery?",
        "intent": "Whether you can reason about the durability of a revenue pool rather than only its size.",
        "goodAnswer": "Names what the chain would have to replicate: demand discovery, which is where most orders actually start, and a rider fleet dense enough to deliver in thirty minutes off its own volume alone. Observes that the largest chains already negotiate commission well below the headline rate, which is the pressure valve, and that partial delisting to push regulars onto an own-brand app is the real threat rather than full exit. Concludes that the pool is defensible at the tail and contested at the top, which is why the effective rate sits below the published one.",
        "weakAnswer": "'Network effects' — a correct phrase that identifies no mechanism and predicts nothing about which restaurants leave."
      },
      {
        "question": "You excluded quick commerce. Defend that, and then tell me what including it would do.",
        "intent": "Scope discipline, and whether you can extend a structure instead of rebuilding it.",
        "goodAnswer": "Defends it on economics rather than tidiness — quick commerce is inventory the platform buys and sells, so the revenue is recognised differently and a commission take rate does not describe it at all. Says including it would mean a second structure built on dark stores, orders per store per day and gross margin on goods sold, not a bigger version of this one. Offers the direction: a larger order pool at a smaller basket, on a very different margin profile.",
        "weakAnswer": "'It is a different business' with no reason given, or agrees to fold it in and carries on multiplying, which quietly changes the unit halfway through the answer."
      }
    ],
    "finalAnswerNumeric": 125074950000,
    "tabLabel": "Food-delivery revenue, India",
    "finalAnswer": "≈ ₹12,500 crore of platform revenue a year across all food-delivery platforms in India, on roughly ₹58,900 crore of gross order value — a net take rate of about 21%. Every rate on this page is illustrative, built to show the method clearly, not asserted as verified market data.",
    "scope": {
      "countingWhat": "The revenue food-delivery platforms recognise as their own from the food-delivery business in one year, summed across every platform operating in India — commission billed to restaurants, fees collected from customers and advertising sold to restaurants, net of the discounts the platform itself funds. It is not the value of the food ordered.",
      "unit": "rupees per year",
      "timeBasis": "flow (per year)",
      "geography": "India, all cities and towns where delivery actually operates",
      "included": [
        "Commission the platform bills the restaurant on the value of the food",
        "Delivery charges and platform fees collected from the customer",
        "Advertising, sponsored listings and priority placement sold to restaurants",
        "Subscription fees for free-delivery programmes, net of the deliveries they buy"
      ],
      "excluded": [
        "The value of the food itself — that is the restaurant's revenue, not the platform's",
        "GST and other taxes collected on behalf of the government",
        "Quick commerce and grocery delivery, which run on the same apps and are larger in places",
        "Dining-out, table booking and events revenue on the same platforms",
        "Orders a restaurant takes on its own phone line and delivers with its own staff",
        "The rider's earnings, which are the platform's cost and not anybody's revenue"
      ],
      "boundaryTrap": "'How big is food delivery in India' has two readings that differ by roughly a factor of five. Gross order value is the money customers spend, and it is the figure the press prints because it is the larger one. Platform revenue is the slice the platform keeps, and it is what this question asked for. Say which one you are estimating in your first sentence — and while you are drawing the boundary, exclude quick commerce out loud, because the same app now sells groceries in ten minutes and on some platforms that business already moves more money than the food does. A scope error here is not a detail; it is the whole answer."
    },
    "calculation": [
      {
        "id": "c1",
        "label": "Urban population",
        "expr": "1400000000 * 0.35",
        "display": "140 crore × 35% urban",
        "result": 490000000,
        "tolerance": 1e-06,
        "unit": "people",
        "carriedForward": "≈ 49 crore",
        "uses": [
          "population",
          "urban-share"
        ],
        "soWhat": "Rural India is dropped here in one line and it should be defended in one line: delivery needs a rider to find his next pickup within a few kilometres, and outside towns that density does not exist."
      },
      {
        "id": "c2",
        "label": "Population where delivery is serviceable",
        "expr": "490000000 * 0.55",
        "display": "49 crore urban × 55% in serviced areas",
        "result": 269500000,
        "tolerance": 1e-06,
        "unit": "people",
        "carriedForward": "≈ 27 crore",
        "uses": [
          "served-city-share"
        ],
        "soWhat": "The step candidates skip, because 'urban' feels as though it already means 'has apps'. It does not. A platform listing a town usually means it has lit up a few central pin codes, and the difference between listed and serviced is nearly half the urban base."
      },
      {
        "id": "c3",
        "label": "Adults in serviced areas",
        "expr": "269500000 * 0.70",
        "display": "27 crore × 70% aged 18 and over",
        "result": 188650000,
        "tolerance": 1e-06,
        "unit": "adults",
        "carriedForward": "≈ 18.9 crore",
        "uses": [
          "urban-adult-share"
        ],
        "soWhat": "Use the urban adult share rather than the national one, and say why — cities are demographically older at the bottom end because the children stayed behind."
      },
      {
        "id": "c4",
        "label": "Adults with a smartphone and a payment method",
        "expr": "188650000 * 0.65",
        "display": "18.9 crore adults × 65% app-and-payment capable",
        "result": 122622500,
        "tolerance": 1e-06,
        "unit": "adults",
        "carriedForward": "≈ 12.3 crore",
        "uses": [
          "app-capable-share"
        ],
        "soWhat": "This is the ceiling on the business, not its size. Everything after this line is about habit rather than access, and conflating the two is how candidates arrive at answers three times too large."
      },
      {
        "id": "c5",
        "label": "Users transacting in a month",
        "expr": "122622500 * 0.25",
        "display": "12.3 crore capable × 25% ordering this month",
        "result": 30655625,
        "tolerance": 1e-06,
        "unit": "users",
        "carriedForward": "≈ 3.1 crore",
        "uses": [
          "transacting-share"
        ],
        "soWhat": "Three crore people out of a hundred and forty. Say that ratio aloud, because it is the one the room will resist — everyone in a Gurgaon classroom orders in, and the country is not the room."
      },
      {
        "id": "c6",
        "label": "Orders a month",
        "expr": "30655625 * 4",
        "display": "3.07 crore users × 4 orders each",
        "result": 122622500,
        "tolerance": 1e-06,
        "unit": "orders per month",
        "carriedForward": "≈ 12.3 crore orders",
        "uses": [
          "orders-per-user-month"
        ],
        "soWhat": "Notice where this lands — exactly back on the app-capable base from c4, because a quarter of people ordering four times each is one order a month per capable adult. That restatement is easier to defend than either lever alone, and it is a free check that the pair is not absurd."
      },
      {
        "id": "c7",
        "label": "Orders a year",
        "expr": "122622500 * 12",
        "display": "12.26 crore a month × 12 months",
        "result": 1471470000,
        "tolerance": 1e-06,
        "unit": "orders per year",
        "carriedForward": "≈ 147 crore orders",
        "uses": [
          "months-per-year"
        ],
        "soWhat": "About 40 lakh orders a day across the country. Hold that figure — it is the one the supply-side cross-check has to reproduce from riders, and a daily order count is far easier to sanity-test than a rupee total."
      },
      {
        "id": "c8",
        "label": "Gross order value",
        "expr": "1471470000 * 400",
        "display": "147 crore orders × ₹400 average basket",
        "result": 588588000000,
        "tolerance": 1e-06,
        "unit": "rupees per year",
        "carriedForward": "≈ ₹58,900 crore",
        "uses": [
          "average-order-value"
        ],
        "soWhat": "This is the number the headlines call the market, and it is not the answer. Nearly four rupees in five of it belongs to the restaurant. Compute it, name it, and keep going — stopping here is the most expensive mistake available on this question."
      },
      {
        "id": "c9",
        "label": "Commission per order",
        "expr": "400 * 0.18",
        "display": "₹400 basket × 18% commission",
        "result": 72,
        "tolerance": 1e-06,
        "unit": "rupees per order",
        "uses": [
          "average-order-value",
          "commission-rate"
        ],
        "soWhat": "The largest revenue line, invisible to the customer, and the one under permanent renegotiation — which is why the take rate is a statement about bargaining power rather than a constant of nature."
      },
      {
        "id": "c10",
        "label": "Net platform revenue per order",
        "expr": "72 + 30 + 8 - 25",
        "display": "₹72 commission + ₹30 customer fees + ₹8 advertising − ₹25 platform-funded discount",
        "result": 85,
        "tolerance": 1e-06,
        "unit": "rupees per order",
        "uses": [
          "customer-fee-per-order",
          "ad-revenue-per-order",
          "platform-funded-discount"
        ],
        "soWhat": "Four named components instead of one asserted percentage. When the interviewer pushes — and on this question she will — you have four separate things to defend rather than one number with nothing behind it."
      },
      {
        "id": "c11",
        "label": "Implied net take rate",
        "expr": "85 / 400",
        "display": "₹85 kept ÷ ₹400 basket",
        "result": 0.2125,
        "tolerance": 1e-06,
        "unit": "share of order value",
        "carriedForward": "≈ 21%",
        "uses": [
          "average-order-value"
        ],
        "soWhat": "State this ratio before you state the answer. It is the bridge between the two readings of the question, and it tells the interviewer in one number that you knew there were two."
      },
      {
        "id": "c12",
        "label": "Annual platform revenue, all players",
        "expr": "1471470000 * 85",
        "display": "147 crore orders × ₹85 net revenue each",
        "result": 125074950000,
        "tolerance": 1e-06,
        "unit": "rupees per year",
        "carriedForward": "≈ ₹12,500 crore",
        "uses": [],
        "soWhat": "The answer, and roughly a fifth of the gross order value on line c8. Say both figures in the same breath and label them, because the interviewer is listening for whether you can tell them apart."
      }
    ],
    "orderOfMagnitude": "10^11 rupees — ₹12,500 crore, so tens of thousands of crore and not lakhs of crore. Gross order value is 10^11 as well, but at the top of that decade rather than the bottom, so being right to the power of ten does not save you here. That is what makes this one Hard.",
    "assumptions": [
      {
        "id": "population",
        "lever": "Population of India",
        "value": "140 crore",
        "numeric": 1400000000,
        "unit": "people",
        "basis": "census-anchor",
        "defence": "The 2011 Census counted 121 crore and growth has run under 1% a year since — 140 crore is the figure every Indian interviewer carries and nobody will spend a minute on it.",
        "confidence": "anchor",
        "contestedBy": "145 crore is equally sayable. It moves the answer by under 4% and is not worth any of your timebox."
      },
      {
        "id": "urban-share",
        "lever": "Urban share of population",
        "value": "35%",
        "numeric": 0.35,
        "unit": "share of population",
        "basis": "census-anchor",
        "defence": "The last census put urban India near 31% and the trend has run at roughly half a point a year since, which lands at about 35% today.",
        "confidence": "anchor",
        "contestedBy": "40% if you count peri-urban districts that are functionally towns. It lifts the answer by about a seventh and does not change the power of ten."
      },
      {
        "id": "served-city-share",
        "lever": "Urban population living where delivery is actually serviceable",
        "value": "55%",
        "numeric": 0.55,
        "unit": "share of urban population",
        "basis": "structural-logic",
        "defence": "A delivery is only viable where a rider can find his next pickup within a few kilometres, so coverage collapses below a density threshold — the metros and larger cities are fully served, and a listed small town usually means a handful of central pin codes rather than the whole town.",
        "confidence": "judgement",
        "contestedBy": "Platforms cite listed-town counts running into the hundreds, which implies a far higher share. Listed is not serviced; accept 75% and the answer rises by about a third."
      },
      {
        "id": "urban-adult-share",
        "lever": "Adult share of the population in served cities",
        "value": "70%",
        "numeric": 0.7,
        "unit": "share of population",
        "basis": "structural-logic",
        "defence": "Nationally about 65% of Indians are 18 or over, and cities sit above that because working-age migration lands in them and urban households carry fewer children.",
        "confidence": "defensible",
        "contestedBy": "Hold it at the national 65% and the answer falls by about 7% — real, but smaller than the argument costs."
      },
      {
        "id": "app-capable-share",
        "lever": "Served-city adults with a personal smartphone and a digital payment method",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share of adults",
        "basis": "observed-behaviour",
        "defence": "The gate is not a phone in the household but a handset of one's own plus UPI or a card, which is close to universal among urban adults under forty and thins out sharply above sixty and in the lowest income tier.",
        "confidence": "defensible",
        "contestedBy": "An interviewer quoting national smartphone-user counts may push to 80%. That lifts the answer by about a quarter, and it conflates household access with a personal, payment-linked handset."
      },
      {
        "id": "transacting-share",
        "lever": "App-capable urban adults who place at least one order in a given month",
        "value": "25%",
        "numeric": 0.25,
        "unit": "share of app-capable adults",
        "basis": "declared-judgement",
        "defence": "Downloading is cheap and ordering is not — most people who have the app use it for an occasion rather than a routine, and a quarter transacting in any one month is the most a category competing with a home kitchen and an office canteen can plausibly hold.",
        "confidence": "judgement",
        "contestedBy": "Anything from 20% to 35% is arguable and the answer moves one-for-one with it. This is the lever campus candidates inflate, because everyone in the room orders weekly."
      },
      {
        "id": "orders-per-user-month",
        "lever": "Orders per transacting user per month",
        "value": "4",
        "numeric": 4,
        "unit": "orders per user per month",
        "basis": "observed-behaviour",
        "defence": "The distribution is two-humped — a large group ordering once or twice for a weekend occasion and a small, dense group of young professionals ordering several times a week — and four is where that mix blends.",
        "confidence": "judgement",
        "contestedBy": "Three is defensible if you weight the occasional user harder, and takes the answer to about ₹9,400 crore."
      },
      {
        "id": "months-per-year",
        "lever": "Months in a year",
        "value": "12",
        "numeric": 12,
        "unit": "months",
        "basis": "physical-constant",
        "defence": "Twelve, with no seasonality adjustment, because the monsoon lift and the summer dip roughly cancel over a year.",
        "confidence": "anchor"
      },
      {
        "id": "average-order-value",
        "lever": "Average order value, menu value of the food only",
        "value": "₹400",
        "numeric": 400,
        "unit": "rupees per order",
        "basis": "observed-behaviour",
        "defence": "A typical order is a main dish and a side for one or two people — around ₹450 at metro menu prices and closer to ₹320 in smaller cities, blending to ₹400 once volume is weighted towards the metros.",
        "confidence": "defensible",
        "contestedBy": "Platforms quote a higher figure because their gross order value includes delivery charges and taxes. Use their number here and you double-count the customer fees that appear again on the revenue branch."
      },
      {
        "id": "commission-rate",
        "lever": "Commission the platform bills the restaurant",
        "value": "18% of the food value",
        "numeric": 0.18,
        "unit": "share of order value",
        "basis": "published-benchmark",
        "defence": "Published restaurant-partner terms and the industry's periodic public disputes both put headline commission in the high teens to low twenties, and the effective rate sits at the bottom of that band because large chains negotiate it down.",
        "confidence": "defensible",
        "contestedBy": "22% is the number restaurant associations quote when they are protesting. It lifts the answer by about a fifth — and overstates it, because the loudest complainants are the outlets with the least bargaining power."
      },
      {
        "id": "customer-fee-per-order",
        "lever": "Delivery and platform fees collected from the customer, per order",
        "value": "₹30",
        "numeric": 30,
        "unit": "rupees per order",
        "basis": "observed-behaviour",
        "defence": "Read your own bill: a delivery charge in the ₹25 to ₹50 range plus a small flat platform fee, blended down because subscribers pay no delivery charge and a large share of orders come from them.",
        "confidence": "defensible",
        "contestedBy": "₹45 is what a non-subscriber pays on a short-distance order. Using the sticker rate rather than the blended rate is the standard way this line gets overstated."
      },
      {
        "id": "ad-revenue-per-order",
        "lever": "Advertising and listing revenue per order",
        "value": "₹8",
        "numeric": 8,
        "unit": "rupees per order",
        "basis": "published-benchmark",
        "defence": "Platforms describe advertising as a small but fast-growing and high-margin line, of the order of a few per cent of order value — two per cent of a ₹400 basket is the conservative reading of that.",
        "confidence": "judgement",
        "contestedBy": "Four per cent is arguable on a crowded metro listing page. It adds about 9% to the answer and is the line most likely to be larger in three years than it is today."
      },
      {
        "id": "platform-funded-discount",
        "lever": "Discount the platform funds itself, per order",
        "value": "₹25",
        "numeric": 25,
        "unit": "rupees per order",
        "basis": "declared-judgement",
        "defence": "Most of the discount a customer sees is funded by the restaurant buying visibility, but the platform carries the rest — first-order offers, free-delivery waivers and festive promotions — and roughly six per cent of the basket is the honest middle of a range nobody outside the company can observe.",
        "confidence": "shaky",
        "contestedBy": "Anywhere from ₹10 in a disciplined year to ₹45 in a competitive one. This is the widest lever on the page and it is the one tested in the sensitivity grid."
      },
      {
        "id": "riders-on-shift",
        "lever": "Delivery riders out on shift on a typical day, all platforms",
        "value": "3.2 lakh",
        "numeric": 320000,
        "unit": "riders per day",
        "basis": "observed-behaviour",
        "defence": "Stand at a busy junction in Gurgaon or Indiranagar at eight in the evening and count the branded backpacks against the total two-wheeler flow — that ratio scaled across the served cities lands in the low lakhs, which is also the order of magnitude platforms describe when they discuss active fleets.",
        "confidence": "judgement",
        "contestedBy": "Registered rider counts run several times higher because most riders work part time and many are logged into two apps at once. Use the registration figure and this route over-counts badly."
      },
      {
        "id": "deliveries-per-rider-day",
        "lever": "Deliveries completed per rider per shift",
        "value": "13",
        "numeric": 13,
        "unit": "deliveries per rider per day",
        "basis": "observed-behaviour",
        "defence": "A shift is built around the lunch and dinner peaks, a round trip with pickup waiting and traffic runs close to thirty minutes, and the hours between peaks are mostly idle — eight to nine working hours at that rate gives twelve to fifteen.",
        "confidence": "judgement",
        "contestedBy": "Riders in dense metro clusters with batched orders do twenty or more. Applying the best cluster's productivity to the whole country is the classic way this route inflates."
      },
      {
        "id": "days-per-year",
        "lever": "Operating days in a year",
        "value": "365",
        "numeric": 365,
        "unit": "days",
        "basis": "physical-constant",
        "defence": "Delivery does not close — the weekend is the peak, not a holiday.",
        "confidence": "anchor"
      },
      {
        "id": "rider-payout-per-delivery",
        "lever": "Total rider payout per delivery, including incentives",
        "value": "₹60",
        "numeric": 60,
        "unit": "rupees per delivery",
        "basis": "observed-behaviour",
        "defence": "A base rate in the ₹30 to ₹40 range plus distance pay and peak-hour and streak incentives, which is why riders chase the dinner block — and it is the platform's cost, not the customer's ₹30 delivery fee.",
        "confidence": "defensible",
        "contestedBy": "₹50 in a market where rider supply is loose, ₹75 in a monsoon week. That band moves this route by about a fifth either way."
      },
      {
        "id": "rider-cost-share-of-revenue",
        "lever": "Rider payout as a share of platform food-delivery revenue",
        "value": "65%",
        "numeric": 0.65,
        "unit": "share of revenue",
        "basis": "published-benchmark",
        "defence": "Platform disclosures consistently show delivery cost as by far the largest line against food-delivery revenue, running around two-thirds of it and falling slowly as batching improves — which is exactly why a 21% take rate is not a 21% margin.",
        "confidence": "judgement",
        "contestedBy": "Anywhere from 55% to 75% depending on the year and the batching rate. The whole band keeps this cross-check inside ₹12,000 to ₹16,500 crore."
      }
    ],
    "question": "What do India's food-delivery platforms earn in a year — not what their customers spend?",
    "traps": [
      {
        "trap": "Handing back gross order value as the answer.",
        "whyItHappens": "Line c8 produces ₹58,900 crore and it feels finished — it is large, it is in rupees, and it matches the figure the candidate half-remembers from a headline, because gross order value is what platforms lead with and what the press repeats. The chain stops because it produced a quotable number, not because it answered the question. The error is not small: it overstates the answer by roughly a factor of five.",
        "fix": "Write 'whose money is this?' beside every line as you go. At c8 the answer is 'the restaurant's, mostly', and that sentence forces the next step. Structurally, put the take-rate branch in your opening structure rather than adding it later — if it is in the structure you cannot forget it, and if it is a caveat you meant to mention, you will."
      },
      {
        "trap": "Building the take rate as a single asserted percentage.",
        "whyItHappens": "'Platforms take about twenty per cent' is a real thing candidates have read, and it is roughly right, so it looks efficient. But an asserted percentage has nothing behind it: when the interviewer asks why twenty and not thirty there is no answer, and when she asks what happens if commission is capped by regulation the structure cannot respond, because commission never appeared as a separate object.",
        "fix": "Decompose it — commission, customer fees, advertising, minus platform-funded discounts. Four things you can defend, four things you can flex, and a number that arrives in roughly the same place while showing where it came from."
      },
      {
        "trap": "Forgetting that the platform pays for part of the discount.",
        "whyItHappens": "Every other term in the chain is money coming in, so the mind builds an addition. The discount is invisible from the customer's side of the transaction — you see fifty rupees off and you cannot see whether the restaurant bought that visibility or the platform funded the acquisition — so nothing reminds you the term exists. Omit it and you overstate revenue by nearly a third.",
        "fix": "Write the negative term into the formula before you fill in any of the positives, so the shape of the line is commission plus fees plus advertising minus discount from the start."
      },
      {
        "trap": "Letting quick commerce in through the side door.",
        "whyItHappens": "The same app now delivers groceries in ten minutes, the same riders carry both, and on some platforms that business is already larger than the food. A candidate reaching for orders per user per month will silently include the grocery orders, because that is how they use the app, and the answer inflates with no visible error in the arithmetic.",
        "fix": "Exclude it out loud in your scoping sentence, and again when you set orders per user — 'four food orders a month, not four app orders a month'. Then offer it as the obvious extension if there is time, which turns a scope discipline into a second structure."
      },
      {
        "trap": "Reading a 21% take rate as a 21% margin.",
        "whyItHappens": "A fifth of every order sounds like a rich business, and the word 'take' invites the reading. But the rider payout alone is about two-thirds of that revenue, which is why the triangulation works at all, and technology, marketing and support come out of what is left. The candidate then answers the inevitable 'is this a good business?' from the wrong number.",
        "fix": "Say 'revenue, not margin' the moment you state the take rate, and keep the ₹60 rider payout visible next to the ₹85 of revenue. The gap between those two figures is the actual conversation about this industry."
      },
      {
        "trap": "Counting every urban Indian as addressable.",
        "whyItHappens": "'Urban' is the funnel step everyone remembers, and 49 crore is a satisfying base to start multiplying. But delivery runs where rider density works, and a platform that lists a town has usually lit up a few central pin codes in it. Skip the serviceability gate and you begin the chain nearly twice as wide as it should be.",
        "fix": "Insert the serviceable-area step explicitly and give it a physical reason rather than a statistical one — a rider needs his next pickup within a few kilometres, and below a density threshold the unit economics stop working at any price."
      }
    ],
    "teachingPoint": "A marketplace question has two answers sitting on top of each other, and only one of them was asked for. The money that moves through the app is the restaurant's; the money the platform keeps is a slice of it, and here the slice is roughly a fifth. Candidates who hand back gross order value are not out by a rounding error — they are out by a factor of about five, and they have answered a different question confidently. The transferable habit is to write 'whose money is this?' beside every line of the chain, and to treat the take rate as something you build from named components rather than assert as a percentage."
  }
] as const;

export const guesstimateById: Record<string, Guesstimate> = Object.fromEntries(
  guesstimates.map((g) => [g.id, g])
);
