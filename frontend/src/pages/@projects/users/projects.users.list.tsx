import { DataTable } from '@/components/DataTable/DataTable'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { InviteUsersToolbar } from './projects.users.toolbar'
import { columns } from './table/columns'

const ProjectsUsersPage = () => {
  const { t } = useTranslation('projects')
  const breadcrumb = [[t('title'), routes.projects.index], [t('users.title')]]
  // const { _delete, list } = useWorkspaceInvites({ useList: true })

  return (
    <PageLayout title={t('users.title')} breadcrumb={breadcrumb}>
      <div className="min-h-screen">
        <InviteUsersToolbar />
        <Separator className="my-5" />
        <DataTable isLoading={false} columns={columns} data={[]} />
      </div>
    </PageLayout>
  )
}

export default ProjectsUsersPage
