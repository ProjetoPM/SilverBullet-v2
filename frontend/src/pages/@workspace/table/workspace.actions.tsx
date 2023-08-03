import { Button, Dialog, DropdownMenu } from '@/components/ui'
import { routes } from '@/routes/routes'
import WorkspaceService from '@/services/modules/WorkspaceService'
import { useWorkspace } from '@/stores/useWorkspace'
import { Copy, FolderOpen, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Workspace } from '../../../@types/Workspace'

type WorkspaceActionsProps = {
  id: string
  data: Workspace
}

const WorkspaceActions = ({ id, data }: WorkspaceActionsProps) => {
  const { t } = useTranslation(['default', 'workspace'])
  const navigate = useNavigate()
  const open = useWorkspace((state) => state.open)
  const [isLoading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await WorkspaceService.delete(data)
    setLoading(false)
  }

  const handleOpen = () => {
    open(data)
    navigate(routes.projects.index)
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
          <Link to={`/workspaces/${data._id}/edit`} id={`edit-${id}`}>
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
          <DropdownMenu.Item
            onClick={() => navigator.clipboard.writeText(data._id)}
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
            <Button onClick={() => handleDelete()} disabled={isLoading}>
              {t('default:btn.confirm')}
            </Button>
          </Dialog.Trigger>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WorkspaceActions }
