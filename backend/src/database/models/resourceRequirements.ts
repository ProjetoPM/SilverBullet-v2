import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('resourceRequirements');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ResourceRequirementsSchema = new Schema(
    {
      activity: {
        type: Schema.Types.ObjectId,
        ref: 'activityList',
      },
      resource: {
        type: Schema.Types.ObjectId,
        ref: 'resource',
      },
      requiredAmountResource: {
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

  ResourceRequirementsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ResourceRequirementsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ResourceRequirementsSchema.set('toJSON', {
    getters: true,
  });

  ResourceRequirementsSchema.set('toObject', {
    getters: true,
  });

  return database.model('resourceRequirements', ResourceRequirementsSchema);
};
