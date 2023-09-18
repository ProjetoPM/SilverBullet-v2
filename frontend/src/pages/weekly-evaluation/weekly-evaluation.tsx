import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useWeeklyEvaluation } from './hooks/useWeeklyEvaluation'
import { WeeklyEvaluationForm } from './weekly-evaluation.form'

const WeeklyEvaluationPage = () => {
  const { t } = useTranslation('weekly-evaluation')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]
  const { id } = useParams()
  const { edit } = useWeeklyEvaluation({ useEdit: id })

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
      <WeeklyEvaluationForm data={edit.data} />
    </PageLayout>
  )
}

export default WeeklyEvaluationPage
