/**
 * App-wide constants.
 *
 * Centralizes values that are referenced across multiple modules — nav links,
 * social platforms, skill suggestions, default configs. Keeping them here
 * prevents duplication and makes changes a one-line edit.
 */

import type { IconName } from '@/shared/iconRegistry'

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/templates', label: 'Templates' },
  { to: '/builder', label: 'Builder' },
] as const

export const BUILDER_STEPS = [
  { id: 'profile', label: 'Profile', icon: 'sparkles' as IconName },
  { id: 'education', label: 'Education', icon: 'graduation' as IconName },
  { id: 'about', label: 'About', icon: 'info' as IconName },
  { id: 'typing', label: 'Typing', icon: 'type' as IconName },
  { id: 'appearance', label: 'Appearance', icon: 'palette' as IconName },
  { id: 'sections', label: 'Sections', icon: 'layout' as IconName },
  { id: 'projects', label: 'Projects', icon: 'code' as IconName },
  { id: 'social', label: 'Social', icon: 'link' as IconName },
] as const

export const SOCIAL_PLATFORMS = [
  'github', 'linkedin', 'twitter', 'youtube', 'instagram', 'website',
] as const

export const SKILL_SUGGESTIONS: Record<string, string[]> = {
  languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust'],
  frontend: ['React', 'Vue', 'Svelte', 'Tailwind', 'Next.js', 'Vite'],
  backend: ['Node.js', 'FastAPI', 'Django', 'Express', 'PostgreSQL', 'Redis'],
  databases: ['PostgreSQL', 'MongoDB', 'Supabase', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Docker', 'Kubernetes', 'Vercel', 'Cloudflare'],
  tools: ['Git', 'Figma', 'VS Code', 'Vim', 'Linux'],
}

export const DEFAULT_ACCENT_COLOR = '8B5CF6'
export const TYPING_FONTS = ['Inter', 'Fira Code', 'JetBrains Mono', 'Roboto Mono'] as const
export const MAX_HISTORY = 50
export const AUTOSAVE_DELAY = 2000
