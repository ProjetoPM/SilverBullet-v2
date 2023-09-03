import { supabase } from '@/lib/supabase'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WeeklyReport } from '../weekly-report.schema'
import { useFileList } from './useFileList'

export const useUpdate = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('weekly-report')
  const queryClient = useQueryClient()
  const content = useFileList((state) => state.content)

  /**
   * Realiza (se houver) o upload dos arquivos de cada um
   * dos processos adicionados.
   */
  const uploadFiles = async (data: WeeklyReport) => {
    const maybeHasFiles = content.length > 0 && data.processes
    let hasProblem = false

    if (maybeHasFiles) {
      for (const process of data.processes!) {
        const filesToUpload = content.find(
          (item) => item.folder === process.filesFolder
        )

        if (filesToUpload) {
          for (const file of filesToUpload.files) {
            const { error } = await supabase.storage
              .from('weekly-report')
              .upload(`processes/${process.filesFolder}/${file.name}`, file)

            if (error) {
              hasProblem = true
            }
          }
        }
      }

      if (hasProblem) {
        toast.error(t('default:one_or_more_files_error'))
      }
    }
  }

  /**
   * Atualiza um weekly-report e logo em seguida invalida o cache.
   */
  const update = useMutation(
    async (data: WeeklyReport & { id: string }) => {
      return await api.put(
        `/tenant/${getWorkspaceId()}/project/${getProjectId()}/weekly-report/${
          data.id
        }`,
        { data: { ...data } }
      )
    },
    {
      onSuccess: async (response, data) => {
        const messages = {
          [StatusCodes.OK]: async () => {
            toast.success(t('updated_successfully'))
            await queryClient.invalidateQueries(['weekly-report'])

            if (content.length > 0) {
              await uploadFiles(data)
            }
            navigate(routes.weekly_report.index)
          },
          default: () => {
            toast.error(response.data)
          }
        }

        if (response.status in messages) {
          await messages[response.status]()
          return
        }
        messages.default()
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  return update
}
