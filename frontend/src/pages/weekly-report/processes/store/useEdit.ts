import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useEdit = create(
  combine({ length: 0 }, (set) => ({
    setLength: (length: number) => set({ length })
  }))
)

export { useEdit }
