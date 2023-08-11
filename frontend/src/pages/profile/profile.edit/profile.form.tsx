import { Project } from '@/@types/Project'
import { Editor } from '@/components/Editor/Editor'
import { Button, Form, Input, Label } from '@/components/ui'
import { routes } from '@/routes/routes'
import ProjectService from '@/services/modules/ProjectService'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ProfileSchema, defaultValues, max } from './profile.schema'
import { User } from '@/@types/User'

type Form = z.infer<typeof ProfileSchema>

interface ProfileFormProps {
  data?: Pick<User, 'firstName' | 'lastName' | 'fullName' | 'email'>
}

const ProfileForm = ({ data }: ProfileFormProps) => {
  const fullName = data?.firstName.concat(' ').concat(data.lastName??"")
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
        <Form.Field
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{'Nome'}</Form.Label>
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
        <Form.Field
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{'Sobrenome'}</Form.Label>
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
          <Form.Field
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{'Sobrenome'}</Form.Label>
              <Form.Control>
                <Input
                  type='tel'
                  max={max.lastName}
                  placeholder={'sobrenome'}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        
      </form>
    </Form.Root>
  )
}

export default ProfileForm
