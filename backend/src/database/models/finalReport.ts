import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('finalReport');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const FinalReportSchema = new Schema(
    {
      summaryLevelDescription: {
        type: String,
      },
      scopeObjectivesCriteria: {
        type: String,
      },
      qualityObjectives: {
        type: String,
      },
      costObjectives: {
        type: String,
      },
      scheduleObjectives: {
        type: String,
      },
      summaryValidation: {
        type: String,
      },
      summaryResults: {
        type: String,
      },
      summaryRisksIssues: {
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

  FinalReportSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  FinalReportSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  FinalReportSchema.set('toJSON', {
    getters: true,
  });

  FinalReportSchema.set('toObject', {
    getters: true,
  });

  return database.model('finalReport', FinalReportSchema);
};
