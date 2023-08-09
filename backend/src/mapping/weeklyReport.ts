import { IMetricGroup, IProcessGroup } from '../interfaces';

export const metricGroups: Array<IMetricGroup> = [
  {
    id: '1',
    metrics: [
      {
        name: 'NOK',
        value: 0,
      },
      {
        name: 'POK',
        value: 5,
      },
      {
        name: 'TOK',
        value: 10,
      },
    ],
  },
  {
    id: '2',
    metrics: [
      {
        name: 'NOK',
        value: 0,
      },
      {
        name: 'PNOK',
        value: 2.5,
      },
      {
        name: 'POK',
        value: 5,
      },
      {
        name: 'PTOK',
        value: 7.5,
      },
      {
        name: 'TOK',
        value: 10,
      },
    ],
  },
];

export const groups: Array<IProcessGroup> = [
  {
    id: '1',
    key: 'initiating',
    entities: [
      {
        id: '1',
        key: 'project_charter'
      },
      {
        id: '2',
        key: 'business_case',
      },
      {
        id: '3',
        key: 'benefits_management_plan',
      },
      {
        id: '4',
        key: 'assumption_log',
      },
      {
        id: '5',
        key: 'stakeholder_register',
      },
    ],
  },
  {
    id: '2',
    key: 'planning',
    entities: [
      {
        id: '1',
        key: 'project_management_plan',
      },
      {
        id: '2',
        key: 'requirements_management_plan',
      },
      {
        id: '3',
        key: 'requirement_documentation',
      },
      {
        id: '4',
        key: 'project_scope_statement',
      },
      {
        id: '5',
        key: 'work_breakdown_structure',
      },
      {
        id: '6',
        key: 'schedule_network_diagram',
      },
      {
        id: '7',
        key: 'stakeholder_calendars',
      },
      {
        id: '8',
        key: 'activity_list',
      },
      {
        id: '9',
        key: 'resource_requirements',
      },
      {
        id: '10',
        key: 'earned_value_management',
      },
      {
        id: '11',
        key: 'duration_estimates',
      },
      {
        id: '12',
        key: 'cost_management_plan',
      },
      {
        id: '13',
        key: 'cost_estimates',
      },
      {
        id: '14',
        key: 'quality_management_plan',
      },
      {
        id: '15',
        key: 'product_quality_checklists',
      },
      {
        id: '16',
        key: 'resource_management_plan',
      },
      {
        id: '17',
        key: 'resource_breakdown_structure',
      },
      {
        id: '18',
        key: 'communication_management_plan',
      },
      {
        id: '19',
        key: 'risk_management_plan',
      },
      {
        id: '20',
        key: 'risk_register',
      },
      {
        id: '21',
        key: 'general_project_risk_checklist',
      },
      {
        id: '22',
        key: 'procurement_management_plan',
      },
      {
        id: '23',
        key: 'procurement_statement_of_work',
      },
      {
        id: '24',
        key: 'stakeholder_engagement_plan',
      },
    ],
  },
  {
    id: '3',
    key: 'executing',
    entities: [
      {
        id: '1',
        key: 'project_performance_and_monitoring_report',
      },
      {
        id: '2',
        key: 'deliverable_status',
      },
      {
        id: '3',
        key: 'work_performance_reports',
      },
      {
        id: '4',
        key: 'issue_log',
      },
      {
        id: '5',
        key: 'lesson_learned_register',
      },
      {
        id: '5',
        key: 'product_quality_checklists',
      },
      {
        id: '6',
        key: 'quality_reports',
      },
      {
        id: '7',
        key: 'team_performance_assessments',
      },
      {
        id: '8',
        key: 'project_performance_and_monitoring_report',
      },
    ],
  },
  {
    id: '4',
    key: 'monitoring_and_controlling',
    entities: [
      {
        id: '1',
        key: 'change_request',
      },
      {
        id: '2',
        key: 'change_log',
      },
      {
        id: '3',
        key: 'closed_procurement_documentation',
      },
    ],
  },
  {
    id: '5',
    key: 'closing',
    entities: [
      {
        id: '1',
        key: 'project_closure_term',
      },
      {
        id: '2',
        key: 'final_report',
      },
    ],
  },
];
