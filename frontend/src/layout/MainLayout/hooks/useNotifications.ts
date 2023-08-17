import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export const useNotifications = () => {
  const { t } = useTranslation('notifications')

  const acceptInvite = useMutation(
    async (token: string) => {
      return await api
        .post(`/tenant/invitation/${token}/accept`)
        .catch((err) => err.response)
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('accepted_successfully'), {
              position: 'bottom-right'
            })
            queryClient.invalidateQueries('invites')
            queryClient.invalidateQueries('workspaces')
            break
        }
      },
      onError: () => {
        toast.error(t('error_accepting_invite'))
      }
    }
  )

  const declineInvite = useMutation(
    async (token: string) => {
      return await api.delete(`/tenant/invitation/${token}/decline`)
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('declined_successfully'), {
              position: 'bottom-right'
            })
            queryClient.invalidateQueries('invites')
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
