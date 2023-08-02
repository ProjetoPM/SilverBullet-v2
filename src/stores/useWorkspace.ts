import { Workspace } from '@/@types/Workspace'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
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
          setDataHiddenProjects(false)
          toast.success(replaceHtmlTags(workspace.name))
        }
      }),
      {
        name: 'workspace',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export const getWorkspaceId = () => {
  return useWorkspace.getState().workspace?._id ?? 'null'
}

export { useWorkspace }
