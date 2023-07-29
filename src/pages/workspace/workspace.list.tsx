import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { columns } from './table/columns'
import { Workspace } from './types/Workspace'
import { WorkspaceToolbar } from './workspace.toolbar'

interface WorkspaceList {
  rows: Workspace[]
  count: number
}

const getData = async () => {
  return api.get('/tenant').then((res) => res.data)
}

const WorkspaceListPage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]

  const { data, isLoading, isError } = useQuery<WorkspaceList>(
    'workspaces',
    getData
  )

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <WorkspaceToolbar />
        <Separator className="my-5" />
        <DataTable
          isError={isError}
          isLoading={isLoading}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspaceListPage
