import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'

export const useWeeklyEvaluation = () => {
  const { redirect } = useRedirect()

  const _listWeeklyEvaluation = async () => {
    const url = `/tenant/${getWorkspaceId()}/weekly-evaluation/list-availables`
    return await api
      .get(url)
      .then((res) => res.data)
      .catch((err) => err.response)
  }

  /**
   * Lista todas as avaliações semanais.
   */
  const weeklyEvaluation = useQuery<{
    rows: { id: string; name: string }[]
    count: number
  }>('weekly-report-evaluation-list', _listWeeklyEvaluation, {
    staleTime: 1 * 1024 * 1024, // 1 minute
    cacheTime: 5 * 1024 * 1024, // 5 minutes
    onError: () => redirect()
  })

  return weeklyEvaluation
}
