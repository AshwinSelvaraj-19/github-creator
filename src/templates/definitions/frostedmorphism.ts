import type { TemplateDefinition } from '../types'

export const frostedmorphism: TemplateDefinition = {
  id: 'frostedmorphism',
  name: 'Frostedmorphism',
  description: 'Icy blue gradient backdrop, frosted white translucent cards.',
  thumbnail: '❄️',
  emoji: '❄️',
  category: 'icy',
  theme: {
    pageBg: '#e3f2fd',
    cardBg: 'rgba(255,255,255,0.35)',
    primaryText: '#0d2137',
    secondaryText: '#1a237e',
    headingColor: '#1565c0',
    accent: '#1565c0',
    border: 'rgba(255,255,255,0.5)',
    progressFill: '#1565c0',
    iconColor: '#1565c0',
  },
  widgets: { stats: 'iceTiles', langs: 'frozenBars', activity: 'crystalGrid', skills: 'frostChips' },
  metadata: { version: '1.0.0', tags: ['icy', 'blue', 'cold'] },
}
