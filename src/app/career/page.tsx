import { CareerTimeline } from "@/components/CareerTimeline";

export const metadata = {
  title: "Career & Enterprise Experience | William Zain",
  description: "30+ year timeline covering Nintex Solution Consultant, 24+ years at Calance, Isuzu Motors, AWS Architecture, and K2 Workflow BPM.",
};

export default function CareerPage() {
  return (
    <div className="pt-16">
      <CareerTimeline />
    </div>
  );
}
