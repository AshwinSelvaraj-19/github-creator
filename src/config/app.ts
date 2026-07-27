/**
 * App configuration — non-UI configuration values.
 *
 * Separated from constants so that environment-dependent values (API URLs,
 * feature flags) live here while domain constants live in `constants/`.
 */

export const config = {
  pyodide: {
    version: '0.25.0',
    cdnBase: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
  },
  features: {
    aiAssist: false,
    autosave: true,
    codeSplit: true,
  },
  app: {
    name: 'README Forge',
    description: 'Premium GitHub README Builder',
  },
} as const

export type AppConfig = typeof config
