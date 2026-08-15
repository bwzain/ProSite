"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Headphones, BookOpen, ExternalLink, Compass, Sparkles, ChevronRight, Music, CheckCircle2, Youtube, Play, ChevronDown, Rss } from "lucide-react";
import { PROFILE_DATA, RssStory } from "@/data/profile";
import { toHttpsUrl } from "@/lib/safeUrl";

export function CreativeHub() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"beats" | "book" | "travel">("beats");
  const [expandedBookIds, setExpandedBookIds] = useState<Record<string, boolean>>({});
  const [loadSpotifyPlayer, setLoadSpotifyPlayer] = useState(false);
  const spotifyRef = useRef<HTMLDivElement>(null);

  // Lazy-load Spotify player when scrolled into view
  useEffect(() => {
    if (!spotifyRef.current || loadSpotifyPlayer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadSpotifyPlayer(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(spotifyRef.current);

    return () => observer.disconnect();
  }, [loadSpotifyPlayer]);

  useEffect(() => {
    const tabParam = searchParams ? searchParams.get("tab") : null;
    if (tabParam === "book" || tabParam === "beats" || tabParam === "travel") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // RSS Feed state
  const [rssStories, setRssStories] = useState<RssStory[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingRss, setLoadingRss] = useState(false);
  const [rssError, setRssError] = useState<string | null>(null);

  const playlist = PROFILE_DATA.youtubePlaylist;

  const fetchTravelRss = async () => {
    setLoadingRss(true);
    setRssError(null);
    try {
      const res = await fetch("/api/rss");
      const data = await res.json();
      if (data.success && Array.isArray(data.stories)) {
        setRssStories(data.stories);
      } else {
        setRssError("Unable to load travel stories right now.");
      }
    } catch {
      setRssError("Network error loading travel feed");
    } finally {
      setLoadingRss(false);
    }
  };

  const handleTabClick = (tab: "beats" | "book" | "travel") => {
    setActiveTab(tab);
    if (tab === "travel") {
      setVisibleCount(3);
      fetchTravelRss();
    }
  };

  const handleLoadMore = async () => {
    if (visibleCount < rssStories.length) {
      setVisibleCount((prev) => Math.min(prev + 3, rssStories.length));
    } else {
      setLoadingRss(true);
      await fetchTravelRss();
      setVisibleCount((prev) => prev + 3);
    }
  };

  useEffect(() => {
    if (activeTab === "travel") {
      fetchTravelRss();
    }
  }, [activeTab]);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/50 text-purple-900 dark:text-purple-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Creative Hub & Media Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Digital Music, <span className="text-purple-600 dark:text-purple-400">AI Literature</span> & Travel Media
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            Explore Zainy Beats music video playlists, Spotify streams, William Zain's published AI books on Amazon, and global travel media.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md gap-2">
            <button
              onClick={() => handleTabClick("beats")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "beats"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Zainy Beats & YouTube / Spotify</span>
            </button>

            <button
              onClick={() => handleTabClick("book")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "book"
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>AI Books</span>
            </button>

            <button
              onClick={() => handleTabClick("travel")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "travel"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Travel Platform</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ZAINY BEATS, YOUTUBE & SPOTIFY PLAYLIST */}
        {activeTab === "beats" && (
          <div className="space-y-12">
            
            {/* YouTube Playlist Tiles Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-purple-200 dark:border-purple-900/50 shadow-xl space-y-6">
              {/* Playlist Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-600 dark:text-red-500" />
                    <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                      Official YouTube Playlist
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {playlist.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Featuring official music videos, cinematic instrumental soundscapes, and synthwave compositions by Billy Zain.
                  </p>
                </div>

                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-md shadow-red-600/20 hover:scale-105 transition-all shrink-0"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open Full YouTube Playlist</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* 4 Video Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {playlist.videos.map((video) => (
                  <div
                    key={video.id}
                    className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Thumbnail with Play Overlay — opens YouTube (embeds blocked for these VEVO tracks) */}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-44 w-full cursor-pointer overflow-hidden bg-slate-950 group block"
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center z-10">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/90 text-white text-[10px] font-mono font-bold z-10">
                        {video.duration}
                      </span>

                      {/* Video Tag */}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-purple-950/90 text-purple-200 border border-purple-500/40 text-[10px] font-mono font-bold z-10">
                        {video.genre}
                      </span>
                    </a>

                    {/* Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-normal leading-relaxed">
                          {video.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Watch on YouTube</span>
                        </a>

                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          title="Open on YouTube"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spotify Embedded Playlist Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/50 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Official Spotify Stream
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Zainy Beats Official Spotify Playlist
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Stream full tracks, ambient soundscapes, and synthwave compositions directly from Spotify.
                  </p>
                </div>

                <a
                  href="https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26?si=6531112846d84318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:scale-105 transition-all shrink-0"
                >
                  <Music className="w-4 h-4" />
                  <span>Open in Spotify App</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* Spotify Player Embed Facade for High Performance & Lazy Loading */}
              <div ref={spotifyRef} className="w-full overflow-hidden rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-950">
                {loadSpotifyPlayer ? (
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/4qES1KLqZgz8VTkIRdZc26?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setLoadSpotifyPlayer(true)}
                    className="relative w-full h-[280px] sm:h-[352px] bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 flex flex-col items-center justify-center p-6 text-center cursor-pointer group transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
                      <Play className="w-8 h-8 ml-1 fill-slate-950" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      Click to Stream Zainy Beats on Spotify
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1.5 font-medium">
                      Load full interactive player for official synthwave, lofi & ambient studio releases.
                    </p>
                    <span className="mt-4 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      Interactive Spotify Player
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI BOOKS SHOWCASE */}
        {activeTab === "book" && (
          <div className="space-y-12">
            {PROFILE_DATA.books.map((b) => {
              const isExpanded = expandedBookIds[b.id];
              return (
                <div
                  key={b.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border ${b.themeColor.border} shadow-xl`}
                >
                  {/* Book Visual */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <a
                      href={b.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative block overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 ${b.themeColor.accentGlow}`}
                    >
                      <Image
                        src={b.coverImage}
                        alt={b.title}
                        width={240}
                        height={340}
                        sizes="240px"
                        loading="lazy"
                        className="w-52 sm:w-60 h-auto object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                      />
                    </a>
                    <p className="mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Available on Amazon Kindle & Paperback
                    </p>
                  </div>

                  {/* Book Content Details */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono uppercase font-bold ${b.themeColor.text}`}>
                          Authored by {b.author}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                          Amazon Publication
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {b.title}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                        {b.subtitle}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-1">
                        {b.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                        Core Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {b.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <CheckCircle2 className={`w-4 h-4 ${b.themeColor.text} shrink-0 mt-0.5`} />
                            <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <a
                        href={b.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl ${b.themeColor.bg} text-white font-bold text-sm shadow-md transition-all`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Buy on Amazon</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      <button
                        onClick={() =>
                          setExpandedBookIds((prev) => ({ ...prev, [b.id]: !prev[b.id] }))
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:border-slate-400 transition-all"
                      >
                        <span>{isExpanded ? "Hide Chapter Overview" : "View Chapter Overview"}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border ${b.themeColor.border} text-xs text-slate-800 dark:text-slate-200 space-y-2`}>
                        <div className={`font-bold ${b.themeColor.text} uppercase font-mono`}>Chapter Overview</div>
                        <ul className="space-y-1.5 list-disc list-inside">
                          {b.chapters.map((ch) => (
                            <li key={ch.number}>
                              <strong>Chapter {ch.number}: {ch.title}</strong> – {ch.desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: TRAVEL */}
        {activeTab === "travel" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/50 shadow-xl space-y-8">
            {/* Travel Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                  Travel & Culture Media
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  I Wish You Were Here
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Sharing travel guides, hidden gems, and cultural photography for curious explorers.
                </p>
              </div>

              <a
                href="https://i-wish-you-were-here.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>Visit Travel Blog</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Live RSS Feed Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Rss className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
                    Travel Feed Stories ({Math.min(visibleCount, rssStories.length)} of {rssStories.length || 3})
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                    LIVE
                  </span>
                </div>

                <button
                  onClick={handleLoadMore}
                  disabled={loadingRss}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all shrink-0 disabled:opacity-50"
                  title="Load next three stories"
                >
                  <ChevronDown className={`w-3.5 h-3.5 ${loadingRss ? "animate-spin" : ""}`} />
                  <span>{loadingRss ? "Evaluating Feed..." : "Load more articles"}</span>
                </button>
              </div>

              {loadingRss && rssStories.length === 0 ? (
                /* Skeleton Loader */
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 animate-pulse"
                    >
                      <div className="w-full sm:w-44 h-32 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                      <div className="space-y-2 flex-1 pt-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : rssError ? (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center justify-between">
                  <span>{rssError}</span>
                  <button onClick={fetchTravelRss} className="font-bold underline ml-2">Try Again</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {rssStories.slice(0, visibleCount).map((story, idx) => {
                    const storyLink = toHttpsUrl(story.link);
                    const storyImage = toHttpsUrl(story.image);
                    if (!storyLink) return null;
                    return (
                    <div
                      key={storyLink || idx}
                      className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                    >
                      {/* Left: Image Thumbnail */}
                      <a
                        href={storyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full sm:w-48 h-40 sm:h-32 rounded-xl overflow-hidden bg-slate-950 shrink-0 block group/img"
                      >
                        {storyImage ? (
                        <img
                          src={storyImage}
                          alt={story.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        ) : null}
                        {story.pubDate && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/85 text-white text-[10px] font-mono font-bold">
                            {story.pubDate}
                          </span>
                        )}
                      </a>

                      {/* Right: Topic Teaser & Link */}
                      <div className="space-y-2 flex-1 flex flex-col justify-between self-stretch">
                        <div className="space-y-1.5">
                          <a
                            href={storyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <h5 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                              {story.title}
                            </h5>
                          </a>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
                            {story.teaser}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                          <a
                            href={storyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <span>Read the full story here</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                            i-wish-you-were-here.com
                          </span>
                        </div>
                      </div>
                    </div>
                    );
                  })}

                  {/* Bottom Action Button for Loading More Articles */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingRss}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 font-bold text-xs shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                    >
                      <ChevronDown className={`w-4 h-4 text-emerald-600 ${loadingRss ? "animate-spin" : ""}`} />
                      <span>{loadingRss ? "Evaluating Feed..." : "Load more articles"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Travel Platform Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">01 // GUIDES</div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Curated Travel Guides</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Destination guides covering cultural hotspots, local dining, and scenic routes across California and international locations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">02 // HIDDEN GEMS</div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Off-the-Beaten-Path</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Quiet architectural landmarks, scenic vistas, and authentic cultural experiences away from typical crowds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">03 // PHOTOGRAPHY</div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Visual Storytelling</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  High-resolution photo essays capturing light, atmosphere, and authentic moments during global travels.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
