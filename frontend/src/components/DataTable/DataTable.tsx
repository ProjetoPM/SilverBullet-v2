import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table } from '@/components/ui'
import i18next from 'i18next'
import { ComponentProps, useState } from 'react'
import { Loading } from '../Loading'
import { DataTableHeader } from './DataTableHeader'
import { DataTablePagination } from './DataTablePagination'

interface FetchingProps {
  isLoading?: boolean
  isError?: boolean
  fn?: Function
}

interface DataTableProps<TData, TValue>
  extends FetchingProps,
    ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isError = false,
  isLoading = false,
  fn,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection
    }
  })

  if (isError) {
    return (
      <div className="text-lg font-extrabold">
        Oops! Something went{' '}
        <span className="text-red-600 dark:text-red-500">wrong</span>.
      </div>
    )
  }

  return (
    <div {...props}>
      <DataTableHeader
        table={table}
        fn={fn}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Head key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.Head>
                  )
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {isLoading && (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loading className="h-24" />
                </Table.Cell>
              </Table.Row>
            )}
            {!isLoading &&
              table.getRowModel().rows?.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            {!isLoading && table.getRowModel().rows?.length === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {i18next.t('label.no_results')}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
