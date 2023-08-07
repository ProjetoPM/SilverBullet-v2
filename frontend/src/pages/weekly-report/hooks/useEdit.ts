import { WeeklyReport } from '@/@types/WeeklyReport'
import { api } from '@/services/api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { mockData } from '../processes/mock/data'
import { useLength } from './useLength'

export const useEdit = () => {
  const { id } = useParams()
  const setLength = useLength((state) => state.setLength)

  const getData = async (id?: string) => {
    // TODO weekly-report fetch (new/edit)
    const url = `/tenant/${id}`

    if (id) {
      return api.get(url).then((res) => res.data)
    }
    return null
  }

  const { ...props } = useQuery<WeeklyReport>([`wr-${id}`, id], async () => getData(id))

  setLength(mockData.processes.length)

  return { id, mockData, ...props }
}
