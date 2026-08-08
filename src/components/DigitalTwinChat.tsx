"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, RotateCcw, Sparkles, AlertCircle, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SAMPLE_QUESTIONS = [
  "What AI books has William published?",
  "Tell me about William's 30+ years in Enterprise IT",
  "What kind of music does Zainy Beats produce?",
  "Where can I find William's travel blog & photos?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am William Zain's Digital Twin AI. Ask me anything about William's 30+ years in enterprise IT architecture, his published AI books, Zainy Beats music production, or 'I Wish You Were Here' travel platform!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const messageToSend = queryText || input;
    if (!messageToSend.trim() || loading) return;

    setError(null);
    const newMessages: Message[] = [...messages, { role: "user", content: messageToSend }];
    setMessages(newMessages);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to receive response from Digital Twin.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation reset! I am ready to answer any questions about William Zain's experience, books, music, or projects.",
      },
    ]);
    setError(null);
  };

  const cleanResponseText = (text: string): string => {
    if (!text) return "";
    return text
      .replace(/\uFFFD/g, "'")
      .replace(/â€™/g, "'")
      .replace(/â€"/g, "—")
      .replace(/â€“/g, "–")
      .trim();
  };

  const parseInlineMarkdown = (str: string) => {
    // Matches: **bold text**, [link text](url), or standalone URLs https://...
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+)/g;
    const parts = str.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      // 1. Bold text: **something**
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        const innerBold = part.slice(2, -2);
        return (
          <strong key={index} className="font-extrabold text-slate-900 dark:text-white">
            {parseInlineMarkdown(innerBold)}
          </strong>
        );
      }

      // 2. Markdown Link: [label](url)
      const markdownLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (markdownLinkMatch) {
        const label = markdownLinkMatch[1].replace(/\*\*/g, ""); // strip inner ** if any
        const url = markdownLinkMatch[2];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-500 underline font-bold transition-colors inline-flex items-center gap-0.5"
          >
            <span>{label}</span>
          </a>
        );
      }

      // 3. Standalone URL: https://...
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-500 underline font-bold break-all transition-colors"
          >
            {part}
          </a>
        );
      }

      // Regular plain text
      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    const cleaned = cleanResponseText(text);
    const lines = cleaned.split("\n");

    let numberedIndex = 0;

    return (
      <div className="space-y-2">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return <div key={lineIdx} className="h-1.5" />;
          }

          // Check if line starts with ###
          if (trimmed.startsWith("###")) {
            numberedIndex++;
            // Remove ### and leading digits/dots if present e.g. "### 1. Title" or "### Title"
            let titleText = trimmed.replace(/^###\s*/, "");
            const numberMatch = titleText.match(/^(\d+)[\.\)]\s*(.*)/);
            let itemNum = numberedIndex;
            if (numberMatch) {
              itemNum = parseInt(numberMatch[1], 10);
              titleText = numberMatch[2];
            }

            return (
              <div
                key={lineIdx}
                className="flex items-start gap-2.5 my-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-extrabold text-xs shrink-0 shadow-sm border border-sky-300 dark:border-sky-800">
                  {itemNum}
                </span>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base pt-0.5">
                  {parseInlineMarkdown(titleText)}
                </div>
              </div>
            );
          }

          // Bullet point lines
          if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            const bulletText = trimmed.replace(/^[\*\-]\s*/, "");
            return (
              <div key={lineIdx} className="flex items-start gap-2 pl-2 my-1">
                <span className="text-sky-500 dark:text-sky-400 font-bold text-base leading-none">•</span>
                <div className="flex-1">{parseInlineMarkdown(bulletText)}</div>
              </div>
            );
          }

          // Regular paragraph line
          return <div key={lineIdx}>{parseInlineMarkdown(line)}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[620px]">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-[2px] shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                William Zain <span className="text-sky-600 dark:text-sky-400">Digital Twin</span>
              </h3>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span>AI Interactive Representative • Gemma 4 31B</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          title="Reset Conversation"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all text-xs flex items-center gap-1.5 font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Starter Chips */}
      <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 shrink-0 flex items-center gap-1">
          <MessageSquare className="w-3 h-3 text-sky-500" />
          Quick Ask:
        </span>
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="shrink-0 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[11px] font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                m.role === "user"
                  ? "bg-sky-600 text-white"
                  : "bg-slate-900 dark:bg-slate-800 text-cyan-400 border border-slate-700"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] sm:max-w-[75%] p-4 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-sky-600 text-white rounded-tr-none font-medium"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none font-normal"
              }`}
            >
              {renderFormattedText(m.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              <span>Thinking & formulating answer...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask William Zain's Digital Twin a question..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-500 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
