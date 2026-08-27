"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ===== CatCursor =====
// A cat that CHASES the mouse cursor on desktop only.
//
// The behavior is simple and playful:
//   • When the mouse moves, the cat RUNS toward the mouse's position.
//     But the cat is slower than the mouse — so if the user keeps
//     moving, the cat never catches up. It trails behind, always
//     running toward where the mouse WAS.
//   • Users can tease the cat by moving the mouse away repeatedly.
//     The cat keeps chasing but can't catch a moving target.
//   • Only when the user FINALLY stops moving does the cat catch up,
//     sit down beside the cursor, and say "mew mew".
//   • The cat goes idle (sitting, blinking) until the mouse moves
//     again.
//
// Speed: the lerp (0.045) is deliberately slow. The cat takes ~3-5
// seconds to reach a stationary cursor from across the screen. If the
// user moves the mouse even slightly every 1-2 seconds, the cat will
// never catch up — it'll keep running in the mouse's direction but
// always arrive at a position the mouse has already left.
//
// Inspired by nehalingole.in.

type CatState = "walking" | "sitting" | "idle";

export function CatCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [catState, setCatState] = useState<CatState>("walking");
  const [mewText, setMewText] = useState<string | null>(null);
  const mewTextRef = useRef<string | null>(null);
  const [walkFrame, setWalkFrame] = useState(0);
  const [facingLeft, setFacingLeft] = useState(true);
  const [eyeBlink, setEyeBlink] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const catRef = useRef<HTMLDivElement>(null);
  const mewBubbleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const catPos = useRef({ x: 0, y: 0 });
  const lastMouseMove = useRef(0);
  const hasSaidMew = useRef(false);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<CatState>("walking");
  const facingLeftRef = useRef(true);

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    catPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePos.current = { ...catPos.current };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseMove.current = Date.now();
      hasSaidMew.current = false;
      if (mewTextRef.current) {
        mewTextRef.current = null;
        setMewText(null);
      }
      if (stateRef.current !== "walking") {
        stateRef.current = "walking";
        setCatState("walking");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Blink — randomly every 3-6s when idle/sitting
    const blinkInterval = setInterval(() => {
      if (stateRef.current === "idle" || stateRef.current === "sitting") {
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 150);
      }
    }, 3000 + Math.random() * 3000);

    // Walk animation — toggle frame every 180ms
    const walkAnimInterval = setInterval(() => {
      if (stateRef.current === "walking") {
        setWalkFrame((f) => (f === 0 ? 1 : 0));
      }
    }, 180);

    const animate = () => {
      // The cat chases the ACTUAL mouse position — not an offset.
      // This is the key difference: the cat runs TOWARD where the
      // mouse is, trailing behind. If the mouse keeps moving, the
      // cat never catches up.
      const dx = mousePos.current.x - catPos.current.x;
      const dy = mousePos.current.y - catPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Facing — cat faces toward the mouse
      const newFacingLeft = dx < 0;
      if (Math.abs(dx) > 3 && newFacingLeft !== facingLeftRef.current) {
        facingLeftRef.current = newFacingLeft;
        setFacingLeft(newFacingLeft);
      }

      // Lerp — SLOW (0.045). The cat takes several seconds to cross
      // the screen. If the user moves the mouse every 1-2 seconds,
      // the cat will never catch up — it just keeps running toward
      // where the mouse was.
      const lerp = 0.045;
      catPos.current.x += dx * lerp;
      catPos.current.y += dy * lerp;

      // Update cat DOM position
      if (catRef.current) {
        catRef.current.style.transform = `translate(${catPos.current.x - 24}px, ${catPos.current.y - 24}px)`;
      }

      // Update mew bubble position (imperative, no re-renders)
      if (mewBubbleRef.current) {
        mewBubbleRef.current.style.transform = `translate(${catPos.current.x - 30}px, ${catPos.current.y - 50}px)`;
      }

      // State transitions
      const timeSinceMove = Date.now() - lastMouseMove.current;

      // When the cat is close to the mouse AND the mouse has stopped
      // → sit down beside the cursor and say "mew mew".
      // The "beside" offset is applied only at this point — the cat
      // has been chasing the actual mouse position, and now that it's
      // close, it settles to a position beside the cursor.
      if (dist < 15 && timeSinceMove > 300) {
        if (stateRef.current === "walking") {
          // Apply the "beside" offset — shift the cat 35px to the
          // side so it sits next to the cursor, not on top of it.
          const sideOffset = facingLeftRef.current ? 35 : -35;
          catPos.current.x = mousePos.current.x + sideOffset;
          catPos.current.y = mousePos.current.y;

          stateRef.current = "sitting";
          setCatState("sitting");

          if (!hasSaidMew.current) {
            hasSaidMew.current = true;
            mewTextRef.current = "mew mew";
            setMewText("mew mew");
            window.setTimeout(() => {
              mewTextRef.current = null;
              setMewText(null);
            }, 2500);
          }

          // Transition to idle after 3s
          window.setTimeout(() => {
            if (stateRef.current === "sitting") {
              stateRef.current = "idle";
              setCatState("idle");
            }
          }, 3000);
        }
      } else if (dist > 25 || timeSinceMove < 300) {
        // Mouse is moving or cat is still far → keep walking
        if (stateRef.current !== "walking") {
          stateRef.current = "walking";
          setCatState("walking");
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearInterval(blinkInterval);
      clearInterval(walkAnimInterval);
    };
  }, [isDesktop]);

  if (!mounted || !isDesktop) return null;

  const catColor = isDark ? "#ffffff" : "#2a2a3a";
  const catAccent = isDark ? "#e0e0e0" : "#1a1a2a";
  const eyeColor = isDark ? "#5eead4" : "#0891b2";
  const noseColor = "#ff9eb5";

  return (
    <>
      <div
        ref={catRef}
        className="pointer-events-none fixed left-0 top-0 z-[60]"
        style={{ width: "48px", height: "48px", willChange: "transform" }}
        aria-hidden="true"
      >
        <div style={{ transform: facingLeft ? "scaleX(1)" : "scaleX(-1)", transition: "transform 0.2s ease" }}>
          <CatSVG state={catState} walkFrame={walkFrame} blink={eyeBlink} color={catColor} accent={catAccent} eyeColor={eyeColor} noseColor={noseColor} />
        </div>
      </div>

      <AnimatePresence>
        {mewText && (
          <motion.div
            ref={mewBubbleRef}
            initial={{ scale: 0, opacity: 0, y: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="pointer-events-none fixed left-0 top-0 z-[61] select-none whitespace-nowrap rounded-lg border-2 border-white bg-black/85 px-2.5 py-1 font-display text-xs font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            style={{ transform: `translate(${catPos.current.x - 30}px, ${catPos.current.y - 50}px)` }}
            aria-hidden="true"
          >
            {mewText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CatSVG({ state, walkFrame, blink, color, accent, eyeColor, noseColor }: { state: CatState; walkFrame: number; blink: boolean; color: string; accent: string; eyeColor: string; noseColor: string }) {
  if (state === "walking") {
    return <WalkingCat walkFrame={walkFrame} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
  }
  return <SittingCat blink={blink} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
}

function WalkingCat({ walkFrame, color, accent, eyeColor, noseColor }: { walkFrame: number; color: string; accent: string; eyeColor: string; noseColor: string }) {
  const bodyY = walkFrame === 0 ? 26 : 27;
  const tailWave = walkFrame === 0 ? 0 : 2;

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={`M 10 ${bodyY + 4} Q 2 ${bodyY - 2 + tailWave} 5 ${bodyY - 10 + tailWave}`} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="20" cy={bodyY + 6} rx="12" ry="8" fill={color} />
      <ellipse cx="20" cy={bodyY + 9} rx="8" ry="4" fill={accent} opacity="0.3" />
      <rect x="24" y={bodyY + 10} width="3" height="6" rx="1.5" fill={color} />
      <rect x="28" y={bodyY + 10} width="3" height="6" rx="1.5" fill={color} />
      <rect x="12" y={bodyY + 10} width="3" height="6" rx="1.5" fill={color} />
      <rect x="16" y={bodyY + 10} width="3" height="6" rx="1.5" fill={color} />
      <circle cx="32" cy={bodyY} r="8" fill={color} />
      <path d={`M 27 ${bodyY - 5} L 26 ${bodyY - 11} L 30 ${bodyY - 7} Z`} fill={color} />
      <path d={`M 34 ${bodyY - 6} L 36 ${bodyY - 12} L 37 ${bodyY - 6} Z`} fill={color} />
      <path d={`M 28 ${bodyY - 6} L 27.5 ${bodyY - 9} L 29.5 ${bodyY - 7} Z`} fill={noseColor} opacity="0.5" />
      <path d={`M 35 ${bodyY - 7} L 36 ${bodyY - 10} L 36.5 ${bodyY - 7} Z`} fill={noseColor} opacity="0.5" />
      <ellipse cx="36" cy={bodyY - 1} rx="1.5" ry="2" fill={eyeColor} />
      <circle cx="36.3" cy={bodyY - 1} r="0.8" fill="#000" />
      <circle cx="36.5" cy={bodyY - 1.5} r="0.3" fill="#fff" />
      <circle cx="39" cy={bodyY + 1} r="0.8" fill={noseColor} />
      <path d={`M 38 ${bodyY + 3} Q 39 ${bodyY + 4} 40 ${bodyY + 3}`} stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />
      <line x1="37" y1={bodyY + 2} x2="42" y2={bodyY + 1.5} stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="37" y1={bodyY + 3} x2="42" y2={bodyY + 3} stroke={accent} strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

function SittingCat({ blink, color, accent, eyeColor, noseColor }: { blink: boolean; color: string; accent: string; eyeColor: string; noseColor: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 34 Q 6 32 8 26 Q 10 22 16 24" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="24" cy="34" rx="11" ry="9" fill={color} />
      <ellipse cx="24" cy="37" rx="7" ry="5" fill={accent} opacity="0.3" />
      <ellipse cx="19" cy="42" rx="3" ry="2" fill={color} />
      <ellipse cx="29" cy="42" rx="3" ry="2" fill={color} />
      <circle cx="24" cy="20" r="10" fill={color} />
      <path d="M 16 14 L 14 6 L 21 12 Z" fill={color} />
      <path d="M 32 14 L 34 6 L 27 12 Z" fill={color} />
      <path d="M 17 13 L 16 9 L 19.5 12 Z" fill={noseColor} opacity="0.5" />
      <path d="M 31 13 L 32 9 L 28.5 12 Z" fill={noseColor} opacity="0.5" />
      {blink ? (
        <>
          <line x1="19" y1="20" x2="22" y2="20" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="26" y1="20" x2="29" y2="20" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="20.5" cy="20" rx="1.5" ry="2" fill={eyeColor} />
          <circle cx="20.7" cy="20" r="0.8" fill="#000" />
          <circle cx="20.9" cy="19.5" r="0.3" fill="#fff" />
          <ellipse cx="27.5" cy="20" rx="1.5" ry="2" fill={eyeColor} />
          <circle cx="27.7" cy="20" r="0.8" fill="#000" />
          <circle cx="27.9" cy="19.5" r="0.3" fill="#fff" />
        </>
      )}
      <path d="M 23 24 L 25 24 L 24 25.5 Z" fill={noseColor} />
      <path d="M 24 25.5 Q 22 27 20.5 26" stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />
      <path d="M 24 25.5 Q 26 27 27.5 26" stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />
      <line x1="15" y1="23" x2="20" y2="24" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="15" y1="25" x2="20" y2="25" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="33" y1="23" x2="28" y2="24" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="33" y1="25" x2="28" y2="25" stroke={accent} strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}
