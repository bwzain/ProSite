"use client";

import { useState, useEffect } from "react";
import { BookOpen, ExternalLink, Calendar, Tag, Search, X, Play } from "lucide-react";
import { BlogPost } from "@/lib/notion";
import { toHttpsUrl } from "@/lib/safeUrl";
import { blogCardImageSrc, isBlogPlaceholderImage, isYoutubeCardThumb, youtubeVideoId } from "@/lib/youtube";

function YoutubePlayMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
      <span
        className={`flex items-center justify-center rounded-full bg-slate-950/70 border border-white/30 text-white shadow-md ${
          compact ? "h-8 w-8" : "h-12 w-12"
        }`}
      >
        <Play className={`fill-white ${compact ? "h-3.5 w-3.5" : "h-5 w-5"}`} />
      </span>
    </div>
  );
}

function BlogThumb({
  post,
  alt,
  className,
  compact = false,
}: {
  post: BlogPost;
  alt: string;
  className: string;
  compact?: boolean;
}) {
  const href = blogCardImageSrc(post.image, post.sourceUrl);
  const fromYoutube = isYoutubeCardThumb(post.image, post.sourceUrl);
  const src = isBlogPlaceholderImage(href)
    ? href
    : `/api/blog-image/${encodeURIComponent(post.id)}`;
  return (
    <>
      {/* Same-origin redirect keeps Notion signed URLs fresh. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        referrerPolicy={fromYoutube ? "no-referrer" : undefined}
      />
      {fromYoutube ? <YoutubePlayMark compact={compact} /> : null}
    </>
  );
}

export function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [page, setPage] = useState(1);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setBlogs(data.posts);
      } else {
        setBlogs([]);
        setError("Unable to load articles right now.");
      }
    } catch {
      setError("Unable to load articles right now.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Helper function to check if a blog's category matches the selected category filter
  const matchesCategoryFilter = (blogCat: string, activeCat: string) => {
    if (activeCat === "All") return true;
    const catLower = (blogCat || "").toLowerCase();
    const activeLower = activeCat.toLowerCase();

    if (activeLower === "ai") {
      return catLower.includes("ai") || catLower.includes("artificial intelligence") || catLower.includes("book") || catLower.includes("literature");
    }
    if (activeLower === "music") {
      return catLower.includes("music") || catLower.includes("audio") || catLower.includes("beat") || catLower.includes("sound");
    }
    if (activeLower === "travel") {
      return catLower.includes("travel") || catLower.includes("story") || catLower.includes("media") || catLower.includes("guide");
    }
    return catLower === activeLower || catLower.includes(activeLower) || activeLower.includes(catLower);
  };

  // Build category list ensuring All, AI, Music, Travel are prominently positioned
  const standardCategories = ["All", "AI", "Music", "Travel"];
  const otherCategories = Array.from(
    new Set(
      blogs
        .map((b) => b.category)
        .filter(Boolean)
        .filter(
          (c) =>
            !matchesCategoryFilter(c, "AI") &&
            !matchesCategoryFilter(c, "Music") &&
            !matchesCategoryFilter(c, "Travel")
        )
    )
  );
  const categories = [...standardCategories, ...otherCategories];

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = matchesCategoryFilter(blog.category, activeCategory);
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredBlogs.slice(0, 3);
  const remainingPosts = filteredBlogs.slice(3);
  const LIST_PAGE_SIZE = 10;
  const totalListPages = Math.max(1, Math.ceil(remainingPosts.length / LIST_PAGE_SIZE));
  const currentPage = Math.min(page, totalListPages);
  const pagedRemaining = remainingPosts.slice(
    (currentPage - 1) * LIST_PAGE_SIZE,
    currentPage * LIST_PAGE_SIZE,
  );

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar: Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500"
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Loading Skeleton */}
        {loading && blogs.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500">Loading articles…</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* Featured three */}
        {featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setSelectedPost(post)}
                    className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-950 cursor-pointer"
                  >
                    <BlogThumb
                      post={post}
                      alt={post.title}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md text-blue-300 text-[10px] font-mono font-bold uppercase z-10">
                      <Tag className="w-3 h-3 text-blue-400" />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{post.date}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedPost(post)}
                      className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Article</span>
                  </button>

                  {toHttpsUrl(post.sourceUrl) ? (
                    <a
                      href={toHttpsUrl(post.sourceUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all shadow-sm"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 font-bold text-xs border border-slate-200 dark:border-slate-800 cursor-not-allowed"
                    >
                      <span>No Source</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Remaining posts as a list */}
        {remainingPosts.length > 0 && (
          <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {pagedRemaining.map((post) => (
              <li key={post.id} className="group relative">
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="absolute inset-0 z-0"
                  aria-label={`Read ${post.title}`}
                />
                <div className="grid grid-cols-[minmax(0,1fr)_4.75rem] items-start gap-4 py-5 transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-900/60 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto_5.5rem] sm:gap-6">
                  <time className="hidden text-sm tracking-wide text-slate-500 dark:text-slate-400 sm:block">
                    {post.date}
                  </time>
                  <div className="min-w-0">
                    <time className="text-sm tracking-wide text-slate-500 dark:text-slate-400 sm:hidden">
                      {post.date}
                    </time>
                    <h3 className="text-lg font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {post.description}
                    </p>
                    <span className="mt-2 inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:hidden">
                      {post.category}
                    </span>
                  </div>
                  <span className="hidden pt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:block sm:text-right">
                    {post.category}
                  </span>
                  <div className="relative h-[4.75rem] w-[4.75rem] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 sm:h-[5.5rem] sm:w-[5.5rem]">
                    <BlogThumb
                      post={post}
                      alt=""
                      compact
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {remainingPosts.length > LIST_PAGE_SIZE ? (
          <nav
            aria-label="Article list pages"
            className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-sm"
          >
            {currentPage > 1 ? (
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                className="rounded-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
              >
                Previous
              </button>
            ) : (
              <span className="rounded-xl px-3 py-2 text-slate-400 dark:text-slate-600">
                Previous
              </span>
            )}

            {Array.from({ length: totalListPages }, (_, i) => i + 1).map((n) =>
              n === currentPage ? (
                <span
                  key={n}
                  aria-current="page"
                  className="rounded-xl bg-blue-600 px-3 py-2 font-bold text-white shadow-md"
                >
                  {n}
                </span>
              ) : (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className="rounded-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                >
                  {n}
                </button>
              ),
            )}

            {currentPage < totalListPages ? (
              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                className="rounded-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
              >
                Next
              </button>
            ) : (
              <span className="rounded-xl px-3 py-2 text-slate-400 dark:text-slate-600">
                Next
              </span>
            )}
          </nav>
        ) : null}

        {/* Empty Search Result */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {error
                ? "Unable to load articles"
                : blogs.length === 0
                  ? "No published articles yet"
                  : "No articles found"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {error
                ? error
                : blogs.length === 0
                  ? "Check back after a post is published."
                  : "Try adjusting your category filter or search query."}
            </p>
          </div>
        )}

      </div>

      {/* READ ARTICLE FULL DETAIL MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-mono font-bold uppercase">
                  <Tag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {selectedPost.category}
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {selectedPost.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Layout: Image on Left/Top, Description next to Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              <div className="md:col-span-5 relative aspect-square sm:aspect-[4/3] md:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-950 shadow-lg border border-slate-200 dark:border-slate-800 shrink-0">
                <BlogThumb
                  post={selectedPost}
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Full Description & Details Column */}
              <div className="md:col-span-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {selectedPost.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Article Summary & Content
                    </h4>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                      {selectedPost.description}
                    </p>
                  </div>
                </div>

                {/* Modal Footer CTAs */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  {toHttpsUrl(selectedPost.sourceUrl) ? (
                    <a
                      href={toHttpsUrl(selectedPost.sourceUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <span>{selectedPost.sourceUrl && youtubeVideoId(selectedPost.sourceUrl) ? "Watch on YouTube" : "Visit External Source / Link"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 italic">
                      No external source link
                    </span>
                  )}

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all"
                  >
                    Close
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
