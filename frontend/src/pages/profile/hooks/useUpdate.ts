import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User } from '../User.type'

const KEY = 'profile'
/*Altera os dados do usuário*/

export const update = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation('profile')
  return useMutation(
    async (data: User) => {
      return await api
        .put(`/auth/profile`, { data: { ...data } })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            toast.success(t('edited_profile'))
            await queryClient.invalidateQueries([KEY])
            navigate(routes.profile.index)
            break
          case StatusCodes.FORBIDDEN:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('edit_error'))
      }
    }
  )
}
