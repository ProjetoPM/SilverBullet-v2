import { Label } from '@/components/ui'
import { PageLayout } from '@/layout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { ProfileActions } from './profile.actions'
import { ProfileUserInfo } from './profile.user-info'
import WorkspacesList from './workspaces/workspaces.list'

const Profile = () => {
  const { t } = useTranslation('profile')
  const breadcrumb = [['Home', routes.workspaces.index], [t('profile')]]

  return (
    <PageLayout title={t('profile')} breadcrumb={breadcrumb}>
      <ProfileUserInfo />
      <ProfileActions />
      <div>
        <Label>{t('your_workspaces')}:</Label>
        <WorkspacesList />
      </div>
    </PageLayout>
  )
}

export default Profile
