import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('resourceManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ResourceManagementPlanSchema = new Schema(
    {
      rolesResponsibilities: {
        type: String,
      },
      projectOrganizationCharts: {
        type: String,
      },
      teamDevelopment: {
        type: String,
      },
      identificationResources: {
        type: String,
      },
      projectResourceManagement: {
        type: String,
      },
      training: {
        type: String,
      },
      resourceControl: {
        type: String,
      },
      recognitionPlan: {
        type: String,
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

  ResourceManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ResourceManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ResourceManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  ResourceManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('resourceManagementPlan', ResourceManagementPlanSchema);
};
