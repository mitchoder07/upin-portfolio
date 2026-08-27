"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ===== CatCursor =====
// A well-drawn SVG cat that follows the mouse cursor on desktop only.
//
// Behavior (inspired by nehalingole.in):
//   • When the mouse moves, the cat RUNS toward the mouse position.
//     The running animation has leg movement (frame-based), the body
//     bounces slightly, and the cat rotates to face the direction
//     it's running.
//   • When the mouse stops, the cat catches up and SITS down beside
//     the cursor (not on top of it). It transitions from the running
//     pose to a sitting pose, then says "mew mew" once.
//   • The cat goes idle (sitting, occasionally blinking) until the
//     mouse moves again.
//   • Color: white in dark mode, dark gray in light mode — so it's
//     always visible against the background.
//   • Only active on viewports >= 1024px (desktop). Touch devices
//     don't have a cursor to follow.
//
// The cat is drawn as inline SVG so it's crisp at any size and the
// color can be themed via CSS variables.

type CatState = "idle" | "running" | "sitting";

export function CatCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [catState, setCatState] = useState<CatState>("idle");
  const [mewText, setMewText] = useState<string | null>(null);
  const [runFrame, setRunFrame] = useState(0); // 0 or 1 for leg animation
  const [facingLeft, setFacingLeft] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const catRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const catPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const lastMouseMove = useRef(0);
  const hasSaidMew = useRef(false);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<CatState>("idle");

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Initialize cat at center-right of screen (away from hero text)
    catPos.current = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5 };
    targetPos.current = { ...catPos.current };
    mousePos.current = { ...catPos.current };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // The cat targets a position slightly BESIDE the cursor (offset
      // by 30px to the left or right depending on direction) so it
      // doesn't sit directly on top of the cursor.
      targetPos.current = { x: e.clientX, y: e.clientY };
      lastMouseMove.current = Date.now();
      hasSaidMew.current = false;
      if (mewText) setMewText(null);
      if (stateRef.current !== "running") {
        stateRef.current = "running";
        setCatState("running");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Blink animation — randomly blink every 3-6 seconds when idle
    const blinkInterval = setInterval(() => {
      if (stateRef.current === "idle" || stateRef.current === "sitting") {
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 150);
      }
    }, 3000 + Math.random() * 3000);

    // Running leg animation — toggle frame every 120ms when running
    const runAnimInterval = setInterval(() => {
      if (stateRef.current === "running") {
        setRunFrame((f) => (f === 0 ? 1 : 0));
      }
    }, 120);

    // Main animation loop
    const animate = () => {
      const dx = targetPos.current.x - catPos.current.x;
      const dy = targetPos.current.y - catPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Determine facing direction
      if (Math.abs(dx) > 2) {
        setFacingLeft(dx < 0);
      }

      // Lerp toward target — faster when far, slower when close
      const lerp = dist > 100 ? 0.08 : 0.12;
      catPos.current.x += dx * lerp;
      catPos.current.y += dy * lerp;

      // Update DOM position
      if (catRef.current) {
        // Offset the cat so it sits BESIDE the cursor, not on top.
        // When facing left, cat is to the right of cursor; when facing
        // right, cat is to the left. This way the cat "approaches"
        // the cursor from behind/beside.
        const offsetX = facingLeft ? 35 : -35;
        const offsetY = -10;
        catRef.current.style.transform = `translate(${catPos.current.x + offsetX - 32}px, ${catPos.current.y + offsetY - 32}px)`;
      }

      // State transitions
      const timeSinceMove = Date.now() - lastMouseMove.current;

      if (dist < 8 && timeSinceMove > 200) {
        // Cat has caught up and mouse stopped → sit down
        if (stateRef.current !== "sitting" && stateRef.current !== "idle") {
          stateRef.current = "sitting";
          setCatState("sitting");
          // Say "mew mew" once
          if (!hasSaidMew.current) {
            hasSaidMew.current = true;
            setTimeout(() => {
              setMewText("mew mew");
              setTimeout(() => setMewText(null), 2000);
            }, 400); // small delay so the sit animation finishes first
          }
          // Transition to idle after sitting for 2s
          setTimeout(() => {
            if (stateRef.current === "sitting") {
              stateRef.current = "idle";
              setCatState("idle");
            }
          }, 2000);
        }
      } else if (dist > 15 && timeSinceMove < 200) {
        // Mouse is moving → run
        if (stateRef.current !== "running") {
          stateRef.current = "running";
          setCatState("running");
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearInterval(blinkInterval);
      clearInterval(runAnimInterval);
    };
  }, [isDesktop, mewText, facingLeft]);

  if (!mounted || !isDesktop) return null;

  // Cat color — white in dark mode, dark gray in light mode
  const catColor = isDark ? "#ffffff" : "#2a2a3a";
  const catAccent = isDark ? "#e0e0e0" : "#1a1a2a";
  const eyeColor = isDark ? "#5eead4" : "#0891b2";
  const noseColor = "#ff9eb5";

  return (
    <>
      <div
        ref={catRef}
        className="pointer-events-none fixed left-0 top-0 z-[60]"
        style={{
          width: "64px",
          height: "64px",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
            transition: "transform 0.15s ease",
          }}
        >
          <CatSVG
            state={catState}
            runFrame={runFrame}
            blink={eyeBlink}
            color={catColor}
            accent={catAccent}
            eyeColor={eyeColor}
            noseColor={noseColor}
          />
        </div>
      </div>

      {/* "mew mew" speech bubble */}
      <AnimatePresence>
        {mewText && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="pointer-events-none fixed z-[61] select-none rounded-lg border-2 border-white bg-black/85 px-3 py-1.5 font-display text-sm font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            style={{
              left: catPos.current + 30,
              top: catPos.current - 35,
            }}
            aria-hidden="true"
          >
            {mewText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ===== CatSVG =====
// A well-drawn SVG cat with three poses: running (2 frames), sitting,
// and idle (standing/blinking). The cat is drawn side-profile so the
// running animation looks natural.
//
// Color is passed in as props so it adapts to the theme.

function CatSVG({
  state,
  runFrame,
  blink,
  color,
  accent,
  eyeColor,
  noseColor,
}: {
  state: CatState;
  runFrame: number;
  blink: boolean;
  color: string;
  accent: string;
  eyeColor: string;
  noseColor: string;
}) {
  // The SVG is drawn in a 64x64 viewBox. The cat faces right by default.
  // The parent div flips it with scaleX(-1) when facingLeft is true.

  if (state === "running") {
    return <RunningCat runFrame={runFrame} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
  }
  if (state === "sitting") {
    return <SittingCat blink={false} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
  }
  // idle
  return <SittingCat blink={blink} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
}

// ===== Running Cat =====
// Side-profile cat in mid-stride. Two frames alternate for the leg
// animation. The body bounces up and down slightly (handled by CSS).
function RunningCat({ runFrame, color, accent, eyeColor, noseColor }: { runFrame: number; color: string; accent: string; eyeColor: string; noseColor: string }) {
  // Frame 0: front legs forward, back legs back
  // Frame 1: front legs back, back legs forward
  const frontLegY = runFrame === 0 ? 44 : 48;
  const backLegY = runFrame === 0 ? 48 : 44;
  const frontLegX = runFrame === 0 ? 38 : 32;
  const backLegX = runFrame === 0 ? 20 : 26;

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tail — curved and pointing up/back when running */}
      <path
        d="M 14 36 Q 6 30 8 22 Q 10 16 16 18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Back legs */}
      <ellipse cx={backLegX} cy={backLegY + 4} rx="3" ry="6" fill={color} transform={`rotate(${runFrame === 0 ? -20 : 20} ${backLegX} ${backLegY})`} />
      <ellipse cx={backLegX + 3} cy={backLegY + 6} rx="2.5" ry="5" fill={accent} transform={`rotate(${runFrame === 0 ? -30 : 10} ${backLegX + 3} ${backLegY})`} />

      {/* Body — elongated ellipse, side profile */}
      <ellipse cx="28" cy="36" rx="16" ry="10" fill={color} />

      {/* Belly highlight */}
      <ellipse cx="28" cy="40" rx="12" ry="5" fill={accent} opacity="0.4" />

      {/* Front legs */}
      <ellipse cx={frontLegX} cy={frontLegY + 4} rx="3" ry="6" fill={color} transform={`rotate(${runFrame === 0 ? 20 : -20} ${frontLegX} ${frontLegY})`} />
      <ellipse cx={frontLegX + 3} cy={frontLegY + 6} rx="2.5" ry="5" fill={accent} transform={`rotate(${runFrame === 0 ? 30 : -10} ${frontLegX + 3} ${frontLegY})`} />

      {/* Head — circle, side profile, looking forward */}
      <circle cx="42" cy="28" r="10" fill={color} />

      {/* Ears — two triangles */}
      <path d="M 36 22 L 34 14 L 40 20 Z" fill={color} />
      <path d="M 44 20 L 46 12 L 48 20 Z" fill={color} />
      {/* Inner ears */}
      <path d="M 37 21 L 36 17 L 39 20 Z" fill={noseColor} opacity="0.5" />
      <path d="M 45 19 L 46 15 L 47 19 Z" fill={noseColor} opacity="0.5" />

      {/* Eye — side profile, one eye visible */}
      <ellipse cx="46" cy="27" rx="2" ry="2.5" fill={eyeColor} />
      <circle cx="46.5" cy="27" r="1" fill="#000" />
      {/* Eye shine */}
      <circle cx="46.8" cy="26.5" r="0.5" fill="#fff" />

      {/* Nose */}
      <path d="M 50 29 L 52 29 L 51 31 Z" fill={noseColor} />

      {/* Mouth — small smile */}
      <path d="M 50 32 Q 51 33 52 32" stroke={accent} strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <line x1="48" y1="30" x2="54" y2="29" stroke={accent} strokeWidth="0.5" opacity="0.6" />
      <line x1="48" y1="31" x2="54" y2="31" stroke={accent} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

// ===== Sitting Cat =====
// Cat sitting down, facing forward (3/4 view). Used for both "sitting"
// (just caught up to mouse) and "idle" (waiting) states. The blink
// prop toggles the eyes closed.
function SittingCat({ blink, color, accent, eyeColor, noseColor }: { blink: boolean; color: string; accent: string; eyeColor: string; noseColor: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tail — curled around the body when sitting */}
      <path
        d="M 16 44 Q 10 42 12 36 Q 14 32 20 34"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Body — rounded, sitting posture */}
      <ellipse cx="32" cy="42" rx="14" ry="12" fill={color} />

      {/* Belly */}
      <ellipse cx="32" cy="46" rx="9" ry="7" fill={accent} opacity="0.3" />

      {/* Front paws — two small ovals at the bottom */}
      <ellipse cx="26" cy="52" rx="3.5" ry="2.5" fill={color} />
      <ellipse cx="38" cy="52" rx="3.5" ry="2.5" fill={color} />

      {/* Head — circle, forward-facing */}
      <circle cx="32" cy="26" r="12" fill={color} />

      {/* Ears — two triangles on top */}
      <path d="M 22 20 L 20 10 L 28 18 Z" fill={color} />
      <path d="M 42 20 L 44 10 L 36 18 Z" fill={color} />
      {/* Inner ears — pink */}
      <path d="M 23 19 L 22 14 L 26 18 Z" fill={noseColor} opacity="0.5" />
      <path d="M 41 19 L 42 14 L 38 18 Z" fill={noseColor} opacity="0.5" />

      {/* Eyes — two, forward-facing */}
      {blink ? (
        <>
          <line x1="25" y1="26" x2="29" y2="26" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="26" x2="39" y2="26" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="27" cy="26" rx="2" ry="2.5" fill={eyeColor} />
          <circle cx="27.3" cy="26" r="1" fill="#000" />
          <circle cx="27.6" cy="25.5" r="0.4" fill="#fff" />

          <ellipse cx="37" cy="26" rx="2" ry="2.5" fill={eyeColor} />
          <circle cx="37.3" cy="26" r="1" fill="#000" />
          <circle cx="37.6" cy="25.5" r="0.4" fill="#fff" />
        </>
      )}

      {/* Nose — small pink triangle */}
      <path d="M 30 31 L 34 31 L 32 33 Z" fill={noseColor} />

      {/* Mouth — classic cat "ω" shape */}
      <path d="M 32 33 Q 30 35 28 34" stroke={accent} strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M 32 33 Q 34 35 36 34" stroke={accent} strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Whiskers — 2 on each side */}
      <line x1="20" y1="30" x2="26" y2="31" stroke={accent} strokeWidth="0.5" opacity="0.6" />
      <line x1="20" y1="32" x2="26" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.6" />
      <line x1="44" y1="30" x2="38" y2="31" stroke={accent} strokeWidth="0.5" opacity="0.6" />
      <line x1="44" y1="32" x2="38" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}
