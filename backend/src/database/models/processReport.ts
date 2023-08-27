import mongoose from 'mongoose';
import WeeklyReportContentSchema from './schemas/weeklyReportContentSchema';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('processReport');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProcessReportSchema = new Schema(
    {
      group: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        maxlength: 2000,
      },
      filesFolder: {
        type: String
      },
      weeklyReport: {
        type: Schema.Types.ObjectId,
        ref: 'weeklyReport',
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

  ProcessReportSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProcessReportSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProcessReportSchema.set('toJSON', {
    getters: true,
  });

  ProcessReportSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'processReport',
    ProcessReportSchema,
  );
};
