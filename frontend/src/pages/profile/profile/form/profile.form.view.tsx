import { User } from '@/@types/User'
import { Input, Label } from '@/components/ui'

const ProfileFormView = (data: User) => {
  return (
    <>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          listStyle: 'none'
        }}
      >
        <li style={{ width: '49%' }}>
          <Label>Nome Completo</Label>
          <Input
            readOnly
            value={data.fullName}
          ></Input>
        </li>
        <li style={{ width: '2%' }}></li>
        <li style={{ width: '49%' }}>
          <Label>Telefone</Label>
          <Input
            readOnly
            value={(data.phoneNumber?? "(xx) xxxx xxxx")}
          ></Input>
        </li>
      </ul>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          listStyle: 'none'
        }}
      >
        <li style={{ width: '49%' }}>
          <Label>Membro desde:</Label>
          <Input
            readOnly
            value={new Date(data.createdAt).toLocaleDateString()}
          />
        </li>
        <li style={{ width: '2%' }}></li>
        <li style={{ width: '49%' }}>
          <Label>Ultima alteração</Label>
          <Input
            readOnly
            value={new Date(data.updatedAt).toLocaleDateString()}
          />
        </li>
      </ul>
      <div>
        <Label>Email</Label>
        <Input
          readOnly
          value={data.email}
        ></Input>
      </div>
    </>
  )
}

export { ProfileFormView }
