"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ===== CatCursor =====
// A clean, simple cat that follows the mouse cursor on desktop only.
//
// Inspired by nehalingole.in — a simple white (or dark in light mode)
// cat sprite that:
//   1. CHASES the mouse at a constant, capped speed — not too fast,
//      not too slow. Because the speed is capped (not proportional
//      to distance), a fast mouse movement creates a real gap the
//      cat has to run to close, instead of snapping alongside it.
//   2. Always wants to stay BESIDE the mouse — when the mouse stops,
//      the cat catches up and sits beside it (offset to the right of
//      the cursor, facing left toward it).
//   3. When the cat catches up and the mouse has stopped, it says
//      "mew mew" in a speech bubble above its HEAD (not at a fixed
//      screen position).
//   4. Goes idle (sitting, occasional blink) until the mouse moves
//      again.
//
// The cat is drawn as clean SVG — simple, rounded, cute. Not a complex
// anatomical drawing. Think "Neko" mascot style: rounded body, pointy
// ears, simple eyes, curled tail.
//
// Color: white in dark mode, dark gray in light mode.

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
  const mewBubbleRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light"; // default dark

  const catRef = useRef<HTMLDivElement>(null);
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

    // Initialize cat at center of screen
    catPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePos.current = { ...catPos.current };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseMove.current = Date.now();
      hasSaidMew.current = false;
      // Clear mew bubble if it's showing — use ref to avoid stale closure
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

    // Blink animation — randomly blink every 3-6 seconds when idle/sitting
    const blinkInterval = setInterval(() => {
      if (stateRef.current === "idle" || stateRef.current === "sitting") {
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 150);
      }
    }, 3000 + Math.random() * 3000);

    // Walking animation — toggle frame every 130ms when walking.
    // Fast enough to read as a genuine running bound, not a slow drift.
    const walkAnimInterval = setInterval(() => {
      if (stateRef.current === "walking") {
        setWalkFrame((f) => (f === 0 ? 1 : 0));
      }
    }, 130);

    // Main animation loop
    const animate = () => {
      // The cat targets a position BESIDE the mouse cursor.
      // When facing left (mouse is to the left of cat), the cat sits
      // to the RIGHT of the cursor. When facing right, cat sits to
      // the LEFT. This way the cat always "faces" the cursor.
      //
      // Offset: 45px to the side, same Y as cursor (slightly below).
      const dx = mousePos.current.x - catPos.current.x;
      const dy = mousePos.current.y - catPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Determine facing — cat faces TOWARD the mouse
      const newFacingLeft = dx < 0;
      if (Math.abs(dx) > 3 && newFacingLeft !== facingLeftRef.current) {
        facingLeftRef.current = newFacingLeft;
        setFacingLeft(newFacingLeft);
      }

      // Target position: beside the cursor
      // If facing left (mouse is left), cat is to the RIGHT of mouse
      // If facing right (mouse is right), cat is to the LEFT of mouse
      const sideOffset = newFacingLeft ? 40 : -40;
      const targetX = mousePos.current.x + sideOffset;
      const targetY = mousePos.current.y;

      const targetDx = targetX - catPos.current.x;
      const targetDy = targetY - catPos.current.y;
      const targetDist = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

      // Move toward the target at a CONSTANT max speed (not a
      // proportional lerp). This is the key difference from before:
      // with a proportional lerp, the cat's speed scales with how
      // far away the mouse is, so a fast mouse flick made the cat
      // snap across the screen almost instantly — it looked glued
      // to the cursor instead of chasing it.
      //
      // With a capped speed, the cat can only close a fixed number
      // of pixels per frame no matter how far the mouse jumps. That
      // means a quick mouse movement creates a real, visible gap —
      // the cat has to actually run to catch up, and a viewer who
      // keeps moving the mouse can keep the cat "chasing" instead of
      // teleporting alongside it.
      const maxSpeed = 4.2; // px per frame (~250px/s at 60fps) — brisk but catchable
      const easeRadius = 30; // inside this distance, ease speed down for a soft landing

      if (targetDist > 0.5) {
        const speed =
          targetDist < easeRadius
            ? maxSpeed * (targetDist / easeRadius) // slow down as it arrives
            : maxSpeed;
        const step = Math.min(speed, targetDist); // never overshoot
        catPos.current.x += (targetDx / targetDist) * step;
        catPos.current.y += (targetDy / targetDist) * step;
      }

      // Snap to target when very close — prevents the cat from
      // oscillating around the target without ever reaching it.
      if (targetDist < 1) {
        catPos.current.x = targetX;
        catPos.current.y = targetY;
      }

      // Update DOM position — the cat div is 48x48, so offset by 24
      // to center it on catPos.
      if (catRef.current) {
        catRef.current.style.transform = `translate(${catPos.current.x - 24}px, ${catPos.current.y - 24}px)`;
      }

      // Update mew bubble position imperatively (if visible) — this
      // avoids 60 React re-renders per second from setCatScreenPos.
      if (mewBubbleRef.current) {
        mewBubbleRef.current.style.transform = `translate(${catPos.current.x - 30}px, ${catPos.current.y - 50}px)`;
      }

      // State transitions
      const timeSinceMove = Date.now() - lastMouseMove.current;

      // If the cat is close to the target AND the mouse has stopped
      if (targetDist < 12 && timeSinceMove > 250) {
        // Cat has caught up and mouse stopped → sit down
        // Only trigger the sit + mew when coming FROM walking
        if (stateRef.current === "walking") {
          stateRef.current = "sitting";
          setCatState("sitting");
          // Say "mew mew" immediately when sitting down
          if (!hasSaidMew.current) {
            hasSaidMew.current = true;
            mewTextRef.current = "mew mew";
            setMewText("mew mew");
            // Clear after 2s
            window.setTimeout(() => {
              mewTextRef.current = null;
              setMewText(null);
            }, 2000);
          }
          // Transition to idle after 2.5s of sitting
          window.setTimeout(() => {
            if (stateRef.current === "sitting") {
              stateRef.current = "idle";
              setCatState("idle");
            }
          }, 2500);
        }
      } else if (targetDist > 20 || timeSinceMove < 250) {
        // Mouse is moving or cat is far → walk
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
  }, [isDesktop]); // NOTE: mewText is intentionally NOT in the deps —
  // we don't want the effect to re-run (and reset the cat position)
  // every time mewText changes. The mewText state is handled via the
  // mewBubbleRef imperatively.

  if (!mounted || !isDesktop) return null;

  // Cat color — white in dark mode, dark gray in light mode
  const catColor = isDark ? "#ffffff" : "#2a2a3a";
  const catAccent = isDark ? "#e0e0e0" : "#1a1a2a";
  const eyeColor = isDark ? "#5eead4" : "#0891b2";
  const noseColor = "#ff9eb5";

  return (
    <>
      {/* The cat */}
      <div
        ref={catRef}
        className="pointer-events-none fixed left-0 top-0 z-[60]"
        style={{
          width: "48px",
          height: "48px",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            // The WalkingCat/SittingCat SVGs are drawn with the head
            // on the RIGHT by default (unflipped = facing right).
            // So when the cat should face LEFT (mouse is to the
            // left), we flip it — and vice versa. This was backwards
            // before, which made the cat show its back/tail to the
            // mouse instead of its face.
            transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
            transition: "transform 0.2s ease",
          }}
        >
          <CatSVG
            state={catState}
            walkFrame={walkFrame}
            blink={eyeBlink}
            color={catColor}
            accent={catAccent}
            eyeColor={eyeColor}
            noseColor={noseColor}
          />
        </div>
      </div>

      {/* "mew mew" speech bubble — positioned ABOVE the cat's head.
          Uses a ref + imperative transform updates from the RAF loop
          so it tracks the cat's position without causing React
          re-renders every frame. */}
      <AnimatePresence>
        {mewText && (
          <motion.div
            ref={mewBubbleRef}
            initial={{ scale: 0, opacity: 0, y: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="pointer-events-none fixed left-0 top-0 z-[61] select-none whitespace-nowrap rounded-lg border-2 border-white bg-black/85 px-2.5 py-1 font-display text-xs font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            style={{
              // Initial position — will be updated by RAF loop via ref.
              // left-0 top-0 + translate(x, y) from the ref.
              transform: `translate(${catPos.current.x - 30}px, ${catPos.current.y - 50}px)`,
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
// Simple, clean, cute cat — "Neko" mascot style.
// Not anatomically complex. Just: round head, pointy ears, simple
// eyes, tiny nose, body, curled tail. Two poses: walking and sitting.

function CatSVG({
  state,
  walkFrame,
  blink,
  color,
  accent,
  eyeColor,
  noseColor,
}: {
  state: CatState;
  walkFrame: number;
  blink: boolean;
  color: string;
  accent: string;
  eyeColor: string;
  noseColor: string;
}) {
  if (state === "walking") {
    return <WalkingCat walkFrame={walkFrame} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
  }
  // sitting or idle → both use the sitting pose
  return <SittingCat blink={blink} color={color} accent={accent} eyeColor={eyeColor} noseColor={noseColor} />;
}

// ===== Walking Cat =====
// A proper 2-frame "running bound" cycle — the classic cartoon-run
// silhouette: legs fully extended (reaching forward / pushing off
// behind) on the "contact" frame, then tucked in tight under the
// body on the "airborne" frame, with the whole body bouncing up and
// down between the two and the tail whipping with the motion. This
// reads as an actual run, unlike a body that just bobs 1px with
// static legs.
function WalkingCat({ walkFrame, color, accent, eyeColor, noseColor }: { walkFrame: number; color: string; accent: string; eyeColor: string; noseColor: string }) {
  const contact = walkFrame === 0; // true = legs planted/pushing off, false = airborne/tucked

  const bodyY = contact ? 28 : 23; // lower on contact, pops up when airborne — the bounce
  const bodyRx = contact ? 13 : 11; // stretches longer on contact, compacts when tucked
  const bodyRy = contact ? 7 : 8.5;
  const headCy = bodyY - 1;
  const bodyCy = bodyY + 6;

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tail — trails low behind on contact, whips up on the airborne bounce */}
      <path
        d={
          contact
            ? `M 9 ${bodyCy + 2} Q 1 ${bodyCy + 3} 3 ${bodyCy + 8}`
            : `M 9 ${bodyCy - 1} Q 1 ${bodyCy - 9} 5 ${bodyCy - 15}`
        }
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Back legs — behind the body, near the tail */}
      {contact ? (
        <>
          <line x1="16" y1={bodyCy + 3} x2="10" y2={bodyCy + 9} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <line x1="13" y1={bodyCy + 3} x2="8" y2={bodyCy + 8} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="16" y1={bodyCy + 3} x2="15" y2={bodyCy + 8} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <line x1="13" y1={bodyCy + 3} x2="13" y2={bodyCy + 7} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* Body — simple rounded shape, side profile. Stretches/compacts with the stride. */}
      <ellipse cx="21" cy={bodyCy} rx={bodyRx} ry={bodyRy} fill={color} />

      {/* Belly — slightly lighter */}
      <ellipse cx="21" cy={bodyCy + 3} rx={bodyRx - 4} ry="4" fill={accent} opacity="0.3" />

      {/* Front legs — near the head, reaching forward */}
      {contact ? (
        <>
          <line x1="27" y1={bodyCy + 3} x2="32" y2={bodyCy + 9} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1={bodyCy + 3} x2="34" y2={bodyCy + 8} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="27" y1={bodyCy + 3} x2="27" y2={bodyCy + 8} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1={bodyCy + 3} x2="30" y2={bodyCy + 7} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* Head — round, side profile, looking forward (toward cursor) */}
      <circle cx="33" cy={headCy} r="8" fill={color} />

      {/* Ears — two pointy triangles on top, flatten back slightly when running */}
      <path d={`M 28 ${headCy - 5} L ${contact ? 26 : 25} ${headCy - 11} L 31 ${headCy - 7} Z`} fill={color} />
      <path d={`M 35 ${headCy - 6} L ${contact ? 37 : 36} ${headCy - 12} L 38 ${headCy - 6} Z`} fill={color} />
      {/* Inner ears — pink */}
      <path d={`M 29 ${headCy - 6} L 28.5 ${headCy - 9} L 30.5 ${headCy - 7} Z`} fill={noseColor} opacity="0.5" />
      <path d={`M 36 ${headCy - 7} L 37 ${headCy - 10} L 37.5 ${headCy - 7} Z`} fill={noseColor} opacity="0.5" />

      {/* Eye — single eye visible in side profile, focused forward */}
      <ellipse cx="37" cy={headCy - 1} rx="1.5" ry="2" fill={eyeColor} />
      <circle cx="37.3" cy={headCy - 1} r="0.8" fill="#000" />
      <circle cx="37.5" cy={headCy - 1.5} r="0.3" fill="#fff" />

      {/* Nose — tiny pink dot */}
      <circle cx="40" cy={headCy + 1} r="0.8" fill={noseColor} />

      {/* Mouth — tiny smile */}
      <path d={`M 39 ${headCy + 3} Q 40 ${headCy + 4} 41 ${headCy + 3}`} stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />

      {/* Whiskers — swept back with the running motion */}
      <line x1="38" y1={headCy + 2} x2={contact ? 44 : 43} y2={headCy + 1} stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="38" y1={headCy + 3} x2={contact ? 44 : 43} y2={headCy + 3.5} stroke={accent} strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

// ===== Sitting Cat =====
// Simple sitting cat, facing forward (3/4 view). Cute and compact.
// The blink prop closes the eyes.
function SittingCat({ blink, color, accent, eyeColor, noseColor }: { blink: boolean; color: string; accent: string; eyeColor: string; noseColor: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tail — curled around the body */}
      <path
        d="M 12 34 Q 6 32 8 26 Q 10 22 16 24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Body — rounded, sitting posture */}
      <ellipse cx="24" cy="34" rx="11" ry="9" fill={color} />

      {/* Belly */}
      <ellipse cx="24" cy="37" rx="7" ry="5" fill={accent} opacity="0.3" />

      {/* Front paws — two small ovals */}
      <ellipse cx="19" cy="42" rx="3" ry="2" fill={color} />
      <ellipse cx="29" cy="42" rx="3" ry="2" fill={color} />

      {/* Head — round, forward-facing */}
      <circle cx="24" cy="20" r="10" fill={color} />

      {/* Ears — two pointy triangles */}
      <path d="M 16 14 L 14 6 L 21 12 Z" fill={color} />
      <path d="M 32 14 L 34 6 L 27 12 Z" fill={color} />
      {/* Inner ears */}
      <path d="M 17 13 L 16 9 L 19.5 12 Z" fill={noseColor} opacity="0.5" />
      <path d="M 31 13 L 32 9 L 28.5 12 Z" fill={noseColor} opacity="0.5" />

      {/* Eyes — two, forward-facing */}
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

      {/* Nose — tiny pink triangle */}
      <path d="M 23 24 L 25 24 L 24 25.5 Z" fill={noseColor} />

      {/* Mouth — tiny cat "ω" smile */}
      <path d="M 24 25.5 Q 22 27 20.5 26" stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />
      <path d="M 24 25.5 Q 26 27 27.5 26" stroke={accent} strokeWidth="0.6" strokeLinecap="round" fill="none" />

      {/* Whiskers — 2 on each side */}
      <line x1="15" y1="23" x2="20" y2="24" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="15" y1="25" x2="20" y2="25" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="33" y1="23" x2="28" y2="24" stroke={accent} strokeWidth="0.4" opacity="0.5" />
      <line x1="33" y1="25" x2="28" y2="25" stroke={accent} strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}
