import { Background } from '.'
import { AuthFooter } from './AuthFooter'
import { AuthHeader } from './AuthHeader'

type AuthWrapperProps = {
  children: React.ReactNode
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <>
      <div className="h-full w-full">
        <Background>
          <div className="grid grid-rows-[68px_1fr_68px] h-screen">
            <AuthHeader />
            {children}
            <AuthFooter />
          </div>
        </Background>
      </div>
    </>
  )
}

export { AuthWrapper }
