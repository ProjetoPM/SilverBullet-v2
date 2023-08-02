import { Project } from '@/@types/Project'
import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { getWorkspaceId } from '@/stores/useWorkspace'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import WorkspaceForm from './projects.form'

const getData = async (id?: string) => {
  const url = `/tenant/${getWorkspaceId()}/project/${id}`

  if (id) {
    return api.get(url).then((res) => res.data)
  }
  return null
}

const ProjectPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [['Home', routes.projects.index], [t('title')]]
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery<Project>([`project-${id}`, id], () =>
    getData(id)
  )

  if (isLoading) {
    return <Loading size={32} />
  }

  if (isError) {
    return <div>Something went wrong!</div>
  }

  return (
    <PageLayout
      title={t(`${id ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <WorkspaceForm data={data} />
    </PageLayout>
  )
}

export default ProjectPage
