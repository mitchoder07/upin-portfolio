"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Lightformer,
  Sparkles,
  Trail,
  Html,
  TorusKnot,
  Icosahedron,
  Octahedron,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { Component, Suspense, useRef, useMemo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Mesh } from "three";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Catches any hard failure from Environment's network-fetched HDR (not just
// a slow load) so it can never take down the rest of the 3D scene.
class SilentErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function FloatingShape({
  position,
  color,
  geometry,
  speed = 1,
  scale = 1,
  emissiveBoost = 1,
  opacity = 1,
}: {
  position: [number, number, number];
  color: string;
  geometry: "knot" | "ico" | "oct";
  speed?: number;
  scale?: number;
  emissiveBoost?: number;
  opacity?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15 * speed;
    ref.current.rotation.y = t * 0.2 * speed;
  });

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={0.4}
      floatIntensity={1.2}
      floatingRange={[-0.15, 0.15]}
    >
      {geometry === "knot" && (
        <TorusKnot ref={ref} args={[1, 0.35, 200, 32]} position={position} scale={scale}>
          <MeshDistortMaterial
            color={color}
            roughness={0.15}
            metalness={0.85}
            distort={0.3}
            speed={2}
            emissive={color}
            emissiveIntensity={0.35 * emissiveBoost}
            transparent
            opacity={opacity}
          />
        </TorusKnot>
      )}
      {geometry === "ico" && (
        <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
          <MeshDistortMaterial
            color={color}
            roughness={0.05}
            metalness={0.95}
            distort={0.4}
            speed={1.5}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </Icosahedron>
      )}
      {geometry === "oct" && (
        <Octahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            distort={0.2}
            speed={2.5}
            emissive={color}
            emissiveIntensity={0.45}
          />
        </Octahedron>
      )}
    </Float>
  );
}

function ParticleField() {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#5eead4"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function MouseParallax() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (pointer.x * 2 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 2 - camera.position.y) * 0.03;
    /* eslint-enable react-hooks/immutability */
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// A comic-book style text bubble anchored to a 3D position. Renders as real
// DOM text (via Html) so it always stays crisp and legible, never a blurry
// texture baked into the canvas, with a bouncy pop-in/pop-out.
// Three size tiers:
//   - "normal": shooting star captions (compact)
//   - "large": reactive shape captions (bigger)
//   - "tank": tank captions — biggest & boldest, sized to be readable on
//             mobile through desktop. On mobile we use text-base (16px)
//             rather than text-sm (14px) so the longest caption
//             "don't mind me, read on" is comfortably readable when the
//             bubble is rotated. Still fits inside a 360px viewport.
// `rotate` lets each instance choose its tilt — the tank bubble uses a
// gentler -3° (vs the comic -6° on shooting stars) so the longer tank
// messages stay closer to horizontal and easier to read at small sizes.
function ComicBubble({
  text,
  size = "normal",
  position = [0, 0, 0],
  rotate = -6,
}: {
  text: string | null;
  size?: "normal" | "large" | "tank";
  position?: [number, number, number];
  rotate?: number;
}) {
  const sizeClasses =
    size === "tank"
      ? "text-base sm:text-lg md:text-xl lg:text-2xl font-black px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 tracking-wide"
      : size === "large"
      ? "text-sm sm:text-lg md:text-xl font-black px-4 py-2 sm:px-5 sm:py-2.5"
      : "text-sm sm:text-base md:text-lg font-bold px-3 py-1.5 sm:px-4 sm:py-2";

  return (
    <Html
      position={position}
      center
      distanceFactor={9}
      zIndexRange={[30, 0]}
      style={{ pointerEvents: "none" }}
    >
      <AnimatePresence>
        {text && (
          <motion.div
            key={text}
            initial={{ scale: 0, rotate: rotate - 6, opacity: 0 }}
            animate={{ scale: 1, rotate, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            className={`select-none whitespace-nowrap rounded-lg border-2 border-white bg-black/85 font-display tracking-wide text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] ${sizeClasses}`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}

// A single playful "pew pew" streak — darts once across the background,
// popping up a comic-style caption as it fires, then goes idle for a while
// before firing again. Paths are kept on the right/upper side of the scene
// (positive x, away from the text column on the left) so the trail never
// crosses over the hero copy.
// dartDuration bumped to 2.5s so the caption stays on screen long enough
// to actually read on both mobile and desktop.
function ShootingStar({
  start,
  end,
  color,
  cycle,
  delay,
  caption,
  dartDuration = 2.5,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  cycle: number;
  delay: number;
  caption: string;
  dartDuration?: number;
}) {
  const ref = useRef<Mesh>(null);
  const from = useMemo(() => new THREE.Vector3(...start), [start]);
  const to = useMemo(() => new THREE.Vector3(...end), [end]);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.getElapsedTime() + delay) % cycle;
    const isActive = t <= dartDuration;
    if (isActive !== active) setActive(isActive);
    if (!isActive) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const eased = 1 - Math.pow(1 - t / dartDuration, 3);
    ref.current.position.lerpVectors(from, to, eased);
  });

  return (
    <Trail width={2.5} length={5} color={color} attenuation={(w) => w * w} decay={2}>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
        <ComicBubble text={active ? caption : null} size="large" position={[0, 0.6, 0]} />
      </mesh>
    </Trail>
  );
}

function ShootingStars() {
  return (
    <>
      {/* Original shooting stars with longer duration */}
      <ShootingStar start={[3.5, 3, -2]} end={[6.5, 0.5, -3]} color="#5eead4" cycle={8} delay={0} caption="PEW!" />
      <ShootingStar start={[6, 2.5, -1]} end={[2.5, -1.5, -2]} color="#e879f9" cycle={10} delay={2.5} caption="ZAP!" />
      <ShootingStar start={[1.5, 3.5, -2.5]} end={[5, 1, -1.5]} color="#a78bfa" cycle={9} delay={5} caption="PEW PEW!" />
      <ShootingStar start={[6.5, -1, -2]} end={[3, -3, -3]} color="#5eead4" cycle={11} delay={7.5} caption="WHOOSH!" />
      
      {/* NEW additional shooting stars with more variety */}
      <ShootingStar start={[4, 4, -1.5]} end={[7, 1, -2]} color="#f472b6" cycle={12} delay={1} caption="KA-POW!" />
      <ShootingStar start={[7, 3, -2.5]} end={[3, -2, -1]} color="#34d399" cycle={9.5} delay={3.5} caption="BAM!" />
      <ShootingStar start={[2, 4.5, -2]} end={[6, 0.5, -1]} color="#fbbf24" cycle={10.5} delay={6} caption="BOOM!" />
      <ShootingStar start={[5, 3.5, -1]} end={[1, -2.5, -2]} color="#60a5fa" cycle={13} delay={8} caption="WHAM!" />
      <ShootingStar start={[3, 5, -2.5]} end={[6.5, 2, -1.5]} color="#f87171" cycle={8.5} delay={4.5} caption="CRASH!" />
      <ShootingStar start={[6.5, 4, -1]} end={[2, 0, -2]} color="#a3e635" cycle={11.5} delay={9} caption="KAPOW!" />
    </>
  );
}

// The comic relief: a little shape that periodically "gets hit" by a
// passing shot, panics, and bolts away in a full dramatic overreaction —
// before sheepishly sneaking back to its spot a moment later. Runs on a
// fixed loop rather than true collision detection, so the timing is always
// predictable and never chaotic.
function ReactiveShape({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const phaseRef = useRef<"idle" | "hit" | "fleeing" | "returning">("idle");

  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);
  const fleePos = useMemo(
    () => new THREE.Vector3(position[0] + 3.2, position[1] + 2, position[2] - 2.5),
    [position]
  );

  const CYCLE = 9;
  const HIT_AT = 5.5;
  const HIT_DURATION = 0.35;
  const FLEE_DURATION = 1.3;
  const RETURN_DURATION = 1.4;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    meshRef.current.rotation.x = elapsed * 0.15;
    meshRef.current.rotation.y = elapsed * 0.2;

    const t = elapsed % CYCLE;

    if (t < HIT_AT) {
      if (phaseRef.current !== "idle") {
        phaseRef.current = "idle";
        setCaption(null);
      }
      groupRef.current.position.copy(basePos);
      groupRef.current.rotation.z = 0;
    } else if (t < HIT_AT + HIT_DURATION) {
      if (phaseRef.current !== "hit") {
        phaseRef.current = "hit";
        setCaption("OW!");
      }
      const shakeT = (t - HIT_AT) / HIT_DURATION;
      groupRef.current.position.set(
        basePos.x + Math.sin(shakeT * 50) * 0.09,
        basePos.y + Math.cos(shakeT * 45) * 0.09,
        basePos.z
      );
    } else if (t < HIT_AT + HIT_DURATION + FLEE_DURATION) {
      if (phaseRef.current !== "fleeing") {
        phaseRef.current = "fleeing";
        setCaption("Nooo, I'm out!");
      }
      const fleeT = (t - HIT_AT - HIT_DURATION) / FLEE_DURATION;
      const eased = 1 - Math.pow(1 - fleeT, 2);
      groupRef.current.position.lerpVectors(basePos, fleePos, eased);
      groupRef.current.rotation.z = eased * Math.PI * 1.5;
    } else {
      if (phaseRef.current !== "returning") {
        phaseRef.current = "returning";
        setCaption("...okay, back now.");
      }
      const retT = (t - HIT_AT - HIT_DURATION - FLEE_DURATION) / RETURN_DURATION;
      const eased = retT * retT;
      groupRef.current.position.lerpVectors(fleePos, basePos, eased);
      groupRef.current.rotation.z = (1 - eased) * Math.PI * 1.5;
      if (retT > 0.85 && phaseRef.current === "returning") {
        setCaption(null);
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Octahedron ref={meshRef} args={[1, 0]} scale={0.4}>
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={2.5}
          emissive={color}
          emissiveIntensity={0.45}
        />
      </Octahedron>
      <ComicBubble text={caption} size="large" position={[0, 0.6, 0]} />
    </group>
  );
}

// Tank that slowly passes through the scene with sequential comic messages.
//
// DESIGN GOALS (per user spec):
//   1. Crosses the screen SLOWLY — 32 seconds end-to-end at a constant,
//      readable pace (no eased-in-out jerky bits in the middle that rush
//      past the copy).
//   2. Each caption is shown for ~4 seconds so the user can actually read
//      every word on both mobile and desktop before the next one swaps in.
//   3. ALL captions are shown before the tank exits — the last one ("bye!")
//      is held until the tank has fully left the frame at every viewport.
//   4. Tank itself is a proper-looking military vehicle: hull, sloped
//      glacis plate, turret with hatch + commander stub, long cannon,
//      side skirt over visible road wheels, exhaust pipe, antenna.
//   5. Road wheels spin proportionally to ground speed for a sense of motion.
//   6. Caption bubble FOLLOWS THE TANK (anchored to the tank group, so it
//      looks like the tank is the one saying each line), EXCEPT for the
//      first message ("TANK INCOMING!") which is the announcement made
//      BEFORE the tank enters the frame. The announcement bubble is
//      rendered separately at a fixed top-center position so it is always
//      readable while the tank is still off-screen entering.
//   7. The tank-anchored bubble uses a SMOOTH SIDE-FLIP — when the tank
//      is on the left half of the screen, the bubble sits to the RIGHT
//      of the tank; when the tank is on the right half, the bubble sits
//      to the LEFT. This keeps the bubble closer to the screen center
//      and prevents it from getting clipped at the screen edges when the
//      tank is near either side.
//   8. Path length and crossing duration are calibrated so that ALL 5
//      follow-messages (t = 4–24s) fit inside the tank's visible window
//      on the SMALLEST viewport (mobile portrait, visible x range ±3.03
//      world units). Tank enters mobile view at t ≈ 4.5s, exits at t ≈ 24.9s,
//      so every message gets its full 4-second read.

// Module-level timing constants — shared between Tank (movement), the
// tank-anchored follow bubble, and TankCaption (the announcement bubble),
// and the Tanjiro man.
//
// SCENE CYCLE STRUCTURE (55 seconds total):
//   t = 0–32s    : Tank crosses the screen (messages 1–6 play)
//   t = 32–35s   : Tank rests just off-screen (3s post-tank silence)
//   t = 35–47.5s : Tanjiro man enters from left, runs around, pauses at
//                  center to wink, says "tanjiro wa doko?" (where is
//                  tanjiro? in Japanese transliteration), then shouts
//                  "tanjiro!!!" and exits right
//   t = 47.5–55s : Brief final rest before the whole cycle loops
//
// All scene elements use the same `elapsed % SCENE_CYCLE` clock so they
// stay in sync automatically.
//
// Tanjiro phase breakdown (12.5 seconds total — extended from 7.5s after
// user feedback that it was "going too fast" and the wink wasn't visible):
//   Phase 1 (enter, 4s)   : X: -8 → 0, Y bobs in a sine wave. Bubble shows
//                            "tanjiro!" then "tanjiro!!".
//   Phase 2 (wink, 2.5s)  : X = 0, Y = 0. Right eye scales Y → 0.05 for
//                            a clearly visible wink (extended from 1.5s
//                            to 2.5s so the wink is unmissable).
//   Phase 3 (post-wink, 2s): Still at X = 0. Bubble shows
//                            "tanjiro wa doko?" — Tanjiro looking around
//                            for his brother.
//   Phase 4 (exit, 4s)    : X: 0 → 8, Y bobs in a sine wave. Bubble
//                            shows "tanjiro!!!" as he runs off-screen.
const SCENE_CYCLE = 55; // total cycle = 32s tank + 3s rest + 12.5s man + 7.5s rest
const TANK_CROSS_DURATION = 32; // seconds for the tank to traverse the screen
const TANK_START_X = -8;
const TANK_END_X = 8;
const TANK_Y_POS = -1.2;
const TANK_Z_POS = -1.5;

// Tanjiro man timing — enters 3s after the tank fully exits the path,
// runs for 12.5s, then 7.5s of rest before the cycle loops.
const TANJIRO_START = 35; // t=35s, 3s after tank finishes at t=32s
const TANJIRO_ENTER_DURATION = 4;   // 4s enter (slower, was 3s)
const TANJIRO_PAUSE_DURATION = 2.5; // 2.5s pause for a clearly visible wink (was 1.5s)
const TANJIRO_POST_WINK_DURATION = 2; // 2s post-wink: bubble shows "tanjiro wa doko?"
const TANJIRO_EXIT_DURATION = 4;   // 4s exit (slower, was 3s)
const TANJIRO_END = TANJIRO_START + TANJIRO_ENTER_DURATION + TANJIRO_PAUSE_DURATION + TANJIRO_POST_WINK_DURATION + TANJIRO_EXIT_DURATION; // = 47.5s

// 6 messages total:
//   - Message 1 ("TANK INCOMING!") at t=0–4s is the ANNOUNCEMENT — rendered
//     by TankCaption at a fixed top-center position (tank still entering).
//   - Messages 2–6 are the tank's "dialogue" while it visibly crosses the
//     screen — rendered by the tank-anchored bubble inside the Tank group.
// "this is kinda sick ngl" is the playful message inserted before
// "almost there" — the tank complimenting the site as it passes through
// (modern casual slang, puts a smile on the viewer's face).
const TANK_MESSAGES = [
  { at: 0, text: "TANK INCOMING!" },
  { at: 4, text: "passing through" },
  { at: 8, text: "don't mind me, read on" },
  { at: 12, text: "this is kinda sick ngl" },
  { at: 16, text: "almost there" },
  { at: 20, text: "bye!" },
] as const;

// First index that's a "follow" message (vs the announcement at index 0).
const TANK_FOLLOW_START_INDEX = 1;

function Tank() {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);
  // Caption for the follow messages (messages 2–6). The first message
  // ("TANK INCOMING!") is handled separately by TankCaption.
  const [caption, setCaption] = useState<string | null>(null);
  const lastMsgRef = useRef<string | null>(null);
  // Bubble wrapper group — its X position is updated IMPERATIVELY every
  // frame via this ref (no React state, no re-renders). This is what makes
  // the bubble glide smoothly with the tank on mobile — previously the
  // bubble's offset was React state that only committed when the value had
  // moved by ≥0.2 world units, which caused visible "stepping" / lag on
  // mobile (the bubble would jump every ~0.4s instead of moving
  // continuously). With an imperative ref, we write directly to the
  // three.js object's position every frame, so the bubble tracks the
  // tank perfectly with zero React overhead.
  const bubbleGroupRef = useRef<THREE.Group>(null);
  // Viewport-dependent side-flip behaviour. Mobile portrait has a very
  // narrow visible x range (~±3.03 world units, vs ~±6.3 on desktop) so
  // the bubble would get clipped at the screen edges when the tank is
  // near either side. On mobile we use multiplier 1.0 + clamp ±5 — the
  // bubble's world X cancels out the tank's X for tankX ∈ [-5, 5], so
  // the bubble stays at the screen center (always visible) and only
  // drifts toward the tank when the tank is at the very edges. On
  // desktop / tablet the wider visible range gives the bubble room to
  // actually follow the tank, so we use multiplier 0.5 + clamp ±2.5 —
  // the bubble trails the tank at half amplitude, giving the proper
  // "tank is saying it" feel without getting clipped.
  const { size } = useThree();
  const aspect = size.width / size.height;
  const bubbleMultiplier = aspect < 0.9 ? 1.0 : 0.5;
  const bubbleMaxOffset = aspect < 0.9 ? 5 : 2.5;

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed % SCENE_CYCLE;

    // Linear progress while crossing, then hold at 1.0 during the rest
    // period so the tank sits just off-screen before looping.
    const progress = t < TANK_CROSS_DURATION ? t / TANK_CROSS_DURATION : 1;

    // Pure linear interpolation — no easing — so the tank never "rushes"
    // through the middle and the caption timing stays predictable.
    groupRef.current.position.x = TANK_START_X + (TANK_END_X - TANK_START_X) * progress;
    groupRef.current.position.y = TANK_Y_POS;
    groupRef.current.position.z = TANK_Z_POS;

    // Subtle bobbing for mechanical "weight" feel.
    groupRef.current.rotation.z = Math.sin(elapsed * 2.2) * 0.015;
    groupRef.current.position.y = TANK_Y_POS + Math.sin(elapsed * 4) * 0.015;

    // Spin road wheels in proportion to ground speed.
    // (16 units of travel over 32s = 0.5 u/s; wheel radius 0.18 →
    // angular velocity ≈ 0.5/0.18 ≈ 2.78 rad/s)
    const wheelSpeed = 2.78 * (t < TANK_CROSS_DURATION ? 1 : 0);
    for (const w of wheelRefs.current) {
      if (w) w.rotation.x = elapsed * wheelSpeed;
    }

    // ---- Side-flip bubble offset (imperative, every frame) ----
    // Smoothly interpolate the bubble's X offset based on the tank's X.
    // When tank is far left (X < 0), bubble sits to the right of the tank
    // (positive offset, towards screen center).
    // When tank is far right (X > 0), bubble sits to the left of the tank
    // (negative offset, towards screen center).
    // The multiplier and maxOffset are viewport-dependent (see comments
    // above the function) — mobile uses multiplier=1.0 / clamp=5 so the
    // bubble's X cancels out the tank's X and stays at screen center
    // (preventing clipping in mobile's narrow visible-x window), while
    // desktop uses multiplier=0.5 / clamp=2.5 so the bubble trails the
    // tank at half amplitude for the "tank is saying it" feel.
    //
    // IMPERATIVE: write directly to the bubble group's position.x every
    // frame — no React state, no re-renders, perfectly smooth on mobile.
    const tankX = groupRef.current.position.x;
    const targetOffset = Math.max(
      -bubbleMaxOffset,
      Math.min(bubbleMaxOffset, -tankX * bubbleMultiplier)
    );
    if (bubbleGroupRef.current) {
      bubbleGroupRef.current.position.x = targetOffset;
    }

    // ---- Resolve the follow-message caption ----
    // Loop from the FOLLOW_START_INDEX (skip "TANK INCOMING!") so the
    // tank-anchored bubble only renders the "dialogue" messages while the
    // tank is actually on screen. The last message ("bye!") covers the
    // final stretch up to the end of the crossing.
    let currentMessage: string | null = null;
    for (let i = TANK_FOLLOW_START_INDEX; i < TANK_MESSAGES.length; i++) {
      const start = TANK_MESSAGES[i].at;
      const end = i + 1 < TANK_MESSAGES.length ? TANK_MESSAGES[i + 1].at : TANK_CROSS_DURATION;
      if (t >= start && t < end) {
        currentMessage = TANK_MESSAGES[i].text;
        break;
      }
    }
    if (currentMessage !== lastMsgRef.current) {
      lastMsgRef.current = currentMessage;
      setCaption(currentMessage);
    }
  });

  // Military green palette — high metalness for the metal bits, matte
  // for the rubber tracks/wheels, slightly emissive so the tank reads
  // against the dark space background without being a flat silhouette.
  const hullColor = "#3f5c3a";
  const turretColor = "#4a6b43";
  const barrelColor = "#2c3a26";
  const trimColor = "#1c2818";
  const trackColor = "#161a13";
  const wheelColor = "#262b1f";
  const metalMat = (color: string, opts: { emissive?: string; emissiveIntensity?: number; rough?: number } = {}) =>
    ({
      color,
      roughness: opts.rough ?? 0.55,
      metalness: 0.65,
      emissive: opts.emissive ?? color,
      emissiveIntensity: opts.emissiveIntensity ?? 0.12,
    } as const);

  return (
    <group ref={groupRef} position={[TANK_START_X, TANK_Y_POS, TANK_Z_POS]}>
      {/* ---------- Hull ---------- */}
      {/* Lower hull — main box */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.5, 1.3]} />
        <meshStandardMaterial {...metalMat(hullColor)} />
      </mesh>

      {/* Sloped glacis plate at the front (positive x = front) */}
      <mesh position={[1.15, 0.18, 0]} rotation={[0, 0, -Math.PI / 4.5]} castShadow>
        <boxGeometry args={[0.55, 0.5, 1.25]} />
        <meshStandardMaterial {...metalMat(hullColor, { rough: 0.5 })} />
      </mesh>

      {/* Rear deck — flat sloped plate at the back */}
      <mesh position={[-1.15, 0.18, 0]} rotation={[0, 0, Math.PI / 4.5]} castShadow>
        <boxGeometry args={[0.55, 0.5, 1.25]} />
        <meshStandardMaterial {...metalMat(hullColor, { rough: 0.5 })} />
      </mesh>

      {/* Fenders / side skirts over the tracks — left + right */}
      <mesh position={[0, -0.05, 0.78]} castShadow>
        <boxGeometry args={[2.3, 0.08, 0.25]} />
        <meshStandardMaterial {...metalMat(trimColor, { rough: 0.7 })} />
      </mesh>
      <mesh position={[0, -0.05, -0.78]} castShadow>
        <boxGeometry args={[2.3, 0.08, 0.25]} />
        <meshStandardMaterial {...metalMat(trimColor, { rough: 0.7 })} />
      </mesh>

      {/* ---------- Turret ---------- */}
      {/* Turret ring / base */}
      <mesh position={[0.05, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.15, 16]} />
        <meshStandardMaterial {...metalMat(trimColor, { rough: 0.4 })} />
      </mesh>
      {/* Turret body — slab-sided, slightly tapered front */}
      <mesh position={[0.05, 0.55, 0]} castShadow>
        <boxGeometry args={[1.1, 0.4, 1.0]} />
        <meshStandardMaterial {...metalMat(turretColor)} />
      </mesh>
      {/* Sloped front of turret — looks armored */}
      <mesh position={[0.62, 0.55, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
        <boxGeometry args={[0.4, 0.4, 1.0]} />
        <meshStandardMaterial {...metalMat(turretColor, { rough: 0.5 })} />
      </mesh>

      {/* Commander hatch on top of turret */}
      <mesh position={[0.1, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.1, 12]} />
        <meshStandardMaterial {...metalMat("#2c3a26", { rough: 0.35 })} />
      </mesh>
      {/* Tiny commander stub (just for character) */}
      <mesh position={[0.1, 0.92, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#1a1f12" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* ---------- Main gun ---------- */}
      {/* Gun mantlet — block where barrel meets turret */}
      <mesh position={[1.0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial {...metalMat(trimColor, { rough: 0.4 })} />
      </mesh>
      {/* Main barrel — long cylinder */}
      <mesh position={[1.85, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 1.5, 16]} />
        <meshStandardMaterial {...metalMat(barrelColor, { rough: 0.35 })} />
      </mesh>
      {/* Muzzle brake — slight bulge at the end */}
      <mesh position={[2.62, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 16]} />
        <meshStandardMaterial {...metalMat(barrelColor, { rough: 0.3 })} />
      </mesh>

      {/* ---------- Tracks + road wheels ---------- */}
      {/* Track base — long rounded box running along each side */}
      <mesh position={[0, -0.18, 0.7]} castShadow>
        <boxGeometry args={[2.4, 0.32, 0.18]} />
        <meshStandardMaterial
          color={trackColor}
          roughness={0.9}
          metalness={0.2}
          emissive="#0a0d07"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, -0.18, -0.7]} castShadow>
        <boxGeometry args={[2.4, 0.32, 0.18]} />
        <meshStandardMaterial
          color={trackColor}
          roughness={0.9}
          metalness={0.2}
          emissive="#0a0d07"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Road wheels — 5 per side, evenly spaced. Wheels SPIN on their
          local X axis (cylinder default axis is Y, so we rotate the mesh
          90° on Z to lay it on its side, then spin on X to roll). */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((xOff, i) => (
        <group key={`wheel-${i}`}>
          <mesh
            ref={(m) => {
              if (m) wheelRefs.current[i] = m;
            }}
            position={[xOff, -0.2, 0.7]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.18, 0.18, 0.12, 12]} />
            <meshStandardMaterial
              color={wheelColor}
              roughness={0.6}
              metalness={0.5}
              emissive={wheelColor}
              emissiveIntensity={0.08}
            />
          </mesh>
          <mesh
            ref={(m) => {
              if (m) wheelRefs.current[i + 5] = m;
            }}
            position={[xOff, -0.2, -0.7]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.18, 0.18, 0.12, 12]} />
            <meshStandardMaterial
              color={wheelColor}
              roughness={0.6}
              metalness={0.5}
              emissive={wheelColor}
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>
      ))}

      {/* Drive sprockets — slightly bigger, at the rear of each track */}
      <mesh position={[-1.05, -0.15, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.14, 10]} />
        <meshStandardMaterial {...metalMat("#1a1f12", { rough: 0.4 })} />
      </mesh>
      <mesh position={[-1.05, -0.15, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.14, 10]} />
        <meshStandardMaterial {...metalMat("#1a1f12", { rough: 0.4 })} />
      </mesh>

      {/* Idler wheels at the front (slightly larger) */}
      <mesh position={[1.05, -0.15, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.14, 10]} />
        <meshStandardMaterial {...metalMat("#1a1f12", { rough: 0.4 })} />
      </mesh>
      <mesh position={[1.05, -0.15, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.14, 10]} />
        <meshStandardMaterial {...metalMat("#1a1f12", { rough: 0.4 })} />
      </mesh>

      {/* ---------- Detail bits ---------- */}
      {/* Exhaust pipe sticking out the back-left */}
      <mesh position={[-1.18, 0.15, 0.4]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 10]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.4} />
      </mesh>

      {/* Antenna — thin tall stick on the turret */}
      <mesh position={[0.45, 1.2, 0.3]}>
        <cylinderGeometry args={[0.012, 0.018, 1.0, 6]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Headlight — small emissive disc on the glacis */}
      <mesh position={[1.32, 0.1, 0.35]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial
          color="#f5f5dc"
          emissive="#fff8a0"
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>

      {/* ---------- Follow-message speech bubble ----------
          Anchored to the tank group so it MOVES WITH the tank — visually
          reads as the tank itself saying each line ("passing through",
          "don't mind me, read on", etc). The horizontal X offset is set
          IMPERATIVELY every frame via bubbleGroupRef (no React state,
          no re-renders) so the bubble glides smoothly with the tank on
          mobile — previously the throttled state caused visible
          "stepping" every ~0.4s as the bubble jumped to its new offset.
          Vertical offset y=1.6 puts the bubble's anchor well above the
          turret (the turret top is at y≈0.78), giving the bubble room to
          pop in/out without overlapping the tank geometry. */}
      <group ref={bubbleGroupRef} position={[0, 1.6, 0]}>
        <ComicBubble
          text={caption}
          size="tank"
          position={[0, 0, 0]}
          rotate={-3}
        />
      </group>
    </group>
  );
}

// Tank caption bubble — the "TANK INCOMING!" announcement, rendered at a
// FIXED world position above the hero copy. Decoupled from the tank mesh
// because the announcement is meant to play BEFORE the tank enters the
// frame (tank still off-screen on mobile, just entering on desktop).
//
// Only the first message (t = 0–4s) is shown by this component. The
// follow-messages ("passing through", "don't mind me, read on", etc.) are
// rendered by the tank-anchored ComicBubble inside the Tank group itself,
// so they follow the tank as it visibly crosses the screen.
//
// Responsive Y position: on narrow (mobile portrait) viewports the camera
// pulls back to z=11 with a wider 62° vFOV, so the visible world-y range
// is roughly ±6.6. We position the bubble at y=5.4 on mobile so it
// projects into the top ~18% of the viewport — clear of the hero badge
// at pt-28 (112px from top). On wide (desktop/tablet) viewports the
// camera is at z=8 with 45° vFOV, visible y range ±3.31; we use y=2.5
// so the bubble sits just below the navbar (88px) — Lands in the empty
// space between the navbar bottom and the hero badge (which is on the
// left, so no horizontal overlap with the centered bubble).
function TankCaption() {
  const [caption, setCaption] = useState<string | null>(null);
  const lastMsgRef = useRef<string | null>(null);
  const { size } = useThree();
  const aspect = size.width / size.height;
  const bubbleY = aspect < 0.9 ? 5.4 : aspect < 1.3 ? 3.0 : 2.5;

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed % SCENE_CYCLE;

    // Only show the announcement (message 0 = "TANK INCOMING!") during
    // its 4-second window. Outside that window, the bubble is null so
    // the tank-anchored follow bubble takes over without competition.
    // Only setState when it actually changes to avoid 60 re-renders/sec.
    const targetMsg = t >= 0 && t < TANK_MESSAGES[1].at
      ? TANK_MESSAGES[0].text
      : null;
    if (targetMsg !== lastMsgRef.current) {
      lastMsgRef.current = targetMsg;
      setCaption(targetMsg);
    }
  });

  return (
    <ComicBubble
      text={caption}
      size="tank"
      position={[0, bubbleY, 0]}
      rotate={-3}
    />
  );
}

// Tanjiro man — a chibi-style character with an oversized head who enters
// from the left 3 seconds after the tank exits, runs across the hero
// section shouting "tanjiro!", pauses at the center to wink at the viewer,
// then continues shouting and exits on the right.
//
// Path (within the running phase t = TANJIRO_START → TANJIRO_END):
//   Phase 1 (enter, 3s)   : X: -8 → 0, Y bobs in a sine wave for a
//                            "running around" feel rather than a straight
//                            line. Faces right.
//   Phase 2 (pause, 1.5s) : X = 0, Y = 0. Faces the viewer. Right eye
//                            scales Y → 0.1 for the wink.
//   Phase 3 (exit, 3s)    : X: 0 → 8, Y bobs in a sine wave. Faces right.
//
// Running animation: legs and arms swing on their local X axis in
// opposite phases (left leg forward when right arm forward), giving a
// proper running gait. Body bobs up-down slightly with the rhythm.
//
// Bubble messages cycle through "tanjiro!" / "tanjiro!!" / (no bubble
// during wink) / "tanjiro!!" / "tanjiro!!!".
//
// Imperial refs (groupRef, leg/arm/eye refs) are updated every frame
// with zero React state — same pattern as the tank bubble, so the
// running motion is perfectly smooth on mobile.
function TanjiroMan() {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const rightEyeGroupRef = useRef<THREE.Group>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const lastMsgRef = useRef<string | null>(null);

  // Phase boundaries (all in scene time, t).
  const ENTER_END = TANJIRO_START + TANJIRO_ENTER_DURATION;                 // 35 + 4 = 39
  const PAUSE_END = ENTER_END + TANJIRO_PAUSE_DURATION;                    // 39 + 2.5 = 41.5
  const POST_WINK_END = PAUSE_END + TANJIRO_POST_WINK_DURATION;            // 41.5 + 2 = 43.5
  // Exit runs from POST_WINK_END → TANJIRO_END (= 43.5 → 47.5)

  // Bubble messages across the running phase. The wink itself has NO
  // bubble (the wink is the action). After the wink, the man says
  // "tanjiro wa doko?" (Japanese transliteration of "where is tanjiro?")
  // — Tanjiro looking around for his brother — and then shouts
  // "tanjiro!!!" as he runs off-screen.
  const messages = [
    { at: TANJIRO_START, text: "tanjiro!" },         // 35 → 37
    { at: TANJIRO_START + 2, text: "tanjiro!!" },    // 37 → 39 (enter)
    // 39 → 41.5: pause + wink, no bubble
    { at: PAUSE_END, text: "tanjiro wa doko?" },     // 41.5 → 43.5 (post-wink, still at center)
    { at: POST_WINK_END, text: "tanjiro!!!" },       // 43.5 → 47.5 (exit, running off-screen)
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed % SCENE_CYCLE;

    // Only visible during the running phase.
    const isRunning = t >= TANJIRO_START && t < TANJIRO_END;
    groupRef.current.visible = isRunning;
    if (!isRunning) {
      // Reset caption to null when the man is off-screen.
      if (lastMsgRef.current !== null) {
        lastMsgRef.current = null;
        setCaption(null);
      }
      // Reset eye scale to open for next appearance.
      if (rightEyeGroupRef.current) {
        rightEyeGroupRef.current.scale.y = 1;
      }
      return;
    }

    const localT = t - TANJIRO_START; // 0 → 12.5 (within the running phase)

    let x: number;
    let yBob = 0;
    let isPaused = false;        // true during the wink pause
    let isPostWink = false;      // true during the post-wink "tanjiro wa doko?" phase
    let winkClosed = false;      // true = right eye closed (winking)

    if (localT < TANJIRO_ENTER_DURATION) {
      // Phase 1: enter from left, run to center.
      const phase = localT / TANJIRO_ENTER_DURATION; // 0 → 1
      x = -8 + phase * 8; // -8 → 0
      // Sine-wave Y for "running around" feel — one full wave during enter.
      yBob = 1.2 * Math.sin(phase * Math.PI * 2);
    } else if (localT < TANJIRO_ENTER_DURATION + TANJIRO_PAUSE_DURATION) {
      // Phase 2: pause at center, wink.
      isPaused = true;
      x = 0;
      yBob = 0;
      const pausePhase = (localT - TANJIRO_ENTER_DURATION) / TANJIRO_PAUSE_DURATION;
      // Wink: eye closes during the middle 75% of the (now 2.5s) pause,
      // so the closed-eye state lasts ~1.9s — clearly visible.
      winkClosed = pausePhase > 0.125 && pausePhase < 0.875;
    } else if (localT < TANJIRO_ENTER_DURATION + TANJIRO_PAUSE_DURATION + TANJIRO_POST_WINK_DURATION) {
      // Phase 3: post-wink — still at center, looking around, bubble
      // says "tanjiro wa doko?".
      isPostWink = true;
      x = 0;
      yBob = 0;
      // Small "looking around" rotation — head turns slightly left/right.
      // (No body movement, just a subtle head swivel via rotation.z.)
      // The body stays facing the viewer so the bubble is readable.
    } else {
      // Phase 4: exit, run from center to right.
      const exitPhase = (localT - TANJIRO_ENTER_DURATION - TANJIRO_PAUSE_DURATION - TANJIRO_POST_WINK_DURATION) / TANJIRO_EXIT_DURATION;
      x = exitPhase * 8; // 0 → 8
      yBob = 1.2 * Math.sin(exitPhase * Math.PI * 2);
    }

    groupRef.current.position.x = x;
    // Body bob for running. When paused (wink) or post-wink (looking around),
    // the man stands still — no bob.
    const isRunningMotion = !isPaused && !isPostWink;
    groupRef.current.position.y = -1.0 + yBob + (isRunningMotion ? Math.abs(Math.sin(elapsed * 12)) * 0.08 : 0);
    groupRef.current.position.z = -1.0;

    // Face the direction of movement (right) when running, viewer when
    // paused/post-wink (so the wink and the post-wink shout are
    // delivered to the viewer, not off to the side).
    groupRef.current.rotation.y = (isPaused || isPostWink) ? 0 : -Math.PI / 2;

    // Subtle head swivel during the post-wink phase — the man glances
    // left/right as if scanning for Tanjiro.
    if (isPostWink) {
      const lookPhase = (localT - TANJIRO_ENTER_DURATION - TANJIRO_PAUSE_DURATION) / TANJIRO_POST_WINK_DURATION;
      // Two side-to-side glances during the 2s post-wink window.
      groupRef.current.rotation.y = Math.sin(lookPhase * Math.PI * 4) * 0.35;
    }

    // Running animation — legs and arms swing in opposite phases.
    // When paused/post-wink, limbs ease back to neutral.
    const targetSwing = isRunningMotion ? Math.sin(elapsed * 12) * 0.6 : 0;
    if (leftLegRef.current) leftLegRef.current.rotation.x = targetSwing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -targetSwing;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -targetSwing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = targetSwing;

    // Wink — smoothly close the right eye (scale Y → 0.05 for a clearly
    // visible wink, was 0.1 which was too subtle to notice).
    if (rightEyeGroupRef.current) {
      const targetScaleY = winkClosed ? 0.05 : 1;
      const current = rightEyeGroupRef.current.scale.y;
      // Faster interpolation (0.35) so the wink snaps closed/open quickly.
      rightEyeGroupRef.current.scale.y = current + (targetScaleY - current) * 0.35;
    }

    // ---- Resolve the caption ----
    let currentMessage: string | null = null;
    for (let i = 0; i < messages.length; i++) {
      const start = messages[i].at;
      const end = i + 1 < messages.length ? messages[i + 1].at : TANJIRO_END;
      if (t >= start && t < end) {
        currentMessage = messages[i].text;
        break;
      }
    }
    // Suppress the bubble during the pause (the wink is the action instead).
    if (isPaused) {
      currentMessage = null;
    }
    if (currentMessage !== lastMsgRef.current) {
      lastMsgRef.current = currentMessage;
      setCaption(currentMessage);
    }
  });

  // Tanjiro's palette:
  //   • Hair: dark charcoal with red tips at the front (his signature look)
  //   • Haori: dark teal with a lighter checker-pattern band (simplified as
  //     a single strip here — full checker would require texture work)
  //   • Pants: very dark grey
  //   • Skin: warm light tone
  //   • Hanafuda earrings: gold rectangles hanging at the sides of the head
  const hairColor = "#1a1a2e";
  const hairTipColor = "#dc2626";
  const skinColor = "#f5d0a9";
  const haoriColor = "#0f4c5c";
  const haoriPatternColor = "#e5e5e5";
  const pantsColor = "#1f2937";
  const earringColor = "#fbbf24";

  return (
    <group ref={groupRef} position={[-8, -1.0, -1.0]} visible={false}>
      {/* ===== BIG HEAD (chibi proportions — head ~1 unit, body ~0.8 unit) ===== */}
      <group position={[0, 1.0, 0]}>
        {/* Hair back — dark sphere */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Hair front-top — red tips (Tanjiro's signature) */}
        <mesh position={[0, 0.35, 0.15]} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial
            color={hairTipColor}
            roughness={0.6}
            emissive={hairTipColor}
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Face — skin-colored sphere, slightly smaller, pushed forward */}
        <mesh position={[0, -0.05, 0.12]} castShadow>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>

        {/* Left eye (always open) — BIG so the wink on the right eye is
            clearly visible by comparison. White sphere + dark pupil. */}
        <group position={[-0.15, -0.02, 0.42]}>
          <mesh>
            <sphereGeometry args={[0.09, 14, 14]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </group>
        {/* Right eye — wrapped in a group whose scale.y is animated for
            the wink. Same size as the left eye so the wink (eye
            flattening to a thin line) is unmissable. */}
        <group ref={rightEyeGroupRef} position={[0.15, -0.02, 0.42]}>
          <mesh>
            <sphereGeometry args={[0.09, 14, 14]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </group>

        {/* Mouth — small dark sphere, looks like shouting */}
        <mesh position={[0, -0.22, 0.42]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color="#2c1810" />
        </mesh>

        {/* Hanafuda earrings — gold rectangles hanging on both sides of the head */}
        <mesh position={[-0.5, 0.05, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.08]} />
          <meshStandardMaterial
            color={earringColor}
            roughness={0.4}
            metalness={0.3}
            emissive={earringColor}
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.5, 0.05, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.08]} />
          <meshStandardMaterial
            color={earringColor}
            roughness={0.4}
            metalness={0.3}
            emissive={earringColor}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* ===== Body — small dark teal haori (Tanjiro's signature jacket) ===== */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.5, 0.55, 0.35]} />
        <meshStandardMaterial color={haoriColor} roughness={0.7} />
      </mesh>
      {/* Checker-pattern strip on the haori — simplified as a thin lighter band */}
      <mesh position={[0, 0.25, 0.18]}>
        <boxGeometry args={[0.5, 0.15, 0.01]} />
        <meshStandardMaterial color={haoriPatternColor} roughness={0.8} />
      </mesh>

      {/* ===== Arms — two small cylinders that swing during running ===== */}
      <mesh ref={leftArmRef} position={[-0.32, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color={haoriColor} roughness={0.7} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.32, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color={haoriColor} roughness={0.7} />
      </mesh>

      {/* ===== Legs — two small cylinders, swing opposite phases ===== */}
      <mesh ref={leftLegRef} position={[-0.15, -0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={pantsColor} roughness={0.8} />
      </mesh>
      <mesh ref={rightLegRef} position={[0.15, -0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={pantsColor} roughness={0.8} />
      </mesh>

      {/* ===== Speech bubble — anchored above the big head ===== */}
      <ComicBubble
        text={caption}
        size="tank"
        position={[0, 2.0, 0]}
        rotate={-3}
      />
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const cam = camera as THREE.PerspectiveCamera;
    if (aspect < 0.9) {
      // Narrow/portrait viewport (most phones) — pull the camera back and
      // widen the FOV so shapes spread across x aren't cramped or clipped.
      cam.fov = 62;
      cam.position.z = 11;
    } else if (aspect < 1.3) {
      // Tablets / narrow desktop windows
      cam.fov = 50;
      cam.position.z = 9;
    } else {
      cam.fov = 45;
      cam.position.z = 8;
    }
    cam.updateProjectionMatrix();
  }, [size, camera]);
  return null;
}

export function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <PerformanceMonitor>
        <AdaptiveDpr pixelated={false} />
      </PerformanceMonitor>
      <ResponsiveCamera />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#e879f9" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#5eead4" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            <FloatingShape
              position={[-2.8, 0.5, -1.5]}
              color="#0f766e"
              geometry="knot"
              scale={0.85}
              speed={0.8}
              emissiveBoost={0.3}
              opacity={0.55}
            />
            <FloatingShape
              position={[2.5, -0.5, -1]}
              color="#e879f9"
              geometry="ico"
              scale={0.7}
              speed={1.1}
            />
            <ReactiveShape position={[0.5, 1.8, -2]} color="#a78bfa" />
            <FloatingShape
              position={[-1.2, -1.6, -1.5]}
              color="#22d3ee"
              geometry="ico"
              scale={0.3}
              speed={1.6}
            />
            <FloatingShape
              position={[1.8, 1.2, 1]}
              color="#f0abfc"
              geometry="oct"
              scale={0.25}
              speed={1.3}
            />
          </group>
        </Float>

        <ParticleField />

        <Sparkles
          count={50}
          scale={12}
          size={2}
          speed={0.3}
          color="#5eead4"
          opacity={0.6}
        />

        <ShootingStars />
        
        {/* Tank passing through with comic messages.
            Tank handles the 3D mesh movement; TankCaption is a separate
            fixed-position bubble that guarantees all 5 captions are
            always visible on every viewport size. */}
        <Tank />
        <TankCaption />
        <TanjiroMan />

        <MouseParallax />
      </Suspense>

      {/* Generated procedurally, in-browser, via WebGL — no network fetch,
          so it can never fail to load regardless of CDN/network conditions.
          This is what gives the metallic shapes their reflections/highlights;
          previously this used Environment preset="night", which fetched an
          HDR file from an external CDN and could silently fail to load,
          leaving the high-metalness shapes with no reflections to show. */}
      <SilentErrorBoundary>
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={3}
              color="#5eead4"
              position={[0, 2, 5]}
              scale={[6, 6, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2.5}
              color="#e879f9"
              position={[-5, -1, 3]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[6, 6, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="#a78bfa"
              position={[4, -3, -2]}
              rotation={[0, -Math.PI / 4, 0]}
              scale={[5, 5, 1]}
            />
            <Lightformer
              form="ring"
              intensity={1.5}
              color="#ffffff"
              position={[0, -5, 2]}
              scale={[8, 8, 1]}
            />
          </Environment>
        </Suspense>
      </SilentErrorBoundary>
    </Canvas>
  );
}