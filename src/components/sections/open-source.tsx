"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Users, Activity, ArrowUpRight, Github } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Github, key: "reposLabel", value: "47" },
  { icon: Star, key: "starsLabel", value: "4.2k" },
  { icon: Activity, key: "contribsLabel", value: "1,284" },
] as const;

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Rust: "#dea584",
  Go: "#00add8",
  Python: "#3572a5",
};

export function OpenSource() {
  const { t } = useI18n();

  return (
    <section id="open-source" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          badge={t.openSource.badge}
          heading={t.openSource.heading}
          subheading={t.openSource.subheading}
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 grid grid-cols-3 gap-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="rounded-2xl glass p-4 text-center transition-all duration-300 hover:border-[var(--neon)]/30 sm:p-6"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-[var(--neon)]" />
                <div className="font-display text-2xl font-bold sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {t.openSource[stat.key as keyof typeof t.openSource]}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Repos grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.openSource.repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10"
              data-cursor="pointer"
            >
              {/* Top row */}
              <div className="mb-3 flex items-center justify-between">
                <Github className="h-4 w-4 text-muted-foreground" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[var(--neon)]" />
              </div>

              {/* Name */}
              <h3 className="mb-2 font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--neon)]">
                {repo.name}
              </h3>

              {/* Description */}
              <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                {repo.description}
              </p>

              {/* Bottom row */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background:
                        languageColors[repo.language] || "#888",
                    }}
                  />
                  <span>{repo.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{repo.stars}</span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[var(--neon)]/0 to-[var(--magenta)]/0 opacity-0 transition-opacity duration-300 group-hover:from-[var(--neon)]/5 group-hover:to-[var(--magenta)]/5 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full glass px-6 hover:border-[var(--neon)]/60"
            data-cursor="pointer"
          >
            <Github className="mr-2 h-4 w-4" />
            {t.openSource.viewGithub}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
