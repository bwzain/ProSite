import Link from "next/link";
import type { CaseStudyDetail } from "@/lib/caseStudies/types";
import { NotionBlocks } from "./NotionBlocks";
import { OpenDashboardButton } from "./OpenDashboardButton";

function DashboardCtaSection() {
  return (
    <section className="rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-50 to-indigo-50/50 p-6 dark:border-sky-900/50 dark:from-sky-950/40 dark:to-slate-900/60 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Explore the live dashboard
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Filter the Netflix catalog by region, genre, and popularity — then export your shortlist.
          </p>
        </div>
        <OpenDashboardButton className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400" />
      </div>
    </section>
  );
}

export function CaseStudyDetailView({ study }: { study: CaseStudyDetail }) {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Link
          href="/case-studies"
          className="inline-flex text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
        >
          ← All case studies
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {study.title}
        </h1>
      </header>

      {study.showDashboardCta ? <DashboardCtaSection /> : null}

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
        <NotionBlocks blocks={study.blocks} className="space-y-5" />
      </div>
    </article>
  );
}
