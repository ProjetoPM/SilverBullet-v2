import { supabase } from '@/lib/supabase'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { StatusCodes } from 'http-status-codes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { create } from 'zustand'
import { WeeklyReportSchema } from '../weekly-report.schema'

export const useFileList = create<{
  files: File[]
  setFiles: (files: File[]) => void
  resetFiles: () => void
}>()((set, get) => ({
  files: [],
  setFiles: (files: File[]) => {
    set({ files })
    console.log(get().files)
  },
  resetFiles: () => set({ files: undefined })
}))

type FormWeeklyReport = z.infer<typeof WeeklyReportSchema>

export const useWeeklyReport = () => {
  const files = useFileList((state) => state.files)
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('weekly-report')
  const navigate = useNavigate()

  const create = async (data: FormWeeklyReport) => {
    setLoading(true)

    if (data.processes) {
      for (const process of data.processes) {
        if (files && process.content) {
          const { uuid, files: localFiles } = process.content

          for (const local of localFiles) {
            const matchingFile = files.find((file) => file.name === local.name)

            if (matchingFile) {
              const { error } = await supabase.storage
                .from('weekly-report')
                .upload(
                  `/processes/${uuid}/${matchingFile.name}`,
                  matchingFile,
                  {
                    upsert: true
                  }
                )

              if (error) {
                toast.error(t('error_creating_wr'))
                setLoading(false)
                return
              }
            }
          }
        }
      }
    }

    const response = await api
      .post(`/tenant/${getWorkspaceId()}/weekly-report/create`, {
        data: { ...data }
      })
      .catch(async () => {
        const processes = data.processes

        processes?.forEach(async (process) => {
          if (process.content) {
            const { uuid } = process.content
            const deleteFiles = new Array<string>()

            for (const file of process.content.files) {
              deleteFiles.push(`processes/${uuid}/${file.name}`)
            }
            await supabase.storage.from('weekly-report').remove(deleteFiles)
          }
        })
      })

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(t('created_successfully'))
        navigate(routes.weekly_report.index)
        break
      default:
        toast.error(t('error_creating_wr'))
    }
    setLoading(false)
  }

  return {
    create,
    isLoading
  }
}
