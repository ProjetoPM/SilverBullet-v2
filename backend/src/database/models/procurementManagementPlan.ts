import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('procurementManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProcurementManagementPlanSchema = new Schema(
    {
      productsServicesWillBeObtained: {
        type: String,
      },
      howProcurementCoordinated: {
        type: String,
      },
      timetableProcurementActivities: {
        type: String,
      },
      procurementMetrics: {
        type: String,
      },
      constraintsAssumptions: {
        type: String,
      },
      stakeholderRolesResponsibilities: {
        type: String,
      },
      theLegalJurisdiction: {
        type: String,
      },
      independentEstimates: {
        type: String,
      },
      riskManagementIssues: {
        type: String,
      },
      prequalifiedSellers: {
        type: String,
      },
      procurementStrategy: {
        type: String,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  ProcurementManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProcurementManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProcurementManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  ProcurementManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('procurementManagementPlan', ProcurementManagementPlanSchema);
};
