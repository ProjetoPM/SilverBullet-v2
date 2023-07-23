import { Loader2 } from 'lucide-react'

type LoadingProps = {
  size?: number
}

const Loading = ({ size = 24 }: LoadingProps) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Loader2 className="animate-spin" size={size} />
      </div>
    </div>
  )
}

export { Loading }
