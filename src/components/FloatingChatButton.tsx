"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Sparkles } from "lucide-react";

export function FloatingChatButton() {
  const pathname = usePathname();

  // If already on contact page, still show button or anchor link
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Link
        href="/contact#chat"
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-2xl hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all border border-white/20"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-5 h-5 text-cyan-200" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span>Chat with AI Twin</span>
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
      </Link>
    </div>
  );
}
