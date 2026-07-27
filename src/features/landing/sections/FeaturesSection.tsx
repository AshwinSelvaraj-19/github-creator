/**
 * FeaturesSection — premium feature cards with glow and gradient borders.
 *
 * Bug fix: the original used `group-hover:${feature.glow}` which Tailwind
 * cannot detect at build time (dynamic class). Replaced with a static
 * glow class applied on hover via CSS variable.
 *
 * Accessibility:
 *   - Semantic <section> with aria-label
 *   - Feature cards in a proper list
 *   - Each card has a heading
 *
 * Motion:
 *   - Staggered fade-up on scroll-in
 *   - Spring-based hover lift
 *   - Animated gradient border (CSS)
 *   - Icon spring-scale on hover
 */

import { motion } from 'framer-motion'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer, hoverCard, hoverIcon } from '@/animations/variants'

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
    glow: '139, 92, 246',
  },
  {
    icon: 'eye',
    title: 'Live Preview',
    desc: 'See your README update in real time as you type. No guessing, no refreshing, no surprises.',
    glow: '6, 182, 212',
  },
  {
    icon: 'code',
    title: 'Python Powered',
    desc: 'The generator runs entirely in your browser via Pyodide. No server, no API, no data leaves your machine.',
    glow: '236, 72, 153',
  },
  {
    icon: 'zap',
    title: 'Instant Export',
    desc: 'One click to copy markdown or download README.md. Paste directly into your GitHub profile.',
    glow: '249, 115, 22',
  },
  {
    icon: 'palette',
    title: 'Fully Customizable',
    desc: 'Accent colors, typing animations, section toggles, social links, projects — control every detail.',
    glow: '139, 92, 246',
  },
  {
    icon: 'history',
    title: 'Auto-Save History',
    desc: 'Your work is saved locally. Browse past generations and restore any version instantly.',
    glow: '6, 182, 212',
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
      aria-label="Features"
    >
      <motion.div variants={fadeUp} className="mb-20 text-center">
        <h2 className="text-4xl font-bold text-gradient md:text-5xl">
          Everything you need
        </h2>
        <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
          Thoughtfully designed features that make README creation feel effortless.
        </p>
      </motion.div>

      <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <motion.li key={feature.title} variants={fadeUp} {...hoverCard} className="group relative">
            <div
              className="gradient-border-animated h-full rounded-[var(--radius-lg)] p-8 transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(var(--feature-glow),0.2)]"
              style={{ ['--feature-glow' as string]: feature.glow }}
            >
              {/* Icon */}
              <motion.div
                {...hoverIcon}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20"
              >
                <Icon name={feature.icon} size={24} className="text-[#8b5cf6]" />
              </motion.div>

              <h3 className="mb-3 text-xl font-bold text-[var(--color-ink-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                {feature.desc}
              </p>

              {/* Hover glow line */}
              <div className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
}
