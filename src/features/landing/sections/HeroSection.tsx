/**
 * HeroSection — the landing page hero.
 *
 * Accessibility:
 *   - Semantic <section> with aria-label
 *   - h1 is a single heading (no <br> splitting)
 *   - 3D canvas is aria-hidden (decorative)
 *   - CTAs are proper links with descriptive aria-labels
 *   - Typing region has aria-live="polite" for screen readers
 *   - Scroll indicator is aria-hidden (decorative)
 *
 * Motion:
 *   - Staggered fade-up entrance with premium easing
 *   - Spring-based hover on CTA buttons
 *   - Typing animation respects prefers-reduced-motion
 *   - Scroll indicator uses a gentle infinite loop
 */

import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { GlassBadge } from '@/components/ui'
import { Icon } from '@/shared/iconRegistry'
import { useTyping } from '@/hooks/useTyping'
import { fadeUp, staggerContainer, hoverButton } from '@/animations/variants'

const HeroScene3D = lazy(() =>
  import('@/three/HeroScene3D').then((m) => ({ default: m.HeroScene3D })),
)

const TYPING_PHRASES = [
  'Beautiful by design.',
  'Powered by Python.',
  'Ten stunning templates.',
  'Copy-ready in seconds.',
]

const STATS = [
  { value: '10', label: 'Templates' },
  { value: '100%', label: 'Open Source' },
  { value: '0', label: 'Sign-up Required' },
]

export function HeroSection() {
  const { text, cursor } = useTyping(TYPING_PHRASES)

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* 3D scene — decorative, hidden from screen readers */}
      <div className="absolute inset-0 flex items-center justify-center opacity-90" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>
      </div>

      <motion.div
        variants={staggerContainer(0.12, 0.15)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <GlassBadge color="purple" className="px-4 py-2 text-sm">
            <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-[#10b981]" />
            Now with 10 premium templates
          </GlassBadge>
        </motion.div>

        {/* Headline — single h1, no <br> */}
        <motion.h1
          variants={fadeUp}
          className="text-6xl font-extrabold leading-[1.02] tracking-tight md:text-8xl lg:text-[7.5rem] text-balance"
        >
          <span className="text-gradient-animated glow-text">Design Your GitHub Identity</span>
        </motion.h1>

        {/* Typing subtitle — polite live region for screen readers */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex h-8 items-center font-mono text-lg text-[var(--color-ink-secondary)] md:text-xl"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{text}</span>
          <span
            className="ml-0.5 inline-block w-0.5 bg-[#8b5cf6]"
            style={{ height: '1.1em', opacity: cursor ? 1 : 0 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/builder" aria-label="Start building your README">
            <motion.button
              {...hoverButton}
              className="bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#06b6d4] inline-flex items-center gap-2.5 rounded-[var(--radius-sm)] px-8 py-4 text-base font-semibold text-white shadow-[var(--shadow-glow-purple)] hover:shadow-[var(--shadow-glow-multi)] transition-shadow duration-300"
            >
              <Icon name="sparkles" size={20} />
              Start Building
            </motion.button>
          </Link>
          <Link to="/templates" aria-label="Explore template gallery">
            <motion.button
              {...hoverButton}
              className="glass-premium-glow glow-border-purple inline-flex items-center gap-2.5 rounded-[var(--radius-sm)] px-8 py-4 text-base font-semibold text-[var(--color-ink-primary)] transition-shadow duration-300"
            >
              <Icon name="eye" size={20} />
              Explore Templates
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeUp} className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gradient">{stat.value}</span>
              <span className="mt-1 text-sm text-[var(--color-ink-muted)]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — decorative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[var(--color-ink-muted)]/30 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-[var(--color-ink-muted)]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
