import { ProfileFormView } from './form/profile.form.view'
import { User } from '@/@types/User'

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
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        listStyle: 'none'
      }}
    >
      <li style={{ width: '29%', height: '200px' }}>
        <img src={'images.png'}></img>
      </li>
      <li style={{ width: '2%' }} />
      <li style={{ width: '69%' }}>
        <ProfileFormView {...data}></ProfileFormView>
      </li>
    </ul>
  )
}

export { ProfileUserInfo }
