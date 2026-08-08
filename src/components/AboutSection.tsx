"use client";

import { motion } from "framer-motion";
import { Headphones, BookOpen, Cpu, Compass, CheckCircle2, Shield } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function AboutSection() {
  const iconMap: Record<string, any> = {
    Headphones: Headphones,
    BookOpen: BookOpen,
    Cpu: Cpu,
    Compass: Compass,
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>About William Zain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Enterprise Titan Turned <span className="text-sky-600 dark:text-sky-400">Creative Pioneer</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            30+ years of architecting complex enterprise systems, reframed through the lens of music production, AI literature, and creative storytelling.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Executive Story */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <blockquote className="border-l-4 border-sky-500 pl-4 py-1 italic text-slate-800 dark:text-slate-200 font-bold text-base">
                "{PROFILE_DATA.about.motto}"
              </blockquote>

              {PROFILE_DATA.about.storyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Engineering Rigor</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">Systematic logic applied to audio mixing & book structures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Communication Mastery</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">Toastmasters DTM explaining AI and tech to all audiences.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Pillars List */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {PROFILE_DATA.about.creativePillars.map((pillar, idx) => {
              const IconComponent = iconMap[pillar.icon] || Cpu;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 shadow-md transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-700 dark:text-sky-300 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
