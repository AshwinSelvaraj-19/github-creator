/**
 * HeroScene3D — lightweight React Three Fiber scene for the hero.
 *
 * Contains:
 *   - Floating README sheets (planes with subtle glass material)
 *   - Floating GitHub cubes (rounded boxes with soft material)
 *   - Depth of field (via drei <Float> for organic motion)
 *   - Mouse interaction (group rotates toward cursor)
 *   - Soft shadows and premium lighting
 *
 * Kept lightweight: low-poly geometry, no textures, GPU-accelerated transforms.
 */

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import * as THREE from 'three'

/* -------------------------------------------------------------------------- */
/* README sheet — a thin rounded plane that looks like a glass card           */
/* -------------------------------------------------------------------------- */

function ReadmeSheet({
  position,
  rotation,
  color,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  color: string
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <RoundedBox
        args={[1.8, 2.4, 0.08]}
        radius={0.08}
        smoothness={4}
        position={position}
        rotation={rotation}
      >
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.2}
          transmission={0.6}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </RoundedBox>
    </Float>
  )
}

/* -------------------------------------------------------------------------- */
/* GitHub cube — a small rounded box with a subtle color                       */
/* -------------------------------------------------------------------------- */

function GithubCube({
  position,
  scale = 1,
}: {
  position: [number, number, number]
  scale?: number
}) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <RoundedBox
        args={[0.6, 0.6, 0.6]}
        radius={0.12}
        smoothness={4}
        position={position}
        scale={scale}
      >
        <meshPhysicalMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
    </Float>
  )
}

/* -------------------------------------------------------------------------- */
/* Mouse-reactive group                                                        */
/* -------------------------------------------------------------------------- */

function SceneGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  const targetRot = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const damping = 1 - Math.pow(0.001, delta)
    groupRef.current.rotation.x +=
      (targetRot.current.x - groupRef.current.rotation.x) * damping * 0.5
    groupRef.current.rotation.y +=
      (targetRot.current.y - groupRef.current.rotation.y) * damping * 0.5
  })

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        targetRot.current.y = (e.clientX / window.innerWidth - 0.5) * 0.4
        targetRot.current.x = -(e.clientY / window.innerHeight - 0.5) * 0.2
      }}
    >
      {children}
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/* Full canvas                                                                 */
/* -------------------------------------------------------------------------- */

export function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, -3, -4]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[5, 3, 2]} intensity={0.4} color="#ec4899" />

        <SceneGroup>
          {/* README sheets */}
          <ReadmeSheet position={[-2.2, 0.5, -1]} rotation={[0.1, 0.3, -0.08]} color="#a78bfa" />
          <ReadmeSheet position={[0, 0, 0.5]} rotation={[0.05, 0, 0.02]} color="#67e8f9" />
          <ReadmeSheet position={[2.2, -0.3, -0.5]} rotation={[0.1, -0.3, 0.06]} color="#f0abfc" />

          {/* GitHub cubes */}
          <GithubCube position={[-3, -1.5, 0]} scale={0.7} />
          <GithubCube position={[3, 1.5, -1]} scale={0.5} />
          <GithubCube position={[1.5, -1.8, 0.8]} scale={0.4} />
          <GithubCube position={[-1.5, 1.8, -0.5]} scale={0.45} />
        </SceneGroup>

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.15}
          scale={10}
          blur={3}
          far={4}
          color="#8b5cf6"
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
