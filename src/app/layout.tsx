import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "William Zain | Enterprise IT Architect, Music Producer & Published AI Author",
  description: "Official executive portfolio of William Zain — 30+ year Enterprise Automation & Cloud Architect, Digital Music Producer (Zainy Beats), Published AI Author, and Toastmasters DTM.",
  keywords: ["William Zain", "Zainy Beats", "Introduction to Artificial Intelligence", "Nintex", "K2 Workflow", "Calance", "AWS Architect", "Toastmasters DTM"],
  authors: [{ name: "William Zain" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex flex-col justify-between`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FloatingChatButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
