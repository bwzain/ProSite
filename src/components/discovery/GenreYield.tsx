"use client";

import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TitleRecord } from "@/lib/catalog/types";
import { cn } from "@/lib/cn";

export function GenreYield({
  titles,
  selected,
  onToggleGenre,
}: {
  titles: TitleRecord[];
  selected: string[];
  onToggleGenre: (genre: string) => void;
}) {
  const data = useMemo(() => {
    const map = new Map<string, { volume: number; pop: number }>();
    for (const t of titles) {
      for (const g of t.genres) {
        const cur = map.get(g) ?? { volume: 0, pop: 0 };
        cur.volume += 1;
        cur.pop += t.tmdbPopularity;
        map.set(g, cur);
      }
    }
    return [...map.entries()]
      .map(([genre, v]) => ({ genre, volume: v.volume, meanPop: v.pop / v.volume }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 12);
  }, [titles]);

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
      <h2 className="font-extrabold">Genre yield analyzer</h2>
      <p className="text-xs text-slate-500 mb-3">Volume vs mean popularity. Click a bar to isolate.</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} onClick={(state) => {
            const label = (state as { activeLabel?: string })?.activeLabel;
            if (label) onToggleGenre(label);
          }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="genre" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={50} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="volume" name="Title volume" fill="#0284c7" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="meanPop" name="Mean popularity" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {selected.length > 0 && (
        <p className="text-[11px] text-slate-500 mt-1">
          Isolated:{" "}
          {selected.map((g) => (
            <button key={g} type="button" className={cn("underline mr-1")} onClick={() => onToggleGenre(g)}>
              {g}
            </button>
          ))}
        </p>
      )}
    </section>
  );
}
