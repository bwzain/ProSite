"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import type { TitleRecord } from "@/lib/catalog/types";

export function PrintShortlist({ titles }: { titles: TitleRecord[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => {
      flushSync(() => setReady(true));
    };
    const hide = () => setReady(false);
    window.addEventListener("beforeprint", show);
    window.addEventListener("afterprint", hide);
    return () => {
      window.removeEventListener("beforeprint", show);
      window.removeEventListener("afterprint", hide);
    };
  }, []);

  if (!ready) return null;

  return (
    <div className="print-shortlist hidden print:block p-8">
      <h1 className="text-2xl font-extrabold mb-1">Discovery shortlist</h1>
      <p className="text-sm mb-4">{titles.length} titles in the current filtered cohort</p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {["Title", "Type", "Year", "Country", "IMDb", "TMDb", "Genres"].map((h) => (
              <th key={h} className="text-left border-b py-1">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {titles.map((t) => (
            <tr key={t.id}>
              <td className="py-1">{t.title}</td>
              <td>{t.type}</td>
              <td>{t.year}</td>
              <td>{t.country}</td>
              <td>{t.imdbRating ?? ""}</td>
              <td>{t.tmdbPopularity.toFixed(1)}</td>
              <td>{t.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
