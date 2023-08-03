import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectScopeStatement');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectScopeStatementSchema = new Schema(
    {
      productScopeDescription: {
        type: String,
      },
      acceptanceCriteria: {
        type: String,
      },
      deliverables: {
        type: String,
      },
      projectExclusions: {
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

  ProjectScopeStatementSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProjectScopeStatementSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectScopeStatementSchema.set('toJSON', {
    getters: true,
  });

  ProjectScopeStatementSchema.set('toObject', {
    getters: true,
  });

  return database.model('projectScopeStatement', ProjectScopeStatementSchema);
};
