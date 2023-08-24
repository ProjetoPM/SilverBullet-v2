import { api } from '@/services/api'
import { useQuery } from 'react-query'

export type Metrics = {
  id: string
  metrics: {
    name: string
    value: number
  }[]
}

const ONE_DAY_IN_MILLISECONDS = 86_400_000

export const useMetrics = () => {
  const getMetrics = async () => {
    return await api
      .get('/weekly-evaluation/metrics/list')
      .then((res) => res.data)
  }

  const { data, ...props } = useQuery<Metrics[]>('metrics', getMetrics, {
    staleTime: 1 * ONE_DAY_IN_MILLISECONDS,
    cacheTime: 1 * ONE_DAY_IN_MILLISECONDS
  })

  return {
    metrics: data,
    ...props
  }
}
