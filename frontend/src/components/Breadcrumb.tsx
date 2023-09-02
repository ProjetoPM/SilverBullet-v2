import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type BreadcrumbProps = ComponentProps<'div'> & {
  title: string
  items?: string[][]
}

const Breadcrumb = ({
  title,
  items = [],
  className,
  ...props
}: BreadcrumbProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <ol className="text-sm flex items-center">
        {items.map((item, index) => {
          const isFirst = index === 0

          return (
            <div className="flex gap-2" key={item[0]}>
              <li
                key={item[0]}
                className="flex items-center text-xs font-bold uppercase tracking-wider"
              >
                {!isFirst && <ChevronRight size={20} />}

                {item[1] && (
                  <Link className="hover:underline" to={item[1]}>
                    {item[0]}
                  </Link>
                )}

                {!item[1] && item[0]}
              </li>
            </div>
          )
        })}
      </ol>
      <span className="text-2xl font-bold tracking-wide">{title}</span>
    </div>
  )
}

export { Breadcrumb }
