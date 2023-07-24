import { Loading } from '@/components/Loading'
import { Link } from '@/components/Utils/Link'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { sidebar } from '@/constants/items-sidebar'
import { Label } from '@radix-ui/react-label'
import { Suspense } from 'react'

const Sidebar = () => {
  return (
    <ScrollArea className="mt-3 w-full h-full">
      <Suspense fallback={<Loading size={32} />}>
        {sidebar.map((item) => {
          return (
            <div className="flex flex-col" key={item.id}>
              {item.label && (
                <Label className="pl-10 pt-2 mb-1.5 text-xs font-bold uppercase tracking-wider">
                  {item.label}
                </Label>
              )}
              {item.children?.map((item) => {
                return (
                  <Link key={item.id} to={item.link}>
                    {item.icon}
                    {item.title}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </Suspense>
    </ScrollArea>
  )
}

export { Sidebar }
