import { AboutSection } from "@/components/AboutSection";

export const metadata = {
  title: "About Me",
  description: "Executive background of William Zain — 30+ year Enterprise IT & Cloud Architect turned Digital Music Producer and Published AI Author.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection headingLevel="h1" />
    </div>
  );
}
