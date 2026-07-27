import type { TemplateDefinition } from '../types'

export const claymorphism: TemplateDefinition = {
  id: 'claymorphism',
  name: 'Claymorphism',
  description: 'Thick rounded pastel clay shapes, puffy soft shadows.',
  thumbnail: '🧸',
  emoji: '🧸',
  category: 'playful',
  theme: {
    pageBg: '#fce4ec',
    cardBg: 'rgba(255,255,255,0.5)',
    primaryText: '#2d1b2e',
    secondaryText: '#5c3d5a',
    headingColor: '#e91e63',
    accent: '#e91e63',
    border: 'rgba(233,30,99,0.12)',
    progressFill: '#e91e63',
    iconColor: '#e91e63',
  },
  widgets: { stats: 'softCards', langs: 'pillBars', activity: 'roundedGrid', skills: 'clayBadges' },
  metadata: { version: '1.0.0', tags: ['playful', 'pastel', 'rounded'] },
}
