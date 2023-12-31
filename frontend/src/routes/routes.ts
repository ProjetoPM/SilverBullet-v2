export const routes = {
  auth: {
    index: '/',
    register: '/register'
  },
  workspaces: {
    index: '/workspaces',
    new: '/workspaces/new',
    edit: '/workspaces/:id/edit',
    users: {
      index: '/workspaces/:id/users'
    }
  },
  projects: {
    index: '/projects',
    new: '/projects/new',
    edit: '/projects/:id/edit',
    users: {
      index: '/projects/:id/users'
    }
  },
  weekly_report: {
    index: '/weekly-report',
    new: '/weekly-report/new',
    edit: '/weekly-report/:id/edit'
  },
  weekly_evaluation: {
    index: '/weekly-evaluation',
    new: '/weekly-evaluation/new',
    edit: '/weekly-evaluation/:id/edit'
  },
  integration: {
    project_charter: {
      index: '/project-charter'
    }
  }
}
