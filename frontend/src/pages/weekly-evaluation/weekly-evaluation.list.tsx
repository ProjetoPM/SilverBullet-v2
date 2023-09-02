import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { WE_KEY, useWeeklyEvaluation } from './hooks/useWeeklyEvaluation'
import { columns } from './table/columns'
import { WeeklyEvaluationToolbar } from './weekly-evaluation.toolbar'
import { WeeklyEvaluationData } from './weekly-evaluation.types'

const WeeklyEvaluationList = () => {
  const { t } = useTranslation('weekly-evaluation')
  const breadcrumb = [['Home', routes.weekly_evaluation.index], [t('title')]]
  const { list } = useWeeklyEvaluation({ useList: true })

  const { data, isLoading, isError } = useQuery<{
    rows: WeeklyEvaluationData[]
  }>(WE_KEY, list)

  return (
    <PageLayout title={t('title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <WeeklyEvaluationToolbar />
        <Separator className="my-5" />
        <DataTable
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default WeeklyEvaluationList
