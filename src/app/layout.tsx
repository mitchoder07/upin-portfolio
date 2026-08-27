import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/custom-cursor";
import { CatCursor } from "@/components/cat-cursor";
import { ScrollButtons } from "@/components/scroll-buttons";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Upin — Frontend Engineer & UI/UX Designer | Polyglot Builder",
  description:
    "Upin is a frontend engineer who designs, builds, and ships responsive and accessible web applications. Fluent in 7 human languages and 16+ programming ones.",
  keywords: [
    "Upin",
    "Frontend Engineer",
    "Next.js",
    "TypeScript",
    "Polyglot Developer",
    "Web3",
    "Cloud",
    "Portfolio",
  ],
  authors: [{ name: "Upin" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Upin — Frontend Engineer & UI/UX Designer",
    description:
      "Polyglot frontend engineer & UI/UX designer. Seven human languages, 16+ programming ones. From database to pixel.",
    siteName: "Upin",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Upin — Frontend Engineer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upin — Frontend Engineer & UI/UX Designer",
    description:
      "Polyglot frontend engineer & UI/UX designer. Seven human languages, 16+ programming ones.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider>
          <I18nProvider>
            <CustomCursor />
            <CatCursor />
            <ScrollButtons />
            <MobileBottomNav />
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
