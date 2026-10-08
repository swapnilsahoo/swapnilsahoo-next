import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabSection } from "@/features/learning-lab/components/LabShell";
import { DemoLesson } from "@/features/learning-lab/components/DemoLesson";
import { CourseMotif } from "@/features/learning-lab/components/FreeCourseLibrary";
import { freeCourses, getFreeCourse } from "@/features/learning-lab/free-courses";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return freeCourses.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getFreeCourse(slug);
  if (!course) return { title: "Free course not found" };
  return {
    title: `${course.title} — Free Course`,
    description: course.intro,
    alternates: { canonical: `/learning-lab/free-courses/${slug}` },
    openGraph: {
      title: course.title,
      description: course.intro,
      url: `/learning-lab/free-courses/${slug}`,
      images: [],
    },
  };
}
export default async function FreeCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getFreeCourse(slug);
  if (!course) notFound();
  const related = freeCourses.filter(
    (item) => item.category === course.category && item.slug !== slug
  );
  return (
    <>
      <header className="lab-container lab-page-hero lab-course-hero">
        <div>
          <Link className="lab-text-link" href="/learning-lab/free-courses">
            ← All free courses
          </Link>
          <p className="lab-eyebrow">{course.category} / Free mini-course</p>
          <h1>{course.title}</h1>
          <p className="lab-lead">{course.intro}</p>
          <p className="lab-small">
            Free · ₹0 · about {course.minutes} minutes · self-paced reading + practice
            <br />
            By Dr. Swapnil Sahoo · for adult learners · no account required
          </p>
          <div className="lab-actions">
            <a href="#lesson-1" className="lab-button">
              Begin the course ↓
            </a>
            <a href="#practice" className="lab-button lab-button-secondary">
              Go to the exercise
            </a>
          </div>
        </div>
        <aside className="lab-course-outcome">
          <CourseMotif category={course.category} />
          <div>
            <p className="lab-eyebrow">Your take-away</p>
            <h2>{course.output}</h2>
            <p className="lab-small">
              Use the examples here or your own fictional situation. A notebook is enough; no paid
              AI tool is needed.
            </p>
          </div>
        </aside>
      </header>
      <div className="lab-container">
        <nav className="lab-anchor-links" aria-label="Course sections">
          {course.lessons.map((lesson, index) => (
            <a key={lesson.title} href={`#lesson-${index + 1}`}>
              {lesson.title}
            </a>
          ))}
          <a href="#practice">4. Practise + keep your work</a>
        </nav>
      </div>
      {course.lessons.map((lesson, index) => (
        <LabSection
          key={lesson.title}
          id={`lesson-${index + 1}`}
          className={index % 2 === 0 ? "lab-band" : ""}
        >
          <div className="lab-course-reading">
            <div>
              <p className="lab-eyebrow">{String(index + 1).padStart(2, "0")} / Read and try</p>
              <h2>{lesson.title}</h2>
              <p>{lesson.body}</p>
            </div>
            <aside className="lab-callout">
              <p className="lab-eyebrow">Worked example · fictional</p>
              <p>{lesson.example}</p>
              <div className="lab-divider" />
              <h3>Your turn</h3>
              <p>{lesson.tryIt}</p>
            </aside>
          </div>
        </LabSection>
      ))}
      <LabSection
        id="practice"
        className="lab-band"
        eyebrow="04 / Make a decision"
        title="Now put the idea under pressure."
      >
        <DemoLesson programme={course} freeCourse />
      </LabSection>
      <LabSection eyebrow="Keep the momentum" title="One more useful next move.">
        <div className="lab-grid lab-grid-two">
          {related.map((next) => (
            <article key={next.slug} className="lab-card">
              <span className="lab-tag">Free · about {next.minutes} min</span>
              <h3>{next.title}</h3>
              <p>{next.intro}</p>
              <Link href={`/learning-lab/free-courses/${next.slug}`} className="lab-text-link">
                Try the next course →
              </Link>
            </article>
          ))}
          <article className="lab-card">
            <span className="lab-tag">Explore a deeper learning path</span>
            <h3>Build on this first attempt.</h3>
            <p>
              Explore the proposed full programme, its capstone and assessment rubric. Dates and
              enrolment details are separate from this free course.
            </p>
            <Link
              className="lab-text-link"
              href={`/learning-lab/programmes/${course.programmeSlug}`}
            >
              Explore the programme →
            </Link>
          </article>
        </div>
        <p className="lab-small" style={{ marginTop: "1.5rem" }}>
          This course provides self-practice and written guidance. It does not submit work, certify
          completion or promise a professional outcome.
        </p>
      </LabSection>
    </>
  );
}
