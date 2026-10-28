/** Host that returns 200. Vercel 308s the apex to this origin. */
const CANONICAL_ORIGIN = "https://www.wzain.com";

/**
 * Canonical origin for metadata, sitemap, robots, and JSON-LD.
 * Apex wzain.com redirects, so never advertise it as the indexed host.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return preferCanonicalHost(explicit);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "");
  if (vercelProd) return preferCanonicalHost(`https://${vercelProd}`);

  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercel) return preferCanonicalHost(`https://${vercel}`);

  return "http://localhost:3000";
}

function preferCanonicalHost(origin: string): string {
  try {
    const url = new URL(origin);
    if (url.hostname === "wzain.com") return CANONICAL_ORIGIN;
  } catch {
    return origin;
  }
  return origin;
}
