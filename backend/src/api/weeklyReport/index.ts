export default (app) => {
  app.post(`/tenant/:tenantId/project/:projectId/weekly-report/create`, require('./create').default);
  app.put(`/tenant/:tenantId/project/:projectId/weekly-report/:id`, require('./update').default);
  app.put(`/tenant/:tenantId/weekly-report/:id`, require('./evaluateSubmission').default);
  app.delete(`/tenant/:tenantId/project/:projectId/weekly-report`, require('./delete').default);
  app.get(`/tenant/:tenantId/weekly-report/submissions`, require('./getSubmissions').default);
  app.get(`/tenant/:tenantId/project/:projectId/weekly-report/list`, require('./getWeeklyReportsByUser').default);
  app.get(`/tenant/:tenantId/weekly-evaluation/:id/reports`, require('./getWeeklyReportsByEvaluation').default);
  app.get(`/tenant/:tenantId/project/:projectId/weekly-report/:id`, require('./find').default);
  app.get(`/tenant/:tenantId/weekly-report/:id`, require('./adminFind').default);
  app.get(`/weekly-report/groups`, require('./getWeeklyReportGroups').default);
};
