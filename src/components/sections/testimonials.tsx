"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="testimonials" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          badge={t.testimonials.badge}
          heading={t.testimonials.heading}
          subheading={t.testimonials.subheading}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col overflow-hidden rounded-3xl glass-strong p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 sm:p-8"
              data-cursor="pointer"
            >
              {/* Quote icon */}
              <div className="mb-5 flex items-center justify-between">
                <Quote className="h-8 w-8 text-[var(--neon)]/40" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-[var(--neon)]">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                "{item.quote}"
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-foreground/10 pt-5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold text-background"
                  style={{
                    background: `linear-gradient(135deg, ${
                      ["var(--neon)", "var(--magenta)", "var(--neon-soft)"][i % 3]
                    }, ${
                      ["var(--magenta)", "var(--neon)", "var(--neon)"][i % 3]
                    })`,
                  }}
                >
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-display text-sm font-semibold">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
