export const routes = {
  auth: {
    index: '/',
    register: '/register'
  },
  workspaces: {
    index: '/workspaces',
    new: '/workspaces/new',
    edit: '/workspaces/:id/edit'
  },
  projects: {
    index: '/projects',
    new: '/projects/new',
    edit: '/projects/:id/edit'
  },
  weekly_report: {
    index: '/weekly-report',
    new: '/weekly-report/new'
  }
}
