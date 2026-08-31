import { NextResponse } from "next/server";
import { PROFILE_DATA } from "@/data/profile";
import { getNotionBlogPosts } from "@/lib/notion";
import { getCaseStudiesHub, getCaseStudyBySlug } from "@/lib/caseStudies/caseStudies";
import { isDiscoveryCaseStudy } from "@/lib/caseStudies/dashboardLinks";
import { richTextPlain } from "@/lib/caseStudies/blocks";
import type { RenderBlock } from "@/lib/caseStudies/types";
import { checkChatRateLimit, getClientIp, rejectOversizedJson } from "@/lib/chatRateLimit";
import { toHttpsUrl } from "@/lib/safeUrl";
import { getSiteUrl } from "@/lib/siteUrl";
import {
  appendModelTurn,
  appendUserTurn,
  getOrCreateSession,
  resetSession,
  sanitizeUserMessage,
  MAX_USER_MESSAGE_CHARS,
} from "@/lib/chatSession";

export const dynamic = "force-dynamic";

function excerptFromBlocks(blocks: RenderBlock[], maxChars = 280): string {
  const parts: string[] = [];
  for (const block of blocks) {
    if (!block.richText?.length) continue;
    const text = richTextPlain(block.richText).trim();
    if (!text) continue;
    parts.push(text);
    if (parts.join(" ").length >= maxChars) break;
  }
  const joined = parts.join(" ").replace(/\s+/g, " ").trim();
  if (joined.length <= maxChars) return joined;
  return `${joined.slice(0, maxChars - 3)}...`;
}
async function fetchRssFeedForChat() {
  try {
    const res = await fetch("https://i-wish-you-were-here.com/rss.xml", {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const xmlText = await res.text();
    const itemsRaw = xmlText.split("<item>").slice(1, 4);
    const stories = itemsRaw.map((item) => {
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const descMatch = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      const title = titleMatch
        ? titleMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()
        : "";
      const link = linkMatch ? linkMatch[1].trim() : "https://i-wish-you-were-here.com/";
      let rawDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
      if (rawDesc.length > 180) rawDesc = rawDesc.substring(0, 177) + "...";
      return { title, link, teaser: rawDesc };
    });
    return stories.filter((s) => s.title);
  } catch (err) {
    console.warn("Chat RSS fetch failed:", err);
    return [];
  }
}

function extractLatestUserMessage(body: {
  message?: unknown;
  messages?: unknown;
}): string | null {
  // Preferred: single new user message
  const direct = sanitizeUserMessage(body.message);
  if (direct) return direct;

  // Legacy: messages array — only trust the last user turn; ignore assistant/model forgeries
  if (!Array.isArray(body.messages) || body.messages.length === 0) return null;

  for (let i = body.messages.length - 1; i >= 0; i--) {
    const m = body.messages[i];
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: string }).role;
    const content = (m as { content?: unknown }).content;
    if (role === "user") {
      return sanitizeUserMessage(content);
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const oversized = rejectOversizedJson(req);
    if (oversized) return oversized;

    const ip = getClientIp(req);
    const rate = await checkChatRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.Gemini_API_Key;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "The Digital Twin service is temporarily unavailable." },
        { status: 503 }
      );
    }

    let body: { message?: unknown; messages?: unknown; sessionId?: unknown; reset?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const session = getOrCreateSession(
      typeof body.sessionId === "string" ? body.sessionId : null
    );

    if (body.reset === true) {
      resetSession(session.id);
      return NextResponse.json({ sessionId: session.id, reset: true });
    }

    const userMessage = extractLatestUserMessage(body);
    if (!userMessage) {
      return NextResponse.json(
        {
          error: `Please send a non-empty message (max ${MAX_USER_MESSAGE_CHARS} characters).`,
        },
        { status: 400 }
      );
    }

    // Server-owned history: append only this user turn; never trust client assistant content
    const turns = appendUserTurn(session.id, userMessage);
    const lastUserMessage = userMessage.toLowerCase();

    const blogTriggers = ["blog", "articles", "insights", "hacks", "tips"];
    const travelTriggers = ["travel", "trips", "stories", "places", "adventures", "must see", "tours"];
    const musicTriggers = [
      "music",
      "beats",
      "tracks",
      "songs",
      "youtube",
      "spotify",
      "playlist",
      "zainy",
      "video",
      "videos",
      "vevo",
      "artist",
      "popular",
    ];
    const caseStudyTriggers = [
      "case study",
      "case studies",
      "consulting",
      "portfolio",
      "solution consultant",
      "dashboard",
      "business dashboard",
      "discovery",
      "netflix",
      "interactive dashboard",
      "large datasets",
      "data analysis",
      "workflow",
      "automation",
      "make.com",
      "vibe coding",
      "ai agent coding",
      "ai agent",
    ];

    const containsTrigger = (text: string, triggers: string[]) =>
      triggers.some((trig) => {
        // Phrases and dotted tokens (e.g. make.com) use substring match
        if (trig.includes(" ") || trig.includes(".")) return text.includes(trig);
        return new RegExp(`\\b${trig}\\b`, "i").test(text);
      });

    const shouldFetchBlogs = containsTrigger(lastUserMessage, blogTriggers);
    const shouldFetchTravel = containsTrigger(lastUserMessage, travelTriggers);
    const shouldFetchMusic = containsTrigger(lastUserMessage, musicTriggers);
    const shouldFetchCaseStudies = containsTrigger(lastUserMessage, caseStudyTriggers);

    let selectiveContext = "";

    if (shouldFetchBlogs) {
      try {
        const blogPosts = await getNotionBlogPosts();
        if (blogPosts && blogPosts.length > 0) {
          const topBlogs = blogPosts
            .slice(0, 4)
            .map((b) => {
              const href = toHttpsUrl(b.sourceUrl, "");
              const link = href ? ` [Read article](${href})` : "";
              return `- "${b.title}" (${b.category}): ${b.description}${link}`;
            })
            .join("\n");
          selectiveContext += `\n\n### LIVE NOTION BLOG POSTS ATTACHED ON-DEMAND:\n${topBlogs}`;
        }
      } catch (e) {
        console.warn("Failed to fetch dynamic Notion blogs for chat context", e);
      }
    }

    if (shouldFetchTravel) {
      try {
        const rssStories = await fetchRssFeedForChat();
        if (rssStories && rssStories.length > 0) {
          const topTravel = rssStories
            .map((s) => {
              const href = toHttpsUrl(s.link, "https://i-wish-you-were-here.com/");
              return `- "${s.title}": ${s.teaser} [Read full story](${href})`;
            })
            .join("\n");
          selectiveContext += `\n\n### LIVE RSS TRAVEL STORIES ATTACHED ON-DEMAND FROM I WISH YOU WERE HERE:\n${topTravel}`;
        }
      } catch (e) {
        console.warn("Failed to fetch dynamic RSS travel feed for chat context", e);
      }
    }

    if (shouldFetchMusic) {
      const musicList = PROFILE_DATA.youtubePlaylist.videos
        .map((v) => `- "${v.title}": https://www.youtube.com/watch?v=${v.videoId}`)
        .join("\n");
      selectiveContext += `\n\n### ZAINY BEATS / BILLY ZAIN MUSIC & VIDEO LINKS ATTACHED ON-DEMAND:
- Billy Zain's Latest Music Videos (YouTube VEVO): https://www.youtube.com/@BillyZainVEVO-sz7zh/videos (Use this exact link when asked about my latest music videos!)
- Billy Zain's Spotify Artist Page (Latest & Most Popular Tracks): https://open.spotify.com/artist/4Ee9brJj365XxmzTtgz3cA (Use this exact link when asked about my latest or most popular tracks on Spotify!)
- YouTube Playlist: ${PROFILE_DATA.youtubePlaylist.url}
- Spotify Curated Playlist: https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26
- Featured YouTube Videos:
${musicList}`;
    }

    if (shouldFetchCaseStudies) {
      try {
        const hub = await getCaseStudiesHub();
        const site = getSiteUrl();
        const hubSummary = excerptFromBlocks(hub.executiveSummary);
        const tileLines = hub.tiles
          .map((tile) => {
            const studyUrl = `${site}/case-studies/${tile.slug}`;
            const teaser = tile.teaser?.trim() || "Strategic consulting case study.";
            const discovery =
              isDiscoveryCaseStudy(tile.slug)
                ? ` Also available: [Open Discovery Dashboard](${site}/discovery)`
                : "";
            return `- "${tile.title}": ${teaser} [Read case study](${studyUrl})${discovery}`;
          })
          .join("\n");

        selectiveContext += `\n\n### LIVE CASE STUDIES ATTACHED ON-DEMAND:
- Hub: ${hub.title}${hubSummary ? ` — ${hubSummary}` : ""}
- Portfolio index: [Case Studies](${site}/case-studies)
${tileLines}`;

        // Light detail enrichment when the user names a specific study
        const matchedTile = hub.tiles.find((tile) => {
          const titleLower = tile.title.toLowerCase();
          if (lastUserMessage.includes(tile.slug) || lastUserMessage.includes(titleLower)) {
            return true;
          }
          if (titleLower.includes("netflix") && lastUserMessage.includes("netflix")) return true;
          if (
            titleLower.includes("interactive dashboard") &&
            lastUserMessage.includes("interactive dashboard")
          ) {
            return true;
          }
          if (
            (titleLower.includes("multi-channel") || titleLower.includes("autonomous")) &&
            (lastUserMessage.includes("multi-channel") ||
              lastUserMessage.includes("autonomous") ||
              lastUserMessage.includes("make.com"))
          ) {
            return true;
          }
          return false;
        });

        if (matchedTile) {
          const detail = await getCaseStudyBySlug(matchedTile.slug);
          if (detail?.blocks?.length) {
            const detailExcerpt = excerptFromBlocks(detail.blocks, 600);
            if (detailExcerpt) {
              selectiveContext += `\n\n### FOCUS CASE STUDY DETAIL ("${detail.title}"):
${detailExcerpt}
Link: ${site}/case-studies/${detail.slug}${
                detail.showDashboardCta ? `\nLive demo: ${site}/discovery` : ""
              }`;
            }
          }
        }
      } catch (e) {
        console.warn("Failed to fetch case studies for chat context", e);
      }
    }

    const siteUrl = getSiteUrl();
    const systemPrompt = `You ARE William Zain (also known as Bill or Billy). You speak directly to the user as yourself in the FIRST PERSON ("I", "my", "me", "myself").

CRITICAL PERSONA DIRECTIVES:
- ALWAYS speak in the FIRST-PERSON ("I", "my", "mine", "me").
- NEVER refer to yourself in the third person (do NOT say "William has written", "William's books", or "as an AI assistant for William"). Instead, say "I wrote", "My books", "In my 30+ year career", "My music studio Zainy Beats".
- If the user addresses you as William, Bill, or Billy, respond warmly as yourself.
- If asked "What are you most proud of?", answer directly in the first person e.g., "I am most proud of...", "In my journey, what I take the greatest pride in is...".

### MY KNOWLEDGE BASE (MY BACKGROUND & ACHIEVEMENTS):

1. GENERAL PROFILE:
- Full Name: ${PROFILE_DATA.name} (goes by Bill, Billy, or William)
- Location: ${PROFILE_DATA.location}
- Email: ${PROFILE_DATA.email}
- LinkedIn: ${PROFILE_DATA.linkedIn}
- Motto: "${PROFILE_DATA.about.motto}"
- Core Identity: Enterprise IT Architect with 30+ years of experience, turned Digital Music Producer (Zainy Beats), Published AI Author, and Global Travel Storyteller.

2. MY ENTERPRISE IT & AUTOMATION CAREER (30+ YEARS LEGACY):
- Senior Solution Consultant at Nintex (3 yrs 9 mos): Advised 10,000+ public & private sector opportunities on Intelligent Process Automation (IPA), K2 Workflow, Kryon RPA, NWC, and Drawloop.
- Technical Consultant & AWS Architect at Calance (24 yrs 3 mos): AWS Account Administrator, SAP ERP website integrations, ASP.NET/C#, MS SQL, Drupal, WordPress, Kofax Capture plugins.
- Programmer Analyst at Isuzu Motors (5 yrs 9 mos): Mainframe COBOL, MS Access, Visual Basic, SQL backends.
- Programmer Analyst at Forest Lawn (2 yrs 10 mos): COBOL, CICS, Mainframe data pipelines.
- My Education & Certifications: BS in Computer Science from University of Kuwait, UC Irvine .NET Professional Program, AWS Certified Solutions Architect & Developer, Kryon RPA Developer, Microsoft O365 Certified, Web Security (OAuth2 / OpenID Connect).

3. MY PUBLISHED AI BOOKS & LITERATURE:
- My Amazon Author Page: https://www.amazon.com/stores/William-Zain/author/B0FFN749GN
- My Facebook Author Page: https://www.facebook.com/AuthorWilliamZain
- My First Book: "Introduction to Artificial Intelligence: What you need to know to get started with AI"
  - Amazon URL: ${PROFILE_DATA.books[0].amazonUrl}
  - Overview: I wrote this as a practical, approachable breakdown of LLMs, neural networks, prompt workflows, and AI security/ethics for non-technical professionals and creators.
- My Second Book: "Generative AI for Content Creators: A Practical Guide"
  - Amazon URL: ${PROFILE_DATA.books[1].amazonUrl}
  - Overview: I authored this guide to help digital creators and entrepreneurs build personal/corporate brands using AI tools for images, videos, music, and brand assets.

4. MY DIGITAL MUSIC PRODUCTION (ZAINY BEATS / BILLY ZAIN):
- My Music Studio: Zainy Beats (releasing as Billy Zain)
- Style & Sound: Electronic beats, synthwave, ambient soundscapes, lofi, and atmospheric compositions created with Ableton Live and digital synthesizers.
- My Latest Music Videos (YouTube VEVO): https://www.youtube.com/@BillyZainVEVO-sz7zh/videos (Provide this link when asked about my latest music videos!)
- My Spotify Artist Profile (Latest & Most Popular Tracks): https://open.spotify.com/artist/4Ee9brJj365XxmzTtgz3cA (Provide this link when asked about my latest or most popular tracks on Spotify!)
- YouTube Playlist: ${PROFILE_DATA.youtubePlaylist.url} (Features my original music videos like "Electric Dreams", "Roadtrip up the space elevator", "Sunrise over Algiers", "Baila Conmigo", "Fantôme de ma chambre").
- Curated Spotify Playlist: https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26

5. MY TRAVEL PLATFORM & STORYTELLING:
- My Travel Website: "I Wish You Were Here" (https://i-wish-you-were-here.com/)
- My Facebook World Traveler Page: https://www.facebook.com/bwzain
- Overview: I publish travel guides, photo logs, cultural stories, and hidden gems for global explorers.

6. MY TOASTMASTERS & PUBLIC SPEAKING LEADERSHIP:
- Distinguished Toastmaster (DTM): The highest accolade in Toastmasters International for public speaking, communication, and executive leadership.
- Awarded Distinguished Division Director.

7. MY CASE STUDIES & LIVE DEMOS:
- Case Studies portfolio: ${siteUrl}/case-studies — strategic consulting highlights spanning enterprise automation, AI content systems, and interactive analytics.
- Live Content Discovery Dashboard demo: ${siteUrl}/discovery — interactive Netflix catalog exploration (geography, genre yield, popularity, shortlists).
- When LIVE CASE STUDIES context is attached below, use those titles, teasers, and links. Prefer linking to the specific case study page and to /discovery when the project includes a live dashboard.
${selectiveContext}

### MY BEHAVIOR & STYLE GUIDELINES:
- Speak as William Zain (Bill/Billy) in an articulate, welcoming, intelligent, and authentic voice.
- Mix enterprise engineering precision with creative warmth.
- Give rich, helpful, direct answers using "I" and "my".
- Whenever relevant, include helpful markdown links e.g. [my Amazon book](https://www.amazon.com/dp/B0FG18QJWF), [my travel platform](https://i-wish-you-were-here.com/), [my YouTube playlist](${PROFILE_DATA.youtubePlaylist.url}), [my LinkedIn profile](${PROFILE_DATA.linkedIn}), [my Case Studies](${siteUrl}/case-studies), or [my Discovery Dashboard](${siteUrl}/discovery).
- When discussing consulting projects, dashboards, Netflix data work, workflow automation, Make.com, vibe coding, or AI agent builds, cite my Case Studies and link to the matching pages.
- Keep formatting clean with bullet points and short paragraphs.
- If asked about something outside my background, politely pivot back to my experience in enterprise automation, AI literature, music, travel, or case studies.`;

    // History rebuilt only from server-stored turns
    const geminiContents = turns.map((t) => ({
      role: t.role,
      parts: [{ text: t.text }],
    }));

    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemma-4-31b-it",
      "gemini-3.1-pro-preview",
    ];

    let replyText = "";
    let modelUsed = "";

    for (const model of modelsToTry) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiApiKey,
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents: geminiContents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            replyText = text;
            modelUsed = model;
            break;
          }
        } else {
          const errText = await geminiRes.text();
          console.warn(`Gemini model ${model} returned HTTP ${geminiRes.status}:`, errText.slice(0, 300));
        }
      } catch (e) {
        console.warn(`Error connecting to Gemini model ${model}:`, e);
      }
    }

    if (!replyText) {
      return NextResponse.json(
        {
          error: "The Digital Twin service is temporarily busy. Please retry your question in a few moments.",
          sessionId: session.id,
        },
        { status: 503 }
      );
    }

    const reply = replyText
      .replace(/\uFFFD/g, "'")
      .replace(/â€™/g, "'")
      .replace(/â€"/g, "—")
      .replace(/â€“/g, "–")
      .trim();

    appendModelTurn(session.id, reply);

    return NextResponse.json({
      reply,
      modelUsed,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Digital Twin Chat Server Error:", err);
    return NextResponse.json(
      { error: "An error occurred while communicating with the Digital Twin." },
      { status: 500 }
    );
  }
}
