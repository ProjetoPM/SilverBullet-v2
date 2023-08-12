import { api } from '@/services/api'
import { FormWeeklyReport } from '@/services/modules/WeeklyReportService'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
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

  const { data, ...props } = useQuery<FormWeeklyReport>(
    [`wr-${id}`, id],
    async () => getData(id)
  )

  setLength(0)

  return { id, data, ...props }
}
