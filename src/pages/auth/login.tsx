import { AuthWrapper } from '@/components/auth'
import { Button, Card, Checkbox, Form, Input, Label } from '@/components/ui'
import { PageTitle, PageTitleProps } from '@/layout'
import { useAuth } from '@/stores/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100)
})

type SignInForm = z.infer<typeof schema>

const LoginPage = ({ title }: PageTitleProps) => {
  const [isLoading, setLoading] = useState(false)
  const signIn = useAuth((state) => state.signIn)

  const form = useForm<SignInForm>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: SignInForm) => {
    setLoading(true)
    await signIn(data)
    setLoading(false)
  }

  return (
    <PageTitle title={title}>
      <AuthWrapper>
        <div className="flex items-center justify-center">
          <Card.Root className="w-full m-2 xs:w-[400px]">
            <Card.Header>
              <Card.Title>
                <div className="flex items-center justify-between">
                  <h1>Sign in</h1>
                  <a href="/register" className="text-xs">
                    Don't have an account?
                  </a>
                </div>
              </Card.Title>
              <Card.Description>Sign in to your account</Card.Description>
            </Card.Header>
            <Card.Content>
              <Form.Root {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <Form.Field
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control>
                          <Input
                            placeholder="email@example.com"
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                          <Input
                            type="password"
                            placeholder="********"
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
                    <Label htmlFor="rememberMe">Keep me signed in</Label>
                  </div>
                  <div>
                    <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
                      {!isLoading && 'Sign in'}
                      {isLoading && <Loader className="animate-spin" />}
                    </Button>
                  </div>
                </form>
              </Form.Root>
            </Card.Content>
          </Card.Root>
        </div>
      </AuthWrapper>
    </PageTitle>
  )
}

export default LoginPage
