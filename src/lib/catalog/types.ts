export type ContentType = "Movie" | "TV Show";

export type MacroRegion =
  | "North America"
  | "Asia"
  | "Europe"
  | "Latin America"
  | "MENA"
  | "Oceania"
  | "Sub-Saharan Africa";

export type PopularityTier = "Very High" | "High" | "Medium" | "Low";

export type SeasonBucket = "1" | "2-4" | "5+";

export type BingeLabel = "Weekend Binge" | "Standard" | "Long-Term Commitment";

export type TitleRecord = {
  id: string;
  title: string;
  type: ContentType;
  year: number;
  decade: number;
  runtimeMin: number | null;
  seasons: number | null;
  avgEpisodeMin: number | null;
  imdbRating: number | null;
  imdbVotes: number | null;
  tmdbPopularity: number;
  posterUrl: string | null;
  description?: string;
  genres: string[];
  maturityRating: string;
  country: string;
  isoNumeric: string;
  isoA3: string;
  macroRegion: MacroRegion;
  dataImputed: boolean;
  bingeHours: number | null;
  bingeLabel: BingeLabel | null;
  popularityTier: PopularityTier;
};

export type FilterState = {
  region: MacroRegion | "";
  country: string;
  type: ContentType | "";
  runtimeMin: number;
  runtimeMax: number;
  seasonBuckets: SeasonBucket[];
  imdbMin: number;
  votesMin: number;
  popularityTiers: PopularityTier[];
  genres: string[];
  maturity: string[];
  decades: number[];
  hideImputed: boolean;
  search: string;
  box: { x1: number; x2: number; y1: number; y2: number } | null;
};

export type TitlesPayload = {
  titles: TitleRecord[];
  source: "sheet" | "sample";
  fetchedAt: string;
  error?: string;
};
