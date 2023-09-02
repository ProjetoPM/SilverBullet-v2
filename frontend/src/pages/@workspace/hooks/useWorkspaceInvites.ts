import { Delete } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Invites } from '../users/add/invite-users'

/**
 * Chave usada para o cache do React Query.
 */
export const WORKSPACE_USERS_KEY = 'workspace-users'

export const useWorkspaceInvites = () => {
  const { t } = useTranslation(['workspace', 'default'])
  const { redirect } = useRedirect()
  const { id } = useParams()
  const queryClient = useQueryClient()

  /**
   * Listagem de todos os usuários de um Workspace
   */
  const list = async () => {
    const response = await api.get(`/tenant/${id}/user`).then((res) => ({
      rows: res.data.rows.map((user) => ({
        tableDeletionId: user.id,
        ...user
      }))
    }))

    if (!response) {
      redirect()
    }
    return response
  }

  /**
   * Envia os convites para os usuários.
   */
  const create = useMutation(
    async (data: Invites[]) => {
      return await toast.promise(
        api.post(`/tenant/${id}/user`, {
          data: { emails: data }
        }),
        {
          pending: t('default:promise.pending'),
          success: t('workspace:users_invited'),
          error: t('default:promise.error')
        }
      )
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([WORKSPACE_USERS_KEY])
      },
      onError: () => redirect()
    }
  )

  /**
   * Deleta um usuário de um workspace.
   */
  const _delete = useMutation(
    async (data: Delete) => {
      const _data = Array.isArray(data) ? data : [data._id]
      return await api
        .delete(`/tenant/${id}/user`, { params: { ids: _data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        const messages = {
          [StatusCodes.OK]: async () => {
            toast.success(t('users_deleted_successfully'))
            await queryClient.invalidateQueries([WORKSPACE_USERS_KEY])
          },
          [StatusCodes.UNAUTHORIZED]: () => {
            toast.error(t('no_permission_to_delete'))
          },
          [StatusCodes.FORBIDDEN]: () => {
            toast.error(t('no_permission_to_delete'))
          }
        }

        if (response.status in messages) {
          await messages[response.status]()
          return
        }
        toast.error(response.data)
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { list, create, _delete }
}
