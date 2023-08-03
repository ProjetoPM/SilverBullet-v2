import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectManagementPlanSchema = new Schema(
    {
      scopeManagementPlan: {
        type: String,
      },
      requirementsManagementPlan: {
        type: String,
      },
      scheduleManagementPlan: {
        type: String,
      },
      costManagementPlan: {
        type: String,
      },
      qualityManagementPlan: {
        type: String,
      },
      resourceManagementPlan: {
        type: String,
      },
      communicationsManagementPlan: {
        type: String,
      },
      riskManagementPlan: {
        type: String,
      },
      procurementManagementPlan: {
        type: String,
      },
      stakeholderEngagementPlan: {
        type: String,
      },
      scopeBaseline: {
        type: String,
      },
      scheduleBaseline: {
        type: String,
      },
      costBaseline: {
        type: String,
      },
      changeManagementPlan: {
        type: String,
      },
      configurationManagementPlan: {
        type: String,
      },
      performanceMeasurementBaseline: {
        type: String,
      },
      projectLifeCycle: {
        type: String,
      },
      developmentApproach: {
        type: String,
      },
      managementReviews: {
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

  ProjectManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProjectManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  ProjectManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('projectManagementPlan', ProjectManagementPlanSchema);
};
