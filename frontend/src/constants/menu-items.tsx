import { Translate } from '@/components/Utils/Translate'
import { AlertCircle, Clock2, SearchCheck, Star, Users2 } from 'lucide-react'
import { FaBullhorn, FaMoneyBill, FaPeopleCarry, FaTrophy } from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'

type Function = () => string | JSX.Element

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
    badges: [string, string?]
  }[]
}

export const areas: Areas[] = [
  {
    id: 'integration',
    icon: <Star />,
    name: () => <Translate text="integration" ns="areas" />,
    description: () => <Translate text="integration_description" ns="areas" />,
    border: 'border-l-neutral-700',
    phases: [
      {
        id: 'project_charter',
        name: () => <Translate text="project_charter" ns="phases" />,
        description: () => 'Descrição!',
        badges: ['Initiating']
      },
      {
        id: 'business_case',
        name: () => <Translate text="business_case" ns="phases" />,
        description: () => 'Descrição!',
        badges: ['Initiating']
      },
      {
        id: 'benefits_management_plan',
        name: () => <Translate text="benefits_management_plan" ns="phases" />,
        description: () => 'Descrição!',
        badges: ['Initiating']
      }
    ]
  },
  {
    id: 'scope',
    icon: <SearchCheck />,
    name: () => <Translate text="scope" ns="areas" />,
    description: () => <Translate text="scope_description" ns="areas" />,
    border: 'border-l-green-600 dark:border-l-green-800',
    phases: [
      {
        id: 'benefits_management_plan',
        name: () => <Translate text="benefits_management_plan" ns="phases" />,
        description: () => 'Just a test!',
        badges: ['Initiating']
      }
    ]
  },
  {
    id: 'schedule',
    icon: <Clock2 />,
    name: () => <Translate text="schedule" ns="areas" />,
    description: () => <Translate text="schedule_description" ns="areas" />,
    border: 'border-l-yellow-600 dark:border-l-yellow-900',
    phases: []
  },
  {
    id: 'cost',
    icon: <FaMoneyBill />,
    name: () => <Translate text="cost" ns="areas" />,
    description: () => <Translate text="cost_description" ns="areas" />,
    border: 'border-l-blue-600 dark:border-l-blue-900',
    phases: []
  },
  {
    id: 'quality',
    icon: <FaTrophy />,
    name: () => <Translate text="quality" ns="areas" />,
    description: () => <Translate text="quality_description" ns="areas" />,
    border: 'border-l-yellow-300 dark:border-l-yellow-700',
    phases: []
  },
  {
    id: 'resources',
    icon: <FaPeopleCarry />,
    name: () => <Translate text="resources" ns="areas" />,
    description: () => <Translate text="resources_description" ns="areas" />,
    border: 'border-l-purple-300 dark:border-l-purple-800',
    phases: []
  },
  {
    id: 'communication',
    icon: <FaBullhorn />,
    name: () => <Translate text="communication" ns="areas" />,
    description: () => <Translate text="communication_description" ns="areas" />,
    border: 'border-l-yellow-300 dark:border-l-yellow-950',
    phases: []
  },
  {
    id: 'risk',
    icon: <AlertCircle />,
    name: () => <Translate text="risk" ns="areas" />,
    description: () => <Translate text="risk_description" ns="areas" />,
    border: 'border-l-red-300 dark:border-l-red-800',
    phases: []
  },
  {
    id: 'procurement',
    icon: <IoMdPricetags />,
    name: () => <Translate text="procurement" ns="areas" />,
    description: () => <Translate text="procurement_description" ns="areas" />,
    border: 'border-l-emerald-300 dark:border-l-emerald-900',
    phases: []
  },
  {
    id: 'stakeholders',
    icon: <Users2 />,
    name: () => <Translate text="stakeholders" ns="areas" />,
    description: () => <Translate text="stakeholders_description" ns="areas" />,
    border: 'border-l-sky-300 dark:border-l-sky-800',
    phases: []
  }
]
