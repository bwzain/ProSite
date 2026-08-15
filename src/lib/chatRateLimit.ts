import { NextResponse } from "next/server";

/**
 * Rate limiter for public APIs.
 * Uses in-memory Maps (single Node process). Optional Upstash Redis REST
 * (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) shares counters across
 * serverless instances when those env vars are set.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

export const CHAT_MINUTE_LIMIT = 10;
export const CHAT_DAILY_LIMIT = 40;
export const PUBLIC_GET_MINUTE_LIMIT = 30;
export const MAX_JSON_BODY_BYTES = 64 * 1024;

function pruneExpired(now: number) {
  if (memoryBuckets.size < 400) return;
  for (const [key, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(key);
  }
}

function memoryConsume(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  pruneExpired(now);
  const existing = memoryBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

async function redisIncrWithTtl(key: string, limit: number, ttlSec: number): Promise<{ allowed: boolean; retryAfterSec: number } | null> {
  const base = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token) return null;

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(ttlSec), "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    const ttl = Number(data?.[2]?.result ?? ttlSec);
    if (count > limit) {
      return { allowed: false, retryAfterSec: Math.max(1, ttl > 0 ? ttl : ttlSec) };
    }
    return { allowed: true, retryAfterSec: 0 };
  } catch {
    return null;
  }
}

async function consume(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const redis = await redisIncrWithTtl(key, limit, Math.ceil(windowMs / 1000));
  if (redis) return redis;
  return memoryConsume(key, limit, windowMs);
}

export function getClientIp(req: Request): string {
  const vercel = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cf = req.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  // Only trust X-Forwarded-For when a reverse proxy is known to overwrite it.
  if (process.env.TRUST_X_FORWARDED_FOR === "true") {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length) return parts[parts.length - 1];
    }
  }

  return "unknown";
}

export function rejectOversizedJson(req: Request, maxBytes = MAX_JSON_BODY_BYTES): NextResponse | null {
  const raw = req.headers.get("content-length");
  if (raw == null) return null;
  const length = Number(raw);
  if (!Number.isFinite(length) || length < 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (length > maxBytes) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }
  return null;
}

export async function checkChatRateLimit(ip: string): Promise<
  { allowed: true } | { allowed: false; retryAfterSec: number }
> {
  const minute = await consume(`chat:min:${ip}`, CHAT_MINUTE_LIMIT, MINUTE_MS);
  if (!minute.allowed) return { allowed: false, retryAfterSec: minute.retryAfterSec };

  const day = await consume(`chat:day:${ip}`, CHAT_DAILY_LIMIT, DAY_MS);
  if (!day.allowed) return { allowed: false, retryAfterSec: day.retryAfterSec };

  return { allowed: true };
}

export async function checkPublicGetRateLimit(ip: string, route: "blogs" | "rss"): Promise<
  { allowed: true } | { allowed: false; retryAfterSec: number }
> {
  const result = await consume(`get:${route}:${ip}`, PUBLIC_GET_MINUTE_LIMIT, MINUTE_MS);
  if (!result.allowed) return { allowed: false, retryAfterSec: result.retryAfterSec };
  return { allowed: true };
}
