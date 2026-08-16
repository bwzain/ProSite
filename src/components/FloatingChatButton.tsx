"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Sparkles } from "lucide-react";

export function FloatingChatButton() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Link
        href="/contact#chat"
        className="flex items-center justify-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-2xl hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all border border-white/20"
        aria-label="Chat with my AI Twin"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-5 h-5 text-cyan-200" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span className="hidden sm:inline">Chat with my AI Twin</span>
        <Sparkles className="hidden sm:block w-4 h-4 text-amber-300 animate-pulse" />
      </Link>
    </div>
  );
}
