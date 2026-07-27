import type { TemplateDefinition } from '../types'

export const neumorphism: TemplateDefinition = {
  id: 'neumorphism',
  name: 'Neumorphism',
  description: 'Soft light gray UI with raised/pressed shadow effects.',
  thumbnail: '⚪',
  emoji: '⚪',
  category: 'soft',
  theme: {
    pageBg: '#e0e5ec',
    cardBg: '#d1d8e0',
    primaryText: '#111827',
    secondaryText: '#4b5563',
    headingColor: '#0f172a',
    accent: '#6c5ce7',
    border: '#c0c7cf',
    progressFill: '#6c5ce7',
    iconColor: '#6c5ce7',
  },
  widgets: { stats: 'flatTiles', langs: 'thinBars', activity: 'contributionGrid', skills: 'flatBadges' },
  metadata: { version: '1.0.0', tags: ['minimal', 'light', 'soft'] },
}
