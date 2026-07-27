/**
 * TemplatesCarousel — horizontal scrolling carousel of template previews.
 *
 * Each card:
 *   - 3D tilt on mouse move (perspective transform)
 *   - Scale up on hover
 *   - Gradient glow shadow
 *   - Glass reflection overlay
 *   - Click navigates to builder with that template selected
 *
 * The carousel auto-scrolls subtly and snaps to cards. Uses native scroll
 * with hidden scrollbar for smooth, accessible scrolling.
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/shared/iconRegistry'
import { GlassBadge } from '@/components/ui'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { templateRegistry } from '@/templates/registry'
import { useBuilder, useTemplates } from '@/store/selectors'


export function TemplatesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { setTemplate } = useBuilder()
  const { setSelectedTemplate } = useTemplates()

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  const titleX = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x, y })
  }, [])

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
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink-primary)]"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              onClick={() => scrollByAmount(340)}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink-primary)]"
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8"
      >
        {templateRegistry.map((template, i) => (
          <motion.div
            key={template.id}
            variants={fadeUp}
            className="shrink-0 snap-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoveredId(template.id)}
            onMouseLeave={() => {
              setHoveredId(null)
              setTilt({ x: 0, y: 0 })
            }}
          >
            <Link
              to="/builder"
              onClick={() => handleSelect(template.id)}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="perspective-1000"
              >
                <div
                  className="preserve-3d glass-reflect relative h-80 w-72 overflow-hidden rounded-[var(--radius-lg)] glass"
                  style={{
                    transform:
                      hoveredId === template.id
                        ? `rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg)`
                        : 'rotateY(0) rotateX(0)',
                    transition: 'transform 0.15s ease-out',
                    boxShadow:
                      hoveredId === template.id
                        ? `0 25px 70px ${template.theme.accent}30`
                        : 'var(--shadow-glass)',
                  }}
                >
                  {/* Preview background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${template.theme.accent}18, ${template.theme.accent}05)`,
                    }}
                  />

                  {/* Template emoji */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-90">
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

                  {/* Glow on hover */}
                  {hoveredId === template.id && (
                    <motion.div
                      layoutId="carousel-glow"
                      className="absolute inset-0 rounded-[var(--radius-lg)]"
                      style={{
                        background: `radial-gradient(circle at ${50 + tilt.x * 30}% ${50 + tilt.y * 30}%, ${template.theme.accent}15, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Step number */}
                  <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/60 text-xs font-bold text-[var(--color-ink-secondary)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
