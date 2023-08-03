import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('assumptionLog');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AssumptionLogSchema = new Schema(
    {
      assumptionLog: {
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

  AssumptionLogSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  AssumptionLogSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AssumptionLogSchema.set('toJSON', {
    getters: true,
  });

  AssumptionLogSchema.set('toObject', {
    getters: true,
  });

  return database.model('assumptionLog', AssumptionLogSchema);
};
