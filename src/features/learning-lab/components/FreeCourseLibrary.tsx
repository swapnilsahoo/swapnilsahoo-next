"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { FreeCourse } from "../free-courses";

export type FreeCourseCard = Pick<
  FreeCourse,
  "slug" | "title" | "category" | "minutes" | "intro" | "output"
>;

export function CourseMotif({ category }: { category: FreeCourse["category"] }) {
  const symbol = category === "Applied AI" ? "AI" : category === "Strategy" ? "↗" : "₹";
  const phrase =
    category === "Applied AI"
      ? "Brief → Test → Review"
      : category === "Strategy"
        ? "Choose → Focus → Commit"
        : "Observe → Try → Learn";
  return (
    <div
      className={`lab-course-motif lab-course-motif-${category === "Applied AI" ? "ai" : category === "Strategy" ? "strategy" : "venture"}`}
      aria-hidden="true"
    >
      <span className="lab-course-symbol">{symbol}</span>
      <span className="lab-course-motif-caption">{phrase}</span>
      <span className="lab-course-orbit" />
    </div>
  );
}

export function FreeCourseLibrary({ courses }: { courses: FreeCourseCard[] }) {
  const [category, setCategory] = useState("All topics");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const filtered = courses.filter(
    (course) =>
      (category === "All topics" || course.category === category) &&
      `${course.title} ${course.intro} ${course.output} ${course.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <div className="lab-library-controls">
        <div className="lab-topic-filters" role="group" aria-label="Filter courses by topic">
          {["All topics", "Applied AI", "Strategy", "Entrepreneurship"].map((topic) => (
            <button
              type="button"
              key={topic}
              aria-pressed={category === topic}
              onClick={() => setCategory(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="lab-library-search">
          <label htmlFor={searchId}>Find a skill</label>
          <input
            id={searchId}
            type="search"
            value={query}
            maxLength={120}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “workflow” or “customer”"
          />
        </div>
      </div>
      <p className="lab-small" role="status" aria-atomic="true">
        {filtered.length} {filtered.length === 1 ? "course" : "courses"} · free · start anytime
      </p>
      <div className="lab-grid lab-course-grid">
        {filtered.map((course) => (
          <article className="lab-card lab-course-card" key={course.slug}>
            <CourseMotif category={course.category} />
            <div className="lab-course-card-body">
              <div className="lab-course-meta">
                <span>{course.category}</span>
                <span className="lab-course-free">Free · ₹0</span>
              </div>
              <h3>
                <Link href={`/learning-lab/free-courses/${course.slug}`}>{course.title}</Link>
              </h3>
              <p>{course.intro}</p>
              <p className="lab-course-output">
                <strong>Make:</strong> {course.output}
              </p>
              <p className="lab-small">
                About {course.minutes} min · self-paced reading + practice
                <br />
                Dr. Swapnil Sahoo · no account required
              </p>
              <Link href={`/learning-lab/free-courses/${course.slug}`} className="lab-text-link">
                Start learning <span aria-hidden="true">→</span>
                <span className="sr-only">: {course.title}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="lab-callout">
          <h3>No courses match yet.</h3>
          <p>Try a shorter search or explore all six starting points.</p>
          <button
            className="lab-button lab-button-secondary"
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All topics");
            }}
          >
            Show all courses
          </button>
        </div>
      )}
    </div>
  );
}
