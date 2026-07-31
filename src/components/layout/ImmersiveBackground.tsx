/**
 * ImmersiveBackground — multi-layer animated background.
 *
 * Layers (back to front):
 *   1. Mesh gradient (CSS animated radial gradients)
 *   2. tsParticles (subtle connection lines)
 *   3. Floating glass blobs (framer-motion, continuous drift)
 *   4. Floating GitHub icons (slow rotation + float)
 *   5. Floating README cards (tilted glass mini-cards)
 *   6. Mouse parallax (all layers offset by smoothed mouse position)
 *   7. Soft vignette overlay
 *
 * Performance:
 *   - All layers use transform/opacity only (GPU-accelerated)
 *   - Particle count is capped and density is viewport-based
 *   - Parallax uses spring smoothing (no per-frame React state)
 *   - will-change hints on animated layers
 *
 * Accessibility:
 *   - Entire background is aria-hidden (decorative)
 *   - prefers-reduced-motion: animations are reduced to near-instant
 *     via the global CSS media query
 */

import { memo, useMemo, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import { Icon } from '@/shared/iconRegistry'

/* -------------------------------------------------------------------------- */
/* Particle layer                                                             */
/* -------------------------------------------------------------------------- */

let engineLoaded = false

const ParticlesLayer = memo(function ParticlesLayer() {
  useEffect(() => {
    if (!engineLoaded) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      }).then(() => {
        engineLoaded = true
      })
    }
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 35, density: { enable: true, width: 1920, height: 1080 } },
        color: { value: ['#8b5cf6', '#06b6d4', '#ec4899'] },
        opacity: { value: { min: 0.1, max: 0.25 } },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 150,
          color: '#8b5cf6',
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: { events: {} },
      detectRetina: true,
    }),
    [],
  )

  return (
    <Particles
      options={options}
      className="pointer-events-none absolute inset-0"
    />
  )
})

/* -------------------------------------------------------------------------- */
/* Floating blobs                                                              */
/* -------------------------------------------------------------------------- */

const BLOBS = [
  { color: 'rgba(139, 92, 246, 0.28)', size: 520, x: '-8%', y: '-5%', dur: 18, delay: 0 },
  { color: 'rgba(6, 182, 212, 0.22)', size: 460, x: '72%', y: '3%', dur: 22, delay: 2 },
  { color: 'rgba(236, 72, 153, 0.20)', size: 400, x: '58%', y: '58%', dur: 20, delay: 4 },
  { color: 'rgba(249, 115, 22, 0.16)', size: 360, x: '3%', y: '62%', dur: 24, delay: 1 },
  { color: 'rgba(59, 130, 246, 0.14)', size: 300, x: '40%', y: '30%', dur: 26, delay: 3 },
]

const BlobsLayer = memo(function BlobsLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px] will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: b.color,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
})

/* -------------------------------------------------------------------------- */
/* Floating GitHub icons                                                      */
/* -------------------------------------------------------------------------- */

const FLOATING_ICONS = [
  { x: '12%', y: '18%', size: 28, dur: 12, delay: 0 },
  { x: '85%', y: '15%', size: 22, dur: 14, delay: 1 },
  { x: '78%', y: '75%', size: 32, dur: 16, delay: 2 },
  { x: '18%', y: '70%', size: 24, dur: 13, delay: 0.5 },
  { x: '50%', y: '12%', size: 20, dur: 15, delay: 3 },
  { x: '92%', y: '45%', size: 26, dur: 17, delay: 1.5 },
  { x: '8%', y: '40%', size: 18, dur: 11, delay: 2.5 },
]

const FloatingIconsLayer = memo(function FloatingIconsLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLOATING_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-[var(--color-ink-secondary)] will-change-transform"
          style={{ left: icon.x, top: icon.y, opacity: 0.07 }}
          animate={{
            y: [0, -24, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: icon.dur,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon name="github" size={icon.size} />
        </motion.div>
      ))}
    </div>
  )
})

/* -------------------------------------------------------------------------- */
/* Floating README mini-cards                                                 */
/* -------------------------------------------------------------------------- */

const FLOATING_CARDS = [
  { x: '6%', y: '25%', rotate: -8, dur: 15, delay: 0 },
  { x: '88%', y: '30%', rotate: 6, dur: 18, delay: 2 },
  { x: '80%', y: '65%', rotate: -4, dur: 14, delay: 1 },
  { x: '4%', y: '55%', rotate: 10, dur: 16, delay: 3 },
]

const FloatingCardsLayer = memo(function FloatingCardsLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLOATING_CARDS.map((card, i) => (
        <motion.div
          key={i}
          className="absolute w-44 rounded-[var(--radius-md)] glass glass-reflect p-4 will-change-transform"
          style={{ left: card.x, top: card.y, rotate: card.rotate, opacity: 0.45 }}
          animate={{
            y: [0, -18, 0],
            rotate: [card.rotate, card.rotate + 3, card.rotate],
          }}
          transition={{
            duration: card.dur,
            delay: card.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="mb-2 h-2 w-20 rounded-full bg-[#8b5cf6]/30" />
          <div className="mb-1.5 h-1.5 w-32 rounded-full bg-[var(--color-border-strong)]" />
          <div className="mb-1.5 h-1.5 w-28 rounded-full bg-[var(--color-border-strong)]" />
          <div className="mb-3 h-1.5 w-24 rounded-full bg-[var(--color-border-strong)]" />
          <div className="flex gap-1.5">
            <div className="h-4 w-12 rounded-[var(--radius-xs)] bg-[#8b5cf6]/20" />
            <div className="h-4 w-10 rounded-[var(--radius-xs)] bg-[#06b6d4]/20" />
          </div>
        </motion.div>
      ))}
    </div>
  )
})

/* -------------------------------------------------------------------------- */
/* Main component with mouse parallax                                          */
/* -------------------------------------------------------------------------- */

export function ImmersiveBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  const blobX = useTransform(springX, [-1, 1], [-20, 20])
  const blobY = useTransform(springY, [-1, 1], [-20, 20])
  const iconX = useTransform(springX, [-1, 1], [-15, 15])
  const iconY = useTransform(springY, [-1, 1], [-15, 15])
  const cardX = useTransform(springX, [-1, 1], [-30, 30])
  const cardY = useTransform(springY, [-1, 1], [-30, 30])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 mesh-gradient" />
      <ParticlesLayer />
      <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0">
        <BlobsLayer />
      </motion.div>
      <motion.div style={{ x: iconX, y: iconY }} className="absolute inset-0">
        <FloatingIconsLayer />
      </motion.div>
      <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0">
        <FloatingCardsLayer />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(247, 248, 252, 0.4) 100%)',
        }}
      />
    </div>
  )
}
