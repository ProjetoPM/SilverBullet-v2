import { Button, Dialog } from '@/components/ui'
import { t } from 'i18next'
import { Trash2 } from 'lucide-react'
import { useLength } from '../hooks/useLength'
import { FieldsProcessProps } from './processes.items'

export const RemoveProcess = ({
  index,
  remove
}: Pick<FieldsProcessProps, 'index' | 'remove'>) => {
  const [length, setLength] = useLength((state) => [
    state.length,
    state.setLength
  ])

  const handleRemove = () => {
    remove(index)
    setLength(length - 1)
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex gap-3 py-1.5" type="button" asChild>
          <Button size={'icon'} variant={'destructive'}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header className="space-y-3">
            <Dialog.Title>{t('default:are_you_certain.title')}</Dialog.Title>
            <Dialog.Description>
              {t(
                length - 1 < index
                  ? 'default:are_you_certain.delete'
                  : 'default:are_you_certain.delete_edit'
              )}
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Trigger asChild>
              <Button variant="ghost">{t('default:btn.cancel')}</Button>
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button variant="delete" onClick={handleRemove}>
                {t('default:btn.confirm')}
              </Button>
            </Dialog.Trigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
