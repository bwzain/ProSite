"use me";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, Sparkles, Cpu, Code2, Search } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function CareerTimeline() {
  const [filter, setFilter] = useState<"all" | "creative" | "enterprise">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("c-author");

  const filteredCareers = PROFILE_DATA.careers.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch =
      searchQuery === "" ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Career Odyssey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            30+ Years of <span className="text-indigo-600 dark:text-indigo-400">Enterprise IT & Creative Leadership</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            From mainframe systems and enterprise BPM automation to digital music production and published AI literature.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-10">
          <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 w-full sm:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              All Roles ({PROFILE_DATA.careers.length})
            </button>
            <button
              onClick={() => setFilter("creative")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none ${
                filter === "creative"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              Creative Era
            </button>
            <button
              onClick={() => setFilter("enterprise")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none ${
                filter === "enterprise"
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
              }`}
            >
              Enterprise IT & BPM
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          {filteredCareers.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isCreative = item.type === "creative";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative pl-6 sm:pl-10"
              >
                {/* Node Dot */}
                <div
                  className={`absolute -left-[25px] sm:-left-[41px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                    isCreative
                      ? "bg-purple-600 border-purple-400 text-white shadow-md"
                      : "bg-sky-600 border-sky-400 text-white shadow-md"
                  }`}
                >
                  {isCreative ? <Sparkles className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-md">
                  
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          isCreative
                            ? "bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700"
                            : "bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700"
                        }`}>
                          {item.company}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {item.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                      <button
                        className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        aria-label="Toggle Details"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs"
                    >
                      <div className="space-y-2">
                        <div className="font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider text-[11px]">
                          Key Achievements & Contributions
                        </div>
                        <ul className="space-y-2">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-1.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>Technologies & Ecosystem</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
