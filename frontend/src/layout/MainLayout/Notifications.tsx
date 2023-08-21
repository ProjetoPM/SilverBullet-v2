import { Loading } from '@/components/Loading'
import { Badge, Button, DropdownMenu } from '@/components/ui'
import { api } from '@/services/api'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { Bell, Check, X } from 'lucide-react'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNotifications } from './hooks/useNotifications'

type NotificationsProps = {
  userId: string
  tenants: {
    status: 'invited' | 'active'
    invitationToken: string
    tenant: {
      _id: string
      name: string
    }
  }[]
}

export const Notifications = () => {
  const { t } = useTranslation('notifications')
  const { acceptInvite, declineInvite } = useNotifications()

  const { data } = useQuery<NotificationsProps>('me', async () => {
    return await api.get('/auth/me').then((res) => ({
      userId: res.data._id,
      tenants: res.data.tenants.filter(
        (tenant: any) => tenant.status === 'invited'
      )
    }))
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant={'outline'} size={'icon'} className="relative">
          <Bell className="w-5 h-5" />
          {data && data.tenants.length > 0 && (
            <Badge className="p-0 h-2 w-2 absolute top-2 right-[10px] bg-red-700 animate-pulse" />
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-80 sm:w-96">
        <DropdownMenu.Label className="flex items-center gap-2">
          <Bell className="w-4 h-4" /> {t('notifications')}
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group className="p-2">
          <Suspense fallback={<Loading />}>
            {data && data.tenants.length > 0 ? (
              data.tenants.map((notification, index) => {
                return (
                  <React.Fragment key={notification.tenant._id}>
                    <div className="flex gap-2 items-center">
                      <span className="flex flex-col gap-2 text-sm">
                        {t('invite_workspace')}{' '}
                        <div className="font-bold text-green-600 indent-4">
                          {replaceHtmlTags(notification.tenant.name)}
                        </div>
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="accept"
                          size="icon"
                          className="rounded-full"
                          onClick={async () =>
                            await acceptInvite.mutateAsync(
                              notification.invitationToken
                            )
                          }
                        >
                          <Check className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="decline"
                          size="icon"
                          className="rounded-full"
                          onClick={async () =>
                            await declineInvite.mutateAsync(
                              notification.invitationToken
                            )
                          }
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    {index !== data.tenants.length - 1 && (
                      <DropdownMenu.Separator className="my-3" />
                    )}
                  </React.Fragment>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  {t('no_notifications')}
                </span>
              </div>
            )}
          </Suspense>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
