export type NotionRichText = {
  plain_text?: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  child_page?: { title?: string };
  paragraph?: { rich_text?: NotionRichText[] };
  heading_1?: { rich_text?: NotionRichText[] };
  heading_2?: { rich_text?: NotionRichText[] };
  heading_3?: { rich_text?: NotionRichText[] };
  bulleted_list_item?: { rich_text?: NotionRichText[] };
  numbered_list_item?: { rich_text?: NotionRichText[] };
  quote?: { rich_text?: NotionRichText[] };
  callout?: { rich_text?: NotionRichText[]; icon?: { type?: string; emoji?: string } };
  image?: {
    type?: "external" | "file";
    external?: { url?: string };
    file?: { url?: string };
    caption?: NotionRichText[];
  };
  divider?: Record<string, never>;
};

export type NotionPage = {
  id: string;
  cover?: {
    type?: "external" | "file";
    external?: { url?: string };
    file?: { url?: string };
  } | null;
  properties?: Record<
    string,
    {
      type?: string;
      title?: NotionRichText[];
    }
  >;
};

export type RenderBlock = {
  id: string;
  type: string;
  richText?: NotionRichText[];
  imageUrl?: string;
  imageCaption?: string;
  calloutIcon?: string;
  childPageTitle?: string;
};

export type CaseStudyTile = {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  imageUrl: string | null;
};

export type CaseStudyHub = {
  title: string;
  executiveSummary: RenderBlock[];
  tiles: CaseStudyTile[];
  fromNotion: boolean;
  notionError?: string;
  /** Present when falling back to seed — helps diagnose Vercel env issues. */
  configStatus?: {
    hasApiKey: boolean;
    hasHubPageId: boolean;
    hubPageIdPreview: string | null;
  };
};

export type CaseStudyDetail = {
  id: string;
  slug: string;
  title: string;
  blocks: RenderBlock[];
  showDashboardCta: boolean;
  fromNotion: boolean;
};
