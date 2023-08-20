import { ProfileFormView } from './form/profile.form.view'
import { User } from '../User.type'

const ProfileUserInfo = () => {
  const data: User = {
    _id: '64cbc70d1f563e41d49497c2',
    emailVerified: false,
    email: 'teste@teste.com',
    password: '$2b$12$qo8UXEXy5aOBJcg..fIRB.sYb3Caob1Z1lB/92s.1mkoqp/PKBxqW',
    firstName: 'teste',
    lastName: '',
    fullName: 'teste',
    avatars: [],
    tenants: [],
    projects: [],
    createdAt: '2023-08-03T15:26:05.839+00:00',
    updatedAt: '2023-08-05T17:09:11.936+00:00',
    __v: 0,
    id: '64cbc70d1f563e41d49497c2'
  }
  return (
  <>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
      <div className="sm:col-span-3">
        <img src={'public/profileImage.png'}></img>
      </div>
      <div className="sm:col-span-7">
      <ProfileFormView {...data}></ProfileFormView>
      </div>
    </div>
  </>
  )
}

export { ProfileUserInfo }
