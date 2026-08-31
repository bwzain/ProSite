import {
  blocksToRender,
  extractFirstImage,
  fetchAllBlocks,
  firstParagraphTeaser,
  pageTitle,
} from "./blocks";
import { getNotionConfig, getNotionConfigStatus, isNotionAccessError, notionFetch, notionFetchResult, NotionApiError } from "./client";
import { getSeedDetail, getSeedHub } from "./seed";
import { isDiscoveryCaseStudy } from "./dashboardLinks";
import { slugifyTitle } from "./slug";
import type {
  CaseStudyDetail,
  CaseStudyHub,
  CaseStudyTile,
  NotionBlock,
  NotionPage,
} from "./types";

async function fetchPage(pageId: string, apiKey: string): Promise<NotionPage> {
  return notionFetch<NotionPage>(`/pages/${pageId}`, apiKey);
}

function previewHub(error?: NotionApiError, notionError?: string): CaseStudyHub {
  if (error) {
    if (isNotionAccessError(error)) {
      console.warn(
        "Case studies hub is not shared with ZainNotionAPI — serving preview seed.",
      );
    } else {
      console.warn("Case studies Notion fetch failed — serving preview seed.", error.message);
    }
  }
  return {
    ...getSeedHub(),
    notionError: notionError ?? error?.message,
    configStatus: getNotionConfigStatus(),
  };
}

async function buildTile(
  childBlock: NotionBlock,
  apiKey: string,
): Promise<CaseStudyTile | null> {
  if (childBlock.type !== "child_page") return null;

  const title = childBlock.child_page?.title?.trim() || "Untitled case study";
  const slug = slugifyTitle(title);
  const pageId = childBlock.id;

  const [page, blocks] = await Promise.all([
    fetchPage(pageId, apiKey),
    fetchAllBlocks(pageId, apiKey),
  ]);

  const teaser = firstParagraphTeaser(blocks);
  const imageUrl = extractFirstImage(page, blocks);

  return {
    id: pageId,
    slug,
    title,
    teaser,
    imageUrl,
  };
}

export async function getCaseStudiesHub(): Promise<CaseStudyHub> {
  const config = getNotionConfig();
  if (!config) {
    const status = getNotionConfigStatus();
    console.warn("Notion config missing — serving case studies seed data.", status);
    const missing = [!status.hasApiKey ? "NOTION_API_KEY" : null].filter(Boolean).join(" and ");
    return previewHub(
      undefined,
      missing
        ? `Missing ${missing} in the server environment. Add it in Vercel and redeploy.`
        : "Notion configuration incomplete. Add NOTION_API_KEY in Vercel and redeploy.",
    );
  }

  const { apiKey, hubPageId } = config;

  const pageResult = await notionFetchResult<NotionPage>(`/pages/${hubPageId}`, apiKey);
  if (!pageResult.ok) {
    return previewHub(pageResult.error);
  }

  try {
    const hubPage = pageResult.data;
    const hubBlocks = await fetchAllBlocks(hubPageId, apiKey);

    const childBlocks = hubBlocks.filter((b) => b.type === "child_page");
    const summaryBlocks = hubBlocks.filter((b) => b.type !== "child_page");

    const tiles = (
      await Promise.all(childBlocks.map((block) => buildTile(block, apiKey)))
    ).filter((t): t is CaseStudyTile => t !== null);

    return {
      title: pageTitle(hubPage),
      executiveSummary: blocksToRender(summaryBlocks),
      tiles,
      fromNotion: true,
    };
  } catch (error) {
    if (error instanceof NotionApiError) {
      return previewHub(error);
    }
    console.warn("Case studies Notion fetch failed — serving preview seed.", error);
    const message = error instanceof Error ? error.message : "Unknown Notion error";
    return previewHub(undefined, message);
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const hub = await getCaseStudiesHub();
  return hub.tiles.map((t) => t.slug);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const config = getNotionConfig();

  if (!config) {
    return getSeedDetail(slug);
  }

  const { apiKey, hubPageId } = config;

  try {
    const hubBlocks = await fetchAllBlocks(hubPageId, apiKey);
    const childBlocks = hubBlocks.filter((b) => b.type === "child_page");

    const match = childBlocks.find((block) => {
      const title = block.child_page?.title?.trim() || "";
      return slugifyTitle(title) === slug;
    });

    if (!match) {
      return getSeedDetail(slug);
    }

    const title = match.child_page?.title?.trim() || "Untitled case study";
    const pageId = match.id;
    const blocks = await fetchAllBlocks(pageId, apiKey);

    return {
      id: pageId,
      slug,
      title,
      blocks: blocksToRender(blocks),
      showDashboardCta: isDiscoveryCaseStudy(slug),
      fromNotion: true,
    };
  } catch (error) {
    console.warn(`Case study "${slug}" Notion fetch failed — using preview seed.`, error);
    return getSeedDetail(slug);
  }
}
