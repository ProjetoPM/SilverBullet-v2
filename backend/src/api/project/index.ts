export default (app) => {
  app.post(`/tenant/:tenantId/project/create`, require('./projectCreate').default);
  app.get(`/tenant/:tenantId/project-list`, require('./projectList').default);
  app.get(`/tenant/:tenantId/project/:id`, require('./projectFind').default);
  app.put(`/tenant/:tenantId/project/:id`, require('./projectUpdate').default);
  app.delete(`/tenant/:tenantId/project`, require('./projectDestroy').default);

};
