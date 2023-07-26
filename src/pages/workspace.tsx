import { PageLayout } from '@/layout'
import { useTranslation } from 'react-i18next'

const WorkspacePage = () => {
  const { t } = useTranslation('project-charter')

  const title = t('title')
  const breadcrumb = [['Home', '/home'], [title]]

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      {/* Form here. */}
    </PageLayout>
  )
}

export default WorkspacePage
