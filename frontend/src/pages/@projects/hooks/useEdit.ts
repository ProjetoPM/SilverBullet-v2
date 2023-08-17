import { api } from '@/services/api'
import { ProjectData } from '@/services/modules/ProjectService'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const useEdit = () => {
  const { id } = useParams()

  const getData = async (id?: string) => {
    const url = `/tenant/${getWorkspaceId()}/project/${id}`

    if (id) {
      return api.get(url).then((res) => res.data)
    }
    return null
  }

  const { ...props } = useQuery<ProjectData>([`project-${id}`, id], async () =>
    getData(id)
  )

  return { id, ...props }
}
