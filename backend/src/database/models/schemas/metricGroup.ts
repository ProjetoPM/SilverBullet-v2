import mongoose from 'mongoose';
import MetricSchema from './metric';
const Schema = mongoose.Schema;

const MetricGroupSchema = new Schema(
  {
    metricGroupId: {
      type: String,
      required: true
    },
    metrics: [MetricSchema],
  },
  { timestamps: false },
);

MetricGroupSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

MetricGroupSchema.set('toJSON', {
  getters: true,
});

MetricGroupSchema.set('toObject', {
  getters: true,
});

export default MetricGroupSchema;
