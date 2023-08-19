import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useWorkspaceList } from './hooks/useWorkspace'
import { columns } from './table/columns'
import { WorkspaceToolbar } from './workspace.toolbar'

const WorkspaceListPage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { data, isLoading } = useWorkspaceList()

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <WorkspaceToolbar />
        <Separator className="my-5" />
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data?.tenants ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspaceListPage
