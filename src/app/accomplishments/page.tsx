import { AccomplishmentsGrid } from "@/components/AccomplishmentsGrid";

export const metadata = {
  title: "Accomplishments & Certifications | William Zain",
  description: "Toastmasters Distinguished Toastmaster (DTM), AWS Certified Solutions Architect, Kryon RPA Developer, and BS Computer Science.",
};

export default function AccomplishmentsPage() {
  return (
    <div className="pt-16">
      <AccomplishmentsGrid />
    </div>
  );
}
