import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useEdit } from './hooks/useEdit'
import WeeklyReportForm from './weekly-report.form'

const WeeklyReportPage = () => {
  const { t } = useTranslation('weekly-report')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { id, mockData, isLoading, isError } = useEdit()

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
      <WeeklyReportForm data={mockData} />
    </PageLayout>
  )
}

export default WeeklyReportPage
