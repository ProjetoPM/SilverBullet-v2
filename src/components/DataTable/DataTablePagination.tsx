import { Table } from '@tanstack/react-table'

import { Button, Select } from '@/components/ui'
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center md:justify-between mt-3 px-2">
      <div className="hidden md:flex flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} {t('of')}{' '}
        {table.getFilteredRowModel().rows.length} {t('rows_selected')}.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t('rows_per_page')}</p>
          <Select.Root
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <Select.Trigger className="h-8 w-[70px]">
              <Select.Value
                placeholder={table.getState().pagination.pageSize}
              />
            </Select.Trigger>
            <Select.Content side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <Select.Item key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
        <div className="hidden md:flex w-[100px] items-center justify-center text-sm font-medium">
          {t('page')} {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t('first_page')}</span>
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t('btn.previous')}</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t('next')}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t('last_page')}</span>
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
