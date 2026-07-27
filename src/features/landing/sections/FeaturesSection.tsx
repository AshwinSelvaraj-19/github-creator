/**
 * FeaturesSection — premium feature cards with glow and gradient borders.
 *
 * Each card:
 *   - Glass background with animated gradient border
 *   - Lifts on hover with glow shadow
 *   - Animated icon in a gradient circle
 *   - Staggered scroll-in entrance
 */

import { motion } from 'framer-motion'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer } from '@/animations/variants'

interface Feature {
  icon: IconName
  title: string
  desc: string
  glow: string
}

const FEATURES: Feature[] = [
  {
    icon: 'sparkles',
    title: '10 Premium Templates',
    desc: 'From neumorphism to auroraism — each handcrafted with distinct visual identity and widget styles.',
    glow: 'shadow-[0_20px_60px_rgba(139,92,246,0.2)]',
  },
  {
    icon: 'eye',
    title: 'Live Preview',
    desc: 'See your README update in real time as you type. No guessing, no refreshing, no surprises.',
    glow: 'shadow-[0_20px_60px_rgba(6,182,212,0.2)]',
  },
  {
    icon: 'code',
    title: 'Python Powered',
    desc: 'The generator runs entirely in your browser via Pyodide. No server, no API, no data leaves your machine.',
    glow: 'shadow-[0_20px_60px_rgba(236,72,153,0.2)]',
  },
  {
    icon: 'zap',
    title: 'Instant Export',
    desc: 'One click to copy markdown or download README.md. Paste directly into your GitHub profile.',
    glow: 'shadow-[0_20px_60px_rgba(249,115,22,0.2)]',
  },
  {
    icon: 'palette',
    title: 'Fully Customizable',
    desc: 'Accent colors, typing animations, section toggles, social links, projects — control every detail.',
    glow: 'shadow-[0_20px_60px_rgba(139,92,246,0.2)]',
  },
  {
    icon: 'history',
    title: 'Auto-Save History',
    desc: 'Your work is saved locally. Browse past generations and restore any version instantly.',
    glow: 'shadow-[0_20px_60px_rgba(6,182,212,0.2)]',
  },
]

export function FeaturesSection() {
  return (
    <motion.section
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-6xl px-6 py-32"
    >
      <motion.div variants={fadeUp} className="mb-20 text-center">
        <h2 className="text-4xl font-bold text-gradient md:text-5xl">
          Everything you need
        </h2>
        <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
          Thoughtfully designed features that make README creation feel effortless.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className={`gradient-border-animated h-full rounded-[var(--radius-lg)] p-8 transition-shadow duration-500 group-hover:${feature.glow}`}>
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20"
              >
                <Icon name={feature.icon} size={26} className="text-[#8b5cf6]" />
              </motion.div>

              <h3 className="mb-3 text-xl font-bold text-[var(--color-ink-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                {feature.desc}
              </p>

              {/* Hover glow line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-8 right-8 h-px origin-left bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
