import { Loading } from '@/components/Loading'
import { Separator } from '@/components/ui'
import { PageLayout } from '@/layout'
import { toast } from 'react-toastify'
import { useProfile } from '../hooks/useProfile'
import PasswordForm from './form.password/profile.password.form'
import ProfileFormUserInfo from './form.user-info/profile.user-info.form'

const ProfileEdit = () => {
  const { data, isLoading, isError } = useProfile().useMe()

  if (isLoading) {
    return <Loading size={32} />
  }
  if (isError) {
    toast.error('Erro ao carregar dados do perfil!')
  }
  return (
    <PageLayout title="Teste">
      <ProfileFormUserInfo data={data} />
      <div className="py-3">
        <Separator />
      </div>
      <PasswordForm />
    </PageLayout>
  )
}

export default ProfileEdit
