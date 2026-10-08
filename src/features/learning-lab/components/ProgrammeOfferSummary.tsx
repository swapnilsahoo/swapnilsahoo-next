import type { PublicLabProgramme } from "../store";

export function ProgrammeOfferSummary({ programme }: { programme: PublicLabProgramme }) {
  if (programme.availability.status !== "pilot-open") return null;
  const { availability, offerDetails } = programme;
  const items = [
    [
      "Start date",
      availability.startsAt
        ? new Date(availability.startsAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata",
          })
        : null,
    ],
    ["IST timetable", offerDetails.timetableIst],
    [
      "Total payable fee",
      availability.feeInr === null ? null : `₹${availability.feeInr.toLocaleString("en-IN")}`,
    ],
    ["Tax presentation", offerDetails.taxDisplay],
    [
      "Learners",
      availability.capacity === null
        ? null
        : `${offerDetails.minCohort === null ? "" : `${offerDetails.minCohort} minimum · `}${availability.capacity} maximum`,
    ],
    ["Instructor", offerDetails.instructor],
    ["Format", offerDetails.format],
    ["Your finished work", offerDetails.learningOutput],
    ["Access and attendance alternatives", offerDetails.accessTerms],
    ["Support and feedback", offerDetails.supportTerms],
    ["Cancellation and rescheduling", offerDetails.cancellationTerms],
  ].filter(([, value]) => value);
  return (
    <aside
      className="lab-callout"
      aria-label="Approved pilot details"
      style={{ marginBottom: "2rem" }}
    >
      <p className="lab-eyebrow">Approved pilot details</p>
      <dl className="lab-offer-details">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>
              <strong>{label}</strong>
            </dt>
            <dd style={{ whiteSpace: "pre-line" }}>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="lab-small">
        Enquire about joining below. An enquiry does not reserve a place or take payment; payment
        collection on this site remains disabled.
      </p>
    </aside>
  );
}
