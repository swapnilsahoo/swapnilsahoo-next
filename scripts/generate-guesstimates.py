"""Generate src/features/placements/data/guesstimates.ts from the authored JSON.

The data is emitted as a JSON literal (valid TypeScript object syntax) so no
hand-rolled string escaping can corrupt a quote, backtick or rupee sign.
Ordering follows scratch-plan/guesstimate-plan.json so the page has a
deliberate difficulty progression rather than filesystem order.
"""
import json, os, sys, re

AUTH = "content/guesstimates"
OUT  = "src/features/placements/data/guesstimates.ts"

order = [g["id"] for g in json.load(open("scratch-plan/guesstimate-plan.json", encoding="utf-8"))]
have  = {f[:-5] for f in os.listdir(AUTH) if f.endswith(".json")}
ids   = [i for i in order if i in have] + sorted(have - set(order))

entries = []
for n, gid in enumerate(ids, 1):
    d = json.load(open(os.path.join(AUTH, f"{gid}.json"), encoding="utf-8"))
    d["number"] = f"{n:02d}"
    # drop any key the interface does not declare, so tsc stays honest
    allowed = {"id","number","question","tabLabel","archetype","difficulty","timeboxMinutes",
               "teachingPoint","scope","routeChoice","tree","assumptions","calculation",
               "finalAnswer","finalAnswerNumeric","answerBand","orderOfMagnitude",
               "triangulation","sensitivity","sanityChecks","traps","probes"}
    extra = set(d) - allowed
    if extra: print(f"  note: {gid} dropping unexpected keys {sorted(extra)}", file=sys.stderr)
    entries.append({k: d[k] for k in allowed if k in d})

body = json.dumps(entries, ensure_ascii=False, indent=2)
body = re.sub(r'^\[', '', body); body = re.sub(r'\]$', '', body)

ts = '''import type {
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

export const guesstimates: readonly Guesstimate[] = [%s] as const;

export const guesstimateById: Record<string, Guesstimate> = Object.fromEntries(
  guesstimates.map((g) => [g.id, g])
);
''' % body

open(OUT, "w", encoding="utf-8", newline="\n").write(ts)
print("wrote %s  (%d entries, %d bytes)" % (OUT, len(entries), len(ts)))
