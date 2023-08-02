import { RegisterSchema } from '@/pages/auth/register/register.schema'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { api } from '../api'
import { z } from 'zod'

type CreateAccount = z.infer<typeof RegisterSchema>

export default class AuthService {
  static async create(data: CreateAccount) {
    const response = await api.post('/auth/sign-up', data).catch((err) => err.response)

    switch (response?.status) {
      case StatusCodes.OK:
        toast.success(i18next.t('auth:account_created_successfully'))
        break
      case StatusCodes.BAD_REQUEST:
        toast.info(response.data)
        break
      default:
        toast.error(i18next.t('default:error.unknown_error'))
    }
    return response
  }
}
