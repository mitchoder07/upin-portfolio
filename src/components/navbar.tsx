"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { AnimatedLogo } from "./animated-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionIds = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "open-source",
  "design",
  "testimonials",
  "contact",
] as const;

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "open-source", label: t.nav.openSource },
    { id: "design", label: t.nav.design },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2.5"
            : "py-4"
        )}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-full transition-all duration-500",
              scrolled
                ? "glass-strong h-14 px-4 shadow-lg shadow-black/5"
                : "h-14 px-2"
            )}
          >
            {/* Logo — animated wordmark + cycling character avatar */}
            <AnimatedLogo onClick={() => scrollTo("home")} />

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  data-cursor="pointer"
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/8"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                onClick={() => scrollTo("contact")}
                size="sm"
                className="ml-2 hidden h-9 rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:bg-foreground/90 md:inline-flex"
                data-cursor="pointer"
              >
                {t.nav.contact}
              </Button>

              {/* Mobile menu trigger removed — the mobile bottom nav bar
                  (MobileBottomNav in layout.tsx) handles navigation on
                  mobile/tablet now. The hamburger menu and its drawer
                  are no longer needed. */}
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
