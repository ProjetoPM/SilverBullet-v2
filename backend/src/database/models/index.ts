const models = [
  require('./tenant').default,
  require('./auditLog').default,  
  require('./settings').default,
  require('./user').default,
  require('./project').default,
  require('./projectCharter').default,
  require('./businessCase').default,
  require('./benefitsManagementPlan').default,
  require('./assumptionLog').default,
  require('./stakeholderRegistration').default,
  require('./projectManagementPlan').default,
  require('./requirementsManagementPlan').default,
  require('./requirementDocumentation').default,
  require('./scopeManagementPlan').default,
  require('./scheduleManagementPlan').default,
  require('./projectScopeStatement').default,
  require('./workbreakdownStructure').default,
  require('./scheduleNetworkDiagram').default,
  require('./activityList').default,
  require('./resource').default,
  require('./resourceRequirements').default,
  require('./activityDurationEstimates').default,
  require('./stakeholderCalendars').default,
  require('./costManagementPlan').default,
  require('./costEstimates').default,
  require('./qualityManagementPlan').default,
  require('./resourceManagementPlan').default,
  require('./resourceBreakdownStructure').default,  
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}
