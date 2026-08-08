import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CreativeHub } from "@/components/CreativeHub";
import { WebsitesShowcase } from "@/components/WebsitesShowcase";
import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<div className="py-20 bg-white dark:bg-slate-900" />}>
        <CreativeHub />
      </Suspense>
      <WebsitesShowcase />
      <AccomplishmentsGrid />
      <ContactSection />
    </div>
  );
}
