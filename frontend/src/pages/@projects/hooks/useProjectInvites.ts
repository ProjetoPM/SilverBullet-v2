import { Delete } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Invites } from '../users/add/invite-users'

/**
 * Chave usada para o cache do React Query.
 */
export const KEY = 'project-users'

export const useProjectsInvites = () => {
  const { t } = useTranslation('projects')
  const { redirect } = useRedirect()
  const { id } = useParams()
  const queryClient = useQueryClient()

  /**
   * Lista todos os usuário de um projeto.
   */
  const list = async () => {
    if (!getWorkspaceId()) {
      redirect()
    }

    const response = await api
      .get(`/tenant/${getWorkspaceId()}/project/${id}/users`)
      .then((res) => {
        return {
          rows: res.data.rows.map((data) => ({
            ...data,
            tableDeletionId: data.id,
            roles: data.projects?.[0].roles,
            status: data.projects?.[0].status
          }))
        }
      })
      .catch((err) => err.response)

    if (!response || response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      redirect({ route: routes.projects.index, message: 'an_error_occurred' })
    }

    return response
  }

  /**
   * Envia os convites para os usuários.
   */
  const create = useMutation(
    async (data: Invites[]) => {
      return await api
        .post(`/tenant/${getWorkspaceId()}/project/${id}/invite`, {
          data: { emails: data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        const messages = {
          [StatusCodes.OK]: async () => {
            toast.success(t('users_invited'))
            await queryClient.invalidateQueries(['project-users'])
          },
          default: () => {
            toast.error(response.data)
          }
        }

        if (response.status in messages) {
          await messages[response.status]()
          return
        }
        messages.default()
      },
      onError: () =>
        redirect({
          route: routes.projects.index,
          message: 'something_went_wrong'
        })
    }
  )

  /**
   * Deleta um usuário de um projeto.
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
            toast.success(t('user_deleted_successfully'))
            await queryClient.invalidateQueries(['project-users'])
          },
          default: () => {
            toast.error(response.data)
          }
        }

        if (response.status in messages) {
          await messages[response.status]()
          return
        }
        messages.default()
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { list, id, create, _delete }
}
