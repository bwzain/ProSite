"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, ExternalLink, Calendar, Tag, RefreshCw, Sparkles, Search } from "lucide-react";
import { BlogPost, FALLBACK_BLOGS } from "@/lib/notion";

export function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(FALLBACK_BLOGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blogs?t=${Date.now()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
        setBlogs(data.posts);
      } else {
        setBlogs(FALLBACK_BLOGS);
      }
    } catch {
      setError("Note: Showing cached fallback articles.");
      setBlogs(FALLBACK_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-mono uppercase font-bold tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Notion-Powered Blog & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Articles, Guides & <span className="text-purple-600 dark:text-purple-400">Thought Leadership</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            Insights on Artificial Intelligence, Enterprise Automation, Music Soundscapes, and Global Travel — published directly from Notion.
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Notion CMS Integration</span>
            <button
              onClick={fetchBlogs}
              disabled={loading}
              className="ml-2 inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-bold"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Controls Bar: Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

        </div>

        {/* Loading Skeleton */}
        {loading && blogs.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized={post.image.startsWith("http")}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md text-purple-300 text-[10px] font-mono font-bold uppercase z-10">
                    <Tag className="w-3 h-3 text-purple-400" />
                    <span>{post.category}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0">
                {post.sourceUrl ? (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-slate-900 dark:text-slate-100 font-bold text-xs transition-all border border-slate-300 dark:border-slate-700 shadow-sm"
                  >
                    <span>Read Article / Source</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                ) : (
                  <div className="w-full text-center py-2 text-xs font-mono text-slate-400 italic">
                    Published in Notion
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your category filter or search query.</p>
          </div>
        )}

      </div>
    </section>
  );
}
