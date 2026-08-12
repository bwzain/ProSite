import Image from "next/image";
import { Headphones, BookOpen, Cpu, Compass, CheckCircle2, Shield, Award } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function AboutSection() {
  const iconMap: Record<string, any> = {
    Headphones: Headphones,
    BookOpen: BookOpen,
    Cpu: Cpu,
    Compass: Compass,
  };

  return (
    <section className="pt-6 sm:pt-8 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
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
          
          {/* Left Column: Executive Story Card with Integrated Portrait */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              {/* Executive Bio Header Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-200 dark:border-slate-700 shadow-lg bg-slate-950">
                  <Image
                    src="/images/self-portrait.png"
                    alt="William Zain Portrait"
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-[10px] font-mono font-bold uppercase">
                    <Award className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                    <span>Toastmasters DTM • Enterprise Architect</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    William Zain
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    Orange County, CA • BS Computer Science • 30+ Yrs Enterprise IT
                  </p>

                  <blockquote className="border-l-2 border-sky-500 pl-3 italic text-slate-700 dark:text-slate-300 font-semibold text-xs pt-1">
                    "{PROFILE_DATA.about.motto}"
                  </blockquote>
                </div>
              </div>

              {/* Biography Paragraphs */}
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
            </div>
          </div>

          {/* Right Column: Pillars List */}
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
