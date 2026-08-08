"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ExternalLink, MapPin, Send, MessageSquare, Linkedin, Bot, Sparkles } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { DigitalTwinChat } from "./DigitalTwinChat";

export function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveTabMode] = useState<"chat" | "email">("chat");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setMounted(true);
    // Auto switch to chat tab if hash is #chat
    if (typeof window !== "undefined" && window.location.hash === "#chat") {
      setActiveTabMode("chat");
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="chat" className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/50 text-sky-900 dark:text-sky-300 text-xs font-mono uppercase font-bold tracking-wider">
            <Bot className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Interactive Contact & AI Twin</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Connect with <span className="text-sky-600 dark:text-sky-400">William Zain</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl font-medium">
            Chat live with William Zain's Digital Twin AI or send a direct message for enterprise consulting, AI literature, or music collaborations.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md gap-2">
            <button
              onClick={() => setActiveTabMode("chat")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMode === "chat"
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
              }`}
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              <span>Chat with Digital Twin AI</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTabMode("email")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMode === "email"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </button>
          </div>
        </div>

        {activeMode === "chat" ? (
          <div className="max-w-4xl mx-auto">
            <DigitalTwinChat />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Left Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-700 text-sky-600 dark:text-sky-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Direct Email</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">{PROFILE_DATA.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-sky-500 text-xs font-bold transition-all"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-sky-600" />}
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>

                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    Send
                  </a>
                </div>
              </div>

              <a
                href={PROFILE_DATA.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-all shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-slate-500">LinkedIn Network</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600">linkedin.com/in/bwzain</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
              </a>

              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-md">
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Base Location</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{PROFILE_DATA.location}</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>Send Direct Message</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 font-medium">
                Submit your message below and William Zain will reply directly to your email.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Message Sent!</h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200 font-medium">
                    Thank you, {formData.name}. William Zain will review your inquiry shortly.
                  </p>
                </motion.div>
              ) : mounted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Inquire about enterprise consulting, music production, or AI literature..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:border-sky-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4 animate-pulse">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
