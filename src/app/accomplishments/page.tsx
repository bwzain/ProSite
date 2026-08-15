import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";

export const metadata = {
  title: "Accomplishments & Certifications",
  description: "Toastmasters Distinguished Toastmaster (DTM), AWS Certified Solutions Architect, Kryon RPA Developer, and BS Computer Science.",
  alternates: { canonical: "/accomplishments" },
};

export default function AccomplishmentsPage() {
  return (
    <div className="pt-16">
      <AccomplishmentsGrid />
    </div>
  );
}
