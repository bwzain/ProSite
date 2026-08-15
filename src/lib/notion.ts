import { toHttpsUrl } from "@/lib/safeUrl";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceUrl?: string;
  category: string;
  date: string;
}

const NOTION_VERSION = "2022-06-28";
const PAGE_SIZE = 100;

type NotionRichText = { plain_text?: string };

type NotionFile = {
  type?: string;
  file?: { url?: string };
  external?: { url?: string };
};

type NotionProperty = {
  type?: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  date?: { start?: string | null } | null;
  select?: { name?: string } | null;
  url?: string | null;
  files?: NotionFile[];
};

type NotionPage = {
  id: string;
  properties?: Record<string, NotionProperty>;
};

type NotionQueryResponse = {
  results?: NotionPage[];
  has_more?: boolean;
  next_cursor?: string | null;
};

function richTextPlain(richText: NotionRichText[] | undefined): string {
  if (!richText?.length) return "";
  return richText.map((t) => t.plain_text ?? "").join("");
}

function featuredImageUrl(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "files" || !prop.files?.length) return "";
  const first = prop.files[0];
  return first.file?.url || first.external?.url || "";
}

function mapPageToBlogPost(page: NotionPage): BlogPost {
  const props = page.properties ?? {};
  const titleProp = props.Title;
  const dateProp = props.Date;
  const categoryProp = props.Category;
  const descriptionProp = props.Description;
  const sourceProp = props["Source Link"];
  const imageProp = props["Featured Image"];

  const title =
    titleProp?.type === "title" ? richTextPlain(titleProp.title) : "";
  const date =
    dateProp?.type === "date" ? dateProp.date?.start ?? "" : "";
  const category =
    categoryProp?.type === "select" ? categoryProp.select?.name ?? "" : "";
  const description =
    descriptionProp?.type === "rich_text"
      ? richTextPlain(descriptionProp.rich_text)
      : "";
  const sourceUrlRaw =
    sourceProp?.type === "url" && sourceProp.url ? sourceProp.url : undefined;
  const sourceUrl = sourceUrlRaw ? toHttpsUrl(sourceUrlRaw) || undefined : undefined;

  return {
    id: page.id,
    title: title || "Untitled Post",
    description,
    image: toHttpsUrl(featuredImageUrl(imageProp)),
    sourceUrl,
    category: category || "General",
    date,
  };
}

async function queryPublishedPages(
  apiKey: string,
  databaseId: string,
  startCursor?: string,
): Promise<NotionQueryResponse> {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "Published" },
        },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: PAGE_SIZE,
        ...(startCursor ? { start_cursor: startCursor } : {}),
      }),
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Notion API returned HTTP ${res.status}: ${errText}`);
  }

  return res.json();
}

export async function getNotionBlogPosts(): Promise<BlogPost[]> {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    console.warn("Notion API Key or Database ID missing. Returning no public posts.");
    return [];
  }

  try {
    const posts: BlogPost[] = [];
    let cursor: string | undefined;

    do {
      const data = await queryPublishedPages(notionApiKey, databaseId, cursor);
      for (const page of data.results ?? []) {
        if (page.id && page.properties) {
          posts.push(mapPageToBlogPost(page));
        }
      }
      cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
    } while (cursor);

    return posts;
  } catch (error) {
    console.error("Error fetching Notion blog posts:", error);
    return [];
  }
}
