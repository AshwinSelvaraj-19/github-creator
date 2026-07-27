/**
 * AI slice — placeholder for future AI-assisted features.
 *
 * Why isolated: AI features (auto-generate bio, suggest skills, tone rewrite)
 * will have their own loading/error/streaming state that is orthogonal to the
 * form. Defining the slice now means future AI work won't require restructuring
 * the store — it just extends this slice.
 */

import type { StateCreator } from 'zustand'
import type { StoreState } from '@/store/types'

export type AIStatus = 'idle' | 'loading' | 'success' | 'error'

export interface AISlice {
  aiStatus: AIStatus
  aiError: string | null
  setAIStatus: (s: AIStatus) => void
  setAIError: (e: string | null) => void
}

export const createAISlice: StateCreator<
  StoreState,
  [],
  [],
  AISlice
> = (set) => ({
  aiStatus: 'idle',
  aiError: null,
  setAIStatus: (s) => set({ aiStatus: s }),
  setAIError: (e) => set({ aiError: e }),
})
