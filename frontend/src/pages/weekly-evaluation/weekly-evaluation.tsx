import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { WeeklyEvaluationForm } from './weekly-evaluation.form'

const WeeklyEvaluationPage = () => {
  const { t } = useTranslation('weekly-evaluation')
  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]

  return (
    <PageLayout
      title={t(`${'' ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <WeeklyEvaluationForm />
    </PageLayout>
  )
}

export default WeeklyEvaluationPage
