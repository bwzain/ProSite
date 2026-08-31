import type { NotionBlock, NotionPage, NotionRichText, RenderBlock } from "./types";
import { notionFetch } from "./client";

export function richTextPlain(richText: NotionRichText[] | undefined): string {
  if (!richText?.length) return "";
  return richText.map((t) => t.plain_text ?? "").join("");
}

export function coverImageUrl(page: NotionPage): string | null {
  const cover = page.cover;
  if (!cover) return null;
  if (cover.type === "external") return cover.external?.url?.trim() || null;
  if (cover.type === "file") return cover.file?.url?.trim() || null;
  return cover.external?.url?.trim() || cover.file?.url?.trim() || null;
}

export function imageBlockUrl(block: NotionBlock): string | null {
  if (block.type !== "image" || !block.image) return null;
  if (block.image.type === "external") return block.image.external?.url?.trim() || null;
  if (block.image.type === "file") return block.image.file?.url?.trim() || null;
  return block.image.external?.url?.trim() || block.image.file?.url?.trim() || null;
}

export function firstImageInBlocks(blocks: NotionBlock[]): string | null {
  for (const block of blocks) {
    const url = imageBlockUrl(block);
    if (url) return url;
  }
  return null;
}

export async function fetchAllBlocks(
  blockId: string,
  apiKey: string,
): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const query = cursor ? `?start_cursor=${encodeURIComponent(cursor)}` : "";
    const data = await notionFetch<{
      results?: NotionBlock[];
      has_more?: boolean;
      next_cursor?: string | null;
    }>(`/blocks/${blockId}/children${query}`, apiKey);

    for (const block of data.results ?? []) {
      blocks.push(block);
    }

    cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

export function mapBlockToRender(block: NotionBlock): RenderBlock | null {
  const base = { id: block.id, type: block.type };

  switch (block.type) {
    case "paragraph":
      return { ...base, richText: block.paragraph?.rich_text };
    case "heading_1":
      return { ...base, richText: block.heading_1?.rich_text };
    case "heading_2":
      return { ...base, richText: block.heading_2?.rich_text };
    case "heading_3":
      return { ...base, richText: block.heading_3?.rich_text };
    case "bulleted_list_item":
      return { ...base, richText: block.bulleted_list_item?.rich_text };
    case "numbered_list_item":
      return { ...base, richText: block.numbered_list_item?.rich_text };
    case "quote":
      return { ...base, richText: block.quote?.rich_text };
    case "callout":
      return {
        ...base,
        richText: block.callout?.rich_text,
        calloutIcon: block.callout?.icon?.emoji,
      };
    case "image": {
      const imageUrl = imageBlockUrl(block);
      return {
        ...base,
        imageUrl: imageUrl ?? undefined,
        imageCaption: richTextPlain(block.image?.caption),
      };
    }
    case "divider":
      return base;
    case "child_page":
      return {
        ...base,
        childPageTitle: block.child_page?.title,
      };
    default:
      return null;
  }
}

export function blocksToRender(blocks: NotionBlock[]): RenderBlock[] {
  return blocks
    .map(mapBlockToRender)
    .filter((b): b is RenderBlock => b !== null);
}

export function firstParagraphTeaser(blocks: NotionBlock[]): string {
  for (const block of blocks) {
    if (block.type === "paragraph") {
      const text = richTextPlain(block.paragraph?.rich_text);
      if (text.trim()) return text.trim();
    }
  }
  return "";
}

export function pageTitle(page: NotionPage): string {
  const props = page.properties ?? {};
  for (const key of Object.keys(props)) {
    const prop = props[key];
    if (prop?.type === "title") {
      const text = richTextPlain(prop.title);
      if (text.trim()) return text.trim();
    }
  }
  return "Case Studies";
}

export function extractFirstImage(
  page: NotionPage,
  blocks: NotionBlock[],
): string | null {
  return coverImageUrl(page) ?? firstImageInBlocks(blocks);
}
