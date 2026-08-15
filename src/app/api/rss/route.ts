import { NextResponse } from "next/server";
import { checkPublicGetRateLimit, getClientIp } from "@/lib/chatRateLimit";
import { toHttpsUrl } from "@/lib/safeUrl";

export const dynamic = "force-dynamic";

export interface RssStory {
  title: string;
  link: string;
  image: string;
  teaser: string;
  pubDate: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop";
const DEFAULT_LINK = "https://i-wish-you-were-here.com/";

function unescapeHtml(str: string): string {
  let s = str;
  for (let i = 0; i < 2; i++) {
    s = s
      .replace(/&amp;lt;/gi, "<")
      .replace(/&amp;gt;/gi, ">")
      .replace(/&amp;amp;/gi, "&")
      .replace(/&amp;quot;/gi, '"')
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&nbsp;/gi, " ");
  }
  return s;
}

export async function GET(req: Request) {
  try {
    const rate = await checkPublicGetRateLimit(getClientIp(req), "rss");
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
      );
    }

    const res = await fetch("https://i-wish-you-were-here.com/rss.xml", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS feed: ${res.statusText}`);
    }

    const xmlText = await res.text();

    const itemsRaw = xmlText.split("<item>").slice(1);
    const stories: RssStory[] = [];

    for (const itemXml of itemsRaw) {
      // Extract Title
      const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      let title = titleMatch ? unescapeHtml(titleMatch[1]).trim() : "Travel Story";

      // Extract Link
      const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      let link = toHttpsUrl(linkMatch ? linkMatch[1].trim() : "", DEFAULT_LINK);

      // Extract Description
      const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      let rawDesc = descMatch ? descMatch[1] : "";

      const decodedDesc = unescapeHtml(rawDesc);

      // Extract first image src
      const imgMatch = decodedDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
      let image = "";
      if (imgMatch && imgMatch[1]) {
        image = imgMatch[1].trim();
        if (image.startsWith("/")) {
          image = `https://i-wish-you-were-here.com${image}`;
        }
      }
      image = toHttpsUrl(image, DEFAULT_IMAGE);

      // Extract story body if present to skip header metadata
      let bodyHtml = decodedDesc;
      const bodyMatch = decodedDesc.match(/<div[^>]*field--name-body[^>]*>([\s\S]*?)<\/div>/i);
      if (bodyMatch && bodyMatch[1]) {
        bodyHtml = bodyMatch[1];
      }

      // Extract clean text teaser
      let cleanText = bodyHtml
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      let teaser = cleanText;
      if (teaser.length > 220) {
        teaser = teaser.substring(0, 217).trim() + "...";
      }

      // Extract PubDate
      const pubDateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
      let pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
      if (pubDate) {
        try {
          const d = new Date(pubDate);
          if (!isNaN(d.getTime())) {
            pubDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          }
        } catch {
          // Keep original
        }
      }

      if (title && link) {
        stories.push({ title, link, image, teaser, pubDate });
      }
    }

    return NextResponse.json(
      { success: true, stories, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to load travel stories right now." },
      { status: 500 }
    );
  }
}
