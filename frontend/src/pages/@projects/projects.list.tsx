import { DataTable } from '@/components/DataTable/DataTable'
import { Loading } from '@/components/Loading'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useProjects } from './hooks/useProject'
import { ProjectToolbar } from './projects.toolbar'
import { columns } from './table/columns'

const ProjectListPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [['Home', routes.projects.index], [t('title')]]
  const { list, _delete } = useProjects({ useList: true })

  if (list.isLoading) {
    return <Loading size={32} />
  }

  if (list.isError) {
    return <div>Something went wrong!</div>
  }

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <ProjectToolbar />
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

export default ProjectListPage
