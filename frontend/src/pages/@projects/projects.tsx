import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import WorkspaceForm from './projects.form'
import { useEdit } from './hooks/useEdit'

const ProjectPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [['Home', routes.projects.index], [t('title')]]
  const { id, data, isLoading, isError } = useEdit()

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
