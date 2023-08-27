import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/useAuthStore'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PasswordChange, User } from '../User.type'

const KEY = 'profile'

export const useProfile = () => {
  const signOut = useAuthStore((state) => state.signOut)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation('profile')
  /**
   * Lista todas as informações do usuário atual.
   */
  const useMe = () => {
    const { t } = useTranslation()
    const _me = async () => {
      const response = await api
        .get('/auth/me')
        .then((res) => res.data)
        .catch((err) => err.response)

      if (response.status !== StatusCodes.OK) {
        toast.error(response.data)
      }
      return response
    }

    const { ...props } = useQuery<User>('me', _me, {
      onError: () => {
        toast.error(t('unknown_error'))
      }
    })

    return { ...props }
  }
  /*Altera os dados do usuário*/
  const update = useMutation(
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
  /*Altera a senha do usuário*/
  const changePassword = useMutation(
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
            toast.success(t('change_passwor_successful'))
            signOut(false)
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
  return { useMe, update, changePassword }
}
