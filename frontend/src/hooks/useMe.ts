import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

export interface Profile {
  id: string
  email: string
  projects: {
    roles: string[]
    invitationToken?: string
    status: 'active' | 'pending'
    project: {
      id: string
      name: string
      description: string
      tenantId: string
      createdAt: string
    }
  }
  tenants: {
    roles: string[]
    invitationToken?: string
    status: 'active' | 'pending'
    tenant: {
      id: string
      name: string
      description: string
      tenantId: string
      createdAt: string
    }
  }
}

export const useMe = () => {
  const { t } = useTranslation()

  /**
   * Lista todas as informações do usuário atual.
   */
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

  const { ...props } = useQuery<Profile>('me', _me, {
    onError: () => {
      toast.error(t('unknown_error'))
    }
  })

  return { ...props }
}
