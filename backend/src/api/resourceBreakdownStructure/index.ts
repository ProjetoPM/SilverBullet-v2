export default (app) => {
  app.post(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure`,
    require('./resourceBreakdownStructureCreate').default,
  );
  app.put(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure/:id`,
    require('./resourceBreakdownStructureUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure/import`,
    require('./resourceBreakdownStructureImport').default,
  );
  app.delete(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure`,
    require('./resourceBreakdownStructureDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure/autocomplete`,
    require('./resourceBreakdownStructureAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure`,
    require('./resourceBreakdownStructureList').default,
  );
  app.get(
    `/tenant/:tenantId/project/:projectId/resource-breakdown-structure/:id`,
    require('./resourceBreakdownStructureFind').default,
  );
};
