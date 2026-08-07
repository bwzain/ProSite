import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CreativeHub } from "@/components/CreativeHub";
import { WebsitesShowcase } from "@/components/WebsitesShowcase";
import { CareerTimeline } from "@/components/CareerTimeline";
import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CreativeHub />
      <WebsitesShowcase />
      <CareerTimeline />
      <AccomplishmentsGrid />
      <ContactSection />
    </div>
  );
}
