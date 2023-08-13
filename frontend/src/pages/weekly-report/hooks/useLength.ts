import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useLength = create(
  combine({ length: 0 }, (set) => ({
    setLength: (length: number) => set({ length })
  }))
)
