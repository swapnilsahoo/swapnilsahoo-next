"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  buildInterviewGuide,
  calculateUnitEconomics,
  improvedTaskBrief,
  weakTaskBrief,
} from "../course-tools";
import type { UnitEconomicsInput } from "../course-tools";
import "./course-tools.css";

const example: UnitEconomicsInput = {
  price: 150,
  variableCost: 90,
  fixedCost: 12000,
  capacity: 300,
  expectedUnits: 250,
};
const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
const count = (value: number) => new Intl.NumberFormat("en-IN").format(value);

function ToolShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id="course-tool" className="lab-course-tool" aria-labelledby="course-tool-title">
      <p className="lab-eyebrow">Make something useful</p>
      <h2 id="course-tool-title">{title}</h2>
      <p className="lab-small">
        Try the fictional example, then change the assumptions. The Lab does not save your edits;
        reloading clears them. No account is needed.
      </p>
      <noscript>
        <p className="lab-tool-notice">
          Interactive updates need JavaScript. Results show the original sample only, even if you
          change a field. Use the worked lesson for calculations, or select and copy a template
          manually.
        </p>
      </noscript>
      {children}
    </section>
  );
}

function CopyableDraft({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const field = useRef<HTMLTextAreaElement>(null);
  const [copyState, setCopyState] = useState({ value: "", message: "" });
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState({ value, message: "Copied. Paste it into your own notes to keep it." });
    } catch {
      field.current?.focus();
      field.current?.select();
      setCopyState({
        value,
        message:
          "Copy is unavailable here. The text is selected: use your device’s Copy command, or Ctrl+C / ⌘C.",
      });
    }
  }
  return (
    <div className="lab-tool-draft">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        ref={field}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={17}
        spellCheck
      />
      <div className="lab-tool-actions">
        <button className="lab-button" type="button" onClick={copy} disabled={!value.trim()}>
          Copy my draft
        </button>
        <span role="status">{copyState.value === value ? copyState.message : ""}</span>
      </div>
    </div>
  );
}

function UnitEconomicsTool() {
  const [inputs, setInputs] = useState<Record<keyof UnitEconomicsInput, string>>(
    () =>
      Object.fromEntries(
        Object.entries(example).map(([key, value]) => [key, String(value)])
      ) as Record<keyof UnitEconomicsInput, string>
  );
  const values = Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => [key, value.trim() === "" ? NaN : Number(value)])
  ) as UnitEconomicsInput;
  const result = calculateUnitEconomics(values);
  const fields: [keyof UnitEconomicsInput, string, boolean][] = [
    ["price", "Price per lunch (₹)", false],
    ["variableCost", "Variable cost per lunch (₹)", false],
    ["fixedCost", "Fixed costs per month (₹)", false],
    ["capacity", "Capacity: lunches per month", true],
    ["expectedUnits", "Expected orders per month", true],
  ];
  const reset = () =>
    setInputs(
      Object.fromEntries(
        Object.entries(example).map(([key, value]) => [key, String(value)])
      ) as Record<keyof UnitEconomicsInput, string>
    );
  return (
    <ToolShell title="Change the numbers. Does the decision change?">
      <p>
        <strong>Tiffin Trail · fictional monthly model.</strong> The example includes ₹12,000 fixed
        costs and ₹90 variable cost per lunch. Expected orders are an assumption, not measured
        demand.
      </p>
      <div className="lab-tool-grid">
        <div>
          <div className="lab-tool-fields">
            {fields.map(([key, label, whole]) => (
              <div key={key}>
                <label htmlFor={`tool-${key}`}>{label}</label>
                <input
                  id={`tool-${key}`}
                  type="number"
                  min="0"
                  max={key === "fixedCost" ? 1000000000 : 1000000}
                  step={whole ? "1" : "0.01"}
                  inputMode={whole ? "numeric" : "decimal"}
                  value={inputs[key]}
                  onChange={(event) => setInputs({ ...inputs, [key]: event.target.value })}
                  aria-describedby="tool-input-help"
                />
              </div>
            ))}
          </div>
          <p id="tool-input-help" className="lab-small">
            Use non-negative amounts with at most two decimal places and whole lunches. Limits: ₹1
            million per lunch, ₹1 billion fixed costs and 1 million lunches.
          </p>
          <div className="lab-tool-actions">
            <button
              className="lab-button lab-button-secondary"
              type="button"
              onClick={() => setInputs({ ...inputs, price: "120" })}
            >
              Try ₹120 discount
            </button>
            <button className="lab-button lab-button-secondary" type="button" onClick={reset}>
              Reset example
            </button>
          </div>
        </div>
        <div className="lab-tool-result" aria-live="polite" aria-atomic="true">
          {result ? (
            <>
              <dl>
                <div>
                  <dt>Contribution per lunch</dt>
                  <dd>{currency(result.contribution)}</dd>
                </div>
                <div>
                  <dt>Break-even lunches</dt>
                  <dd>
                    {result.breakEvenUnits === null
                      ? "Not available"
                      : count(result.breakEvenUnits)}
                  </dd>
                </div>
                <div>
                  <dt>Feasible sales in this scenario</dt>
                  <dd>{count(result.feasibleUnits)} lunches</dd>
                </div>
                <div>
                  <dt>Result after listed monthly costs</dt>
                  <dd>{currency(result.operatingResult)}</dd>
                </div>
              </dl>
              <p>
                {result.breakEvenUnits === null ? (
                  result.contribution === 0 ? (
                    "Each sale contributes ₹0 to fixed costs. More volume cannot cover positive fixed costs; no volume-based break-even is calculated."
                  ) : (
                    "Each sale loses contribution before fixed costs. More sales worsen this model; no positive-sales break-even is calculated."
                  )
                ) : (
                  <>
                    Break-even = {currency(values.fixedCost)} ÷ {currency(result.contribution)},
                    rounded up to a whole lunch.{" "}
                    {result.breakEvenWithinCapacity
                      ? "That quantity fits within the entered capacity; demand still needs evidence."
                      : `It exceeds the ${count(values.capacity)}-lunch capacity. This price cannot cover the listed costs within that capacity.`}
                  </>
                )}
              </p>
              <p>
                {result.unservedUnits > 0 ? (
                  <>
                    Expected orders exceed capacity by {count(result.unservedUnits)}. The result
                    uses only {count(result.feasibleUnits)} feasible sales; it does not assume extra
                    capacity is free.
                  </>
                ) : (
                  <>
                    At {count(result.feasibleUnits)} lunches: {currency(result.revenue)} revenue −{" "}
                    {currency(values.variableCost * result.feasibleUnits)} variable costs −{" "}
                    {currency(values.fixedCost)} fixed costs = {currency(result.operatingResult)}.
                  </>
                )}
              </p>
              <p className="lab-small">
                One product, constant costs and price within the entered capacity. Excludes tax,
                financing and unlisted costs. This is a simplified operating result, not full
                accounting profit.
              </p>
            </>
          ) : (
            <p role="alert">
              Enter all five values within the limits shown. Use whole lunches and amounts with no
              more than two decimal places.
            </p>
          )}
        </div>
      </div>
      <details className="lab-tool-explanation">
        <summary>What should I notice?</summary>
        <p>
          At ₹150, contribution is ₹60 and break-even is 200 lunches. At ₹120, contribution falls to
          ₹30 and break-even rises to 400, beyond the 300-lunch capacity. Higher orders alone cannot
          repair that gap. Test a cost, price or capacity assumption and explain what evidence would
          support changing it.
        </p>
      </details>
    </ToolShell>
  );
}

function TaskBriefTool() {
  const [draft, setDraft] = useState(improvedTaskBrief);
  return (
    <ToolShell title="Build a brief someone can check.">
      <div className="lab-tool-comparison">
        <article>
          <h3>Weak request</h3>
          <p>“{weakTaskBrief}”</p>
          <p>It names no permitted evidence, missing-fact rule or approval boundary.</p>
        </article>
        <article>
          <h3>Stronger contract</h3>
          <p>
            Draft only. Use the supplied enquiry and room policy. Flag what is missing. The named
            receptionist checks five conditions before approving.
          </p>
          <p>Clear instructions make errors inspectable; they do not guarantee a correct answer.</p>
        </article>
      </div>
      <p>
        Start with Sahaj Desk’s fictional room-booking request. Edit the task, evidence and reviewer
        for your own invented example. You can test the brief with a classmate; an AI account is
        optional.
      </p>
      <CopyableDraft
        id="tool-task-brief"
        label="Your editable task brief"
        value={draft}
        onChange={setDraft}
      />
      <div className="lab-tool-actions">
        <button
          className="lab-button lab-button-secondary"
          type="button"
          onClick={() => setDraft(improvedTaskBrief)}
        >
          Replace with improved example
        </button>
      </div>
      <details className="lab-tool-explanation">
        <summary>Pressure-test the brief</summary>
        <p>
          Keep the request for 5:30–7 pm while the room closes at 6 pm. Would your brief catch the
          conflict and avoid inventing price or availability? Ask the reviewer to mark each of the
          five checks pass or revise, then change the brief where it failed.
        </p>
      </details>
    </ToolShell>
  );
}

function CustomerQuestionsTool() {
  const [audience, setAudience] = useState("local residents who recently needed a clothing repair");
  const [task, setTask] = useState("get clothing repaired");
  const [draft, setDraft] = useState(() => buildInterviewGuide(audience, task));
  return (
    <ToolShell title="Build five questions about what happened.">
      <div className="lab-tool-comparison">
        <article>
          <h3>Leading hypothetical</h3>
          <p>“Would you pay for our convenient repair app?”</p>
          <p>It pitches a benefit and asks for an imagined future purchase.</p>
        </article>
        <article>
          <h3>Neutral recent behaviour</h3>
          <p>“Tell me about the last item you had repaired. What did you do next?”</p>
          <p>It leaves room for a different problem, an existing workaround or no difficulty.</p>
        </article>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setDraft(buildInterviewGuide(audience, task));
        }}
      >
        <div className="lab-tool-fields">
          <div>
            <label htmlFor="tool-audience">Who will you learn from?</label>
            <input
              id="tool-audience"
              required
              maxLength={180}
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tool-task">What did they need to do? Start with a verb.</label>
            <input
              id="tool-task"
              required
              maxLength={180}
              value={task}
              onChange={(event) => setTask(event.target.value)}
              aria-describedby="tool-task-help"
            />
            <p id="tool-task-help" className="lab-small">
              For example: get clothing repaired, arrange a meeting room or order lunch.
            </p>
          </div>
        </div>
        <button className="lab-button lab-button-secondary" type="submit">
          Build / replace my guide
        </button>
      </form>
      <CopyableDraft
        id="tool-interview-guide"
        label="Your editable interview guide and evidence log"
        value={draft}
        onChange={setDraft}
      />
      <details className="lab-tool-explanation">
        <summary>Keep the conclusion honest</summary>
        <p>
          If two of six volunteers report inconvenient travel, record two of six and how you found
          the volunteers. Permission to send trial details is not a booking or payment. Use repeated
          behaviour and contrary evidence to choose a small next test; do not turn praise into a
          market estimate.
        </p>
      </details>
    </ToolShell>
  );
}

export function CourseTool({ slug }: { slug: string }) {
  if (slug === "read-your-unit-economics") return <UnitEconomicsTool />;
  if (slug === "write-an-ai-task-brief") return <TaskBriefTool />;
  if (slug === "ask-better-customer-questions") return <CustomerQuestionsTool />;
  return null;
}
