import { ProjectList } from '@/@types/Project'
import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import ProjectService from '@/services/modules/ProjectService'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ProjectToolbar } from './projects.toolbar'
import { columns } from './table/columns'

const ProjectListPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [['Home', routes.projects.index], [t('title')]]
  const navigate = useNavigate()

  const getData = async () => {
    const response = await ProjectService.list()

    if (!response) {
      navigate(routes.workspaces.index)
    }
    return response
  }

  const { data, isLoading } = useQuery<ProjectList>('projects', getData)

  return (
    <PageLayout
      title={t('title')}
      breadcrumb={breadcrumb}
    >
      <div className="min-h-screen">
        <ProjectToolbar />
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

export default ProjectListPage
