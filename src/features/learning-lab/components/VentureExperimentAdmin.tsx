"use client";

import { useRef, useState, type FormEvent } from "react";
import type { VentureAdminWorkspace, VentureRubric, VentureWorkspace } from "../venture-feedback";
import { ventureEvidenceRubric } from "../venture-experiment";
import { useLabHydrated } from "./useLabHydrated";
import { postLab, useLabQuery, WorkspaceStatus, type LabResponse } from "./WorkspaceControls";

type AdminResult = LabResponse & {
  records: VentureAdminWorkspace[];
  capacity: number;
  remaining: number;
  accepted: number;
};
const stageNames = ["Constraints", "Problem evidence", "Small test", "Decision"];

export function VentureExperimentAdmin() {
  const { data, error: loadError, loading, reload } = useLabQuery<AdminResult>("admin/venture");
  const hydrated = useLabHydrated();
  const [selectedId, setSelectedId] = useState("");
  const [stageNumber, setStageNumber] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reviewBases, setReviewBases] = useState<Record<string, number>>({});
  const reviewForm = useRef<HTMLFormElement>(null);
  const selected = data?.records.find((record) => record.id === selectedId) || data?.records[0];
  const stage = selected?.stages.find((item) => item.stage === stageNumber);
  const reviewKey = `${selected?.id}-${stageNumber}-${stage?.revision}`;
  const latestReviewRevision =
    stage?.reviews.find((review) => review.workRevision === stage.revision)?.reviewRevision || 0;
  async function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !stage?.revision || busy) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const rubric = Object.fromEntries(
      ventureEvidenceRubric.map((criterion) => [criterion.id, Number(values.get(criterion.id))])
    ) as VentureRubric;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await postLab<LabResponse & { workspace: VentureWorkspace }>(
        "admin/venture-review",
        {
          participantId: selected.id,
          stage: stageNumber,
          revision: stage.revision,
          feedback: String(values.get("feedback") || "").trim(),
          rubric,
          mentoringMinutes: Number(values.get("mentoringMinutes")),
          expectedReviewRevision: reviewBases[reviewKey] ?? latestReviewRevision,
        }
      );
      const savedReview = result.workspace.stages
        .find((item) => item.stage === stageNumber)
        ?.reviews.find((review) => review.workRevision === stage.revision);
      if (savedReview)
        setReviewBases((old) => ({ ...old, [reviewKey]: savedReview.reviewRevision }));
      setMessage(
        result.message ||
          "Human feedback and actual mentoring minutes saved for this submitted revision. No email was sent."
      );
      form.reset();
      reload();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Feedback was not confirmed saved. Keep your text and try again."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="lab-section space-y-6" aria-labelledby="venture-admin-title">
      <header>
        <p className="lab-eyebrow">Private founder feedback · first 20</p>
        <h2 id="venture-admin-title">Venture experiment reviews</h2>
        <p>
          Review the learner’s actual submitted work. Record formative feedback, evidence scores and
          the time you actually spent. Registration and submission do not establish that a customer
          experiment was completed.
        </p>
      </header>
      {loading && <p role="status">Loading private venture submissions…</p>}
      {loadError && <WorkspaceStatus message={loadError} error />}
      {error && <WorkspaceStatus message={error} error />}
      {message && <WorkspaceStatus message={message} />}
      <button
        type="button"
        className="lab-button lab-button-secondary"
        onClick={reload}
        disabled={!hydrated || busy || loading}
      >
        Refresh submissions
      </button>
      {data && (
        <>
          <p className="lab-small">
            {data.accepted} current feedback registrations; {data.remaining} of {data.capacity}{" "}
            places available. These are registrations, not completed experiments or learning gains.
          </p>
          {!data.records.length ? (
            <p>
              No venture feedback registrations yet. Do not create fictional participants or
              reviews.
            </p>
          ) : (
            <>
              <div className="lab-form-grid">
                <div className="lab-field">
                  <label htmlFor="venture-admin-person">Participant</label>
                  <select
                    id="venture-admin-person"
                    value={selected?.id || ""}
                    disabled={busy}
                    onChange={(event) => {
                      setSelectedId(event.target.value);
                      setStageNumber(1);
                      setMessage("");
                      setError("");
                    }}
                  >
                    {data.records.map((record) => (
                      <option key={record.id} value={record.id}>
                        {record.name} · {record.college}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lab-field">
                  <label htmlFor="venture-admin-stage">Stage</label>
                  <select
                    id="venture-admin-stage"
                    value={stageNumber}
                    disabled={busy}
                    onChange={(event) => {
                      setStageNumber(Number(event.target.value));
                      setMessage("");
                      setError("");
                    }}
                  >
                    {stageNames.map((name, index) => (
                      <option key={name} value={index + 1}>
                        {index + 1}. {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {selected && (
                <>
                  <aside className="lab-callout">
                    <h3>{selected.name}</h3>
                    <p className="break-words">
                      {selected.email} · {selected.college}
                    </p>
                    <p>
                      <strong>Idea:</strong> {selected.idea}
                    </p>
                    <p>
                      <strong>Constraints:</strong> {selected.constraints.minutesPerDay}{" "}
                      minutes/day; ₹{selected.constraints.affordableCommitment} affordable
                      commitment; {selected.constraints.customerAccess} customer access.
                    </p>
                    <p>
                      <strong>Skills:</strong> {selected.constraints.skills}
                    </p>
                    <p>
                      <strong>Relationships:</strong> {selected.constraints.relationships}
                    </p>
                  </aside>
                  {stage?.revision ? (
                    <>
                      <article className="lab-form space-y-4">
                        <h3>
                          {stageNames[stageNumber - 1]} · revision {stage.revision}
                        </h3>
                        <p className="lab-small">
                          Learner-reported work. Verify whether the evidence supports an actual
                          experiment; do not infer completion from this submission.
                        </p>
                        <p className="break-words whitespace-pre-wrap">{stage.work}</p>
                      </article>
                      <form
                        ref={reviewForm}
                        key={`${selected.id}-${stageNumber}-${stage.revision}`}
                        className="lab-form space-y-4"
                        onSubmit={review}
                        onChange={() =>
                          setReviewBases((old) =>
                            reviewKey in old ? old : { ...old, [reviewKey]: latestReviewRevision }
                          )
                        }
                      >
                        <fieldset
                          disabled={!hydrated || busy}
                          className="lab-form-fieldset space-y-4"
                        >
                          <legend className="font-semibold">
                            Record founder feedback for revision {stage.revision}
                          </legend>
                          {reviewKey in reviewBases &&
                            reviewBases[reviewKey] !== latestReviewRevision && (
                              <p className="lab-status">
                                Another saved review changed while this draft was open. Copy any
                                feedback you need, then discard this draft to use the latest loaded
                                review. Submitting this stale version will be refused.
                              </p>
                            )}
                          <div className="lab-field">
                            <label htmlFor="venture-admin-feedback">
                              Specific feedback and next bounded action *
                            </label>
                            <textarea
                              id="venture-admin-feedback"
                              name="feedback"
                              minLength={20}
                              maxLength={4000}
                              rows={6}
                              required
                              placeholder="Explain which evidence supports the decision, what remains an assumption, and one next affordable action."
                            />
                          </div>
                          <div className="lab-form-grid">
                            {ventureEvidenceRubric.map((criterion) => (
                              <div className="lab-field" key={criterion.id}>
                                <label htmlFor={`venture-admin-${criterion.id}`}>
                                  {criterion.criterion} *
                                </label>
                                <select
                                  id={`venture-admin-${criterion.id}`}
                                  name={criterion.id}
                                  defaultValue=""
                                  required
                                >
                                  <option value="">Choose a score after reading the work</option>
                                  {criterion.scores.map((score, index) => (
                                    <option key={score} value={index}>
                                      {score}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                          <div className="lab-field">
                            <label htmlFor="venture-admin-minutes">
                              Actual mentoring minutes for this review *
                            </label>
                            <input
                              id="venture-admin-minutes"
                              name="mentoringMinutes"
                              type="number"
                              min="1"
                              max="180"
                              step="1"
                              inputMode="numeric"
                              required
                            />
                            <p className="lab-small">
                              Enter time actually spent on this revision, not a planned allowance.
                              Updating this revision replaces its review; previous submitted
                              revisions retain their own history.
                            </p>
                          </div>
                          <button type="submit" className="lab-button" aria-busy={busy}>
                            {busy ? "Saving review…" : "Save human feedback"}
                          </button>
                          <button
                            type="button"
                            className="lab-text-link"
                            onClick={() => {
                              if (
                                !window.confirm(
                                  "Discard the current review draft and use the latest loaded review version? Copy any unsaved feedback first."
                                )
                              )
                                return;
                              reviewForm.current?.reset();
                              setReviewBases((old) => ({
                                ...old,
                                [reviewKey]: latestReviewRevision,
                              }));
                              setError("");
                            }}
                          >
                            Discard this review draft
                          </button>
                        </fieldset>
                      </form>
                      <div className="space-y-3">
                        <h3>Recorded feedback history</h3>
                        {stage.reviews.length ? (
                          stage.reviews.map((review, index) => (
                            <article
                              className="lab-callout"
                              key={`${review.workRevision}-${index}`}
                            >
                              <p className="lab-small">
                                Submitted revision {review.workRevision}
                                {review.workRevision === stage.revision
                                  ? " · current"
                                  : " · earlier version"}{" "}
                                · mentoring {review.mentoringMinutes} minutes
                              </p>
                              <p className="break-words whitespace-pre-wrap">{review.feedback}</p>
                              <details>
                                <summary className="cursor-pointer">
                                  Work assessed in this review
                                </summary>
                                <p className="break-words whitespace-pre-wrap">
                                  {review.workSnapshot}
                                </p>
                              </details>
                              <p className="lab-small">
                                Boundary {review.rubric.boundary}/2 · evidence{" "}
                                {review.rubric.customerEvidence}/2 · test {review.rubric.testDesign}
                                /2 · decision {review.rubric.decision}/2
                              </p>
                            </article>
                          ))
                        ) : (
                          <p className="lab-small">No founder review recorded for this stage.</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p>
                      No work has been submitted for this stage. Registration details alone are not
                      a reviewable experiment.
                    </p>
                  )}
                  <button
                    type="button"
                    className="lab-text-link"
                    disabled={!hydrated || busy}
                    onClick={async () => {
                      if (
                        !window.confirm(
                          `Permanently delete ${selected.name}’s venture registration, submitted work and reviews? This also releases their feedback place.`
                        )
                      )
                        return;
                      setBusy(true);
                      setError("");
                      setMessage("");
                      try {
                        const result = await postLab("admin/venture-delete", {
                          participantId: selected.id,
                        });
                        setSelectedId("");
                        setStageNumber(1);
                        setMessage(
                          result.message || "Venture registration, work and reviews deleted."
                        );
                        reload();
                      } catch (failure) {
                        setError(
                          failure instanceof Error ? failure.message : "Deletion was not confirmed."
                        );
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    Delete this venture registration and submitted work
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
