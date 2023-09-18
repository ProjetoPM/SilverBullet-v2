import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { BusinessCase } from '../business-case.types'

export const useFind = () => {
  const workspaceId = getWorkspaceId()
  const projectId = getProjectId()

  const getData = async () => {
    const url = `/tenant/${workspaceId}/project/${projectId}/business-case`

    if (projectId && workspaceId) {
      return api.get(url).then((res) => res.data.rows?.[0])
    }
    return null
  }

  const { ...props } = useQuery<BusinessCase>(
    [`projectId-${projectId}`, projectId],
    async () => getData()
  )
  return { ...props }
}
