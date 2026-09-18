export const meta = {
  name: 'author-guesstimates-batch-b',
  description: 'Author the remaining 7 deep guesstimates, each self-verified against a deterministic arithmetic checker',
  phases: [{ title: 'Author', detail: 'one agent per guesstimate, writes JSON to disk' }],
}

const REPO = 'C:/Users/swapn/swapnilsahoo-next.git/swapnilsahoo-next'

const BATCH = [
  { id: 'airport-runway-throughput', existing: false },
  { id: 'metro-ticketing-revenue', existing: false },
  { id: 'trucking-diesel', existing: false },
  { id: 'coffee-sachets-daily', existing: false },
  { id: 'tender-bid-expected-value', existing: false },
  { id: 'audit-capacity-cas', existing: false },
  { id: 'food-delivery-revenue-pool', existing: false },
]

const OUT = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    written: { type: 'boolean' },
    filePath: { type: 'string' },
    checkerPassed: { type: 'boolean' },
    checkerOutput: { type: 'string' },
    finalAnswer: { type: 'string' },
    calcLineCount: { type: 'number' },
    assumptionCount: { type: 'number' },
    selfCritique: { type: 'string' },
  },
  required: ['id', 'written', 'checkerPassed', 'finalAnswer', 'calcLineCount', 'assumptionCount'],
}

phase('Author')

const results = await parallel(
  BATCH.map((item) => () =>
    agent(
      `Author one guesstimate for the Guesstimates page of swapnilsahoo.com — the site
of Dr Swapnil Sahoo, strategy professor at Great Lakes Institute of Management,
Gurgaon. The page teaches MBA candidates to answer estimation questions in
consulting interviews.

Repo root: ${REPO}

READ FIRST:
  - scratch-plan/voice.md                 the authorial voice you MUST match
  - scratch-plan/schema.ts.txt            the full TypeScript target schema
  - scratch-plan/guesstimate-plan.json    find YOUR entry, id "${item.id}"
  - src/features/placements/data/guesstimates.ts   the 3 existing (shallow) entries
  - docs/editorial-standard.md            site-wide editorial rules

YOUR ASSIGNMENT: id "${item.id}".
${item.existing
  ? 'This ALREADY EXISTS in shallow form. Keep its question (you may sharpen the wording) and any good judgement already there, but rebuild it completely to the deep schema.'
  : 'This is NEW. Write the question yourself, guided by the archetype/difficulty in the plan.'}

ORIGINALITY — ABSOLUTE. Third-party casebooks were read for calibration only. Do
NOT reproduce any casebook case. Write original work. Indian context by default.

OUTPUT — write a single JSON file to:
  scratch-plan/authored/${item.id}.json

with exactly these top-level keys:
  id, question, tabLabel, archetype, difficulty, timeboxMinutes, teachingPoint,
  scope { countingWhat, unit, timeBasis, geography, included[], excluded[], boundaryTrap },
  routeChoice { chosen, why, rejectedRoute, rejectedWhyNot },
  tree { root, rootFormula, value, branches[ { label, formula, value, note, isCriticalPath, children[ {label, formula, value, note} ] } ] },
  assumptions[ { id, lever, value, numeric, unit, basis, defence, confidence, contestedBy } ],
  calculation[ { id, label, expr, display, result, tolerance, unit, carriedForward, uses[], soWhat } ],
  finalAnswer, finalAnswerNumeric, answerBand, orderOfMagnitude,
  triangulation { label, route, premise, lines[ same CalcLine shape ], answer, verdict },
  sensitivity { assumptionId, whyThisLever, cases[ {scenario, leverValue, answer, deltaVsBase} ], breakpoint, oneLiner },
  sanityChecks[], traps[ {trap, whyItHappens, fix} ], probes[ {question, intent, goodAnswer, weakAnswer} ]

  basis must be one of: census-anchor, published-benchmark, physical-constant,
    observed-behaviour, structural-logic, declared-judgement
  confidence must be one of: anchor, defensible, judgement, shaky
  difficulty must be one of: Easy, Medium, Hard
  chosen/route must be one of: Top-down, Bottom-up, Hybrid, Probabilistic
  timeBasis must be one of: "stock (point in time)", "flow (per day)",
    "flow (per week)", "flow (per year)"

ARITHMETIC — THE HARD CONSTRAINT. Every expr may contain ONLY digits, decimal
points, + - * / ( ) and spaces. No commas, no units, no %, no × or ÷, no
identifiers. Write "1300000000 * 0.35" not "1,300 Mn × 35%". The readable form
goes in 'display'.

SELF-VERIFY — MANDATORY LOOP. After writing the file, run:
    python scratch-plan/check_arith.py scratch-plan/authored
It evaluates every expr, compares to your 'result', and checks that every
'uses' id and 'sensitivity.assumptionId' exists in your assumptions. Fix your
file and re-run until YOUR id reports OK with 0 errors. Do not return until it
passes. Report the final checker output verbatim.

DEPTH IS THE POINT. The existing entries are shallow — four prose steps and a
number. Yours carries: explicit scope with a boundary trap; a route choice WITH
the rejected alternative and why it is weaker here; a valued issue tree (nodes
carry figures — the tree is a ledger, not a diagram); an assumption table with
basis, defence and confidence per row; a line-by-line calculation showing every
intermediate; an INDEPENDENT triangulation route, also fully worked and checked;
a sensitivity grid on the shakiest lever with a stated breakpoint; traps that
explain the mechanism; and interviewer probes with what good and weak answers
sound like.

Numbers must be roundable in the head — no calculator. Use anchors a prepared
Indian MBA candidate could defend (population ~1.4 bn, urban share ~35%,
household size ~4.5). Every assumption needs a one-sentence defence that
survives "why that number?".

Voice: second person, imperative, coach-behind-the-desk. British/Indian -ise
spelling. lakh/crore natural. Spaced em dash. No exclamation marks, no hype
words, no motivational filler. State uncertainty plainly.

tabLabel: SHORT, 2-4 words, for navigation (e.g. "Auto-rickshaws, Bengaluru").`,
      { label: `author:${item.id}`, phase: 'Author', schema: OUT }
    )
  )
)

const ok = results.filter(Boolean)
log(`Batch B: ${ok.length}/${BATCH.length} returned; ${ok.filter((r) => r.checkerPassed).length} passed the arithmetic checker`)
return ok
