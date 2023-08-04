import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('activityList');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ActivityListSchema = new Schema(
    {
      activityLabel: {
        type: String,
      },
      milestone: {
        type: String,
      },
      activityName: {
        type: String,
      },
      projectPhase: {
        type: String,
      },
      wBSId: {
        type: String,
      },
      activityDescription: {
        type: String,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
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

  ActivityListSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ActivityListSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ActivityListSchema.set('toJSON', {
    getters: true,
  });

  ActivityListSchema.set('toObject', {
    getters: true,
  });

  return database.model('activityList', ActivityListSchema);
};
