import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useProjects } from './hooks/useProject'
import { ProjectForm } from './projects.form'

const ProjectPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [['Home', routes.projects.index], [t('title')]]
  const { id } = useParams()
  const { edit } = useProjects({ useEdit: id })

  if (edit.isLoading) {
    return <Loading size={32} />
  }

  return (
    <PageLayout
      title={t(`${id ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <ProjectForm data={edit.data} />
    </PageLayout>
  )
}

export default ProjectPage
