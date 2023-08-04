import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('project');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 255,
      },
      description: {
        type: String,
      },
      url: { type: String, maxlength: 1024 },
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
      importHash: { type: String, maxlength: 255 },
    },
    { timestamps: true },
  );

  ProjectSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProjectSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectSchema.set('toJSON', {
    getters: true,
  });

  ProjectSchema.set('toObject', {
    getters: true,
  });

  return database.model('project', ProjectSchema);
};
