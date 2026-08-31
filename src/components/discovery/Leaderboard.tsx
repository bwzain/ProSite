"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { TitleRecord } from "@/lib/catalog/types";
import { findSimilar } from "@/lib/catalog/similar";
import { cn } from "@/lib/cn";

type SortKey = "title" | "type" | "year" | "runtimeMin" | "imdbRating" | "tmdbPopularity";

export function Leaderboard({
  titles,
  catalog,
  search,
  onSearch,
  selectedId,
  onSelect,
}: {
  titles: TitleRecord[];
  catalog: TitleRecord[];
  search: string;
  onSearch: (q: string) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "tmdbPopularity", dir: "desc" });
  const [page, setPage] = useState(0);
  const pageSize = 50;

  const rows = useMemo(() => {
    const copy = [...titles];
    copy.sort((a, b) => {
      const av = a[sort.key] ?? 0;
      const bv = b[sort.key] ?? 0;
      if (typeof av === "string" && typeof bv === "string") {
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
    });
    return copy;
  }, [titles, sort]);

  useEffect(() => {
    setPage(0);
  }, [titles, sort, search]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = rows.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: SortKey) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }));
  };

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="font-extrabold">Title leaderboard</h2>
          <p className="text-xs text-slate-500">
            {rows.length.toLocaleString()} titles in the current cohort
          </p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search titles"
            className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] font-mono uppercase text-slate-500">
              <th className="pb-2 pr-2">Poster</th>
              <Th onClick={() => toggleSort("title")}>Title</Th>
              <Th onClick={() => toggleSort("type")}>Type</Th>
              <Th onClick={() => toggleSort("year")}>Year</Th>
              <Th onClick={() => toggleSort("runtimeMin")}>Runtime</Th>
              <Th onClick={() => toggleSort("imdbRating")}>IMDb</Th>
              <Th onClick={() => toggleSort("tmdbPopularity")}>TMDb</Th>
              <th className="pb-2">Binge</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((t) => {
              const open = selectedId === t.id;
              return (
                <FragmentRow
                  key={t.id}
                  t={t}
                  open={open}
                  catalog={catalog}
                  onToggle={() => onSelect(open ? null : t.id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
          <span>
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, rows.length)} of {rows.length.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button type="button" className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
              Previous
            </button>
            <button type="button" className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40" disabled={page >= pageCount - 1} onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}>
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Th({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <th className="pb-2 pr-2">
      <button type="button" onClick={onClick} className="hover:text-sky-600">
        {children}
      </button>
    </th>
  );
}

function FragmentRow({
  t,
  open,
  catalog,
  onToggle,
}: {
  t: TitleRecord;
  open: boolean;
  catalog: TitleRecord[];
  onToggle: () => void;
}) {
  const similar = open ? findSimilar(t, catalog, 5) : [];
  return (
    <>
      <tr
        className={cn("border-t border-slate-100 dark:border-slate-800 cursor-pointer", open && "bg-sky-50/50 dark:bg-sky-950/30")}
        onClick={onToggle}
      >
        <td className="py-2 pr-2">
          <Poster title={t.title} url={t.posterUrl} />
        </td>
        <td className="pr-2 font-semibold">
          {t.title}
          {t.dataImputed && <span className="ml-1 text-[10px] text-amber-600">imputed</span>}
        </td>
        <td className="pr-2 text-slate-500">{t.type}</td>
        <td className="pr-2">{t.year}</td>
        <td className="pr-2">{t.type === "Movie" ? `${t.runtimeMin ?? "—"}m` : `${t.seasons ?? "—"}s`}</td>
        <td className="pr-2">{t.imdbRating ?? "—"}</td>
        <td className="pr-2">{t.tmdbPopularity >= 10 ? t.tmdbPopularity.toFixed(1) : t.tmdbPopularity.toFixed(2)}</td>
        <td>
          {t.bingeLabel ? (
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                t.bingeLabel === "Weekend Binge" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                t.bingeLabel === "Long-Term Commitment" && "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
                t.bingeLabel === "Standard" && "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {t.bingeLabel}
            </span>
          ) : (
            "—"
          )}
        </td>
      </tr>
      {open && (
        <tr className="bg-slate-50 dark:bg-slate-950/50">
          <td colSpan={8} className="p-4">
            <p className="text-xs text-slate-500 mb-2">
              {t.country} · {t.macroRegion} · {t.genres.join(", ")} · {t.maturityRating}
              {t.imdbVotes != null && ` · ${t.imdbVotes.toLocaleString()} votes`}
            </p>
            {t.description ? <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{t.description}</p> : null}
            <p className="text-[10px] font-mono uppercase text-slate-500 mb-2 flex items-center gap-1">
              <ChevronDown className="w-3 h-3" /> Find similar
            </p>
            <ol className="grid sm:grid-cols-5 gap-2">
              {similar.map((s) => (
                <li key={s.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-xs">
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-slate-500">
                    {s.year} · IMDb {s.imdbRating}
                  </p>
                </li>
              ))}
            </ol>
          </td>
        </tr>
      )}
    </>
  );
}

function Poster({ title, url }: { title: string; url: string | null }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" className="w-10 h-14 object-cover rounded-md bg-slate-200" />
    );
  }
  return (
    <div className="w-10 h-14 rounded-md bg-sky-700 text-white text-[10px] font-bold flex items-center justify-center">
      {title.slice(0, 2).toUpperCase()}
    </div>
  );
}
