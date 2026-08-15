import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

const PATHS = ["/", "/about", "/creations", "/blog", "/websites", "/accomplishments", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
