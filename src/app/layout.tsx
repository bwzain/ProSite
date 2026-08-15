import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_TITLE = "William Zain | Enterprise IT Architect, Music Producer & Published AI Author";
const SITE_DESCRIPTION =
  "Official executive portfolio of William Zain — 30+ year Enterprise Automation & Cloud Architect, Digital Music Producer (Zainy Beats), Published AI Author, and Toastmasters DTM.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: "%s | William Zain",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "William Zain",
    "Zainy Beats",
    "Introduction to Artificial Intelligence",
    "Nintex",
    "K2 Workflow",
    "Calance",
    "AWS Architect",
    "Toastmasters DTM",
  ],
  authors: [{ name: "William Zain" }],
  creator: "William Zain",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "William Zain",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/self-portrait.png", alt: "William Zain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/self-portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex flex-col justify-between"
      >
        <JsonLd />
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
