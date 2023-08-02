import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { columns } from './table/columns'

const data = [
  {
    id: 1,
    user: {
      name: 'John Doe'
    },
    evaluationName: 'Evaluation 1',
    score: 100
  },
  {
    id: 2,
    user: {
      name: 'John Doe'
    },
    evaluationName: 'Evaluation 2',
    score: 100
  },
  {
    id: 3,
    user: {
      name: 'John Doe'
    },
    evaluationName: 'Evaluation 3',
    score: 100
  }
]

const WeeklyReportPage = () => {
  const { t } = useTranslation('weekly-report')
  const breadcrumb = [['Home', routes.weekly_report.index], [t('title')]]

  return (
    <PageLayout
      title={t('title')}
      breadcrumb={breadcrumb}
    >
      <div className="min-h-screen">
        <Separator className="my-5" />
        <DataTable
          isLoading={false}
          columns={columns}
          data={data}
        />
      </div>
    </PageLayout>
  )
}

export default WeeklyReportPage
