import { NextResponse } from "next/server";
import { getNotionBlogPosts } from "@/lib/notion";
import { blogCardImageSrc, BLOG_PLACEHOLDER_IMAGE } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!id) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const posts = await getNotionBlogPosts();
    const post = posts.find((item) => item.id === id);
    const src = post
      ? blogCardImageSrc(post.image, post.sourceUrl)
      : BLOG_PLACEHOLDER_IMAGE;

    return new NextResponse(null, {
      status: 307,
      headers: {
        Location: src,
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
