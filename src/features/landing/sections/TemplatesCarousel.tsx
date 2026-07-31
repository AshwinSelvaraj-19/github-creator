/**
 * TemplatesCarousel — horizontal scrolling carousel of template previews.
 *
 * Accessibility:
 *   - Semantic <section> with aria-label
 *   - Scroll arrows have aria-labels
 *   - Cards are in a list with descriptive link text
 *   - Keyboard navigable (links are focusable, arrows are buttons)
 *
 * Motion:
 *   - 3D tilt on mouse move (perspective transform)
 *   - Spring-based scale on hover
 *   - Gradient glow shadow matching template accent
 *   - Staggered fade-up entrance
 *   - Title slides in on scroll
 *
 * Performance:
 *   - Tilt state is local per-card (no global re-render)
 *   - Template registry is static (no fetch)
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/shared/iconRegistry'
import { GlassBadge } from '@/components/ui'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { templateRegistry } from '@/templates/registry'
import { useBuilder, useTemplates } from '@/store/selectors'

export function TemplatesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { setTemplate } = useBuilder()
  const { setSelectedTemplate } = useTemplates()

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  const titleX = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const handleSelect = (id: string) => {
    setSelectedTemplate(id as never)
    setTemplate(id as never)
  }

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <motion.section
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-32"
      aria-label="Template gallery"
    >
      <motion.div style={{ x: titleX, opacity: titleOpacity }} className="mx-auto mb-16 max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gradient md:text-5xl">
              Ten stunning templates
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
              Hover to tilt. Click to start building.
            </p>
          </div>
          {/* Scroll arrows */}
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollByAmount(-340)}
              className="glass-premium glow-border-purple flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-secondary)] transition-all duration-300 hover:text-[var(--color-ink-primary)] hover:shadow-[var(--shadow-glow-purple)]"
              aria-label="Scroll templates left"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              onClick={() => scrollByAmount(340)}
              className="glass-premium glow-border-purple flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-secondary)] transition-all duration-300 hover:text-[var(--color-ink-primary)] hover:shadow-[var(--shadow-glow-purple)]"
              aria-label="Scroll templates right"
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="hide-scrollbar mx-auto max-w-7xl flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8"
        role="list"
      >
        {templateRegistry.map((template, i) => (
          <motion.div
            key={template.id}
            variants={fadeUp}
            className="shrink-0 snap-center"
            role="listitem"
          >
            <CarouselCard
              template={template}
              index={i}
              onSelect={handleSelect}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/* Individual card — isolated tilt state per card                             */
/* -------------------------------------------------------------------------- */

function CarouselCard({
  template,
  index,
  onSelect,
}: {
  template: (typeof templateRegistry)[number]
  index: number
  onSelect: (id: string) => void
}) {
  const tiltRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`
    el.style.boxShadow = `0 25px 70px ${template.theme.accent}30`
  }

  const handleMouseLeave = () => {
    const el = tiltRef.current
    if (!el) return
    el.style.transform = 'rotateY(0) rotateX(0)'
    el.style.boxShadow = 'var(--shadow-glass)'
  }

  return (
    <Link
      to="/builder"
      onClick={() => onSelect(template.id)}
      className="block rounded-[var(--radius-lg)]"
      aria-label={`Use ${template.name} template`}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="perspective-1000"
      >
        <div
          ref={tiltRef}
          className="preserve-3d glass-reflect relative h-80 w-72 overflow-hidden rounded-[var(--radius-lg)] glass-premium glow-border-purple"
          style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Preview background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${template.theme.accent}20, ${template.theme.accent}08)`,
            }}
            aria-hidden="true"
          />

          {/* Template emoji */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-90" aria-hidden="true">
            {template.emoji}
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--color-ink-primary)]">
                {template.name}
              </h3>
              <GlassBadge color="purple">{template.category}</GlassBadge>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-ink-secondary)]">
              {template.description}
            </p>
          </div>

          {/* Step number */}
          <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/60 text-xs font-bold text-[var(--color-ink-secondary)]" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
