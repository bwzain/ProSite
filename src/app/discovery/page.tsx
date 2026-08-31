import { DiscoveryApp } from "@/components/discovery/DiscoveryApp";
import { loadTitles } from "@/lib/catalog/loadTitles";
import { toClientPayload } from "@/lib/catalog/toClient";

export const metadata = {
  title: "Discovery",
  description: "Interactive Netflix catalog discovery dashboard.",
  alternates: { canonical: "/discovery" },
};

export default async function DiscoveryPage() {
  const initial = toClientPayload(await loadTitles());
  return (
    <div className="pt-16">
      <DiscoveryApp initial={initial} />
    </div>
  );
}
