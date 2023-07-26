import TranslateText from '@/components/Utils/TranslateText'
import { FolderOpen, Folders, LayoutDashboard, PanelTop } from 'lucide-react'

type SidebarItem = {
  id: string
  label?: string
  children?: {
    id: string
    title: React.ReactNode
    icon: React.ReactNode
    link: string
  }[]
}

export const sidebar: SidebarItem[] = [
  {
    id: '_dashboard',
    label: 'Dashboard',
    children: [
      {
        id: 'dashboard',
        title: <TranslateText text="dashboard" />,
        icon: <LayoutDashboard size={22} />,
        link: '/home'
      }
    ]
  },
  {
    id: '_workspace',
    label: 'Workspace',
    children: [
      {
        id: 'workspaces',
        title: <TranslateText text="workspaces" />,
        icon: <Folders size={22} />,
        link: '/workspaces'
      },
      {
        id: 'projects',
        title: <TranslateText text="projects" />,
        icon: <FolderOpen size={22} />,
        link: '/projects'
      }
    ]
  },
  {
    id: '_other',
    label: 'Other',
    children: [
      {
        id: 'other',
        title: <TranslateText text="menu" />,
        icon: <PanelTop size={22} />,
        link: '/menu'
      }
    ]
  }
]