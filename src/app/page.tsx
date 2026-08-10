import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CreativeHubSpotlight } from "@/components/CreativeHubSpotlight";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CreativeHubSpotlight />
    </div>
  );
}
