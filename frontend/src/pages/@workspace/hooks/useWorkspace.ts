import { Delete, Props } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import {
  resetWorkspaceStore,
  useWorkspaceStore
} from '@/stores/useWorkspaceStore'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Workspace } from '../workspace.schema'
import { WorkspaceData, WorkspaceList } from '../workspace.types'

/**
 * Chave usada para o cache do React Query.
 */
const KEY = 'workspaces'

export const useWorkspace = ({
  useList = false,
  useEdit = undefined
}: Props) => {
  const { t } = useTranslation(['workspace', 'default'])
  const navigate = useNavigate()
  const { redirect } = useRedirect()
  const workspace = useWorkspaceStore((state) => state.workspace)
  const queryClient = useQueryClient()

  /**
   * Lista todos os Workspaces disponíveis de um
   * usuário.
   */
  const _list = async () => {
    const response = await api
      .get('/auth/me')
      .then((res) => {
        return {
          tenants: res.data.tenants
            .filter((tenant) => tenant.status === 'active')
            .map((tenant) => ({
              deletionId: tenant.tenant._id,
              ...tenant
            }))
        }
      })
      .catch((err) => err.response)

    if (response.status !== StatusCodes.OK) {
      toast.error(response.data)
    }
    return response
  }

  const list = useQuery<WorkspaceList>(KEY, _list, {
    enabled: useList,
    onError: () => {
      toast.error(t('default:unknown_error'))
    }
  })

  const _edit = async () => {
    const response = await api
      .get(`/tenant/${useEdit}`)
      .then((res) => res.data)
      .catch((err) => err.response)

    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      redirect(undefined, 'unknown_error')
    }
    return response
  }

  /**
   * Recupera os dados de um workspace.
   */
  const edit = useQuery<WorkspaceData>('workspace-edit', _edit, {
    enabled: !!useEdit,
    cacheTime: 0,
    onError: () => {
      toast.error(t('default:unknown_error'))
    }
  })

  /**
   * Cria um workspace e logo em seguida invalida
   * o cache anterior.
   */
  const create = useMutation(
    async (data: Workspace) => {
      return await api
        .post('/tenant', { data: { ...data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('created_successfully'))
            await queryClient.invalidateQueries([KEY])
            navigate(routes.workspaces.index)
        }
      },
      onError: () => {
        toast.error(t('error_creating_workspace'))
      }
    }
  )

  /**
   * Atualiza os dados de um workspace e assim como o método `create`,
   * invalida o cache anterior.
   */
  const update = useMutation(
    async (data: Workspace) => {
      return await api
        .put(`/tenant/${useEdit}`, { data: { ...data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_successfully'))
            await queryClient.invalidateQueries([KEY])
            navigate(routes.workspaces.index)
            break
          case StatusCodes.FORBIDDEN:
            toast.error(response.data)
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
    async (data: Delete) => {
      const _data = Array.isArray(data) ? data : [data._id]
      return await api
        .delete('/tenant', { params: { ids: _data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response, data) => {
        switch (response.status) {
          case StatusCodes.OK:
            /**
             * Esconde o `projects` do sidebar caso o usuário exclua
             * o workspace em que ele se encontra. Também reseta a store.
             */
            if (workspace?._id === data._id) {
              setDataHiddenProjects(true)
              resetWorkspaceStore()
            }
            toast.success(t('deleted_successfully'))
            await queryClient.invalidateQueries([KEY])
            break
          case StatusCodes.UNAUTHORIZED:
            toast.error(t('no_permission_to_delete'))
            break
          case StatusCodes.FORBIDDEN:
            toast.error(t('no_permission_to_delete'))
            break
        }
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { list, edit, create, update, _delete }
}
