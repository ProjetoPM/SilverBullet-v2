import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('resource');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ResourceSchema = new Schema(
    {
      resourceName: {
        type: String,
      },
      resourceDescription: {
        type: String,
      },
      resourceCostperUnit: {
        type: Number,
      },
      resourceType: {
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

  ResourceSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ResourceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ResourceSchema.set('toJSON', {
    getters: true,
  });

  ResourceSchema.set('toObject', {
    getters: true,
  });

  return database.model('resource', ResourceSchema);
};
