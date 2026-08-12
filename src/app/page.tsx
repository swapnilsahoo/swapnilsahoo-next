import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { About } from "@/features/profile/components/About";
import { Conferences } from "@/features/profile/components/Conferences";
import { Contact } from "@/features/profile/components/Contact";
import { Gallery } from "@/features/profile/components/Gallery";
import { Hero } from "@/features/profile/components/Hero";
import { MdpSection } from "@/features/profile/components/MdpSection";
import { PhdSupervision } from "@/features/profile/components/PhdSupervision";
import { Publications } from "@/features/profile/components/Publications";
import { Research } from "@/features/profile/components/Research";
import { Stats } from "@/features/profile/components/Stats";
import { Teaching } from "@/features/profile/components/Teaching";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <InquiryPrelude
        id="questions"
        eyebrow="How to enter this website"
        title="Begin with the questions that connect the work."
        introduction="This website moves across industry practice, research, teaching, doctoral supervision, executive education, AI, mythology, spirituality and fiction. The subjects are different, but the reading habit is consistent: examine the assumption, locate the evidence, understand the mechanism and stay with the consequence long enough for a subtler question to emerge."
        socraticQuestions={[
          "When resources are scarce, when does improvisation become resourcefulness—and when does it merely postpone a harder decision?",
          "When the same reading habit is applied to a boardroom trade-off and to a verse of scripture, is that the method proving it generalises—or being stretched past where it actually applies?",
          "How would we know that a classroom activity changed judgment rather than only producing a polished presentation?",
          "When a judgment formed over seventeen years in industry and a peer-reviewed model of the same decision disagree, which should give way first—and why?",
        ]}
        firstPrinciplesQuestions={[
          "What did seventeen years across five employers actually establish as evidence about resourcefulness, and what does it only make plausible?",
          "Which people, resources and relationships are actually available before we imagine what ought to be available?",
          "What must remain a human responsibility when AI accelerates analysis, generation or decision support?",
          "What makes a claim trustworthy: its fluency, its source, its mechanism or its ability to survive a counterexample?",
        ]}
      />
      <div className="hr-fade mx-auto max-w-6xl" />
      <Stats />
      <About />
      <Research />
      <Publications />
      <Conferences />
      <Teaching />
      <PhdSupervision />
      <MdpSection />
      <Gallery />
      <Contact />
    </main>
  );
}
