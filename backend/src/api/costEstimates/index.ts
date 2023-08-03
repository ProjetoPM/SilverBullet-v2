export default (app) => {
  app.post(
    `/tenant/:tenantId/cost-estimates`,
    require('./costEstimatesCreate').default,
  );
  app.put(
    `/tenant/:tenantId/cost-estimates/:id`,
    require('./costEstimatesUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/cost-estimates/import`,
    require('./costEstimatesImport').default,
  );
  app.delete(
    `/tenant/:tenantId/cost-estimates`,
    require('./costEstimatesDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/cost-estimates/autocomplete`,
    require('./costEstimatesAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/cost-estimates`,
    require('./costEstimatesList').default,
  );
  app.get(
    `/tenant/:tenantId/cost-estimates/:id`,
    require('./costEstimatesFind').default,
  );
};