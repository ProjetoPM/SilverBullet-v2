import { Button, Dialog } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import { Row } from '@tanstack/react-table'
import { ExternalLink, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FileObject } from './columns'

type FileProps = {
  row: Row<FileObject>
}

export const FilesActions = ({ row }: FileProps) => {
  const { t } = useTranslation()
  const folder = row.getValue('folder')
  const filename = row.getValue('name')

  const handleDelete = async () => {
    await supabase.storage
      .from('weekly-report')
      .remove([`processes/${folder}/${filename}`])

    document.getElementById(`tr-${row.id}`)?.remove()
  }

  return (
    <Dialog.Root>
      <div className="flex items-center gap-2">
        <Link
          to={
            supabase.storage
              .from('weekly-report')
              .getPublicUrl(`processes/${folder}/${filename}`).data.publicUrl ??
            '#'
          }
          target="_blank"
        >
          <ExternalLink className="w-4 h-4 cursor-pointer" />
        </Link>
        <Dialog.Trigger>
          <Trash2 className="w-4 h-4 hover:text-destructive/80" />
        </Dialog.Trigger>
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
              <Button variant="delete" onClick={handleDelete}>
                {t('default:btn.confirm')}
              </Button>
            </Dialog.Trigger>
          </Dialog.Footer>
        </Dialog.Content>
      </div>
    </Dialog.Root>
  )
}
