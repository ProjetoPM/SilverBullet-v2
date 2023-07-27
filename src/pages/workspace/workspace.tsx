import { useTranslation } from 'react-i18next'
import WorkspaceForm from './workspace.form'
import { PageLayout } from '@/layout'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useQuery } from 'react-query'
import { Loading } from '@/components/Loading'
import { routes } from '@/routes/routes'

const getData = async (id?: string) => {
  const url = id ? `/tenant/${id}` : '/tenant'
  return api.get(url).then((res) => res.data)
}

const WorkspacePage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery(
    [`workspace-${id}`, id],
    () => getData(id),
    { enabled: !!id, cacheTime: 0 }
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

export default WorkspacePage
