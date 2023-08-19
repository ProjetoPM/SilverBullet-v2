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

export const useProjects = () => {
  const { t } = useTranslation('projects')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /**
   * Cria um projeto e logo em seguida invalida
   * o cache anterior.
   */
  const create = useMutation(
    async (data: FormProject) => {
      return await api.post(`/tenant/${getWorkspaceId()}/project/create`, {
        data: { ...data }
      })
    },
    {
      onSuccess: (response) => {
        switch (response?.status) {
          case StatusCodes.OK:
            toast.success(t('created_successfully'))
            queryClient.invalidateQueries('projects')
            navigate(routes.projects.index)
            break
          case StatusCodes.BAD_REQUEST:
            toast.info(t('project_already_exists'))
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
  const edit = useMutation(
    async (data: FormProject) => {
      return await api.put(`/tenant/${getWorkspaceId()}/project/${data._id}`, {
        data: { ...data }
      })
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_successfully'))
            queryClient.invalidateQueries('projects')
            navigate(routes.projects.index)
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
      return await api.delete(`/tenant/${getWorkspaceId()}/project`, {
        params: { ids: [data._id] }
      })
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('deleted_successfully'))
            queryClient.invalidateQueries('projects')
            break
        }
      },
      onError: () => {
        toast.error(t('error_deleting_project'))
      }
    }
  )

  return { create, edit, _delete }
}

/**
 * Lista todos os projetos disponíveis do workspace
 * atual.
 */
export const useProjectList = () => {
  const { redirect } = useRedirect()

  const list = async () => {
    const workspace = getWorkspaceId()

    if (!workspace) {
      redirect()
      return
    }

    return await api
      .get(`/tenant/${getWorkspaceId()}/project-list`)
      .then((res) => res.data)
  }

  const { ...props } = useQuery<{ rows: ProjectData[] }>('projects', list, {
    onError: redirect
  })
  return { ...props }
}
