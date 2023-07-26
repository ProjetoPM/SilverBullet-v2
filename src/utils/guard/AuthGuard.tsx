import { Loading } from '@/components/Loading'
import { routes } from '@/routes/routes'
import { useAuth } from '@/stores/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthGuardProps = {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [mounted, setMounted] = useState(false)
  const token = useAuth((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(routes.auth.index, {
        replace: true
      })
    }
    setMounted(true)
  }, [navigate, token])

  return (
    <>
      {!mounted && <Loading size={36} />}
      {mounted && children}
    </>
  )
}

export { AuthGuard }
