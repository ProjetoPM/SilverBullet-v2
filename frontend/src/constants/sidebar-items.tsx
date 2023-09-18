import { Translate } from '@/components/Utils/Translate'
import { routes } from '@/routes/routes'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { FolderOpen, Folders } from 'lucide-react'

type SidebarItem = {
  id: string
  label?: string | React.ReactNode
  children?: {
    id: string
    title: React.ReactNode
    icon: React.ReactNode
    link: string
    isHidden?: boolean
  }[]
}

const setHidden = () => {
  return getWorkspaceId() === undefined
}

export const sidebar: SidebarItem[] = [
  {
    id: '_workspace',
    label: 'Workspace',
    children: [
      {
        id: 'workspaces',
        title: <Translate text="workspaces" />,
        icon: <Folders size={22} />,
        link: routes.workspaces.index
      },
      {
        id: 'projects',
        title: <Translate text="projects" />,
        icon: <FolderOpen size={22} />,
        link: routes.projects.index,
        isHidden: setHidden()
      }
    ]
  }
]
