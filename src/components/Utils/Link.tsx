import { cn } from '@/lib/utils'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation
} from 'react-router-dom'

type LinkProps = RouterLinkProps & {
  children: React.ReactNode
}

const Link = ({ to, children, className, ...props }: LinkProps) => {
  const location = useLocation()

  return (
    <RouterLink
      to={to}
      className={cn(
        'flex items-center gap-3 py-2.5 px-12 hover:bg-neutral-200 dark:hover:bg-neutral-900 data-[active=true]:border-r-4 data-[active=true]:border-r-indigo-500 dark:data-[active=true]:border-r-indigo-600 data-[active=true]:bg-neutral-200 dark:data-[active=true]:bg-neutral-900',
        className
      )}
      data-active={location.pathname === to}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export { Link }
