import { PasswordChecker } from '@/components/PasswordChecker'
import { Button, Form, Input } from '@/components/ui'
import { routes } from '@/routes/routes'
import AuthService from '@/services/modules/AuthService'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Register, RegisterSchema, defaultValues } from './register.schema'

export const RegisterForm = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<Register>({
    mode: 'all',
    resolver: zodResolver(RegisterSchema),
    defaultValues: defaultValues
  })

  const onSubmit = async (data: Register) => {
    setLoading(true)
    const response = await AuthService.create(data)

    if (response?.status === StatusCodes.OK) {
      navigate(routes.auth.index)
    }
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
        <PasswordChecker password={form.watch('password')} />
        <div>
          <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
            {!isLoading && t('btn.sign_up')}
            {isLoading && <Loader className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}
