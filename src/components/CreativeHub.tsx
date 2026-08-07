"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Pause, SkipForward, SkipBack, Volume2, BookOpen, ExternalLink, Compass, Sparkles, ChevronRight, Music, CheckCircle2, Youtube, X } from "lucide-react";
import { PROFILE_DATA, YouTubeVideo } from "@/data/profile";

export function CreativeHub() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"beats" | "book" | "travel">("beats");
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideo | null>(null);

  const currentTrack = PROFILE_DATA.musicTracks[currentTrackIndex];
  const playlist = PROFILE_DATA.youtubePlaylist;

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
            Explore Zainy Beats music studio, YouTube video playlists, William Zain's published AI book on Amazon, and global travel media.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md gap-2">
            <button
              onClick={() => setActiveTab("beats")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "beats"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Zainy Beats & YouTube Playlist</span>
            </button>

            <button
              onClick={() => setActiveTab("book")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "book"
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>AI Book</span>
            </button>

            <button
              onClick={() => setActiveTab("travel")}
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

        {/* TAB 1: ZAINY BEATS & YOUTUBE PLAYLIST */}
        {activeTab === "beats" && (
          <div className="space-y-12">
            
            {/* YouTube Playlist Tiles Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-purple-200 dark:border-purple-900/50 shadow-xl space-y-6"
            >
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
                {playlist.videos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    {/* Thumbnail with Play Overlay */}
                    <div
                      onClick={() => setActiveVideoModal(video)}
                      className="relative h-44 w-full cursor-pointer overflow-hidden bg-slate-950 group"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/90 text-white text-[10px] font-mono font-bold">
                        {video.duration}
                      </span>

                      {/* Video Tag */}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-purple-950/90 text-purple-200 border border-purple-500/40 text-[10px] font-mono font-bold">
                        {video.genre}
                      </span>
                    </div>

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
                        <button
                          onClick={() => setActiveVideoModal(video)}
                          className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Watch Video</span>
                        </button>

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
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DAW Synth Audio Engine Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-purple-200 dark:border-purple-900/50 shadow-xl"
            >
              {/* Player Main */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
                      <Music className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Zainy Beats Studio DAW Simulation</h3>
                      <p className="text-xs text-purple-700 dark:text-purple-300 font-mono font-bold">Ableton Live 12 // Modern Audio DAW</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200 text-xs font-mono font-bold">
                    {currentTrack.genre}
                  </span>
                </div>

                {/* Track Box */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                        {currentTrack.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {currentTrack.description}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-600 dark:text-slate-300 space-y-1 shrink-0 ml-4">
                      <div>BPM: <span className="text-purple-600 dark:text-purple-400 font-bold">{currentTrack.bpm}</span></div>
                      <div>Key: <span className="text-sky-600 dark:text-sky-400 font-bold">{currentTrack.key}</span></div>
                      <div>Length: <span className="font-bold">{currentTrack.duration}</span></div>
                    </div>
                  </div>

                  {/* Equalizer Visualizer */}
                  <div className="h-16 bg-slate-100 dark:bg-slate-950 rounded-xl p-3 flex items-end justify-between gap-1 border border-slate-200 dark:border-slate-800">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isPlaying ? "bg-purple-600 dark:bg-purple-400 animate-pulse" : "bg-slate-300 dark:bg-slate-700"
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(20, (Math.sin(i * 0.5) * 40 + 60))}%` : "20%",
                        }}
                      />
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentTrackIndex((prev) => (prev - 1 + PROFILE_DATA.musicTracks.length) % PROFILE_DATA.musicTracks.length)}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-purple-500"
                        aria-label="Previous Track"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg flex items-center gap-2"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        <span className="text-xs font-mono">{isPlaying ? "PAUSE" : "PLAY BEAT"}</span>
                      </button>

                      <button
                        onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % PROFILE_DATA.musicTracks.length)}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-purple-500"
                        aria-label="Next Track"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                      <Volume2 className="w-4 h-4" />
                      <span>Ableton Synth Engine</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Selector List */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 font-mono">
                  Audio Studio Selections
                </h4>
                <div className="space-y-2.5">
                  {PROFILE_DATA.musicTracks.map((track, idx) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        currentTrackIndex === idx
                          ? "bg-purple-600 text-white border-purple-500 shadow-md"
                          : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-purple-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          currentTrackIndex === idx ? "bg-white text-purple-700" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{track.title}</div>
                          <div className={`text-[11px] ${currentTrackIndex === idx ? "text-purple-100" : "text-slate-500 dark:text-slate-400"}`}>
                            {track.genre} • {track.bpm} BPM
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold">{track.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        )}

        {/* TAB 2: AI BOOK SHOWCASE */}
        {activeTab === "book" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-sky-200 dark:border-sky-900/50 shadow-xl"
          >
            {/* Book Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="w-48 sm:w-56 h-72 rounded-2xl bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 p-6 text-white shadow-2xl flex flex-col justify-between border border-white/20">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                    PUBLISHED BOOK
                  </span>
                  <h4 className="text-lg font-black leading-tight pt-2">
                    {PROFILE_DATA.book.title}
                  </h4>
                  <p className="text-xs text-sky-100 font-light">
                    {PROFILE_DATA.book.subtitle}
                  </p>
                </div>
                <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold">William Zain</span>
                  <BookOpen className="w-4 h-4 text-sky-200" />
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                Available on Amazon Kindle & Paperback
              </p>
            </div>

            {/* Book Content Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-sky-600 dark:text-sky-400">
                  Authored by William Zain
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {PROFILE_DATA.book.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {PROFILE_DATA.book.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                  Core Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROFILE_DATA.book.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href={PROFILE_DATA.book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buy on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={() => setBookModalOpen(!bookModalOpen)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:border-sky-500 transition-all"
                >
                  <span>{bookModalOpen ? "Hide Chapter Overview" : "View Chapter Overview"}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${bookModalOpen ? "rotate-90" : ""}`} />
                </button>
              </div>

              {bookModalOpen && (
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700 text-xs text-slate-800 dark:text-slate-200 space-y-2">
                  <div className="font-bold text-sky-600 dark:text-sky-400 uppercase font-mono">Chapter Overview</div>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>Chapter 1:</strong> ML Foundations & Neural Network Concepts</li>
                    <li><strong>Chapter 2:</strong> Large Language Models & Generative AI</li>
                    <li><strong>Chapter 3:</strong> Practical Prompt Workflows for Business</li>
                    <li><strong>Chapter 4:</strong> Security, OAuth, Ethics & AI Synergy</li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: TRAVEL */}
        {activeTab === "travel" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/50 shadow-xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                  Travel & Culture Media
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  I Wish You Were Here
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Sharing travel guides, hidden gems, and cultural photography for curious explorers.
                </p>
              </div>

              <a
                href="https://i-wish-you-were-here.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Visit Travel Blog</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </motion.div>
        )}

      </div>

      {/* Embedded YouTube Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-bold text-white">{activeVideoModal.title}</span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative pt-[56.25%] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.videoId}?autoplay=1`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>

              <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeVideoModal.description}</p>
                </div>
                <a
                  href={activeVideoModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shrink-0 shadow-md"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
