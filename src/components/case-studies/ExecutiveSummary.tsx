import type { RenderBlock } from "@/lib/caseStudies/types";
import { NotionBlocks } from "./NotionBlocks";

export function ExecutiveSummary({ blocks }: { blocks: RenderBlock[] }) {
  if (!blocks.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
      <NotionBlocks blocks={blocks} className="space-y-5" />
    </section>
  );
}
