import type { Metadata } from "next";
import { LabHero, LabSection } from "@/features/learning-lab/components/LabShell";
import { LearningPathCards } from "@/features/learning-lab/components/LearningPathCards";
import { OpenCatalogue } from "@/features/learning-lab/components/OpenCatalogue";
import { catalogueResources, learningPaths } from "@/features/learning-lab/catalogue";
import "@/features/learning-lab/components/catalogue.css";

export const metadata: Metadata = {
  title: "Open Learning Catalogue",
  description: "Find free lessons, case practice, startup guides and academic resources through four management learning paths. Access and background are clearly labelled.",
  alternates: { canonical: "/learning-lab/catalogue" },
};

export default function CataloguePage() {
  return (
    <>
      <LabHero eyebrow="One library / Four useful directions" title="What would you like to get better at?" description="Start with a goal, follow a practical route or find a specific skill. The Lab connects its short lessons with the founder's deeper teaching and interview resources.">
        <a href="#learning-paths" className="lab-button">Choose a learning path ↓</a>
        <a href="#resources" className="lab-button lab-button-secondary">Search all resources</a>
      </LabHero>
      <LabSection id="learning-paths" eyebrow="A route through the material" title="Four goals. A clear next step.">
        <LearningPathCards paths={learningPaths} />
        <p className="lab-small" style={{ marginTop: "1.5rem" }}>Core paths are open self-practice. Optional academic and beta resources have separate access notes. No account, formal assessment or certificate is included.</p>
      </LabSection>
      <LabSection id="resources" className="lab-band" eyebrow="The complete index" title="Find something you can use today.">
        <p className="lab-lead">Search by skill, audience or familiar terms such as contribution, customer discovery and consulting. Suggested levels help you choose; they are not admission requirements.</p>
        <OpenCatalogue resources={catalogueResources} paths={learningPaths} />
        <p className="lab-small" style={{ marginTop: "1.5rem" }}>Minute estimates come from the existing six mini-courses. Other resources have no fixed self-paced time estimate. Public links do not provide licences or access to separately assigned readings.</p>
      </LabSection>
    </>
  );
}
