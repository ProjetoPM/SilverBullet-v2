import { DebouncedInput } from '@/components/DataTable/DebouncedInput'
import { Badge, Button, Card, CommandDialog } from '@/components/ui'
import { cn } from '@/lib/utils'
import i18next from 'i18next'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { items } from '../../constants/menu-items'

export const CommandMenu = () => {
  const { t } = useTranslation(['areas', 'phases', 'menu'])
  const [search, setSearch] = useState('')
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
    search.length > 0
      ? items
          .flatMap((area) =>
            area.phases.map((phase) => ({
              ...phase,
              area: area.name,
              background: area.background,
              icon: area.icon,
              border: area.border
            }))
          )
          .filter((phase) =>
            phase.name().toLowerCase().includes(search.toLowerCase())
          )
      : undefined

  return (
    <>
      <Button
        className="px-3 justify-between"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <p className="text-sm items-center text-muted-foreground bg-outline rounded-lg">
          <span className="mr-4">Menu</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="max-w-[1095px] max-h-screen lg:max-h-[772px] lg:min-h-[772px] overflow-y-auto"
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
          <div className="flex-1 mr-8">
            <DebouncedInput
              className={
                'h-11 border-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0'
              }
              placeholder={t('menu:search_phases')}
              value={search}
              onChange={(value) => setSearch(String(value))}
              debounce={250}
            />
          </div>
        </div>
        <h1 className="p-4 pb-0 text-2xl">
          {t(filtered ? 'phases:name' : 'areas:name')}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-3">
          {filtered?.length === 0 && (
            <span>{t('default:label.no_results')}</span>
          )}
          {!filtered &&
            items.map((item) => (
              <Card.Root
                key={item.id}
                className={cn(
                  'border-l-8 cursor-pointer hover:scale-[103%]',
                  item.border
                )}
              >
                <Card.Header>
                  <Card.Title className="flex items-center gap-3 mb-3">
                    <span className="text-foreground/90">{item.icon}</span>
                    <span>{item.name()}</span>
                  </Card.Title>
                  <Card.Description
                    className="text-justify hyphens-auto"
                    lang={i18next.language}
                  >
                    {item.description()}
                  </Card.Description>
                </Card.Header>
              </Card.Root>
            ))}
          {filtered &&
            filtered.map((item) => (
              <Card.Root
                id={item.id}
                key={item.id}
                className={cn(
                  'border-l-8 cursor-pointer hover:scale-105',
                  item.border
                )}
              >
                <Card.Header>
                  <Card.Title className="flex items-center gap-3 mb-3 text-base">
                    <span className="text-foreground/90">{item.icon}</span>
                    <span className="truncate hover:whitespace-normal">
                      {item.name()}
                    </span>
                  </Card.Title>
                  {item.description && (
                    <Card.Description>{item.description()}</Card.Description>
                  )}
                </Card.Header>
                <Card.Content className="flex gap-2 peer">
                  <Badge variant={'ghost'} className={item?.background}>
                    {item.area()}
                  </Badge>
                  {item.badges.map((badge) => {
                    return (
                      <Badge key={badge?.()} variant={'outline'}>
                        {badge?.()}
                      </Badge>
                    )
                  })}
                </Card.Content>
              </Card.Root>
            ))}
        </div>
      </CommandDialog>
    </>
  )
}
