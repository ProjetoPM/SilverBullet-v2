import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useWeeklyReport } from './hooks/useWeeklyReport'
import WeeklyReportForm from './weekly-report.form'

const WeeklyReportPage = () => {
  const { t } = useTranslation('weekly-report')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { id } = useParams()
  const { edit } = useWeeklyReport({ useEdit: id })

  if (edit.isLoading) {
    return <Loading size={32} />
  }

  if (edit.isError) {
    return <div>Something went wrong!</div>
  }

  console.log(edit.data)

  return (
    <PageLayout
      title={t(`${id ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <WeeklyReportForm data={edit.data} />
    </PageLayout>
  )
}

export default WeeklyReportPage
