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
//   1. Crosses the screen SLOWLY — 20 seconds end-to-end at a constant,
//      readable pace (no eased-in-out jerky bits in the middle that rush
//      past the copy).
//   2. Each caption is shown for ~4 seconds so the user can actually read
//      every word on both mobile and desktop before the next one swaps in.
//   3. ALL captions are shown before the tank exits — the last one ("bye!")
//      is held until the tank has fully left the frame.
//   4. Tank itself is a proper-looking military vehicle: hull, sloped
//      glacis plate, turret with hatch + commander stub, long cannon,
//      side skirt over visible road wheels, exhaust pipe, antenna.
//   5. Road wheels spin proportionally to ground speed for a sense of motion.
//   6. Caption is rendered by a SEPARATE component (TankCaption) at a fixed
//      world position above the hero copy — NOT anchored to the tank mesh.
//      This guarantees the caption is always visible at every viewport
//      size, even when the tank itself is off-screen entering / exiting.
//      Anchoring the bubble to the tank meant the bubble got clipped at
//      the screen edges on desktop ("TANK INCOMING!" showed as "DOMING!")
//      and was completely invisible on mobile during entry / exit.

// Module-level timing constants — shared between Tank (movement) and
// TankCaption (text). Defined here so both stay in sync automatically.
const TANK_CYCLE = 25; // total cycle = 20s crossing + 5s rest
const TANK_CROSS_DURATION = 20; // seconds to traverse the screen
const TANK_START_X = -13;
const TANK_END_X = 13;
const TANK_Y_POS = -1.2;
const TANK_Z_POS = -1.5;

// 5 evenly-spaced captions, 4s each, covering the full 20s crossing.
// Every caption is guaranteed to be visible for a full 4s at every
// responsive size — see TankCaption below for the always-on-screen
// fixed-position bubble that displays them.
const TANK_MESSAGES = [
  { at: 0, text: "TANK INCOMING!" },
  { at: 4, text: "passing through" },
  { at: 8, text: "don't mind me, read on" },
  { at: 12, text: "almost there" },
  { at: 16, text: "bye!" },
] as const;

function Tank() {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed % TANK_CYCLE;

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
    // (26 units of travel over 20s ≈ 1.3 u/s; wheel radius 0.18 →
    // angular velocity ≈ 1.3/0.18 ≈ 7.2 rad/s)
    const wheelSpeed = 7.2 * (t < TANK_CROSS_DURATION ? 1 : 0);
    for (const w of wheelRefs.current) {
      if (w) w.rotation.x = elapsed * wheelSpeed;
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
    </group>
  );
}

// Tank caption bubble — rendered at a FIXED world position above the hero
// copy, decoupled from the tank mesh itself.
//
// Why decoupled: when the bubble was a child of the tank group, drei's
// <Html> projected its position to wherever the tank was in 3D space. On
// desktop, the tank starts at world x=-13 (off-screen), so the projected
// bubble was at the left edge of the canvas and got clipped —
// "TANK INCOMING!" rendered as "DOMING!" because half the bubble was
// outside the viewport. On mobile (very narrow visible x range), the
// bubble was entirely off-screen during entry and exit, so the first
// and last messages were never visible.
//
// By rendering the bubble at a fixed world position above the hero copy,
// it is always on-screen at every viewport size, and all 5 messages
// are guaranteed to be readable for their full 4-second window.
//
// Responsive Y position: on narrow (mobile portrait) viewports the camera
// pulls back to z=11 with a wider 62° vFOV, so the visible world-y range
// is roughly ±6.6. We position the bubble at y=5.4 on mobile so it
// projects into the top ~18% of the viewport — clear of the hero badge
// at pt-28 (112px from top). On wide (desktop/tablet) viewports the
// camera is at z=8 with 45° vFOV, visible y range ±3.31; we use y=3.0
// so the bubble sits at the very top of the viewport, well above the
// hero content (which starts at pt-28 = 112px from top).
function TankCaption() {
  const [caption, setCaption] = useState<string | null>(null);
  const lastMsgRef = useRef<string | null>(null);
  const { size } = useThree();
  const aspect = size.width / size.height;
  // Y position per viewport class — see ResponsiveCamera above for the
  // matching (fov, z) values.
  //   • Mobile portrait (aspect < 0.9, z=11, vFOV=62°, visible y ±6.6):
  //     y = 5.4 → screen y ≈ 74px. The navbar is transparent on mobile
  //     (no center nav items — `hidden lg:flex`) so the bubble is visible
  //     through the navbar area, well clear of the hero name (which starts
  //     at pt-28 = 112px).
  //   • Tablet (0.9 ≤ aspect < 1.3, z=9, vFOV=50°, visible y ±4.19):
  //     y = 3.0 → screen y ≈ 145px. Below the navbar (88px) and above the
  //     hero name (~225px on tablet).
  //   • Desktop (aspect ≥ 1.3, z=8, vFOV=45°, visible y ±3.31):
  //     y = 2.5 → screen y ≈ 110px. The navbar on desktop DOES show the
  //     center nav items (About / Skills / Projects / etc.), so we push
  //     the bubble just below the navbar (88px) rather than behind it.
  //     Lands in the empty space between the navbar bottom and the hero
  //     badge (which is on the left, so no horizontal overlap with the
  //     horizontally-centered bubble).
  const bubbleY = aspect < 0.9 ? 5.4 : aspect < 1.3 ? 3.0 : 2.5;

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed % TANK_CYCLE;

    // Resolve the caption for the current time. Only setState when it
    // actually changes — calling setCaption every frame would re-render
    // the bubble 60x/sec and tank performance on low-end devices.
    let currentMessage: string | null = null;
    for (let i = 0; i < TANK_MESSAGES.length; i++) {
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

  return (
    <ComicBubble
      text={caption}
      size="tank"
      position={[0, bubbleY, 0]}
      rotate={-3}
    />
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