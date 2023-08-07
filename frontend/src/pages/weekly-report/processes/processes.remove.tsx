import { Button, Dialog } from '@/components/ui'
import { t } from 'i18next'
import { Trash2 } from 'lucide-react'
import { UseFieldArrayRemove } from 'react-hook-form'

type RemoveProcessProps = {
  index: number
  remove: UseFieldArrayRemove
}

export const RemoveProcess = ({ index, remove }: RemoveProcessProps) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger
          className="flex gap-3 px-2 py-1.5"
          type="button"
          asChild
        >
          <Button
            size={'icon'}
            variant={'destructive'}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header className="space-y-3">
            <Dialog.Title>{t('default:are_you_certain.title')}</Dialog.Title>
            <Dialog.Description>{t('default:are_you_certain.delete')}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Trigger asChild>
              <Button variant="ghost">{t('default:btn.cancel')}</Button>
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button
                variant="delete"
                onClick={() => remove(index)}
              >
                {t('default:btn.confirm')}
              </Button>
            </Dialog.Trigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
