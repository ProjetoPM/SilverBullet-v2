export type Phases = {
  id: string
  key: string
  entities: {
    id: string
    key: string
  }[]
}

export const phases = [
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
        key: 'business_case'
      }
    ]
  },
  {
    id: '2',
    key: 'planning',
    entities: [
      {
        id: '1',
        key: 'project_management_plan'
      },
      {
        id: '2',
        key: 'requirements_management_plan'
      }
    ]
  }
]
