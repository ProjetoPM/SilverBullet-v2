import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const create = () => {
  /* const { t } = useTranslation('workspace')*/
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  /*
  return useMutation(
    async (data: FormBusinesscase) => {
        arrumar aqui -> return await api.post('/tenant', { data: { ...data } })
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success('created_successfully')
            queryClient.invalidateQueries('workspaces')
            navigate(routes.workspaces.index)
        }
      },
      onError: () => {
        toast.error('error_creating_workspace')
      }
    }
  )*/
}
