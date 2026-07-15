"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Character avatars — user's real photo, Upin characters, and anime characters.
// They cycle silently every 3.2s with a cross-fade + slight zoom.
// Order: profile photo → upin → anime → repeat
type Avatar = {
  src: string;
  name: string;
};

const avatars: Avatar[] = [
  { src: "/portfolio-images/profile.jpeg", name: "Abdullah Yusuf" },
  { src: "/avatars/upin-1.png", name: "Upin" },
  { src: "/avatars/tokyo-1.png", name: "Tokyo Revengers" },
  { src: "/avatars/upin-2.png", name: "Upin" },
  { src: "/avatars/demon-1.png", name: "Demon Slayer" },
  { src: "/avatars/tokyo-2.png", name: "Tokyo Revengers" },
  { src: "/avatars/demon-2.png", name: "Demon Slayer" },
  { src: "/avatars/tokyo-3.png", name: "Tokyo Revengers" },
];

const AVATAR_INTERVAL = 3200; // ms between switches

interface AnimatedLogoProps {
  /** Click handler — usually scrolls to top */
  onClick?: () => void;
  /** Size variant — default for navbar, "lg" for hero/footer */
  size?: "default" | "lg";
  /** Show the "Upin" wordmark next to the avatar */
  showText?: boolean;
  className?: string;
}

export function AnimatedLogo({
  onClick,
  size = "default",
  showText = true,
  className,
}: AnimatedLogoProps) {
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setIdx((prev) => (prev + 1) % avatars.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AVATAR_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const avatarSize = size === "lg" ? 44 : 36;
  const textSize = size === "lg" ? "text-xl" : "text-lg";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-cursor="pointer"
      aria-label="Upin — back to top"
      className={cn("group relative flex items-center gap-2.5", className)}
    >
      {/* Avatar with rotating characters */}
      <div
        className="relative shrink-0"
        style={{ width: avatarSize, height: avatarSize }}
      >
        {/* Animated gradient ring */}
        <div
          className="absolute -inset-[2px] rounded-full opacity-80 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 0deg, var(--neon), var(--magenta), var(--neon-soft), var(--neon))",
            animation: "logo-spin 4s linear infinite",
          }}
        />
        {/* Inner mask to create ring effect */}
        <div className="absolute inset-0 rounded-full bg-background" style={{ margin: 2 }} />

        {/* Avatar images (cross-fading stack) */}
        <div className="absolute rounded-full overflow-hidden" style={{ inset: 2 }}>
          <AnimatePresence mode="sync">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={avatars[idx].src}
                alt={`${avatars[idx].name} avatar`}
                fill
                sizes={`${avatarSize}px`}
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle gradient sheen on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      {/* Wordmark — just "Upin", no mode label */}
      {showText && (
        <span className={cn("font-display font-bold tracking-tight", textSize)}>
          <AnimatedWordmark />
        </span>
      )}

      {/* Inline keyframes for the conic ring spin */}
      <style jsx>{`
        @keyframes logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
}

/**
 * The "Upin" wordmark with a flowing gradient animation.
 * Uses background-clip: text with an animated gradient position.
 */
function AnimatedWordmark() {
  return (
    <span className="relative inline-block">
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(110deg, var(--foreground) 0%, var(--foreground) 35%, var(--neon) 50%, var(--magenta) 65%, var(--foreground) 80%, var(--foreground) 100%)",
          backgroundSize: "200% 100%",
          animation: "wordmark-shimmer 5s ease-in-out infinite",
        }}
      >
        Upin
      </span>
      <style jsx>{`
        @keyframes wordmark-shimmer {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
      `}</style>
    </span>
  );
}
