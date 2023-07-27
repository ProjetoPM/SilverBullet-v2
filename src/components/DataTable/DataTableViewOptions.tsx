import { Table } from '@tanstack/react-table'

import { Button, DropdownMenu } from '@/components/ui'
import { Settings2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" className="ml-auto gap-2">
          <Settings2 size={18} />
          {t('btn.view')}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenu.CheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenu.CheckboxItem>
            )
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
