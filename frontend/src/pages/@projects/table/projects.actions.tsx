import { Button, Dialog, DropdownMenu } from '@/components/ui'
import { useCommandMenuStore } from '@/layout/CommandMenu/useCommandMenuStore'
import { routes } from '@/routes/routes'
import { resetProject, useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { replaceParams } from '@/utils/replace-params'
import {
  Copy,
  FolderOpen,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProject'
import { ProjectData } from '../projects.types'

type ProjectActionsProps = {
  id: string
  data: ProjectData
}

const ProjectActions = ({ id, data }: ProjectActionsProps) => {
  const { t } = useTranslation(['default', 'projects'])
  const { _delete } = useProjects({})
  const openMenu = useCommandMenuStore((state) => state.toggleMenu)
  const openProject = useWorkspaceStore((state) => state.openProject)
  const [projectId] = useWorkspaceStore((state) => [state.project?._id])

  const handleDelete = async () => {
    if (projectId === data._id) {
      resetProject()
    }
    await _delete.mutateAsync(data)
  }

  const handleOpen = () => {
    openProject({ _id: data._id!, name: data.name })
    openMenu()
  }

  return (
    <Dialog.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button id={id} variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t('open_menu')}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>{t('btn.actions')}</DropdownMenu.Label>
          <DropdownMenu.Item
            className="flex gap-3"
            id={`open-${id}`}
            onClick={handleOpen}
          >
            <FolderOpen size={18} />
            {t('default:btn.open')}
          </DropdownMenu.Item>
          <Link
            to={replaceParams(routes.projects.edit, data._id ?? '')}
            id={`edit-${id}`}
          >
            <DropdownMenu.Item className="flex gap-3">
              <Pencil size={18} />
              {t('default:btn.edit')}
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item className="p-0 focus:text-white focus:bg-destructive">
            <Dialog.Trigger
              className="flex w-full gap-3 px-2 py-1.5"
              id={`delete-${id}`}
            >
              <Trash2 size={18} />
              {t('default:btn.delete')}
            </Dialog.Trigger>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          {/**
           * // TODO Atribuir roles
           */}
          <>
            <Link to={replaceParams(routes.projects.users.index, data._id!)}>
              <DropdownMenu.Item className="flex gap-3" id={`users-${id}`}>
                <Users2 size={18} />
                Users
              </DropdownMenu.Item>
            </Link>
            <DropdownMenu.Separator />
          </>
          <DropdownMenu.Item
            onClick={() => navigator.clipboard.writeText(data._id!)}
            className="flex gap-3"
            id={`copy-${id}`}
          >
            <Copy size={18} />
            {t('default:btn.copy_id')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Dialog.Content>
        <Dialog.Header className="space-y-3">
          <Dialog.Title>{t('default:are_you_certain.title')}</Dialog.Title>
          <Dialog.Description>
            {t('default:are_you_certain.description')}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Trigger asChild>
            <Button variant="ghost">{t('default:btn.cancel')}</Button>
          </Dialog.Trigger>
          <Dialog.Trigger asChild>
            <Button
              variant="delete"
              onClick={() => handleDelete()}
              isLoading={_delete.isLoading}
            >
              {t('default:btn.confirm')}
            </Button>
          </Dialog.Trigger>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ProjectActions }
