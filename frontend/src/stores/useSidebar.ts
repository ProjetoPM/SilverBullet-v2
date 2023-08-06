import { create } from 'zustand'

type SidebarProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const useSidebar = create<SidebarProps>()((set) => ({
  open: false,
  setOpen: (open) => set({ open })
}))

export { useSidebar }
