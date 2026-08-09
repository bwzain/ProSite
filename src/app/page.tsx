import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CreativeHubSpotlight } from "@/components/CreativeHubSpotlight";
import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CreativeHubSpotlight />
      <AccomplishmentsGrid />
      <ContactSection />
    </div>
  );
}
