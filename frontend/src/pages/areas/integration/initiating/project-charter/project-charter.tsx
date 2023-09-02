import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { ProjectCharterForm } from './project-charter.form'

const ProjectCharter = () => {
  const { t } = useTranslation('project-charter')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]

  return (
    <PageLayout title="Project Charter" breadcrumb={breadcrumb}>
      <ProjectCharterForm />
    </PageLayout>
  )
}

export default ProjectCharter
