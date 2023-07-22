import { AuthWrapper } from '@/components/auth'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import { Form } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { PageTitle, PageTitleProps } from '@/layout'
import { useAuth } from '@/stores/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100)
})

type SignInForm = z.infer<typeof schema>

const SignIn = ({ title }: PageTitleProps) => {
  const [isLoading, setLoading] = useState(false)
  const signIn = useAuth((state) => state.signIn)
  const navigate = useNavigate()

  const form = useForm<SignInForm>({
    mode: 'all',
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: SignInForm) => {
    setLoading(true)
    const response = await signIn(data)

    if (response.status === StatusCodes.OK) {
      toast.success('Logged!')
      navigate('/home')
    } else {
      toast.error('Something went wrong!')
    }
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
                          <Input placeholder="email@example.com" {...field} />
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
                          <Input placeholder="password" {...field} />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox id="rememberMe" />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me signed in
                    </label>
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

export default SignIn
