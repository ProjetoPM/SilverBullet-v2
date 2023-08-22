import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

type InviteProps = {
  token: string
  isProject?: boolean
}

export const useNotifications = () => {
  const { t } = useTranslation('notifications')

  /**
   * Aceita um convite especifiando (ou não) se o convite é para
   * um workspace ou projeto.
   */
  const acceptInvite = useMutation(
    async ({ token, isProject }: InviteProps) => {
      if (isProject) {
        return await api
          .post(`/invitation/project/accept-decline`, {
            data: {
              option: 'accept',
              token: token
            }
          })
          .catch((err) => err.response)
      }
      return await api
        .post(`/tenant/invitation/${token}/accept`)
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('accepted_successfully'), {
              position: 'bottom-right'
            })
            await Promise.all([
              queryClient.invalidateQueries('invites'),
              queryClient.invalidateQueries('workspaces'),
              queryClient.invalidateQueries('projects')
            ])
            break
          default:
            toast.error(t(response.data))
            break
        }
      },
      onError: () => {
        toast.error(t('error_accepting_invite'))
      }
    }
  )

  /**
   * Rejeita um convite especifiando (ou não) se o convite é para
   * um workspace ou projeto.
   */
  const declineInvite = useMutation(
    async ({ token, isProject }: InviteProps) => {
      if (isProject) {
        return await api
          .post(`/invitation/project/accept-decline`, {
            data: {
              option: 'decline',
              token: token
            }
          })
          .catch((err) => err.response)
      }
      return await api
        .delete(`/tenant/invitation/${token}/decline`)
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('declined_successfully'), {
              position: 'bottom-right'
            })
            await queryClient.invalidateQueries(['invites'])
            break
        }
      },
      onError: () => {
        toast.error(t('error_declining_invite'))
      }
    }
  )

  return { acceptInvite, declineInvite }
}
