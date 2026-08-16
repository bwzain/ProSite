"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, ExternalLink, BookOpen, Compass, Share2, Sparkles } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function WebsitesShowcase() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Travel", "Book", "Social"];

  const categoryIcons: Record<string, any> = {
    Travel: Compass,
    Book: BookOpen,
    Social: Share2,
  };

  const filteredWebsites = filter === "All"
    ? PROFILE_DATA.websites
    : PROFILE_DATA.websites.filter((site) => site.category === filter);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Digital Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Connections & <span className="text-sky-600 dark:text-sky-400">Live Portals</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            Explore direct portals to William Zain's travel platform, published AI books on Amazon, and official social communities.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? "bg-sky-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => {
            const CategoryIcon = categoryIcons[website.category] || Globe;
            return (
              <div
                key={website.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={website.image}
                    alt={website.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md text-sky-300 text-[10px] font-mono font-bold uppercase z-10">
                    <CategoryIcon className="w-3 h-3 text-sky-400" />
                    <span>{website.category}</span>
                  </div>

                  {website.featured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/90 border border-blue-500 text-blue-200 text-[10px] font-mono font-bold z-10">
                      <Sparkles className="w-3 h-3 text-blue-300" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {website.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                      {website.tagline}
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {website.description}
                    </p>
                  </div>

                  {website.stats && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      {website.stats.map((stat, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">{stat.label}</div>
                          <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-slate-900 dark:text-slate-100 font-bold text-xs transition-all border border-slate-300 dark:border-slate-700"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
