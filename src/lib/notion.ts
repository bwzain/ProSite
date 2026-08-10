export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceUrl?: string;
  category: string;
  date: string;
}

const notionApiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

// Fallback sample posts if Notion DB is empty or during initial setup
export const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: "sample-1",
    title: "Demystifying Generative AI for Everyday Creators",
    description: "How practical prompt engineering and machine learning tools can transform daily content production workflows without needing a CS degree.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    sourceUrl: "https://www.amazon.com/dp/B0FG18QJWF",
    category: "AI",
    date: "2026-08-01",
  },
  {
    id: "sample-2",
    title: "30 Years in Enterprise IT: From Mainframes to Cloud Automation",
    description: "Reflections on 3 decades architecting mission-critical workflows, SAP integrations, and AWS infrastructure for global organizations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    sourceUrl: "https://www.linkedin.com/in/bwzain",
    category: "Enterprise IT",
    date: "2026-07-20",
  },
  {
    id: "sample-3",
    title: "Soundscapes of Anaheim: Synthwave & Lofi Studio Notes",
    description: "Inside the Zainy Beats studio: designing atmospheric textures, analog synth patches, and chill lofi grooves in Ableton Live.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    sourceUrl: "https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26",
    category: "Music",
    date: "2026-07-10",
  },
  {
    id: "sample-4",
    title: "Hidden Gems & Cultural Expeditions: I Wish You Were Here",
    description: "Authentic travel guides, cultural insights, and hidden gems documented across global journeys for curious explorers.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    sourceUrl: "https://i-wish-you-were-here.com",
    category: "Travel",
    date: "2026-06-25",
  },
];

export async function getNotionBlogPosts(): Promise<BlogPost[]> {
  if (!notionApiKey || !databaseId) {
    console.warn("Notion API Key or Database ID missing. Using fallback blog data.");
    return FALLBACK_BLOGS;
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            timestamp: "created_time",
            direction: "descending",
          },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Notion API returned HTTP ${res.status}:`, errText);
      return FALLBACK_BLOGS;
    }

    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      return FALLBACK_BLOGS;
    }

    const posts: BlogPost[] = results.map((page: any) => {
      const props = page.properties || {};

      // 1. Title Extraction
      let title = "Untitled Post";
      for (const key of Object.keys(props)) {
        if (props[key].type === "title" && props[key].title?.length > 0) {
          title = props[key].title.map((t: any) => t.plain_text).join("");
          break;
        }
      }

      // 2. Description Extraction
      let description = "";
      const descPropKey = Object.keys(props).find(
        (k) => k.toLowerCase().includes("desc") || k.toLowerCase().includes("summary") || k.toLowerCase().includes("excerpt")
      );
      if (descPropKey && props[descPropKey]) {
        const prop = props[descPropKey];
        if (prop.type === "rich_text" && prop.rich_text?.length > 0) {
          description = prop.rich_text.map((t: any) => t.plain_text).join("");
        }
      }
      if (!description) {
        // Fallback to any rich_text field
        for (const key of Object.keys(props)) {
          if (props[key].type === "rich_text" && props[key].rich_text?.length > 0) {
            description = props[key].rich_text.map((t: any) => t.plain_text).join("");
            break;
          }
        }
      }

      // 3. Image Extraction
      let image = "";
      const imagePropKey = Object.keys(props).find(
        (k) => k.toLowerCase().includes("image") || k.toLowerCase().includes("cover") || k.toLowerCase().includes("photo") || k.toLowerCase().includes("thumbnail")
      );
      if (imagePropKey && props[imagePropKey]) {
        const prop = props[imagePropKey];
        if (prop.type === "files" && prop.files?.length > 0) {
          image = prop.files[0]?.file?.url || prop.files[0]?.external?.url || "";
        } else if (prop.type === "url" && prop.url) {
          image = prop.url;
        } else if (prop.type === "rich_text" && prop.rich_text?.length > 0) {
          image = prop.rich_text.map((t: any) => t.plain_text).join("");
        }
      }
      if (!image && page.cover) {
        image = page.cover?.file?.url || page.cover?.external?.url || "";
      }
      if (!image) {
        image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
      }

      // 4. Source URL Extraction
      let sourceUrl = "";
      const urlPropKey = Object.keys(props).find(
        (k) => k.toLowerCase().includes("source") || k.toLowerCase().includes("link") || k.toLowerCase().includes("url")
      );
      if (urlPropKey && props[urlPropKey]) {
        const prop = props[urlPropKey];
        if (prop.type === "url" && prop.url) {
          sourceUrl = prop.url;
        } else if (prop.type === "rich_text" && prop.rich_text?.length > 0) {
          sourceUrl = prop.rich_text.map((t: any) => t.plain_text).join("");
        }
      }

      // 5. Category Extraction
      let category = "General";
      const catPropKey = Object.keys(props).find(
        (k) => k.toLowerCase().includes("cat") || k.toLowerCase().includes("tag") || k.toLowerCase().includes("topic")
      );
      if (catPropKey && props[catPropKey]) {
        const prop = props[catPropKey];
        if (prop.type === "select" && prop.select?.name) {
          category = prop.select.name;
        } else if (prop.type === "multi_select" && prop.multi_select?.length > 0) {
          category = prop.multi_select.map((m: any) => m.name).join(", ");
        } else if (prop.type === "rich_text" && prop.rich_text?.length > 0) {
          category = prop.rich_text.map((t: any) => t.plain_text).join("");
        }
      }

      // 6. Date Extraction
      let date = page.created_time ? page.created_time.split("T")[0] : new Date().toISOString().split("T")[0];
      const datePropKey = Object.keys(props).find((k) => k.toLowerCase().includes("date"));
      if (datePropKey && props[datePropKey]) {
        const prop = props[datePropKey];
        if (prop.type === "date" && prop.date?.start) {
          date = prop.date.start;
        }
      }

      return {
        id: page.id,
        title,
        description: description || "No description provided.",
        image,
        sourceUrl: sourceUrl || undefined,
        category,
        date,
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching Notion blog posts:", error);
    return FALLBACK_BLOGS;
  }
}
