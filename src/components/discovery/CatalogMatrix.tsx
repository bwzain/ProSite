"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TitleRecord } from "@/lib/catalog/types";
import { quartileCuts } from "@/lib/catalog/popularity";

type Box = { x1: number; x2: number; y1: number; y2: number };

export function CatalogMatrix({
  titles,
  box,
  onBoxSelect,
  onHoverSelect,
}: {
  titles: TitleRecord[];
  box: Box | null;
  onBoxSelect: (box: Box | null) => void;
  onHoverSelect: (id: string | null) => void;
}) {
  const [draft, setDraft] = useState<Partial<Box> | null>(null);

  const points = useMemo(() => {
    const mapped = titles
      .filter((t) => t.tmdbPopularity > 0 && t.imdbRating != null)
      .map((t) => ({ ...t, x: t.tmdbPopularity, y: t.imdbRating ?? 0 }));
    if (mapped.length <= 1200) return mapped;
    return [...mapped].sort((a, b) => (b.imdbVotes ?? 0) - (a.imdbVotes ?? 0)).slice(0, 1200);
  }, [titles]);

  const medX = useMemo(() => quartileCuts(titles.map((t) => t.tmdbPopularity))[1], [titles]);
  const medY = useMemo(
    () => quartileCuts(titles.map((t) => t.imdbRating ?? 0).filter((n) => n > 0))[1] || 7,
    [titles],
  );

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
      <h2 className="font-extrabold">Content discovery matrix</h2>
      <p className="text-xs text-slate-500 mb-2">
        TMDb popularity (X) vs IMDb rating (Y). Drag to box-select. Quadrants: Hidden gems · Blockbusters · Catalog
        fillers · Viral hits.
        {titles.length > points.length ? ` Plotting ${points.length.toLocaleString()} of ${titles.length.toLocaleString()} (highest vote counts).` : ""}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-semibold mb-2">
        <span className="text-emerald-600">Top-left Hidden gems</span>
        <span className="text-sky-600">Top-right Blockbusters</span>
        <span className="text-slate-500">Bottom-left Catalog fillers</span>
        <span className="text-amber-600">Bottom-right Viral hits</span>
      </div>
      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 12, right: 16, bottom: 12, left: 8 }}
            onMouseDown={(e) => {
              if (e?.xValue == null || e?.yValue == null) return;
              setDraft({ x1: e.xValue, y1: e.yValue });
            }}
            onMouseMove={(e) => {
              if (!draft?.x1 || e?.xValue == null || e?.yValue == null) return;
              setDraft({ ...draft, x2: e.xValue, y2: e.yValue });
            }}
            onMouseUp={() => {
              if (draft?.x1 != null && draft.x2 != null && draft.y1 != null && draft.y2 != null) {
                onBoxSelect({ x1: draft.x1, x2: draft.x2, y1: draft.y1, y2: draft.y2 });
              }
              setDraft(null);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis type="number" dataKey="x" name="TMDb" tick={{ fontSize: 11 }} scale="log" domain={["auto", "auto"]} allowDataOverflow />
            <YAxis type="number" dataKey="y" name="IMDb" domain={[4, 10]} tick={{ fontSize: 11 }} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ payload }) => {
                const t = payload?.[0]?.payload as TitleRecord | undefined;
                if (!t) return null;
                return (
                  <div className="rounded-xl bg-slate-900 text-white p-3 text-xs max-w-[220px]">
                    <p className="font-bold">{t.title}</p>
                    <p className="text-slate-300">
                      {t.type} · {t.year} · {t.country}
                    </p>
                    <p>
                      IMDb {t.imdbRating} · TMDb {t.tmdbPopularity.toFixed(1)}
                    </p>
                    {t.dataImputed && <p className="text-amber-300">Imputed values</p>}
                  </div>
                );
              }}
            />
            <ReferenceLine x={medX} stroke="#64748b" strokeDasharray="4 4" />
            <ReferenceLine y={medY} stroke="#64748b" strokeDasharray="4 4" />
            {(draft?.x1 != null && draft.x2 != null && draft.y1 != null && draft.y2 != null) || box ? (
              <ReferenceArea
                x1={(draft?.x1 ?? box?.x1) as number}
                x2={(draft?.x2 ?? box?.x2) as number}
                y1={(draft?.y1 ?? box?.y1) as number}
                y2={(draft?.y2 ?? box?.y2) as number}
                fill="#0284c7"
                fillOpacity={0.12}
              />
            ) : null}
            <Scatter
              data={points}
              fill="#0284c7"
              onMouseOver={(p) => onHoverSelect((p as TitleRecord).id)}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
