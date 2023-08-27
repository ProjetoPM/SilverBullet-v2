import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WeeklyReportFileSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 21845,
      required: true,
    }
  },
  { timestamps: true },
);

WeeklyReportFileSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

WeeklyReportFileSchema.set('toJSON', {
  getters: true,
});

WeeklyReportFileSchema.set('toObject', {
  getters: true,
});

export default WeeklyReportFileSchema;
