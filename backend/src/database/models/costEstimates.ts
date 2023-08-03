import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('costEstimates');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CostEstimatesSchema = new Schema(
    {
      estimatedCost: {
        type: String,
      },
      cumulativeEstimatedCost: {
        type: Number,
      },
      replantedCost: {
        type: Number,
      },
      contingencyReserve: {
        type: Number,
      },
      sumWorkPackages: {
        type: Number,
      },
      contingencyReservePackages: {
        type: Number,
      },
      baseline: {
        type: String,
      },
      budget: {
        type: Number,
      },
      cumulativeReplantedCost: {
        type: Number,
      },
      realCost: {
        type: Number,
      },
      cumulativeRealCost: {
        type: Number,
      },
      managementReserve: {
        type: Number,
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

  CostEstimatesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CostEstimatesSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CostEstimatesSchema.set('toJSON', {
    getters: true,
  });

  CostEstimatesSchema.set('toObject', {
    getters: true,
  });

  return database.model('costEstimates', CostEstimatesSchema);
};
