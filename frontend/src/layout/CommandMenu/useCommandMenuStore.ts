import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCommandMenuStore = create(
  combine({ open: false }, (set) => ({
    toggleMenu: () => set((state) => ({ open: !state.open }))
  }))
)
