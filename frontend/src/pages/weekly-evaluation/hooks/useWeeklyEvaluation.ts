import { Props } from '@/@types/generic'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { queryClient } from '@/services/react-query'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WeeklyEvaluation } from '../weekly-evaluation.schema'
import { WeeklyEvaluationData } from '../weekly-evaluation.types'

const KEY = 'weekly-evaluation'

export const useWeeklyEvaluation = ({
  useList = false,
  useEdit = undefined
}: Props) => {
  const navigate = useNavigate()
  const { redirect } = useRedirect()
  const { t } = useTranslation('weekly-evaluation')

  /**
   * Lista todos os Weekly-Evaluations disponíveis de um
   * usuário.
   */
  const _list = async () => {
    return await api
      .get(`/tenant/${getWorkspaceId()}/weekly-evaluation/list`)
      .then((res) => {
        return {
          rows: res.data.rows.map((we) => ({
            deletionId: we.id,
            ...we
          }))
        }
      })
      .catch((err) => err.response)
  }

  const list = useQuery<{
    rows: WeeklyEvaluationData[]
  }>(KEY, _list, {
    enabled: useList,
    onError: () => {
      toast.error(t('default:unknown_error'))
    }
  })

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
            await queryClient.invalidateQueries([KEY])
            navigate(routes.weekly_evaluation.index)
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

  const _edit = async () => {
    const response = await api
      .get(`/tenant/${getWorkspaceId()}/weekly-evaluation/${useEdit}`)
      .then((res) => {
        return {
          ...res.data,
          metricGroupId: res.data.metricGroup.metricGroupId
        }
      })
      .catch((err) => err.response)

    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      redirect(undefined, 'unknown_error')
    }
    return response
  }

  /**
   * Recupera os dados de um weekly evaluation.
   */
  const edit = useQuery<WeeklyEvaluation & { id: string }>(
    'weekly-evaluation-edit',
    _edit,
    {
      enabled: !!useEdit,
      cacheTime: 0,
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  /**
   * Atualiza os dados de um weekly evaluation e assim como o método `create`,
   * invalida o cache anterior.
   */
  const update = useMutation(
    async (data: WeeklyEvaluation & { id: string }) => {
      return await api
        .put(`/tenant/${getWorkspaceId()}/weekly-evaluation/${data.id}`, {
          data: { ...data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_successfully'))
            await queryClient.invalidateQueries([KEY])
            navigate(routes.weekly_evaluation.index)
            break
          case StatusCodes.FORBIDDEN:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('error_editing_workspace'))
      }
    }
  )

  return { create, list, edit, update }
}
