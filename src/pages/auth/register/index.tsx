import { AuthWrapper } from '@/components/auth'
import { Card } from '@/components/ui'
import { PageLayout } from '@/layout'
import { useTranslation } from 'react-i18next'
import { RegisterForm } from './register.form'
import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'

const RegisterPage = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={'Sign Up'} footer={false}>
      <AuthWrapper>
        <div className="flex items-center justify-center">
          <Card.Root className="w-full mx-2 my-6 xs:w-[400px]">
            <Card.Header>
              <Card.Title>
                <div className="flex items-center justify-between">
                  <h1>{t('register.title')}</h1>
                  <Link to={routes.auth.index} className="text-xs">
                    {t('already_have_an_account')}
                  </Link>
                </div>
              </Card.Title>
              <Card.Description>{t('register.description')}</Card.Description>
            </Card.Header>
            <Card.Content>
              <RegisterForm />
            </Card.Content>
          </Card.Root>
        </div>
      </AuthWrapper>
    </PageLayout>
  )
}

export default RegisterPage
