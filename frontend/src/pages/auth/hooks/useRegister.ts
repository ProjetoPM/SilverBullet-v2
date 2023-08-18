import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { RegisterSchema } from '../register/register.schema'

type CreateAccount = z.infer<typeof RegisterSchema>

export const useRegister = () => {
  const { t } = useTranslation(['default', 'auth'])
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const create = async (data: CreateAccount) => {
    const response = await api
      .post('/auth/sign-up', data)
      .catch((err) => err.response)
      .finally(() => setLoading(false))

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(t('auth:account_created_successfully'))
        navigate(routes.auth.index)
        break
      case StatusCodes.BAD_REQUEST:
        toast.info(response.data)
        break
      default:
        toast.error(t('default:error.unknown_error'))
    }
  }

  return { create, isLoading }
}
