import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('communicationsManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CommunicationsManagementPlanSchema = new Schema(
    {
      type: {
        type: String,
      },
      nome: {
        type: String,
      },
      content: {
        type: String,
      },
      distributionReason: {
        type: String,
      },
      language: {
        type: String,
      },
      channel: {
        type: String,
      },
      documentFormat: {
        type: String,
      },
      method: {
        type: String,
      },
      frequency: {
        type: String,
      },
      allocatedResources: {
        type: String,
      },
      format: {
        type: String,
      },
      local: {
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

  CommunicationsManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CommunicationsManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CommunicationsManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  CommunicationsManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('communicationsManagementPlan', CommunicationsManagementPlanSchema);
};
