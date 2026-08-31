import type { Metadata } from "next";
import { getCaseStudiesHub } from "@/lib/caseStudies/caseStudies";
import { CaseStudyTiles } from "@/components/case-studies/CaseStudyTiles";
import { ExecutiveSummary } from "@/components/case-studies/ExecutiveSummary";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Executive summary and interactive case studies — including Netflix content discovery and enterprise analytics.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const hub = await getCaseStudiesHub();
  const status = hub.configStatus;

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Portfolio
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {hub.title}
          </h1>
          {!hub.fromNotion ? (
            <div className="rounded-xl border border-amber-300/60 bg-amber-50/80 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-semibold">Preview mode — Notion content not loaded</p>
              {hub.notionError?.startsWith("Missing ") ? (
                <p className="mt-2">
                  {hub.notionError} Ensure both <code className="text-xs">NOTION_API_KEY</code> and{" "}
                  <code className="text-xs">NOTION_CASE_STUDIES_HUB_PAGE_ID</code> are set for{" "}
                  <strong>Production</strong> on this Vercel project, then redeploy.
                </p>
              ) : (
                <p className="mt-2">
                  Share <strong>William Zain - Strategic Solution Consultant</strong> with{" "}
                  <strong>ZainNotionAPI</strong> (⋯ → Connections), then repeat for each case study
                  sub-page. Moving pages in Notion removes integration access.
                </p>
              )}
              {status ? (
                <p className="mt-2 text-xs opacity-80">
                  Env check: NOTION_API_KEY={status.hasApiKey ? "set" : "missing"};
                  NOTION_CASE_STUDIES_HUB_PAGE_ID=
                  {status.hasHubPageId ? status.hubPageIdPreview : "missing"}
                </p>
              ) : null}
              {hub.notionError && !hub.notionError.startsWith("Missing ") ? (
                <p className="mt-2 text-xs opacity-80">Notion API: {hub.notionError}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="space-y-12">
          <ExecutiveSummary blocks={hub.executiveSummary} />
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Case studies</h2>
            <CaseStudyTiles tiles={hub.tiles} />
          </section>
        </div>
      </div>
    </div>
  );
}
