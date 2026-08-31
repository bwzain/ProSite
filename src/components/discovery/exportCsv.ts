import type { TitleRecord } from "@/lib/catalog/types";

export function exportCsv(titles: TitleRecord[]) {
  const headers = [
    "id",
    "title",
    "type",
    "year",
    "country",
    "macroRegion",
    "genres",
    "imdbRating",
    "imdbVotes",
    "tmdbPopularity",
    "popularityTier",
    "maturityRating",
    "runtimeMin",
    "seasons",
    "bingeLabel",
    "dataImputed",
  ];
  const rows = titles.map((t) =>
    [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      t.year,
      t.country,
      t.macroRegion,
      `"${t.genres.join("|")}"`,
      t.imdbRating ?? "",
      t.imdbVotes ?? "",
      t.tmdbPopularity,
      t.popularityTier,
      t.maturityRating,
      t.runtimeMin ?? "",
      t.seasons ?? "",
      t.bingeLabel ?? "",
      t.dataImputed,
    ].join(","),
  );
  const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `discovery-shortlist-${titles.length}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
