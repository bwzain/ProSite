import Link from "next/link";
import { Compass } from "lucide-react";

export function OpenDashboardButton({ className }: { className?: string }) {
  return (
    <Link
      href="/discovery"
      className={
        className ??
        "inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
      }
    >
      <Compass className="h-4 w-4" aria-hidden />
      Open Discovery Dashboard
    </Link>
  );
}
