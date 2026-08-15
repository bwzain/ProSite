import { Suspense } from "react";
import { CreativeHub } from "@/components/CreativeHub";

export const metadata = {
  title: "Creative Hub & Studio",
  description: "Zainy Beats Digital Studio, Introduction to Artificial Intelligence book on Amazon, and I Wish You Were Here travel platform.",
  alternates: { canonical: "/creations" },
};

export default function CreationsPage() {
  return (
    <div className="pt-16">
      <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <CreativeHub />
      </Suspense>
    </div>
  );
}
