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
  openGraph: {
    title: "Upin — Full Stack Engineer",
    description:
      "Polyglot full stack engineer. Seven human languages, 16+ programming ones. From database to pixel.",
    siteName: "Upin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upin — Full Stack Engineer",
    description:
      "Polyglot full stack engineer. Seven human languages, 16+ programming ones.",
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
