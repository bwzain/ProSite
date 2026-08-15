import { WebsitesShowcase } from "@/components/WebsitesShowcase";

export const metadata = {
  title: "Connections",
  description: "Direct links and interactive showcases for Zainy Beats, Amazon AI books, I Wish You Were Here travel media, Calance, and LinkedIn.",
  alternates: { canonical: "/websites" },
};

export default function WebsitesPage() {
  return (
    <div className="pt-16">
      <WebsitesShowcase />
    </div>
  );
}
