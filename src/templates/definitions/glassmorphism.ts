import type { TemplateDefinition } from '../types'

export const glassmorphism: TemplateDefinition = {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  description: 'Frosted glass cards with backdrop blur and floating orbs.',
  thumbnail: '💎',
  emoji: '💎',
  category: 'glass',
  theme: {
    pageBg: '#1a0533',
    cardBg: 'rgba(255,255,255,0.06)',
    primaryText: '#f1f5f9',
    secondaryText: '#94a3b8',
    headingColor: '#c4b5fd',
    accent: '#a78bfa',
    border: 'rgba(255,255,255,0.12)',
    progressFill: '#a78bfa',
    iconColor: '#a78bfa',
  },
  widgets: { stats: 'frostPanels', langs: 'gradientBars', activity: 'calendarGrid', skills: 'glassChips' },
  metadata: { version: '1.0.0', tags: ['glass', 'dark', 'blur'] },
}
