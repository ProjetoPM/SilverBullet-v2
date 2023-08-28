import { Button, Form, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { User } from '../../User.type'
import { useProfile } from '../../hooks/useProfile'
import { ProfileSchema, defaultValues, max } from './profile.user-info.schema'

type Form = z.infer<typeof ProfileSchema>

interface ProfileFormProps {
  data?: User
}

const takeRightValues = (form: Form) => {
  let { firstName, lastName } = form
  let fullName = firstName.concat(' ').concat(lastName ?? '')
  var updatedData: User = {
    lastName: lastName,
    fullName: fullName,
    firstName: firstName
  }
  return updatedData
}

const ProfileFormUserInfo = ({ data }: ProfileFormProps) => {
  const { update } = useProfile()
  const { t } = useTranslation('profile')

  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Form) => {
    await update.mutateAsync({
      _id: data?._id,
      ...takeRightValues(form)
    })
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('email')}</Form.Label>
              <Form.Control>
                <Input readOnly placeholder={t('email')} {...field} />
              </Form.Control>
            </Form.Item>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-10">
          <div className="sm:col-span-5">
            <Form.Field
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>{t('first_name')}</Form.Label>
                  <Form.Control>
                    <Input
                      max={max.firstName}
                      placeholder={t('first_name')}
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
                  <Form.Label>{t('last_name')}</Form.Label>
                  <Form.Control>
                    <Input
                      type="text"
                      max={max.lastName}
                      placeholder={t('last_name')}
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </div>
        <div className="space-y-2 space-x-2.5">
          <Button type="submit" className="w-30 gap-1 font-medium">
            <>
              <Edit size={20} />
              {t('btn_profile_edit')}
            </>
          </Button>
          <Button
            type="button"
            className="w-30 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {t('btn_reset')}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default ProfileFormUserInfo
