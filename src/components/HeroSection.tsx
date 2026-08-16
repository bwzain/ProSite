import Link from "next/link";
import Image from "next/image";
import { Headphones, BookOpen, ExternalLink, ArrowRight, Cpu, Award, Sparkles, Bot, MapPin } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-sky-400/15 via-indigo-500/15 to-blue-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-300 text-xs font-mono font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>30+ YEARS ENTERPRISE IT ARCHITECT // DIGITAL MUSIC PRODUCER // PUBLISHED AUTHOR</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                William <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 dark:from-sky-400 dark:via-indigo-400 dark:to-blue-400">Zain</span>
              </h1>
              <p className="text-lg sm:text-xl xl:text-2xl font-normal text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
                Bridging <span className="font-bold text-sky-700 dark:text-sky-300">30+ years of Enterprise Process Automation & Cloud Architecture</span> with digital soundscapes, published AI literature, and global media.
              </p>
            </div>

            {/* Quick Pillar Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-500/50 text-blue-900 dark:text-blue-200 text-xs font-bold">
                <Headphones className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
            </div>

            {/* Primary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
              <Link
                href="/contact#chat"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Bot className="w-4 h-4 text-cyan-200" />
                <span>Chat with my AI Twin</span>
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
                href="https://www.amazon.com/stores/William-Zain/author/B0FFN749GN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buy AI Books</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>

          {/* Right Column: Featured Self-Portrait Spotlight */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[320px] group">
              
              {/* Outer Glowing Gradient Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-blue-600 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500"></div>

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
                <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-slate-950">
                  <Image
                    src="/images/self-portrait.png"
                    alt="William Zain Self Portrait"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
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
          </div>

        </div>

        {/* High Contrast Stat Bar */}
        <div className="w-full pt-8 sm:pt-10">
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
        </div>

      </div>
    </section>
  );
}
