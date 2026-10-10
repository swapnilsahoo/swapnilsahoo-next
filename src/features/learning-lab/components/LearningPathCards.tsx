import Link from "next/link";
import type { LearningPath } from "../catalogue";

export function LearningPathCards({ paths }: { paths: LearningPath[] }) {
  return (
    <div className="lab-grid lab-grid-two lab-path-grid">
      {paths.map((path, index) => (
        <article className="lab-card lab-path-card" key={path.slug}>
          <span className="lab-card-number">0{index + 1} / {path.goal}</span>
          <h3>{path.title}</h3>
          <p>{path.summary}</p>
          <p className="lab-small">{path.resourceIds.length} ordered steps · open self-practice</p>
          <Link className="lab-text-link" href={`/learning-lab/paths/${path.slug}`}>
            Start this path <span aria-hidden="true">→</span>
            <span className="sr-only">: {path.title}</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
