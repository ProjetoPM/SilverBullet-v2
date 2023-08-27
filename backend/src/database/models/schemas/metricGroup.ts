import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MetricGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['NOK', 'PNOK', 'POK', 'PTOK', 'TOK']
    },
    value: {
      type: Number,
      required: true,
      enum: [0, 2.5, 5, 7.5, 10]
    },
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
