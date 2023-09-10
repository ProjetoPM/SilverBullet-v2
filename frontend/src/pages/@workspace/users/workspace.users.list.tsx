import { User } from '@/@types/generic'
import { DataTable } from '@/components/DataTable/DataTable'
import { Loading } from '@/components/Loading'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import {
  WORKSPACE_USERS_KEY,
  useWorkspaceInvites
} from '../hooks/useWorkspaceInvites'
import { columns } from './table/columns'
import { InviteUsersToolbar } from './workspace.users.toolbar'

const WorkspaceUsersPage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [[t('title'), routes.workspaces.index], [t('users.title')]]
  const { _delete, list } = useWorkspaceInvites()

  const { data, isLoading, isError } = useQuery<{ rows: User[] }>(
    WORKSPACE_USERS_KEY,
    list
  )

  if (isLoading) {
    return <Loading size={32} />
  }

  return (
    <PageLayout title={t('users.title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <InviteUsersToolbar />
        <Separator className="my-5" />
        <DataTable
          fn={_delete.mutateAsync}
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspaceUsersPage
