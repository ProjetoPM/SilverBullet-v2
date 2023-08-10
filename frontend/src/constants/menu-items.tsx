import { AlertCircle, Clock2, SearchCheck, Star, Users2 } from 'lucide-react'
import { FaBullhorn, FaMoneyBill, FaPeopleCarry, FaTrophy } from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'

type MenuItemsProps = {
  id: string
  icon: JSX.Element
  name: string
  description: string
  border: string
}

export const areas: MenuItemsProps[] = [
  {
    id: 'integration',
    icon: <Star />,
    name: 'Integration',
    description:
      'Coordinates the project areas to achieve objectives, fundamental for project management.',
    border: 'border-l-neutral-700'
  },
  {
    id: 'scope',
    icon: <SearchCheck />,
    name: 'Scope',
    description:
      "Documents what is included and excluded from the project, ensuring that it meets the client's objectives.",
    border: 'border-l-green-600 dark:border-l-green-800'
  },
  {
    id: 'schedule',
    icon: <Clock2 />,
    name: 'Schedule',
    description: 'Defines activities, sequencing, duration estimates, and project change control.',
    border: 'border-l-yellow-600 dark:border-l-yellow-900'
  },
  {
    id: 'cost',
    icon: <FaMoneyBill />,
    name: 'Cost',
    description: 'Plans, manages, and controls project costs to meet the defined budget.',
    border: 'border-l-blue-600 dark:border-l-blue-900'
  },
  {
    id: 'quality',
    icon: <FaTrophy />,
    name: 'Quality',
    description:
      'Ensures that the project meets the quality requirements and standards established by the client.',
    border: 'border-l-yellow-300 dark:border-l-yellow-700'
  },
  {
    id: 'resources',
    icon: <FaPeopleCarry />,
    name: 'Resources',
    description:
      'Ensures that the project meets the quality requirements and standards established by the client.',
    border: 'border-l-purple-300 dark:border-l-purple-800'
  },
  {
    id: 'communication',
    icon: <FaBullhorn />,
    name: 'Communication',
    description:
      'Ensures that the project meets the quality requirements and standards established by the client.',
    border: 'border-l-yellow-300 dark:border-l-yellow-950'
  },
  {
    id: 'risk',
    icon: <AlertCircle />,
    name: 'Risk',
    description:
      'Identifies, evaluates, and manages project risks, minimizing their negative effects.',
    border: 'border-l-red-300 dark:border-l-red-800'
  },
  {
    id: 'procurement',
    icon: <IoMdPricetags />,
    name: 'Procurement',
    description:
      'Plans, manages, and controls the acquisition of products and services necessary for the project.',
    border: 'border-l-emerald-300 dark:border-l-emerald-900'
  },
  {
    id: 'stakeholders',
    icon: <Users2 />,
    name: 'Stakeholders',
    description:
      'Identifies and manages project stakeholders, ensuring satisfaction of their needs.',
    border: 'border-l-sky-300 dark:border-l-sky-800'
  }
]
