import { useAuth } from '@/stores/useAuth'

import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type AuthGuardProps = {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useAuth((state) => state.token)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true
      })
    }
  }, [navigate, location, token])

  return <>{children}</>
}

export { AuthGuard }
