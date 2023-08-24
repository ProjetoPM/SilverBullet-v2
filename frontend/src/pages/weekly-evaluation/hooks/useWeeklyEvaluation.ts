import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WeeklyEvaluation } from '../weekly-evaluation.schema'

export const useWeeklyEvaluation = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('weekly-evaluation')

  /**
   * Cria um weekly-evaluation e logo em seguida invalida o cache.
   */
  const create = useMutation(
    async (data: WeeklyEvaluation) => {
      return await api
        .post(`/tenant/${getWorkspaceId()}/weekly-evaluation/create`, {
          data: { ...data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('created_successfully'))
            await queryClient.invalidateQueries('weekly-evaluation')
            navigate(routes.weekly_report.index)
            break
          default:
            toast.error(response.data)
        }
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { create }
}
