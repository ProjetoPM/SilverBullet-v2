import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectClosure');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectClosureSchema = new Schema(
    {
      client: {
        type: String,
      },
      dateclosure: {
        type: String,
      },
      mainChangesApproved: {
        type: String,
      },
      mainlessonslearned: {
        type: String,
      },
      mainDeviations: {
        type: String,
      },
      customerComments: {
        type: String,
      },
      sponsorscomments: {
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

  ProjectClosureSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProjectClosureSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectClosureSchema.set('toJSON', {
    getters: true,
  });

  ProjectClosureSchema.set('toObject', {
    getters: true,
  });

  return database.model('projectClosure', ProjectClosureSchema);
};
