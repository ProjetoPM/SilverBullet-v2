export default (app) => {
  app.post(`/tenant/:tenantId/weekly-evaluation/create`, require('./create').default);
  app.put(`/tenant/:tenantId/weekly-evaluation/:id`, require('./edit').default);
  app.get(`/tenant/:tenantId/weekly-evaluation/list-availables`, require('./getAvailableEvaluations').default);
  app.get(`/tenant/:tenantId/weekly-evaluation/:id/metrics`, require('./getMetrics').default);
  app.get(`/weekly-evaluation/metrics/list`, require('./getAllMetrics').default);
};
