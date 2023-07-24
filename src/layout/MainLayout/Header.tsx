import { LocaleSwitch, ThemeSwitch } from '@/components/Features'
import { Logo } from '@/components/Logo'
import { Button, Separator, Sheet } from '@/components/ui'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { PanelLeftOpen } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { UserDropdown } from './UserDropdown'

const Header = () => {
  return (
    <Sheet.Root>
      <div className="flex flex-1 items-center justify-between mx-5">
        <div className="flex flex-1 gap-3">
          <Sheet.Trigger className="flex lg:hidden" asChild>
            <Button variant="outline" size="icon">
              <PanelLeftOpen size={20} />
            </Button>
          </Sheet.Trigger>
          <Logo />
        </div>
        <div className="flex gap-2">
          <LocaleSwitch />
          <ThemeSwitch />
          <UserDropdown />
        </div>
      </div>
      <Sheet.Content side="left" className="p-0 w-[256px]">
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
