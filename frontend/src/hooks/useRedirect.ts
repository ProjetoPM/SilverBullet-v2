import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useRedirect = (route?: string) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const redirect = () => {
    toast.error(t('unknown_error'))
    navigate(route ?? routes.workspaces.index)
    return
  }

  return { redirect }
}
