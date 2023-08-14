import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { useQuery } from 'react-query'

type SelectWeeklyEvaluation = {
  id: string
  name: string
}

export const useWeeklyEvaluation = () => {
  const getData = async () => {
    const url = `/tenant/${getWorkspaceId()}/weekly-evaluation/list-availables`
    return api.get(url).then((res) => res.data)
  }

  const { data, ...props } = useQuery<{
    rows: SelectWeeklyEvaluation[]
    count: number
  }>('weekly-evaluation-list', async () => getData())

  return { data, ...props }
}
