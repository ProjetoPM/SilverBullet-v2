import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const edit = () => {
  /* const { t } = useTranslation('workspace')*/
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  /*
  return useMutation(
    async (data: FormBusinesscase) => {
     arrumar aqui -> return await api.put(`/tenant/${data._id}`, { data: { ...data } })
    },
    {
      onSuccess: (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success('edited_successfully')
            queryClient.invalidateQueries('BusinessCase')
            navigate(routes.workspaces.index)
            break
        }
      },
      onError: () => {
        toast.error('error_editing_workspace')
      }
    }
  )*/
}
