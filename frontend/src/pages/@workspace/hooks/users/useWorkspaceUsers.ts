import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { Invites } from '../../users/add/invite-users'
import { WorkspaceUsers } from '../../users/table/columns'

export const useWorkspaceInvites = () => {
  const { redirect } = useRedirect()
  const { t } = useTranslation('workspace')

  /**
   * Envia os convites para os usuários.
   */
  const create = useMutation(
    async (data: Invites[]) => {
      return await api.post(`/tenant/${getWorkspaceId()}/user`, {
        data: { emails: data }
      })
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('users_invited'))
            queryClient.invalidateQueries('workspace-users')
            break
        }
      },
      onError: redirect
    }
  )

  return { create }
}

/**
 * Lista todos os Workspaces disponíveis de um
 * usuário.
 */
export const useWorkspaceUsersList = () => {
  const { redirect } = useRedirect()

  const list = async () => {
    const workspace = getWorkspaceId()

    if (!workspace) {
      redirect()
    }

    return await api.get(`/tenant/${workspace}/user`).then((res) => {
      return res.data
    })
  }

  const { ...props } = useQuery<{ rows: WorkspaceUsers[] }>(
    'workspace-users',
    list
  )
  return { ...props }
}
