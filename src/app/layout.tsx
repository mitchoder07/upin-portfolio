import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/custom-cursor";

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
  title: "Upin — Frontend Engineer & UI/UX Designer",
  description:
    "Abdullah Yusuf (Upin) is a frontend engineer and UI/UX designer who designs and builds beautiful, accessible interfaces. From Figma wireframes to pixel-perfect React.",
  keywords: [
    "Upin",
    "Abdullah Yusuf",
    "Frontend Engineer",
    "UI/UX Designer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "Design Systems",
    "Portfolio",
  ],
  authors: [{ name: "Abdullah Yusuf" }],
  openGraph: {
    title: "Upin — Frontend Engineer & UI/UX Designer",
    description:
      "Designer who codes. Engineer who designs. Figma wireframes to pixel-perfect React.",
    siteName: "Upin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upin — Frontend Engineer & UI/UX Designer",
    description:
      "Designer who codes. Engineer who designs. Figma to pixel-perfect React.",
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
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
