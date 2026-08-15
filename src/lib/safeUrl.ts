/** Allow only https URLs for CMS/RSS-derived hrefs and image srcs. */

export function toHttpsUrl(raw: unknown, fallback = ""): string {
  if (typeof raw !== "string") return fallback;
  const trimmed = raw.trim();
  if (!trimmed) return fallback;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return fallback;
    if (!url.hostname) return fallback;
    return url.href;
  } catch {
    return fallback;
  }
}
