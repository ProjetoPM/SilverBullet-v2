import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('scopeManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ScopeManagementPlanSchema = new Schema(
    {
      projectScopeSpecificationProcess: {
        type: String,
        maxlength: 2000,
      },
      processesMaintainingWBS: {
        type: String,
        maxlength: 2000,
      },
      deliveryAcceptanceProcess: {
        type: String,
        maxlength: 2000,
      },
      scopeChangeManagementPlan: {
        type: String,
      },
      processMaintained: {
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

  ScopeManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ScopeManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ScopeManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  ScopeManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('scopeManagementPlan', ScopeManagementPlanSchema);
};
