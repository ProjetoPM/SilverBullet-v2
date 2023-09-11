import { FolderPlus, LogOut, Settings, User } from 'lucide-react'

import { Button, DropdownMenu } from '@/components/ui'
import { routes } from '@/routes/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Dropdown = () => {
  const signOut = useAuthStore((state) => state.signOut)
  const { t } = useTranslation(['default', 'workspace'])
  const email = useAuthStore((state) => state.email)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="icon">
          <Settings size={20} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56" align="end">
        <DropdownMenu.Label>{t('default:my_account')}</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="bg-accent/60 grid grid-cols-[auto,1fr] gap-2"
          onClick={() => navigator.clipboard.writeText(email ?? 'error')}
        >
          <User className="w-4 h-4" />
          <span className="truncate">{email}</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <User className="mr-2 h-4 w-4" />
            <span>{t('default:profile.label')}</span>
            <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('default:settings.label')}</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <Link to={routes.workspaces.new}>
            <DropdownMenu.Item>
              <FolderPlus className="mr-2 h-4 w-4" />
              <span>{t('workspace:new.title')}</span>
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('default:log_out')}</span>
          <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { Dropdown }
