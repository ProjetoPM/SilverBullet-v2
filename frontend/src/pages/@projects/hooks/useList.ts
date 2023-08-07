import { ProjectList } from '@/@types/Project'
import { routes } from '@/routes/routes'
import ProjectService from '@/services/modules/ProjectService'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const useList = () => {
  const navigate = useNavigate()

  const getData = async () => {
    const response = await ProjectService.list()

    if (!response) {
      navigate(routes.workspaces.index)
    }
    return response
  }

  const { ...props } = useQuery<ProjectList>('projects', getData)

  return { ...props }
}
