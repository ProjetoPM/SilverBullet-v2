import { LocaleSwitch, ThemeSwitch } from '@/components/Features'
import { Logo } from '@/components/Logo'
import { Button, Separator, Sheet } from '@/components/ui'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Dropdown as ConfigDropdown } from '@/layout/MainLayout/Dropdown'
import { useSidebarStore } from '@/stores/useSidebarStore'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { Menu } from 'lucide-react'
import { CommandMenu } from '../CommandMenu'
import { Notifications } from './Notifications'
import { Sidebar } from './Sidebar'

const Header = () => {
  const open = useSidebarStore((state) => state.open)
  const setOpen = useSidebarStore((state) => state.setOpen)
  const hasProject = useWorkspaceStore((state) => state.project)

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <div className="flex flex-1 items-center justify-between mx-5 px-0 lg:px-5">
        <div className="flex gap-3">
          <Sheet.Trigger className="flex lg:hidden" asChild>
            <Button variant="outline" size="icon">
              <Menu size={20} />
            </Button>
          </Sheet.Trigger>
          <div className="hidden sm:flex">
            <Logo />
          </div>
        </div>
        <div className="flex gap-2">
          <Notifications />
          {!!hasProject && <CommandMenu />}
          <LocaleSwitch />
          <ThemeSwitch />
          <ConfigDropdown />
        </div>
      </div>
      <Sheet.Content side="left" className="p-0 w-[300px]">
        <Sheet.Header className="px-10 py-4 pb-0">
          <Logo size={24} className="text-2xl" />
        </Sheet.Header>
        <Separator className="mt-4" />
        <div className="flex h-[calc(100vh-64px)]">
          <ScrollArea className="w-full h-full">
            <Sidebar />
          </ScrollArea>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  )
}

export { Header }
