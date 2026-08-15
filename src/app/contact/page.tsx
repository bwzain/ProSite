import { ContactSection } from "@/components/ContactSection";

export const metadata = {
  title: "Contact & Collaboration",
  description: "Connect with William Zain for enterprise consulting, digital music production, or AI literature discussions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}
