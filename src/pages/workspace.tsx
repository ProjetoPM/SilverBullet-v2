import { PageLayout } from '@/layout'
import { api } from '@/services/api'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

const WorkspacePage = () => {
  const { t } = useTranslation('project-charter')

  const title = t('title')
  const breadcrumb = [['Home', '/home'], [title]]

  const { data } = useQuery('workspaces', () => {
    return api.get('/tenant').then((res) => res.data)
  })

  console.log(data)

  return <PageLayout title={title} breadcrumb={breadcrumb}></PageLayout>
}

export default WorkspacePage
