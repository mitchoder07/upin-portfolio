"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Lightformer,
  Sparkles,
  TorusKnot,
  Icosahedron,
  Octahedron,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { Component, Suspense, useRef, useMemo } from "react";
import type { ReactNode } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

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
}: {
  position: [number, number, number];
  color: string;
  geometry: "knot" | "ico" | "oct";
  speed?: number;
  scale?: number;
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
            emissiveIntensity={0.35}
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
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#e879f9" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#5eead4" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            <FloatingShape
              position={[-2.5, 0.5, 0]}
              color="#5eead4"
              geometry="knot"
              scale={0.85}
              speed={0.8}
            />
            <FloatingShape
              position={[2.5, -0.5, -1]}
              color="#e879f9"
              geometry="ico"
              scale={0.7}
              speed={1.1}
            />
            <FloatingShape
              position={[0.5, 1.8, -2]}
              color="#a78bfa"
              geometry="oct"
              scale={0.4}
              speed={1.4}
            />
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