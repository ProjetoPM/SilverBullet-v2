import { Props } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { supabase } from '@/lib/supabase'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { create } from 'zustand'
import { WeeklyReportSchema } from '../weekly-report.schema'
import { WeeklyReportList } from '../weekly-report.types'

type Content = {
  folder: string
  files: FileList
}

type FileUpload = {
  content: Array<Content>
  setContent: (content: Array<Content>) => void
}

export const useFileList = create<FileUpload>()((set) => ({
  content: [],
  setContent: (content: Array<Content>) => set({ content })
}))

type FormWeeklyReport = z.infer<typeof WeeklyReportSchema>

export const useWeeklyReport = ({
  useList = false,
  useEdit = undefined
}: Props) => {
  const content = useFileList((state) => state.content)
  const { t } = useTranslation('weekly-report')
  const { redirect } = useRedirect()
  const navigate = useNavigate()
  const workspaceId = getWorkspaceId()

  /**
   * Lista todos os Weekly-Reports disponíveis de um
   * usuário.
   */
  const _list = async () => {
    const response = await api
      .get(`/tenant/${workspaceId}/weekly-report/submissions`)
      .then((res) => res.data)
      .catch((err) => err.response)

    if (!workspaceId) {
      redirect()
    }
    return response.data
  }

  const list = useQuery<WeeklyReportList>('weekly-report', _list, {
    enabled: useList,
    onError: () => redirect()
  })

  /**
   * Realiza (se houver) o upload dos arquivos de cada um
   * dos processos adicionados.
   */
  const uploadFiles = async (data: FormWeeklyReport) => {
    const maybeHasFiles = content.length > 0 && data.processes

    if (maybeHasFiles) {
      data.processes!.forEach(async (process) => {
        const filesToUpload = content.find(
          (item) => item.folder === process.filesFolder
        )

        if (filesToUpload) {
          for (const file of filesToUpload.files) {
            await supabase.storage
              .from('weekly-report')
              .upload(`processes/${process.filesFolder}/${file.name}`, file)
          }
        }
      })
    }
  }

  /**
   * Cria um weekly-report e logo em seguida invalida o cache.
   * Os arquivos serão enviadas somente após receber uma resposta
   * do servidor.
   */
  const create = useMutation(
    async (data: FormWeeklyReport) => {
      return await api.post(
        `/tenant/${getWorkspaceId()}/weekly-report/create`,
        { data: { ...data } }
      )
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
      onError: () => {}
    }
  )

  const _edit = async () => {
    const response = await api
      .get(`/tenant/${workspaceId}/weekly-report/${useEdit}`)
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
  const edit = useQuery<any>('weekly-report-edit', _edit, {
    enabled: !!useEdit,
    cacheTime: 0,
    onError: () => {
      toast.error(t('default:unknown_error'))
    }
  })

  return { list, edit, create, uploadFiles }
}
