import { Props } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DeleteProject, FormProject, ProjectData } from '../projects.types'

export const useProjects = ({
  useList = false,
  useEdit = undefined
}: Props) => {
  const { t } = useTranslation('projects')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { redirect } = useRedirect()
  const workspaceId = getWorkspaceId()

  /**
   * Lista todos os projetos disponíveis do workspace
   * atual.
   */
  const _list = async () => {
    const response = await api
      .get(`/tenant/${workspaceId}/project-list`)
      .then((res) => {
        return {
          rows: res.data.rows.map((row: { id: string }) => ({
            deletionId: row.id,
            ...row
          }))
        }
      })
      .catch((err) => err.response)

    if (!workspaceId) {
      redirect()
    }
    return response
  }

  const list = useQuery<{ rows: ProjectData[] }>(['projects'], _list, {
    enabled: useList,
    onError: () => redirect()
  })

  const _edit = async () => {
    const response = await api
      .get(`/tenant/${workspaceId}/project/${useEdit}`)
      .then((res) => res.data)
      .catch((err) => err.response)

    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      redirect(routes.projects.index, 'unknown_error')
    }
    return response
  }

  /**
   * Recupera os dados de um projeto.
   */
  const edit = useQuery<ProjectData>('project-edit', _edit, {
    enabled: !!useEdit,
    cacheTime: 0,
    onError: () => {
      toast.error(t('default:unknown_error'))
    }
  })

  /**
   * Cria um projeto e logo em seguida invalida
   * o cache anterior.
   */
  const create = useMutation(
    async (data: FormProject) => {
      return await api
        .post(`/tenant/${getWorkspaceId()}/project/create`, {
          data: { ...data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response?.status) {
          case StatusCodes.OK:
            toast.success(t('created_successfully'))
            await queryClient.invalidateQueries(['projects'])
            navigate(routes.projects.index)
            break
          case StatusCodes.BAD_REQUEST:
            toast.info(t('project_already_exists'))
            break
          default:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('error_creating_project'))
      }
    }
  )

  /**
   * Edita um projeto e assim como o método `create`,
   * invalida o cache anterior.
   */
  const update = useMutation(
    async (data: FormProject) => {
      return await api
        .put(`/tenant/${getWorkspaceId()}/project/${data._id}`, {
          data: { ...data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_successfully'))
            await queryClient.invalidateQueries(['projects'])
            navigate(routes.projects.index)
            break
          default:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('error_editing_project'))
      }
    }
  )

  /**
   * Deleta um projeto existente.
   */
  const _delete = useMutation(
    async (data: DeleteProject) => {
      const _data = Array.isArray(data) ? data : [data._id]
      return await api
        .delete(`/tenant/${getWorkspaceId()}/project`, {
          params: { ids: _data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('deleted_successfully'))
            await queryClient.invalidateQueries(['projects'])
            break
          default:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('error_deleting_project'))
      }
    }
  )

  return { list, edit, create, update, _delete }
}
