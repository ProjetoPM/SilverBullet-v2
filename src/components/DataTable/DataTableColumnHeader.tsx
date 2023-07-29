import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronDownSquare, EyeOff } from 'lucide-react'

import { Button, DropdownMenu } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  header: React.ReactNode | string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  header,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{header}</span>
            {column.getIsSorted() === 'desc' && (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() === 'asc' && (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() !== 'asc' &&
              column.getIsSorted() !== 'desc' && (
                <ChevronDownSquare className="ml-2 h-4 w-4" />
              )}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenu.Item onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                {t('asc')}
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                {t('desc')}
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
            </>
          )}
          <DropdownMenu.Item onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('hide_column')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
