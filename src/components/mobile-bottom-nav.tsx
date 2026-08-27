"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderGit2, Zap, Mail, MoreHorizontal, Terminal, MessageSquare, Calculator, Briefcase, PenTool, BookOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== MobileBottomNav =====
// A fixed bottom tab bar for mobile that shows the 5 most important
// sections plus a "more" button (3 dots) that expands to reveal
// secondary sections.
//
// Primary tabs (always visible): Home, About, Work, Skills, Contact
// Secondary tabs (behind 3-dots): Terminal, Visitor Wall, Math &
// Puzzle, Experience, Open Source, Design, Writing
//
// When the 3-dots are tapped, a sheet slides up from the bottom
// showing the secondary sections as a grid of icons. Tapping any
// icon scrolls to that section and closes the sheet. Tapping the
// backdrop or the X also closes it.
//
// Only visible on screens < 1024px (mobile + small tablet). Hidden
// on desktop where the full navbar is already visible.

const PRIMARY_TABS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: FolderGit2, label: "Work" },
  { id: "skills", icon: Zap, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
] as const;

const SECONDARY_TABS = [
  { id: "terminal", icon: Terminal, label: "Terminal" },
  { id: "wall", icon: MessageSquare, label: "Visitor Wall" },
  { id: "math", icon: Calculator, label: "Math & Puzzle" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "open-source", icon: BookOpen, label: "Open Source" },
  { id: "design", icon: PenTool, label: "Design" },
] as const;

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const checkViewport = () => setVisible(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    [...PRIMARY_TABS, ...SECONDARY_TABS].forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visible]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMoreOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        aria-label="Quick navigation"
      >
        <div className="mx-3 mb-3 flex items-center justify-around gap-1 rounded-2xl border border-border/60 bg-background/80 px-2 py-2 shadow-lg backdrop-blur-lg">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors",
                  isActive ? "text-[var(--neon)]" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-[var(--neon)]/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}

          {/* 3-dots "more" button */}
          <button
            onClick={() => setMoreOpen(true)}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors",
              moreOpen ? "text-[var(--neon)]" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="More sections"
            aria-expanded={moreOpen}
          >
            {moreOpen && (
              <motion.div
                layoutId="mobile-nav-active"
                className="absolute inset-0 -z-10 rounded-xl bg-[var(--neon)]/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </motion.nav>

      {/* More sheet — slides up from the bottom when 3-dots are tapped */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm lg:hidden"
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-border bg-background/95 pb-8 pt-4 shadow-2xl backdrop-blur-lg lg:hidden"
            >
              {/* Drag handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-foreground/20" />

              {/* Header */}
              <div className="mb-4 flex items-center justify-between px-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  More sections
                </h3>
                <button
                  onClick={() => setMoreOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Grid of secondary sections */}
              <div className="grid grid-cols-3 gap-3 px-6">
                {SECONDARY_TABS.map((tab, i) => {
                  const Icon = tab.icon;
                  const isActive = activeSection === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.03 }}
                      onClick={() => scrollTo(tab.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors",
                        isActive
                          ? "border-[var(--neon)]/40 bg-[var(--neon)]/5 text-[var(--neon)]"
                          : "border-border bg-background/40 text-foreground/80 hover:bg-foreground/5"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
