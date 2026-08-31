import type { ContentType, FilterState, MacroRegion, PopularityTier, SeasonBucket } from "./types";
import { DEFAULT_FILTERS } from "./filters";

export function filtersToParams(f: FilterState): URLSearchParams {
  const p = new URLSearchParams();
  if (f.region) p.set("region", f.region);
  if (f.country) p.set("country", f.country);
  if (f.type) p.set("type", f.type);
  if (f.runtimeMin !== DEFAULT_FILTERS.runtimeMin) p.set("rmin", String(f.runtimeMin));
  if (f.runtimeMax !== DEFAULT_FILTERS.runtimeMax) p.set("rmax", String(f.runtimeMax));
  if (f.seasonBuckets.length) p.set("seasons", f.seasonBuckets.join(","));
  if (f.imdbMin) p.set("imdb", String(f.imdbMin));
  if (f.votesMin) p.set("votes", String(f.votesMin));
  if (f.popularityTiers.length) p.set("tiers", f.popularityTiers.join(","));
  if (f.genres.length) p.set("genres", f.genres.join("|"));
  if (f.maturity.length) p.set("maturity", f.maturity.join("|"));
  if (f.decades.length) p.set("decades", f.decades.join(","));
  if (f.hideImputed) p.set("raw", "1");
  if (f.search) p.set("q", f.search);
  if (f.box) p.set("box", `${f.box.x1},${f.box.x2},${f.box.y1},${f.box.y2}`);
  return p;
}

export function paramsToFilters(p: URLSearchParams): FilterState {
  const seasons = p.get("seasons");
  const tiers = p.get("tiers");
  const genres = p.get("genres");
  const maturity = p.get("maturity");
  const decades = p.get("decades");
  const box = p.get("box");
  const boxParts = box?.split(",").map(Number);
  return {
    region: (p.get("region") as MacroRegion) || "",
    country: p.get("country") || "",
    type: (p.get("type") as ContentType) || "",
    runtimeMin: Number(p.get("rmin") ?? DEFAULT_FILTERS.runtimeMin),
    runtimeMax: Number(p.get("rmax") ?? DEFAULT_FILTERS.runtimeMax),
    seasonBuckets: seasons ? (seasons.split(",") as SeasonBucket[]) : [],
    imdbMin: Number(p.get("imdb") ?? 0),
    votesMin: Number(p.get("votes") ?? 0),
    popularityTiers: tiers ? (tiers.split(",") as PopularityTier[]) : [],
    genres: genres ? genres.split("|").filter(Boolean) : [],
    maturity: maturity ? maturity.split("|").filter(Boolean) : [],
    decades: decades ? decades.split(",").map(Number).filter(Number.isFinite) : [],
    hideImputed: p.get("raw") === "1",
    search: p.get("q") || "",
    box:
      boxParts && boxParts.length === 4 && boxParts.every(Number.isFinite)
        ? { x1: boxParts[0], x2: boxParts[1], y1: boxParts[2], y2: boxParts[3] }
        : null,
  };
}
