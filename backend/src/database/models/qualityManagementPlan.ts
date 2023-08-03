import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('qualityManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const QualityManagementPlanSchema = new Schema(
    {
      qualityStandardsProject: {
        type: String,
      },
      qualityObjectivesProject: {
        type: String,
      },
      qualityRoles: {
        type: String,
      },
      projectDeliverablesQR: {
        type: String,
      },
      qualityControl: {
        type: String,
      },
      qualityToolsUsed: {
        type: String,
      },
      majorProceduresRelevant: {
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

  QualityManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  QualityManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  QualityManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  QualityManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('qualityManagementPlan', QualityManagementPlanSchema);
};
