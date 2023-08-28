import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { User } from '../User.type'
/**
 * Lista todas as informações do usuário atual.
 */
export const useMe = () => {
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
