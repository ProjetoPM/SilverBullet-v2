import { AuthWrapper } from '@/components/auth'
import { PageTitle, PageTitleProps } from '@/layout'

const SignUp = ({ title }: PageTitleProps) => {
  return (
    <PageTitle title={title}>
      <AuthWrapper>
        <div className="flex items-center justify-center">
          <h1>Sign Up</h1>
        </div>
      </AuthWrapper>
    </PageTitle>
  )
}

export default SignUp
