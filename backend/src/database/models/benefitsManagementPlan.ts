import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('benefitsManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const BenefitsManagementPlanSchema = new Schema(
    {
      targetBenefits: {
        type: String,
      },
      strategicAlignment: {
        type: String,
      },
      scheduleforBenefits: {
        type: String,
      },
      benefitsOwner: {
        type: String,
      },
      indicators: {
        type: String,
      },
      premises: {
        type: String,
      },
      risks: {
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

  BenefitsManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  BenefitsManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  BenefitsManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  BenefitsManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('benefitsManagementPlan', BenefitsManagementPlanSchema);
};
