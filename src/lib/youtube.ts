import { toHttpsUrl } from "@/lib/safeUrl";

const VIDEO_ID_RE = /^[\w-]{11}$/;

function youtubeHost(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "");
  return (
    host === "youtu.be" ||
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "music.youtube.com" ||
    host === "youtube-nocookie.com"
  );
}

/** Extract an 11-character video id from a YouTube watch/short/embed/share URL. */
export function youtubeVideoId(raw: string): string | null {
  const href = toHttpsUrl(raw);
  if (!href) return null;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  if (!youtubeHost(url.hostname)) return null;

  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return VIDEO_ID_RE.test(id) ? id : null;
  }

  const fromQuery = url.searchParams.get("v");
  if (fromQuery && VIDEO_ID_RE.test(fromQuery)) return fromQuery;

  const parts = url.pathname.split("/").filter(Boolean);
  if (
    (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live" || parts[0] === "v") &&
    parts[1] &&
    VIDEO_ID_RE.test(parts[1])
  ) {
    return parts[1];
  }

  return null;
}

export function youtubeHqThumbnail(raw: string): string {
  const id = youtubeVideoId(raw);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

export function isYoutubeThumbnailUrl(raw: string): boolean {
  const href = toHttpsUrl(raw);
  if (!href) return false;
  try {
    const url = new URL(href);
    return (
      url.hostname === "img.youtube.com" || url.hostname === "i.ytimg.com"
    ) && url.pathname.includes("/vi/");
  } catch {
    return false;
  }
}

/** Prefer a Notion featured image; otherwise YouTube hqdefault when the source is a video URL. */
export const BLOG_PLACEHOLDER_IMAGE = "/AI_Placeholder.jpg";

export function blogCardImageSrc(image?: string, sourceUrl?: string): string {
  const featured = toHttpsUrl(image);
  if (featured) return featured;
  const youtube = sourceUrl ? youtubeHqThumbnail(sourceUrl) : "";
  if (youtube) return youtube;
  return BLOG_PLACEHOLDER_IMAGE;
}

export function isBlogPlaceholderImage(src: string): boolean {
  return src === BLOG_PLACEHOLDER_IMAGE;
}

export function isYoutubeCardThumb(image?: string, sourceUrl?: string): boolean {
  const featured = toHttpsUrl(image);
  if (featured) return isYoutubeThumbnailUrl(featured);
  return Boolean(sourceUrl && youtubeVideoId(sourceUrl));
}
