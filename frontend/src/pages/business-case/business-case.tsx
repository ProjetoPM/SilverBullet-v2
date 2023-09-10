import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { BusinessCaseForm } from './business-case.form'
import { BusinessCaseToolbar } from './business-case.toolbar'
import { useBusinessCase } from './hooks/useBusiness-case'

const BusinessCasePage = () => {
  const { t } = useTranslation('workspace')
  const breadcrumb = [
    ['Home', routes.workspaces.index, routes.projects.index],
    [t('title')]
  ]
  const { data, isLoading, isError } = useBusinessCase().useFind

  console.log(data)

  if (isLoading) {
    return <Loading size={32} />
  }

  if (isError) {
    return <div>Something went wrong!</div>
  }

  return (
    <PageLayout title={'Business-Case'} breadcrumb={breadcrumb}>
      <BusinessCaseToolbar />
      <BusinessCaseForm />
    </PageLayout>
  )
}

export default BusinessCasePage
