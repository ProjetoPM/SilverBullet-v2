import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('requirementsManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RequirementsManagementPlanSchema = new Schema(
    {
      requirementsActivities: {
        type: String,
        minlength: 5,
        maxlength: 2000,
      },
      configurationManagementActivities: {
        type: String,
      },
      requirementsPrioritizationProcess: {
        type: String,
      },
      metricsRationale: {
        type: String,
        maxlength: 2000,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
        unique: true
      },
      project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
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

  RequirementsManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  RequirementsManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RequirementsManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  RequirementsManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('requirementsManagementPlan', RequirementsManagementPlanSchema);
};
