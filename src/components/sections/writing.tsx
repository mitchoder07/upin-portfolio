"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

// Design case study images.
// To add your own images:
// 1. Put image files in /public/portfolio-images/ (e.g. design-1.png, design-2.png)
// 2. Update the image paths in the array below to match your filenames
// 3. The images will appear at the top of each case study card
//
// If an image path doesn't exist, a gradient placeholder is shown instead.
const caseStudyImages: string[] = [
  // "/portfolio-images/design-1.png",  // Design System
  // "/portfolio-images/design-2.png",  // Mobile App
  // "/portfolio-images/design-3.png",  // Dashboard
  // "/portfolio-images/design-4.png",  // Landing Page
];

// Gradient colors for placeholders when no image is set
const placeholderGradients = [
  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
  "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
];

export function Writing() {
  const { t } = useI18n();

  return (
    <section id="design" className="section-pad relative bg-foreground/[0.015]">
      <div className="container-max">
        <SectionHeading
          badge={t.writing.badge}
          heading={t.writing.heading}
          subheading={t.writing.subheading}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {t.writing.articles.map((article, i) => {
            const image = caseStudyImages[i];
            const gradient = placeholderGradients[i % placeholderGradients.length];

            return (
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
                {/* Image / gradient placeholder at top */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{ background: gradient }}
                    >
                      <div className="text-center">
                        <div className="mb-2 font-display text-xl font-bold text-white/90 drop-shadow-lg sm:text-2xl">
                          {article.tag}
                        </div>
                        <div className="mx-auto h-1 w-12 rounded-full bg-white/40" />
                      </div>
                    </div>
                  )}
                  {/* Tag badge on top of image */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {article.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="mb-2 font-display text-lg font-bold leading-snug transition-colors group-hover:text-[var(--neon)] sm:text-xl">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-[var(--neon)]">
                      {t.writing.readMore}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
