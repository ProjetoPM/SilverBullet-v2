import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import i18next from 'i18next'
import { Languages } from 'lucide-react'
import { ComponentProps, useEffect } from 'react'
import { Avatar, Button } from '../ui'
import { DropdownMenu } from '../ui/DropdownMenu'
import { languages } from './configs'

type LanguageSwitcherProps = ComponentProps<'div'>

const LocaleSwitch = ({ className, ...props }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()

  const resetErrorMessages = () => {
    const elements = document.querySelectorAll('[id*="form-item-message"]')
    elements.forEach((element) => (element.innerHTML = ''))
  }

  const changeHtmlLang = (lang: string) => {
    document.getElementsByTagName('html')[0].setAttribute('lang', lang)
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    changeHtmlLang(lang)
    resetErrorMessages()
  }

  useEffect(() => {
    changeHtmlLang(i18next.language)
  }, [])

  return (
    <>
      <div className={cn('flex', className)} {...props}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" size="icon">
              <Languages size={20} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-36">
            <DropdownMenu.Group>
              {languages.map((lang) => (
                <DropdownMenu.Item
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn('h-10', {
                    'bg-accent/50': lang.code === i18next.language
                  })}
                >
                  <div className="flex items-center justify-center">
                    <Avatar.Root className="flex items-center justify-center">
                      <Avatar.Fallback className="w-6 h-6">
                        {lang.fallback}
                      </Avatar.Fallback>
                      <Avatar.Image
                        src={lang.flag}
                        alt={lang.name}
                        className="w-6 h-6"
                      />
                    </Avatar.Root>
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
