"use client";

import { X, Download, FileText } from "lucide-react";
import type { FilterState, PopularityTier, SeasonBucket, TitleRecord } from "@/lib/catalog/types";
import { DEFAULT_FILTERS, uniqueSorted } from "@/lib/catalog/filters";
import { MACRO_REGIONS } from "@/lib/catalog/regions";
import { cn } from "@/lib/cn";
import { exportCsv } from "./exportCsv";

const TIERS: PopularityTier[] = ["Very High", "High", "Medium", "Low"];
const SEASONS: SeasonBucket[] = ["1", "2-4", "5+"];

type Props = {
  titles: TitleRecord[];
  filtered: TitleRecord[];
  filters: FilterState;
  setFilters: (next: FilterState | ((prev: FilterState) => FilterState)) => void;
  drawerOpen: boolean;
  onClose: () => void;
};

export function FilterPanel({ titles, filtered, filters, setFilters, drawerOpen, onClose }: Props) {
  const countries = uniqueSorted(
    titles.filter((t) => !filters.region || t.macroRegion === filters.region).map((t) => t.country),
  );
  const genres = uniqueSorted(titles.flatMap((t) => t.genres));
  const maturity = uniqueSorted(titles.map((t) => t.maturityRating));
  const decades = [...new Set(titles.map((t) => t.decade))].sort((a, b) => a - b);

  const toggle = <T,>(key: keyof FilterState, value: T, list: T[]) => {
    const next = list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
    setFilters({ ...filters, [key]: next });
  };

  const body = (
    <div className="space-y-5 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold">Filters</h2>
        <button
          type="button"
          className="text-xs text-sky-600 font-semibold"
          onClick={() => setFilters({ ...DEFAULT_FILTERS })}
        >
          Reset
        </button>
      </div>

      <section>
        <Label>Macro-region</Label>
        <select
          className={selectClass}
          value={filters.region}
          onChange={(e) =>
            setFilters({
              ...filters,
              region: e.target.value as FilterState["region"],
              country: "",
              box: null,
            })
          }
        >
          <option value="">All regions</option>
          {MACRO_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <Label className="mt-2">Production country</Label>
        <select
          className={selectClass}
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>

      <section>
        <Label>Content type</Label>
        <div className="flex gap-1">
          {(["", "Movie", "TV Show"] as const).map((t) => (
            <button
              key={t || "all"}
              type="button"
              onClick={() => setFilters({ ...filters, type: t })}
              className={pill(filters.type === t)}
            >
              {t || "All"}
            </button>
          ))}
        </div>
      </section>

      {(filters.type === "Movie" || filters.type === "") && (
        <section>
          <Label>
            Movie runtime ({filters.runtimeMin}–{filters.runtimeMax} min)
          </Label>
          <input
            type="range"
            min={0}
            max={240}
            value={filters.runtimeMin}
            onChange={(e) => setFilters({ ...filters, runtimeMin: Number(e.target.value) })}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={240}
            value={filters.runtimeMax}
            onChange={(e) => setFilters({ ...filters, runtimeMax: Number(e.target.value) })}
            className="w-full"
          />
        </section>
      )}

      {(filters.type === "TV Show" || filters.type === "") && (
        <section>
          <Label>TV seasons</Label>
          <div className="flex gap-1 flex-wrap">
            {SEASONS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => toggle("seasonBuckets", b, filters.seasonBuckets)}
                className={pill(filters.seasonBuckets.includes(b))}
              >
                {b === "1" ? "1 Season" : b === "2-4" ? "2–4 Seasons" : "5+ Seasons"}
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <Label>IMDb rating ≥ {filters.imdbMin.toFixed(1)}</Label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={filters.imdbMin}
          onChange={(e) => setFilters({ ...filters, imdbMin: Number(e.target.value) })}
          className="w-full"
        />
        <Label className="mt-2">Min votes ({filters.votesMin.toLocaleString()})</Label>
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={filters.votesMin}
          onChange={(e) => setFilters({ ...filters, votesMin: Number(e.target.value) })}
          className="w-full"
        />
      </section>

      <section>
        <Label>TMDb popularity tier</Label>
        <div className="flex flex-wrap gap-1">
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle("popularityTiers", t, filters.popularityTiers)}
              className={pill(filters.popularityTiers.includes(t))}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section>
        <Label>Genres</Label>
        <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggle("genres", g, filters.genres)}
              className={pill(filters.genres.includes(g))}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section>
        <Label>Maturity</Label>
        <div className="flex flex-wrap gap-1">
          {maturity.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggle("maturity", m, filters.maturity)}
              className={pill(filters.maturity.includes(m))}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      <section>
        <Label>Release decade</Label>
        <div className="flex flex-wrap gap-1">
          {decades.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => toggle("decades", d, filters.decades)}
              className={pill(filters.decades.includes(d))}
            >
              {d}s
            </button>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between gap-2">
        <Label className="mb-0">Hide imputed values</Label>
        <button
          type="button"
          role="switch"
          aria-checked={filters.hideImputed}
          onClick={() => setFilters({ ...filters, hideImputed: !filters.hideImputed })}
          className={cn(
            "w-11 h-6 rounded-full relative transition",
            filters.hideImputed ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition",
              filters.hideImputed && "translate-x-5",
            )}
          />
        </button>
      </section>

      {filters.box && (
        <button
          type="button"
          className="text-xs text-sky-600 font-semibold"
          onClick={() => setFilters({ ...filters, box: null })}
        >
          Clear scatter box-select
        </button>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => exportCsv(filtered)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold py-2"
        >
          <Download className="w-3.5 h-3.5" /> CSV
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold py-2"
        >
          <FileText className="w-3.5 h-3.5" /> PDF
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="no-print hidden lg:block sticky top-24 self-start rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {body}
      </aside>
      {drawerOpen && (
        <div className="no-print lg:hidden fixed inset-0 z-50 bg-slate-950/50" onClick={onClose}>
          <div
            className="absolute right-0 top-0 h-full w-[min(100%,320px)] bg-white dark:bg-slate-900 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="mb-3" onClick={onClose} aria-label="Close filters">
              <X className="w-4 h-4" />
            </button>
            {body}
          </div>
        </div>
      )}
    </>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1.5", className)}>{children}</div>;
}

const selectClass =
  "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm";

function pill(active: boolean) {
  return cn(
    "px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition",
    active
      ? "bg-sky-600 text-white border-sky-600"
      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300",
  );
}
