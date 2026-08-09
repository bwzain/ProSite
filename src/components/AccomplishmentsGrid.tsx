"use client";

import { useState } from "react";
import { Trophy, Award, BookOpen, Cloud, Bot, ShieldCheck, Lock, GraduationCap, Code, ExternalLink } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function AccomplishmentsGrid() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Award", "Certification", "Publication", "Education"];

  const iconMap: Record<string, any> = {
    Trophy: Trophy,
    Award: Award,
    BookOpen: BookOpen,
    Cloud: Cloud,
    Bot: Bot,
    ShieldCheck: ShieldCheck,
    Lock: Lock,
    GraduationCap: GraduationCap,
    Code: Code,
  };

  const filteredAccomplishments = filter === "All"
    ? PROFILE_DATA.accomplishments
    : PROFILE_DATA.accomplishments.filter((acc) => acc.category === filter);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Honors & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Accomplishments & <span className="text-amber-600 dark:text-amber-400">Certifications</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            Recognized accolades in leadership, Toastmasters public speaking, AWS Cloud Architecture, RPA, and computer science degrees.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccomplishments.map((acc) => {
            const IconComponent = iconMap[acc.iconName] || Award;
            return (
              <div
                key={acc.id}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {acc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400">
                      {acc.issuer} • {acc.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {acc.link ? (
                        <a
                          href={acc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>{acc.title}</span>
                          <ExternalLink className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        </a>
                      ) : (
                        acc.title
                      )}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {acc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                    {acc.badgeText}
                  </span>
                  {acc.link && (
                    <a
                      href={acc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
