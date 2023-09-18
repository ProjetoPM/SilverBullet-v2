import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type RedirectProps = {
  route?: string
  message?: string
}

export const useRedirect = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['default'])

  /**
   * Redireciona o usuário para uma rota padrão ou específica
   *
   * @param route - Rota a ser usada no redirecionamento
   * @param message - Uma mensagem customizada (do i18next)
   */
  const redirect = (data?: RedirectProps) => {
    toast.error(data?.message ?? t('an_error_occurred'))
    navigate(data?.route ?? routes.workspaces.index)
    return
  }

  return { redirect }
}
