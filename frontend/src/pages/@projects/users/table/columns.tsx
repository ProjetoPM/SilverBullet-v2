import { Users } from '@/@types/generic'
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Badge, Checkbox } from '@/components/ui'
import { cn } from '@/lib/utils'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import React from 'react'
import { ProjectUsersActions } from './projects.users.actions'

const helper = createColumnHelper<Users>()

export const columns = [
  /**
   * Select
   */
  helper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('select_all')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('select_row')}
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  /**
   * Name
   */
  helper.accessor((row) => row.email, {
    id: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:email')} />
    ),
    cell: ({ row }) => (
      <div id={`email-${row.index}`}>
        {replaceHtmlTags(row.getValue('email'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:status')} />
    ),
    cell: ({ row }) => {
      const getStatus = () => {
        switch (row.getValue('status')) {
          case 'active':
            return {
              label: t('workspace:label.active'),
              color: 'bg-green-700 hover:bg-green-800'
            }
          case 'invited':
            return {
              label: t('workspace:label.pending'),
              color:
                'bg-orange-500 dark:bg-orange-500/60 hover:bg-orange-500/70'
            }
          default:
            return {
              label: 'Error',
              color: 'bg-red-500 dark:bg-red-500/60 hover:bg-red-500/70'
            }
        }
      }
      const status = getStatus()

      return (
        <div id={`plan-status-${row.index}`}>
          <Badge className={cn('text-white', status.color)}>
            {status.label}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Roles
   */
  helper.display({
    id: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:roles')} />
    ),
    cell: ({ row }) => {
      const roles = row.original.roles ?? []

      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role, index) => {
            return (
              <React.Fragment key={index}>
                <Badge className="text-white bg-neutral-500 hover:bg-neutral-600 dark:bg-accent dark:hover:bg-accent/50">
                  {role}
                </Badge>
              </React.Fragment>
            )
          })}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:actions')} />
    ),
    cell: ({ row }) => {
      return <ProjectUsersActions id="users" data={row.original} />
    },
    enableHiding: true
  })
]
