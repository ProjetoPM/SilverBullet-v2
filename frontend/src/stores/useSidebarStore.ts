import { create } from 'zustand'

type SidebarProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarProps>()((set) => ({
  open: false,
  setOpen: (open) => set({ open })
}))
