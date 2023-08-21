import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useWorkspace } from './hooks/useWorkspace'
import { WorkspaceForm } from './workspace.form'

const WorkspacePage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { id } = useParams()
  const { edit } = useWorkspace({ useEdit: id })

  if (edit.isLoading) {
    return <Loading size={32} />
  }

  if (edit.isError) {
    return <span>Something went wrong.</span>
  }

  return (
    <PageLayout
      title={t(`${id ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <WorkspaceForm data={edit.data} />
    </PageLayout>
  )
}

export default WorkspacePage
