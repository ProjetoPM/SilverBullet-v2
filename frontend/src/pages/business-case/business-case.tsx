import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BusinessCaseForm } from './business-case.form'
import { BusinessCaseToolbar } from './business-case.toolbar'
import { useBusinessCase } from './hooks/useBusiness-case'

const BusinessCasePage = () => {
  const { t } = useTranslation('workspace')
  const navigate = useNavigate()
  /*const workspaceId = getWorkspaceId()
  const projectId = getProjectId()

  if (!workspaceId) {
    navigate(routes.workspaces.index)
    toast.info('Selecione um workspace previamente')
    return navigate(routes.workspaces.index)
  } else if (!projectId) {
    navigate(routes.projects.index)
    toast.info('Selecione um Projeto previamente')
    return navigate(routes.workspaces.index)
  }*/

  const breadcrumb = [
    ['Home', routes.workspaces.index, routes.projects.index],
    [t('title')]
  ]

  const { data, isLoading, isError } = useBusinessCase().useFind

  if (isLoading) {
    return <Loading size={32} />
  }

  if (isError) {
    return <div>Something went wrong!</div>
  }
  return (
    <PageLayout title={'Business-Case'} breadcrumb={breadcrumb}>
      <BusinessCaseToolbar />
      <BusinessCaseForm data={data} />
    </PageLayout>
  )
}

export default BusinessCasePage
