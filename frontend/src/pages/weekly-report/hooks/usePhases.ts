import { api } from '@/services/api'
import { useQuery } from 'react-query'

export type Phases = {
  id: string
  key: string
  entities: {
    id: string
    key: string
  }[]
}

const ONE_DAY_IN_MILLISECONDS = 86_400_000

export const usePhases = () => {
  const getPhases = async () => {
    return await api.get('/weekly-report/groups').then((res) => res.data)
  }

  const { data, ...props } = useQuery<Phases[]>('phases', getPhases, {
    staleTime: 7 * ONE_DAY_IN_MILLISECONDS,
    cacheTime: 8 * ONE_DAY_IN_MILLISECONDS
  })

  return {
    phases: data,
    ...props
  }
}
