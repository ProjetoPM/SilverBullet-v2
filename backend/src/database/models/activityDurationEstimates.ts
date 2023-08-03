import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('activityDurationEstimates');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ActivityDurationEstimatesSchema = new Schema(
    {
      activityName: {
        type: Schema.Types.ObjectId,
        ref: 'activityList',
      },
      estimatedDuration: {
        type: Number,
      },
      estimatedStartDate: {
        type: String,
      },
      estimatedEndDate: {
        type: String,
      },
      performedDuration: {
        type: Number,
      },
      performedStartDate: {
        type: String,
      },
      performedEndDate: {
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

  ActivityDurationEstimatesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ActivityDurationEstimatesSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ActivityDurationEstimatesSchema.set('toJSON', {
    getters: true,
  });

  ActivityDurationEstimatesSchema.set('toObject', {
    getters: true,
  });

  return database.model('activityDurationEstimates', ActivityDurationEstimatesSchema);
};
