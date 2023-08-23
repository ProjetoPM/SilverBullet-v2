import {
  Button,
  Dialog,
  Input,
  Label,
  ScrollArea,
  Select
} from '@/components/ui'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import { Download, ListRestart, Upload, UserPlus2, XCircle } from 'lucide-react'
import Papa from 'papaparse'
import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useProjectsInvites } from '../../hooks/useProjectInvites'
import { template } from './template'

export interface Invites {
  email: string
  role: string
}

type InviteUsersProps = {
  onOpenChange: (open: boolean) => void
}

export const InviteUsers = ({ onOpenChange }: InviteUsersProps) => {
  const { t } = useTranslation('invites')
  const [invites, setInvites] = useState<Invites[]>([])
  const [role, setRoles] = useState('')
  const [emailInput, setEmailInput] = useState('manager')
  const { create } = useProjectsInvites({})

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && emailInput.trim() !== '') {
      const split = emailInput.split(',').map((email) => email.trim())

      /**
       * Filtrando os e-mails que ainda não existem na lista,
       * ignorando os repetidos, caso haja.
       */
      const uniqueEmails = split.filter(
        (email) => !invites.some((invite) => invite.email === email)
      )
      uniqueEmails.forEach((email) => {
        invites.push({ email, role })
      })
      setEmailInput('')
    }
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data.slice(0) as Invites[]

          if (data && data.length > 0) {
            const uniqueEmails = data.filter(
              (email) => !invites.some((invite) => invite.email === email.email)
            )
            setInvites([...invites, ...uniqueEmails])
          }
        },
        header: true
      })
      /**
       * Resetando o arquivo para que possa ser usado o mesmo arquivo,
       * caso queira novamente.
       */
      event.target.files = new DataTransfer().files
    }
  }

  const downloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'template.csv'
    link.click()
  }

  const onRemove = (index: number) => {
    const updatedEmails = invites.filter((_, i) => i !== index)
    setInvites(updatedEmails)
  }

  const resetAll = () => {
    setInvites([])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (invites.length === 0) {
      toast.info(t('insert_at_least_one_email'))
      return
    }
    await create.mutateAsync(invites)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog.Header>
        <Dialog.Title className="flex items-center gap-2 text-2xl">
          <UserPlus2 size={28} /> {t('invite_users')}
        </Dialog.Title>
        <Dialog.Description className="text-base">
          {t('invite_users_description')}
        </Dialog.Description>
      </Dialog.Header>
      <Input
        className="hidden"
        type="file"
        id="upload-file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col xs:flex-row gap-2">
        <Button
          className="flex flex-grow gap-2"
          variant={'secondary'}
          onClick={() => document.getElementById('upload-file')?.click()}
        >
          <Upload className="w-5 h-5" />
          {t('import_from_template')}
        </Button>
        <Button
          variant={'outline'}
          className="gap-2"
          onClick={downloadTemplate}
        >
          <Download className="w-5 h-5" />
          {t('download_template')}
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="emails">{t('label_emails')}</Label>
          <div className="flex gap-2">
            <Input
              id="emails"
              className="flex-grow"
              placeholder={t('placeholder_emails')}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Tooltip.Provider>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger asChild>
                  <Button size={'icon'} variant={'outline'} onClick={resetAll}>
                    <ListRestart className="w-5 h-5" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <span>{t('clear_all')}</span>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="roles">{t('role')}</Label>
          <Select.Root
            defaultValue="manager"
            onValueChange={(e) => setRoles(e)}
          >
            <Select.Trigger id="roles" className="flex-grow">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {[
                  'manager',
                  'developer',
                  'stakeholder',
                  'professor',
                  'admin'
                ].map((role) => (
                  <React.Fragment key={role}>
                    <Select.Item value={role}>{t(`role_${role}`)}</Select.Item>
                  </React.Fragment>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div className="space-y-1">
          <Label>{t('users_to_be_invited')}</Label>
          <div className={'border border-dashed rounded-lg p-2'}>
            <ScrollArea
              className={'max-h-full md:min-h-[10rem] md:max-h-[14rem]'}
            >
              {invites.length === 0 ? (
                <span className="text-sm text-neutral-300 dark:text-neutral-600 select-none h-full">
                  {t('no_email_provided')}
                </span>
              ) : (
                <div className="flex items-center flex-wrap gap-2">
                  {invites.map((invite, index) => (
                    <span
                      key={index}
                      className={cn(
                        'flex items-center border rounded-md px-2 py-1 gap-1',
                        {
                          'border-foreground/10 dark:border-accent':
                            invite.role === 'manager'
                        },
                        {
                          'border-sky-700/70 dark:border-sky-800/70':
                            invite.role === 'developer'
                        },
                        {
                          'border-green-600/70 dark:border-green-700/70':
                            invite.role === 'stakeholder'
                        },
                        {
                          'border-orange-700/70 dark:border-orange-800/70':
                            invite.role === 'professor'
                        },
                        {
                          'border-red-900/80': invite.role === 'admin'
                        }
                      )}
                    >
                      <span className="text-sm">{invite.email}</span>
                      <XCircle
                        size={17}
                        onClick={() => onRemove(index)}
                        className="cursor-pointer text-neutral-300 dark:text-neutral-600 hover:text-red-500 dark:hover:text-destructive transition-colors duration-300"
                      />
                    </span>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <Button className="flex-grow" onClick={() => onOpenChange(false)}>
          {t('btn_send_invite')}
        </Button>
      </form>
    </>
  )
}
