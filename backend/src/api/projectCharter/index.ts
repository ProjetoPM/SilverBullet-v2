export default (app) => {
  app.post(
    `/tenant/:tenantId/project/:projectId/project-charter`,
    require('./projectCharterCreate').default,
  );
  app.put(
    `/tenant/:tenantId/project/:projectId/project-charter/:id`,
    require('./projectCharterUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/project/:projectId/project-charter/import`,
    require('./projectCharterImport').default,
  );
  app.delete(
    `/tenant/:tenantId/project/:projectId/project-charter`,
    require('./projectCharterDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/project-charter/autocomplete`,
    require('./projectCharterAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/project-charter/:id`,
    require('./projectCharterFind').default,
  );
};
