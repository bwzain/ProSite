"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Headphones, BookOpen, ExternalLink, ArrowRight, Cpu, Award, Sparkles, Bot, MapPin } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-sky-400/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-300 text-xs font-mono font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>30+ YEARS ENTERPRISE IT ARCHITECT // DIGITAL MUSIC PRODUCER // PUBLISHED AUTHOR</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                William <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400">Zain</span>
              </h1>
              <p className="text-lg sm:text-xl xl:text-2xl font-normal text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
                Bridging <span className="font-bold text-sky-700 dark:text-sky-300">30+ years of Enterprise Process Automation & Cloud Architecture</span> with digital soundscapes, published AI literature, and global media.
              </p>
            </motion.div>

            {/* Quick Pillar Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/50 text-purple-900 dark:text-purple-200 text-xs font-bold">
                <Headphones className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Zainy Beats Studio</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-200 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Published AI Author</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold">
                <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>AWS & K2 Workflow Architect</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-200 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Toastmasters DTM</span>
              </div>
            </motion.div>

            {/* Primary Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto"
            >
              <Link
                href="/contact#chat"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Bot className="w-4 h-4 text-cyan-200" />
                <span>Chat with AI Twin</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </Link>

              <Link
                href="/creations"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm hover:border-sky-500 hover:scale-[1.02] transition-all shadow-sm"
              >
                <Headphones className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Explore Music & Books</span>
              </Link>

              <a
                href={PROFILE_DATA.book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buy Book</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </motion.div>

          </div>

          {/* Right Column: Featured Self-Portrait Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
              
              {/* Outer Glowing Gradient Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500"></div>

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <Image
                    src="/images/self-portrait.png"
                    alt="William Zain Self Portrait"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* On-Photo Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 text-white">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-extrabold tracking-tight drop-shadow-md">
                        William Zain
                      </h2>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium line-clamp-1 drop-shadow-sm">
                      Enterprise IT Architect • Music Producer • AI Author
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-sky-400 font-mono font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{PROFILE_DATA.location}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* High Contrast Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full pt-12 sm:pt-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 text-center border-r last:border-r-0 border-slate-200 dark:border-slate-800">
                <span className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
