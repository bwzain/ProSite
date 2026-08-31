import type { ContentType, MacroRegion, PopularityTier, TitleRecord } from "./types";
import { lookupCountry } from "./regions";
import { bingeHours, bingeLabel } from "./binge";
import { assignPopularityTiers } from "./popularity";

const ALIASES: Record<string, string[]> = {
  id: ["id", "show_id", "title_id", "content_id"],
  title: ["title", "name", "show_title"],
  type: ["type", "content_type", "format"],
  year: ["year", "release_year", "releaseyear"],
  runtimeMin: ["runtimemin", "runtime_minutes", "runtime"],
  seasons: ["seasons", "season_count", "number_of_seasons"],
  duration: ["duration"],
  avgEpisodeMin: ["avepisodemin", "avg_episode_min", "episode_runtime", "average_episode_duration"],
  imdbRating: ["imdbrating", "imdb_rating", "imdb"],
  imdbVotes: ["imdbvotes", "imdb_votes", "votes", "vote_count"],
  tmdbPopularity: ["tmdbpopularity", "tmdb_popularity", "popularity"],
  posterUrl: ["posterurl", "poster_url", "poster", "poster_path"],
  genres: ["genres", "listed_in", "genre"],
  maturityRating: ["maturityrating", "maturity_rating", "rating", "age_certification"],
  country: ["primary_country", "country", "production_country", "countries"],
  macroRegion: ["macroregion", "macro_region"],
  dataImputed: ["dataimputed", "data_imputed", "imputed"],
  popularityTier: ["popularity_category", "popularitytier", "popularity_tier"],
  description: ["description", "overview", "synopsis"],
};

function normKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function pick(row: Record<string, string>, field: string): string {
  const keys = Object.keys(row);
  const aliases = ALIASES[field] ?? [field];
  for (const alias of aliases) {
    const hit = keys.find((k) => normKey(k) === alias || normKey(k).replace(/_/g, "") === alias.replace(/_/g, ""));
    if (hit && row[hit] != null && String(row[hit]).trim() !== "") return String(row[hit]).trim();
  }
  return "";
}

function toNum(v: string): number | null {
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function toBool(v: string): boolean {
  return ["true", "1", "yes", "y"].includes(v.trim().toLowerCase());
}

function parseType(v: string): ContentType {
  const s = v.toLowerCase();
  if (s.includes("tv") || s.includes("show") || s.includes("series")) return "TV Show";
  return "Movie";
}

function parseGenres(v: string): string[] {
  return v
    .split(/[|,;]/)
    .map((g) => g.trim())
    .filter(Boolean);
}

function parseTier(v: string): PopularityTier | null {
  const s = v.trim().toLowerCase();
  if (s === "very high" || s === "very_high") return "Very High";
  if (s === "high") return "High";
  if (s === "medium") return "Medium";
  if (s === "low") return "Low";
  return null;
}

function parseSeasonsFromDuration(v: string): number | null {
  const m = v.match(/(\d+)\s*season/i);
  return m ? Number(m[1]) : null;
}

function parseRegion(v: string): MacroRegion | null {
  const map: Record<string, MacroRegion> = {
    "north america": "North America",
    asia: "Asia",
    europe: "Europe",
    "latin america": "Latin America",
    latam: "Latin America",
    mena: "MENA",
    oceania: "Oceania",
    "sub-saharan africa": "Sub-Saharan Africa",
    "sub saharan africa": "Sub-Saharan Africa",
  };
  return map[v.trim().toLowerCase()] ?? null;
}

export function parseTitleRows(rows: Record<string, string>[]): TitleRecord[] {
  const drafts = rows
    .map((row, i) => {
      const title = pick(row, "title");
      if (!title) return null;
      const countryRaw = pick(row, "country");
      const countryMeta = lookupCountry(countryRaw);
      const regionFromRow = parseRegion(pick(row, "macroRegion"));
      const year = toNum(pick(row, "year")) ?? 2000;
      const type = parseType(pick(row, "type") || "Movie");
      const runtime = toNum(pick(row, "runtimeMin"));
      const seasons = toNum(pick(row, "seasons")) ?? parseSeasonsFromDuration(pick(row, "duration"));
      const avgEpisodeMin = toNum(pick(row, "avgEpisodeMin")) ?? (type === "TV Show" ? runtime : null);
      const hours = type === "TV Show" ? bingeHours(seasons, avgEpisodeMin) : null;
      const rec: TitleRecord = {
        id: pick(row, "id") || `title-${i + 1}`,
        title,
        type,
        year,
        decade: Math.floor(year / 10) * 10,
        runtimeMin: type === "Movie" ? runtime : null,
        seasons: type === "TV Show" ? seasons : null,
        avgEpisodeMin: type === "TV Show" ? avgEpisodeMin : null,
        imdbRating: toNum(pick(row, "imdbRating")),
        imdbVotes: toNum(pick(row, "imdbVotes")),
        tmdbPopularity: toNum(pick(row, "tmdbPopularity")) ?? 0,
        posterUrl: pick(row, "posterUrl") || null,
        description: pick(row, "description"),
        genres: parseGenres(pick(row, "genres")),
        maturityRating: pick(row, "maturityRating") || "NR",
        country: countryMeta?.name ?? (countryRaw.split(/[|,;]/)[0]?.trim() || "Unknown"),
        isoNumeric: countryMeta?.isoNumeric ?? "",
        isoA3: countryMeta?.isoA3 ?? "",
        macroRegion: regionFromRow ?? countryMeta?.region ?? "North America",
        dataImputed: toBool(pick(row, "dataImputed")),
        bingeHours: hours,
        bingeLabel: bingeLabel(hours),
        popularityTier: parseTier(pick(row, "popularityTier")) ?? "Medium",
      };
      return rec;
    })
    .filter((t): t is TitleRecord => t != null);

  return assignPopularityTiers(drafts);
}
