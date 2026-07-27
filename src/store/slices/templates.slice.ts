/**
 * Templates slice — tracks the selected template and filter state.
 *
 * Why isolated: template selection is read by both the builder and the templates
 * gallery. Keeping it separate from form data lets the gallery change selection
 * without touching the (persisted) builder form.
 */

import type { StateCreator } from 'zustand'
import type { TemplateId } from '@/types'
import type { StoreState } from '@/store/types'

export interface TemplatesSlice {
  selectedTemplate: TemplateId
  templateFilter: string
  setSelectedTemplate: (id: TemplateId) => void
  setTemplateFilter: (filter: string) => void
}

export const createTemplatesSlice: StateCreator<
  StoreState,
  [],
  [],
  TemplatesSlice
> = (set) => ({
  selectedTemplate: 'neumorphism',
  templateFilter: 'all',
  setSelectedTemplate: (id) => set({ selectedTemplate: id }),
  setTemplateFilter: (filter) => set({ templateFilter: filter }),
})
