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
  SiHtml5,
  SiJavascript,
  SiFigma,
  SiReactquery,
  SiReacthookform,
  SiZod,
  SiRadixui,
  SiShadcnui,
  SiGit,
  SiGithubactions,
  SiVercel,
  SiStorybook,
  SiPython,
  SiMysql,
} from "react-icons/si";
import { Palette, Boxes, Layers, Component, Gauge } from "lucide-react";
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
    icon: SiReactquery,
    gradientFrom: "#764abc",
    gradientTo: "#ff4444",
  },
  {
    key: "components",
    icon: SiRadixui,
    gradientFrom: "#1e1e1e",
    gradientTo: "#61dafb",
  },
  {
    key: "tooling",
    icon: SiGit,
    gradientFrom: "#f05032",
    gradientTo: "#6e5494",
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
    html5: SiHtml5,
    html: SiHtml5,
    css3: SiTailwindcss,
    css: SiTailwindcss,
    javascript: SiJavascript,
    figma: SiFigma,
    "design systems": SiFigma,
    wireframing: SiFigma,
    prototyping: SiFigma,
    "color theory": Palette,
    typography: Palette,
    "spacing systems": Palette,
    "component libraries": Boxes,
    accessibility: Layers,
    "responsive design": Layers,
    zustand: SiReact,
    "react context api": SiReact,
    "tanstack query": SiReactquery,
    recharts: Gauge,
    "react hook form": SiReacthookform,
    zod: SiZod,
    "shadcn/ui": SiShadcnui,
    "radix ui": SiRadixui,
    "custom components": Component,
    dialogs: SiRadixui,
    dropdowns: SiRadixui,
    sheets: SiRadixui,
    accordions: SiRadixui,
    forms: SiReacthookform,
    git: SiGit,
    "github actions": SiGithubactions,
    vercel: SiVercel,
    pwa: SiReact,
    "seo/metadata api": SiNextdotjs,
    "print css": SiTailwindcss,
    "dark mode": SiTailwindcss,
    storybook: SiStorybook,
    python: SiPython,
    sql: SiMysql,
    bash: SiGit,
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
    html5: "#e34f26",
    html: "#e34f26",
    css3: "#1572b6",
    css: "#1572b6",
    javascript: "#f7df1e",
    figma: "#f24e1e",
    "design systems": "#a259ff",
    wireframing: "#f24e1e",
    prototyping: "#a259ff",
    "color theory": "#ec4899",
    typography: "#8b5cf6",
    "spacing systems": "#06b6d4",
    "component libraries": "#10b981",
    accessibility: "#22c55e",
    "responsive design": "#3b82f6",
    zustand: "#ff4444",
    "react context api": "#61dafb",
    "tanstack query": "#ff4154",
    recharts: "#82ca9d",
    "react hook form": "#ec4899",
    zod: "#3e67b1",
    "shadcn/ui": "#ffffff",
    "radix ui": "#8b5cf6",
    "custom components": "#61dafb",
    dialogs: "#8b5cf6",
    dropdowns: "#8b5cf6",
    sheets: "#8b5cf6",
    accordions: "#8b5cf6",
    forms: "#ec4899",
    git: "#f05032",
    "github actions": "#2088ff",
    vercel: "#ffffff",
    pwa: "#5a0fc8",
    "seo/metadata api": "#ffffff",
    "print css": "#06b6d4",
    "dark mode": "#a78bfa",
    storybook: "#ff4785",
    python: "#3776ab",
    sql: "#00758f",
    bash: "#4eaa25",
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
