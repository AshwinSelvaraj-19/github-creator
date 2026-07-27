/**
 * Template engine — resolves a template definition and produces markdown.
 *
 * Why: the builder shouldn't know how markdown is generated. It delegates to
 * the engine, which decides whether to use a custom renderer or the default
 * Python-based `generate_readme` via the pyodide service.
 */

import type { TemplateDefinition } from './types'
import type { BuilderData } from '@/types'
import { getTemplate } from './registry'
import { pyodideService } from '@/services/pyodide.service'

export interface GenerateResult {
  markdown: string
  template: TemplateDefinition
}

export async function generateReadme(
  templateId: string,
  data: BuilderData,
): Promise<GenerateResult> {
  const template = getTemplate(templateId)
  if (!template) {
    throw new Error(`Unknown template: ${templateId}`)
  }

  const markdown = template.renderMarkdown
    ? await template.renderMarkdown(data)
    : await pyodideService.generate(data)

  return { markdown, template }
}

export function resolveTemplate(templateId: string): TemplateDefinition {
  const template = getTemplate(templateId)
  if (!template) {
    throw new Error(`Unknown template: ${templateId}`)
  }
  return template
}
