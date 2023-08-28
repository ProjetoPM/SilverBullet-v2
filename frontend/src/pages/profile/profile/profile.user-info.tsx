import { Loading } from '@/components/Loading'
import { useProfile } from '../hooks/useProfile'
import { ProfileFormView } from './form/profile.form.view'

const ProfileUserInfo = () => {
  const { data, isLoading } = useProfile().useMe()

  if (isLoading) {
    return <Loading size={32} />
  }
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
        <div className="sm:col-span-3">
          <img src={'profileImage.png'}></img>
        </div>
        <div className="sm:col-span-7">
          <ProfileFormView {...data} />
        </div>
      </div>
    </>
  )
}

export { ProfileUserInfo }
