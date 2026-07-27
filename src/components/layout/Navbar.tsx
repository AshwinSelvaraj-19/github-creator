/**
 * Navbar — top navigation bar with glass styling and active indicator.
 *
 * Accessibility:
 *   - Semantic <nav> with aria-label
 *   - Visible focus-visible rings on all interactive elements
 *   - Mobile menu toggle with aria-expanded state
 *   - Theme toggle with aria-label
 *
 * Motion:
 *   - Entrance: slide-down with premium easing
 *   - Active indicator: shared-layout spring via layoutId
 *   - Hover: spring-based lift on the Launch button
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/shared/iconRegistry'
import { useTheme } from '@/store/selectors'
import { NAV_LINKS } from '@/constants/app'
import { layoutId, fadeDown } from '@/animations/variants'
import { cn } from '@/utils/cn'

export function Navbar() {
  const { themeMode, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-strong border-b border-white/40"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg"
          aria-label="README Forge home"
        >
          <img src="/assets/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold text-gradient">README Forge</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex" role="menubar">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-[var(--color-ink-primary)]'
                    : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
                )}
              >
                {active && (
                  <motion.span
                    {...layoutId('nav-active')}
                    className="absolute inset-0 rounded-lg bg-white/60"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-secondary)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)]"
            aria-label="View source on GitHub"
          >
            <Icon name="github" size={18} />
          </a>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-secondary)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)]"
            aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <Icon name={themeMode === 'light' ? 'moon' : 'sun'} size={18} />
          </button>
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-transform hover:-translate-y-0.5"
          >
            <Icon name="sparkles" size={16} />
            Launch
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-secondary)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-strong border-t border-white/40 px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      active
                        ? 'bg-white/60 text-[var(--color-ink-primary)]'
                        : 'text-[var(--color-ink-secondary)] hover:bg-white/40 hover:text-[var(--color-ink-primary)]',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
