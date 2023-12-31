export default (app) => {
  app.post(
    `/tenant/:tenantId/work-performance-reports`,
    require('./workPerformanceReportsCreate').default,
  );
  app.put(
    `/tenant/:tenantId/work-performance-reports/:id`,
    require('./workPerformanceReportsUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/work-performance-reports/import`,
    require('./workPerformanceReportsImport').default,
  );
  app.delete(
    `/tenant/:tenantId/work-performance-reports`,
    require('./workPerformanceReportsDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/work-performance-reports/autocomplete`,
    require('./workPerformanceReportsAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/work-performance-reports`,
    require('./workPerformanceReportsList').default,
  );
  app.get(
    `/tenant/:tenantId/work-performance-reports/:id`,
    require('./workPerformanceReportsFind').default,
  );
};
