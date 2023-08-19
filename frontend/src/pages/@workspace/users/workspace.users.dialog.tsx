import { Button, Dialog } from '@/components/ui'
import { Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { InviteUsers } from './add/invite-users'

export const UsersDialog = () => {
  const { t } = useTranslation('workspace')

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button className="gap-2">
            <Users size={20} />
            <span className="text-base">{t('invite_users')}</span>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="w-full md:w-[600px]">
          <InviteUsers />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
