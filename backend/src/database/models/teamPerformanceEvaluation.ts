import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('teamPerformanceEvaluation');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TeamPerformanceEvaluationSchema = new Schema(
    {
      teamMemberName: {
        type: String,
      },
      jobRole: {
        type: String,
      },
      functionProject: {
        type: String,
      },
      evaluationDate: {
        type: String,
      },
      reviewEvaluation: {
        type: String,
      },
      strongPoints: {
        type: String,
      },
      opportunitiesImprovement: {
        type: String,
      },
      developmentPlan: {
        type: String,
      },
      alreadyDeveloped: {
        type: String,
      },
      externalcomments: {
        type: String,
      },
      teamMatesComments: {
        type: String,
      },
      evaluatorComments: {
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

  TeamPerformanceEvaluationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  TeamPerformanceEvaluationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TeamPerformanceEvaluationSchema.set('toJSON', {
    getters: true,
  });

  TeamPerformanceEvaluationSchema.set('toObject', {
    getters: true,
  });

  return database.model('teamPerformanceEvaluation', TeamPerformanceEvaluationSchema);
};
