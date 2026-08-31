import fs from "fs";
import path from "path";
import https from "https";
import Papa from "papaparse";
import { parseTitleRows } from "./parseTitles";
import { assignPopularityTiers } from "./popularity";
import type { TitlesPayload } from "./types";

const MEMORY_TTL_MS = 5 * 60 * 1000;
const CACHE_VERSION = 2;

function parseCsv(csv: string) {
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return assignPopularityTiers(parseTitleRows(parsed.data));
}

function samplePath() {
  return path.join(process.cwd(), "data", "titles.sample.csv");
}

function cachePath() {
  if (process.env.VERCEL) return path.join("/tmp", "sheet-cache.json");
  return path.join(process.cwd(), "data", ".sheet-cache.json");
}

type DiskCache = { version: number; at: number; payload: TitlesPayload };

let memoryCache: DiskCache | null = null;
let refreshInFlight: Promise<void> | null = null;

function readDisk(): DiskCache | null {
  try {
    const raw = fs.readFileSync(cachePath(), "utf8");
    const parsed = JSON.parse(raw) as DiskCache;
    if (parsed.version !== CACHE_VERSION || !parsed?.payload?.titles?.length || typeof parsed.at !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeDisk(entry: DiskCache) {
  try {
    fs.mkdirSync(path.dirname(cachePath()), { recursive: true });
    fs.writeFileSync(cachePath(), JSON.stringify(entry));
  } catch {
    // read-only hosts; memory cache still helps within the process
  }
}

function remember(payload: TitlesPayload): TitlesPayload {
  const entry: DiskCache = { version: CACHE_VERSION, at: Date.now(), payload };
  memoryCache = entry;
  writeDisk(entry);
  return payload;
}

function fetchText(url: string, redirects = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "netflix-title-dashboard/1.0" } }, (res) => {
        const code = res.statusCode ?? 0;
        const location = res.headers.location;
        if (code >= 300 && code < 400 && location && redirects < 5) {
          const next = location.startsWith("http") ? location : new URL(location, url).toString();
          res.resume();
          fetchText(next, redirects + 1).then(resolve, reject);
          return;
        }
        if (code >= 400) {
          res.resume();
          reject(new Error(`Sheet fetch failed (${code})`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c as Buffer));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function refreshFromSheet(url: string): Promise<TitlesPayload> {
  const csv = await fetchText(url);
  if (csv.trimStart().startsWith("<")) throw new Error("Sheet URL returned HTML (check sharing)");
  const titles = parseCsv(csv);
  if (titles.length === 0) throw new Error("Sheet parsed zero titles");
  return remember({ titles, source: "sheet", fetchedAt: new Date().toISOString() });
}

function samplePayload(error?: string): TitlesPayload {
  const csv = fs.readFileSync(samplePath(), "utf8");
  return {
    titles: parseCsv(csv),
    source: "sample",
    fetchedAt: new Date().toISOString(),
    error,
  };
}

function scheduleRefresh(url: string) {
  if (refreshInFlight) return;
  refreshInFlight = refreshFromSheet(url)
    .catch(() => undefined)
    .then(() => undefined)
    .finally(() => {
      refreshInFlight = null;
    });
}

/** Accept a Sheets edit/share URL or an already-CSV export URL. */
export function toSheetsCsvUrl(url: string): string {
  const trimmed = url.trim();
  const id = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!id) return trimmed;
  if (trimmed.includes("tqx=out:csv") || /export\?format=csv/i.test(trimmed)) return trimmed;
  const gid = trimmed.match(/[?&#]gid=(\d+)/)?.[1] ?? "0";
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

export async function loadTitles(): Promise<TitlesPayload> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.at < MEMORY_TTL_MS) {
    return memoryCache.payload;
  }

  const disk = memoryCache ?? readDisk();
  if (disk) {
    memoryCache = disk;
    const raw = process.env.GOOGLE_SHEETS_CSV_URL?.trim();
    if (raw && now - disk.at >= MEMORY_TTL_MS) {
      scheduleRefresh(toSheetsCsvUrl(raw));
    }
    return disk.payload;
  }

  const raw = process.env.GOOGLE_SHEETS_CSV_URL?.trim();
  if (raw) {
    try {
      return await refreshFromSheet(toSheetsCsvUrl(raw));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown sheet error";
      return samplePayload(message);
    }
  }

  return samplePayload();
}
