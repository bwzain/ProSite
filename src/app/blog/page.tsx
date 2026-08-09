import { BlogSection } from "@/components/BlogSection";

export const metadata = {
  title: "Blog & Articles | William Zain",
  description: "Insights on Artificial Intelligence, Enterprise Process Automation, Digital Music Production, and Global Travel — synced live with Notion.",
};

export default function BlogPage() {
  return (
    <div className="pt-16">
      <BlogSection />
    </div>
  );
}
