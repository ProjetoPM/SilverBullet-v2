import { WorkspaceData } from '@/pages/@workspace/workspace.types'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type OpenProject = {
  _id: string
  name: string
}

type State = {
  workspace: WorkspaceData | null
  project: OpenProject | null
}

type Actions = {
  open: (workspace: WorkspaceData) => void
  openProject: (project: OpenProject) => void
  close: () => void
}

const initialState: State = {
  workspace: null,
  project: null
}

export const useWorkspaceStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        open: (workspace: WorkspaceData) => {
          set({ workspace, project: null })
          setDataHiddenProjects(false)
          toast.success(replaceHtmlTags(workspace?.name))
        },
        openProject: (project: OpenProject) => {
          set({ project })
        },
        close: () => ({ ...initialState })
      }),
      {
        name: 'workspace',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export const getWorkspaceId = () => {
  return useWorkspaceStore.getState().workspace?._id
}

export const getProjectId = () => {
  return useWorkspaceStore.getState().project?._id
}

export const resetWorkspaceStore = () => {
  return useWorkspaceStore.setState({ ...initialState })
}

export const resetProject = () => {
  return useWorkspaceStore.setState({ project: null })
}
