import { Project } from '@/@types/Project'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { api } from '../api'

type CreateProject = Pick<Project, 'name' | 'description'>

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
}
