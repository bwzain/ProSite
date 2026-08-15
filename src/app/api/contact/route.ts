import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PROFILE_DATA } from "@/data/profile";
import { checkContactRateLimit, getClientIp, rejectOversizedJson } from "@/lib/chatRateLimit";

export const dynamic = "force-dynamic";

const MAX_NAME_CHARS = 200;
const MAX_EMAIL_CHARS = 254;
const MAX_MESSAGE_CHARS = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHeaderUnsafe(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

function smtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const port = portRaw ? Number(portRaw) : NaN;

  if (!host || !user || !pass || !Number.isFinite(port) || port <= 0) {
    return null;
  }

  return { host, port, user, pass };
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

    const smtp = smtpConfig();
    if (!smtp) {
      console.error("Contact SMTP is not configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).");
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

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    await transporter.sendMail({
      from: `"Website contact" <${smtp.user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Website inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email directly." },
      { status: 500 }
    );
  }
}
