import mongoose from 'mongoose';
import MetricGroupSchema from './schemas/metricGroup';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('weeklyReport');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WeeklyReportSchema = new Schema(
    {
      toolEvaluation: {
        type: 'string',
        maxlength: 5000
      },
      score: MetricGroupSchema,
      weeklyEvaluation: {
        type: Schema.Types.ObjectId,
        ref: 'weeklyEvaluation',
        required: true,
      },
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

  WeeklyReportSchema.index(
    { createdBy: 1, weeklyEvaluation: 1},
    {
      unique: true
    },
  );

  WeeklyReportSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WeeklyReportSchema.set('toJSON', {
    getters: true,
  });

  WeeklyReportSchema.set('toObject', {
    getters: true,
  });

  return database.model('weeklyReport', WeeklyReportSchema);
};
