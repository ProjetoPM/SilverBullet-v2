import { Button, Dialog } from '@/components/ui'
import { Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteUsers } from './add/invite-users'

export const UsersDialog = () => {
  const { t } = useTranslation('workspace')
  const [open, onOpenChange] = useState(false)

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <Button className="gap-2">
            <Users size={20} />
            <span className="text-base">{t('invite_users')}</span>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-full md:w-[600px]">
          <InviteUsers open={open} onOpenChange={onOpenChange} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
