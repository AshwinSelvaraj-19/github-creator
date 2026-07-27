/**
 * WorkflowSection — animated timeline showing the README creation flow.
 *
 * Accessibility:
 *   - Semantic <section> with aria-label
 *   - Ordered list semantics via <ol> for the steps
 *   - Each step is a <li> with proper heading hierarchy
 *
 * Motion:
 *   - Staggered fade-up on scroll-in
 *   - Gradient connecting line draws progressively via scrollYProgress
 *   - Spring-based hover on icon circles
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer, hoverIcon } from '@/animations/variants'

const STEPS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'sparkles', title: 'Open', desc: 'Launch the builder — no account needed.' },
  { icon: 'layout', title: 'Choose Template', desc: 'Pick from 10 handcrafted designs.' },
  { icon: 'edit', title: 'Customize', desc: 'Fill in your details with smart forms.' },
  { icon: 'eye', title: 'Preview', desc: 'Watch your README update in real time.' },
  { icon: 'copy', title: 'Copy Markdown', desc: 'One click to copy or download.' },
  { icon: 'checkCircle', title: 'Done', desc: 'Paste into your GitHub profile.' },
]

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.4'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.section
      ref={sectionRef}
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-6xl px-6 py-32"
      aria-label="Workflow timeline"
    >
      <motion.div variants={fadeUp} className="mb-20 text-center">
        <h2 className="text-4xl font-bold text-gradient md:text-5xl">
          From blank to brilliant
        </h2>
        <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
          Six steps. Under two minutes. Zero friction.
        </p>
      </motion.div>

      <div className="relative">
        {/* Animated connecting line */}
        <div className="absolute left-0 right-0 top-12 hidden h-0.5 md:block" aria-hidden="true">
          <div className="h-full bg-[var(--color-border-strong)]" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: 'left' }}
            className="absolute inset-0 h-full bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#ec4899]"
          />
        </div>

        {/* Step cards */}
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6 list-none">
          {STEPS.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp} className="relative flex flex-col items-center text-center">
              {/* Icon circle */}
              <motion.div
                {...hoverIcon}
                className="gradient-border mb-4 flex h-24 w-24 items-center justify-center rounded-full"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white/60">
                  <Icon name={step.icon} size={28} className="text-[#8b5cf6]" />
                </div>
              </motion.div>

              {/* Step number */}
              <span className="mb-1 text-xs font-bold text-[var(--color-ink-muted)]">
                Step {i + 1}
              </span>

              <h3 className="text-sm font-bold text-[var(--color-ink-primary)]">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-secondary)]">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  )
}
