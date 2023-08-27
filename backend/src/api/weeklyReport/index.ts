export default (app) => {
  app.post(`/tenant/:tenantId/weekly-report/create`, require('./create').default);
  app.put(`/tenant/:tenantId/weekly-report/:id`, require('./update').default);
  app.get(`/tenant/:tenantId/weekly-report/submissions`, require('./getSubmissions').default);
  app.get(`/tenant/:tenantId/weekly-report/list`, require('./getWeeklyReportsByUser').default);
  app.get(`/tenant/:tenantId/weekly-report/:id`, require('./find').default);
  app.get(`/weekly-report/groups`, require('./getWeeklyReportGroups').default);
};
