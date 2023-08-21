import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'

type SelectWeeklyEvaluation = {
  id: string
  name: string
}

export const useWeeklyEvaluation = () => {
  const { redirect } = useRedirect()

  const getData = async () => {
    const url = `/tenant/${getWorkspaceId()}/weekly-evaluation/list-availables`
    return api.get(url).then((res) => res.data)
  }

  const { data, ...props } = useQuery<{
    rows: SelectWeeklyEvaluation[]
    count: number
  }>('weekly-evaluation-list', async () => getData(), {
    onError: () => redirect()
  })

  return { data, ...props }
}
