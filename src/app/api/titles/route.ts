import { NextResponse } from "next/server";
import { loadTitles } from "@/lib/catalog/loadTitles";
import { toClientPayload } from "@/lib/catalog/toClient";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = toClientPayload(await loadTitles());
  return NextResponse.json(payload);
}
