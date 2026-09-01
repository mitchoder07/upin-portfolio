"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          badge={t.about.badge}
          heading={t.about.heading}
        />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Left: Story */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-base leading-relaxed text-foreground/80 sm:text-lg"
            >
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4"
            >
              {t.about.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl glass p-4 transition-all duration-300 hover:border-[var(--neon)]/30 hover:shadow-lg hover:shadow-[var(--neon)]/10"
                  data-cursor="pointer"
                >
                  <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {h.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {h.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Core Competencies card (replaces languages card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24 rounded-3xl glass-strong p-6 sm:p-8">
              <h3 className="mb-2 font-display text-lg font-bold">
                {t.about.coreTitle}
              </h3>
              <p className="mb-5 text-xs text-muted-foreground">
                {t.about.coreDesc}
              </p>

              <div className="space-y-3">
                {t.about.coreItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="group rounded-xl border border-foreground/8 bg-foreground/[0.02] p-3.5 transition-all duration-300 hover:border-[var(--neon)]/30 hover:bg-[var(--neon)]/[0.03]"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--neon)]/15">
                        <Check className="h-3 w-3 text-[var(--neon)]" strokeWidth={3} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
