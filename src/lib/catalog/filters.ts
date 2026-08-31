import type { FilterState, SeasonBucket, TitleRecord } from "./types";
import { COUNTRIES } from "./regions";

export const DEFAULT_FILTERS: FilterState = {
  region: "",
  country: "",
  type: "",
  runtimeMin: 0,
  runtimeMax: 240,
  seasonBuckets: [],
  imdbMin: 0,
  votesMin: 0,
  popularityTiers: [],
  genres: [],
  maturity: [],
  decades: [],
  hideImputed: false,
  search: "",
  box: null,
};

function seasonBucket(seasons: number | null): SeasonBucket | null {
  if (!seasons) return null;
  if (seasons <= 1) return "1";
  if (seasons <= 4) return "2-4";
  return "5+";
}

export function applyFilters(titles: TitleRecord[], f: FilterState): TitleRecord[] {
  const q = f.search.trim().toLowerCase();
  return titles.filter((t) => {
    if (f.hideImputed && t.dataImputed) return false;
    if (f.region && t.macroRegion !== f.region) return false;
    let countryFilter = f.country;
    if (f.region && countryFilter) {
      const meta = COUNTRIES.find((c) => c.name === countryFilter);
      if (meta && meta.region !== f.region) countryFilter = "";
    }
    if (countryFilter && t.country !== countryFilter) return false;
    if (f.type && t.type !== f.type) return false;
    if (t.type === "Movie") {
      const rt = t.runtimeMin ?? 0;
      if (rt < f.runtimeMin || rt > f.runtimeMax) return false;
    }
    if (t.type === "TV Show" && f.seasonBuckets.length > 0) {
      const bucket = seasonBucket(t.seasons);
      if (!bucket || !f.seasonBuckets.includes(bucket)) return false;
    }
    if (t.imdbRating != null && t.imdbRating < f.imdbMin) return false;
    if (f.imdbMin > 0 && t.imdbRating == null) return false;
    if ((t.imdbVotes ?? 0) < f.votesMin) return false;
    if (f.popularityTiers.length > 0 && !f.popularityTiers.includes(t.popularityTier)) return false;
    if (f.genres.length > 0 && !f.genres.some((g) => t.genres.includes(g))) return false;
    if (f.maturity.length > 0 && !f.maturity.includes(t.maturityRating)) return false;
    if (f.decades.length > 0 && !f.decades.includes(t.decade)) return false;
    if (q && !t.title.toLowerCase().includes(q)) return false;
    if (f.box) {
      const { x1, x2, y1, y2 } = f.box;
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      const rating = t.imdbRating ?? 0;
      if (t.tmdbPopularity < minX || t.tmdbPopularity > maxX || rating < minY || rating > maxY) return false;
    }
    return true;
  });
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}
