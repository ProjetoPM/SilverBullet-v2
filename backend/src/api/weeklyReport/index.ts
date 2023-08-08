export default (app) => {
  app.post(`/tenant/:tenantId/weekly-evaluation/:weeklyEvaluationId/weekly-report/create`, require('./weeklyReportCreate').default);
  app.get(`/tenant/:tenantId/project-list`, require('./projectList').default);
  app.get(`/tenant/:tenantId/project/:id`, require('./projectFind').default);
  app.put(`/tenant/:tenantId/project/:id`, require('./projectUpdate').default);
  app.delete(`/tenant/:tenantId/project`, require('./projectDestroy').default);

};
