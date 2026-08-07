import { WebsitesShowcase } from "@/components/WebsitesShowcase";

export const metadata = {
  title: "Websites & Live Portals | William Zain",
  description: "Direct links and interactive showcases for Zainy Beats, Amazon AI Book, I Wish You Were Here travel media, Calance, and LinkedIn.",
};

export default function WebsitesPage() {
  return (
    <div className="pt-16">
      <WebsitesShowcase />
    </div>
  );
}
