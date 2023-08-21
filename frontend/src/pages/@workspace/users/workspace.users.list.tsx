import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useWorkspaceInvites } from '../hooks/useWorkspaceInvites'
import { columns } from './table/columns'
import { InviteUsersToolbar } from './workspace.users.toolbar'

const WorkspaceUsersPage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [[t('title'), routes.workspaces.index], [t('users.title')]]
  const { _delete, list } = useWorkspaceInvites({ useList: true })

  return (
    <PageLayout title={t('users.title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <InviteUsersToolbar />
        <Separator className="my-5" />
        <DataTable
          fn={_delete.mutateAsync}
          isLoading={list.isLoading}
          columns={columns}
          data={list.data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspaceUsersPage
