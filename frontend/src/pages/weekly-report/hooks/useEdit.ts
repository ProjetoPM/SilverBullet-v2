import { api } from '@/services/api'
import { WeeklyReportData } from '@/services/modules/WeeklyReportService'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useLength } from './useLength'

type MockData = WeeklyReportData & {
  _id: string
}

const mockData: MockData = {
  _id: '64dc1f9362900432091b1f88',
  weeklyEvaluationId: '64dc1f9362900432091b1f88',
  toolEvaluation: '<p>123123</p>',
  processes: [
    {
      group: '1',
      name: '4',
      description: '<p>123123123</p>',
      content: {
        folder: '35214d33-c91e-452b-88ff-977850343418',
        files: [
          {
            name: 'livro4.png'
          },
          {
            name: 'livro5.png'
          }
        ]
      }
    }
  ]
}

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

  const { data, ...props } = useQuery<WeeklyReportData>(
    [`wr-${id}`, id],
    async () => getData(id)
  )

  setLength(0)

  return { id, mockData, ...props }
}
