import { supabase } from '@/lib/supabase'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WeeklyReport } from '../weekly-report.schema'
import { useFileList } from './useFileList'

export const useCreate = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation('weekly-report')
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
   * Cria um weekly-report e logo em seguida invalida o cache.
   * Os arquivos serão enviadas somente após receber uma resposta
   * do servidor.
   */
  const create = useMutation(
    async (data: WeeklyReport) => {
      return await api.post(
        `/tenant/${getWorkspaceId()}/project/${getProjectId()}/weekly-report/create`,
        { data: { ...data } }
      )
    },
    {
      onSuccess: async (_, data) => {
        await uploadFiles(data)
        await queryClient.invalidateQueries(['weekly-report'])
        toast.success(t('created_successfully'))
        navigate(routes.weekly_report.index)
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  return create
}
