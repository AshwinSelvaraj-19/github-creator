/**
 * FooterSection — glass footer with animated divider and floating socials.
 *
 * Accessibility:
 *   - Semantic <footer> with aria-label
 *   - Social links have descriptive aria-labels
 *   - Navigation links are keyboard-focusable with visible focus rings
 *   - Heading hierarchy is correct (h2 > h4)
 *
 * Motion:
 *   - Staggered fade-up on scroll-in
 *   - Animated gradient divider sweeps across the top
 *   - Spring-based hover lift on social icons
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer, hoverSocial } from '@/animations/variants'

const SOCIALS: { icon: IconName; href: string; label: string }[] = [
  { icon: 'github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'globe', href: 'https://example.com', label: 'Website' },
]

const LINKS: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Templates', to: '/templates' },
  { label: 'Builder', to: '/builder' },
]

export function FooterSection() {
  return (
    <motion.footer
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative mt-32"
      aria-label="Footer"
    >
      {/* Animated gradient divider */}
      <div className="relative mx-auto max-w-7xl px-6" aria-hidden="true">
        <div className="relative h-px overflow-hidden">
          <div className="absolute inset-0 bg-[var(--color-border-strong)]" />
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
          />
        </div>
      </div>

      {/* Footer content */}
      <div className="glass-strong mt-px rounded-t-[var(--radius-xl)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Brand */}
            <motion.div variants={fadeUp}>
              <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label="README Forge home">
                <img src="/assets/logo.svg" alt="" className="h-9 w-9 rounded-lg" />
                <span className="text-xl font-bold text-gradient">README Forge</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                The premium way to design your GitHub identity. Crafted with care,
                powered by Python.
              </p>
            </motion.div>

            {/* Links */}
            <motion.nav variants={fadeUp} className="flex flex-col gap-3" aria-label="Footer navigation">
              <h4 className="text-sm font-bold text-[var(--color-ink-primary)]">Navigate</h4>
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-sm text-sm text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>

            {/* Socials */}
            <motion.div variants={fadeUp}>
              <h4 className="mb-4 text-sm font-bold text-[var(--color-ink-primary)]">Connect</h4>
              <div className="flex gap-3">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    {...hoverSocial}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-secondary)] transition-colors hover:text-[#8b5cf6]"
                    aria-label={`Visit us on ${social.label}`}
                  >
                    <Icon name={social.icon} size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-strong)] pt-8 sm:flex-row"
          >
            <p className="text-sm text-[var(--color-ink-muted)]">
              Built with React, Three.js &amp; Pyodide. Open source.
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              © {new Date().getFullYear()} README Forge
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
