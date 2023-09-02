import { Button } from '@/components/ui'
import { useThemeStore } from '@/stores/useThemeStore'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ThemeSwitch = () => {
  const [theme, setTheme] = useThemeStore((state) => [
    state.theme,
    state.setTheme
  ])
  const { t } = useTranslation()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' && (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      {theme === 'dark' && (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">{t('theme.change_theme')}</span>
    </Button>
  )
}

export { ThemeSwitch }
