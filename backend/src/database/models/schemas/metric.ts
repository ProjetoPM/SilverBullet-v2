import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MetricSchema = new Schema(
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

MetricSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

MetricSchema.set('toJSON', {
  getters: true,
});

MetricSchema.set('toObject', {
  getters: true,
});

export default MetricSchema;
