import { WeeklyReportSchema } from '@/pages/weekly-report/weekly-report.schema'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { api } from '../api'

export type WeeklyReportData = z.infer<typeof WeeklyReportSchema> & {
  _id: string
  evaluationName: string
  tenantId: string
  createdAt: string
  updatedAt: string
}

export type FormWeeklyReport = Omit<
  WeeklyReportData,
  '_id' | 'tenantId' | 'createdAt' | 'updatedAt'
>

export default class WeeklyReportService {
  static async list() {
    // TODO
  }

  static async create(data: FormWeeklyReport) {
    const response = await api
      .post(`/tenant/${getWorkspaceId()}/weekly-report/create`, {
        data: { ...data }
      })
      .catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('weekly-report:created_successfully'))
        break
      default:
        toast.error(i18next.t('weekly-report:error_creating_workspace'))
    }
    return response
  }

  static async edit() {
    // TODO
  }

  static async delete() {
    // TODO
  }
}
