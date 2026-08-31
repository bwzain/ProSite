import type { TitleRecord, TitlesPayload } from "./types";

/** Keep synopses on disk; omit them from the RSC/JSON payload. */
export function toClientTitle(t: TitleRecord): TitleRecord {
  const { description: _drop, ...rest } = t;
  return rest;
}

export function toClientPayload(payload: TitlesPayload): TitlesPayload {
  return { ...payload, titles: payload.titles.map(toClientTitle) };
}
