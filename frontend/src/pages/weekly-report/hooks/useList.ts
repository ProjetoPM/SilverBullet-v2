import { useRedirect } from '@/hooks/useRedirect'
import { api } from '@/services/api'
import { getProjectId, getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { WeeklyReportList } from '../weekly-report.types'

export const useList = () => {
  const { redirect } = useRedirect()

  /**
   * Lista todos os Weekly-Reports disponíveis de um
   * usuário.
   */
  const _list = async () => {
    const response = await api
      .get(
        `/tenant/${getWorkspaceId()}/project/${getProjectId()}/weekly-report/list`
      )
      .then((res) => res.data)
      .catch((err) => err.response)

    if (!getWorkspaceId()) {
      redirect()
    }

    return response
  }

  const list = useQuery<WeeklyReportList>('weekly-report', _list, {
    onError: () => redirect()
  })

  return list
}
