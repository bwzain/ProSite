"use client";

import { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import type { MacroRegion, TitleRecord } from "@/lib/catalog/types";
import { countryByIsoNumeric } from "@/lib/catalog/regions";
import { cn } from "@/lib/cn";
import { ErrorBoundary } from "./ErrorBoundary";

const GEO = "/geo/countries-110m.json";

const REGION_VIEW: Record<MacroRegion, { center: [number, number]; scale: number }> = {
  "North America": { center: [-95, 40], scale: 280 },
  "Latin America": { center: [-70, -15], scale: 220 },
  Europe: { center: [15, 50], scale: 380 },
  Asia: { center: [90, 25], scale: 220 },
  MENA: { center: [32, 27], scale: 480 },
  Oceania: { center: [145, -25], scale: 280 },
  "Sub-Saharan Africa": { center: [20, 0], scale: 280 },
};

function fillForCount(count: number | undefined, max: number) {
  if (!count) return "#cbd5e1";
  const t = Math.log1p(count) / Math.log1p(max);
  if (t > 0.75) return "#0369a1";
  if (t > 0.45) return "#0284c7";
  if (t > 0.2) return "#38bdf8";
  return "#7dd3fc";
}

export function RegionalMap({
  titles,
  focusRegion,
  onSelectCountry,
}: {
  titles: TitleRecord[];
  focusRegion?: MacroRegion;
  onSelectCountry: (country: string, region: MacroRegion) => void;
}) {
  const [mode, setMode] = useState<"map" | "treemap">("map");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const byCountry = useMemo(() => {
    const map = new Map<string, { count: number; pop: number; region: MacroRegion; isoNumeric: string }>();
    for (const t of titles) {
      const cur = map.get(t.country) ?? { count: 0, pop: 0, region: t.macroRegion, isoNumeric: t.isoNumeric };
      cur.count += 1;
      cur.pop += t.tmdbPopularity;
      map.set(t.country, cur);
    }
    return map;
  }, [titles]);

  const treeData = [...byCountry.entries()]
    .map(([name, v]) => ({ name, size: v.count, pop: v.pop, region: v.region }))
    .sort((a, b) => b.size - a.size);

  const max = Math.max(1, ...[...byCountry.values()].map((v) => v.count));
  const legend = [...byCountry.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);

  const tree = (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={treeData}
        dataKey="size"
        nameKey="name"
        stroke="#0f172a"
        fill="#0284c7"
        onClick={(node) => {
          const n = node as { name?: string; region?: MacroRegion };
          if (n.name && n.region) onSelectCountry(n.name, n.region);
        }}
      >
        <Tooltip
          content={({ payload }) => {
            const p = payload?.[0]?.payload as { name?: string; size?: number; pop?: number } | undefined;
            if (!p?.name) return null;
            return (
              <div className="rounded-lg bg-slate-900 text-white text-xs px-2 py-1.5">
                {p.name}: {p.size} titles · pop {p.pop?.toFixed(0)}
              </div>
            );
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  );

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-extrabold">Regional content map</h2>
          <p className="text-xs text-slate-500">Title count by production country. Click to filter.</p>
        </div>
        <div className="flex gap-1">
          {(["map", "treemap"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "px-2 py-1 text-[11px] font-semibold rounded-lg",
                mode === m ? "bg-sky-600 text-white" : "text-slate-500",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[320px]">
        {mode === "map" ? (
          mounted ? (
            <ErrorBoundary fallback={tree}>
              <Choropleth
                byCountry={byCountry}
                max={max}
                focusRegion={focusRegion}
                onSelectCountry={onSelectCountry}
              />
            </ErrorBoundary>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-500">Loading map…</div>
          )
        ) : (
          tree
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {legend.map(([name, v]) => (
          <span key={name} className="text-[10px] text-slate-500">
            {name} ({v.count})
          </span>
        ))}
      </div>
    </section>
  );
}

function Choropleth({
  byCountry,
  max,
  focusRegion,
  onSelectCountry,
}: {
  byCountry: Map<string, { count: number; pop: number; region: MacroRegion; isoNumeric: string }>;
  max: number;
  focusRegion?: MacroRegion;
  onSelectCountry: (country: string, region: MacroRegion) => void;
}) {
  const byIso = new Map<string, { name: string; count: number; region: MacroRegion }>();
  for (const [name, v] of byCountry) {
    if (v.isoNumeric) byIso.set(String(Number(v.isoNumeric)), { name, count: v.count, region: v.region });
  }
  const view = focusRegion ? REGION_VIEW[focusRegion] : { center: [10, 20] as [number, number], scale: 145 };

  return (
    <ComposableMap projectionConfig={{ scale: view.scale, center: view.center }} className="w-full h-full">
      <Geographies geography={GEO}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const iso = String(Number(geo.id));
            const hit = byIso.get(iso);
            const meta = countryByIsoNumeric(iso);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fillForCount(hit?.count, max)}
                stroke="#0f172a"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#0369a1" },
                  pressed: { outline: "none" },
                }}
                onClick={() => {
                  if (hit) onSelectCountry(hit.name, hit.region);
                  else if (meta) onSelectCountry(meta.name, meta.region);
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
