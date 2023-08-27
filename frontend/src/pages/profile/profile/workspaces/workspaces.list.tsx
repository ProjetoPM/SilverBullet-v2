import { DataTable } from '@/components/DataTable/DataTable'
import { PageLayout } from '@/layout'
import { useWorkspaceList } from '@/pages/@workspace/hooks/useWorkspace'
import { columns } from '@/pages/@workspace/table/columns'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'

const WorkspacesList = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { data, isLoading } = useWorkspaceList()

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb} footer={false}>
      <div className="min-h-screen">
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data?.tenants ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspacesList
