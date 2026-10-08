import type { Metadata } from "next";
import Link from "next/link";
import { LabSection } from "@/features/learning-lab/components/LabShell";
import { FreeCourseLibrary } from "@/features/learning-lab/components/FreeCourseLibrary";
import { freeCourses } from "@/features/learning-lab/free-courses";

export const metadata: Metadata = {
  title: "Free Courses",
  description:
    "Six free, self-paced mini-courses in applied AI, strategy and entrepreneurship. Read, make a decision and keep a practical worksheet. No account required.",
  alternates: { canonical: "/learning-lab/free-courses" },
};

export default function FreeCoursesPage() {
  return (
    <>
      <header className="lab-container lab-page-hero lab-library-hero">
        <div>
          <p className="lab-eyebrow">The open classroom / Free courses</p>
          <h1>
            A small lesson.
            <br />
            <em>A useful next move.</em>
          </h1>
          <p className="lab-lead">
            Make room for one new idea. Learn to frame an AI task, defend a strategic choice or test
            a venture assumption—then turn it into a piece of work you can keep.
          </p>
          <div className="lab-actions">
            <a className="lab-button" href="#courses">
              Find your first course <span aria-hidden="true">↓</span>
            </a>
            <Link className="lab-text-link" href="/learning-lab/founder">
              Meet your instructor →
            </Link>
          </div>
        </div>
        <aside className="lab-library-note">
          <p className="lab-eyebrow">An invitation to practise</p>
          <span className="lab-library-zero" aria-hidden="true">
            ₹0
          </span>
          <h2>Curiosity is enough to start.</h2>
          <p>
            Three short readings. One fictional decision. Feedback you can question. A worksheet
            that belongs to you.
          </p>
          <p className="lab-small">
            Self-paced · about 20–30 minutes
            <br />
            No registration or software purchase required.
          </p>
        </aside>
      </header>
      <LabSection
        id="courses"
        eyebrow="Choose a starting point"
        title="What will you work on today?"
      >
        <FreeCourseLibrary
          courses={freeCourses.map(({ slug, title, category, minutes, intro, output }) => ({
            slug,
            title,
            category,
            minutes,
            intro,
            output,
          }))}
        />
      </LabSection>
      <LabSection
        className="lab-band"
        eyebrow="A little structure goes a long way"
        title="Read. Decide. Make. Reconsider."
      >
        <div className="lab-grid">
          <article>
            <p className="lab-card-number">01 / Understand</p>
            <h3>One idea, made concrete.</h3>
            <p className="lab-muted">
              Read three short lessons with worked examples. Every course focuses on a bounded
              managerial skill.
            </p>
          </article>
          <article>
            <p className="lab-card-number">02 / Test</p>
            <h3>Explore the consequences.</h3>
            <p className="lab-muted">
              Choose an approach in an original scenario, examine written feedback and retry the
              checkpoint.
            </p>
          </article>
          <article>
            <p className="lab-card-number">03 / Keep</p>
            <h3>Leave with your own work.</h3>
            <p className="lab-muted">
              Write a brief or decision memo. Download your worksheet or choose to save notes in
              this browser.
            </p>
          </article>
        </div>
        <p className="lab-small" style={{ marginTop: "2rem" }}>
          Free courses are open self-practice for adult learners. They do not include live teaching,
          individual assessment or a certificate. Your practice notes are not sent to the Lab.
        </p>
      </LabSection>
    </>
  );
}
