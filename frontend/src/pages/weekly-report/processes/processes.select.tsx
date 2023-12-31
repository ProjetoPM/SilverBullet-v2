import { Button, Command, Form, Popover, ScrollArea } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from '../hooks'
import { Phases } from '../hooks/usePhases'
import { FieldsProcessProps } from './processes.items'

type Select = {
  group: boolean
  name: boolean
}

const initialState = {
  group: false,
  name: false
}

export const SelectProcess = memo(
  ({
    index,
    form,
    control
  }: Pick<FieldsProcessProps, 'index' | 'form' | 'control'>) => {
    const { phases } = useWeeklyReport()
    const { t } = useTranslation(['phases', 'weekly-report'])
    const [open, setOpen] = useState<Select>(initialState)

    const [group, setGroup] = useState(
      form.getValues(`processes.${index}.group`) || '-1'
    )

    const onSelect = (
      data: Pick<Phases, 'id' | 'key'>,
      type: 'group' | 'name'
    ) => {
      form.setValue(`processes.${index}.${type}`, data.id)
      form.clearErrors(`processes.${index}.${type}`)

      switch (type) {
        case 'group':
          setGroup(data.id)
          form.setValue(`processes.${index}.name`, '')
          break
      }
      setOpen(initialState)
    }

    return (
      <>
        <Form.Field
          control={control}
          name={`processes.${index}.group`}
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>
                {t('weekly-report:process_group.label')}
              </Form.Label>
              <div className="flex flex-col gap-1">
                <Popover.Root
                  open={open.group}
                  onOpenChange={() =>
                    setOpen({
                      ...initialState,
                      group: !open.group
                    })
                  }
                >
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {t(
                          phases?.find((group) => group.id === field.value)
                            ?.key ?? 'weekly-report:process_group.placeholder'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="p-0">
                    <Command.Root>
                      <Command.Input
                        className="w-72 xs:w-80 md:w-96"
                        placeholder={t('weekly-report:search_process_group')}
                      />
                      <Command.Empty>
                        {t('weekly-report:no_results_found')}
                      </Command.Empty>
                      <ScrollArea className="max-h-[300px]">
                        <Command.Group>
                          {phases?.map((group) => (
                            <Command.Item
                              value={t(group.key)}
                              key={group.id}
                              onSelect={() => onSelect(group, 'group')}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  group.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {t(group.key)}
                            </Command.Item>
                          ))}
                        </Command.Group>
                      </ScrollArea>
                    </Command.Root>
                  </Popover.Content>
                </Popover.Root>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />
        <Form.Field
          control={control}
          name={`processes.${index}.name`}
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>
                {t('weekly-report:process_name.label')}
              </Form.Label>
              <div className="flex flex-col gap-1">
                <Popover.Root
                  open={open.name}
                  onOpenChange={() =>
                    setOpen({
                      ...initialState,
                      name: !open.name
                    })
                  }
                >
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {t(
                          phases?.[+group - 1]?.entities.find(
                            (name) => name.id === field.value
                          )?.key ?? 'weekly-report:process_name.placeholder'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="p-0">
                    <Command.Root>
                      {group !== '-1' && (
                        <>
                          <Command.Input
                            className="w-72 xs:w-80 md:w-96"
                            placeholder={t('weekly-report:search_process_name')}
                          />
                          <Command.Empty>
                            {t('weekly-report:no_results_found')}
                          </Command.Empty>
                          <ScrollArea className="max-h-[300px]">
                            <Command.Group>
                              {phases?.[+group - 1]?.entities.map((name) => (
                                <Command.Item
                                  id={name.key}
                                  value={t(name.key)}
                                  key={name.id}
                                  onSelect={() => onSelect(name, 'name')}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      name.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {t(name.key)}
                                </Command.Item>
                              ))}
                            </Command.Group>
                          </ScrollArea>
                        </>
                      )}
                      {group === '-1' && (
                        <Command.Item>
                          {t('weekly-report:select_process_group_first')}
                        </Command.Item>
                      )}
                    </Command.Root>
                  </Popover.Content>
                </Popover.Root>
                <Form.Message />
              </div>
            </Form.Item>
          )}
        />
      </>
    )
  }
)
