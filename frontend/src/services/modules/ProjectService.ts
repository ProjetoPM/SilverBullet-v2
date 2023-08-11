import { Project } from '@/@types/Project'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { api } from '../api'
import { queryClient } from '../react-query'

type CreateProject = Pick<Project, 'name' | 'description'>
type EditProject = Pick<Project, 'name' | 'description'>
type DeleteProject = Pick<Project, '_id'>

export default class ProjectService {
  static async list() {
    const response = await api
      .get(`/tenant/${getWorkspaceId()}/project-list`)
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        return response.data
      default:
        toast.error(i18next.t('default:error.an_error_occurred'))
    }
  }

  static async create(data: CreateProject) {
    const response = await api
      .post(`/tenant/${getWorkspaceId()}/project/create`, { data: { ...data } })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('projects:created_successfully'))
        break
      default:
        toast.error(i18next.t('projects:error_creating_project'))
    }
    return response
  }

  static async edit(id: string, data: EditProject) {
    const response = await api
      .put(`/tenant/${getWorkspaceId()}/project/${id}`, { data: { ...data } })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('projects:edited_successfully'))
        break
      default:
        toast.error(i18next.t('projects:error_editing_project'))
    }
    return response
  }

  static async delete(data: DeleteProject) {
    const response = await api
      .delete(`/tenant/${getWorkspaceId()}/project`, {
        params: { ids: [data._id] }
      })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('projects:deleted_successfully'))
        queryClient.invalidateQueries('projects')
        break
      default:
        toast.error(i18next.t('projects:error_deleting_workspace'))
    }
    return response
  }
}
