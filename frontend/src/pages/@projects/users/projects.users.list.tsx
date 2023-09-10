import { User } from '@/@types/generic'
import { DataTable } from '@/components/DataTable/DataTable'
import { Loading } from '@/components/Loading'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useProjectsInvites } from '../hooks/useProjectInvites'
import { InviteUsersToolbar } from './projects.users.toolbar'
import { columns } from './table/columns'

const ProjectsUsersPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [[t('title'), routes.projects.index], [t('users.title')]]
  const { _delete, list } = useProjectsInvites()

  const { data, isLoading, isError } = useQuery<{ rows: User[] }>(
    ['project-users'],
    list
  )

  if (isLoading) {
    return <Loading size={32} />
  }

  return (
    <PageLayout title={t('users.title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <InviteUsersToolbar />
        <Separator className="my-5" />
        <DataTable
          fn={_delete.mutateAsync}
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          data={data?.rows ?? []}
        />
      </div>
    </PageLayout>
  )
}

export default ProjectsUsersPage
