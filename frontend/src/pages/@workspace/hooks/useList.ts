import WorkspaceService, {
  WorkspaceData
} from '@/services/modules/WorkspaceService'
import { useQuery } from 'react-query'

export const useList = () => {
  const getData = async () => {
    return await WorkspaceService.list()
  }

  const { ...props } = useQuery<{ rows: WorkspaceData[] }>(
    'workspaces',
    getData
  )

  return { ...props }
}
