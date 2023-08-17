import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import WeeklyReportFileSchema from './weeklyReportFileSchema';

const WeeklyReportContentSchema = new Schema(
  {
    folder: {
      type: String,
      maxlength: 21845,
      required: true,
    },
    files: [WeeklyReportFileSchema]
  },
  { timestamps: true },
);

WeeklyReportContentSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

WeeklyReportContentSchema.set('toJSON', {
  getters: true,
});

WeeklyReportContentSchema.set('toObject', {
  getters: true,
});

export default WeeklyReportContentSchema;
