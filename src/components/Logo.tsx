import { cn } from '@/lib/utils'
import { Codesandbox, LucideProps } from 'lucide-react'
import { ComponentProps } from 'react'

type LogoProps = ComponentProps<'label'> & LucideProps

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden lg:flex">
        <Codesandbox size={28} />
      </div>
      <label
        className={cn(
          'text-2xl font-bold dark:text-neutral-50 text-neutral-800',
          className
        )}
        {...props}
      >
        Silver Bullet
      </label>
    </div>
  )
}

export { Logo }
