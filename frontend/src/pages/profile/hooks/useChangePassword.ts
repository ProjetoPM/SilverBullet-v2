import { api } from '@/services/api'
import { useAuthStore } from '@/stores/useAuthStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { PasswordChange } from '../User.type'

const KEY = 'profile'

/*Altera a senha do usuário*/
export const changePassword = () => {
  const signOut = useAuthStore((state) => state.signOut)
  const queryClient = useQueryClient()
  const { t } = useTranslation('profile')
  return useMutation(
    async (passwords: PasswordChange) => {
      return await api
        .put(`/auth/change-password`, {
          oldPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
        .catch((err) => err.response)
    },
    {
      onSuccess: async (response) => {
        switch (response.status) {
          case StatusCodes.OK:
            await queryClient.invalidateQueries([KEY])
            signOut({ message: 'password_change_successful', type: 'success' })
            break
          case StatusCodes.BAD_REQUEST:
            toast.error(t('incorrect_password'))
            break
          case StatusCodes.FORBIDDEN:
            toast.error(response.data)
            break
        }
      },
      onError: () => {
        toast.error(t('change_password_error'))
      }
    }
  )
}
