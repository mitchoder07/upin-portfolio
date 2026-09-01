"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

// ===== ScrollButtons =====
// A floating pair of scroll buttons fixed to the bottom-right corner.
//
// DESKTOP ONLY (>= 1024px). On mobile, the mobile bottom nav handles
// navigation, and the scroll buttons would clutter the small screen.
//
// Behavior:
//   • "Scroll to top" button: appears when the user has scrolled down
//     more than 400px. Clicking it smooth-scrolls to the top.
//   • "Scroll to bottom" button: appears when the user is NOT at the
//     bottom of the page. Clicking it smooth-scrolls to the bottom.
//   • Both buttons are hidden when they'd do nothing (at top/bottom).

export function ScrollButtons() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setShowTop(scrollTop > 400);
      setShowBottom(scrollTop + windowHeight < docHeight - 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  if (!isDesktop) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-full glass border border-border shadow-lg transition-all hover:bg-foreground/10 hover:border-[var(--neon)]/40"
            aria-label="Scroll to top"
            title="Scroll to top"
            data-cursor="pointer"
          >
            <ArrowUp className="h-4 w-4 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showBottom && (
          <motion.button
            onClick={scrollToBottom}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-full glass border border-border shadow-lg transition-all hover:bg-foreground/10 hover:border-[var(--neon)]/40"
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
            data-cursor="pointer"
          >
            <ArrowDown className="h-4 w-4 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
