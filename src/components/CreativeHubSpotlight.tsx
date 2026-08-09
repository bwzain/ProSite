"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Headphones, BookOpen, Compass, ArrowRight, Play, Sparkles, Rss, Music } from "lucide-react";
import { PROFILE_DATA, RssStory } from "@/data/profile";

export function CreativeHubSpotlight() {
  const [topRssStory, setTopRssStory] = useState<RssStory | null>(null);

  useEffect(() => {
    // Fetch latest RSS story for Travel Spotlight tile
    async function loadLatestStory() {
      try {
        const res = await fetch(`/api/rss?t=${Date.now()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.stories) && data.stories.length > 0) {
          setTopRssStory(data.stories[0]);
        }
      } catch {
        // Silently fallback to default data
      }
    }
    loadLatestStory();
  }, []);

  const topVideo = PROFILE_DATA.youtubePlaylist.videos[0];
  const books = PROFILE_DATA.books;
  const defaultTravelImage = PROFILE_DATA.websites[0].image;

  return (
    <section className="py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Creative Hub Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Music, AI Literature & Global Media
            </h2>
          </div>

          <Link
            href="/creations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all shrink-0"
          >
            <span>Open Full Creative Hub</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
          </Link>
        </div>

        {/* 3-Pillar Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* TILE 1: ZAINY BEATS STUDIO */}
          <div className="group rounded-3xl bg-slate-50 dark:bg-slate-950 border border-purple-200 dark:border-purple-900/50 hover:border-purple-500 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-[10px] font-mono font-bold uppercase">
                  <Headphones className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  Zainy Beats Studio
                </span>
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">YouTube & Spotify</span>
              </div>

              {/* Video Thumbnail Preview */}
              <Link href="/creations?tab=beats" className="block relative h-40 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-[1.02] transition-transform">
                <Image
                  src={topVideo.thumbnail}
                  alt={topVideo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold line-clamp-1">
                  {topVideo.title}
                </div>
              </Link>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Synthwave, Lofi & Ambient Tracks
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  Original electronic music compositions, official video releases, and streaming Spotify playlists.
                </p>
              </div>
            </div>

            <Link
              href="/creations?tab=beats"
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/80 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-sm"
            >
              <span>Explore Music Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TILE 2: PUBLISHED AI BOOKS */}
          <div className="group rounded-3xl bg-slate-50 dark:bg-slate-950 border border-sky-200 dark:border-sky-900/50 hover:border-sky-500 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-300 text-[10px] font-mono font-bold uppercase">
                  <BookOpen className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  AI Literature
                </span>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold">2 Amazon Books</span>
              </div>

              {/* Side-by-Side Miniature Book Covers */}
              <Link href="/creations?tab=book" className="flex items-center justify-center gap-3 h-40 w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-md group-hover:scale-[1.02] transition-transform">
                {books.map((b) => (
                  <div key={b.id} className="relative w-20 h-32 rounded-lg overflow-hidden shadow-md shrink-0 border border-slate-200 dark:border-slate-700">
                    <Image
                      src={b.coverImage}
                      alt={b.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </Link>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Practical Guides to Artificial Intelligence
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  Demystifying machine learning, generative tools, LLMs, and content creation for everyday creators.
                </p>
              </div>
            </div>

            <Link
              href="/creations?tab=book"
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 dark:hover:text-white transition-all shadow-sm"
            >
              <span>Read Book Excerpts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TILE 3: TRAVEL & STORYTELLING */}
          <div className="group rounded-3xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-[10px] font-mono font-bold uppercase">
                  <Compass className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Travel Platform
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <Rss className="w-3 h-3" /> Live Feed
                </span>
              </div>

              {/* RSS Story Preview */}
              <Link href="/creations?tab=travel" className="block relative h-40 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group-hover:scale-[1.02] transition-transform">
                <Image
                  src={topRssStory?.image || defaultTravelImage}
                  alt={topRssStory?.title || "I Wish You Were Here Travel"}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold line-clamp-1">
                  {topRssStory?.title || "I Wish You Were Here • Travel Stories"}
                </div>
              </Link>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  I Wish You Were Here
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {topRssStory?.teaser || "Authentic travel guides, cultural insights, and hidden gems for global explorers."}
                </p>
              </div>
            </div>

            <Link
              href="/creations?tab=travel"
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm"
            >
              <span>Read Travel Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
