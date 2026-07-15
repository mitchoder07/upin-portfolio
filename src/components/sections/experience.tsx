"use client";

import { motion } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="section-pad relative bg-foreground/[0.015]">
      <div className="container-max">
        <SectionHeading
          badge={t.experience.badge}
          heading={t.experience.heading}
          subheading={t.experience.subheading}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--neon)]/40 via-foreground/15 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {t.experience.items.map((item, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative pl-12 sm:pl-0 ${
                    isRight ? "sm:pl-[calc(50%+2rem)]" : "sm:pr-[calc(50%+2rem)]"
                  }`}
                >
                  {/* Node */}
                  <div
                    className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full glass-strong ring-2 ring-[var(--neon)]/30 left-0 sm:left-1/2 sm:-translate-x-1/2 ${
                      isRight ? "sm:left-1/2" : "sm:left-1/2"
                    }`}
                  >
                    <Briefcase className="h-3.5 w-3.5 text-[var(--neon)]" />
                  </div>

                  {/* Card */}
                  <div className="group rounded-2xl glass p-5 transition-all duration-300 hover:border-[var(--neon)]/30 hover:shadow-lg hover:shadow-[var(--neon)]/10 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[var(--neon)]/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--neon)]">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">
                      {item.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                      {item.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {item.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      {item.achievements.map((ach, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + j * 0.08 }}
                          className="flex items-start gap-2.5 text-sm text-foreground/75"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--neon)]" />
                          <span>{ach}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
