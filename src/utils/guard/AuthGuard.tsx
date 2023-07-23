import { Loading } from '@/components/Loading'
import { useAuth } from '@/stores/useAuth'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type AuthGuardProps = {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [mounted, setMounted] = useState(false)
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
    setMounted(true)
  }, [navigate, location, token])

  return (
    <>
      {!mounted && <Loading />}
      {mounted && children}
    </>
  )
}

export { AuthGuard }
