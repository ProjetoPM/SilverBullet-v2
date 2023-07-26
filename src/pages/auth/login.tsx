import { AuthWrapper } from '@/components/Auth'
import { Card } from '@/components/ui'
import { PageLayout } from '@/layout'
import { useTranslation } from 'react-i18next'
import { LoginForm } from './forms/LoginForm'

const LoginPage = () => {
  const { t } = useTranslation('login')
  const title = t('title')

  return (
    <PageLayout title={title}>
      <AuthWrapper>
        <div className="flex items-center justify-center">
          <Card.Root className="w-full mx-2 my-6 xs:w-[400px]">
            <Card.Header>
              <Card.Title>
                <div className="flex items-center justify-between">
                  <h1>{t('title')}</h1>
                  <a href="/register" className="text-xs">
                    {t('dont_have_an_account')}
                  </a>
                </div>
              </Card.Title>
              <Card.Description>{t('description')}</Card.Description>
            </Card.Header>
            <Card.Content>
              <LoginForm />
            </Card.Content>
          </Card.Root>
        </div>
      </AuthWrapper>
    </PageLayout>
  )
}

export default LoginPage
