import { Delete, Props, Users } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Invites } from '../users/add/invite-users'

export const useProjectsInvites = ({ useList = false }: Props) => {
  const { t } = useTranslation('projects')
  const { redirect } = useRedirect()
  const { id } = useParams()
  const workspaceId = getWorkspaceId()
  const queryClient = useQueryClient()

  // TODO listagem dos convites do projeto
  const _list = async () => {
    const response = await api
      .get(`tenant/${workspaceId}/project/${id}/invite`)
      .then((res) => {
        return {
          rows: res.data.rows.map((user: { id: string }) => ({
            deletionId: user.id,
            ...user
          }))
        }
      })
      .catch((err) => err.response)

    if (!workspaceId || response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      redirect()
    }
    return response
  }

  /**
   * Lista todos os usuários de um Workspace
   */
  const list = useQuery<{ rows: Users[] }>('project-users', _list, {
    enabled: useList,
    onError: () => redirect()
  })

  /**
   * Envia os convites para os usuários.
   */
  const create = useMutation(
    async (data: Invites[]) => {
      return await api
        .post(`tenant/${workspaceId}/project/${id}/invite`, {
          data: { emails: data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('users_invited'))
            await queryClient.invalidateQueries(['project-users'])
            break
          default:
            toast.error(response.data)
        }
      },
      onError: () => redirect(routes.projects.index, 'something_went_wrong')
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
            toast.success(t('user_deleted_successfully'))
            await queryClient.invalidateQueries(['project-users'])
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
