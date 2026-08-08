"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Clock } from "lucide-react";

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const now = new Date();
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-[2px]">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400 text-sm">
                WZ
              </div>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white text-base">William Zain</div>
              <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">Enterprise IT Architect x Digital Music Producer</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs shadow-sm">
            <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Orange County, CA:</span>
            <span className="font-bold text-sky-600 dark:text-sky-400" suppressHydrationWarning>
              {mounted ? timeString : "1:57 PM PST"}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm transition-all"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-600 dark:text-slate-400 text-xs font-medium">
          <div>
            © {new Date().getFullYear()} William Zain. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-bold">
            <Link href="/" className="hover:text-sky-600 transition-colors">Overview</Link>
            <Link href="/about" className="hover:text-sky-600 transition-colors">About</Link>
            <Link href="/creations" className="hover:text-sky-600 transition-colors">Creations</Link>
            <Link href="/websites" className="hover:text-sky-600 transition-colors">Websites</Link>
            <Link href="/accomplishments" className="hover:text-sky-600 transition-colors">Accomplishments</Link>
            <Link href="/contact" className="hover:text-sky-600 transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
