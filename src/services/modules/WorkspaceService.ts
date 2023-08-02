import { Workspace } from '@/@types/Workspace'
import { useWorkspace } from '@/stores/useWorkspace'
import { setDataHiddenProjects } from '@/utils/sidebar-projects'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { api } from '../api'
import { queryClient } from '../react-query'

type CreateWorkspace = Pick<Workspace, 'name'>
type EditWorkspace = Pick<Workspace, 'name'>
type DeleteWorkspace = Workspace

export default class WorkspaceService {
  static async list() {
    return await api.get('/tenant').then((res) => res.data)
  }

  static async create(data: CreateWorkspace) {
    const response = await api
      .post('/tenant', { data: { ...data } })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('workspace:created_successfully'))
        break
      default:
        toast.error(i18next.t('workspace:error_creating_workspace'))
    }
    return response
  }

  static async edit(id: string, data: EditWorkspace) {
    const response = await api
      .put(`/tenant/${id}`, {
        data: { ...data }
      })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('workspace:edited_successfully'))
        break
      default:
        toast.error(i18next.t('workspace:error_editing_workspace'))
    }
    return response
  }

  static async delete(data: DeleteWorkspace) {
    const response = await api
      .delete('/tenant', { params: { ids: [data._id] } })
      .catch((err) => err.response)

    const remove = useWorkspace.getState().workspace?._id === data._id

    if (remove) {
      useWorkspace.setState({ workspace: null })

      if (useWorkspace.getState().workspace === null) {
        setDataHiddenProjects(true)
      }
    }

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('workspace:deleted_successfully'))
        queryClient.invalidateQueries('workspaces')
        break
      case StatusCodes.UNAUTHORIZED:
        toast.error(i18next.t('workspace:no_permission_to_delete'))
        break
      default:
        toast.error(i18next.t('workspace:error_deleting_workspace'))
    }
    return response
  }
}
