import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from './hooks'
import { columns } from './table/columns'
import { WeeklyReportToolbar } from './weekly-report.toolbar'

const WeeklyReportListPage = () => {
  const { t } = useTranslation('weekly-report')
  const breadcrumb = [['Home', routes.weekly_report.index], [t('title')]]
  const { useList } = useWeeklyReport()
  const { data, isLoading } = useList()

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <WeeklyReportToolbar />
        <Separator className="my-5" />
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WeeklyReportListPage
