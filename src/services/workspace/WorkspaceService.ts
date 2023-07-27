import { Workspace } from '@/pages/workspace/table/columns'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { api } from '../api'

type CreateWorkspace = Pick<Workspace, 'name'>
type EditWorkspace = Pick<Workspace, 'name'>

export default class WorkspaceService {
  static async create(data: CreateWorkspace) {
    const response = await api.post('/tenant', { data: { ...data, url: '' } })

    if (response.status === StatusCodes.OK) {
      toast.success(i18next.t('workspace:created_successfully'))
    } else {
      toast.error(i18next.t('workspace:error_creating_workspace'))
    }
    return response
  }

  static async edit(id: string, data: EditWorkspace) {
    const response = await api.put(`/tenant/${id}`, {
      data: { ...data, url: '' }
    })

    if (response.status === StatusCodes.OK) {
      toast.success(i18next.t('workspace:edited_successfully'))
    } else {
      toast.error(i18next.t('workspace:error_editing_workspace'))
    }
    return response
  }
}
