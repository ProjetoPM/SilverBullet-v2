import { Button, Form, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProfileSchema, defaultValues, max } from './profile.schema'
import { User } from '../User.type'

type Form = z.infer<typeof ProfileSchema>

interface ProfileFormProps {
  data?: Pick<User, 'firstName' | 'lastName' | 'fullName' | 'email' | 'password'>
}

const ProfileForm = ({ data }: ProfileFormProps) => {
  //const fullName = data?.firstName.concat(' ').concat(data.lastName??"")
  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Form) => {
    /*let response: AxiosResponse | undefined

    if (data) {
      response = await ProjectService.edit(data._id, form)
    } else {
      response = await ProjectService.create(form)
    }

    if (response?.status === StatusCodes.OK) {
      navigate(routes.projects.index)
    }*/
  }

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
         <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-10">
          <div className="sm:col-span-5">
            <Form.Field
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{'Telefone'}</Form.Label>
                <Form.Control>
                  <Input
                    max={max.email}
                    placeholder={'Telefone'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />  
          </div>
          <div className="sm:col-span-5">
            <div className='space-y-2'>
              <Form.Label>{'Email'}</Form.Label>
              <Input
                readOnly
                value={"email@gmail.com"}
                max={max.firstName}
                placeholder={'email'}
              />
            </div>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-10">
          <div className="sm:col-span-5">
          <Form.Field
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>{'Nome'}</Form.Label>
                <Form.Control>
                  <Input
                    max={max.firstName}
                    placeholder={'nome'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          </div>
          <div className="sm:col-span-5">
          <Form.Field
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>{'Sobrenome'}</Form.Label>
                <Form.Control>
                  <Input
                    max={max.lastName}
                    placeholder={'sobrenome'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          </div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-10">
          <div className="sm:col-span-5">
          <Form.Field
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{'Nova senha'}</Form.Label>
                <Form.Control>
                  <Input
                    type='password'
                    max={max.password}
                    placeholder={'nova senha'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          </div>
          <div className="sm:col-span-5">
          <Form.Field
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{'Confirme sua senha'}</Form.Label>
                <Form.Control>
                  <Input
                  type='password'
                    max={max.lastName}
                    placeholder={'confirme sua senha'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          </div>
        </div>
        <Form.Field
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>{'Senha Atual'}</Form.Label>
                <Form.Control>
                  <Input
                  type='password'
                    max={max.lastName}
                    placeholder={'Senha Atual'}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        <div className="space-y-2 space-x-2.5">
          <Button
            type="submit"
            className="w-30 gap-1 font-medium"
          >
            {data && (
              <>
                <Edit size={20} />
                {'edit'}
              </>
            )}
            {!data && (
              <>
                <Save size={20} />
                {'save'}
              </>
            )}
          </Button>
          <Button
            type="button"
            className="w-30 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {'reset'}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default ProfileForm
