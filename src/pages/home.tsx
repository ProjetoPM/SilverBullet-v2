import { Button } from '@/components/ui/Button'
import { useAuth } from '@/stores/useAuth'

const HomePage = () => {
  const signOut = useAuth((state) => state.signOut)

  return (
    <>
      <h1>HomePage</h1>
      <Button variant="ghost" onClick={signOut}>
        Sign out
      </Button>
    </>
  )
}

export default HomePage
