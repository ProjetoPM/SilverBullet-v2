import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('riskManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RiskManagementPlanSchema = new Schema(
    {
      methodology: {
        type: String,
      },
      rolesResponsibilities: {
        type: String,
      },
      probabilityImpactMatrix: {
        type: String,
      },
      riskCategories: {
        type: String,
      },
      riskStrategy: {
        type: String,
      },
      tracking: {
        type: String,
      },
      funding: {
        type: String,
      },
      timing: {
        type: String,
      },
      stakeholderRiskAppetite: {
        type: String,
      },
      definitionsRiskProbabilityImpacts: {
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

  RiskManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  RiskManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RiskManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  RiskManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('riskManagementPlan', RiskManagementPlanSchema);
};
