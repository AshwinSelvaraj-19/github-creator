import type { TemplateDefinition } from '../types'

export const auroraism: TemplateDefinition = {
  id: 'auroraism',
  name: 'Auroraism',
  description: 'Deep space dark background with animated aurora waves.',
  thumbnail: '🌌',
  emoji: '🌌',
  category: 'dark',
  theme: {
    pageBg: '#0a0e1a',
    cardBg: 'rgba(10,14,26,0.8)',
    primaryText: '#e8f0f0',
    secondaryText: '#8899aa',
    headingColor: '#00ff88',
    accent: '#00ff88',
    border: 'rgba(0,255,136,0.15)',
    progressFill: '#00ff88',
    iconColor: '#00ff88',
  },
  widgets: { stats: 'neonPanels', langs: 'segmentedBars', activity: 'waveGraph', skills: 'outlineTags' },
  metadata: { version: '1.0.0', tags: ['dark', 'neon', 'space'] },
}
