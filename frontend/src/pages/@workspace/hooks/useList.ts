import { WorkspaceList } from '@/@types/Workspace'
import WorkspaceService from '@/services/modules/WorkspaceService'
import { useQuery } from 'react-query'

export const useList = () => {
  const getData = async () => {
    return await WorkspaceService.list()
  }

  const { ...props } = useQuery<WorkspaceList>('workspaces', getData)

  return { ...props }
}
