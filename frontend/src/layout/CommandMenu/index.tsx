import { DebouncedInput } from '@/components/DataTable/DebouncedInput'
import { Button, Card, CommandDialog } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { areas } from '../../constants/menu-items'

export const CommandMenu = () => {
  const [filter, setFilter] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const filtered =
    filter.trim().length > 0
      ? areas.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
      : areas

  return (
    <>
      <Button
        className="px-3 justify-between"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <p className="text-sm items-center text-muted-foreground bg-outline rounded-lg">
          <span className="mr-4">Open menu</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="m-6 max-w-5xl"
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
          <div className="flex-1 mr-8">
            <DebouncedInput
              className={
                'h-11 border-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
              }
              placeholder="Search..."
              value={filter}
              onChange={(value) => setFilter(String(value))}
              debounce={150}
            />
          </div>
        </div>
        <h1 className="p-4 pb-0 text-2xl">Areas</h1>
        <div className="grid grid-cols-3 p-4 gap-3">
          {filtered.length === 0 && <span>No results</span>}
          {filtered.map((item) => (
            <Card.Root
              key={item.id}
              className={cn('border-l-8 cursor-pointer hover:scale-105', item.border)}
            >
              <Card.Header>
                <Card.Title className="flex gap-3 mb-3">
                  <span className="text-foreground/90">{item.icon}</span>
                  <span>{item.name}</span>
                </Card.Title>
                <Card.Description>{item.description}</Card.Description>
              </Card.Header>
            </Card.Root>
          ))}
        </div>
      </CommandDialog>
    </>
  )
}
