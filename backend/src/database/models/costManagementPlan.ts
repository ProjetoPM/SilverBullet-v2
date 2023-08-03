import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('costManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CostManagementPlanSchema = new Schema(
    {
      processesManagingProjectCosts: {
        type: String,
      },
      levelAccuracy: {
        type: String,
      },
      organizationalProceduresLinks: {
        type: String,
      },
      rulesPerformanceMeasurement: {
        type: String,
      },
      unitsMeasureUsed: {
        type: String,
      },
      levelPrecision: {
        type: String,
      },
      controlThresholds: {
        type: String,
      },
      reportingFormats: {
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

  CostManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CostManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CostManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  CostManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('costManagementPlan', CostManagementPlanSchema);
};
