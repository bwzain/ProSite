const NOTION_VERSION = "2022-06-28";

type NotionFetchOptions = {
  revalidate?: number;
};

export class NotionApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "NotionApiError";
    this.status = status;
    this.code = code;
  }
}

function parseNotionError(status: number, errText: string, path: string): NotionApiError {
  try {
    const body = JSON.parse(errText) as { code?: string; message?: string };
    return new NotionApiError(
      body.message ?? `Notion API ${path} returned HTTP ${status}`,
      status,
      body.code,
    );
  } catch {
    return new NotionApiError(`Notion API ${path} returned HTTP ${status}: ${errText}`, status);
  }
}

export async function notionFetch<T>(
  path: string,
  apiKey: string,
  options: NotionFetchOptions = {},
): Promise<T> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
    },
    next: { revalidate: options.revalidate ?? 300 },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw parseNotionError(res.status, errText, path);
  }

  return res.json() as Promise<T>;
}

/** Non-throwing fetch — use when a 404 should fall back to seed content. */
export async function notionFetchResult<T>(
  path: string,
  apiKey: string,
  options: NotionFetchOptions = {},
): Promise<{ ok: true; data: T } | { ok: false; error: NotionApiError }> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
    },
    next: { revalidate: options.revalidate ?? 300 },
  });

  if (!res.ok) {
    const errText = await res.text();
    return { ok: false, error: parseNotionError(res.status, errText, path) };
  }

  return { ok: true, data: (await res.json()) as T };
}

export function isNotionAccessError(error: NotionApiError): boolean {
  return error.status === 404 && error.code === "object_not_found";
}

export function getNotionConfig(): { apiKey: string; hubPageId: string } | null {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const hubPageId = process.env.NOTION_CASE_STUDIES_HUB_PAGE_ID?.trim();
  if (!apiKey || !hubPageId) return null;
  return { apiKey, hubPageId };
}
