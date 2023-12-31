import { Button, Checkbox, Form, Input } from '@/components/ui'
import { useAuthStore } from '@/stores/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Login, LoginSchema, defaultValues } from './login.schema'

export const LoginForm = () => {
  const { t } = useTranslation('auth')
  const signIn = useAuthStore((state) => state.signIn)
  const isAuthenticating = useAuthStore((state) => state.isAuthenticating)

  const form = useForm<Login>({
    mode: 'all',
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultValues
  })

  const onSubmit = async (data: Login) => {
    await signIn(data)
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{t('email.label')}</Form.Label>
              <Form.Control>
                <Input
                  placeholder={t('email.placeholder')}
                  autoComplete="email"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{t('password.label')}</Form.Label>
              <Form.Control>
                <Input
                  type="password"
                  placeholder={t('password.placeholder')}
                  autoComplete="current-password"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Control>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Form.Control>
                <Form.Label>{t('keep_me_signed_in')}</Form.Label>
              </div>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div>
          <Button
            type="submit"
            className="mt-3 w-full"
            disabled={isAuthenticating}
          >
            {!isAuthenticating && t('btn.sign_in')}
            {isAuthenticating && <Loader className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}
