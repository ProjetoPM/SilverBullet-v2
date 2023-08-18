import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ProjectData } from '../projects.types'

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
