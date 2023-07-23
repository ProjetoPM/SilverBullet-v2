import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ThemeProps = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const useTheme = create<ThemeProps>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        setTheme: (theme) => set({ theme: theme })
      }),
      {
        name: 'theme'
      }
    )
  )
)

export { useTheme }
