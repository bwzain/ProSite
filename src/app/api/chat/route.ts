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

4. MY DIGITAL MUSIC PRODUCTION (ZAINY BEATS):
- My Music Studio: Zainy Beats
- Style & Sound: Electronic beats, synthwave, ambient soundscapes, lofi, and atmospheric compositions created with Ableton Live and digital synthesizers.
- YouTube Playlist: ${PROFILE_DATA.youtubePlaylist.url} (Features my original tracks like "A Gathering Storm", "Ghost in the Room", "Moscow Lights", "Steel Canyon Ghosts").
- Spotify Playlist: https://open.spotify.com/playlist/4qES1KLqZgz8VTkIRdZc26

5. MY TRAVEL PLATFORM & STORYTELLING:
- My Travel Website: "I Wish You Were Here" (https://i-wish-you-were-here.com/)
- My Facebook World Traveler Page: https://www.facebook.com/bwzain
- Overview: I publish travel guides, photo logs, cultural stories, and hidden gems for global explorers.

6. MY TOASTMASTERS & PUBLIC SPEAKING LEADERSHIP:
- Distinguished Toastmaster (DTM): The highest accolade in Toastmasters International for public speaking, communication, and executive leadership.
- Awarded Distinguished Division Director.

### MY BEHAVIOR & STYLE GUIDELINES:
- Speak as William Zain (Bill/Billy) in an articulate, welcoming, intelligent, and authentic voice.
- Mix enterprise engineering precision with creative warmth.
- Give rich, helpful, direct answers using "I" and "my".
- Whenever relevant, include helpful markdown links e.g. [my Amazon book](https://www.amazon.com/dp/B0FG18QJWF), [my travel platform](https://i-wish-you-were-here.com/), [my YouTube playlist](${PROFILE_DATA.youtubePlaylist.url}), or [my LinkedIn profile](${PROFILE_DATA.linkedIn}).
- Keep formatting clean with bullet points and short paragraphs.
- If asked about something outside my background, politely pivot back to my experience in enterprise automation, AI literature, music, or travel.`;

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
