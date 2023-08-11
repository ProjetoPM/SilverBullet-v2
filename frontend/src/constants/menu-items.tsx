import { t } from '@/utils/translate-text'
import { AlertCircle, Clock2, SearchCheck, Star, Users2 } from 'lucide-react'
import {
  FaBullhorn,
  FaMoneyBill,
  FaPeopleCarry,
  FaTrophy
} from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'

type fn = () => string

export type Areas = {
  id: string
  icon: JSX.Element
  name: fn
  description: fn
  background?: string
  border?: string
  phases: {
    id: string
    name: fn
    description: fn
    badges: [fn, fn?]
  }[]
}

export const items: Areas[] = [
  {
    id: 'integration',
    icon: <Star className="w-6 h-6" />,
    name: t('integration'),
    description: t('integration_description'),
    background: 'bg-neutral-600 text-white',
    border: 'border-l-neutral-600',
    phases: [
      {
        id: 'project-charter',
        name: t('project_charter'),
        description: () => 'todo', // TODO
        badges: [t('initiating')]
      },
      {
        id: 'business-case',
        name: t('business_case'),
        description: () => 'todo', // TODO
        badges: [t('initiating')]
      },
      {
        id: 'benefits-management-plan',
        name: t('benefits_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('initiating')]
      },
      {
        id: 'assumption-log',
        name: t('assumption_log'),
        description: () => 'todo', // TODO
        badges: [t('initiating')]
      },
      {
        id: 'project-management-plan',
        name: t('project_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'project-performance-and-monitoring-report',
        name: t('project_performance_and_monitoring_report'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'deliverable-status',
        name: t('deliverable_status'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'work-performance-reports',
        name: t('work_performance_reports'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'issue-log',
        name: t('issue_log'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'lesson-learned-register',
        name: t('lesson_learned_register'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'change-request',
        name: t('change_request'),
        description: () => 'todo', // TODO
        badges: [t('monitoring_and_controlling')]
      },
      {
        id: 'change-log',
        name: t('change_log'),
        description: () => 'todo', // TODO
        badges: [t('monitoring_and_controlling')]
      },
      {
        id: 'project-closure-term',
        name: t('project_closure_term'),
        description: () => 'todo', // TODO
        badges: [t('closing')]
      },
      {
        id: 'final-report',
        name: t('final_report'),
        description: () => 'todo', // TODO
        badges: [t('closing')]
      }
    ]
  },
  {
    id: 'scope',
    icon: <SearchCheck className="w-6 h-6" />,
    name: t('scope'),
    description: t('scope_description'),
    background: 'bg-green-800 text-white',
    border: 'border-l-green-600 dark:border-l-green-800',
    phases: [
      {
        id: 'requirements-management-plan',
        name: t('requirements_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'scope-management-plan',
        name: t('scope_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'requirement-documentation',
        name: t('requirement_documentation'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'project-scope-statement',
        name: t('project_scope_statement'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'work-breakdown-structure',
        name: t('work_breakdown_structure'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  },
  {
    id: 'schedule',
    icon: <Clock2 className="w-6 h-6" />,
    name: t('schedule'),
    description: t('schedule_description'),
    background: 'bg-yellow-900 text-white',
    border: 'border-l-yellow-600 dark:border-l-yellow-900',
    phases: [
      {
        id: 'schedule-management-plan',
        name: t('schedule_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'activity-list',
        name: t('activity_list'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'earned-value-management',
        name: t('earned_value_management'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'schedule-network-diagram',
        name: t('schedule_network_diagram'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'resource-requirements',
        name: t('resource_requirements'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'duration-estimates',
        name: t('duration_estimates'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'stakeholder-calendars',
        name: t('stakeholder_calendars'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  },
  {
    id: 'cost',
    icon: <FaMoneyBill className="w-6 h-6" />,
    name: t('cost'),
    description: t('cost_description'),
    background: 'bg-blue-900 text-white',
    border: 'border-l-blue-600 dark:border-l-blue-900',
    phases: [
      {
        id: 'cost-management-plan',
        name: t('cost_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'cost-estimates',
        name: t('cost_estimates'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  },
  {
    id: 'quality',
    icon: <FaTrophy className="w-6 h-6" />,
    name: t('quality'),
    description: t('quality_description'),
    background: 'bg-yellow-700 text-white',
    border: 'border-l-yellow-300 dark:border-l-yellow-700',
    phases: [
      {
        id: 'quality-management-plan',
        name: t('quality_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'product-quality-checklists',
        name: t('product_quality_checklists'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      },
      {
        id: 'quality-reports',
        name: t('quality_reports'),
        description: () => 'todo', // TODO
        badges: [t('monitoring_and_controlling')]
      }
    ]
  },
  {
    id: 'resources',
    icon: <FaPeopleCarry className="w-6 h-6" />,
    name: t('resources'),
    description: t('resources_description'),
    background: 'bg-purple-800 text-white',
    border: 'border-l-purple-300 dark:border-l-purple-800',
    phases: [
      {
        id: 'resource-management-plan',
        name: t('resource_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'resource-breakdown-structure',
        name: t('resource_breakdown_structure'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'team-performance-assessments',
        name: t('team_performance_assessments'),
        description: () => 'todo', // TODO
        badges: [t('executing')]
      }
    ]
  },
  {
    id: 'communication',
    icon: <FaBullhorn className="w-6 h-6" />,
    name: t('communication'),
    description: t('communication_description'),
    background: 'bg-yellow-950 text-white',
    border: 'border-l-yellow-300 dark:border-l-yellow-950',
    phases: [
      {
        id: 'communication-management-plan',
        name: t('communication_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  },
  {
    id: 'risk',
    icon: <AlertCircle className="w-6 h-6" />,
    name: t('risk'),
    description: t('risk_description'),
    background: 'bg-red-800 text-white',
    border: 'border-l-red-300 dark:border-l-red-800',
    phases: [
      {
        id: 'risk-management-plan',
        name: t('risk_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'risk-register',
        name: t('risk_register'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'general-project-risk-checklist',
        name: t('general_project_risk_checklist'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  },
  {
    id: 'procurement',
    icon: <IoMdPricetags className="w-6 h-6" />,
    name: t('procurement'),
    description: t('procurement_description'),
    background: 'bg-emerald-900 text-white',
    border: 'border-l-emerald-300 dark:border-l-emerald-900',
    phases: [
      {
        id: 'procurement-management-plan',
        name: t('procurement_management_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'procurement-statement-of-work',
        name: t('procurement_statement_of_work'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      },
      {
        id: 'closed-procurement-documentation',
        name: t('closed_procurement_documentation'),
        description: () => 'todo', // TODO
        badges: [t('monitoring_and_controlling')]
      }
    ]
  },
  {
    id: 'stakeholders',
    icon: <Users2 className="w-6 h-6" />,
    name: t('stakeholders'),
    description: t('stakeholders_description'),
    background: 'bg-sky-800 text-white',
    border: 'border-l-sky-300 dark:border-l-sky-800',
    phases: [
      {
        id: 'stakeholder-register',
        name: t('stakeholder_register'),
        description: () => 'todo', // TODO
        badges: [t('initiating')]
      },
      {
        id: 'stakeholder-engagement-plan',
        name: t('stakeholder_engagement_plan'),
        description: () => 'todo', // TODO
        badges: [t('planning')]
      }
    ]
  }
]
