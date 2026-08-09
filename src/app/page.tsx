import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";

const CreativeHub = dynamic(
  () => import("@/components/CreativeHub").then((mod) => mod.CreativeHub),
  {
    loading: () => (
      <div className="py-20 bg-white dark:bg-slate-900 min-h-[400px] flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading Creative Hub...
      </div>
    ),
  }
);

const WebsitesShowcase = dynamic(
  () => import("@/components/WebsitesShowcase").then((mod) => mod.WebsitesShowcase),
  {
    loading: () => (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-[300px]" />
    ),
  }
);

const AccomplishmentsGrid = dynamic(
  () => import("@/components/AccomplishmentsGrid").then((mod) => mod.AccomplishmentsGrid),
  {
    loading: () => (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-[300px]" />
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((mod) => mod.ContactSection),
  {
    loading: () => (
      <div className="py-20 bg-white dark:bg-slate-900 min-h-[300px]" />
    ),
  }
);

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CreativeHub />
      <WebsitesShowcase />
      <AccomplishmentsGrid />
      <ContactSection />
    </div>
  );
}
