import { create } from 'zustand'

interface UIState {
  mobilePreview: boolean
  fullscreen: boolean
  setMobilePreview: (v: boolean) => void
  setFullscreen: (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobilePreview: false,
  fullscreen: false,
  setMobilePreview: (v) => set({ mobilePreview: v }),
  setFullscreen: (v) => set({ fullscreen: v }),
}))
