import { Loading } from '@/components/Loading'
import { routes } from '@/routes/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type GuestGuardProps = {
  children: React.ReactNode
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const [mounted, setMounted] = useState(false)
  const token = useAuthStore((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate(routes.workspaces.index, { replace: true })
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

export { GuestGuard }
