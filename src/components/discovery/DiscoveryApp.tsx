"use client";

import { Suspense, startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Moon, Sun, SlidersHorizontal } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import type { FilterState, TitlesPayload } from "@/lib/catalog/types";
import { applyFilters } from "@/lib/catalog/filters";
import { filtersToParams, paramsToFilters } from "@/lib/catalog/urlState";
import { FilterPanel } from "./FilterPanel";
import { KpiStrip } from "./KpiStrip";
import { RegionalMap } from "./RegionalMap";
import { GenreYield } from "./GenreYield";
import { CatalogMatrix } from "./CatalogMatrix";
import { Leaderboard } from "./Leaderboard";
import { PrintShortlist } from "./PrintShortlist";
import { ErrorBoundary } from "./ErrorBoundary";

export function DiscoveryApp({ initial }: { initial: TitlesPayload }) {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading dashboard…</div>}>
      <DiscoveryAppInner initial={initial} />
    </Suspense>
  );
}

function DiscoveryAppInner({ initial }: { initial: TitlesPayload }) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [payload] = useState<TitlesPayload>(initial);
  const [filters, setFilters] = useState<FilterState>(() =>
    paramsToFilters(new URLSearchParams(searchParams.toString())),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [vizReady, setVizReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      startTransition(() => setVizReady(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const replaceFilters = useCallback((next: FilterState | ((prev: FilterState) => FilterState)) => {
    setFilters((prev) => (typeof next === "function" ? next(prev) : next));
  }, []);

  useEffect(() => {
    const qs = filtersToParams(filters).toString();
    if (qs === searchParams.toString()) return;
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, pathname, router, searchParams]);

  const titles = payload.titles;
  const filtered = useMemo(() => applyFilters(titles, filters), [titles, filters]);

  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold">
              Content programming
            </p>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight">Discovery Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-mono text-slate-500">
              {payload.source === "sheet" ? "Google Sheet" : "Sample catalog"}
              {payload.error ? ` · fallback (${payload.error})` : ""}
            </span>
            <button
              type="button"
              className="lg:hidden rounded-xl border border-slate-200 dark:border-slate-700 p-2"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 dark:border-slate-700 p-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <FilterPanel
          titles={titles}
          filters={filters}
          setFilters={replaceFilters}
          drawerOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filtered={filtered}
        />
        <div className="space-y-6 min-w-0">
          <KpiStrip titles={filtered} />
          {vizReady ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ErrorBoundary
                  fallback={
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-sm text-slate-500">
                      Map could not load. Use the treemap toggle if it appears, or refresh the page.
                    </div>
                  }
                >
                  <RegionalMap
                    titles={filtered}
                    focusRegion={filters.region || undefined}
                    onSelectCountry={(country, region) =>
                      replaceFilters({ ...filters, country, region, box: null })
                    }
                  />
                </ErrorBoundary>
                <GenreYield
                  titles={filtered}
                  selected={filters.genres}
                  onToggleGenre={(genre) =>
                    replaceFilters({
                      ...filters,
                      genres: filters.genres.includes(genre)
                        ? filters.genres.filter((g) => g !== genre)
                        : [...filters.genres, genre],
                    })
                  }
                />
              </div>
              <CatalogMatrix
                titles={filtered}
                box={filters.box}
                onBoxSelect={(box) => replaceFilters({ ...filters, box })}
                onHoverSelect={setSelectedId}
              />
            </>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-[380px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-500">
                Loading visuals…
              </div>
              <div className="h-[380px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-500">
                Loading visuals…
              </div>
            </div>
          )}
          <Leaderboard
            titles={filtered}
            catalog={titles}
            search={filters.search}
            onSearch={(search) => replaceFilters({ ...filters, search })}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
      <PrintShortlist titles={filtered} />
    </div>
  );
}
