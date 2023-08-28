import { Loading } from '@/components/Loading'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useProfile } from '../hooks/useProfile'
import PasswordForm from './form.password/profile.password.form'
import ProfileFormUserInfo from './form.user-info/profile.user-info.form'

const ProfileEdit = () => {
  const { data, isLoading, isError } = useProfile().useMe()
  const { t } = useTranslation('profile')

  if (isLoading) {
    return <Loading size={32} />
  }
  if (isError) {
    toast.error(t('Error_loading_profile_data'))
  }
  return (
    <PageLayout title="Teste">
      <ProfileFormUserInfo data={data} />
      <Separator className="my-3" />
      <PasswordForm />
    </PageLayout>
  )
}

export default ProfileEdit
