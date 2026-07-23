"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

type CaseStudy = {
  images: string[];
  figmaUrl: string;
};

const caseStudies: CaseStudy[] = [
  {
    images: ["/figma/rafaab-1.png", "/figma/rafaab-2.png", "/figma/rafaab-3.png"],
    figmaUrl: "https://www.figma.com/design/0dxazcz2O4PsKuae6jzt0v/Rafaab?node-id=0-1&p=f&t=xsVVyAJ7lZQltKq9-0",
  },
  {
    images: ["/figma/alhikmah-lms-1.png", "/figma/alhikmah-lms-2.png", "/figma/alhikmah-lms-3.png"],
    figmaUrl: "https://www.figma.com/design/dpBwBIf76c1RkgSPZ5QjLD/LMS?node-id=0-1&p=f&t=vNkUX7Y1HplKiA4k-0",
  },
  {
    images: ["/figma/flyer-1.png", "/figma/flyer-2.png"],
    figmaUrl: "https://www.figma.com/design/taZ7gCuveSPRNGUf5le6VP/Flyers?node-id=0-1&p=f&t=iEOudEdq9femXgfZ-0",
  },
  {
    images: ["/figma/portfolio-1.png", "/figma/portfolio-2.png", "/figma/portfolio-3.png"],
    figmaUrl: "https://www.figma.com/design/04BmvgaTEEuR25ewyIW0zF/Untitled?t=Xc4woXRINRhsclP4-0",
  },
];

const IMAGE_INTERVAL = 3000;

function CyclingImage({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, IMAGE_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{
            opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 3.5, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.6, ease: "easeOut" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={idx === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Progress bar indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex h-1 gap-1 px-3 pb-3">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 overflow-hidden rounded-full bg-white/20"
            >
              <motion.div
                className="h-full rounded-full bg-white/80"
                initial={{ width: i === idx ? "0%" : "100%" }}
                animate={{
                  width:
                    i === idx
                      ? "100%"
                      : i === (idx + 1) % images.length
                        ? "0%"
                        : "100%",
                }}
                transition={{
                  duration: i === idx ? IMAGE_INTERVAL / 1000 : 0,
                  ease: "linear",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
            const study = caseStudies[i] || caseStudies[0];
            const images = study?.images || [];
            const figmaUrl = study?.figmaUrl || "#";

            return (
              <motion.a
                key={i}
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl glass transition-all duration-300 hover:border-[var(--neon)]/30 hover:shadow-xl hover:shadow-black/10"
                data-cursor="pointer"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {images.length > 0 ? (
                    <CyclingImage images={images} alt={article.title} />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                      }}
                    >
                      <div className="text-center">
                        <div className="mb-2 font-display text-xl font-bold text-white/90 drop-shadow-lg sm:text-2xl">
                          {article.tag}
                        </div>
                        <div className="mx-auto h-1 w-12 rounded-full bg-white/40" />
                      </div>
                    </div>
                  )}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {article.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg font-bold leading-snug transition-colors group-hover:text-[var(--neon)] sm:text-xl">
                    {article.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>

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