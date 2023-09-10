import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { BusinessCase } from '../business-case.types'

export const useFind = () => {
  const workspaceId = getWorkspaceId()
  const projectID = getProjectId()

  const getData = async (id?: string) => {
    const url = `/tenant/${workspaceId}/project/${projectId}/business-case`

    if (id) {
      return api.get(url).then((res) => res.data)
    }
    return null
  }

  const { ...props } = useQuery<BusinessCase>(
    [`project-${projectId}`, projectId],
    async () => getData(projectId)
  )

  return { ...props }
}
