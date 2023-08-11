import { t } from '@/utils/translate-text'
import { AlertCircle, Clock2, SearchCheck, Star, Users2 } from 'lucide-react'
import { FaBullhorn, FaMoneyBill, FaPeopleCarry, FaTrophy } from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'

type Function = () => string

export type Areas = {
  id: string
  icon: JSX.Element
  name: Function
  description: Function
  border: string
  phases: {
    id: string
    name: Function
    description: Function
    badges: [Function, Function?]
  }[]
}

export const items: Areas[] = [
  {
    id: 'integration',
    icon: <Star />,
    name: t('integration'),
    description: t('integration_description'),
    border: 'border-l-neutral-700',
    phases: [
      {
        id: 'project-charter',
        name: t('project_charter'),
        description: () => 'Descrição!',
        badges: [t('initiating')]
      },
      {
        id: 'business-case',
        name: t('business_case'),
        description: () => 'Descrição!',
        badges: [t('initiating')]
      },
      {
        id: 'benefits-management-plan',
        name: t('benefits_management_plan'),
        description: () => 'Descrição!',
        badges: [t('initiating')]
      }
    ]
  },
  {
    id: 'scope',
    icon: <SearchCheck />,
    name: t('scope'),
    description: t('scope_description'),
    border: 'border-l-green-600 dark:border-l-green-800',
    phases: [
      {
        id: 'teste',
        name: t('benefits_management_plan'),
        description: t('Just a test!'),
        badges: [t('initiating')]
      }
    ]
  },
  {
    id: 'schedule',
    icon: <Clock2 />,
    name: t('schedule'),
    description: t('schedule_description'),
    border: 'border-l-yellow-600 dark:border-l-yellow-900',
    phases: []
  },
  {
    id: 'cost',
    icon: <FaMoneyBill />,
    name: t('cost'),
    description: t('cost_description'),
    border: 'border-l-blue-600 dark:border-l-blue-900',
    phases: []
  },
  {
    id: 'quality',
    icon: <FaTrophy />,
    name: t('quality'),
    description: t('quality_description'),
    border: 'border-l-yellow-300 dark:border-l-yellow-700',
    phases: []
  },
  {
    id: 'resources',
    icon: <FaPeopleCarry />,
    name: t('resources'),
    description: t('resources_description'),
    border: 'border-l-purple-300 dark:border-l-purple-800',
    phases: []
  },
  {
    id: 'communication',
    icon: <FaBullhorn />,
    name: t('communication'),
    description: t('communication_description'),
    border: 'border-l-yellow-300 dark:border-l-yellow-950',
    phases: []
  },
  {
    id: 'risk',
    icon: <AlertCircle />,
    name: t('risk'),
    description: t('risk_description'),
    border: 'border-l-red-300 dark:border-l-red-800',
    phases: []
  },
  {
    id: 'procurement',
    icon: <IoMdPricetags />,
    name: t('procurement'),
    description: t('procurement_description'),
    border: 'border-l-emerald-300 dark:border-l-emerald-900',
    phases: []
  },
  {
    id: 'stakeholders',
    icon: <Users2 />,
    name: t('stakeholders'),
    description: t('stakeholders_description'),
    border: 'border-l-sky-300 dark:border-l-sky-800',
    phases: []
  }
]
