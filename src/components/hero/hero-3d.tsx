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
function ComicBubble({ text }: { text: string | null }) {
  return (
    <Html center distanceFactor={7} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <AnimatePresence>
        {text && (
          <motion.div
            key={text}
            initial={{ scale: 0, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            className="select-none whitespace-nowrap rounded-lg border-2 border-white bg-black/85 px-2.5 py-1 font-display text-xs font-black tracking-wide text-white shadow-[2px_2px_0_rgba(0,0,0,0.5)] sm:text-sm"
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
function ShootingStar({
  start,
  end,
  color,
  cycle,
  delay,
  caption,
  dartDuration = 0.7,
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
        <ComicBubble text={active ? caption : null} />
      </mesh>
    </Trail>
  );
}

function ShootingStars() {
  return (
    <>
      <ShootingStar start={[3.5, 3, -2]} end={[6.5, 0.5, -3]} color="#5eead4" cycle={6} delay={0} caption="PEW!" />
      <ShootingStar start={[6, 2.5, -1]} end={[2.5, -1.5, -2]} color="#e879f9" cycle={7.5} delay={2.2} caption="ZAP!" />
      <ShootingStar start={[1.5, 3.5, -2.5]} end={[5, 1, -1.5]} color="#a78bfa" cycle={5.5} delay={4} caption="PEW PEW!" />
      <ShootingStar start={[6.5, -1, -2]} end={[3, -3, -3]} color="#5eead4" cycle={8} delay={5.5} caption="WHOOSH!" />
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
      <ComicBubble text={caption} />
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