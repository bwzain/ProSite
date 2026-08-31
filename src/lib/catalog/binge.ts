import type { BingeLabel } from "./types";

export function bingeHours(seasons: number | null, avgEpisodeMin: number | null): number | null {
  if (!seasons || !avgEpisodeMin) return null;
  const episodesPerSeason = 10;
  return (seasons * episodesPerSeason * avgEpisodeMin) / 60;
}

export function bingeLabel(hours: number | null): BingeLabel | null {
  if (hours == null) return null;
  if (hours < 10) return "Weekend Binge";
  if (hours >= 30) return "Long-Term Commitment";
  return "Standard";
}
