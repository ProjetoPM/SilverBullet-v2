import { Delete, Props, Users } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Invites } from '../users/add/invite-users'

/**
 * Chave usada para o cache do React Query.
 */
const KEY = 'workspace-users'

export const useWorkspaceInvites = ({ useList = false }: Props) => {
  const { t } = useTranslation(['workspace', 'default'])
  const { redirect } = useRedirect()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const _list = async () => {
    return await api.get(`/tenant/${id}/user`).then((res) => {
      return {
        rows: res.data.rows.map((user: { id: string }) => ({
          deletionId: user.id,
          ...user
        }))
      }
    })
  }

  /**
   * Lista todos os usuários de um Workspace
   */
  const list = useQuery<{ rows: Users[] }>(KEY, _list, {
    enabled: useList,
    cacheTime: 0,
    onError: () => redirect()
  })

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
        await queryClient.invalidateQueries([KEY])
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
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('users_deleted_successfully'))
            await queryClient.invalidateQueries([KEY])
            break
          case StatusCodes.UNAUTHORIZED:
            toast.error(t('no_permission_to_delete'))
            break
          case StatusCodes.FORBIDDEN:
            toast.error(t('no_permission_to_delete'))
            break
          default:
            toast.error(response.data)
        }
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { list, create, _delete }
}
