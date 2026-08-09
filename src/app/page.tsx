import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CreativeHubSpotlight } from "@/components/CreativeHubSpotlight";
import { WebsitesShowcase } from "@/components/WebsitesShowcase";
import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CreativeHubSpotlight />
      <WebsitesShowcase />
      <AccomplishmentsGrid />
      <ContactSection />
    </div>
  );
}
