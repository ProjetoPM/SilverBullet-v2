import { useAuth } from '@/stores/useAuth'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type GuestGuardProps = {
  children: React.ReactNode
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const token = useAuth((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate, token])

  return <>{children}</>
}

export { GuestGuard }
