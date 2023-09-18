import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormBusinesscase } from '../business-case.types'

export const create = () => {
  /*const { t } = useTranslation('workspace')*/
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const workspaceId = getWorkspaceId()
  const projectId = getProjectId()

  return useMutation(
    async (data: FormBusinesscase) => {
      return await api.post(
        `/tenant/${workspaceId}/project/${projectId}/business-case`,
        { data: { ...data } }
      )
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success('created_successfully')
            queryClient.invalidateQueries('BusinessCase')
            navigate(routes.business_case.edit)
            break
        }
      },
      onError: () => {
        toast.error('error_creating_businesscase')
      }
    }
  )
}
