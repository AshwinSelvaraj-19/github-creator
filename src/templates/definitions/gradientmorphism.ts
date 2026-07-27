import type { TemplateDefinition } from '../types'

export const gradientmorphism: TemplateDefinition = {
  id: 'gradientmorphism',
  name: 'Gradientmorphism',
  description: 'Animated gradient backgrounds, vibrant purple-to-cyan palette.',
  thumbnail: '🌈',
  emoji: '🌈',
  category: 'vibrant',
  theme: {
    pageBg: '#0f0c29',
    cardBg: 'rgba(255,255,255,0.04)',
    primaryText: '#ffffff',
    secondaryText: '#a5b4fc',
    headingColor: '#f472b6',
    accent: '#f472b6',
    border: 'rgba(255,255,255,0.08)',
    progressFill: '#f472b6',
    iconColor: '#f472b6',
  },
  widgets: { stats: 'spectrumCards', langs: 'rainbowBars', activity: 'auroraGraph', skills: 'shimmerTags' },
  metadata: { version: '1.0.0', tags: ['gradient', 'vibrant', 'animated'] },
}
