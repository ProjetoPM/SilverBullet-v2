import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import { ComponentProps } from 'react'
import { Button } from '../ui'
import { DropdownMenu } from '../ui/DropdownMenu'

const languages = [
  {
    code: 'en-US',
    name: 'English'
  },
  {
    code: 'pt-BR',
    name: 'Português'
  }
]

type LanguageSwitcherProps = ComponentProps<'div'>

const LocaleSwitch = ({ className, ...props }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <div className={cn('flex', className)} {...props}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" size="icon">
              <Languages size={20} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-11">
            <DropdownMenu.Group>
              {languages.map((lang) => (
                <DropdownMenu.Item
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <div className="flex items-center space-x-2">
                    {/* <User size={16} /> */}
                    <span>{lang.name}</span>
                  </div>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  )
}

export { LocaleSwitch }
