import { Button, Checkbox, Form, Input, Label } from '@/components/ui'
import { useAuth } from '@/stores/useAuth'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LoginSchema, defaultValues } from '../schemas/LoginSchema'

const LoginForm = () => {
  const { t } = useTranslation('login')
  const signIn = useAuth((state) => state.signIn)
  const [isLoading, setLoading] = useState(false)

  const form = useForm<LoginSchema>({
    mode: 'all',
    defaultValues: defaultValues
  })

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true)
    await signIn(data)
    setLoading(false)
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('email.label')}</Form.Label>
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
              <Form.Label>{t('password.label')}</Form.Label>
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
        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" />
          <Label htmlFor="rememberMe">{t('keep-signed-in')}</Label>
        </div>
        <div>
          <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
            {!isLoading && t('sign-in')}
            {isLoading && <Loader className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export { LoginForm }
