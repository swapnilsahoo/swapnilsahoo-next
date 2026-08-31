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
import { Testimonials } from "@/features/profile/components/Testimonials";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <InquiryPrelude
        id="questions"
        eyebrow="How to enter this website"
        title="Begin with the questions that connect the work."
        questions={[
          "Does seventeen years across seven employers prove resourcefulness, or just make it plausible?",
          "If a classroom exercise looks impressive, how would you know it actually changed judgment?",
        ]}
      />
      <div className="hr-fade mx-auto max-w-[100rem]" />
      <Stats />
      <About />
      <Testimonials />
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
