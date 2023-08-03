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
        'flex items-center gap-3 py-2 px-10 mx-4 hover:bg-muted data-[active=true]:bg-stone-200/50 dark:data-[active=true]:bg-muted/50 dark:hover:bg-muted/50 rounded-lg data-[hidden=true]:hidden',
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
