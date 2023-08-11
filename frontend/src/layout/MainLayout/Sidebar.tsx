import { LinkMenu } from '@/components/Utils/LinkMenu'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { sidebar } from '@/constants/sidebar-items'
import { useSidebar } from '@/stores/useSidebar'
import { Label } from '@radix-ui/react-label'

const Sidebar = () => {
  const setOpen = useSidebar((state) => state.setOpen)

  return (
    <ScrollArea className="mt-4 w-full">
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
                <LinkMenu
                  id={item.id}
                  key={item.id}
                  to={item.link}
                  data-hidden={item.isHidden}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </LinkMenu>
              )
            })}
          </div>
        )
      })}
    </ScrollArea>
  )
}

export { Sidebar }
