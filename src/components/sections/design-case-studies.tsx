"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Figma } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

export function DesignCaseStudies() {
  const { t } = useI18n();

  return (
    <section id="design" className="section-pad relative bg-foreground/[0.015]">
      <div className="container-max">
        <SectionHeading
          badge={t.design.badge}
          heading={t.design.heading}
          subheading={t.design.subheading}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {t.design.cases.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-2xl glass transition-all duration-300 hover:border-[var(--neon)]/30 hover:shadow-xl hover:shadow-black/10"
              data-cursor="pointer"
            >
              {/* Gradient header — placeholder for Figma screenshot */}
              <div
                className="relative flex h-36 items-center justify-center overflow-hidden sm:h-40"
                style={{ background: item.gradient }}
              >
                {/* Decorative Figma mockup grid lines */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-6 top-6 h-16 w-12 rounded-md border-2 border-white/40" />
                  <div className="absolute right-6 top-6 h-16 w-20 rounded-md border-2 border-white/40" />
                  <div className="absolute bottom-6 left-6 right-6 h-8 rounded-md border-2 border-white/40" />
                </div>
                <Figma className="h-8 w-8 text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
                {/* Category badge */}
                <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6">
                {/* Title + arrow */}
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-[var(--neon)] sm:text-xl">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[var(--neon)]" />
                </div>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>

                {/* Read more link */}
                <div className="mt-4 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-[var(--neon)] opacity-70 transition-opacity group-hover:opacity-100">
                  {t.design.readMore}
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
