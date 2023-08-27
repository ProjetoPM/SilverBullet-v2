import { PasswordChecker } from '@/components/PasswordChecker'
import { Button, Form, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useProfile } from '../../hooks/useProfile'
import { PasswordSchema, defaultValues, max } from './profile.password.schema'

type Form = z.infer<typeof PasswordSchema>

const PasswordForm = () => {
  const { changePassword } = useProfile()
  const { t } = useTranslation('profile')

  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(PasswordSchema),
    defaultValues: defaultValues
  })

  const onSubmit = async (form: Form) => {
    await changePassword.mutateAsync({
      currentPassword: form.currentPassword,
      newPassword: form.passwords.newPassword
    })
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-10">
          <div className="sm:col-span-5">
            <Form.Field
              control={form.control}
              name="passwords.newPassword"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>{t('new_password')}</Form.Label>
                  <Form.Control>
                    <Input
                      type="password"
                      max={max.password}
                      placeholder={t('new_password')}
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
              name="passwords.confirmPassword"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>{t('confirm_password')}</Form.Label>
                  <Form.Control>
                    <Input
                      type="password"
                      max={max.password}
                      placeholder={t('confirm_password')}
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </div>
        {form.getValues('passwords.newPassword') && (
          <PasswordChecker
            password={form.watch('passwords.newPassword') ?? ''}
          />
        )}
        <Form.Field
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{t('current_password')}</Form.Label>
              <Form.Control>
                <Input
                  type="password"
                  max={max.password}
                  placeholder={t('current_password')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="space-y-2 space-x-2.5">
          <Button type="submit" className="w-30 gap-1 font-medium">
            <>
              <Edit size={20} />
              {t('btn_change_password')}
            </>
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default PasswordForm
