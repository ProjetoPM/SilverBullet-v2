import { Label } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import  WorkspacesList  from './workspaces/workspaces.list'
import { ProfileActions } from './profileActions'
import { ProfileUserInfo } from './profileUserInfo'

const Profile = () => {
  const { t } = useTranslation('profile')
  const breadcrumb = [['Home', routes.workspaces.index], [t('profile')]]

  return (
    <PageLayout
      title="Profile"
      breadcrumb={breadcrumb}
    >
      <ProfileUserInfo />
      <ProfileActions />
      <div>
        <Label>Seus workspaces:</Label>
        <WorkspacesList />
      </div>
    </PageLayout>
  )
}

export default Profile
