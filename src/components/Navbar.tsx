"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Headphones, BookOpen, Compass, Briefcase, Trophy, Globe, Mail, ChevronRight, Sparkles, ExternalLink } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { PROFILE_DATA } from "@/data/profile";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/", icon: Sparkles, desc: "Portfolio summary & quick spotlights" },
    { name: "About Me", href: "/about", icon: Compass, desc: "Enterprise legacy & creative pivot" },
    { name: "Creative Hub", href: "/creations", icon: Headphones, desc: "Zainy Beats, AI Book & Travel" },
    { name: "Websites", href: "/websites", icon: Globe, desc: "Digital ecosystem & live portals" },
    { name: "Career", href: "/career", icon: Briefcase, desc: "30+ years IT & BPM Consulting" },
    { name: "Accomplishments", href: "/accomplishments", icon: Trophy, desc: "Toastmasters DTM & Certifications" },
    { name: "Contact", href: "/contact", icon: Mail, desc: "Direct inquiries & collaboration" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-600 p-[2px] shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-base">
              WZ
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base flex items-center gap-1.5">
              William Zain
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-sky-600 dark:text-sky-400 uppercase font-semibold">
              Enterprise IT x Digital Creative
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-sky-600 text-white shadow-md"
                    : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-all"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* AI Book Quick Link */}
          <a
            href={PROFILE_DATA.book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:opacity-90 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>AI Book</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* Mobile / Full Menu Drawer Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:border-sky-500 transition-all"
            aria-label="Open Interactive Page Directory"
          >
            {menuOpen ? <X className="w-4 h-4 text-sky-500" /> : <Menu className="w-4 h-4 text-sky-500" />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>

      </div>

      {/* Interactive Page Directory Mega Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    Page Directory & Navigation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Explore William Zain's enterprise history, music production, published book, and digital portals.
                  </p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs"
                >
                  Close [Esc]
                </button>
              </div>

              {/* Grid of Interactive Pages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 group ${
                        isActive
                          ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-100 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-sky-500"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        isActive
                          ? "bg-sky-600 border-sky-500 text-white"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center gap-1">
                          {item.name}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Direct Quick External Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href={PROFILE_DATA.book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Amazon AI Book Page</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href={PROFILE_DATA.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-all"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-sky-500" />
                  </a>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Location: Orange County, California
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
