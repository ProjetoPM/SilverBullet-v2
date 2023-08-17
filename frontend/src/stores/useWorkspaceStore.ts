import { WorkspaceData } from '@/pages/@workspace/workspace.types'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type State = {
  workspace: WorkspaceData | null
}

type Actions = {
  open: (workspace: WorkspaceData) => void
  close: () => void
}

export const useWorkspaceStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        workspace: null,
        open: (workspace: WorkspaceData) => {
          set({ workspace })
          setDataHiddenProjects(false)
          toast.success(replaceHtmlTags(workspace?.name))
        },
        close: () => ({ workspace: null })
      }),
      {
        name: 'workspace',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export const getWorkspaceId = () => {
  return useWorkspaceStore.getState().workspace?._id ?? 'null'
}
