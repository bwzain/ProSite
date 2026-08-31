import type { PopularityTier, TitleRecord } from "./types";

export function quartileCuts(values: number[]): [number, number, number] {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return [0, 0, 0];
  const at = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * (sorted.length - 1)))];
  return [at(0.25), at(0.5), at(0.75)];
}

export function popularityTier(value: number, q1: number, q2: number, q3: number): PopularityTier {
  if (value >= q3) return "Very High";
  if (value >= q2) return "High";
  if (value >= q1) return "Medium";
  return "Low";
}

export function assignPopularityTiers(titles: TitleRecord[]): TitleRecord[] {
  const used = new Set(titles.map((t) => t.popularityTier));
  if (used.size >= 3) return titles;
  const [q1, q2, q3] = quartileCuts(titles.map((t) => t.tmdbPopularity));
  return titles.map((t) => ({
    ...t,
    popularityTier: popularityTier(t.tmdbPopularity, q1, q2, q3),
  }));
}
