import { Background } from '.'
import { AuthFooter } from './AuthFooter'
import { AuthNavbar } from './AuthNavbar'

type AuthWrapperProps = {
  children: React.ReactNode
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <>
      <div className="h-full w-full">
        <Background>
          <div className="grid grid-rows-[64px_1fr_64px] h-screen">
            <AuthNavbar />
            {children}
            <AuthFooter />
          </div>
        </Background>
      </div>
    </>
  )
}

export { AuthWrapper }
