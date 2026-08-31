import type { TitleRecord } from "./types";

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a.map((x) => x.toLowerCase()));
  const B = new Set(b.map((x) => x.toLowerCase()));
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
}

function closeness(a: number, b: number, scale: number): number {
  return 1 - Math.min(1, Math.abs(a - b) / scale);
}

export function findSimilar(title: TitleRecord, catalog: TitleRecord[], n = 5): TitleRecord[] {
  return catalog
    .filter((t) => t.id !== title.id)
    .map((t) => {
      const genreScore = jaccard(title.genres, t.genres);
      const decadeScore = title.decade === t.decade ? 1 : closeness(title.decade, t.decade, 20);
      const countryScore = title.country === t.country ? 1 : title.macroRegion === t.macroRegion ? 0.4 : 0;
      const ratingScore = closeness(title.imdbRating ?? 0, t.imdbRating ?? 0, 4);
      const popScore = closeness(title.tmdbPopularity, t.tmdbPopularity, 80);
      const score = genreScore * 0.4 + decadeScore * 0.15 + countryScore * 0.2 + ratingScore * 0.15 + popScore * 0.1;
      return { t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.t);
}
