import mongoose from 'mongoose';
import MetricGroupSchema from './schemas/metricGroup';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('project');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WeeklyEvaluationSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 255,
      },
      type: {
        type: String,
        required: true,
        enum: [
          'Individual Report',
          'Group Report'
        ],
      }, 
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      metrics: [MetricGroupSchema],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String, maxlength: 255 },
    },
    { timestamps: true },
  );

  WeeklyEvaluationSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  WeeklyEvaluationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WeeklyEvaluationSchema.set('toJSON', {
    getters: true,
  });

  WeeklyEvaluationSchema.set('toObject', {
    getters: true,
  });

  return database.model('weeklyEvaluation', WeeklyEvaluationSchema);
};
