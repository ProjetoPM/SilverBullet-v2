import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('qualityChecklist');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const QualityChecklistSchema = new Schema(
    {
      verifiedProductProcessActivity: {
        type: String,
      },
      verificationDate: {
        type: String,
      },
      responsibleVerification: {
        type: String,
      },
      associatedDocuments: {
        type: String,
      },
      guidelinesComments: {
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

  QualityChecklistSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  QualityChecklistSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  QualityChecklistSchema.set('toJSON', {
    getters: true,
  });

  QualityChecklistSchema.set('toObject', {
    getters: true,
  });

  return database.model('qualityChecklist', QualityChecklistSchema);
};
