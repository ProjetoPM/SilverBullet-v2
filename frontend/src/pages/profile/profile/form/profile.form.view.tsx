import { User } from '../../User.type'
import { Input, Label } from '@/components/ui'

const ProfileFormView = (data: User) => {
  return (
    <>
      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-10">
        <div className="sm:col-span-5">
          <Label>Nome Completo</Label>
          <Input
            readOnly
            value={data.fullName}
          ></Input>
        </div>
        <div className="sm:col-span-5">
          <Label>Telefone</Label>
          <Input
            readOnly
            value={(data.phoneNumber?? "(xx) xxxx xxxx")}
          ></Input>
        </div>
      </div>
      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-10">
        <div className="sm:col-span-5">
          <Label>Membro desde:</Label>
          <Input
            readOnly
            value={new Date(data.createdAt).toLocaleDateString()}
          />
        </div>
        <div className="sm:col-span-5">
          <Label>Ultima alteração</Label>
          <Input
            readOnly
            value={new Date(data.updatedAt).toLocaleDateString()}
          />
        </div>
      </div>
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
