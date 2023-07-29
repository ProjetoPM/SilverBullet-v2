import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ComponentProps } from 'react'

type LoadingProps = ComponentProps<'div'> & {
  size?: number
}

const Loading = ({ className, size = 24, ...props }: LoadingProps) => {
  return (
    <div className={cn('flex h-screen', className)} {...props}>
      <div className="m-auto">
        <Loader2 className="animate-spin" size={size} />
      </div>
    </div>
  )
}

export { Loading }
