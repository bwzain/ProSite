import { NextResponse } from "next/server";
import { getNotionBlogPosts } from "@/lib/notion";
import { checkPublicGetRateLimit, getClientIp } from "@/lib/chatRateLimit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const rate = await checkPublicGetRateLimit(getClientIp(req), "blogs");
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
      );
    }

    const posts = await getNotionBlogPosts();
    return NextResponse.json(
      { success: true, posts },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to load articles right now." },
      { status: 500 }
    );
  }
}
