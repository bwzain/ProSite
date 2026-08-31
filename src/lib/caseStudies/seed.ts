import type { CaseStudyDetail, CaseStudyHub, RenderBlock } from "./types";
import { isDiscoveryCaseStudy } from "./dashboardLinks";

const SUMMARY_BLOCKS: RenderBlock[] = [
  {
    id: "seed-h1",
    type: "heading_2",
    richText: [{ plain_text: "Executive summary" }],
  },
  {
    id: "seed-p1",
    type: "paragraph",
    richText: [
      {
        plain_text:
          "Strategic solution consulting across enterprise IT, data discovery, and digital experience — with measurable outcomes in catalog intelligence, workflow automation, and stakeholder-ready storytelling.",
      },
    ],
  },
  {
    id: "seed-p2",
    type: "paragraph",
    richText: [
      {
        plain_text:
          "Connect Notion to replace this preview: share the hub page with your integration and set NOTION_API_KEY plus NOTION_CASE_STUDIES_HUB_PAGE_ID in .env.local.",
      },
    ],
  },
];

const NETFLIX_BLOCKS: RenderBlock[] = [
  {
    id: "seed-n-h1",
    type: "heading_2",
    richText: [{ plain_text: "Content discovery at scale" }],
  },
  {
    id: "seed-n-p1",
    type: "paragraph",
    richText: [
      {
        plain_text:
          "An interactive Netflix catalog dashboard for acquisitions and programming teams — regional heatmaps, genre yield, catalog matrix, and a filterable title leaderboard backed by live sheet data.",
      },
    ],
  },
  {
    id: "seed-n-p2",
    type: "paragraph",
    richText: [
      {
        plain_text:
          "Open the live dashboard to explore geography, popularity tiers, binge-fit scoring, and export shortlists for stakeholder reviews.",
      },
    ],
  },
];

export function getSeedHub(): CaseStudyHub {
  return {
    title: "William Zain — Strategic Solution Consultant",
    executiveSummary: SUMMARY_BLOCKS,
    tiles: [
      {
        id: "seed-1",
        slug: "netflix-content-discovery",
        title: "Netflix Content Discovery Dashboard",
        teaser:
          "Interactive catalog intelligence — regional maps, genre yield, scatter matrix, and exportable shortlists.",
        imageUrl: null,
      },
      {
        id: "seed-2",
        slug: "enterprise-integration",
        title: "Enterprise Integration & Automation",
        teaser:
          "Workflow design and integration patterns that reduce manual handoffs across IT and business teams.",
        imageUrl: null,
      },
      {
        id: "seed-3",
        slug: "stakeholder-storytelling",
        title: "Stakeholder Storytelling & Analytics",
        teaser:
          "Executive-ready narratives backed by data visuals for portfolio reviews and investment decisions.",
        imageUrl: null,
      },
    ],
    fromNotion: false,
  };
}

export function getSeedDetail(slug: string): CaseStudyDetail | null {
  const hub = getSeedHub();
  const tile = hub.tiles.find((t) => t.slug === slug);
  if (!tile) return null;

  const blocks: RenderBlock[] =
    slug === "netflix-content-discovery"
      ? NETFLIX_BLOCKS
      : [
          {
            id: "seed-d-p1",
            type: "paragraph",
            richText: [
              {
                plain_text: `${tile.teaser} Full case study content will appear here once the Notion sub-page is connected.`,
              },
            ],
          },
        ];

  return {
    id: tile.id,
    slug: tile.slug,
    title: tile.title,
    blocks,
    showDashboardCta: isDiscoveryCaseStudy(slug),
    fromNotion: false,
  };
}
