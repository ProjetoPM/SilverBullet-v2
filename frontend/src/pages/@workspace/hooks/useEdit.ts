import { api } from '@/services/api'
import { WorkspaceData } from '@/services/modules/WorkspaceService'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const useEdit = () => {
  const { id } = useParams()

  const getData = async (id?: string) => {
    const url = `/tenant/${id}`

    if (id) {
      return api.get(url).then((res) => res.data)
    }
    return null
  }

  const { ...props } = useQuery<WorkspaceData>(
    [`workspace-${id}`, id],
    async () => getData(id)
  )

  return { id, ...props }
}
