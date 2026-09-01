"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";

// Check if the device supports a fine pointer (mouse) — only true on desktop.
// Uses useSyncExternalStore to avoid setState-in-effect and stay SSR-safe.
function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointerDevice = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse) — never on touch
    if (!isFinePointerDevice) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let hasMoved = false;
    let rafId: number;

    const updateRing = () => {
      // Smooth follow with lerp
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updateRing);
    };
    rafId = requestAnimationFrame(updateRing);

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsHidden(false);
        // snap ring to cursor on first move to avoid fly-in
        ringX = e.clientX;
        ringY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], [data-cursor-text]'
      );

      if (interactive) {
        setIsPointer(true);
        const cursorText = interactive.getAttribute("data-cursor-text");
        setHoveredText(cursorText);
      } else {
        setIsPointer(false);
        setHoveredText(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseEnter = () => {
      if (hasMoved) setIsHidden(false);
    };
    const onMouseLeave = () => setIsHidden(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    document.body.classList.add("custom-cursor-active");

    return () => {
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isFinePointerDevice]);

  // Don't render anything on server or on touch devices
  if (!isFinePointerDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-[width,height,opacity] duration-200"
        style={{
          width: isPointer ? (hoveredText ? 80 : 48) : 32,
          height: isPointer ? (hoveredText ? 80 : 48) : 32,
          opacity: isHidden ? 0 : 1,
          border: `1.5px solid var(--neon)`,
          borderRadius: "50%",
          mixBlendMode: "difference",
          background: isPointer && hoveredText ? "var(--neon)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isPointer && hoveredText ? "var(--background)" : "transparent",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          // Start off-screen so there's no flash before first mouse move
          transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
        }}
      >
        {hoveredText}
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          opacity: isHidden ? 0 : isPointer ? 0 : 1,
          background: "var(--neon)",
          borderRadius: "50%",
          transition: "width 0.15s, height 0.15s, opacity 0.15s",
          transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
        }}
      />
    </>
  );
}
