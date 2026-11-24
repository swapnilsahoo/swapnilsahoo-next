import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import {
  ToolkitFreeLine,
  ToolkitMore,
  ToolkitShare,
  toolkitMetadata,
} from "@/features/learning-lab/components/ToolkitParts";
import {
  toolkitCheckedOn,
  toolkitHref,
  ycNote,
  ycResources,
} from "@/features/learning-lab/founder-toolkit";

const path = toolkitHref("learn-from-yc");
const description =
  "The best free Y Combinator talks and Paul Graham essays for first-time student founders, mapped to each stage of a 14-day idea test, with the one idea to take from each.";

export const metadata = toolkitMetadata(
  path,
  "Free Y Combinator Resources for Student Founders",
  description,
  "Learn from Y Combinator, free: a reading list for student founders"
);

export default function LearnFromYcPage() {
  return (
    <>
      <LabHero
        eyebrow="Free reading and watching list"
        title="Learn from Y Combinator, for free, at the right moment."
        description={description}
      >
        <a href="#list" className="lab-button">
          See the list →
        </a>
      </LabHero>
      <div className="lab-container">
        <ToolkitFreeLine />
      </div>

      <LabSection eyebrow="How to use it" title="Read one thing, then go and do one thing.">
        <div className="lab-split">
          <p className="lab-lead">
            Y Combinator, one of the world&rsquo;s best-known startup programmes, publishes a lot of
            its advice free. We picked the pieces that help most in your first two weeks and put
            each one where it is useful.
          </p>
          <p className="lab-small">
            {ycNote} Links checked on {toolkitCheckedOn}. All are free to read or watch; some sites
            may ask you to sign in for extra features.
          </p>
        </div>
      </LabSection>

      {ycResources.map((group, index) => (
        <LabSection
          id={index === 0 ? "list" : undefined}
          key={group.stage}
          className={index % 2 === 0 ? "lab-band" : ""}
          eyebrow={`Stage ${index + 1} of ${ycResources.length}`}
          title={group.stage}
        >
          <div className="lab-grid">
            {group.items.map((item) => (
              <article className="lab-card" key={item.url}>
                <div className="lab-kit-meta">
                  <span className="lab-tag">{item.format}</span>
                  <span className="lab-tag">{item.by}</span>
                </div>
                <h3>{item.title}</h3>
                <p>
                  <strong>Take away:</strong> {item.takeaway}
                </p>
                <a
                  className="lab-text-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read or watch ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </LabSection>
      ))}

      <LabSection eyebrow="More free help in India" title="Other free places to learn.">
        <ul>
          <li>
            <a
              className="lab-text-link"
              href="https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Startup India Learning &amp; Development Program ↗
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            : free entrepreneurship learning from the Government of India, in English and Hindi.
          </li>
        </ul>
        <p className="lab-small">Independent resources. No partnership is implied.</p>
        <ToolkitShare text="Free Y Combinator reading list for student founders:" path={path} />
      </LabSection>

      <ToolkitMore current="learn-from-yc" />
    </>
  );
}
