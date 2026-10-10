"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { accessLabels, filterCatalogue, type CatalogueResource, type LearningPath } from "../catalogue";

export function OpenCatalogue({ resources, paths }: { resources: CatalogueResource[]; paths: LearningPath[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState("");
  const [access, setAccess] = useState("");
  const [level, setLevel] = useState("");
  const path = paths.find((item) => item.slug === goal);
  const filtered = filterCatalogue(resources, {
    query, access, level,
    resourceIds: path ? [...path.resourceIds, ...path.optionalIds] : undefined,
  });

  function reset() {
    setQuery(""); setGoal(""); setAccess(""); setLevel("");
  }

  return (
    <div>
      <div className="lab-topic-filters" role="group" aria-label="Filter resources by learning goal">
        <button type="button" aria-pressed={!goal} onClick={() => setGoal("")}>All goals</button>
        {paths.map((item) => (
          <button type="button" key={item.slug} aria-pressed={goal === item.slug} onClick={() => setGoal(item.slug)}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="lab-catalogue-controls">
        <div className="lab-library-search">
          <label htmlFor={`${id}-search`}>Find a skill or resource</label>
          <input id={`${id}-search`} type="search" value={query} maxLength={120}
            onChange={(event) => setQuery(event.target.value)} placeholder="Contribution, customer discovery, consulting…" />
        </div>
        <div>
          <label htmlFor={`${id}-access`}>Access</label>
          <select id={`${id}-access`} value={access} onChange={(event) => setAccess(event.target.value)}>
            <option value="">All access types</option>
            {Object.entries(accessLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-level`}>Suggested depth</label>
          <select id={`${id}-level`} value={level} onChange={(event) => setLevel(event.target.value)}>
            <option value="">All levels</option>
            {["Introductory", "Practice", "Academic depth"].map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        <button type="button" className="lab-text-link lab-catalogue-reset" onClick={reset}>Reset filters</button>
      </div>
      <div className="lab-catalogue-status">
        <p className="lab-small" role="status" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"} found
        </p>
        {path && <Link className="lab-text-link" href={`/learning-lab/paths/${path.slug}`}>Follow this path in order →</Link>}
      </div>
      <div className="lab-grid lab-grid-two lab-catalogue-grid">
        {filtered.map((item) => (
          <article className="lab-card lab-catalogue-card" key={item.id} data-resource-id={item.id}>
            <div className="lab-catalogue-badges"><span className="lab-tag">{accessLabels[item.access]}</span><span className="lab-small">{item.level}</span></div>
            <h3><Link href={item.href}>{item.title}</Link></h3>
            <p>{item.summary}</p>
            <p className="lab-course-output"><strong>Make or practise:</strong> {item.outcome}</p>
            <p className="lab-small">{item.duration}<br />{item.format}</p>
            <details className="lab-catalogue-details">
              <summary>Audience, background and language</summary>
              <dl>
                <dt>For</dt><dd>{item.audience}</dd>
                <dt>Suggested background</dt><dd>{item.prerequisites}</dd>
                <dt>Language</dt><dd>{item.language}</dd>
                <dt>Instructor / curator</dt><dd>{item.instructor}</dd>
              </dl>
            </details>
            <p className="lab-small lab-catalogue-access">{item.accessNote}</p>
            <Link href={item.href} className="lab-text-link">
              {item.id === "beta-ai-tools" ? "Open the directory" : "Open the resource"} <span aria-hidden="true">→</span>
              <span className="sr-only">: {item.title}</span>
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="lab-callout">
          <h3>No resources match those filters.</h3>
          <p>Try a shorter skill name or a different access type.</p>
          <button type="button" className="lab-button lab-button-secondary" onClick={reset}>Show all resources</button>
        </div>
      )}
    </div>
  );
}
