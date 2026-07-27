/**
 * Template registry — the central catalog of all available templates.
 *
 * Each template is defined in its own file under `src/templates/definitions/`.
 * This module imports them all and exposes a typed array + lookup helpers.
 *
 * To add a new template:
 *   1. Create `src/templates/definitions/myTemplate.ts` exporting a TemplateDefinition.
 *   2. Import it here and add to the `templateRegistry` array.
 *   3. (Optional) add its category to `TEMPLATE_CATEGORIES` in constants.
 *
 * The builder and gallery read from this registry — no switch statements anywhere.
 */

import type { TemplateDefinition } from './types'
import { neumorphism } from './definitions/neumorphism'
import { glassmorphism } from './definitions/glassmorphism'
import { skeuomorphism } from './definitions/skeuomorphism'
import { claymorphism } from './definitions/claymorphism'
import { auroraism } from './definitions/auroraism'
import { frostedmorphism } from './definitions/frostedmorphism'
import { gradientmorphism } from './definitions/gradientmorphism'
import { layermorphism } from './definitions/layermorphism'
import { polymorphism } from './definitions/polymorphism'
import { metamorphism } from './definitions/metamorphism'

export const templateRegistry: TemplateDefinition[] = [
  neumorphism,
  glassmorphism,
  skeuomorphism,
  claymorphism,
  auroraism,
  frostedmorphism,
  gradientmorphism,
  layermorphism,
  polymorphism,
  metamorphism,
]

export const templateMap = new Map(
  templateRegistry.map((t) => [t.id, t]),
)

export function getTemplate(id: string): TemplateDefinition | undefined {
  return templateMap.get(id)
}

export function getTemplatesByCategory(category: string): TemplateDefinition[] {
  if (category === 'all') return templateRegistry
  return templateRegistry.filter((t) => t.category === category)
}

export function getTemplateCategories(): string[] {
  return ['all', ...new Set(templateRegistry.map((t) => t.category))]
}
