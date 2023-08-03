import { Button, DropdownMenu } from '@/components/ui'
import { useTheme } from '@/stores/useTheme'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ThemeSwitch = () => {
  const setTheme = useTheme((state) => state.setTheme)
  const { t } = useTranslation()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('theme.change_theme')}</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          <div className="flex items-center space-x-2">
            <Moon size={16} />
            <span>{t('theme.light')}</span>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          <div className="flex items-center space-x-2">
            <Sun size={16} />
            <span>{t('theme.dark')}</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { ThemeSwitch }
