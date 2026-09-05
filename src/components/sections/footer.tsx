"use client";

import { motion } from "framer-motion";
import { Github, Mail, Dribbble, Figma } from "lucide-react";
import { SiX, SiWhatsapp, SiFiverr } from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import { AnimatedLogo } from "@/components/animated-logo";

const navLinks = [
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "experience", key: "experience" },
  { id: "open-source", key: "openSource" },
  { id: "design", key: "design" },
  { id: "contact", key: "contact" },
] as const;

export function Footer() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-foreground/10 bg-foreground/[0.02]">
      <div className="container-max px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <AnimatedLogo onClick={() => scrollTo("home")} size="lg" />
            <p className="mb-4 mt-4 max-w-sm text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {t.footer.builtWith}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-foreground/70 transition-colors hover:text-[var(--neon)]"
                    data-cursor="pointer"
                  >
                    {t.nav[link.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.footer.connect}
            </h4>
            <div className="flex gap-2">
              {[
                { icon: Github, href: "https://github.com/mitchoder07", label: "GitHub" },
                { icon: SiFiverr, href: "https://www.fiverr.com/s/lr9QgXy", label: "Fiverr" },
                { icon: SiX, href: "https://x.com/mitchoder07", label: "X" },
                { icon: Dribbble, href: "https://dribbble.com/mitchoder07", label: "Dribbble" },
                { icon: Figma, href: "https://figma.com/@mitchoder07", label: "Figma" },
                { icon: SiWhatsapp, href: "https://wa.me/2347088955340", label: "WhatsApp" },
                { icon: Mail, href: "mailto:olaniyiaremu2003@gmail.com", label: "Email" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg glass transition-all duration-300 hover:border-[var(--neon)]/40 hover:bg-[var(--neon)]/5 hover:text-[var(--neon)]"
                    aria-label={s.label}
                    data-cursor="pointer"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-10 border-t border-foreground/10 pt-6 text-center">
          <p className="mx-auto max-w-xl font-display text-sm italic leading-relaxed text-muted-foreground/80">
            &ldquo;{t.footer.quote}&rdquo;
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Upin. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
