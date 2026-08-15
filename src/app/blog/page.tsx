import { BlogSection } from "@/components/BlogSection";

export const metadata = {
  title: "Blog & Articles",
  description: "Insights on Artificial Intelligence, Enterprise Process Automation, Digital Music Production, and Global Travel — synced live with Notion.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="pt-16">
      <BlogSection />
    </div>
  );
}
