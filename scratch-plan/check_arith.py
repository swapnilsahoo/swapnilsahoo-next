"""Deterministic arithmetic verifier for authored guesstimates.
Evaluates every CalcLine.expr and asserts it equals result.
Also checks referential integrity of `uses` and sensitivity.assumptionId.
"""
import json, os, re, sys, ast, operator

ALLOWED = set("0123456789.+-*/() \t")
OPS = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul,
       ast.Div: operator.truediv, ast.USub: operator.neg, ast.UAdd: operator.pos}

def safe_eval(expr):
    if not set(expr) <= ALLOWED:
        bad = sorted(set(expr) - ALLOWED)
        raise ValueError("illegal characters: %r" % bad)
    def ev(n):
        if isinstance(n, ast.Expression): return ev(n.body)
        if isinstance(n, ast.Constant):
            if not isinstance(n.value, (int, float)): raise ValueError("non-numeric constant")
            return n.value
        if isinstance(n, ast.BinOp): return OPS[type(n.op)](ev(n.left), ev(n.right))
        if isinstance(n, ast.UnaryOp): return OPS[type(n.op)](ev(n.operand))
        raise ValueError("disallowed node %s" % type(n).__name__)
    return ev(ast.parse(expr, mode="eval"))

def check_lines(lines, where, assumption_ids, errs, ctx):
    for ln in lines or []:
        lid = ln.get("id", "?")
        expr = ln.get("expr", "")
        try:
            got = safe_eval(expr)
        except Exception as e:
            errs.append("%s %s/%s: expr rejected (%s) :: %r" % (ctx, where, lid, e, expr)); continue
        want = ln.get("result")
        tol = ln.get("tolerance", 0) or 0
        if want is None:
            errs.append("%s %s/%s: no result field" % (ctx, where, lid)); continue
        denom = abs(want) if want else 1.0
        relerr = abs(got - want) / denom
        if relerr > max(tol, 1e-9):
            errs.append("%s %s/%s: %s = %.6g but result says %.6g (rel err %.4f)"
                        % (ctx, where, lid, expr, got, want, relerr))
        for u in ln.get("uses", []) or []:
            if u not in assumption_ids:
                errs.append("%s %s/%s: uses unknown assumption id %r" % (ctx, where, lid, u))

def check(obj):
    errs = []
    ctx = obj.get("id", "?")
    aid = {a.get("id") for a in obj.get("assumptions", []) or []}
    check_lines(obj.get("calculation"), "calc", aid, errs, ctx)
    tri = obj.get("triangulation") or {}
    check_lines(tri.get("lines"), "tri", aid, errs, ctx)
    sens = obj.get("sensitivity") or {}
    sa = sens.get("assumptionId")
    if sa and sa not in aid:
        errs.append("%s sensitivity.assumptionId %r not in assumptions" % (ctx, sa))
    calc = obj.get("calculation") or []
    if calc:
        last = calc[-1].get("result")
        fin = obj.get("finalAnswerNumeric")
        if fin is not None and last is not None:
            d = abs(last - fin) / (abs(fin) or 1.0)
            if d > 0.12:
                errs.append("%s: last calc line %.6g vs finalAnswerNumeric %.6g (%.1f%% apart)"
                            % (ctx, last, fin, d * 100))
    return errs

if __name__ == "__main__":
    d = sys.argv[1] if len(sys.argv) > 1 else "scratch-plan/authored"
    files = sorted(f for f in os.listdir(d) if f.endswith(".json"))
    total = 0
    for f in files:
        obj = json.load(open(os.path.join(d, f), encoding="utf-8"))
        e = check(obj)
        total += len(e)
        status = "OK  " if not e else "FAIL"
        print("%s %-34s lines=%-3d tri=%-3d assum=%-3d errors=%d"
              % (status, obj.get("id", f),
                 len(obj.get("calculation") or []),
                 len((obj.get("triangulation") or {}).get("lines") or []),
                 len(obj.get("assumptions") or []), len(e)))
        for x in e: print("      -", x)
    print("\n%d file(s), %d total error(s)" % (len(files), total))
    sys.exit(1 if total else 0)
