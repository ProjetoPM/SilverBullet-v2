import { supabase } from '@/lib/supabase'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { create } from 'zustand'
import { WeeklyReportSchema } from '../weekly-report.schema'

type FileUpload = {
  files: File[]
  setFiles: (files: File[]) => void
}

export const useFileList = create<FileUpload>()((set) => ({
  files: [],
  setFiles: (files: File[]) => set({ files })
}))

type FormWeeklyReport = z.infer<typeof WeeklyReportSchema>

export const useWeeklyReport = () => {
  const files = useFileList((state) => state.files)
  const { t } = useTranslation('weekly-report')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const uploadFiles = async (data: FormWeeklyReport) => {
    if (data.processes && files) {
      for (const process of data.processes) {
        const { content } = process

        if (content) {
          const { folder, files: localFiles } = content

          for (const local of localFiles) {
            const matchingFile = files.find((file) => file.name === local.name)

            if (matchingFile) {
              await supabase.storage
                .from('weekly-report')
                .upload(
                  `/processes/${folder}/${matchingFile.name}`,
                  matchingFile,
                  { upsert: true }
                )
            }
          }
        }
      }
    }
  }

  /**
   * Cria um weekly-report e logo em seguida invalida o cache.
   * Os arquivos serão enviadas somente após receber uma resposta
   * do servidor.
   */
  const create = useMutation(
    async (data: FormWeeklyReport) => {
      return await api
        .post(`/tenant/${getWorkspaceId()}/weekly-report/create`, {
          data: { ...data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response, data) => {
        switch (response.status) {
          case StatusCodes.OK:
            await uploadFiles(data)
            toast.success(t('created_successfully'))
            queryClient.invalidateQueries('weekly-reports')
            navigate(routes.weekly_report.index)
            break
        }
      },
      onError: () => {
        toast.error(t('error_creating_wr'))
      }
    }
  )

  return { create }
}
