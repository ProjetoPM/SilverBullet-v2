export default (app) => {
  app.post(
    `/tenant/:tenantId/project/:projectId/assumption-log`,
    require('./assumptionLogCreate').default,
  );
  app.put(
    `/tenant/:tenantId/project/:projectId/assumption-log/:id`,
    require('./assumptionLogUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/project/:projectId/assumption-log/import`,
    require('./assumptionLogImport').default,
  );
  app.delete(
    `/tenant/:tenantId/project/:projectId/assumption-log`,
    require('./assumptionLogDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/assumption-log/autocomplete`,
    require('./assumptionLogAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/assumption-log`,
    require('./assumptionLogList').default,
  );
  app.get(
    `/tenant/:tenantId/assumption-log/:id`,
    require('./assumptionLogFind').default,
  );
};
