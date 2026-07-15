"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  badge,
  heading,
  subheading,
  align = "center",
}: {
  badge?: string;
  heading: string;
  subheading?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {badge && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]" />
          {badge}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {subheading}
        </p>
      )}
    </motion.div>
  );
}
