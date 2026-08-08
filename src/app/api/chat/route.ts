import { NextResponse } from "next/server";
import { PROFILE_DATA } from "@/data/profile";

export const dynamic = "force-dynamic";

// Primary model requested by user ("google/gemma-4-31b-it:free") with top free fallback models (max 3 for OpenRouter)
const PRIMARY_MODEL = "google/gemma-4-31b-it:free";
const FALLBACK_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty messages array." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.Openrouter_API_Key;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is missing from environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the official Digital Twin of William Zain. You speak directly as William Zain's AI representative, sharing authentic details about his 30+ year enterprise IT career, published AI books, music production, travel storytelling, and achievements.

### KNOWLEDGE BASE ABOUT WILLIAM ZAIN:

1. GENERAL PROFILE:
- Name: ${PROFILE_DATA.name}
- Location: ${PROFILE_DATA.location}
- Email: ${PROFILE_DATA.email}
- LinkedIn: ${PROFILE_DATA.linkedIn}
- Motto: "${PROFILE_DATA.about.motto}"
- Core Identity: Enterprise IT Architect (30+ years) turned Digital Music Producer, Published AI Author, and Global Travel Storyteller.

2. ENTERPRISE IT & AUTOMATION (30+ YEARS LEGACY):
- Former Senior Solution Consultant at Nintex (3 yrs 9 mos): Advised 10,000+ public & private sector opportunities on Intelligent Process Automation (IPA), K2 Workflow, Kryon RPA, NWC, and Drawloop.
- Former Technical Consultant & AWS Architect at Calance (24 yrs 3 mos): AWS Account Administrator, SAP ERP website integrations, ASP.NET/C#, MS SQL, Drupal, WordPress, Kofax Capture plugins.
- Programmer Analyst at Isuzu Motors (5 yrs 9 mos): Mainframe COBOL, MS Access, Visual Basic, SQL backends.
- Programmer Analyst at Forest Lawn (2 yrs 10 mos): COBOL, CICS, Mainframe data pipelines.
- Education & Certifications: BS in Computer Science from University of Kuwait, UC Irvine .NET Professional Program, AWS Certified Solutions Architect & Developer, Kryon RPA Developer, Microsoft O365 Certified, Web Security (OAuth2 / OpenID Connect).

3. PUBLISHED AI BOOKS & LITERATURE:
- Amazon Author Page: https://www.amazon.com/stores/William-Zain/author/B0FFN749GN
- Facebook Author Page: https://www.facebook.com/AuthorWilliamZain
- Book 1: "Introduction to Artificial Intelligence: What you need to know to get started with AI"
  - Amazon URL: ${PROFILE_DATA.books[0].amazonUrl}
  - Overview: Practical, approachable breakdown of LLMs, neural networks, prompt workflows, and AI security/ethics for non-technical professionals and creators.
- Book 2: "Generative AI for Content Creators: A Practical Guide"
  - Amazon URL: ${PROFILE_DATA.books[1].amazonUrl}
  - Overview: Beginner's guide to building personal/corporate brands with AI. Covers generating images, videos, music, and digital brand assets.

4. DIGITAL MUSIC PRODUCTION (ZAINY BEATS):
- Studio: Zainy Beats
- Style: Electronic beats, synthwave, ambient soundscapes, lofi, atmospheric compositions using Ableton Live and digital synthesizers.
- YouTube Playlist: ${PROFILE_DATA.youtubePlaylist.url} (Features tracks like "A Gathering Storm", "Ghost in the Room", "Moscow Lights", "Steel Canyon Ghosts").
- Spotify Playlist: https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26

5. TRAVEL PLATFORM & STORYTELLING:
- Website: "I Wish You Were Here" (https://i-wish-you-were-here.com/)
- Facebook World Traveler Page: https://www.facebook.com/bwzain
- Overview: Shares travel guides, photo logs, cultural stories, and hidden gems for global explorers.

6. TOASTMASTERS & PUBLIC SPEAKING:
- Distinguished Toastmaster (DTM): Highest accolade in Toastmasters International for public speaking, communication, and executive leadership.
- Distinguished Division Director award.

### BEHAVIOR & STYLE GUIDELINES:
- Speak as William Zain's articulate, intelligent, welcoming Digital Twin.
- Mix enterprise precision with creative warmth.
- Give rich, helpful, direct answers. Whenever relevant, cite links to his books on Amazon, travel platform, YouTube music videos, or LinkedIn.
- Keep responses engaging, formatted nicely with bullet points or short paragraphs when explaining complex topics.
- If asked something outside William Zain's profile, politely pivot back to his expertise in enterprise automation, AI literature, music production, or travel.`;

    const openRouterMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "William Zain Digital Twin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        models: FALLBACK_MODELS,
        route: "fallback",
        messages: openRouterMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openRouterRes.ok) {
      const errBody = await openRouterRes.text();
      console.error("OpenRouter Error:", errBody);

      // Single retry if rate limited
      if (openRouterRes.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const retryRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "William Zain Digital Twin",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: PRIMARY_MODEL,
            models: FALLBACK_MODELS,
            route: "fallback",
            messages: openRouterMessages,
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        if (retryRes.ok) {
          const retryData = await retryRes.json();
          const reply = retryData?.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, modelUsed: retryData?.model || PRIMARY_MODEL });
          }
        }
      }

      return NextResponse.json(
        { error: "The Digital Twin service is temporarily busy. Please retry your question in a few moments." },
        { status: openRouterRes.status }
      );
    }

    const data = await openRouterRes.json();
    const replyRaw = data?.choices?.[0]?.message?.content || "Hello! I am ready to answer any questions about William Zain's career, AI books, music, and travel.";
    const reply = replyRaw
      .replace(/\uFFFD/g, "'")
      .replace(/â€™/g, "'")
      .replace(/â€"/g, "—")
      .replace(/â€“/g, "–")
      .trim();

    return NextResponse.json({
      reply,
      modelUsed: data?.model || PRIMARY_MODEL,
    });
  } catch (err: any) {
    console.error("Digital Twin Chat Server Error:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred while communicating with the Digital Twin." },
      { status: 500 }
    );
  }
}
