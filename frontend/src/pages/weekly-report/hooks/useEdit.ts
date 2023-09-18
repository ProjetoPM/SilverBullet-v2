import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { WeeklyReport } from '../weekly-report.schema'
import { useLength } from './useLength'

export const useEdit = () => {
  const { id } = useParams()
  const { redirect } = useRedirect()
  const setLength = useLength((state) => state.setLength)

  /**
   * Recupera um weekly-report de um usuário.
   */
  const _edit = async () => {
    if (!getWorkspaceId() || !getProjectId()) {
      redirect()
    }

    const response = await api
      .get(
        `/tenant/${getWorkspaceId()}/project/${getProjectId()}/weekly-report/${id}`
      )
      .then((res) => ({
        weeklyEvaluationId: res.data.weeklyEvaluation,
        ...res.data
      }))
      .catch((err) => err.response)

    setLength(response.processes.length)
    return response
  }

  const edit = useQuery<WeeklyReport & { id: string }>(
    'weekly-report-edit',
    _edit,
    {
      enabled: !!id,
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  )

  return { ...edit, id }
}
