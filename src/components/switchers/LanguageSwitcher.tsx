import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import { ComponentProps } from 'react'
import { Button } from '../ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

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

const LanguageSwitcher = ({ className, ...props }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <div className={cn('flex', className)} {...props}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-11">
            <DropdownMenuGroup>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <div className="flex items-center space-x-2">
                    {/* <User size={16} /> */}
                    <span>{lang.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default LanguageSwitcher
