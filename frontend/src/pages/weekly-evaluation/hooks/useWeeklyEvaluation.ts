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

export const WE_KEY = 'weekly-evaluation'

export const useWeeklyEvaluation = ({ useEdit = undefined }: Props) => {
  const navigate = useNavigate()
  const { redirect } = useRedirect()
  const { t } = useTranslation('weekly-evaluation')

  /**
   * Lista todos os Weekly-Evaluations disponíveis de um
   * usuário.
   */
  const list = async () => {
    return await api
      .get(`/tenant/${getWorkspaceId()}/weekly-evaluation/list`)
      .then((res) => {
        return {
          rows: res.data.rows.map((we) => ({
            tableDeletionId: we.id,
            ...we
          }))
        }
      })
      .catch((err) => err.response)
  }

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
            await queryClient.invalidateQueries([WE_KEY])
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
      redirect({ message: t('default:unknown_error') })
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
            await queryClient.invalidateQueries([WE_KEY])
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

  const _delete = useMutation(
    async (data: { _id: string }) => {
      const _data = Array.isArray(data) ? data : [data._id]
      return await api
        .delete(`/tenant/${getWorkspaceId()}/weekly-evaluation`, {
          params: { ids: _data }
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        const messages = {
          [StatusCodes.OK]: async () => {
            toast.success(t('deleted_successfully'))
            await queryClient.invalidateQueries([WE_KEY])
          },
          [StatusCodes.FORBIDDEN]: () => {
            toast.error(response.data)
          },
          default: () => {
            toast.error(t('default:unknown_error'))
          }
        }

        if (response.status in messages) {
          await messages[response.status]()
          return
        }
      },
      onError: () => {
        toast.error(t('default:unknown_error'))
      }
    }
  )

  return { create, list, edit, update, _delete }
}
