export default (app) => {
  app.post(`/tenant/:tenantId/weekly-report/create`, require('./weeklyReportCreate').default);
  app.get(`/tenant/:tenantId/weekly-report/submissions`, require('./getSubmissions').default);
  app.get(`/weekly-report/groups`, require('./getWeeklyReportGroups').default);
};
