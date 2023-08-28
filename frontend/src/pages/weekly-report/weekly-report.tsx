import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from './hooks'
import WeeklyReportForm from './weekly-report.form'

const WeeklyReportPage = () => {
  const { t } = useTranslation('weekly-report')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { useEdit } = useWeeklyReport()
  const { data, isError, isLoading } = useEdit()

  if (isLoading) {
    return <Loading size={32} />
  }

  if (isError) {
    return <div>Something went wrong!</div>
  }

  return (
    <PageLayout title={t(`edit.title`)} breadcrumb={breadcrumb}>
      <WeeklyReportForm data={data} />
    </PageLayout>
  )
}

export default WeeklyReportPage
