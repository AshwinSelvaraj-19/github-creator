/**
 * History slice — stores generated README snapshots for re-download.
 *
 * Why isolated: history grows over time and is persisted separately so it can
 * be pruned or migrated without touching form state. Capped at 50 entries.
 */

import type { StateCreator } from 'zustand'
import type { HistoryRecord } from '@/types'
import type { StoreState } from '@/store/types'

const MAX_HISTORY = 50

export interface HistorySlice {
  history: HistoryRecord[]
  saveHistory: (record: HistoryRecord) => void
  deleteHistory: (id: string) => void
  clearHistory: () => void
}

export const createHistorySlice: StateCreator<
  StoreState,
  [],
  [],
  HistorySlice
> = (set) => ({
  history: [],
  saveHistory: (record) =>
    set((s) => ({
      history: [record, ...s.history].slice(0, MAX_HISTORY),
    })),
  deleteHistory: (id) =>
    set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
  clearHistory: () => set({ history: [] }),
})
