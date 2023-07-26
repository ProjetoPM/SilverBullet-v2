import { cn } from '@/lib/utils'
import { Link, LinkProps, useLocation } from 'react-router-dom'

type LinkMenuProps = LinkProps & {
  children: React.ReactNode
}

const LinkMenu = ({ to, children, className, ...props }: LinkMenuProps) => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 py-2.5 px-10 mx-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 data-[active=true]:border-r-4 data-[active=true]:bg-neutral-200 dark:data-[active=true]:bg-neutral-800 rounded-lg',
        className
      )}
      data-active={location.pathname === to}
      {...props}
    >
      {children}
    </Link>
  )
}

export { LinkMenu }
