import { NextResponse } from "next/server";
import { getNotionBlogPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getNotionBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blogs from Notion" },
      { status: 500 }
    );
  }
}
