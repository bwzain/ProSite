import Link from "next/link";
import type { CaseStudyTile } from "@/lib/caseStudies/types";

function TilePlaceholder({ title }: { title: string }) {
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex h-full min-h-[180px] w-full items-center justify-center bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-slate-900/40">
      <span className="text-3xl font-bold tracking-tight text-sky-300/90">{initials || "CS"}</span>
    </div>
  );
}

function CaseStudyTileCard({ tile }: { tile: CaseStudyTile }) {
  return (
    <Link
      href={`/case-studies/${tile.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-700"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {tile.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tile.imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <TilePlaceholder title={tile.title} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
          {tile.title}
        </h3>
        {tile.teaser ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {tile.teaser}
          </p>
        ) : null}
        <span className="mt-auto pt-2 text-sm font-medium text-sky-600 dark:text-sky-400">
          Read case study →
        </span>
      </div>
    </Link>
  );
}

export function CaseStudyTiles({ tiles }: { tiles: CaseStudyTile[] }) {
  if (!tiles.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No case study sub-pages found on the Notion hub yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {tiles.map((tile) => (
        <CaseStudyTileCard key={tile.id} tile={tile} />
      ))}
    </div>
  );
}
