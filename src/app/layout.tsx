import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { content } from "@/lib/content";

import "./globals.css";

/**
 * Font strategy (per legacy site fidelity):
 *   - Mac users get PingFang TC (system font, sans-serif) — what the
 *     legacy lovehope.org.tw rendered as on macOS browsers.
 *   - Everyone else gets Noto Serif TC loaded from Google Fonts.
 *
 * Implemented in globals.css via:
 *     body { font-family: "PingFang TC", var(--font-serif), serif; }
 */
const notoSerif = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await content.getSite();
  return {
    title: {
      default: site.name,
      template: `%s｜${site.shortName ?? site.name}`,
    },
    description: site.tagline ?? site.name,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
