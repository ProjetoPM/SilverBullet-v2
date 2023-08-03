import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('requirementDocumentation');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RequirementDocumentationSchema = new Schema(
    {
      associatedID: {
        type: String,
      },
      businessNeeds: {
        type: String,
      },
      requirementDescription: {
        type: String,
      },
      version: {
        type: String,
      },
      phase: {
        type: String,
      },
      associatedDelivery: {
        type: String,
      },
      type: {
        type: String,
      },
      requester: {
        type: String,
      },
      complexity: {
        type: Number,
      },
      responsible: {
        type: String,
      },
      validity: {
        type: String,
      },
      priority: {
        type: String,
      },
      acceptanceCriteria: {
        type: String,
      },
      supportingDocumentation: {
        type: String,
      },
      requirementSituation: {
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

  RequirementDocumentationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  RequirementDocumentationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RequirementDocumentationSchema.set('toJSON', {
    getters: true,
  });

  RequirementDocumentationSchema.set('toObject', {
    getters: true,
  });

  return database.model('requirementDocumentation', RequirementDocumentationSchema);
};
