import type { TitleRecord } from "@/lib/catalog/types";

export function KpiStrip({ titles }: { titles: TitleRecord[] }) {
  const meanImdb = avg(titles.map((t) => t.imdbRating).filter((n): n is number => n != null));
  const meanPop = avg(titles.map((t) => t.tmdbPopularity));
  const imputed = titles.filter((t) => t.dataImputed).length;
  const share = titles.length ? (imputed / titles.length) * 100 : 0;

  const items = [
    { label: "Titles", value: titles.length.toLocaleString() },
    { label: "Mean IMDb", value: meanImdb ? meanImdb.toFixed(2) : "—" },
    { label: "Mean TMDb pop.", value: meanPop ? meanPop.toFixed(1) : "—" },
    { label: "Imputed share", value: `${share.toFixed(0)}%` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3"
        >
          <p className="text-[10px] font-mono uppercase tracking-wide text-slate-500">{item.label}</p>
          <p className="text-xl font-extrabold mt-0.5">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
