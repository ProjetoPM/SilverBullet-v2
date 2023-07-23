import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthProps = {
  theme: string
  setTheme: (theme: 'light' | 'dark') => void
}

const useTheme = create<AuthProps>()(
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
