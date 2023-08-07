import { WeeklyReport } from '@/@types/WeeklyReport'
import { Loading } from '@/components/Loading'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { data } from './processes/mock/data'
import { useEdit } from './processes/store/useEdit'
import WeeklyReportForm from './weekly-report.form'

const getData = async (id?: string) => {
  const url = `/tenant/${id}`

  if (id) {
    return api.get(url).then((res) => res.data)
  }
  return null
}

const WeeklyReportPage = () => {
  const { t } = useTranslation('weekly-report')
  const { id } = useParams()
  const setLength = useEdit((state) => state.setLength)

  const breadcrumb = [['Home', routes.workspaces.index], [t('title')]]

  const { isLoading, isError } = useQuery<WeeklyReport>([`wr-${id}`, id], () => getData(id))

  if (isLoading) {
    return <Loading size={32} />
  }

  if (isError) {
    return <div>Something went wrong!</div>
  }

  if (data) {
    setLength(data.processes.length)
  }

  return (
    <PageLayout
      title={t(`${id ? 'edit.title' : 'new.title'}`)}
      breadcrumb={breadcrumb}
    >
      <WeeklyReportForm data={data} />
    </PageLayout>
  )
}

export default WeeklyReportPage
