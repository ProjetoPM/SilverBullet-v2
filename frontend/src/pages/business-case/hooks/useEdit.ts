import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { StatusCodes } from 'http-status-codes'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BusinessCase } from '../business-case.types'

export const edit = () => {
  /* const { t } = useTranslation('workspace')*/
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const workspaceId = getWorkspaceId()
  const projectId = getProjectId()

  return useMutation(
    async (data: BusinessCase) => {
      return await api.put(
        `/tenant/${workspaceId}/project/${projectId}/business-case/${data.id}`,
        { data: { ...data } }
      )
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success('edited_successfully')
            queryClient.invalidateQueries('BusinessCase')
            navigate(routes.business_case.edit)
            break
        }
      },
      onError: () => {
        toast.error('error_editing_businesscase')
      }
    }
  )
}
