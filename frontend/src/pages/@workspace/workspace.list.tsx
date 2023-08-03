import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import WorkspaceService from '@/services/modules/WorkspaceService'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Workspace } from '../../@types/Workspace'
import { columns } from './table/columns'
import { WorkspaceToolbar } from './workspace.toolbar'

interface WorkspaceList {
  rows: Workspace[]
  count: number
}

const WorkspaceListPage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]

  const getData = async () => {
    return await WorkspaceService.list()
  }

  const { data, isLoading } = useQuery<WorkspaceList>('workspaces', getData)

  return (
    <PageLayout
      title={t('title')}
      breadcrumb={breadcrumb}
    >
      <div className="min-h-screen">
        <WorkspaceToolbar />
        <Separator className="my-5" />
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WorkspaceListPage
