export default (app) => {
  app.post(`/tenant/:tenantId/weekly-evaluation/create`, require('./weeklyEvaluationCreate').default);
  app.get(`/tenant/:tenantId/weekly-evaluation/list-availables`, require('./getAvailableEvaluations').default);

};
