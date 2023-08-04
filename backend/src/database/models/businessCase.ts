import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('businessCase');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const BusinessCaseSchema = new Schema(
    {
      businessNeeds: {
        type: String,
      },
      situationAnalysis: {
        type: String,
      },
      recommendation: {
        type: String,
      },
      evaluation: {
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

  BusinessCaseSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  BusinessCaseSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  BusinessCaseSchema.set('toJSON', {
    getters: true,
  });

  BusinessCaseSchema.set('toObject', {
    getters: true,
  });

  return database.model('businessCase', BusinessCaseSchema);
};
