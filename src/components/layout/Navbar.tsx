import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Sun, Moon, Sparkles } from 'lucide-react'
import { useThemeStore } from '@/store/theme.store'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/templates', label: 'Templates' },
  { to: '/builder', label: 'Builder' },
]

export function Navbar() {
  const { mode, toggle } = useThemeStore()
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-strong border-b border-white/40"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold text-gradient">README Forge</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-[var(--color-ink-primary)]'
                    : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
          >
            <Github size={18} />
          </a>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-secondary)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)]"
          >
            {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles size={15} />
            Launch
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
