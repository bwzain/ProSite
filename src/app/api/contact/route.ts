import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PROFILE_DATA } from "@/data/profile";
import { checkContactRateLimit, getClientIp, rejectOversizedJson } from "@/lib/chatRateLimit";

export const dynamic = "force-dynamic";

const MAX_NAME_CHARS = 200;
const MAX_EMAIL_CHARS = 254;
const MAX_MESSAGE_CHARS = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FROM = "William Zain <onboarding@resend.dev>";

function stripHeaderUnsafe(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

export async function POST(req: Request) {
  try {
    const oversized = rejectOversizedJson(req);
    if (oversized) return oversized;

    const ip = getClientIp(req);
    const rate = await checkContactRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error("Contact email is not configured (RESEND_API_KEY).");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please email or message on LinkedIn instead." },
        { status: 503 }
      );
    }

    let body: { name?: unknown; email?: unknown; message?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? stripHeaderUnsafe(body.name) : "";
    const email = typeof body.email === "string" ? stripHeaderUnsafe(body.email) : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (
      !name ||
      name.length > MAX_NAME_CHARS ||
      !email ||
      email.length > MAX_EMAIL_CHARS ||
      !EMAIL_RE.test(email) ||
      !message ||
      message.length > MAX_MESSAGE_CHARS
    ) {
      return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO?.trim() || PROFILE_DATA.email;
    const from = process.env.CONTACT_FROM?.trim() || DEFAULT_FROM;
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Website inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Contact form send failed:", error);
      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again or email directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email directly." },
      { status: 500 }
    );
  }
}
