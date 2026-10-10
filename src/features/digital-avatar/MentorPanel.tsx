"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { learningPaths, getLearningPath } from "@/features/learning-lab/catalogue";
import {
  getMentorLesson,
  mentorLessons,
  type MentorLesson,
  type MentorMode,
} from "./lesson-manifest";
import {
  calculateEconomics,
  economicsCases,
  economicsQuestions,
  lessonExplanation,
  readNumericAttempt,
} from "./mentor";

type Props = {
  action: MentorMode;
  lesson?: MentorLesson;
  onRead: (text: string) => void;
  onStopAudio: () => void;
  onNavigate: () => void;
};

function LessonSource({ lesson, onNavigate }: { lesson: MentorLesson; onNavigate: () => void }) {
  return (
    <Link
      className="avatar-mentor-source"
      href={new URL(lesson.canonicalUrl).pathname}
      onClick={onNavigate}
    >
      Open the original lesson ↗
    </Link>
  );
}

function Pathfinder({ onNavigate }: Pick<Props, "onNavigate">) {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("starting");
  const path = goal ? getLearningPath(goal) : undefined;
  return (
    <>
      <h3>Find a useful starting point</h3>
      <p>
        Choose your goal and starting point. This is a prepared route suggestion, not an assessment
        of your ability.
      </p>
      <label>
        My goal
        <select value={goal} onChange={(event) => setGoal(event.target.value)}>
          <option value="">Choose a goal</option>
          {learningPaths.map((item) => (
            <option value={item.slug} key={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        My starting point
        <select value={level} onChange={(event) => setLevel(event.target.value)}>
          <option value="starting">I am starting with the basics</option>
          <option value="practised">I have tried the basics and want more practice</option>
        </select>
      </label>
      {path && (
        <div className="avatar-mentor-feedback" aria-live="polite">
          <strong>{path.title}</strong>
          <p>{path.summary}</p>
          <p>
            {level === "starting"
              ? "Begin with the path's first free lesson, then attempt its case before comparing the worked reasoning."
              : "Use the path's practice and reflection tasks to check where your reasoning changes; choose the next resource after your attempt."}
          </p>
          <Link
            className="avatar-mentor-source"
            href={`/learning-lab/paths/${path.slug}`}
            onClick={onNavigate}
          >
            Follow this learning path ↗
          </Link>
        </div>
      )}
    </>
  );
}

function ReasoningReview({ lesson, onNavigate }: { lesson: MentorLesson; onNavigate: () => void }) {
  const unique = useId();
  const [attempt, setAttempt] = useState("");
  const [checks, setChecks] = useState<number[]>([]);
  const [reviewed, setReviewed] = useState(false);
  const [previous, setPrevious] = useState("");
  const [firstAttempt, setFirstAttempt] = useState("");
  const [revised, setRevised] = useState(false);
  const checklist = lesson.practiceChecklist;
  function review(event: FormEvent) {
    event.preventDefault();
    if (!attempt.trim()) return;
    setReviewed(true);
    setRevised(Boolean(previous && previous !== attempt.trim()));
    if (!firstAttempt) setFirstAttempt(attempt.trim());
    setPrevious(attempt.trim());
  }
  const gaps = checklist.filter((_, index) => !checks.includes(index));
  return (
    <>
      <h3>Review and revise your reasoning</h3>
      <p>
        Use the published lesson’s practice checklist to inspect a voluntary attempt. This prepared
        tool does not judge the meaning of your prose or award a grade.
      </p>
      <form onSubmit={review}>
        <label htmlFor={`${unique}-attempt`}>
          My decision and reasoning
          <textarea
            id={`${unique}-attempt`}
            data-testid="mentor-reasoning"
            value={attempt}
            onChange={(event) => {
              setAttempt(event.target.value);
              setReviewed(false);
            }}
            maxLength={1600}
            rows={5}
            placeholder="State your choice, evidence, assumption and trade-off. Avoid personal or confidential information."
            required
          />
        </label>
        <fieldset>
          <legend>Which prompts does your attempt answer?</legend>
          {checklist.map((prompt, index) => (
            <label className="avatar-mentor-check" key={prompt}>
              <input
                type="checkbox"
                checked={checks.includes(index)}
                onChange={(event) => {
                  setReviewed(false);
                  setChecks((current) =>
                    event.target.checked
                      ? [...current, index]
                      : current.filter((item) => item !== index)
                  );
                }}
              />
              <span>{prompt}</span>
            </label>
          ))}
        </fieldset>
        <button className="avatar-guide-primary" type="submit">
          {previous ? "Review my revision" : "Review my checklist"}
        </button>
      </form>
      {reviewed && (
        <div className="avatar-mentor-feedback" aria-live="polite">
          <strong>Automated practice feedback · self-check</strong>
          {gaps.length ? (
            <>
              <p>
                Your selected checklist leaves {gaps.length} prompt{gaps.length === 1 ? "" : "s"}{" "}
                open. Start with this specific revision:
              </p>
              <p>{gaps[0]}</p>
            </>
          ) : (
            <p>
              You marked every prompt as covered. Check that a reader can find actual case evidence
              and an explicit assumption for each; ticking boxes does not verify the reasoning.
            </p>
          )}
          <p>
            {revised
              ? "You changed your attempt. Compare your first and revised reasoning, and name the evidence or assumption that changed your decision."
              : "Revise one sentence to address the gap, then review the revision. Formal feedback and certification decisions stay with a human instructor."}
          </p>
          <details>
            <summary>My first submitted version</summary>
            <p>{firstAttempt}</p>
          </details>
        </div>
      )}
      <LessonSource lesson={lesson} onNavigate={onNavigate} />
      <p className="avatar-mentor-note">
        Your attempt stays in this open panel only. Closing, resetting or navigating clears it; no
        submission is sent.
      </p>
    </>
  );
}

function EconomicsPractice({
  lesson,
  onRead,
  onStopAudio,
  onNavigate,
}: Omit<Props, "action"> & { lesson: MentorLesson }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const [worked, setWorked] = useState(false);
  const [decision, setDecision] = useState("");
  const input = economicsCases[caseIndex];
  const questions = economicsQuestions(input);
  const current = questions[step];
  const discount = calculateEconomics(input, true);
  const complete = step === questions.length + 1;
  function resetCase(index: number) {
    onStopAudio();
    setCaseIndex(index);
    setStep(0);
    setValue("");
    setHint(0);
    setFeedback("");
    setCorrect(false);
    setWorked(false);
    setDecision("");
  }
  function next() {
    onStopAudio();
    setStep((index) => index + 1);
    setValue("");
    setHint(0);
    setFeedback("");
    setCorrect(false);
    setWorked(false);
  }
  function check(event: FormEvent) {
    event.preventDefault();
    onStopAudio();
    const answer = readNumericAttempt(value);
    if (answer === null) {
      setFeedback(
        "Enter a number for this arithmetic check; do not include an explanation in this field."
      );
      return;
    }
    const matches = answer === current.answer;
    setCorrect(matches);
    setFeedback(
      matches
        ? `Arithmetic checked. ${current.worked}`
        : `Try again. ${current.misconception} Ask for a hint to see the next step.`
    );
  }
  return (
    <>
      <h3>Practise unit economics</h3>
      <p className="avatar-mentor-case-label">{input.title}</p>
      <dl className="avatar-mentor-figures">
        <div>
          <dt>Price / unit</dt>
          <dd>₹{input.price}</dd>
        </div>
        <div>
          <dt>Variable cost / unit</dt>
          <dd>₹{input.variableCost}</dd>
        </div>
        <div>
          <dt>Fixed cost / month</dt>
          <dd>₹{input.fixedCost.toLocaleString("en-IN")}</dd>
        </div>
        <div>
          <dt>Capacity / month</dt>
          <dd>{input.capacity} units</dd>
        </div>
        <div>
          <dt>Discount price</dt>
          <dd>₹{input.discountPrice}</dd>
        </div>
      </dl>
      <p>
        Fictional monthly inputs. Capacity is a ceiling, not proven demand. Tax, finance and
        unlisted costs are excluded; operating remainder is not full profit.
      </p>
      {current ? (
        <>
          <p className="avatar-mentor-progress">
            Question {step + 1} of 5 · one calculation at a time
          </p>
          <h4>{current.prompt}</h4>
          <button
            type="button"
            className="avatar-guide-read"
            onClick={() => onRead(current.prompt)}
          >
            Read this question
          </button>
          <form onSubmit={check} className="avatar-mentor-number-form">
            <label>
              Your number
              <input
                data-testid="mentor-number"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setCorrect(false);
                  setFeedback("");
                }}
                inputMode="decimal"
                autoComplete="off"
                maxLength={25}
                required
              />
            </label>
            <button className="avatar-guide-primary" type="submit">
              Check calculation
            </button>
          </form>
          <div className="avatar-mentor-actions">
            <button
              type="button"
              className="avatar-guide-secondary"
              disabled={hint >= current.hints.length}
              onClick={() => {
                onStopAudio();
                setHint((index) => Math.min(index + 1, current.hints.length));
              }}
            >
              Give me a hint{hint > 0 ? ` (${hint}/${current.hints.length})` : ""}
            </button>
            <button
              type="button"
              className="avatar-guide-read"
              onClick={() => {
                onStopAudio();
                setWorked(true);
              }}
            >
              Show worked reasoning
            </button>
          </div>
          {hint > 0 && (
            <div className="avatar-mentor-feedback" aria-live="polite">
              <strong>Hint {hint}</strong>
              <p>{current.hints[hint - 1]}</p>
              <button
                className="avatar-guide-read"
                type="button"
                onClick={() => onRead(current.hints[hint - 1])}
              >
                Read this hint
              </button>
            </div>
          )}
          {feedback && (
            <p className="avatar-mentor-feedback" role="status">
              Automated arithmetic feedback: {feedback}
            </p>
          )}
          {worked && (
            <p className="avatar-mentor-feedback">
              Worked reasoning: {current.worked} Try the calculation yourself before continuing.
            </p>
          )}
          {(correct || worked) && (
            <button className="avatar-guide-primary" type="button" onClick={next}>
              Next question
            </button>
          )}
        </>
      ) : !complete ? (
        <>
          <p className="avatar-mentor-progress">Question 5 of 5 · defend the decision</p>
          <h4>Can the discounted price cover the listed fixed cost within capacity?</h4>
          <label>
            My decision
            <select
              data-testid="mentor-decision"
              value={decision}
              onChange={(event) => {
                setDecision(event.target.value);
                setCorrect(false);
                setFeedback("");
              }}
            >
              <option value="">Choose a conclusion</option>
              <option value="feasible">Yes, break-even is within capacity</option>
              <option value="not-feasible">No, break-even exceeds capacity</option>
              <option value="demand">Yes, because capacity guarantees demand</option>
            </select>
          </label>
          <button
            className="avatar-guide-primary"
            type="button"
            disabled={!decision}
            onClick={() => {
              const matches = decision === (discount.feasible ? "feasible" : "not-feasible");
              setCorrect(matches);
              setFeedback(
                matches
                  ? `Checked: ${discount.breakEven} whole units ${discount.feasible ? "fit within" : "exceed"} capacity ${input.capacity}. A different decision needs a changed cost, capacity or bounded experiment—not assumed demand.`
                  : decision === "demand"
                    ? "Capacity does not guarantee demand. Compare whole-unit break-even with the capacity ceiling."
                    : "Compare the discounted whole-unit break-even with monthly capacity. Return to the lesson if either input is unclear."
              );
            }}
          >
            Check decision
          </button>
          {feedback && (
            <p className="avatar-mentor-feedback" role="status">
              Automated decision feedback: {feedback}
            </p>
          )}
          {correct && (
            <button className="avatar-guide-primary" type="button" onClick={next}>
              Explain and revise my reasoning
            </button>
          )}
        </>
      ) : (
        <>
          <p className="avatar-mentor-feedback">
            The selected capacity conclusion was checked. Now defend the decision in words. Values
            revealed as worked reasoning are examples, rather than independently checked learner
            calculations; this practice does not establish mastery.
          </p>
          <ReasoningReview key={input.id} lesson={lesson} onNavigate={onNavigate} />
          <button
            className="avatar-guide-primary"
            type="button"
            onClick={() => resetCase(caseIndex === 0 ? 1 : 0)}
          >
            {caseIndex === 0 ? "Try a fresh case with new figures" : "Return to the original case"}
          </button>
        </>
      )}
      {!complete && <LessonSource lesson={lesson} onNavigate={onNavigate} />}
      <button className="avatar-guide-read" type="button" onClick={() => resetCase(caseIndex)}>
        Restart this case
      </button>
    </>
  );
}

function PublishedPractice({
  lesson,
  onRead,
  onNavigate,
}: {
  lesson: MentorLesson;
  onRead: Props["onRead"];
  onNavigate: Props["onNavigate"];
}) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [attempt, setAttempt] = useState("");
  const [hint, setHint] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const prompt = lesson.practiceChecklist[promptIndex];
  return (
    <>
      <h3>Practise the published case</h3>
      <p>{lesson.practiceCase}</p>
      <p className="avatar-mentor-progress">
        Prompt {promptIndex + 1} of {lesson.practiceChecklist.length}
      </p>
      <h4>{prompt}</h4>
      <button className="avatar-guide-read" type="button" onClick={() => onRead(prompt)}>
        Read this question
      </button>
      <label>
        My attempt
        <textarea
          value={attempt}
          onChange={(event) => {
            setAttempt(event.target.value);
            setRecorded(false);
          }}
          maxLength={1200}
          rows={4}
        />
      </label>
      <button className="avatar-guide-secondary" type="button" onClick={() => setHint(true)}>
        Give me a first hint
      </button>
      {hint && (
        <p className="avatar-mentor-feedback">
          Separate the supplied case facts from your assumption. Name one fact supporting your
          answer and one observation that could change it. Revisit the worked example for this skill
          before writing again.
        </p>
      )}
      <button
        className="avatar-guide-primary"
        type="button"
        disabled={!attempt.trim()}
        onClick={() => setRecorded(true)}
      >
        Reflect on my attempt
      </button>
      {recorded && (
        <div className="avatar-mentor-feedback">
          <p>
            Your attempt is available for your own reflection; its meaning has not been
            automatically graded. Can a reader identify the evidence, assumption and trade-off?
          </p>
          <button
            className="avatar-guide-primary"
            type="button"
            onClick={() => {
              setPromptIndex((index) => (index + 1) % lesson.practiceChecklist.length);
              setAttempt("");
              setHint(false);
              setRecorded(false);
            }}
          >
            {promptIndex === lesson.practiceChecklist.length - 1
              ? "Revisit the first prompt"
              : "Next prompt"}
          </button>
        </div>
      )}
      <LessonSource lesson={lesson} onNavigate={onNavigate} />
    </>
  );
}

export function MentorPanel({ action, lesson, onRead, onStopAudio, onNavigate }: Props) {
  const [selected, setSelected] = useState(lesson?.lessonId || "read-your-unit-economics");
  const active = lesson || getMentorLesson(selected)!;
  return (
    <section
      className="avatar-mentor-panel"
      data-testid="mentor-panel"
      aria-label="Prepared learning mentor"
    >
      <p className="avatar-mentor-note">
        Prepared learning guidance · automated practice checks · no formal assessment
      </p>
      {action === "find-path" ? (
        <Pathfinder onNavigate={onNavigate} />
      ) : (
        <>
          {lesson ? (
            <p className="avatar-mentor-context">
              Current lesson: <strong>{lesson.title}</strong>
            </p>
          ) : (
            <label>
              Choose a published lesson
              <select
                value={selected}
                onChange={(event) => {
                  onStopAudio();
                  setSelected(event.target.value);
                }}
              >
                {mentorLessons.map((item) => (
                  <option key={item.lessonId} value={item.lessonId}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {action === "explain" ? (
            <div key={active.lessonId}>
              <h3>A useful idea from this lesson</h3>
              <p>{lessonExplanation(active)}</p>
              <button
                className="avatar-guide-read"
                type="button"
                onClick={() => onRead(lessonExplanation(active))}
              >
                Read this explanation
              </button>
              <details>
                <summary>See the published illustration</summary>
                <p>{active.workedExamples[0]}</p>
              </details>
              <LessonSource lesson={active} onNavigate={onNavigate} />
            </div>
          ) : action === "review" ? (
            <ReasoningReview key={active.lessonId} lesson={active} onNavigate={onNavigate} />
          ) : active.lessonId === "read-your-unit-economics" ? (
            <EconomicsPractice
              key={active.lessonId}
              lesson={active}
              onRead={onRead}
              onStopAudio={onStopAudio}
              onNavigate={onNavigate}
            />
          ) : (
            <PublishedPractice
              key={active.lessonId}
              lesson={active}
              onRead={onRead}
              onNavigate={onNavigate}
            />
          )}
        </>
      )}
    </section>
  );
}
