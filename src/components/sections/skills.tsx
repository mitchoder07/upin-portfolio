"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiVite,
  SiFigma,
  SiGithubactions,
  SiVercel,
  SiStorybook,
  SiZod,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPython,
  SiMysql,
  SiGit,
  SiGraphql,
  SiReactos,
  SiRadixui,
} from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import type { IconType } from "react-icons";

// Category configuration — each uses a representative brand icon
// that renders reliably and looks modern.
const categoryMeta: {
  key: "frontend" | "design" | "state" | "components" | "tooling" | "languages";
  icon: IconType;
  /** Tailwind-friendly CSS color — adapts via currentColor for theme support */
  gradientFrom: string;
  gradientTo: string;
}[] = [
  {
    key: "frontend",
    icon: SiReact,
    gradientFrom: "#61dafb",
    gradientTo: "#3178c6",
  },
  {
    key: "design",
    icon: SiFigma,
    gradientFrom: "#f24e1e",
    gradientTo: "#a259ff",
  },
  {
    key: "state",
    icon: SiGraphql,
    gradientFrom: "#e10098",
    gradientTo: "#ff44aa",
  },
  {
    key: "components",
    icon: SiRadixui,
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
  },
  {
    key: "tooling",
    icon: SiVercel,
    gradientFrom: "#000000",
    gradientTo: "#525252",
  },
  {
    key: "languages",
    icon: SiTypescript,
    gradientFrom: "#3178c6",
    gradientTo: "#f7df1e",
  },
];

// Map skill names to their brand icons
function getSkillIcon(skillName: string): IconType | null {
  const name = skillName.toLowerCase().trim();

  const iconMap: Record<string, IconType> = {
    "next.js 16": SiNextdotjs,
    "next.js": SiNextdotjs,
    "react 19": SiReact,
    react: SiReact,
    typescript: SiTypescript,
    "tailwind css 4": SiTailwindcss,
    "tailwind css": SiTailwindcss,
    "framer motion": SiFramer,
    "three.js": SiThreedotjs,
    threejs: SiThreedotjs,
    vite: SiVite,
    figma: SiFigma,
    html5: SiHtml5,
    html: SiHtml5,
    css3: SiCss,
    css: SiCss,
    javascript: SiJavascript,
    "github actions": SiGithubactions,
    vercel: SiVercel,
    storybook: SiStorybook,
    git: SiGit,
    zod: SiZod,
    "radix ui": SiRadixui,
    "react context api": SiReactos,
    python: SiPython,
    sql: SiMysql,
  };

  if (iconMap[name]) return iconMap[name];

  for (const key of Object.keys(iconMap)) {
    if (name.includes(key) || key.includes(name)) {
      return iconMap[key];
    }
  }

  return null;
}

// Get brand color for each tech
function getSkillColor(skillName: string): string {
  const name = skillName.toLowerCase().trim();
  const colorMap: Record<string, string> = {
    "next.js 16": "#ffffff",
    "next.js": "#ffffff",
    "react 19": "#61dafb",
    react: "#61dafb",
    typescript: "#3178c6",
    "tailwind css 4": "#06b6d4",
    "tailwind css": "#06b6d4",
    "framer motion": "#ff44aa",
    "three.js": "#ffffff",
    vite: "#646cff",
    figma: "#f24e1e",
    html5: "#e34f26",
    css3: "#1572b6",
    javascript: "#f7df1e",
    "github actions": "#2088ff",
    vercel: "#ffffff",
    storybook: "#ff4785",
    git: "#f05032",
    zod: "#3e67b8",
    "radix ui": "#8b5cf6",
    python: "#3776ab",
    sql: "#4169e1",
  };

  for (const key of Object.keys(colorMap)) {
    if (name.includes(key)) {
      return colorMap[key];
    }
  }
  return "currentColor";
}

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="section-pad relative bg-foreground/[0.015]">
      <div className="container-max">
        <SectionHeading
          badge={t.skills.badge}
          heading={t.skills.heading}
          subheading={t.skills.subheading}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {categoryMeta.map((meta, i) => {
            const cat = t.skills.categories[meta.key];
            const Icon = meta.icon;
            return (
              <motion.div
                key={meta.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 sm:p-6"
                data-cursor="pointer"
              >
                {/* Glow effect */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: meta.gradientFrom }}
                />

                <div className="relative">
                  {/* Category header with brand icon */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill items with brand icons */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, j) => {
                      const SkillIcon = getSkillIcon(item);
                      const iconColor = getSkillColor(item);
                      return (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + j * 0.03 }}
                          className="flex items-center gap-1.5 rounded-md border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-all duration-200 hover:border-[var(--neon)]/40 hover:bg-[var(--neon)]/5 hover:text-foreground dark:text-foreground/85"
                        >
                          {SkillIcon && (
                            <SkillIcon
                              className="h-3.5 w-3.5 shrink-0"
                              style={{ color: iconColor }}
                            />
                          )}
                          {item}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
