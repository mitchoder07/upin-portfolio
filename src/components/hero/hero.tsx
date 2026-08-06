"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Terminal as TerminalIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero3DScene = dynamic(
  () => import("./hero-3d").then((m) => m.Hero3DScene),
  { ssr: false }
);

const stats = [
  { key: "stat1Label", value: "5" },
  { key: "stat2Label", value: "20+" },
  { key: "stat3Label", value: "306" },
] as const;

export function Hero() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-grid"
    >
      {/* 3D Background — FULL SCREEN, bright and clear */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hero3DScene />
      </div>

      <div className="container-max relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 pb-24 sm:px-12 sm:ml-8 lg:ml-16 lg:px-16 xl:ml-24">
        <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 inline-flex sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium sm:px-3.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/90">{t.hero.badge}</span>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-2 font-mono text-xs text-foreground/80 sm:mb-3 sm:text-sm md:text-base"
          >
            <span className="text-[var(--neon)]">$</span> {t.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold leading-[1.0] tracking-tight break-words sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="gradient-text-cool text-glow">{t.hero.name}</span>
          </motion.h1>

          {/* aka Upin subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-2 flex flex-wrap items-center gap-2"
          >
            <span className="font-mono text-sm text-foreground/80 sm:text-base">
              {t.hero.akaLabel}
            </span>
            <span className="rounded-full bg-[var(--neon)]/15 px-2 py-0.5 font-display text-sm font-semibold text-[var(--neon)] sm:text-base">
              {t.hero.brandName}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-4 font-display text-xl font-semibold text-foreground sm:mt-5 sm:text-2xl md:text-3xl lg:text-4xl"
          >
            {t.hero.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 max-w-xl break-words text-sm leading-relaxed text-foreground/90 sm:mt-6 sm:text-base md:text-lg"
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
          >
            <Button
              onClick={() => scrollTo("projects")}
              size="lg"
              data-cursor="pointer"
              data-cursor-text="view"
              className={cn(
                "group h-11 rounded-full px-5 text-sm font-semibold sm:h-12 sm:px-6",
                "bg-foreground text-background hover:bg-foreground/90",
                "shadow-lg shadow-foreground/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--neon)]/30"
              )}
            >
              {t.hero.ctaPrimary}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Button>
            <Button
              onClick={() => scrollTo("terminal")}
              size="lg"
              variant="outline"
              data-cursor="pointer"
              data-cursor-text="run"
              className={cn(
                "group h-11 rounded-full px-5 text-sm font-semibold sm:h-12 sm:px-6",
                "glass border-[var(--neon)]/30 text-foreground hover:border-[var(--neon)]/60 hover:bg-[var(--neon)]/5"
              )}
            >
              <TerminalIcon className="mr-2 h-4 w-4 text-[var(--neon)]" />
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          {/* Stats — each has its own glass background for guaranteed visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-10 grid grid-cols-3 gap-2 sm:mt-14 sm:gap-4 lg:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="group min-w-0 rounded-xl glass p-2 text-center sm:p-3"
              >
                <div className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-[var(--neon)] sm:text-3xl md:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 break-words text-[8px] uppercase leading-tight tracking-normal text-foreground/80 sm:text-xs sm:tracking-wider">
                  {t.hero[stat.key as keyof typeof t.hero]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator — shows on lg+ screens (1024px+), hidden on smaller */}
        <motion.button
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground lg:flex"
          data-cursor="pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">
            {t.hero.scroll}
          </span>
          <div className="relative h-8 w-5 rounded-full border border-current">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-current"
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
