import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useRedirect = (ns?: string | string[]) => {
  const navigate = useNavigate()
  const { t } = useTranslation(ns)

  /**
   * Redireciona o usuário para uma rota padrão ou específica
   *
   * @param route - Rota a ser usada no redirecionamento
   * @param keyMessage - Chave (do i18next) de uma mensagem customizada
   */
  const redirect = (route?: string, keyMessage?: string) => {
    toast.error(t(keyMessage ?? 'no_workspace'))
    navigate(route ?? routes.workspaces.index)
    return
  }

  return { redirect }
}
