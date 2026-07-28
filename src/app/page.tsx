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
    <main id="main-content">
      <Hero />
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
