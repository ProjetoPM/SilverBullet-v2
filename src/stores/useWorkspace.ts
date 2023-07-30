import { Workspace } from '@/pages/workspace/types/Workspace'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type State = {
  workspace: Workspace | null
}

type Actions = {
  open: (workspace: Workspace) => void
}

const useWorkspace = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        workspace: null,
        open: (workspace: Workspace) => {
          set({ workspace })
          toast.success(workspace.name)
        }
      }),
      {
        name: 'workspace',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export { useWorkspace }