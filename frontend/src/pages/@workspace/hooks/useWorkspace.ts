import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  DeleteWorkspace,
  FormWorkspace,
  WorkspaceData
} from '../workspace.types'

export const useWorkspace = () => {
  const { t } = useTranslation('workspace')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const workspace = useWorkspaceStore((state) => state.workspace)

  /**
   * Cria um workspace e logo em seguida invalida
   * o cache anterior.
   */
  const create = useMutation(
    async (data: FormWorkspace) => {
      return await api
        .post('/tenant', { data: { ...data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('created_successfully'))
            queryClient.invalidateQueries('workspaces')
            navigate(routes.workspaces.index)
        }
      },
      onError: () => {
        toast.error(t('error_creating_workspace'))
      }
    }
  )

  /**
   * Edita um workspace e assim como o método `create`,
   * invalida o cache anterior.
   */
  const edit = useMutation(
    async (data: FormWorkspace) => {
      return await api
        .put(`/tenant/${data._id}`, { data: { ...data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_successfully'))
            queryClient.invalidateQueries('workspaces')
            navigate(routes.workspaces.index)
            break
        }
      },
      onError: () => {
        toast.error(t('error_editing_workspace'))
      }
    }
  )

  /**
   * Deleta um workspace existente.
   */
  const _delete = useMutation(
    async (data: DeleteWorkspace) => {
      return await api
        .delete('/tenant', { params: { ids: [data._id] } })
        .catch((err) => err.response)
    },
    {
      onSuccess: (response, data) => {
        /**
         * Esconde o `projects` do sidebar caso o usuário exclua
         * o workspace em que ele se encontra.
         */
        if (workspace?._id === data._id) {
          setDataHiddenProjects(true)
        }

        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('deleted_successfully'))
            queryClient.invalidateQueries('workspaces')
            break
          case StatusCodes.UNAUTHORIZED:
            toast.error(t('no_permission_to_delete'))
            break
        }
      },
      onError: () => {
        toast.error(t('error_deleting_workspace'))
      }
    }
  )

  return { create, edit, _delete }
}

/**
 * Lista todos os Workspaces disponíveis de um
 * usuário.
 */
export const useWorkspaceList = () => {
  const list = async () => {
    return await api.get('/tenant').then((res) => res.data)
  }

  const { ...props } = useQuery<{ rows: WorkspaceData[] }>('workspaces', list)
  return { ...props }
}
